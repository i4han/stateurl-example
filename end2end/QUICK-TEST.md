---
description: Quick test guide for redirectToBase
---

# quick test - redirectToBase

## 🚀 run the tests

```bash
cd /home/isaac/pan/stateurl-example

# Option 1: Run redirect tests only
pnpm test end2end/06-redirect-to-base.spec.ts

# Option 2: Use helper script
./end2end/test-redirect.sh

# Option 3: Interactive UI mode (recommended!)
pnpm test:ui end2end/06-redirect-to-base.spec.ts
```

## 📊 what tests check

18 tests covering:

✅ Root redirect (`/` → `/app/v1/light/home`)  
✅ No trailing slash (`10.222.26.99:8000` → `/app/v1/light/home`)  
✅ Preserves hash & query params  
✅ No redirect loops  
✅ Fast performance (< 100ms)  
✅ Console logging works

## 🎯 expected output

```
Running 18 tests using 1 worker

  ✓ redirectToBase Feature (10/10)
  ✓ redirectToBase Edge Cases (4/4)
  ✓ redirectToBase Performance (2/2)
  ✓ redirectToBase Console Output (2/2)

  18 passed (1.2s)
```

## 🐛 if tests fail

### test says: redirected to /home instead of /app/v1/light/home

**Fix**: Changes not loaded

```bash
# 1. Stop dev server (Ctrl+C)
# 2. Restart
pnpm dev

# 3. In new terminal, run tests
pnpm test end2end/06-redirect-to-base.spec.ts
```

### test says: timeout waiting for URL

**Fix**: Check dev server is running

```bash
# Terminal 1: Start dev server
pnpm dev

# Terminal 2: Run tests
pnpm test end2end/06-redirect-to-base.spec.ts
```

### playwright not installed

```bash
# Install Playwright browsers
pnpm exec playwright install chromium

# Re-run tests
pnpm test
```

## 🎬 visual debugging

See the browser during tests:

```bash
# Run tests with visible browser
pnpm test --headed end2end/06-redirect-to-base.spec.ts

# Or use debug mode (step through)
pnpm test:debug end2end/06-redirect-to-base.spec.ts
```

## 📝 test file location

```
stateurl-example/
└── end2end/
    ├── 06-redirect-to-base.spec.ts  ← Main test file
    ├── test-redirect.sh             ← Helper script
    ├── TEST-REDIRECT.md             ← Full guide
    └── QUICK-TEST.md                ← This file
```

## ⚡ quick commands

```bash
# Run all redirect tests
pnpm test end2end/06-redirect-to-base.spec.ts

# Run one specific test
pnpm test -g "should redirect from root"

# Interactive mode (best for debugging)
pnpm test:ui

# See browser
pnpm test --headed

# Generate report
pnpm test --reporter=html
```

## ✨ next steps

After tests pass:

1. Check browser console shows: `[Router] redirectToBase: redirecting...`
2. Manually test: Visit `http://10.222.26.99:8000` (should go to
   `/app/v1/light/home`)
3. All good? Remove debug `console.log` statements
4. Commit changes

## 📚 full documentation

See: [TEST-REDIRECT.md](./TEST-REDIRECT.md) for complete guide


