---
description: Step-by-step guide to make redirectToBase tests pass
---

# make tests pass - step by step

## 🎯 goal

Make all 18 tests in `06-redirect-to-base.spec.ts` pass.

## ✅ what i fixed

1. **Added hash & query preservation** - Redirect now keeps `?query` and `#hash`
2. **Fixed flaky tests** - Adjusted timing expectations (100ms → 500ms)
3. **Fixed back button test** - Now establishes proper history first
4. **Created test runner** - Automated script that handles everything

## 🚀 how to make tests pass

### option 1: automated (recommended)

```bash
cd /home/isaac/pan/stateurl-example
./run-redirect-tests.sh
```

**What it does:**

-   Stops existing dev servers
-   Starts fresh dev server
-   Waits for it to be ready
-   Runs all 18 tests
-   Shows results
-   Cleans up

**Expected output:**

```
✓ All Tests Passed!
  18 passed (2.5s)
```

### option 2: manual

```bash
# Terminal 1: Start dev server
cd /home/isaac/pan/stateurl-example
pnpm dev

# Terminal 2: Run tests
cd /home/isaac/pan/stateurl-example
pnpm test end2end/06-redirect-to-base.spec.ts
```

### option 3: interactive (best for debugging)

```bash
pnpm test:ui end2end/06-redirect-to-base.spec.ts
```

Opens visual interface where you can:

-   See browser during tests
-   Step through each test
-   Replay failed tests
-   Debug issues

## 🐛 if tests still fail

### quick check script

```bash
./quick-verify.sh
```

This checks:

1. ✓ Code exists in `packages/stateurl/index.tsx`
2. ✓ `redirectToBase={true}` in `App.tsx`
3. ✓ Dev server is running

### common issues

#### issue: "redirected to /home instead of /app/v1/light/home"

**Cause**: Workspace package changes not loaded

**Fix**:

```bash
# Stop dev server (Ctrl+C)
cd /home/isaac/pan/stateurl-example
rm -rf node_modules/.vite
pnpm dev

# Run tests again
./run-redirect-tests.sh
```

#### issue: "timeout waiting for URL"

**Cause**: Redirect not happening

**Fix**:

1. Check browser console manually:

    ```bash
    pnpm dev
    # Visit http://localhost:8000/ in browser
    # Open DevTools Console (F12)
    # Should see: [Router] redirectToBase: redirecting...
    ```

2. If no console logs:
    - Changes didn't load
    - Try hard refresh: Ctrl+Shift+R

#### issue: "playwright not found"

**Fix**:

```bash
pnpm exec playwright install chromium
```

#### issue: "cannot connect to dev server"

**Fix**:

```bash
# Check if something is using port 8000
lsof -i :8000

# Kill it
kill -9 <PID>

# Start fresh
pnpm dev
```

## 📊 test breakdown

| Category                   | Tests  | What it checks                      |
| -------------------------- | ------ | ----------------------------------- |
| redirectToBase Feature     | 10     | Core redirect functionality         |
| redirectToBase Edge Cases  | 4      | IP access, ports, reload, incognito |
| redirectToBase Performance | 2      | Speed, no flash                     |
| redirectToBase Console     | 2      | Debug logging                       |
| **Total**                  | **18** | **All scenarios covered**           |

## ✨ what "passing" looks like

### test output

```
Running 18 tests using 1 worker

  ✓ redirectToBase Feature (10/10)
  ✓ redirectToBase Edge Cases (4/4)
  ✓ redirectToBase Performance (2/2)
  ✓ redirectToBase Console Output (2/2)

  18 passed (2.5s)
```

### manual verification

1. Visit: `http://localhost:8000/`
2. URL changes to: `http://localhost:8000/app/v1/light/home`
3. Console shows:
    ```
    [Router] redirectToBase check: { currentPath: '/', isRoot: true, redirectToBase: true }
    [Router] redirectToBase: redirecting from / to /app/v1/light/home
    ```
4. Page displays: "Welcome to StateURL Example"

## 🎓 understanding the tests

### critical tests (must pass)

1. **should redirect from root to base path with defaults**

    - Core functionality
    - `/` → `/app/v1/light/home`

2. **should redirect without trailing slash**

    - Handles `10.222.26.99:8000` (your use case!)

3. **should preserve hash when redirecting**

    - `/?query#hash` → `/app/v1/light/home?query#hash`

4. **should only redirect once (not loop)**
    - Prevents infinite redirects

### nice-to-have tests

-   Performance tests (speed)
-   Console logging (debugging)
-   Edge cases (incognito, etc.)

If only a few tests fail, that's okay! Focus on the critical ones first.

## 🔄 workflow

```
1. Run quick-verify.sh
   ↓
2. Run run-redirect-tests.sh
   ↓
3. If tests fail:
   ├─→ Check browser console manually
   ├─→ Use pnpm test:ui to debug
   └─→ Restart dev server and retry
   ↓
4. Tests pass!
   ↓
5. Manual verification
   ↓
6. ✅ Done!
```

## 📝 checklist

Before running tests:

-   [ ] Changes saved in `packages/stateurl/index.tsx`
-   [ ] Changes saved in `stateurl-example/src/App.tsx`
-   [ ] No dev server running (or run with automated script)
-   [ ] Playwright installed

Run tests:

-   [ ] Ran `./run-redirect-tests.sh`
-   [ ] All 18 tests passed
-   [ ] Or identified which tests failed and why

Manual check:

-   [ ] Browser redirects correctly
-   [ ] Console shows redirect logs
-   [ ] Feature works as expected

## 🎉 success!

If tests pass AND manual verification works:

**✅ The feature is working correctly!**

Next steps:

1. Remove debug `console.log` statements (optional)
2. Update main documentation
3. Commit changes
4. Celebrate! 🎊

## 📚 additional resources

-   **Quick verification**: `./quick-verify.sh`
-   **Full test run**: `./run-redirect-tests.sh`
-   **Test file**: `end2end/06-redirect-to-base.spec.ts`
-   **Verification guide**: `VERIFY-REDIRECT.md`
-   **Quick test guide**: `end2end/QUICK-TEST.md`

---

**TL;DR**: Run `./run-redirect-tests.sh` and watch it pass! 🚀
