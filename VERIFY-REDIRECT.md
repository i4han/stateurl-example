---
description: Quick verification checklist for redirectToBase
---

# verify redirectToBase is working

## ✅ manual verification (fastest)

1. **Start dev server**:

    ```bash
    cd /home/isaac/pan/stateurl-example
    pnpm dev
    ```

2. **Open browser**:

    - Visit: `http://localhost:8000/` or `http://10.222.26.99:8000/`
    - Open DevTools Console (F12)

3. **Check results**:

    ✅ **URL should change** from `/` to `/app/v1/light/home`

    ✅ **Console should show**:

    ```
    [Router] redirectToBase check: { currentPath: '/', isRoot: true, redirectToBase: true }
    [Router] redirectToBase: redirecting from / to /app/v1/light/home?<query>#<hash>
    ```

    ✅ **Page should display**: "Welcome to StateURL Example"

## 🧪 automated tests

### option 1: simple test run

```bash
cd /home/isaac/pan/stateurl-example
pnpm test end2end/06-redirect-to-base.spec.ts
```

### option 2: comprehensive test (recommended)

```bash
./run-redirect-tests.sh
```

This script:

-   Stops existing dev servers
-   Starts fresh dev server
-   Waits for server to be ready
-   Runs all tests
-   Cleans up automatically

### option 3: interactive ui mode

```bash
pnpm test:ui end2end/06-redirect-to-base.spec.ts
```

Best for debugging! Shows browser and lets you step through tests.

## 🐛 if it doesn't work

### check 1: are changes loaded?

```bash
cd /home/isaac/pan/packages/stateurl
grep -n "redirectToBase: redirecting" index.tsx
```

Should show line ~222-225 with the redirect log.

### check 2: restart everything

```bash
# Stop dev server (Ctrl+C in terminal)

# Clear caches
cd /home/isaac/pan/stateurl-example
rm -rf node_modules/.vite

# Restart
pnpm dev
```

### check 3: verify App.tsx config

```bash
grep "redirectToBase" /home/isaac/pan/stateurl-example/src/App.tsx
```

Should show:

```typescript
redirectToBase={true}
```

### check 4: check console for errors

Open browser DevTools → Console tab. Look for:

-   ❌ Any red error messages
-   ❌ "redirectToBase check" with `isRoot: false` (means not detecting root)
-   ✅ "redirectToBase: redirecting" message (means working!)

## 📊 expected test results

```
Running 18 tests using 1 worker

  ✓ redirectToBase Feature
    ✓ should redirect from root to base path with defaults
    ✓ should redirect without trailing slash
    ✓ should use history.replaceState (no back button to root)
    ✓ should include all base pattern defaults in redirect
    ✓ should redirect to index route (home)
    ✓ should only redirect once (not loop)
    ✓ should not redirect when already on a valid path
    ✓ should work with different base pattern values
    ✓ should preserve hash when redirecting
    ✓ should preserve query params when redirecting

  ✓ redirectToBase Edge Cases
    ✓ should handle direct IP access
    ✓ should handle localhost with different ports
    ✓ should work after hard reload
    ✓ should work in incognito/private mode

  ✓ redirectToBase Performance
    ✓ should redirect without visible flash
    ✓ should redirect quickly (< 500ms)

  ✓ redirectToBase Console Output
    ✓ should log redirect in console (debug mode)
    ✓ should log redirect check for debugging

  18 passed (2.5s)
```

## 🎯 quick checklist

Before running tests:

-   [ ] Dev server is stopped (no running `pnpm dev`)
-   [ ] Changes saved in `packages/stateurl/index.tsx`
-   [ ] `App.tsx` has `redirectToBase={true}`
-   [ ] Playwright installed: `pnpm exec playwright --version`

Run tests:

-   [ ] `./run-redirect-tests.sh` completed successfully
-   [ ] All 18 tests passed
-   [ ] No error messages in output

Manual verification:

-   [ ] Browser redirects `/` → `/app/v1/light/home`
-   [ ] Console shows redirect logs
-   [ ] Page displays correctly
-   [ ] Back button works (doesn't go to `/`)

## ✨ success criteria

**Tests pass** + **Manual verification works** = ✅ Feature is working!

If tests pass but manual verification doesn't work:

-   Clear browser cache (Ctrl+Shift+R)
-   Try different browser
-   Check if dev server is using correct port (8000)

If manual verification works but tests fail:

-   Check Playwright version
-   Re-install browsers: `pnpm exec playwright install chromium`
-   Try: `pnpm test:ui` to see what's happening
