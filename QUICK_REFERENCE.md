# StateURL Quick Reference Card

**For:** Developers and LLMs building with StateURL  
**Version:** 2.0

---

## ⚡ Critical Rules (DO/DON'T)

### ✅ DO

```typescript
// Navigation
<a href={to('/path')} onClick={handleHref}>Link</a>

// Query params
route.createQuery('name')              // Register first!
route.query.name = value               // Signal API

// Features
feature.theme.set('dark')              // Use .set()

// Params in routes
{ path: 'item/:id', render: Detail }   // Slash before :

// Params in URLs
to(`/products/item/${id}`)             // Slash before ${
```

### ❌ DON'T

```typescript
// Navigation
<a href='/path'>Link</a>               // Missing to()
<a href={to('/path')}>Link</a>         // Missing handleHref

// Query params  
route.query.name = value               // Without createQuery()
route.query.set('name', value)         // Using Map API

// Features
feature.theme.value = 'dark'           // Direct assignment

// Params in routes
{ path: 'item:id', render: Detail }    // No slash

// Params in URLs
to(`/products/item${id}`)              // No slash

// Layout flag
{ path: 'list', layout: true }         // On accessible route
```

---

## 🎯 Navigation Functions

| Function | basePattern | Search | Returns | Use For |
|----------|-------------|--------|---------|---------|
| `go(path)` | ❌ | ❌ | void | Complete URLs |
| `to(path)` | ✅ | ❌ | string | Direct paths |
| `via(expr)` | ✅ | ✅ | string | Route names |

```typescript
// go() - Raw navigation
go('/app/v1/light/products')           // Exact URL

// to() - Path helper
to('/products')                        // Add basePattern
to(`/products/item/${id}`)             // With params

// via() - Smart search
via('settings')                        // Find by name
via('products/item')                   // Multi-segment
```

---

## 🗂️ Route Definitions

```typescript
export const routes = [
    {
        layout: true,                  // Root wrapper only!
        render: Layout,
        outlet: [
            {
                path: 'home',
                index: true,           // Default route
                render: Home
            },
            {
                path: 'products',      // No layout: true!
                render: Products,
                outlet: [
                    {
                        path: 'item/:id',  // ⚠️ Slash required
                        render: Detail
                    }
                ]
            }
        ]
    }
] as const satisfies Route[]
```

---

## 🧩 Component Patterns

### Pattern 1: Layout with Navigation

```typescript
import { Outlet, useNavigator } from 'stateurl'

export default function Layout() {
    const { to, handleHref, routePath } = useNavigator()
    
    return (
        <div>
            <nav>
                <a href={to('/home')} onClick={handleHref}>
                    Home
                </a>
            </nav>
            <main>
                <Outlet />  {/* Children render here */}
            </main>
        </div>
    )
}
```

### Pattern 2: List with Outlet

```typescript
import { Outlet, useNavigator, param } from 'stateurl'

export default function Products() {
    const { to, handleHref } = useNavigator()
    const currentId = param.products?.item?.value
    
    return (
        <div className='container'>
            <div className='list'>
                {items.map(item => (
                    <a
                        href={to(`/products/item/${item.id}`)}
                        onClick={handleHref}
                        className={currentId === item.id ? 'active' : ''}
                    >
                        {item.name}
                    </a>
                ))}
            </div>
            <div className='detail'>
                {currentId ? <Outlet /> : <Placeholder />}
            </div>
        </div>
    )
}
```

### Pattern 3: Detail Component

```typescript
import { useNavigator, param } from 'stateurl'

export default function ProductDetail() {
    const { to, handleHref } = useNavigator()
    
    // Access param: param.<parent>.<child>.value
    const productId = param.products?.item?.value
    const product = findProduct(productId)
    
    if (!product) return <div>Not found</div>
    
    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <a href={to('/products')} onClick={handleHref}>
                ← Back
            </a>
        </div>
    )
}
```

### Pattern 4: Query Parameters

```typescript
import { useNavigator } from 'stateurl'

export default function Counter() {
    const { route } = useNavigator()
    
    // STEP 1: Register
    route.createQuery('count')
    
    // STEP 2: Use signal API
    const count = Number(route.query.count) || 0
    
    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={() => route.query.count = count + 1}>
                +
            </button>
            <button onClick={() => route.query.count = undefined}>
                Reset
            </button>
        </div>
    )
}
```

### Pattern 5: Feature Flags

```typescript
import { feature } from 'stateurl'

export default function Settings() {
    const theme = feature.theme.value
    
    return (
        <div>
            <h2>Theme: {theme}</h2>
            <button onClick={() => feature.theme.set('light')}>
                ☀️ Light
            </button>
            <button onClick={() => feature.theme.set('dark')}>
                🌙 Dark
            </button>
        </div>
    )
}
```

---

## 🔧 State Management

### Route Parameters

```typescript
// Define in route
{ path: 'user/:userId', render: UserDetail }

// Access in component
const userId = param.users?.user?.value

// Set (triggers navigation)
param.users.user.value = '123'
```

**Pattern:** `param.<parent>.<child>.value`

### Query Parameters

```typescript
// Register
route.createQuery('sort')

// Read
const sort = route.query.sort

// Write
route.query.sort = 'price'

// Delete
route.query.sort = undefined
```

**Type:** Always strings, convert as needed

### Feature Flags

```typescript
// Define in Router
<Router basePattern='/app/:version=v1/:theme=light' />

// Read
const version = feature.version.value

// Write (use .set()!)
feature.version.set('2')
```

**Scope:** Global (affects all routes)

---

## 🐛 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| 404 with query string | Router matches `?count=1` | Fixed in v2.0+ |
| Query param undefined | Not registered | `route.createQuery('name')` first |
| Feature doesn't navigate | Used `.value =` | Use `.set()` method |
| Can't access /products | Has `layout: true` | Remove flag |
| Param undefined | Wrong path | Match route structure |
| Full page reload | Missing `handleHref` | Add `onClick={handleHref}` |

---

## 📚 Full Documentation

- **README.md** - Complete guide (this file's big brother)
- **UPDATED.md** - Fixes applied to this example
- **Source code** - Best reference for patterns

---

**Made with StateURL 2.0** 🚀
