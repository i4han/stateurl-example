# StateURL Example - E2E Tests

Playwright tests for the stateurl-example application.

## Test Coverage

### 01-navigation.spec.ts
- ✅ Basic routing with base pattern
- ✅ Side navigation menu
- ✅ Active menu highlighting

### 02-features.spec.ts
- ✅ Theme feature toggle (light/dark)
- ✅ Version feature toggle (v1/v2)
- ✅ Feature persistence across navigation

### 03-params.spec.ts
- ✅ URL params with products (item:productId)
- ✅ URL params with users (profile:userId)
- ✅ Master-detail navigation
- ✅ Active item highlighting

### 04-query.spec.ts
- ✅ Query parameter state management
- ✅ Counter increment/decrement
- ✅ State persistence in URL
- ✅ Browser back/forward navigation

### 05-integration.spec.ts
- ✅ Features + params combination
- ✅ Features + query params combination
- ✅ 404 not found handling
- ✅ Footer path display

## Running Tests

```bash
# Install dependencies (if not already done)
pnpm install

# Run all tests
pnpm test

# Run tests in UI mode
pnpm test:ui

# Run tests in debug mode
pnpm test:debug

# Run specific test file
pnpm playwright test end2end/02-features.spec.ts

# Run with headed browser
pnpm playwright test --headed
```

## Test Results

All tests verify:
- URL structure and patterns
- Component rendering
- User interactions
- State management
- Feature flag behavior
- Navigation flows
