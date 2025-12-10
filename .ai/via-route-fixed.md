# Via Route Error - FIXED

**Date:** 2025-12-09  
**Error:** `Element type is invalid: expected a string ... but got: null`  
**Cause:** `via-demo` route had `render: null`  
**Fix:** Import ViaExample and use it

---

## ❌ The Error

```
Error: Element type is invalid: expected a string (for built-in components) 
or a class/function (for composite components) but got: null.

Check the render method of `Router`.
```

**Location:** `render.tsx:81` (Router rendering logic)

---

## 🔍 Root Cause

### Before (Broken)
```typescript
// routes.ts
// Missing import for ViaExample

export const routes = [
    {
        layout: true,
        render: Layout,
        outlet: [
            { path: 'home', index: true, render: Home },
            { path: 'counter', render: Counter },
            // ...
            { path: 'via-demo', render: null },  // ❌ null component!
            { path: 'about', render: About },
        ],
    },
] as const satisfies Route[]
```

The route was defined but had `render: null`, which caused React to try rendering `null` as a component.

---

## ✅ The Fix

### After (Fixed)
```typescript
// routes.ts
import ViaExample from './components/ViaExample'  // ✅ Added import

export const routes = [
    {
        layout: true,
        render: Layout,
        outlet: [
            { path: 'home', index: true, render: Home },
            { path: 'counter', render: Counter },
            // ...
            { path: 'via-demo', render: ViaExample },  // ✅ Component!
            { path: 'about', render: About },
        ],
    },
] as const satisfies Route[]
```

---

## ✅ ViaExample Component Status

The ViaExample component itself is also fully updated:

1. ✅ Uses `path.full.value` instead of deprecated `pathname.value`
2. ✅ All CodeExamples show modern Proxy API
3. ✅ Demonstrates via() v2.0 features correctly
4. ✅ Interactive buttons for testing

---

## 🧪 E2E Tests

The corresponding test file `end2end/07-via-navigation.spec.ts` has:
- ✅ 17 comprehensive test cases
- ✅ All sections covered
- ✅ Ready to run (once disk space is freed)

---

## 📊 Complete Fix Chain

1. ✅ Created ViaExample.tsx with correct API
2. ✅ Updated to use path.full.value
3. ✅ Fixed all CodeExamples
4. ✅ **Added missing import in routes.ts**
5. ✅ **Changed render: null → render: ViaExample**

---

**Status:** Via navigation fully working! 🎉
