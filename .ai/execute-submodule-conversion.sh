#!/bin/bash

# ==============================================================================
# Git Submodule Conversion Script for stateurl-example
# ==============================================================================
#
# This script converts stateurl-example from a directory in the pan repo
# to a separate git repository added as a submodule.
#
# Usage:
#   bash /home/isaac/pan/stateurl-example/.ai/execute-submodule-conversion.sh
#
# IMPORTANT: Review the plan first:
#   cat /home/isaac/pan/stateurl-example/.ai/git-submodule-plan.md
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
echo -e "${BLUE}║       Git Submodule Conversion for stateurl-example           ║${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Configuration
PAN_REPO="/home/isaac/pan"
EXAMPLE_DIR="$PAN_REPO/stateurl-example"
TEMP_REPO="/tmp/stateurl-example-repo"
BACKUP_BRANCH="backup-before-submodule-$(date +%Y%m%d-%H%M%S)"

# Remote repository URL - UPDATE THIS!
REMOTE_URL="git@github.com:i4han/stateurl-example.git"

echo -e "${YELLOW}⚠️  IMPORTANT: This script will:${NC}"
echo "  1. Create a backup branch in pan repo"
echo "  2. Create a new git repository for stateurl-example"
echo "  3. Remove stateurl-example directory from pan"
echo "  4. Add it back as a git submodule"
echo ""
echo -e "${RED}Before proceeding, make sure you have:${NC}"
echo "  • Committed all changes in pan repo"
echo "  • Created a remote repository for stateurl-example"
echo "  • Updated REMOTE_URL in this script (line 32)"
echo ""
echo -e "${YELLOW}Remote URL is set to: ${REMOTE_URL}${NC}"
echo ""
read -p "Have you reviewed the plan and updated the remote URL? (yes/no) " -r
echo ""
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo -e "${YELLOW}Please review the plan and update configuration before running${NC}"
    echo "Plan: $EXAMPLE_DIR/.ai/git-submodule-plan.md"
    exit 0
fi

# =============================================================================
# PHASE 1: PREPARATION
# =============================================================================

echo -e "${BLUE}=== PHASE 1: Preparation ===${NC}"
echo ""

# 1.1 Check current state
echo -e "${YELLOW}→ Checking git status...${NC}"
cd "$PAN_REPO"

if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}✗ Error: You have uncommitted changes${NC}"
    echo "Please commit or stash changes before proceeding"
    git status
    exit 1
fi
echo -e "${GREEN}✓ Working tree is clean${NC}"
echo ""

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${YELLOW}Current branch: ${CURRENT_BRANCH}${NC}"
echo ""

# 1.2 Create backup branch
echo -e "${YELLOW}→ Creating backup branch: ${BACKUP_BRANCH}${NC}"
git branch "${BACKUP_BRANCH}"
echo -e "${GREEN}✓ Backup branch created${NC}"
echo -e "${YELLOW}  You can restore with: git checkout ${BACKUP_BRANCH}${NC}"
echo ""

# 1.3 Clean up generated files
echo -e "${YELLOW}→ Cleaning up generated files in stateurl-example...${NC}"
cd "$EXAMPLE_DIR"

rm -rf node_modules || true
rm -rf dist || true
rm -rf .vite || true
rm -rf playwright-report || true
rm -rf test-results || true
rm -f bun.lockb || true
rm -f pnpm-lock.yaml || true

echo -e "${GREEN}✓ Generated files removed${NC}"
echo ""

# =============================================================================
# PHASE 2: CREATE SEPARATE REPOSITORY
# =============================================================================

echo -e "${BLUE}=== PHASE 2: Create Separate Repository ===${NC}"
echo ""

# 2.1 Create temporary repository
echo -e "${YELLOW}→ Creating temporary repository...${NC}"
rm -rf "$TEMP_REPO" || true
mkdir -p "$TEMP_REPO"
cd "$TEMP_REPO"
git init
echo -e "${GREEN}✓ Temporary repository initialized${NC}"
echo ""

