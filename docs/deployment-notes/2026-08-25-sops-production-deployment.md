# SOPS portfolio production deployment

Date: 2026-08-25  
Change reference: `CHG-20260825-7954`  
Status: Completed

## Summary

Deployed the completed SOPS and age portfolio updates to `https://me.jrwroberts.co.uk`.

The release updated the Engineering Projects overview and the Container Version Control, Kubernetes, Disaster Recovery and Docker Platform case studies with the completed multi-host secret-management and recovery outcomes.

## Deployment source correction

The production helper previously used the retired source path:

```text
/home/james/docker/stacks/engineering-portfolio-git
```

The helper now resolves the repository root from its own location:

```bash
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$(cd -- "${SCRIPT_DIR}/.." && pwd)"
```

The correction was committed at `610657e` and merged to `main` at `2145aac`.

## Nginx Proxy Manager API recovery

The initial deployment stopped safely before build or container replacement because the protected Nginx Proxy Manager bearer token had expired.

Validation established that Nginx Proxy Manager 2.15.0 uses a two-stage long-lived-token workflow:

1. authenticate with `POST /api/tokens` to obtain a temporary token;
2. refresh it with authenticated `GET /api/tokens?expiry=10y`.

The refreshed token:

- expires on 25 August 2036;
- is stored only in the protected host file `/home/james/docker/secrets/npm.env`;
- returned HTTP 200 when reading proxy host 27;
- was never displayed or committed;
- did not require a proxy-host, container or service change during rotation.

## Controlled deployment

The production workflow:

1. validated the clean `main` checkout;
2. selected revision `2145aac`;
3. enabled the maintenance route through Nginx Proxy Manager;
4. built and deployed the updated Astro site;
5. restored `me.jrwroberts.co.uk` to `engineering-portfolio:80`;
6. completed change control `CHG-20260825-7954`.

## Outcome

- Production route restored successfully.
- Deployed container: `engineering-portfolio`.
- Deployed image: `james-roberts/engineering-portfolio:local`.
- Deployed revision: `2145aac`.
- Public site: `https://me.jrwroberts.co.uk`.
- No credential value was written to Git or deployment evidence.

## Operational follow-up

The NPM API token expiry should be checked during routine credential assurance before 25 August 2036. Rotation must use the authenticated refresh flow documented above and validate proxy host 27 before replacing the protected token file.
