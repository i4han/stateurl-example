// Shared components and code examples for TypeSafetyDemo tabs

// Simulated autocomplete dropdown component
export function AutocompleteVisual({
    prefix,
    suggestions,
    selected,
    onSelect,
}: {
    prefix: string
    suggestions: string[]
    selected?: string
    onSelect?: (s: string) => void
}) {
    return (
        <div className='autocomplete-visual'>
            <div className='autocomplete-input'>
                <span className='prefix'>{prefix}</span>
                <span className='cursor'>|</span>
            </div>
            <div className='autocomplete-dropdown'>
                {suggestions.map((s, i) => (
                    <div
                        key={s}
                        className={`autocomplete-item ${selected === s ? 'selected' : ''} ${i === 0 ? 'first' : ''}`}
                        onClick={() => onSelect?.(s)}
                    >
                        <span className='item-icon'>◇</span>
                        <span className='item-text'>{s}</span>
                        <span className='item-type'>route</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Type badge component
export function TypeBadge({ type, color }: { type: string; color: string }) {
    return (
        <span
            className='type-badge'
            style={{
                background: `${color}20`,
                color: color,
                border: `1px solid ${color}40`,
            }}
        >
            {type}
        </span>
    )
}

// Code example constants
export const setupCode = `// stateurl-types.ts - All types derived from source
import type {
    SurlAtFrom, SurlToFrom, SurlParamFrom,
    SurlFeatureFrom, SurlLabelFrom
} from 'stateurl'
import type { routes } from './routes'
import type { appFeature } from './App'

declare module 'stateurl' {
    interface SurlAt extends SurlAtFrom<typeof routes> {}
    interface SurlTo extends SurlToFrom<typeof routes> {}
    interface SurlParam extends SurlParamFrom<typeof routes> {}
    interface SurlFeature extends SurlFeatureFrom<typeof appFeature> {}
    interface SurlLabel extends SurlLabelFrom<typeof routes> {}
}`

export const typedPropsCode = `import { useSignals, type SurlRouteProps } from 'stateurl'

// Define schema with trail for typed breadcrumbs
export const counterSchema = {
    trail: '/counter',
    schema: { query: { count: 0 } }  // 0 → number type
} as const

// SurlRouteProps infers types from schema
function Counter({ query, breadcrumbs }: SurlRouteProps<typeof counterSchema>) {
    useSignals()
    // query.count is typed as number (from schema)
    // breadcrumbs is ['counter'] (from trail)
    const count = query.count ?? 0

    return (
        <button onClick={() => {
            query.count = count + 1  // ✓ accepts number
            query.count = undefined  // ✓ cleanup allowed
            query.count = "10"       // ✗ type error!
        }}>
            {count}
        </button>
    )
}`

export const atAccessorCode = `import { at } from 'stateurl'

// at.* mirrors route structure with full autocomplete
at.counter.go()              // Navigate to /counter
at.users.profile.go()        // Navigate to /users/profile
at.products.item.go()        // Navigate to /products/item

// Access route properties
at.counter.pattern           // "/counter"
at.counter.query.count = '5' // Update query param
at.users.profile.param.userId = 1  // Update route param`

export const toPathCode = `// Global to() - MUST start with '/'
import { to, go } from 'stateurl'

go(to('/home'))                                      // ✓ valid
go(to('/users/profile/:userId', { userId: 42 }))     // ✓ with :param
go(to('home'))                                       // ✗ type error!
go(to('../settings'))                                // ✗ type error!

// Props to() - allows relative paths
function MyComponent({ to }: RouteComponentProps) {
    to('/home')           // ✓ absolute
    to('../settings')     // ✓ relative - go up one level
    to('../../')          // ✓ relative - go up two levels
    to('./edit')          // ✓ relative - append to current
}`

export const labelCode = `import { label, toLabel, go, at } from 'stateurl'

// First-level routes: use at.* (simpler)
at.home.go()
at.counter.go()
at.settings.go()

// Nested routes: use label.* (cleaner than chained at.*)
label.userProfile.go({ userId: 3 })   // vs at.users.profile.go()
label.productDetail.go({ productId: 5 }) // vs at.products.item.go()
label.loaderUser.go({ userId: 2 })    // vs at['loader-demo'].user.go()

// toLabel() - get path string (for links, etc.)
const path = toLabel('userProfile', { userId: 1 }) // '/users/profile/1'`
