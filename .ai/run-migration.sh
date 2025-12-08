#!/bin/bash

# ==============================================================================
# Bun migration script for stateurl-example
# ==============================================================================
#
# This is the workspace-aware migration script that handles the workspace
# dependency on 'stateurl' correctly.
#
# Usage:
#   bash /home/isaac/pan/stateurl-example/.ai/run-migration.sh
#
# Or make it executable and run:
#   chmod +x /home/isaac/pan/stateurl-example/.ai/run-migration.sh
#   /home/isaac/pan/stateurl-example/.ai/run-migration.sh
#
# ==============================================================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;36m'
NC='\033[0m'

clear

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}║       Bun Migration for stateurl-example (Workspace)          ║${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Navigate to workspace root
echo -e "${YELLOW}→ Navigating to workspace root...${NC}"
cd /home/isaac/pan
echo -e "${GREEN}✓ Current directory: $(pwd)${NC}"
echo ""

# Verify stateurl package exists
echo -e "${YELLOW}→ Verifying workspace structure...${NC}"
if [ ! -d "packages/stateurl" ]; then
    echo -e "${RED}✗ Error: packages/stateurl not found${NC}"
    echo "  This workspace depends on the stateurl package"
    exit 1
fi
echo -e "${GREEN}✓ Workspace package 'stateurl' exists${NC}"
echo ""

# Check disk space
echo -e "${YELLOW}→ Checking disk space...${NC}"
df -h . | tail -1
echo ""

# Prompt user
echo -e "${YELLOW}This script will:${NC}"
echo "  1. Clean Bun cache"
echo "  2. Remove stateurl-example/node_modules"
echo "  3. Remove old lock files"
echo "  4. Install with Bun (from workspace root)"
echo "  5. Verify installation"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Migration cancelled${NC}"
    exit 0
fi
echo ""

# Clean Bun cache
echo -e "${YELLOW}→ Cleaning Bun cache...${NC}"
if [ -d "$HOME/.bun/install/cache" ]; then
    rm -rf "$HOME/.bun/install/cache"/* 2>/dev/null || true
    echo -e "${GREEN}✓ Bun cache cleared${NC}"
else
    echo -e "${YELLOW}⚠ No Bun cache found${NC}"
fi
echo ""

# Clean stateurl-example
echo -e "${YELLOW}→ Cleaning stateurl-example...${NC}"
if [ -d "stateurl-example/node_modules" ]; then
    SIZE=$(du -sh stateurl-example/node_modules 2>/dev/null | cut -f1 || echo "unknown")
    echo "  Removing node_modules ($SIZE)..."
    rm -rf stateurl-example/node_modules
    echo -e "${GREEN}✓ node_modules removed${NC}"
fi

rm -f stateurl-example/pnpm-lock.yaml
rm -f stateurl-example/package-lock.json
rm -f stateurl-example/bun.lockb
echo -e "${GREEN}✓ Lock files removed${NC}"
echo ""

# Install with Bun
echo -e "${YELLOW}→ Installing with Bun (from workspace root)...${NC}"
echo "  Command: bun install --cwd stateurl-example"
echo ""

INSTALL_SUCCESS=false

# Try different strategies
for strategy in "" "--no-cache" "--backend=hardlink"; do
    if [ -n "$strategy" ]; then
        echo -e "${YELLOW}  Trying: bun install --cwd stateurl-example $strategy${NC}"
    fi
    
    if bun install --cwd stateurl-example $strategy 2>&1; then
        INSTALL_SUCCESS=true
        echo ""
        echo -e "${GREEN}✓ Installation successful!${NC}"
        break
    else
        echo -e "${YELLOW}  Failed, trying next strategy...${NC}"
        echo ""
    fi
done

if [ "$INSTALL_SUCCESS" = false ]; then
    echo ""
    echo -e "${RED}✗ All installation attempts failed${NC}"
    echo ""
    echo -e "${YELLOW}Troubleshooting:${NC}"
    echo "  1. Check disk space: df -h"
    echo "  2. Free up space and re-run this script"
    echo "  3. See: stateurl-example/.ai/bun-migration-steps.md"
    echo "  4. Fallback to pnpm: pnpm install"
    exit 1
fi

echo ""

# Verify installation
echo -e "${YELLOW}→ Verifying installation...${NC}"

ISSUES=0

if [ -f "stateurl-example/bun.lockb" ]; then
    SIZE=$(du -sh stateurl-example/bun.lockb 2>/dev/null | cut -f1)
    echo -e "${GREEN}✓ bun.lockb created ($SIZE)${NC}"
else
    echo -e "${RED}✗ bun.lockb not found${NC}"
    ISSUES=$((ISSUES + 1))
fi

if [ -d "stateurl-example/node_modules" ]; then
    SIZE=$(du -sh stateurl-example/node_modules 2>/dev/null | cut -f1)
    echo -e "${GREEN}✓ node_modules created ($SIZE)${NC}"
else
    echo -e "${RED}✗ node_modules not found${NC}"
    ISSUES=$((ISSUES + 1))
fi

if [ -L "stateurl-example/node_modules/stateurl" ] || [ -d "stateurl-example/node_modules/stateurl" ]; then
    echo -e "${GREEN}✓ Workspace dependency 'stateurl' resolved${NC}"
else
    echo -e "${RED}✗ Workspace dependency 'stateurl' NOT resolved${NC}"
    ISSUES=$((ISSUES + 1))
fi

echo ""

if [ $ISSUES -gt 0 ]; then
    echo -e "${RED}⚠ $ISSUES issue(s) found${NC}"
    echo "Check the logs above for details"
    echo ""
else
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                                ║${NC}"
    echo -e "${GREEN}║                   ✓ Migration Complete!                        ║${NC}"
    echo -e "${GREEN}║                                                                ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
fi

# Next steps
echo -e "${BLUE}Next steps:${NC}"
echo ""
echo -e "  ${YELLOW}1. Test dev server:${NC}"
echo "     cd /home/isaac/pan/stateurl-example"
echo "     bun dev"
echo ""
echo -e "  ${YELLOW}2. Test build:${NC}"
echo "     bun run build"
echo ""
echo -e "  ${YELLOW}3. Run tests:${NC}"
echo "     bun test"
echo ""
echo -e "  ${YELLOW}4. Update documentation:${NC}"
echo "     See: stateurl-example/.ai/bun-migration-steps.md"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo "  • Quick start: stateurl-example/.ai/quick-start-bun.md"
echo "  • Full guide:  stateurl-example/.ai/bun-migration-steps.md"
echo "  • Main docs:   stateurl-example/.ai/README.md"
echo ""
