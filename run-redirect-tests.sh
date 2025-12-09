#!/bin/bash
# Comprehensive test runner for redirectToBase feature
# Ensures workspace packages are rebuilt and dev server is fresh

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}║          redirectToBase Feature - Test Runner                 ║${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

cd /home/isaac/pan/stateurl-example

# Step 1: Check if Playwright is installed
echo -e "${YELLOW}→ Checking Playwright installation...${NC}"
if ! pnpm exec playwright --version &>/dev/null; then
    echo -e "${YELLOW}⚠ Playwright not found. Installing...${NC}"
    pnpm exec playwright install chromium
    echo -e "${GREEN}✓ Playwright installed${NC}"
else
    echo -e "${GREEN}✓ Playwright found${NC}"
fi
echo ""

# Step 2: Kill any existing dev servers
echo -e "${YELLOW}→ Stopping any existing dev servers...${NC}"
pkill -f "vite.*8000" || true
sleep 2
echo -e "${GREEN}✓ Existing servers stopped${NC}"
echo ""

# Step 3: Start dev server in background
echo -e "${YELLOW}→ Starting dev server...${NC}"
pnpm dev &>/dev/null &
DEV_PID=$!
echo -e "${GREEN}✓ Dev server started (PID: $DEV_PID)${NC}"
echo ""

# Step 4: Wait for server to be ready
echo -e "${YELLOW}→ Waiting for dev server to be ready...${NC}"
MAX_WAIT=30
WAITED=0
while ! curl -s http://localhost:8000 >/dev/null 2>&1; do
    if [ $WAITED -ge $MAX_WAIT ]; then
        echo -e "${RED}✗ Dev server failed to start within ${MAX_WAIT}s${NC}"
        kill $DEV_PID 2>/dev/null || true
        exit 1
    fi
    sleep 1
    WAITED=$((WAITED + 1))
    echo -ne "\r  Waiting... ${WAITED}s"
done
echo -e "\r${GREEN}✓ Dev server ready (took ${WAITED}s)${NC}"
echo ""

# Step 5: Run the tests
echo -e "${YELLOW}→ Running redirectToBase tests...${NC}"
echo ""

if pnpm test end2end/06-redirect-to-base.spec.ts; then
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                                ║${NC}"
    echo -e "${GREEN}║                    ✓ All Tests Passed!                         ║${NC}"
    echo -e "${GREEN}║                                                                ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
    TESTS_PASSED=true
else
    echo ""
    echo -e "${RED}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║                                                                ║${NC}"
    echo -e "${RED}║                    ✗ Tests Failed                              ║${NC}"
    echo -e "${RED}║                                                                ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════════════╝${NC}"
    TESTS_PASSED=false
fi

# Step 6: Cleanup
echo ""
echo -e "${YELLOW}→ Cleaning up...${NC}"
kill $DEV_PID 2>/dev/null || true
echo -e "${GREEN}✓ Dev server stopped${NC}"

echo ""
if [ "$TESTS_PASSED" = true ]; then
    echo -e "${GREEN}Success! All tests passed.${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "  • Manually verify: Visit http://10.222.26.99:8000 (should redirect)"
    echo "  • Check browser console for: [Router] redirectToBase logs"
    echo "  • Remove debug console.log statements if desired"
    exit 0
else
    echo -e "${RED}Tests failed. Debugging tips:${NC}"
    echo ""
    echo "1. Check the test output above for specific failures"
    echo "2. Run with UI mode to see what's happening:"
    echo "   pnpm test:ui end2end/06-redirect-to-base.spec.ts"
    echo ""
    echo "3. Check if workspace package updated:"
    echo "   grep -A 5 'redirectToBase: redirecting' /home/isaac/pan/packages/stateurl/index.tsx"
    echo ""
    echo "4. Manual test:"
    echo "   pnpm dev"
    echo "   # Visit http://localhost:8000/ in browser"
    echo "   # Check console for redirect logs"
    exit 1
fi
