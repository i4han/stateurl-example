# Via Example Component - Rewritten

**Date:** 2025-12-09  
**Issue:** Used deprecated `pathname.value`  
**Fix:** Rewrote with correct `path.full.value` API

---

## ✅ What Changed

### Old (Broken)
```typescript
import { pathname } from 'stateurl'

// Line 26
<code>{pathname.value}</code>
```

### New (Fixed)
```typescript
import { path } from 'stateurl'

// Read current path
const currentPath = path.full.value

// Display
<code>{currentPath}</code>
```

---

## 📋 API Updates

### Import Changes
```typescript
// Before
import { useNavigator, via, go, pathname } from 'stateurl'

// After
import { useNavigator, via, go, path } from 'stateurl'
```

### Usage Changes
```typescript
// Before (deprecated)
pathname.value  // ❌ Old signal export

// After (new centralized state)
path.full.value  // ✅ New path state
```

---

## ✅ Component Features

The ViaExample component demonstrates:

1. **Absolute Paths** - Direct navigation with `/path`
2. **Smart Search** - 6-level priority search
3. **Hierarchical Paths** - Multi-level navigation
4. **Param Syntax** - Colon syntax for params
5. **Integration** - Using via() with go()
6. **v2 Changes** - What's different from v1

---

## 🧪 E2E Tests

All 17 tests in `end2end/07-via-navigation.spec.ts` cover:
- ✅ Page load and display
- ✅ Absolute path navigation
- ✅ Smart search results
- ✅ Hierarchical navigation
- ✅ Param syntax
- ✅ Integration with go()
- ✅ Result display
- ✅ Context-aware navigation

---

## 📊 Before vs After

### Before (Broken)
- Used deprecated `pathname` import
- Direct signal access `pathname.value`
- Would break with v0.2.0 changes

### After (Fixed)
- Uses new `path` import
- Centralized state `path.full.value`
- Compatible with v0.2.0
- Follows new API patterns

---

**Status:** Via example fixed and ready! ✅
