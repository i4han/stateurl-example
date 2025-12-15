# Feature-Scoped Query - Design Exploration

**Status**: Exploration only. Not implemented. Waiting for real use case.

**Date**: 2024-12

## Problem Statement

Currently in stateurl:
- `feature` = app-level state (simple slugs like 'light'/'dark')
- `query` = route-scoped state (tied to specific routes)

Gap: No app-level complex state in URL.

## Proposed Concept

**Feature-scoped query**: Query params bound to a feature's lifecycle.

```tsx
// Define feature-scoped query with schema
createFeatureQuery('toast', {
    toastMessage: '',
    toastLocation: 'top',
    toastOffset: 60
})
```

### Access Pattern

Any matched component (including Layout) accesses via standard `query` prop:

```tsx
function Header({ query }) {
    // write
    query.toastMessage = 'Updated!'
}

function Layout({ query }) {
    // read
    const msg = query.toastMessage

    return (
        <>
            {feature.toast === 'on' && <Toast msg={msg} />}
            ...
        </>
    )
}
```

### Lifecycle

Feature controls query lifetime:

```tsx
feature.toast = 'on'   // query params active
feature.toast = 'off'  // query params auto-expire/clear
```

### URL Representation

```
?toast=on&toastMessage=Hello&toastLocation=top&toastOffset=60
```

## Open Questions

- Expiration timing (timeout? manual off only?)
- Value-based expiration (expire when condition met?)
- Schema validation
- Default restoration on expire
- Encoding strategy for complex values

## Why Not Built

Toast example doesn't benefit from URL state:
- Not shareable (no one shares a toast message)
- Not bookmarkable (no value)
- Back button behavior would be weird

**Principle**: Use URL state where it adds value, not everywhere it's possible.

## When to Revisit

Build this if a real use case emerges where:
1. App-level complex state needs to be in URL
2. State benefits from being shareable/bookmarkable
3. Feature lifecycle (on/off) naturally controls the state

Examples that *might* warrant this:
- Complex filter panels (app-wide, not route-specific)
- Multi-step wizard state
- Collaborative features (share exact UI state)

Until then, use `useState` for ephemeral UI state like toast.
