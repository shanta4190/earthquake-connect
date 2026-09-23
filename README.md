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

## Voice Hub and marketplace artifacts

- Voice Hub API router module: `/home/runner/work/earthquake-connect/earthquake-connect/routes/voiceHub.mjs`
- Marketplace component: `/home/runner/work/earthquake-connect/earthquake-connect/components/AppStoreMarketplace.tsx`
- Cron template: `/home/runner/work/earthquake-connect/earthquake-connect/deploy/shanta_econ_backup.cron`

To install the cron schedule on a Linux host:

```bash
sudo cp /home/runner/work/earthquake-connect/earthquake-connect/deploy/shanta_econ_backup.cron /etc/cron.d/shanta_econ_backup
sudo chmod 0644 /etc/cron.d/shanta_econ_backup
```
