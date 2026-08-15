#!/usr/bin/env python3
import json
import os
import re
import smtplib
import ssl
import threading
import time
import urllib.parse
import urllib.request
from collections import defaultdict, deque
from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HOST = "0.0.0.0"
PORT = int(os.getenv("CONTACT_API_PORT", "8080"))
TURNSTILE_SECRET = os.environ["TURNSTILE_SECRET_KEY"]
TURNSTILE_EXPECTED_HOSTNAME = os.getenv("TURNSTILE_EXPECTED_HOSTNAME", "me.jrwroberts.co.uk")
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.environ["SMTP_USERNAME"]
SMTP_PASSWORD = os.environ["SMTP_PASSWORD"]
CONTACT_TO_EMAIL = os.environ["CONTACT_TO_EMAIL"]
CONTACT_FROM_EMAIL = os.getenv("CONTACT_FROM_EMAIL", SMTP_USERNAME)
RATE_LIMIT_COUNT = int(os.getenv("CONTACT_RATE_LIMIT_COUNT", "5"))
RATE_LIMIT_WINDOW = int(os.getenv("CONTACT_RATE_LIMIT_WINDOW_SECONDS", "3600"))
MAX_BODY_BYTES = int(os.getenv("CONTACT_MAX_BODY_BYTES", "16384"))

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
rate_buckets = defaultdict(deque)
rate_lock = threading.Lock()


def clean_text(value, max_len):
    if not isinstance(value, str):
        return ""
    value = value.replace("\x00", "").strip()
    return value[:max_len]


def client_ip(headers, peer_ip):
    cf_ip = clean_text(headers.get("CF-Connecting-IP", ""), 64)
    if cf_ip:
        return cf_ip
    forwarded = clean_text(headers.get("X-Forwarded-For", ""), 256)
    if forwarded:
        return forwarded.split(",", 1)[0].strip()
    return peer_ip


def rate_allowed(ip):
    now = time.time()
    with rate_lock:
        bucket = rate_buckets[ip]
        while bucket and now - bucket[0] > RATE_LIMIT_WINDOW:
            bucket.popleft()
        if len(bucket) >= RATE_LIMIT_COUNT:
            return False
        bucket.append(now)
        return True


def verify_turnstile(token, remote_ip):
    if not token or len(token) > 2048:
        return False

    body = urllib.parse.urlencode({
        "secret": TURNSTILE_SECRET,
        "response": token,
        "remoteip": remote_ip,
    }).encode()

    request = urllib.request.Request(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        data=body,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=8) as response:
            result = json.load(response)
    except Exception:
        return False

    if not result.get("success"):
        return False

    hostname = result.get("hostname", "")
    return not TURNSTILE_EXPECTED_HOSTNAME or hostname == TURNSTILE_EXPECTED_HOSTNAME


def send_email(name, reply_to, subject, message):
    mail = EmailMessage()
    mail["From"] = CONTACT_FROM_EMAIL
    mail["To"] = CONTACT_TO_EMAIL
    mail["Reply-To"] = reply_to
    mail["Subject"] = f"Portfolio contact: {subject}"
    mail.set_content(
        "New message from me.jrwroberts.co.uk\n\n"
        f"Name: {name}\n"
        f"Email: {reply_to}\n"
        f"Subject: {subject}\n\n"
        "Message:\n"
        f"{message}\n"
    )

    context = ssl.create_default_context()
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10) as smtp:
        smtp.ehlo()
        smtp.starttls(context=context)
        smtp.ehlo()
        smtp.login(SMTP_USERNAME, SMTP_PASSWORD)
        smtp.send_message(mail)


class Handler(BaseHTTPRequestHandler):
    server_version = "ContactAPI/1.0"

    def log_message(self, fmt, *args):
        # Deliberately avoid logging form data, email addresses or message bodies.
        print(f"contact-api {self.address_string()} {fmt % args}")

    def send_json(self, status, payload):
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/healthz":
            self.send_json(200, {"status": "healthy"})
        else:
            self.send_json(404, {"ok": False})

    def do_POST(self):
        if self.path != "/contact":
            self.send_json(404, {"ok": False})
            return

        content_length = self.headers.get("Content-Length", "")
        try:
            length = int(content_length)
        except ValueError:
            self.send_json(400, {"ok": False, "message": "Unable to submit your message."})
            return

        if length <= 0 or length > MAX_BODY_BYTES:
            self.send_json(413, {"ok": False, "message": "Unable to submit your message."})
            return

        if "application/json" not in self.headers.get("Content-Type", ""):
            self.send_json(415, {"ok": False, "message": "Unable to submit your message."})
            return

        ip = client_ip(self.headers, self.client_address[0])
        if not rate_allowed(ip):
            self.send_json(429, {"ok": False, "message": "Unable to submit your message. Please try again later."})
            return

        try:
            data = json.loads(self.rfile.read(length))
        except Exception:
            self.send_json(400, {"ok": False, "message": "Unable to submit your message."})
            return

        allowed_fields = {"name", "email", "subject", "message", "website", "turnstileToken"}
        if not isinstance(data, dict) or set(data) - allowed_fields:
            self.send_json(400, {"ok": False, "message": "Unable to submit your message."})
            return

        # Honeypot. Return success so automated submitters get no useful signal.
        if clean_text(data.get("website", ""), 200):
            self.send_json(200, {"ok": True, "message": "Thanks — your message has been sent."})
            return

        name = clean_text(data.get("name", ""), 100)
        email = clean_text(data.get("email", ""), 254)
        subject = clean_text(data.get("subject", ""), 120)
        message = clean_text(data.get("message", ""), 5000)
        token = clean_text(data.get("turnstileToken", ""), 2048)

        if not name or len(name) < 2 or not EMAIL_RE.match(email) or not subject or not message:
            self.send_json(400, {"ok": False, "message": "Please check the form and try again."})
            return

        if not verify_turnstile(token, ip):
            self.send_json(400, {"ok": False, "message": "Unable to submit your message. Please try again."})
            return

        try:
            send_email(name, email, subject, message)
        except Exception as exc:
            print(f"contact-api delivery_error={type(exc).__name__}")
            self.send_json(503, {"ok": False, "message": "Unable to submit your message. Please try again later."})
            return

        self.send_json(200, {"ok": True, "message": "Thanks — your message has been sent."})


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"contact-api listening on {HOST}:{PORT}")
    server.serve_forever()
