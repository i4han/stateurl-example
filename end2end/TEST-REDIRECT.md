---
description: Guide for testing redirectToBase feature
---

# testing redirectToBase feature

## quick start

### run all redirect tests

```bash
cd /home/isaac/pan/stateurl-example

# Run all redirect tests
pnpm test end2end/06-redirect-to-base.spec.ts

# Or use the helper script
./end2end/test-redirect.sh
```

### run specific test

```bash
# Run one specific test
pnpm test end2end/06-redirect-to-base.spec.ts -g "should redirect from root"

# Run with UI mode (interactive)
pnpm test:ui end2end/06-redirect-to-base.spec.ts

# Run in debug mode
pnpm test:debug end2end/06-redirect-to-base.spec.ts
```

## test coverage

The test suite covers:

### ✅ basic functionality

-   Redirects from `/` to `/app/v1/light/home`
-   Works without trailing slash
-   Uses `replaceState` (no back button to root)
-   Includes all basePattern defaults
-   Redirects to index route

### ✅ edge cases

-   Direct IP access (e.g., `10.222.26.99:8000`)
-   Different ports
-   Hard reload
-   Incognito/private mode
-   Hash preservation (`/#section` → `/app/v1/light/home#section`)
-   Query param preservation (`/?debug=true` → `/app/v1/light/home?debug=true`)

### ✅ performance

-   No visible flash during redirect
-   Redirect time < 100ms
-   No 404 errors

### ✅ debugging

-   Console logs redirect event
-   Logs include source and destination paths
-   Only redirects once (no loops)

## test structure

```
06-redirect-to-base.spec.ts
├── redirectToBase Feature
│   ├── should redirect from root to base path with defaults
│   ├── should redirect without trailing slash
│   ├── should use history.replaceState (no back button to root)
│   ├── should include all base pattern defaults in redirect
│   ├── should redirect to index route (home)
│   ├── should only redirect once (not loop)
│   ├── should not redirect when already on a valid path
│   ├── should work with different base pattern values
│   ├── should preserve hash when redirecting
│   └── should preserve query params when redirecting
├── redirectToBase Edge Cases
│   ├── should handle direct IP access
│   ├── should handle localhost with different ports
│   ├── should work after hard reload
│   └── should work in incognito/private mode
├── redirectToBase Performance
│   ├── should redirect without visible flash
│   └── should redirect quickly (< 100ms)
└── redirectToBase Console Output
    ├── should log redirect in console (debug mode)
    └── should log redirect check for debugging
```

## expected results

All tests should **PASS** if redirectToBase is working correctly:

```
  ✓ redirectToBase Feature (10 tests)
  ✓ redirectToBase Edge Cases (4 tests)
  ✓ redirectToBase Performance (2 tests)
  ✓ redirectToBase Console Output (2 tests)

  18 passed (1.2s)
```

## troubleshooting

### test fails: "Expected URL to be /app/v1/light/home, got /home"

**Problem**: Redirect is going to `/home` instead of full path

**Fix**:

1. Verify changes in `packages/stateurl/index.tsx` are saved
2. Restart dev server: `Ctrl+C` then `pnpm dev`
3. Hard reload browser: `Ctrl+Shift+R`
4. Re-run test

### test fails: "Timeout waiting for URL"

**Problem**: Redirect isn't happening

**Fix**:

1. Check browser console for errors
2. Verify `redirectToBase={true}` in `App.tsx`
3. Check console logs: should see `[Router] redirectToBase check:`

### test fails: "Cannot find baseURL"

**Problem**: Dev server not running

**Fix**:

```bash
# Start dev server manually
pnpm dev

# Then run tests in another terminal
pnpm test
```

### all tests fail with network errors

**Problem**: Playwright can't reach dev server

**Fix**:

```bash
# Install Playwright browsers
pnpm exec playwright install chromium

# Re-run tests
pnpm test
```

## running all end2end tests

```bash
# Run all e2e tests
pnpm test

# Run with UI
pnpm test:ui

# Run in headed mode (see browser)
pnpm test --headed

# Generate HTML report
pnpm test --reporter=html
```

## debugging tips

### 1. watch test execution

```bash
pnpm test --headed end2end/06-redirect-to-base.spec.ts
```

### 2. pause on failure

```bash
pnpm test:debug end2end/06-redirect-to-base.spec.ts
```

### 3. check console logs

Tests capture console output. Add this to your test:

```typescript
test('debug console', async ({ page }) => {
    page.on('console', (msg) => console.log('Browser:', msg.text()))
    await page.goto('/')
    // Will print all browser console logs
})
```

### 4. take screenshots

```typescript
test('debug screenshot', async ({ page }) => {
    await page.goto('/')
    await page.screenshot({ path: 'debug.png' })
})
```

## continuous integration

Add to your CI workflow:

```yaml
- name: Run Playwright tests
  run: |
      pnpm install
      pnpm exec playwright install --with-deps chromium
      pnpm test
```

## test commands reference

```bash
# All tests
pnpm test

# Specific file
pnpm test end2end/06-redirect-to-base.spec.ts

# Specific test by name
pnpm test -g "should redirect from root"

# UI mode (interactive)
pnpm test:ui

# Debug mode (step through)
pnpm test:debug

# Headed mode (see browser)
pnpm test --headed

# Update snapshots
pnpm test --update-snapshots

# Show browser (not headless)
pnpm test --headed --project=chromium

# Specific browser
pnpm test --project=chromium
pnpm test --project=firefox
pnpm test --project=webkit
```

## next steps

After tests pass:

1. ✅ Verify feature works in production build
2. ✅ Add to CI/CD pipeline
3. ✅ Update documentation
4. ✅ Remove debug console.logs (or keep behind flag)

## resources

-   [Playwright Documentation](https://playwright.dev)
-   [Test Best Practices](https://playwright.dev/docs/best-practices)
-   [Debugging Tests](https://playwright.dev/docs/debug)
