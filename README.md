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

## Deploy (Wrangler)

```bash
npx wrangler pages deploy out --project-name=earthquake-connect --branch=main
curl -i https://earthquake-connect.pages.dev/api/health
```

## Automated production stack deployment

If you are deploying a full Docker-based production stack (portal/API/PostgreSQL) on a VPS:

```bash
./deploy.sh
```

The script checks Docker/Compose, creates a `.env` file when missing, and starts services via Docker Compose.
