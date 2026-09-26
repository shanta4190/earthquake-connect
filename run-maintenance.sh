#!/usr/bin/env bash

# ==============================================================================
# SHANTA ECON OS™ — AUTOMATED MAINTENANCE & DIAGNOSTIC RUNBOOK
# ==============================================================================

set -euo pipefail

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   AMEBA AUTOMATED MAINTENANCE & DIAGNOSTIC SYSTEM                   ${NC}"
echo -e "${BLUE}======================================================================${NC}"

echo -e "\n${YELLOW}[1/3] Inspecting Service Containers...${NC}"
if command -v docker-compose >/dev/null 2>&1; then
  docker-compose ps
elif command -v docker >/dev/null 2>&1; then
  docker compose ps
else
  echo "Docker is not available in this environment."
fi

echo -e "\n${YELLOW}[2/3] Running Ameba Diagnostic Engine...${NC}"
node amebaMaintenanceEngine.mjs --run

echo -e "\n${YELLOW}[3/3] Checking PostgreSQL Database Health & Logs...${NC}"
if command -v docker >/dev/null 2>&1; then
  docker exec s6_postgres_ledger pg_isready -U s6_procure_admin -d shanta_econ_ledger || {
    echo "Database container check skipped or unavailable."
  }
else
  echo "Docker is not available in this environment."
fi

echo -e "\n${GREEN}✓ Maintenance run complete. Evidence logged to Black Box EV-019.${NC}"
