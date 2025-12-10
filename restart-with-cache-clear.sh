#!/bin/bash
# Force restart dev server with complete cache clear

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo -e "${YELLOW}🔄 Restarting dev server with cache clear...${NC}"
echo ""

# Kill any running dev servers
echo -e "${YELLOW}→ Stopping dev servers...${NC}"
pkill -f "vite.*8000" || true
sleep 2
echo -e "${GREEN}✓ Stopped${NC}"

# Clear ALL caches
echo ""
echo -e "${YELLOW}→ Clearing caches...${NC}"

# Clear stateurl-example cache
cd /home/isaac/pan/stateurl-example
rm -rf node_modules/.vite
rm -rf .vite
echo -e "${GREEN}✓ Cleared stateurl-example cache${NC}"

# Clear stateurl package cache  
cd /home/isaac/pan/packages/stateurl
rm -rf node_modules/.vite
rm -rf .vite
echo -e "${GREEN}✓ Cleared stateurl package cache${NC}"

# Clear browser cache files
cd /home/isaac/pan/stateurl-example
rm -rf dist
echo -e "${GREEN}✓ Cleared dist${NC}"

echo ""
echo -e "${YELLOW}→ Starting fresh dev server...${NC}"
cd /home/isaac/pan/stateurl-example

# Start dev server
pnpm dev


