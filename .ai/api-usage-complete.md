# StateURL Example - Correct API Usage

**All components now use Proxy API consistently**

---

## ✅ Components Updated

### 1. Settings.tsx

```typescript
// Read
const version = feature.version
const theme = feature.theme

// Write
feature.version = 'v1' // Not .set(), not .value
feature.theme = 'dark'
```

### 2. Layout.tsx

```typescript
// Read
const version = feature.version
const theme = feature.theme

// Write (toggle)
feature.version = version === 'v1' ? 'v2' : 'v1'
feature.theme = theme === 'light' ? 'dark' : 'light'
```

### 3. Home.tsx

```typescript
// Read
const version = feature.version
const theme = feature.theme

// Display
<p>Version: {version}, Theme: {theme}</p>
```

### 4. ProductDetail.tsx

```typescript
const { route } = useNavigator()

// Read param (Proxy)
const productId = route.param.productId
```

### 5. UserDetail.tsx

```typescript
const { route } = useNavigator()

// Read param (Proxy)
const userId = route.param.userId
```

### 6. Counter.tsx

```typescript
const { route } = useNavigator()

// Register query
route.createQuery('count')

// Read
const count = Number(route.query.count) || 0

// Write (Proxy)
route.query.count = count + 1
```

---

## 🎯 API Pattern

**Consistent across all three:**

| Type        | Read                 | Write                    |
| ----------- | -------------------- | ------------------------ |
| **feature** | `feature.version`    | `feature.version = 'v1'` |
| **param**   | `route.param.userId` | Read-only                |
| **query**   | `route.query.count`  | `route.query.count = 5`  |

**No `.value`, no `.set()` - just simple assignment!**

---

## 📝 CodeExamples Updated

All `<CodeExample>` components now show correct Proxy API:

```typescript
// ✅ Correct
feature.theme = 'dark'

// ❌ Wrong (removed from examples)
feature.theme.value = 'dark'
feature.theme.set('dark')
```

---

## 🧪 Tests

End-to-end tests verify Proxy API works:

-   Feature toggles in Settings page
-   Feature persistence across navigation
-   Param extraction in detail pages
-   Query state in Counter

---

**Status:** All components use correct Proxy API ✅
