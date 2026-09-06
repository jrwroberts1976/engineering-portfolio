# Cloudflare Pages migration

The portfolio is already a static Astro site:

- production URL: `https://me.jrwroberts.co.uk`
- production branch: `main`
- build command: `npm run build`
- static output: `dist/`
- Node: 22

## Migration stages

1. Create the Cloudflare Pages project from `homelab-platform` Terraform.
2. Configure the two GitHub Actions secrets required for Cloudflare authentication.
3. Run **Cloudflare Pages Preview** manually from this migration branch.
4. Validate the resulting `*.pages.dev` preview without changing public DNS.
5. Register `me.jrwroberts.co.uk` with the Pages project through Terraform.
6. Capture/import the existing DNS record and perform a controlled DNS cutover.
7. Validate HTTPS, navigation, downloads and canonical URLs.
8. Keep the current home-hosted deployment temporarily as rollback.
9. Remove the home-hosted portfolio route/container only after the external deployment has remained healthy.

## Rollback

Until step 9, the current homelab deployment remains intact. A failed preview or domain cutover does not justify deleting the current deployment.
