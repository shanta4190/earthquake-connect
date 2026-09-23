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

## Backend encrypted backup engine

- The backend backup module is available at `backend/serverBackupEngine.mjs`.
- Set `BACKUP_ENC_KEY` to a 64-character hex key in backend environment secrets before production use.
- Run a self-test with:

```bash
node backend/serverBackupEngine.mjs --test
```
