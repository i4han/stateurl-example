---
description: Pre-execution checklist for git submodule conversion
status: ready to execute
---

# submodule conversion checklist

## ⚠️ before running the script

### 1. create remote repository

**Where**: GitHub, GitLab, or your git server

**Steps for GitHub**:

```bash
# Option 1: Using gh CLI
gh repo create i4han/stateurl-example --public --description "Example app for stateurl router"

# Option 2: Manual
# 1. Go to https://github.com/new
# 2. Repository name: stateurl-example
# 3. Description: Example app for stateurl router
# 4. Public or Private (your choice)
# 5. Do NOT initialize with README (we already have one)
# 6. Click "Create repository"
```

### 2. verify SSH access

```bash
# Test GitHub SSH
ssh -T git@github.com

# Should see: "Hi i4han! You've successfully authenticated..."
```

### 3. update script configuration

Edit the script and update line 32:

```bash
# Change this line in execute-submodule-conversion.sh
REMOTE_URL="git@github.com:i4han/stateurl-example.git"

# To your actual repository URL
# GitHub: git@github.com:USERNAME/stateurl-example.git
# GitLab: git@gitlab.com:USERNAME/stateurl-example.git
```

### 4. commit all changes in pan repo

```bash
cd /home/isaac/pan
git status

# If there are uncommitted changes:
git add .
git commit -m "prepare for submodule conversion"
```

### 5. verify clean working tree

```bash
cd /home/isaac/pan
git diff-index --quiet HEAD --

# Should have no output (clean)
```

## ✅ execution

Once all checks above are complete:

```bash
/home/isaac/pan/stateurl-example/.ai/execute-submodule-conversion.sh
```

## 📋 what the script does

### phase 1: preparation

-   Verifies working tree is clean
-   Creates backup branch: `backup-before-submodule-YYYYMMDD-HHMMSS`
-   Cleans generated files (node_modules, dist, etc.)

### phase 2: create separate repository

-   Creates temporary git repository in `/tmp/stateurl-example-repo`
-   Copies all files from current stateurl-example
-   Creates initial commit
-   Adds remote and pushes to your repository

### phase 3: remove from main repository

-   Removes stateurl-example directory from pan
-   Updates pnpm-workspace.yaml
-   Commits the removal

### phase 4: add as submodule

-   Adds stateurl-example as git submodule
-   Initializes and updates submodule
-   Adds back to pnpm workspace
-   Commits submodule addition

### phase 5: verification

-   Checks submodule status
-   Verifies workspace configuration
-   Tests pnpm install

## 🚨 if something goes wrong

### rollback to backup

```bash
cd /home/isaac/pan

# Find your backup branch
git branch | grep backup-before-submodule

# Restore from backup
git checkout backup-before-submodule-YYYYMMDD-HHMMSS
git branch -D main  # or your current branch name
git checkout -b main
```

### common issues

**Issue**: "Push failed"

-   **Cause**: Remote repository doesn't exist or SSH not configured
-   **Fix**: Create repository on GitHub/GitLab, verify SSH access

**Issue**: "Failed to add submodule"

-   **Cause**: Remote URL incorrect or not accessible
-   **Fix**: Verify repository exists and URL is correct

**Issue**: "Uncommitted changes"

-   **Cause**: Working tree not clean
-   **Fix**: Commit or stash changes before running

## 📊 after conversion

### verify it works

```bash
# Test in submodule
cd /home/isaac/pan/stateurl-example
pnpm install
pnpm dev

# Test in main repo
cd /home/isaac/pan
pnpm install
```

### push to remote

```bash
cd /home/isaac/pan
git push
```

### team cloning

New clones need `--recurse-submodules`:

```bash
git clone --recurse-submodules https://github.com/i4han/pan.git
```

Existing clones need initialization:

```bash
git pull
git submodule init
git submodule update
```

## 🔧 daily workflow with submodule

See: [`submodule-helper.sh`](./submodule-helper.sh)

```bash
# Update submodule
./stateurl-example/.ai/submodule-helper.sh update

# Make changes in submodule
cd stateurl-example
# ... make changes ...
git add .
git commit -m "update example"
git push

# Update main repo to point to new commit
cd ..
git add stateurl-example
git commit -m "update stateurl-example submodule"
git push
```

## 📚 resources

-   **Full plan**: [git-submodule-plan.md](./git-submodule-plan.md)
-   **Decision guide**: [decision-guide.md](./decision-guide.md)
-   **Helper script**: [submodule-helper.sh](./submodule-helper.sh)
-   **Git docs**: https://git-scm.com/book/en/v2/Git-Tools-Submodules

## ⏱️ estimated time

-   Pre-checks: 5 minutes
-   Script execution: 2-5 minutes
-   Verification: 5 minutes
-   **Total**: ~15 minutes

## 🎯 ready to proceed?

-   [ ] Created remote repository
-   [ ] Verified SSH access
-   [ ] Updated REMOTE_URL in script
-   [ ] Committed all changes in pan repo
-   [ ] Verified clean working tree
-   [ ] Read this checklist
-   [ ] Read git-submodule-plan.md

If all checked, run:

```bash
/home/isaac/pan/stateurl-example/.ai/execute-submodule-conversion.sh
```
