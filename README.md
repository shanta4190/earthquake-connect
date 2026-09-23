# Earthquake Connect

Earthquake Connect is an observation-only multi-hazard monitoring HUD.

## Safety and isolation rules

- This repository is **earthquake-connect only**.
- Keep Cloudflare Pages Functions in `functions/` at repository root.
- `out/` is static export output only.
- `officialWarning` must remain `false`.
- `GNAITV_LIVE` must remain `false`.
- Do not attach this project to hostnames owned by other Pages projects.

## Local verification

```bash
npm ci
node test-local.mjs
npm run build
```

## Deploy (GitHub Actions)

```bash
git push origin main
```

Pushing to `main` runs `.github/workflows/deploy.yml`, which:

- installs dependencies with `npm ci`
- runs `node test-local.mjs` when present
- builds the static export into `out/`
- deploys `out/` to the `earthquake-connect` Cloudflare Pages project
- verifies the live `/api/health` endpoint returns a JSON content type

Before the workflow can deploy, add these repository secrets in GitHub Actions settings:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
