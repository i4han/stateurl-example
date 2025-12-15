import { useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used in JSX event handlers
import { useSignals, path, at, go, to, toLabel, label, handleHref, type TypedProps } from 'stateurl'
import CodeExample from './CodeExample'

// Simulated autocomplete dropdown component
function AutocompleteVisual({
    prefix,
    suggestions,
    selected,
    onSelect
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
function TypeBadge({ type, color }: { type: string; color: string }) {
    return (
        <span className='type-badge' style={{
            background: `${color}20`,
            color: color,
            border: `1px solid ${color}40`
        }}>
            {type}
        </span>
    )
}

const setupCode = `// stateurl-types.ts - Single source of truth
import type { AtNode } from 'stateurl'

declare module 'stateurl' {
    // 1. Component props typing
    interface ComponentRegistry {
        Counter: { query: { count: 0 } }
        UserDetail: { param: { userId: 0 } }
        ProductDetail: { param: { productId: 0 } }
    }

    // 2. at.* accessor typing
    interface AtRegistry {
        counter: AtNode
        users: AtNode<{ profile: AtNode }>
        products: AtNode<{ item: AtNode }>
    }

    // 3. to() path typing
    interface ToRegistry {
        '/home': true
        '/counter': true
        '/users': true
        '/users/profile/:userId': true
        '/products/item/:productId': true
    }
}`

const typedPropsCode = `import type { TypedProps } from 'stateurl'

// TypedProps uses COMPONENT names as keys (reusable across routers)
// TypedProps<'Counter'> infers query.count as number
function Counter({ query }: TypedProps<'Counter'>) {
    const count = query.count ?? 0  // number | undefined

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

const atAccessorCode = `import { at } from 'stateurl'

// at.* mirrors route structure with full autocomplete
at.counter.go()              // Navigate to /counter
at.users.profile.go()        // Navigate to /users/profile
at.products.item.go()        // Navigate to /products/item

// Access route properties
at.counter.pattern           // "/counter"
at.counter.query.count = '5' // Update query param
at.users.profile.param.userId = 1  // Update route param`

const toPathCode = `// Global to() - MUST start with '/'
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

const labelCode = `import { label, toLabel } from 'stateurl'

// label.* - navigate by route label (restructure-safe)
label.counter.go()
label.userProfile.go()
label.products.go()

// toLabel() - get path with typed params
toLabel('home')                      // '/home'
toLabel('userProfile', { userId: 1 }) // '/users/profile/1'
toLabel('productDetail', { productId: 42 }) // '/products/item/42'`

export default function TypeSafetyDemo({ to }: TypedProps<'TypeSafetyDemo'>) {
    useSignals()
    const [activeTab, setActiveTab] = useState<'setup' | 'props' | 'at' | 'to' | 'label'>('setup')

    return (
        <section className='type-safety-demo'>
            <h2>Type-Safe Routing</h2>
            <p>
                StateURL provides <strong>full TypeScript autocomplete</strong> for routes, params, and queries.
                Define your types once, get IDE support everywhere.
            </p>

            <div className='current-location'>
                <strong>Current:</strong> <code>{path.full}</code>
            </div>

            {/* Feature tabs */}
            <div className='feature-tabs'>
                <button
                    className={activeTab === 'setup' ? 'active' : ''}
                    onClick={() => setActiveTab('setup')}
                >
                    Setup
                </button>
                <button
                    className={activeTab === 'props' ? 'active' : ''}
                    onClick={() => setActiveTab('props')}
                >
                    TypedProps
                </button>
                <button
                    className={activeTab === 'at' ? 'active' : ''}
                    onClick={() => setActiveTab('at')}
                >
                    at.*
                </button>
                <button
                    className={activeTab === 'to' ? 'active' : ''}
                    onClick={() => setActiveTab('to')}
                >
                    to()
                </button>
                <button
                    className={activeTab === 'label' ? 'active' : ''}
                    onClick={() => setActiveTab('label')}
                >
                    label.*
                </button>
            </div>

            {/* Setup tab */}
            {activeTab === 'setup' && (
                <div className='demo-section'>
                    <h3>
                        Module Augmentation Setup
                        <TypeBadge type="one-time" color="#10b981" />
                    </h3>
                    <p>
                        Define your route types in a single file using TypeScript module augmentation.
                        This becomes the single source of truth for all type inference.
                    </p>

                    <div className='feature-grid'>
                        <div className='feature-card'>
                            <h4>ComponentRegistry</h4>
                            <p>Maps component names to their param/query schemas</p>
                            <code>TypedProps&lt;'Counter'&gt;</code>
                        </div>
                        <div className='feature-card'>
                            <h4>AtRegistry</h4>
                            <p>Defines route tree structure for at.* accessor</p>
                            <code>at.users.profile</code>
                        </div>
                        <div className='feature-card'>
                            <h4>ToRegistry</h4>
                            <p>Lists all valid paths for to() autocomplete</p>
                            <code>to('/users/:userId')</code>
                        </div>
                    </div>

                    <CodeExample code={setupCode} language='typescript' />
                </div>
            )}

            {/* TypedProps tab */}
            {activeTab === 'props' && (
                <div className='demo-section'>
                    <h3>
                        TypedProps&lt;ComponentName&gt;
                        <TypeBadge type="param" color="#3b82f6" />
                        <TypeBadge type="query" color="#8b5cf6" />
                    </h3>
                    <p>
                        Get typed <code>param</code> and <code>query</code> props based on your route schema.
                        Schema sugar syntax: <code>{'{count: 0}'}</code> → <code>number</code> type.
                    </p>

                    <div className='autocomplete-demo'>
                        <h4>Autocomplete Preview</h4>
                        <div className='autocomplete-row'>
                            <AutocompleteVisual
                                prefix="TypedProps<'"
                                suggestions={['Counter', 'UserDetail', 'ProductDetail', 'ParamDemo', 'LoaderUserPage']}
                                selected="Counter"
                            />
                        </div>
                        <div className='autocomplete-row'>
                            <AutocompleteVisual
                                prefix="query."
                                suggestions={['count']}
                                selected="count"
                            />
                            <span className='type-hint'>: number | undefined</span>
                        </div>
                    </div>

                    <h4>Try It</h4>
                    <div className='button-row'>
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => go(to('/counter'))}
                        >
                            Go to Counter (typed query)
                        </button>
                        <button
                            type='button'
                            className='btn'
                            onClick={() => at.users.profile.param.userId = 1}
                        >
                            Go to User 1 (typed param)
                        </button>
                    </div>

                    <CodeExample code={typedPropsCode} language='tsx' />
                </div>
            )}

            {/* at.* tab */}
            {activeTab === 'at' && (
                <div className='demo-section'>
                    <h3>
                        at.* Accessor
                        <TypeBadge type="chained" color="#f59e0b" />
                        <TypeBadge type="navigation" color="#10b981" />
                    </h3>
                    <p>
                        Chain route segments for intuitive navigation.
                        Mirrors your route structure with full autocomplete at each level.
                    </p>

                    <div className='autocomplete-demo'>
                        <h4>Autocomplete Preview</h4>
                        <div className='autocomplete-row'>
                            <AutocompleteVisual
                                prefix="at."
                                suggestions={['counter', 'users', 'products', 'settings', 'home', 'about']}
                                selected="users"
                            />
                        </div>
                        <div className='autocomplete-row'>
                            <AutocompleteVisual
                                prefix="at.users."
                                suggestions={['profile', 'go()', 'param', 'query', 'pattern']}
                                selected="profile"
                            />
                        </div>
                        <div className='autocomplete-row'>
                            <AutocompleteVisual
                                prefix="at.users.profile."
                                suggestions={['go()', 'param', 'query', 'pattern', 'scopePath']}
                                selected="go()"
                            />
                        </div>
                    </div>

                    <h4>Try It</h4>
                    <div className='button-row'>
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => at.counter.go()}
                        >
                            at.counter.go()
                        </button>
                        <button
                            type='button'
                            className='btn'
                            onClick={() => at.users.go()}
                        >
                            at.users.go()
                        </button>
                        <button
                            type='button'
                            className='btn'
                            onClick={() => at.products.go()}
                        >
                            at.products.go()
                        </button>
                    </div>

                    <div className='info-box' style={{ marginTop: '1rem' }}>
                        <strong>Route Info:</strong>
                        <pre style={{ margin: '0.5rem 0 0', fontSize: '0.85rem' }}>
{`at.counter.pattern:  "${at.counter?.pattern ?? '...'}"
at.users.pattern:    "${at.users?.pattern ?? '...'}"
at.products.pattern: "${at.products?.pattern ?? '...'}"`}
                        </pre>
                    </div>

                    <CodeExample code={atAccessorCode} language='typescript' />
                </div>
            )}

            {/* to() tab */}
            {activeTab === 'to' && (
                <div className='demo-section'>
                    <h3>
                        to() Path Resolution
                        <TypeBadge type="absolute" color="#ef4444" />
                        <TypeBadge type="relative" color="#06b6d4" />
                    </h3>
                    <p>
                        Global <code>to()</code> requires absolute paths (starts with <code>/</code>).
                        Props <code>to()</code> allows relative paths for context-aware navigation.
                    </p>

                    <div className='autocomplete-demo'>
                        <h4>Global to() - Absolute Only</h4>
                        <div className='autocomplete-row'>
                            <AutocompleteVisual
                                prefix="to('/"
                                suggestions={['/home', '/counter', '/users', '/users/profile/:userId', '/products', '/products/item/:productId']}
                                selected="/users/profile/:userId"
                            />
                        </div>

                        <h4 style={{ marginTop: '1.5rem' }}>Props to() - Relative Allowed</h4>
                        <div className='autocomplete-row'>
                            <AutocompleteVisual
                                prefix="to('"
                                suggestions={['../', '../../', './', '/home', '/counter', '/users']}
                                selected="../"
                            />
                        </div>
                    </div>

                    <div className='comparison-box'>
                        <div className='comparison-col valid'>
                            <h4>✓ Valid</h4>
                            <code>to('/home')</code>
                            <code>to('/users/profile/:userId', {'{ userId: 42 }'})</code>
                            <code>props.to('../settings')</code>
                            <code>props.to('edit')</code>
                        </div>
                        <div className='comparison-col invalid'>
                            <h4>✗ Type Error</h4>
                            <code>to('home')</code>
                            <code>to('../settings')</code>
                            <span className='error-hint'>Global to() must start with /</span>
                        </div>
                    </div>

                    <h4>Try It</h4>
                    <div className='button-row'>
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => go(to('/home'))}
                        >
                            go(to('/home'))
                        </button>
                        <button
                            type='button'
                            className='btn'
                            onClick={() => go(to('/counter'))}
                        >
                            go(to('/counter'))
                        </button>
                        <button
                            type='button'
                            className='btn'
                            data-href={to('/users/profile/:userId', { userId: 1 })}
                            onClick={handleHref}
                        >
                            to('/users/profile/:userId', {'{ userId: 1 }'})
                        </button>
                    </div>

                    <CodeExample code={toPathCode} language='typescript' />
                </div>
            )}

            {/* label.* tab */}
            {activeTab === 'label' && (
                <div className='demo-section'>
                    <h3>
                        label.* Navigation
                        <TypeBadge type="restructure-safe" color="#10b981" />
                    </h3>
                    <p>
                        Navigate by route label instead of path.
                        Survives route restructuring as long as labels are preserved.
                    </p>

                    <div className='autocomplete-demo'>
                        <h4>Autocomplete Preview</h4>
                        <div className='autocomplete-row'>
                            <AutocompleteVisual
                                prefix="label."
                                suggestions={['home', 'counter', 'products', 'users', 'userProfile', 'settings']}
                                selected="userProfile"
                            />
                        </div>
                        <div className='autocomplete-row'>
                            <AutocompleteVisual
                                prefix="toLabel('"
                                suggestions={['home', 'counter', 'userProfile', 'productDetail', 'loaderUser']}
                                selected="userProfile"
                            />
                        </div>
                    </div>

                    <div className='info-box' style={{ marginTop: '1rem' }}>
                        <h4>at.* vs label.*</h4>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.5rem' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-default)' }}><strong>at.*</strong></td>
                                    <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-default)' }}>Based on path structure</td>
                                    <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-default)' }}><code>at.users.profile</code></td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '0.5rem' }}><strong>label.*</strong></td>
                                    <td style={{ padding: '0.5rem' }}>Based on route labels</td>
                                    <td style={{ padding: '0.5rem' }}><code>label.userProfile</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4>Try It</h4>
                    <div className='button-row'>
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => label.home?.go()}
                        >
                            label.home.go()
                        </button>
                        <button
                            type='button'
                            className='btn'
                            onClick={() => label.counter?.go()}
                        >
                            label.counter.go()
                        </button>
                        <button
                            type='button'
                            className='btn'
                            onClick={() => go(toLabel('userProfile', { userId: 1 }))}
                        >
                            toLabel('userProfile', {'{userId: 1}'})
                        </button>
                    </div>

                    <CodeExample code={labelCode} language='typescript' />
                </div>
            )}

            <style>{`
                .type-safety-demo {
                    max-width: 900px;
                }

                .feature-tabs {
                    display: flex;
                    gap: 0.25rem;
                    margin: 1.5rem 0;
                    padding: 0.25rem;
                    background: var(--bg-muted);
                    border-radius: 8px;
                    overflow-x: auto;
                }

                .feature-tabs button {
                    flex: 1;
                    padding: 0.75rem 1rem;
                    border: none;
                    background: transparent;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    color: var(--text-secondary);
                    transition: all 0.2s;
                    white-space: nowrap;
                }

                .feature-tabs button:hover {
                    background: var(--bg-surface);
                    color: var(--text-primary);
                }

                .feature-tabs button.active {
                    background: var(--primary-color, #3b82f6);
                    color: white;
                }

                .type-badge {
                    display: inline-block;
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    margin-left: 0.5rem;
                    vertical-align: middle;
                }

                .feature-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin: 1.5rem 0;
                }

                .feature-card {
                    padding: 1rem;
                    background: var(--bg-muted);
                    border-radius: 8px;
                    border: 1px solid var(--border-default);
                }

                .feature-card h4 {
                    margin: 0 0 0.5rem;
                    color: var(--primary-color, #3b82f6);
                }

                .feature-card p {
                    margin: 0 0 0.75rem;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                }

                .feature-card code {
                    display: block;
                    padding: 0.5rem;
                    background: var(--bg-surface);
                    border-radius: 4px;
                    font-size: 0.85rem;
                }

                .autocomplete-demo {
                    background: var(--bg-muted);
                    padding: 1.5rem;
                    border-radius: 8px;
                    margin: 1rem 0;
                }

                .autocomplete-demo h4 {
                    margin: 0 0 1rem;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                }

                .autocomplete-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .autocomplete-visual {
                    flex: 1;
                    max-width: 350px;
                }

                .autocomplete-input {
                    background: #1e1e1e;
                    color: #d4d4d4;
                    padding: 0.5rem 0.75rem;
                    border-radius: 4px 4px 0 0;
                    font-family: var(--font-mono, monospace);
                    font-size: 0.9rem;
                    border: 1px solid #3c3c3c;
                    border-bottom: none;
                }

                .autocomplete-input .prefix {
                    color: #9cdcfe;
                }

                .autocomplete-input .cursor {
                    color: #aeafad;
                    animation: blink 1s infinite;
                }

                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }

                .autocomplete-dropdown {
                    background: #252526;
                    border: 1px solid #3c3c3c;
                    border-radius: 0 0 4px 4px;
                    overflow: hidden;
                }

                .autocomplete-item {
                    display: flex;
                    align-items: center;
                    padding: 0.4rem 0.75rem;
                    font-family: var(--font-mono, monospace);
                    font-size: 0.85rem;
                    color: #d4d4d4;
                    cursor: pointer;
                    gap: 0.5rem;
                }

                .autocomplete-item:hover {
                    background: #094771;
                }

                .autocomplete-item.selected, .autocomplete-item.first {
                    background: #094771;
                }

                .autocomplete-item .item-icon {
                    color: #75beff;
                    font-size: 0.8rem;
                }

                .autocomplete-item .item-text {
                    flex: 1;
                    color: #9cdcfe;
                }

                .autocomplete-item .item-type {
                    color: #808080;
                    font-size: 0.8rem;
                }

                .type-hint {
                    color: var(--text-secondary);
                    font-family: var(--font-mono, monospace);
                    font-size: 0.85rem;
                    padding-top: 0.5rem;
                }

                .comparison-box {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .comparison-col {
                    padding: 1rem;
                    border-radius: 8px;
                }

                .comparison-col h4 {
                    margin: 0 0 0.75rem;
                }

                .comparison-col code {
                    display: block;
                    padding: 0.4rem 0.6rem;
                    margin-bottom: 0.5rem;
                    border-radius: 4px;
                    font-size: 0.85rem;
                }

                .comparison-col.valid {
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                }

                .comparison-col.valid h4 {
                    color: #10b981;
                }

                .comparison-col.valid code {
                    background: rgba(16, 185, 129, 0.15);
                }

                .comparison-col.invalid {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                }

                .comparison-col.invalid h4 {
                    color: #ef4444;
                }

                .comparison-col.invalid code {
                    background: rgba(239, 68, 68, 0.15);
                    text-decoration: line-through;
                    opacity: 0.7;
                }

                .comparison-col .error-hint {
                    display: block;
                    font-size: 0.8rem;
                    color: #ef4444;
                    margin-top: 0.5rem;
                }
            `}</style>
        </section>
    )
}