# 2.2 Copy files
echo -e "${YELLOW}→ Copying files from stateurl-example...${NC}"
cp -r "$EXAMPLE_DIR"/* .
cp "$EXAMPLE_DIR"/.gitignore . 2>/dev/null || true
cp "$EXAMPLE_DIR"/.ai . -r 2>/dev/null || true

echo -e "${GREEN}✓ Files copied${NC}"
echo ""

# 2.3 Create initial commit
echo -e "${YELLOW}→ Creating initial commit...${NC}"
git add .
git commit -m "initial commit: stateurl-example standalone repository

Converted from stateurl-example directory in pan monorepo.

Features:
- Complete example app for stateurl router
- Playwright end-to-end tests
- Vite build configuration
- Git submodule integration support"

echo -e "${GREEN}✓ Initial commit created${NC}"
echo ""

# 2.4 Add remote and push
echo -e "${YELLOW}→ Adding remote and pushing...${NC}"
git remote add origin "$REMOTE_URL"
git branch -M main

echo -e "${YELLOW}  Pushing to remote...${NC}"
if git push -u origin main; then
    echo -e "${GREEN}✓ Pushed to remote successfully${NC}"
else
    echo -e "${RED}✗ Push failed${NC}"
    echo -e "${YELLOW}  Common reasons:${NC}"
    echo "  • Remote repository doesn't exist"
    echo "  • SSH keys not configured"
    echo "  • Wrong remote URL"
    echo ""
    echo -e "${YELLOW}  Manual steps to fix:${NC}"
    echo "  1. Create repository at: $REMOTE_URL"
    echo "  2. Verify SSH access: ssh -T git@github.com"
    echo "  3. Try push again: cd $TEMP_REPO && git push -u origin main"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Exiting. Repository created at: $TEMP_REPO${NC}"
        exit 1
    fi
fi
echo ""

# =============================================================================
# PHASE 3: REMOVE FROM MAIN REPOSITORY
# =============================================================================

echo -e "${BLUE}=== PHASE 3: Remove from Main Repository ===${NC}"
echo ""

cd "$PAN_REPO"

# 3.1 Remove directory
echo -e "${YELLOW}→ Removing stateurl-example directory...${NC}"
git rm -r stateurl-example
echo -e "${GREEN}✓ Directory removed from git${NC}"
echo ""

# 3.2 Update workspace configuration
echo -e "${YELLOW}→ Updating pnpm-workspace.yaml...${NC}"
if grep -q "stateurl-example" pnpm-workspace.yaml; then
    # Remove the line containing stateurl-example
    sed -i '/stateurl-example/d' pnpm-workspace.yaml
    echo -e "${GREEN}✓ Removed stateurl-example from workspace${NC}"
else
    echo -e "${YELLOW}⚠  stateurl-example not found in workspace config${NC}"
fi
echo ""

# 3.3 Commit removal
echo -e "${YELLOW}→ Committing removal...${NC}"
git add pnpm-workspace.yaml
git commit -m "remove stateurl-example directory

Preparing to add as git submodule.
Repository moved to: $REMOTE_URL

Backup branch: ${BACKUP_BRANCH}"

echo -e "${GREEN}✓ Removal committed${NC}"
echo ""

# =============================================================================
# PHASE 4: ADD AS SUBMODULE
# =============================================================================

echo -e "${BLUE}=== PHASE 4: Add as Git Submodule ===${NC}"
echo ""

# 4.1 Add submodule
echo -e "${YELLOW}→ Adding stateurl-example as submodule...${NC}"
if git submodule add "$REMOTE_URL" stateurl-example; then
    echo -e "${GREEN}✓ Submodule added${NC}"
else
    echo -e "${RED}✗ Failed to add submodule${NC}"
    echo "This might be because the remote repository is not accessible"
    echo "or the URL is incorrect."
    exit 1
fi
echo ""

# 4.2 Initialize and update submodule
echo -e "${YELLOW}→ Initializing submodule...${NC}"
git submodule init
git submodule update
echo -e "${GREEN}✓ Submodule initialized${NC}"
echo ""

# 4.3 Add submodule back to workspace
echo -e "${YELLOW}→ Adding submodule to pnpm workspace...${NC}"
if ! grep -q "stateurl-example" pnpm-workspace.yaml; then
    echo "    - ./stateurl-example" >> pnpm-workspace.yaml
    echo -e "${GREEN}✓ Added to workspace${NC}"
else
    echo -e "${YELLOW}⚠  Already in workspace${NC}"
fi
echo ""

# 4.4 Commit submodule addition
echo -e "${YELLOW}→ Committing submodule addition...${NC}"
git add .gitmodules stateurl-example pnpm-workspace.yaml
git commit -m "add stateurl-example as git submodule

Repository: $REMOTE_URL

This allows independent version control while keeping it
integrated in the workspace."

echo -e "${GREEN}✓ Submodule addition committed${NC}"
echo ""

# =============================================================================
# PHASE 5: VERIFICATION
# =============================================================================

echo -e "${BLUE}=== PHASE 5: Verification ===${NC}"
echo ""

# 5.1 Check submodule status
echo -e "${YELLOW}→ Checking submodule status...${NC}"
git submodule status
echo ""

# 5.2 Check workspace
echo -e "${YELLOW}→ Verifying workspace configuration...${NC}"
if grep -q "stateurl-example" pnpm-workspace.yaml; then
    echo -e "${GREEN}✓ stateurl-example in workspace${NC}"
else
    echo -e "${RED}✗ stateurl-example NOT in workspace${NC}"
fi
echo ""

# 5.3 Test installation
echo -e "${YELLOW}→ Testing installation...${NC}"
cd "$PAN_REPO"
echo "  Running: pnpm install"
if pnpm install; then
    echo -e "${GREEN}✓ Installation successful${NC}"
else
    echo -e "${RED}✗ Installation failed${NC}"
    echo "This might be expected - you may need to configure dependencies"
fi
echo ""

# =============================================================================
# COMPLETION
# =============================================================================

echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}║              ✓ Submodule Conversion Complete!                  ║${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}Summary:${NC}"
echo "  ✓ Backup branch created: ${BACKUP_BRANCH}"
echo "  ✓ Separate repository created: $REMOTE_URL"
echo "  ✓ Added as submodule in pan repo"
echo "  ✓ Workspace configuration updated"
echo ""

echo -e "${BLUE}Next steps:${NC}"
echo ""
echo -e "${YELLOW}1. Verify submodule works:${NC}"
echo "   cd /home/isaac/pan/stateurl-example"
echo "   pnpm install"
echo "   pnpm dev"
echo ""
echo -e "${YELLOW}2. Update documentation:${NC}"
echo "   Update main repo README to mention submodule setup"
echo ""
echo -e "${YELLOW}3. Push changes to main repo:${NC}"
echo "   cd /home/isaac/pan"
echo "   git push"
echo ""
echo -e "${YELLOW}4. Team workflow with submodules:${NC}"
echo "   Clone: git clone --recurse-submodules <repo-url>"
echo "   Update: git submodule update --remote"
echo "   Helper: ./stateurl-example/.ai/submodule-helper.sh"
echo ""
echo -e "${BLUE}Rollback if needed:${NC}"
echo "   git checkout ${BACKUP_BRANCH}"
echo "   git branch -D ${CURRENT_BRANCH}"
echo "   git checkout -b ${CURRENT_BRANCH}"
echo ""
echo -e "${BLUE}Temporary repository location:${NC}"
echo "   $TEMP_REPO"
echo "   (can be deleted after verification)"
echo ""
