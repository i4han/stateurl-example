# StateURL Example App - Migration to v0.2.0

Guide for migrating the example app to use new StateURL v0.2.0 APIs.

---

## Overview

StateURL v0.2.0 introduces:
- ✅ `prefix:` property for Layout Routes (instead of `layout: true`)
- ✅ Type-safe `path:` property (single-slug enforcement)
- ✅ Centralized `path.*` and `routeTree.*` state
- ✅ `breadcrumbs` signal for route-aware path parsing
- ✅ Runtime validation with helpful errors

**Backward Compatible:** Old APIs still work with deprecation warnings.

---

## Step 1: Update Route Definitions

### Find Layout Routes

Search for routes with `layout: true` or `childMatch: true`:

```bash
cd stateurl-example
grep -r "layout: true" src/
grep -r "childMatch: true" src/
```

### Convert to `prefix:` Property

**Before (v0.1.x):**
```typescript
{
  path: 'admin',
  layout: true,
  render: AdminLayout,
  outlet: [
    { path: 'settings', render: Settings },
    { path: 'users', render: Users }
  ]
}
```

**After (v0.2.0):**
```typescript
{
  prefix: 'admin',
  render: AdminLayout,
  outlet: [
    { path: 'settings', render: Settings },
    { path: 'users', render: Users }
  ]
}
```

**Key Changes:**
- `path: 'admin', layout: true` → `prefix: 'admin'`
- Remove `layout: true` property
- `prefix:` clearly indicates "path structure provider"

---

## Step 2: Update Multi-Segment Paths

### Find Multi-Segment Path Routes

```bash
grep -r "path: '.*\/.*'" src/ | grep -v prefix
```

### Split into Prefix + Path

**Before:**
```typescript
{
  path: 'admin/settings',  // Multi-segment
  render: Settings
}
```

**After (Option A - Nested):**
```typescript
{
  prefix: 'admin',
  render: Outlet,  // or AdminLayout
  outlet: [
    { path: 'settings', render: Settings }
  ]
}
```

**After (Option B - If truly should be single path):**
```typescript
{
  path: 'admin',
  render: Admin,
  outlet: [
    { path: 'settings', render: Settings }
  ]
}
```

---

## Step 3: Update State Imports

### Old Signal Imports

**Before:**
```typescript
import { pathname, routePath, basePath } from 'stateurl'

function Component() {
  console.log(pathname.value)    // '/app/v1/user/123'
  console.log(basePath.value)    // '/app/v1'
  console.log(routePath.value)   // '/user/123'
}
```

**After:**
```typescript
import { path } from 'stateurl'

function Component() {
  console.log(path.full.value)      // '/app/v1/user/123'
  console.log(path.base.value)      // '/app/v1'
  console.log(path.resource.value)  // '/user/123'
}
```

**Note:** Old imports still work but show deprecation warnings.

---

## Step 4: Add Breadcrumb Examples

Create new demo page showing breadcrumbs concept:

**File:** `src/pages/ConceptsBreadcrumbs.tsx`

```typescript
import { breadcrumbs, path } from 'stateurl'

export function ConceptsBreadcrumbs() {
  return (
    <div>
      <h1>Breadcrumbs Concept</h1>
      
      <section>
        <h2>Current Path</h2>
        <code>{path.resource.value}</code>
      </section>
      
      <section>
        <h2>Breadcrumbs (Route-Aware)</h2>
        <ul>
          {breadcrumbs.value.map((crumb, i) => (
            <li key={i}>
              Level {i + 1}: <code>{crumb}</code>
            </li>
          ))}
        </ul>
      </section>
      
      <section>
        <h2>Explanation</h2>
        <p>
          Breadcrumbs parse the URL based on route tree hierarchy.
          Each breadcrumb = one Path Route level (slug + params).
        </p>
        <p>
          Layout Routes (prefix:) concatenate with next Path Route.
        </p>
      </section>
    </div>
  )
}
```

---

## Step 5: Add State Demo Page

**File:** `src/pages/ConceptsState.tsx`

```typescript
import { path, routeTree, breadcrumbs } from 'stateurl'

export function ConceptsState() {
  return (
    <div>
      <h1>State Architecture</h1>
      
      <section>
        <h2>Path State</h2>
        <table>
          <tbody>
            <tr>
              <td>path.full</td>
              <td><code>{path.full.value}</code></td>
            </tr>
            <tr>
              <td>path.base</td>
              <td><code>{path.base.value}</code></td>
            </tr>
            <tr>
              <td>path.resource</td>
              <td><code>{path.resource.value}</code></td>
            </tr>
            <tr>
              <td>path.query</td>
              <td><code>{path.query.value || '(none)'}</code></td>
            </tr>
            <tr>
              <td>path.hash</td>
              <td><code>{path.hash.value || '(none)'}</code></td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <section>
        <h2>Route Tree</h2>
        <p>Routes defined: {routeTree.tree.length} top-level routes</p>
      </section>
      
      <section>
        <h2>Breadcrumbs</h2>
        <code>{JSON.stringify(breadcrumbs.value)}</code>
      </section>
    </div>
  )
}
```

---

## Step 6: Run Tests

After migration:

```bash
# Run tests to ensure nothing broke
bun test

# Check for deprecation warnings
bun run dev
# Look for console warnings about deprecated APIs
```

---

## Rollback Plan

If issues occur:

1. Revert route definition changes
2. Use old signal imports
3. Report issues to StateURL repo

The old API will continue to work until v0.3.0.

---

## Migration Checklist

- [ ] Update all `layout: true` → `prefix:`
- [ ] Split multi-segment paths
- [ ] Update state imports (optional - old ones work)
- [ ] Add breadcrumbs demo page
- [ ] Add state demo page
- [ ] Run tests
- [ ] Check for deprecation warnings
- [ ] Update README with v0.2.0 features

---

## Related

- [Migration Guide](../../packages/stateurl/.ai/done/migration-guide-v0.2.md)
- [StateURL Terminology](../../packages/stateurl/.ai/terminology.md)
- [Implementation Status](../../packages/stateurl/.ai/implementation-status.md)
