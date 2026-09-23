#!/usr/bin/env bash

# ==============================================================================
# SHANTA ECON OS™ — STATIC PRODUCTION BUILD & BUNDLE SCRIPT
# Target Hostname: earthquake.ss6connect.com
# Output: out.zip
# ==============================================================================

set -euo pipefail

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   SHANTA ECON OS™ — STATIC PORTAL BUILD & ARCHIVE ENGINE             ${NC}"
echo -e "${BLUE}======================================================================${NC}"

# 1. Execute Local Verification Tests
echo -e "\n${YELLOW}[1/4] Running Local Test Harness...${NC}"
if [ -f "test-local.mjs" ]; then
  node test-local.mjs
fi

# 2. Build Next.js Static Export
echo -e "\n${YELLOW}[2/4] Executing Next.js Static Export Build...${NC}"
npm run build

# 3. Verify Output Directory
echo -e "\n${YELLOW}[3/4] Verifying Export Directory...${NC}"
if [ ! -d "out" ]; then
  echo "Error: 'out' directory not found after build."
  exit 1
fi

# 4. Create ZIP Archive
echo -e "\n${YELLOW}[4/4] Creating Production Deployment Bundle (out.zip)...${NC}"
rm -f out.zip
zip -r -q out.zip out/ functions/ wrangler.toml test-local.mjs

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}✓ BUILD SUCCESSFUL: 'out.zip' ready for Cloudflare Pages deployment.${NC}"
echo -e "${GREEN}======================================================================${NC}"
