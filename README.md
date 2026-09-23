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

## Local static production bundle

```bash
chmod +x build-bundle.sh
./build-bundle.sh
```

## Deploy (Wrangler)

```bash
npx wrangler pages deploy out --project-name=earthquake-connect --branch=main
curl -i https://earthquake-connect.pages.dev/api/health
```

## Deploy from deployment archive

```bash
unzip -q out.zip
npx wrangler pages deploy out --project-name=earthquake-connect --branch=main
curl -i https://earthquake-connect.pages.dev/api/health
```
