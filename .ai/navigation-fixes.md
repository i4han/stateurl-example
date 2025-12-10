# Navigation API Fixed - Using path.* State

**Date:** 2025-12-09  
**Issue:** `via('/home')` causing double basePattern in URL  
**Cause:** Navigation functions using deprecated `pathname`, `basePath` signals  
**Fix:** Updated to use new `path.*` centralized state

---

## ❌ The Problem

**URL Duplication:**
```
Expected: /app/v1/light/via-demo
Actual:   /app/v1/light/app/v1/light/via-demo
```

**Root Cause:**
- `via()` was reading `pathname.value` which includes the FULL path with basePattern
- `go()` was then prepending basePattern again
- Result: basePattern appears twice!

---

## ✅ The Architecture

**Pure Functions** (return path only, NO base/features):
- `via(expression)` → `/home`
- `to(routePath)` → `/users/123`
- `toLabel(label)` → `/settings`

**Navigation Functions** (add base+features AND navigate):
- `go(path)` → prepend base → navigate to `/app/v1/light/home`
- `handleHref(e)` → delegates to `go()` or `jump()`
- `replace(path)` → prepend base → replace with `/app/v1/light/home`

---

## 🔧 Files Fixed

### 1. via/index.ts
**Before:**
```typescript
import { pathname } from '../signals'

function getCurrentMatch(): RouteMatch | null {
    const currentPath = pathname.value  // ❌ Includes base!
    const segments = currentPath.split('/').filter(Boolean)
    // ...
}

export function via(expression: string): string {
    return resolveViaExpression(parsed, {
        currentPath: pathname.value  // ❌ Includes base!
    })
}
```

**After:**
```typescript
import { path } from '../state/path'

function getCurrentMatch(): RouteMatch | null {
    const currentPath = path.resource.value  // ✅ Without base!
    const segments = currentPath.split('/').filter(Boolean)
    // ...
}

export function via(expression: string): string {
    return resolveViaExpression(parsed, {
        currentPath: path.resource.value  // ✅ Without base!
    })
}
```

### 2. navigation/go.ts
**Before:**
```typescript
import { pathname, basePath } from '../signals'

export function go(to: string): void {
    const base = basePath.value || '/'  // ❌ Old signal
    const fullPath = base === '/' ? to : base + to
    // ...
}
```

**After:**
```typescript
import { path } from '../state/path'
import { pathname } from '../signals'

export function go(to: string): void {
    const base = path.base.value || '/'  // ✅ New state!
    const fullPath = base === '/' ? to : base + to
    // ...
}
```

### 3. navigation/replace.ts
**Before:**
```typescript
export function replace(to: string): void {
    // No basePattern prepending!
    pathname.value = to
}
```

**After:**
```typescript
import { path } from '../state/path'

export function replace(to: string): void {
    const base = path.base.value || '/'  // ✅ Now prepends!
    const fullPath = base === '/' ? to : base + to
    pathname.value = fullPath
}
```

---

## ✅ How It Works Now

### Example: via('/home')

1. **User calls:** `via('/home')`
2. **via() reads:** `path.resource.value` = `/via-demo` (current page, no base)
3. **via() returns:** `/home` (pure path, no base)
4. **User calls:** `go(via('/home'))`
5. **go() reads:** `path.base.value` = `/app/v1/light`
6. **go() navigates to:** `/app/v1/light/home` ✅

### Example: via('settings')

1. **User calls:** `via('settings')`
2. **via() reads:** `path.resource.value` = `/home`
3. **via() smart search:** finds 'settings' as sibling
4. **via() returns:** `/settings`
5. **User calls:** `go(via('settings'))`
6. **go() prepends:** `/app/v1/light` + `/settings`
7. **Result:** `/app/v1/light/settings` ✅

---

## 📊 State Architecture

### Old (Deprecated)
```typescript
pathname.value  // Full path with base
basePath.value  // Computed from signals
routePath.value // Computed
```

### New (v0.2.0)
```typescript
path.full.value      // Full path with base
path.base.value      // Base pattern only
path.resource.value  // Resource path only (no base)
```

**Separation of Concerns:**
- Pure functions use `path.resource.value` (no base)
- Navigation functions use `path.base.value` to prepend
- Display uses `path.full.value` for current location

---

## ✅ Benefits

1. **No Duplication** - Base pattern added only once
2. **Clear Separation** - Pure vs navigation functions
3. **Consistent** - All using `path.*` state
4. **Type-Safe** - Centralized state management
5. **Testable** - Clear input/output contracts

---

**Status:** Navigation API fully fixed! ✅
