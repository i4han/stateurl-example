# StateURL Example Application - Complete Development Guide

**Purpose:** Reference implementation demonstrating all StateURL patterns  
**Audience:** Developers and AI/LLMs building with StateURL  
**Version:** 2.0

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Core Concepts](#core-concepts)
4. [Building Blocks](#building-blocks)
5. [Component Patterns](#component-patterns)
6. [API Reference](#api-reference)
7. [Common Mistakes](#common-mistakes)
8. [Troubleshooting](#troubleshooting)
9. [API Documentation](#api-documentation)

---

## Quick Start

```bash
# Install
pnpm install

# Run
pnpm dev

# Visit
http://localhost:8000/app
```

**What you'll see:**
- Redirects to `/app/v1/light/home`
- Navigation bar with all pages
- Functional routing with params, query, and features

---

## Project Structure

```
stateurl-example/
├── src/
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Router configuration
│   ├── routes.ts          # Route definitions ⭐
│   ├── main.css           # Styles
│   └── components/
│       ├── Layout.tsx     # Root layout with nav ⭐
│       ├── Home.tsx       # Simple page
│       ├── Counter.tsx    # Query params demo ⭐
│       ├── Products.tsx   # List with outlet ⭐
│       ├── ProductDetail.tsx  # Detail view ⭐
│       ├── Users.tsx      # List with outlet
│       ├── UserDetail.tsx # Detail view
│       ├── Settings.tsx   # Feature flags demo ⭐
│       └── About.tsx      # Static page
├── docs/              # TypeDoc API documentation
├── UPDATED.md         # Fix summary (what was changed)
└── README.md          # This file (how to build)
```

**⭐ = Essential patterns to study**

---

## Core Concepts

### URL Structure

```
http://localhost:8000/app/v1/light/products/item/123?sort=price#reviews
                       └─┬─┘└┬┘└──┬─┘└──────┬──────┘└────┬────┘└──┬──┘
                     basename│ theme      route       query    hash
                          version      (with param)
                         (feature)
```

### StateURL Philosophy

**URL IS your state.**

| State Type | Where | Example | Persistence |
|------------|-------|---------|-------------|
| Navigation | Route path | `/products/item/123` | Active route |
| Resource ID | Route param | `:productId` → `123` | Active route |
| UI State | Query param | `?sort=price&view=grid` | Active route |
| App Config | Feature flag | `:theme=light` | All routes |

**Benefits:**
1. ✅ Shareable URLs
2. ✅ Bookmarkable state
3. ✅ Browser back/forward works
4. ✅ Refresh preserves state
5. ✅ No hydration issues

---

## Building Blocks

### 1. Router Configuration

**File:** `src/App.tsx`

```typescript
import { Router } from 'stateurl'
import { routes } from './routes'

export default function App() {
    return (
        <Router
            routes={routes}
            basePattern='/app/:version=v1/:theme=light'
            RenderNotFound={NotFound}
        />
    )
}
```

**basePattern breakdown:**
- `/app` - Basename (URL prefix)
- `:version=v1` - Feature flag with default
- `:theme=light` - Feature flag with default

**Creates:**
- `feature.version` signal (default: `'v1'`)
- `feature.theme` signal (default: `'light'`)

**URLs:**
- `/app/v1/light/home`
- `/app/v1/light/products`
- `/app/v2/dark/settings` (after changing features)

### 2. Route Definitions

**File:** `src/routes.ts`

```typescript
import type { Route } from 'stateurl'
import Layout from './components/Layout'
import Home from './components/Home'
import Products from './components/Products'
import ProductDetail from './components/ProductDetail'

export const routes = [
    {
        // Root layout - wraps all pages
        layout: true,
        render: Layout,
        outlet: [
            // Index route (default)
            { 
                path: 'home', 
                index: true, 
                render: Home 
            },
            
            // List with nested detail
            {
                path: 'products',
                render: Products,
                outlet: [
                    // ⚠️ Slash required before :productId
                    { 
                        path: 'item/:productId', 
                        render: ProductDetail 
                    }
                ]
            }
        ]
    }
] as const satisfies Route[]
```

**⚠️ CRITICAL RULES:**

1. **Param paths need slash:**
   - ✅ `'item/:productId'`
   - ❌ `'item:productId'`

2. **Don't use `layout: true` for accessible routes:**
   - ✅ Root wrapper only
   - ❌ List/detail views

3. **Paths are relative to parent:**
   - Parent: `'products'`
   - Child: `'item/:id'`
   - Full: `/products/item/123`

### 3. Navigation Functions

StateURL provides 3 functions for navigation:

#### `go(path)` - Raw Navigation
```typescript
import { go } from 'stateurl'

go('/app/v1/light/products')  // Exact URL
```

- Does NOT add basePattern
- Requires complete URL
- Use for: external URLs, testing

#### `to(path)` - Path Helper
```typescript
import { to } from 'stateurl'

to('/products')  
// Returns: '/app/v1/light/products'

to(`/products/item/${id}`)
// Returns: '/app/v1/light/products/item/123'
```

- ALWAYS adds basePattern
- Simple concatenation
- Use for: href attributes, template strings

#### `via(expression)` - Smart Search
```typescript
import { via } from 'stateurl'

via('settings')
// Searches entire tree, returns: '/app/v1/light/settings'

via('products/item')
// Searches for 'products', then 'item' child
```

- ALWAYS adds basePattern
- Intelligent route search
- Use for: resilient navigation, semantic routing

**Comparison:**

| Function | basePattern | Search | Use Case |
|----------|-------------|--------|----------|
| `go()` | ❌ | ❌ | Complete URLs |
| `to()` | ✅ | ❌ | Direct paths |
| `via()` | ✅ | ✅ | Route names |

---

## Component Patterns

### Pattern 1: Layout Component

**Purpose:** Wraps all pages, provides navigation

**File:** `src/components/Layout.tsx`

**Key features:**
- Uses `layout: true` in route
- Renders `<Outlet />` for children
- Provides global navigation
- Uses `handleHref` for SPA navigation

**Complete code:**
```typescript
import { Outlet, useNavigator } from 'stateurl'

export default function Layout() {
    const { to, handleHref, routePath } = useNavigator()
    const currentPath = routePath.value
    
    const isActive = (path: string) => currentPath.includes(path)
    
    return (
        <div className='app'>
            <header>
                <nav>
                    <a 
                        href={to('/home')} 
                        onClick={handleHref}
                        className={isActive('/home') ? 'active' : ''}
                    >
                        Home
                    </a>
                    <a 
                        href={to('/products')} 
                        onClick={handleHref}
                        className={isActive('/products') ? 'active' : ''}
                    >
                        Products
                    </a>
                </nav>
            </header>
            
            <main>
                <Outlet />  {/* Child routes render here */}
            </main>
        </div>
    )
}
```

**⚠️ Must have:**
1. `to()` for all href attributes
2. `handleHref` on all onClick handlers
3. `<Outlet />` to render children
4. Active link detection using `routePath.value`

### Pattern 2: List Component with Outlet

**Purpose:** Master-detail view (list + detail side-by-side)

**File:** `src/components/Products.tsx`

**URLs:**
- `/products` - List only, placeholder on right
- `/products/item/123` - List + detail

**Complete code:**
```typescript
import { Outlet, useNavigator, param } from 'stateurl'

const products = [
    { id: '1', name: 'Laptop', price: 999 },
    { id: '2', name: 'Mouse', price: 29 },
]

export default function Products() {
    const { handleHref, to } = useNavigator()
    
    // Read current param to highlight active item
    const productId = param.products?.item?.value
    
    return (
        <section>
            <h2>Products</h2>
            
            <div className='products-container'>
                {/* Left: List */}
                <div className='products-list'>
                    <h3>Product List</h3>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <a
                                    href={to(`/products/item/${product.id}`)}
                                    onClick={handleHref}
                                    className={productId === product.id ? 'active' : ''}
                                >
                                    {product.name} - ${product.price}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Right: Detail or placeholder */}
                <div className='product-detail-container'>
                    {productId ? (
                        <Outlet />
                    ) : (
                        <div className='placeholder'>
                            ← Select a product
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
```

**⚠️ Critical points:**

1. **URL must include slash:**
   ```typescript
   // ✅ Correct
   to(`/products/item/${product.id}`)
   
   // ❌ Wrong
   to(`/products/item${product.id}`)
   ```

2. **Route must include slash:**
   ```typescript
   // ✅ Correct
   { path: 'item/:productId', render: ProductDetail }
   
   // ❌ Wrong
   { path: 'item:productId', render: ProductDetail }
   ```

3. **Conditionally render `<Outlet />`:**
   ```typescript
   {productId ? <Outlet /> : <Placeholder />}
   ```

4. **Don't use `layout: true`:**
   ```typescript
   // ✅ Correct - can access /products
   { path: 'products', render: Products, outlet: [...] }
   
   // ❌ Wrong - can't access /products
   { path: 'products', layout: true, render: Products, outlet: [...] }
   ```

### Pattern 3: Detail Component

**Purpose:** Show single item details

**File:** `src/components/ProductDetail.tsx`

**Complete code:**
```typescript
import { useNavigator, param } from 'stateurl'

const products = [
    { id: '1', name: 'Laptop', price: 999, description: 'Powerful laptop' },
    { id: '2', name: 'Mouse', price: 29, description: 'Ergonomic mouse' },
]

export default function ProductDetail() {
    const { to, handleHref } = useNavigator()
    
    // Access URL parameter
    const productId = param.products?.item?.value
    const product = products.find(p => p.id === productId)
    
    if (!product) {
        return <div>Product not found</div>
    }
    
    return (
        <div className='product-detail'>
            <h3>{product.name}</h3>
            <p className='price'>${product.price}</p>
            <p>{product.description}</p>
            
            <a href={to('/products')} onClick={handleHref}>
                ← Back to list
            </a>
        </div>
    )
}
```

**⚠️ Param access pattern:**

Route structure:
```typescript
{
    path: 'products',        // param.products
    outlet: [
        { path: 'item/:productId' }  // param.products.item
    ]
}
```

Access:
```typescript
// ✅ Correct - matches structure
param.products.item.value

// ❌ Wrong - doesn't match
param.item.value
param.productId.value
```

### Pattern 4: Query Parameters

**Purpose:** Store ephemeral UI state in URL

**File:** `src/components/Counter.tsx`

**URLs:**
- `/counter` - Count is 0
- `/counter?count=5` - Count is 5

**Complete code:**
```typescript
import { useNavigator } from 'stateurl'

export default function Counter() {
    const { route } = useNavigator()
    
    // ⚠️ STEP 1: Register query param (REQUIRED!)
    route.createQuery('count')
    
    // ⚠️ STEP 2: Access using signal API
    const count = Number(route.query.count) || 0
    
    const increment = () => {
        route.query.count = count + 1
    }
    
    const decrement = () => {
        route.query.count = count - 1
    }
    
    const reset = () => {
        route.query.count = undefined  // Removes from URL
    }
    
    return (
        <section>
            <h2>Counter: {count}</h2>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>Reset</button>
        </section>
    )
}
```

**⚠️ Query Parameter Rules:**

1. **MUST register first:**
   ```typescript
   // ✅ Correct
   route.createQuery('count')
   const value = route.query.count
   
   // ❌ Wrong - Warning: "not registered"
   const value = route.query.count
   ```

2. **Use signal API (NOT Map API):**
   ```typescript
   // ✅ Correct - Signal API
   const value = route.query.count           // Read
   route.query.count = 5                     // Write
   route.query.count = undefined             // Delete
   
   // ❌ Wrong - Map API (deprecated)
   const value = route.query.get('count')
   route.query.set('count', '5')
   route.query.delete('count')
   ```

3. **Type conversion:**
   ```typescript
   // Query params are always strings
   const num = Number(route.query.count) || 0
   const bool = route.query.active === 'true'
   const arr = route.query.tags?.split(',') || []
   ```

### Pattern 5: Feature Flags

**Purpose:** Global app configuration

**File:** `src/components/Settings.tsx`

**URLs:**
- `/app/v1/light/settings` - Initial
- `/app/v2/dark/settings` - After changing both

**Complete code:**
```typescript
import { feature } from 'stateurl'

export default function Settings() {
    // Read feature values
    const version = feature.version.value
    const theme = feature.theme.value
    
    return (
        <section>
            <h2>Settings</h2>
            
            <div className='setting-item'>
                <h3>Version: {version}</h3>
                <button onClick={() => feature.version.set('1')}>
                    Version 1
                </button>
                <button onClick={() => feature.version.set('2')}>
                    Version 2
                </button>
            </div>
            
            <div className='setting-item'>
                <h3>Theme: {theme}</h3>
                <button onClick={() => feature.theme.set('light')}>
                    ☀️ Light
                </button>
                <button onClick={() => feature.theme.set('dark')}>
                    🌙 Dark
                </button>
            </div>
        </section>
    )
}
```

**⚠️ Feature Flag Rules:**

1. **Use `.set()` method (NOT `.value =`):**
   ```typescript
   // ✅ Correct
   feature.theme.set('dark')
   
   // ❌ Wrong - Doesn't navigate!
   feature.theme.value = 'dark'
   ```

2. **Features are global:**
   ```typescript
   // Changes URL for ALL routes
   feature.theme.set('dark')
   
   // Before: /app/v1/light/products
   // After:  /app/v1/dark/products
   ```

3. **Defined in basePattern:**
   ```typescript
   // In App.tsx
   basePattern='/app/:version=v1/:theme=light'
   
   // Creates signals:
   feature.version  // default: 'v1'
   feature.theme    // default: 'light'
   ```

---

## API Reference

### useNavigator Hook

Complete API surface:

```typescript
function MyComponent() {
    const {
        // Navigation (context-aware)
        to,              // Path helper
        via,             // Smart search
        go,              // Raw navigation
        handleHref,      // SPA click handler
        
        // Route information
        route,           // RouteAccessor
        routePath,       // Signal<string>
        routeTrail,      // Route[]
        
        // State
        param,           // Param proxy
        feature,         // Feature signals
        
        // Advanced
        restSegments,    // Unmatched segments
    } = useNavigator()
}
```

### RouteAccessor (route)

```typescript
route.createQuery('name')      // Register query param
route.query.name               // Access query param
route.param.userId             // Access route param
route.schema.userId            // Validation schema
route.pattern                  // Route pattern string
route.scopePath                // Array of path segments
```

### Global Exports

```typescript
import {
    // Navigation
    go,              // function(path: string): void
    to,              // function(path: string): string
    via,             // function(expression: string): string
    
    // Signals
    pathname,        // Signal<string>
    basePath,        // Signal<string>
    routePath,       // Signal<string>
    
    // State
    param,           // Record<string, any>
    feature,         // Record<string, Signal>
    
    // Components
    Router,          // Router component
    Outlet,          // Outlet component
    
    // Hooks
    useNavigator,    // Navigation hook
    
    // Types
    Route,           // Route type
} from 'stateurl'
```

---

## Common Mistakes

### Mistake 1: Bare href without to()

```typescript
// ❌ WRONG
<a href='/products'>Products</a>

// ✅ CORRECT
<a href={to('/products')}>Products</a>
```

**Why:** Missing `basePattern` causes 404

### Mistake 2: Missing handleHref

```typescript
// ❌ WRONG - Full page reload
<a href={to('/products')}>Products</a>

// ✅ CORRECT - SPA navigation
<a href={to('/products')} onClick={handleHref}>Products</a>
```

**Why:** Without `handleHref`, browser does full reload

### Mistake 3: Query param not registered

```typescript
// ❌ WRONG
const count = route.query.count  // undefined + warning

// ✅ CORRECT
route.createQuery('count')
const count = route.query.count
```

**Why:** Must register before use

### Mistake 4: Wrong feature API

```typescript
// ❌ WRONG
feature.theme.value = 'dark'  // Doesn't navigate!

// ✅ CORRECT
feature.theme.set('dark')  // Triggers navigation
```

**Why:** Features use `.set()` method

### Mistake 5: Missing slash in params

```typescript
// ❌ WRONG
{ path: 'item:id', render: Detail }
to(`/products/item${id}`)

// ✅ CORRECT
{ path: 'item/:id', render: Detail }
to(`/products/item/${id}`)
```

**Why:** Param syntax requires slash

### Mistake 6: layout: true on accessible routes

```typescript
// ❌ WRONG - Can't access /products
{
    path: 'products',
    layout: true,
    render: Products,
    outlet: [...]
}

// ✅ CORRECT - Can access /products
{
    path: 'products',
    render: Products,
    outlet: [...]
}
```

**Why:** `layout: true` only renders with active child

---

## Troubleshooting

### Issue: Routes with query params show 404

**Symptom:** `/counter?count=5` shows 404

**Cause:** Router matching includes query string

**Solution:** This is fixed in stateurl >= 2.0. Update if needed.

### Issue: Query params don't update URL

**Symptom:** Setting `route.query.count = 5` doesn't change URL

**Solution:**
1. Check you registered: `route.createQuery('count')`
2. Check you're using signal API (not Map API)
3. Check for console warnings

### Issue: Feature buttons don't work

**Symptom:** Clicking theme button doesn't navigate

**Cause:** Using `.value =` instead of `.set()`

**Solution:**
```typescript
// ❌ Wrong
feature.theme.value = 'dark'

// ✅ Correct
feature.theme.set('dark')
```

### Issue: Can't access parent route

**Symptom:** `/products` shows 404, only `/products/item/1` works

**Cause:** Parent has `layout: true`

**Solution:** Remove `layout: true`

### Issue: Params are undefined

**Symptom:** `param.products.item.value` is undefined

**Solution:** Check route structure matches param path:
```typescript
// Route structure:
{ path: 'products', outlet: [{ path: 'item/:id' }] }

// Param access:
param.products.item.value  // Matches!
```

---

## API Documentation

Full TypeDoc-generated API documentation is available in the `docs/` directory:

**[Open API Documentation](docs/index.html)**

The documentation includes:
- All exported functions with signatures and examples
- Type definitions and interfaces
- Module organization
- Source code links

To serve the docs locally:
```bash
npx serve docs -p 3333
# Then open http://localhost:3333
```

---

## Next Steps

1. **Study the code:** Read each component file
2. **Run the app:** `pnpm dev` and test all routes
3. **Modify:** Change routes, add new pages
4. **Reference:** Use `UPDATED.md` for fixes applied

**Key files to understand:**
1. `src/routes.ts` - Route structure
2. `src/components/Layout.tsx` - Navigation pattern
3. `src/components/Products.tsx` - List/detail pattern
4. `src/components/Counter.tsx` - Query params
5. `src/components/Settings.tsx` - Feature flags

**Happy building with StateURL!** 🚀
