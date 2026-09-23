# SS6CONNECT OneOS™ / SHANTA ECON OS™

**SS6CONNECT OneOS™ — Sovereign AI SaaS & Disaster Intelligence Platform**  
**Document Reference:** GNAI-README-2026-0923  
**Date of Record:** Dec 20, 2025  
**Target Domain:** [link removed]  
**Organization:** GNAIAAAC LLC (Delaware, USA)  
**Evidence Register ID:** EV-019

---

## At a Glance

SS6CONNECT OneOS™ is a multi-tenant, sovereign AI application generation engine and multi-hazard disaster intelligence platform. It converts plain-language prompts into isolated, containerized SaaS applications while delivering real-time, sensor-derived observation data, supply-chain logistics, and Bangladesh Standing Orders on Disaster (SOD) monitoring.

## Core Architectural Principles

- **Multi-Tenancy & Triple Isolation:** Row-Level Security (RLS) via PostgreSQL, per-tenant Docker sandboxing, and scoped S3 storage buckets.
- **Bounded & Recommend-Only:** Operating state remains human-governed; all destructive actions, bank handshakes, and live DNS modifications require explicit, authenticated human approval.
- **140-Language Voice Hub:** Integrated real-time speech synthesis, translation, and verified public safety phrase packs across 140 global locales.
- **Unified Financial & Operations OS:** Integrates landed-cost accumulation, freight allocation (`$S_i = \alpha \frac{W_i}{W_T} + \beta \frac{V_i}{V_T}$`), CAD/BIM job-costing, and multi-currency treasury management.

---

## Repository Structure

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Actions CI/CD to Cloudflare Pages
├── backend/
│   ├── routes/
│   │   ├── universalPayments.js    # B2G, Stripe, PayPal & Wallet Payment Gateway
│   │   ├── voiceHub.mjs            # 140-Language Universal Voice Hub API
│   │   └── shantaEconGateway.js    # Encrypted Telemetry & GPU Fabric Router
│   ├── server.mjs                  # Express.js API Entrypoint & Mock Health Server
│   ├── amebaMaintenanceEngine.mjs  # Self-Healing Anomaly Detection & Diagnostic Engine
│   └── serverBackupEngine.mjs      # AES-256-GCM Encrypted Backup Engine
├── frontend/
│   ├── components/
│   │   ├── AppStoreMarketplace.tsx # Software Marketplace & $5 Student Tier Component
│   │   └── BangladeshSODMonitor.tsx# Bilingual Bangladesh SOD Disaster HUD
│   ├── pages/
│   │   └── index.tsx               # Global Responsive Homepage
│   └── public/
│       └── manifest.json           # Universal Cross-Platform PWA Manifest
├── init-schema.sql                 # Multi-Tenant PostgreSQL Schema with RLS
├── docker-compose.yml              # Production Multi-Tier Containerization Manifest
├── deploy.sh                       # Production Server Shell Deployment Script
├── build-bundle.sh                 # Local Build & Zip Packaging Script
├── wrangler.toml                   # Cloudflare Pages / Worker Configuration
└── README.md                       # Master Architecture Documentation
```

---

## Commercial Tiers & Pricing Model

> **Notice:** All billing operations feature zero-storage tokenization. Payment processing pipelines remain locked in a default-OFF state until dual cryptographic authorization signatures are executed.

| Tier / Segment | Pricing Model | Included Features | Target Audience |
|---|---|---|---|
| Student & Learner | $5.00 | Full access to Quantum Kids™, Future Innovators™, learning labs, and sandbox build tools. | Students, educators, senior lifelong learners |
| Asia Regional Tier | $10.00 / mo | Alpha/Beta acceleration, local regional routing, standard software marketplace access. | Micro-enterprises, regional developers |
| Global Commercial Tier | $25.00 / mo | Gamma/Omega acceleration, worldwide multi-cloud routing, full software catalog. | Growing SMBs, global SaaS developers |
| Business Operations Tier | $99.00 / mo | Omega/Supernova workflows, multi-user team workspaces, job-costing & logistics engines. | Mid-market enterprises, agency partners |
| B2G & Sovereign Infrastructure | Custom Contract ($300k+/yr) | Dedicated single-tenant K8s, air-gapped deployment, custom physics models, 99.99% SLA. | Government ministries, defense, emergency agencies |

---

## API Endpoints Summary

### Health & Live Gates

- `GET /api/health`: Returns `application/json` payload confirming system state (`{"ok": true, "service": "earthquake-connect", ...}`).
- `GET /api/live`: Bounded live gate returning `{"live": false}` until all governance conditions pass.

### Voice & Localization

- `POST /api/v1/voice/translate`: Translates input text across 140 locales with PII redaction.
- `GET /api/v1/voice/emergency-phrase`: Fetches pre-translated, human-verified public safety alerts.

### Checkout & Payments

- `POST /api/v1/checkout/process`: Universal payment processing routing B2G, Stripe, PayPal, Apple Pay, Google Pay, and Amazon Pay (enforces $5.00 Student Rate).

---

## Local Development & Setup Instructions

### Prerequisites

- Node.js v18.0.0 or higher
- Docker Engine & Docker Compose
- Git

### Step-by-Step Execution

1. **Clone the Repository:**

   ```bash
   git clone [link removed]
   cd ss6connect-oneos
   ```

2. **Run Local Verification Test Harness:**

   ```bash
   node test-local.mjs
   ```

3. **Start Local Mock Development Server:**

   ```bash
   npm install
   npm run dev
   ```

   The mock server will start on `http://localhost:8080`.

4. **Launch Full Stack via Docker Compose:**

   ```bash
   # Make scripts executable
   chmod +x deploy.sh build-bundle.sh

   # Build containers and spin up database, API, and frontend
   ./deploy.sh
   ```

---

## Production Deployment Workflow

### Automated GitHub Actions CI/CD

Whenever code is committed and pushed to the `main` branch, the workflow in `.github/workflows/deploy-earthquake.yml` will automatically:

- Run local test harnesses (`test-local.mjs`).
- Build the Next.js static export bundle (`out/`).
- Deploy the static build to Cloudflare Pages (`earthquake-connect`).
- Verify that `https://earthquake-connect.pages.dev/api/health` returns HTTP `200 OK` with `Content-Type: application/json`.

### Required GitHub Repository Secrets

To enable the deployment pipeline, set the following secrets under **Repository Settings → Secrets and variables → Actions**:

- `CLOUDFLARE_API_TOKEN`: Cloudflare API Token with Pages Edit permissions.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID.

---

## Legal & Compliance Disclaimers

> **Entity Identification:** All software products, mobile applications, and digital tools hosted on this domain are developed, owned, and operated exclusively by **GNAIAAAC LLC** (Delaware, USA).  
>
> **Software-Only Classification:** GNAIAAAC LLC is a software technology provider. The platform is not a chartered depository institution, licensed investment adviser, or statutory medical/legal authority. All financial models, tax calculations, risk metrics, and disaster intelligence predictions are provided solely for operational efficiency, analytical research, and productivity purposes.  
>
> **Official Life-Safety Notice:** The SS6CONNECT platform provides independent modeling, numerical simulation, and commercial risk analysis. Official public warnings, evacuation mandates, and statutory life-safety advisories remain under the exclusive jurisdiction of authorized government agencies (e.g., USGS, BMD, MoDMR, NOAA, NWS).
