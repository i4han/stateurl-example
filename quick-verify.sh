#!/bin/bash
# Quick verification that redirectToBase is working
# Just checks the code and runs a simple manual test

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo "🔍 Quick verification for redirectToBase feature"
echo ""

# Check 1: Verify code is in place
echo -n "1. Checking if redirect code exists... "
if grep -q "redirectToBase: redirecting" /home/isaac/pan/packages/stateurl/index.tsx; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "   Code not found in packages/stateurl/index.tsx"
    exit 1
fi

# Check 2: Verify App.tsx has redirectToBase enabled
echo -n "2. Checking App.tsx configuration... "
if grep -q "redirectToBase={true}" /home/isaac/pan/stateurl-example/src/App.tsx; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "   redirectToBase={true} not found in App.tsx"
    exit 1
fi

# Check 3: Check if dev server is running
echo -n "3. Checking dev server... "
if curl -s http://localhost:8000 >/dev/null 2>&1; then
    echo -e "${GREEN}✓ (running on port 8000)${NC}"
else
    echo -e "${YELLOW}⚠ (not running)${NC}"
    echo ""
    echo "   Start dev server with: pnpm dev"
    echo "   Then run this script again"
    exit 0
fi

echo ""
echo -e "${GREEN}✓ All checks passed!${NC}"
echo ""
echo "📋 Next steps:"
echo ""
echo "  1. Open browser: http://localhost:8000/"
echo "  2. Open DevTools Console (F12)"
echo "  3. Verify:"
echo "     • URL changes to: /app/v1/light/home"
echo "     • Console shows: [Router] redirectToBase: redirecting..."
echo ""
echo "  Or run automated tests:"
echo "     ./run-redirect-tests.sh"
echo ""


