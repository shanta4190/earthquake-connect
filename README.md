# Earthquake Connect

Earthquake Connect is an observation-only multi-hazard monitoring HUD.

## Safety and isolation rules

- This repository is **earthquake-connect only**.
- Keep Cloudflare Pages Functions in `functions/` at repository root.
- `officialWarning` must remain `false`.
- Do not attach this project to hostnames owned by other Pages projects.

## Local verification

```bash
npm ci
node test-local.mjs
```

## Deploy (Wrangler)

```bash
npx wrangler pages deploy . --project-name=earthquake-connect --branch=main
curl -i https://earthquake-connect.pages.dev/api/health
```
