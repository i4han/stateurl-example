---
description: Quick reference for git submodule conversion
---

# quick submodule setup

## 🚀 three-step conversion

### step 1: create remote repository (2 min)

```bash
# Using GitHub CLI (fastest)
gh repo create i4han/stateurl-example --public

# Or manually at: https://github.com/new
# Name: stateurl-example
# Don't initialize with README
```

### step 2: update script config (30 sec)

Edit line 32 in `execute-submodule-conversion.sh`:

```bash
REMOTE_URL="git@github.com:YOUR_USERNAME/stateurl-example.git"
```

### step 3: run conversion (5 min)

```bash
# Commit any pending changes first
cd /home/isaac/pan
git add .
git commit -m "prepare for submodule conversion"

# Run the conversion
/home/isaac/pan/stateurl-example/.ai/execute-submodule-conversion.sh
```

Done! 🎉

## 📋 pre-flight checklist

Run these commands to verify you're ready:

```bash
# 1. Check SSH access
ssh -T git@github.com

# 2. Verify clean working tree
cd /home/isaac/pan && git status

# 3. Verify script exists
ls -lh /home/isaac/pan/stateurl-example/.ai/execute-submodule-conversion.sh
```

All good? Proceed to step 1 above.

## 🚨 rollback if needed

The script creates a backup branch automatically.

```bash
# List backup branches
git branch | grep backup-before-submodule

# Restore
git checkout backup-before-submodule-YYYYMMDD-HHMMSS
```

## 📖 detailed guides

-   **Checklist**:
    [submodule-conversion-checklist.md](./submodule-conversion-checklist.md)
-   **Full plan**: [git-submodule-plan.md](./git-submodule-plan.md)
-   **Decision guide**: [decision-guide.md](./decision-guide.md)

## 💡 why submodule?

Benefits:

-   ✅ Independent versioning
-   ✅ Reusable across projects
-   ✅ Cleaner separation
-   ✅ Own repository and release cycle

Trade-offs:

-   ❌ Slightly more complex workflow
-   ❌ Team needs to learn git submodules

## 🔧 after conversion

### clone with submodule

```bash
git clone --recurse-submodules https://github.com/i4han/pan.git
```

### update submodule

```bash
cd /home/isaac/pan
git submodule update --remote stateurl-example
```

### use helper script

```bash
./stateurl-example/.ai/submodule-helper.sh update
./stateurl-example/.ai/submodule-helper.sh sync
```

## ⏱️ total time: ~10 minutes

-   Step 1: 2 min
-   Step 2: 30 sec
-   Step 3: 5 min
-   Verification: 2 min
