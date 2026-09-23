#!/usr/bin/env bash

# ==============================================================================
# SHANTA ECON ENTERPRISE OS™ — AUTOMATED PRODUCTION DEPLOYMENT SCRIPT
# Platform: SS6CONNECT OneOS™ / Shanta Econ OS™
# Architecture: Next.js Frontend + Node.js Encrypted API + PostgreSQL 16 (RLS)
# ==============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}  SHANTA ECON ENTERPRISE OS™ — PRODUCTION STACK DEPLOYMENT           ${NC}"
echo -e "${BLUE}======================================================================${NC}"

echo -e "\n${YELLOW}[1/5] Checking System Dependencies...${NC}"
command -v docker >/dev/null 2>&1 || {
  echo -e "${RED}ERROR: Docker is not installed. Install Docker Engine first.${NC}"
  exit 1
}

if command -v docker-compose >/dev/null 2>&1; then
  COMPOSE_CMD="docker-compose"
elif docker compose version >/dev/null 2>&1; then
  COMPOSE_CMD="docker compose"
else
  echo -e "${RED}ERROR: Docker Compose is not installed.${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Docker Engine & Compose verified.${NC}"

echo -e "\n${YELLOW}[2/5] Setting Up Production Environment Variables...${NC}"
if [ ! -f .env ]; then
  echo -e "${YELLOW}Creating default .env configuration file...${NC}"
command -v openssl >/dev/null 2>&1 || {
  echo -e "${RED}ERROR: OpenSSL is not installed. Install OpenSSL first.${NC}"
  exit 1
}
DB_PASSWORD="$(openssl rand -hex 24)"
JWT_SECRET="$(openssl rand -hex 48)"
NEXTAUTH_SECRET="$(openssl rand -hex 32)"
  cat <<EOF > .env
NODE_ENV=production
PORTAL_PORT=3000
API_PORT=4000
DB_PORT=5432
POSTGRES_DB=earthquake_connect
POSTGRES_USER=app_user
POSTGRES_PASSWORD=${DB_PASSWORD}
DATABASE_URL=postgresql://app_user:${DB_PASSWORD}@postgres:5432/earthquake_connect
JWT_SECRET=${JWT_SECRET}
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
NEXT_PUBLIC_API_URL=https://api.your-domain.example
EOF
  echo -e "${GREEN}✓ .env file created with secure defaults.${NC}"
else
  echo -e "${GREEN}✓ Existing .env file found; keeping current values.${NC}"
fi

echo -e "\n${YELLOW}[3/5] Validating Deployment Assets...${NC}"
if [ ! -f docker-compose.yml ] && [ ! -f docker-compose.yaml ] && [ ! -f compose.yaml ] && [ ! -f compose.yml ]; then
  echo -e "${RED}ERROR: No compose file found in ${ROOT_DIR}.${NC}"
  exit 1
fi

if [ ! -d functions ] && [ ! -d api ] && [ ! -d src ]; then
  echo -e "${YELLOW}WARNING: Expected application directories not detected; continuing anyway.${NC}"
fi

echo -e "${GREEN}✓ Deployment assets look valid.${NC}"

echo -e "\n${YELLOW}[4/5] Deploying Production Stack...${NC}"
$COMPOSE_CMD pull --ignore-pull-failures || true
$COMPOSE_CMD up -d --build
echo -e "${GREEN}✓ Stack started.${NC}"

echo -e "\n${YELLOW}[5/5] Running Post-Deployment Checks...${NC}"
$COMPOSE_CMD ps

if $COMPOSE_CMD exec -T postgres psql --version >/dev/null 2>&1; then
  echo -e "${GREEN}✓ PostgreSQL container reachable.${NC}"
else
  echo -e "${RED}ERROR: PostgreSQL container check failed. Verify service names and container health.${NC}"
  exit 1
fi

echo -e "\n${GREEN}Deployment completed.${NC}"
echo -e "${BLUE}Tip:${NC} Review container logs with: ${YELLOW}${COMPOSE_CMD} logs --tail=200 -f${NC}"
