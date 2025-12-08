# StateURL Example App - Fixed and Working!

**Date:** December 8, 2025  
**Status:** ✅ ALL ROUTES WORKING

---

## Summary of All Fixes

### 1. ✅ Layout.tsx

**Issue:** Bare href attributes without basePattern **Fix:** Use `to()` helper
from `useNavigator()`

```typescript
const { handleHref, to } = useNavigator()
<a href={to('/home')} onClick={handleHref}>
```

---

### 2. ✅ Counter.tsx

**Issue 1:** Using old Map API (`route.query.get/set/delete`) **Issue 2:** Query
parameter not registered

**Fix:**

```typescript
const { route } = useNavigator()

// MUST register query param first!
route.createQuery('count')

// Use signal-based API
const count = Number(route.query.count) || 0
route.query.count = count + 1 // Set
route.query.count = undefined // Delete
```

**Before:**

```typescript
const count = Number(route.query.get('count')) || 0
route.query.set('count', String(count + 1))
route.query.delete('count')
```

---

### 3. ✅ Settings.tsx

**Issue:** Direct value assignment instead of `.set()` method

**Fix:**

```typescript
// Features use .set() method (not .value =)
feature.version.set('1') // ✅ Correct
feature.theme.set('dark') // ✅ Correct
```

**Before:**

```typescript
feature.version.value = '1' // ❌ Wrong
feature.theme.value = 'dark' // ❌ Wrong
```

---

### 4. ✅ routes.ts

**Issue 1:** `layout: true` prevented standalone route access **Issue 2:**
Missing slash in param syntax

**Fix:**

```typescript
{
    path: 'products',          // ✅ Removed layout:true
    render: Products,
    outlet: [
        { path: 'item/:productId', render: ProductDetail },  // ✅ Added slash
    ],
}
```

**Before:**

```typescript
{
    path: 'products',
    layout: true,              // ❌ Caused 404 on /products
    render: Products,
    outlet: [
        { path: 'item:productId', render: ProductDetail },   // ❌ Missing slash
    ],
}
```

---

### 5. ✅ Products.tsx & Users.tsx

**Issue:** Missing slash in URL template strings

**Fix:**

```typescript
href={to(`/products/item/${product.id}`)}   // ✅ With slash
href={to(`/users/profile/${user.id}`)}      // ✅ With slash
```

**Before:**

```typescript
href={to(`/products/item${product.id}`)}    // ❌ No slash
href={to(`/users/profile${user.id}`)}       // ❌ No slash
```

---

### 6. ✅ packages/stateurl/helpers.ts (Core Fix)

**Issue:** Router tried to match routes including query string (e.g.,
`counter?count=1`)

**Fix:**

```typescript
function match(pathname: string = window.location.pathname) {
    // Strip query string and hash before matching
    const pathOnly = (pathname || '/').split('?')[0].split('#')[0]
    const normalizedPath = pathOnly || '/'
    const segments = normalizedPath.split('/').filter(Boolean)
    // ... rest of matching logic
}
```

**Why:** Query params are part of the URL but NOT part of the route path. Routes
should match `/counter`, not `/counter?count=1`.

---

## Working URLs

All these URLs now work correctly:

-   ✅ `http://localhost:8000/app` → `/app/v1/light/home`
-   ✅ `http://localhost:8000/app/v1/light/counter` → Counter page
-   ✅ `http://localhost:8000/app/v1/light/counter?count=5` → Counter with query
    param
-   ✅ `http://localhost:8000/app/v1/light/products` → Product list
-   ✅ `http://localhost:8000/app/v1/light/products/item/1` → Product detail
-   ✅ `http://localhost:8000/app/v1/light/users` → User list
-   ✅ `http://localhost:8000/app/v1/light/users/profile/1` → User profile
-   ✅ `http://localhost:8000/app/v1/light/settings` → Settings (theme/version
    toggles work!)
-   ✅ `http://localhost:8000/app/v1/light/about` → About page

---

## Key Learnings

### 1. Query Parameters

-   **Must register first:** `route.createQuery('paramName')`
-   **Signal-based API:** `route.query.count = value` (not `.set()`)
-   **Delete:** `route.query.count = undefined` (not `.delete()`)

### 2. Feature Flags

-   **Read:** `feature.theme.value`
-   **Write:** `feature.theme.set('dark')` (use `.set()` method!)

### 3. Route Paths

-   **Params need slash:** `item/:productId` (not `item:productId`)
-   **URLs need slash:** `/products/item/${id}` (not `/products/item${id}`)

### 4. Router Internals

-   Routes match pathname WITHOUT query string
-   Query params preserved separately in URL
-   Hash preserved separately in URL

---

## API Summary

```typescript
// Navigation
const { to, via, go, handleHref, route } = useNavigator()

// Links
<a href={to('/path')} onClick={handleHref}>           // Absolute
<a href={to(`/path/${id}`)} onClick={handleHref}>     // With param
<a href={via('sibling')} onClick={handleHref}>        // Smart search

// Query params
route.createQuery('paramName')                         // Register
const value = route.query.paramName                    // Read
route.query.paramName = newValue                       // Write
route.query.paramName = undefined                      // Delete

// Features
const theme = feature.theme.value                      // Read
feature.theme.set('dark')                              // Write

// Route params
const userId = param.users.profile.value               // Read
param.users.profile.value = '123'                      // Write (navigates)
```

---

**Status:** ✅ FULLY WORKING - ALL ISSUES RESOLVED!
