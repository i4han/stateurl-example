# Plan: Export Schema Pattern for TypedProps

## Problem
Circular import when extracting ComponentRegistry from routes:
```
routes.ts → Component.tsx → TypedProps → ComponentRegistry → routes.ts
```

## Solution: Export Schema from Component
Co-locate schema with component. Export schema separately for routes.ts.

## API Design

### Component File
```typescript
// components/Counter.tsx
export const counterSchema = { query: { count: 0 } } as const

function Counter({ query }: RouteProps<typeof counterSchema>) {
    query.count  // number | undefined
}

export default Counter
```

### Routes File
```typescript
// routes.ts
import Counter, { counterSchema } from './components/Counter'

defineRoutes([
    { path: 'counter', render: Counter, schema: counterSchema, label: 'counter' }
])
```

### Multi-route Component
```typescript
// components/UserList.tsx
export const simpleSchema = { query: { sort: '' } } as const
export const orgSchema = { param: { orgId: 0 }, query: { sort: '' } } as const

function UserList(props: RouteProps<typeof simpleSchema> | RouteProps<typeof orgSchema>) {
    // Handle both cases
}

export default UserList
```

```typescript
// routes.ts
import UserList, { simpleSchema, orgSchema } from './components/UserList'

{ path: 'users', render: UserList, schema: simpleSchema }
{ path: 'org/:orgId/users', render: UserList, schema: orgSchema }
```

## Implementation Steps

### Step 1: Verify RouteProps type in stateurl
**File:** `packages/stateurl/routes/types.ts`

Already exists:
```typescript
export type RouteProps<R> = Omit<RouteComponentProps, 'param' | 'query'> & {
    param: RouteParams<R>
    query: TypedRouteQuery<R>
}
```

### Step 2: Update Counter.tsx (first component)
**File:** `stateurl-example/src/components/Counter.tsx`

```typescript
export const counterSchema = { query: { count: 0 } } as const

function Counter({ query }: RouteProps<typeof counterSchema>) {
    // ...
}
```

### Step 3: Update routes.ts for Counter
**File:** `stateurl-example/src/routes.ts`

```typescript
import Counter, { counterSchema } from './components/Counter'

{ path: 'counter', render: Counter, schema: counterSchema, label: 'counter' }
```

### Step 4: Verify build, then repeat for other components
- ProductDetail.tsx + routes.ts
- UserDetail.tsx + routes.ts
- LoaderExample.tsx (LoaderUserPage) + routes.ts
- ParamDemo.tsx + routes.ts

### Step 5: Remove component-schemas.ts
Delete - no longer needed.

### Step 6: Simplify stateurl-types.ts
Remove ComponentRegistry augmentation. Keep only:
- AtRegistry
- ToRegistry
- ParamTypeRegistry

## Files Changed

| File | Change |
|------|--------|
| `stateurl-example/src/components/Counter.tsx` | Export counterSchema |
| `stateurl-example/src/components/ProductDetail.tsx` | Export productDetailSchema |
| `stateurl-example/src/components/UserDetail.tsx` | Export userDetailSchema |
| `stateurl-example/src/components/LoaderExample.tsx` | Export loaderUserSchema |
| `stateurl-example/src/components/ParamDemo.tsx` | Export paramDemoSchema |
| `stateurl-example/src/routes.ts` | Import schemas, assign to routes |
| `stateurl-example/src/component-schemas.ts` | DELETE |
| `stateurl-example/src/stateurl-types.ts` | Remove ComponentRegistry |

## Result

**Before:**
```typescript
// component-schemas.ts (manual sync required)
export const componentSchemas = {
    Counter: { query: { count: 0 } },
}

// Counter.tsx
function Counter({ query }: TypedProps<'Counter'>) { }
```

**After:**
```typescript
// Counter.tsx (single source of truth)
export const counterSchema = { query: { count: 0 } } as const

function Counter({ query }: RouteProps<typeof counterSchema>) { }
```

## Validation

1. TypeScript compiles without errors
2. `RouteProps<typeof schema>` provides correct param/query types
3. Build succeeds
4. Runtime behavior unchanged
