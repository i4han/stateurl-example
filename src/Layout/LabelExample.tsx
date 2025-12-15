import { defineRoute, path, useSignals, label, toLabel, go, at } from 'stateurl'
import CodeExample from './CodeExample'

const labelExampleConfig = {
    path: 'label-demo',
    trail: '/',
} as const

export const LabelExampleRoute = defineRoute(LabelExample, labelExampleConfig)

const mainCode = `
import { label, toLabel, go, at } from 'stateurl'

// Labels are useful for NESTED routes that are hard to reach via at.*
// First-level routes can use at.routeName directly

// Nested route with label (defined in component file):
// /users/profile/:userId → label: 'userProfile'
// /products/item/:productId → label: 'productDetail'
// /loader-demo/user/:userId → label: 'loaderUser'

// Why labels for nested routes?
// at.* requires chaining: at.users.profile.go({ userId: 1 })
// label.* is direct:      label.userProfile.go({ userId: 1 })

// Navigate with params (integers via schema)
go(toLabel('userProfile', { userId: 123 }))
go(toLabel('productDetail', { productId: 42 }))
go(toLabel('loaderUser', { userId: 1 }))`

export default function LabelExample() {
    useSignals()
    const currentPath = path.full

    return (
        <section>
            <h2>Label Navigation</h2>
            <p>
                Labels provide <strong>direct access to nested routes</strong>.
                First-level routes use <code>at.routeName</code>, but deeper routes
                benefit from labels for cleaner navigation.
            </p>

            <div className='current-location'>
                <strong>Current:</strong> <code>{currentPath}</code>
            </div>

            <div className='demo-examples'>
                <WhyLabelsSection />
                <ToLabelExample />
                <LabelAccessorExample />
                <LabelNavigationExample />
            </div>

            <CodeExample code={mainCode} language='tsx' />
        </section>
    )
}

function WhyLabelsSection() {
    return (
        <div className='demo-section'>
            <h3>When to Use Labels</h3>
            <p>
                Labels shine for <strong>deeply nested routes</strong> where path-based
                access becomes verbose.
            </p>

            <div className='info-box'>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid var(--border-default)' }}>Route</th>
                            <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid var(--border-default)' }}>at.* (path-based)</th>
                            <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid var(--border-default)' }}>label.* (direct)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '0.5rem' }}>/home</td>
                            <td style={{ padding: '0.5rem' }}><code>at.home.go()</code></td>
                            <td style={{ padding: '0.5rem', color: 'var(--text-muted)' }}>— use at.*</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.5rem' }}>/users/profile/:id</td>
                            <td style={{ padding: '0.5rem' }}><code>at.users.profile.go()</code></td>
                            <td style={{ padding: '0.5rem' }}><code>label.userProfile.go()</code></td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.5rem' }}>/products/item/:id</td>
                            <td style={{ padding: '0.5rem' }}><code>at.products.item.go()</code></td>
                            <td style={{ padding: '0.5rem' }}><code>label.productDetail.go()</code></td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.5rem' }}>/loader-demo/user/:id</td>
                            <td style={{ padding: '0.5rem' }}><code>at['loader-demo'].user.go()</code></td>
                            <td style={{ padding: '0.5rem' }}><code>label.loaderUser.go()</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <CodeExample
                code={`// First-level routes: use at.* (simpler)
at.home.go()
at.counter.go()
at.settings.go()

// Nested routes: labels provide cleaner access
label.userProfile.go({ userId: 1 })     // vs at.users.profile.go({ userId: 1 })
label.productDetail.go({ productId: 5 }) // vs at.products.item.go({ productId: 5 })
label.loaderUser.go({ userId: 2 })       // vs at['loader-demo'].user.go({ userId: 2 })`}
                language='typescript'
            />
        </div>
    )
}

function ToLabelExample() {
    useSignals()
    return (
        <div className='demo-section'>
            <h3>toLabel() Function</h3>
            <p>
                Convert labels to paths. Useful for generating hrefs or programmatic navigation.
            </p>

            <div className='result-grid'>
                <Result
                    expr="toLabel('userProfile', { userId: 1 })"
                    value={safeToLabel('userProfile', { userId: 1 })}
                />
                <Result
                    expr="toLabel('productDetail', { productId: 42 })"
                    value={safeToLabel('productDetail', { productId: 42 })}
                />
                <Result
                    expr="toLabel('loaderUser', { userId: 3 })"
                    value={safeToLabel('loaderUser', { userId: 3 })}
                />
            </div>

            <CodeExample
                code={`// toLabel converts label to path (integers auto-serialize)
toLabel('userProfile', { userId: 1 })      // → '/users/profile/1'
toLabel('productDetail', { productId: 42 }) // → '/products/item/42'
toLabel('loaderUser', { userId: 3 })        // → '/loader-demo/user/3'`}
                language='typescript'
            />
        </div>
    )
}

function LabelAccessorExample() {
    useSignals()
    return (
        <div className='demo-section'>
            <h3>Label Accessor</h3>
            <p>
                Access route state via <code>label.*</code> proxy.
            </p>

            <div className='result-grid'>
                <Result
                    expr='label.userProfile.pattern'
                    value={safeAccess(() => label.userProfile.pattern)}
                />
                <Result
                    expr='label.productDetail.pattern'
                    value={safeAccess(() => label.productDetail.pattern)}
                />
                <Result
                    expr='label.loaderUser.pattern'
                    value={safeAccess(() => label.loaderUser.pattern)}
                />
            </div>

            <CodeExample
                code={`// label.* provides route accessor for nested routes
label.userProfile.pattern   // 'profile/:userId'
label.userProfile.fullPath  // '/users/profile/1' (if userId=1)
label.userProfile.param     // { userId: number }
label.userProfile.go()      // Navigate to route`}
                language='typescript'
            />
        </div>
    )
}

function LabelNavigationExample() {
    useSignals()
    return (
        <div className='demo-section'>
            <h3>Navigation with Labels</h3>
            <p>
                Labels survive route restructuring. If you move <code>/users/profile</code> to
                <code>/account/profile</code>, label.userProfile still works.
            </p>

            <div className='button-row'>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => go(toLabel('userProfile', { userId: 1 }))}
                >
                    User Profile 1
                </button>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => go(toLabel('productDetail', { productId: 0 }))}
                >
                    Product Detail 0
                </button>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => go(toLabel('loaderUser', { userId: 2 }))}
                >
                    Loader User 2
                </button>
            </div>

            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Compare with <code>at.*</code> for first-level routes:
            </p>

            <div className='button-row'>
                <button
                    type='button'
                    className='btn'
                    onClick={() => at.home.go()}
                >
                    at.home.go()
                </button>
                <button
                    type='button'
                    className='btn'
                    onClick={() => at.counter.go()}
                >
                    at.counter.go()
                </button>
                <button
                    type='button'
                    className='btn'
                    onClick={() => at.settings.go()}
                >
                    at.settings.go()
                </button>
            </div>

            <CodeExample
                code={`// Nested routes: use labels
go(toLabel('userProfile', { userId: 1 }))
go(toLabel('productDetail', { productId: 0 }))

// First-level routes: use at.*
at.home.go()
at.counter.go()
at.settings.go()`}
                language='typescript'
            />
        </div>
    )
}

// Helper to safely call toLabel (catches errors for demo)
function safeToLabel(labelName: string, params?: Record<string, string | number>): string {
    try {
        return toLabel(labelName, params)
    } catch (e: any) {
        return `(error: ${e.message?.split('\n')[0] || 'unknown'})`
    }
}

// Helper to safely access label properties
function safeAccess(fn: () => any): string {
    try {
        const result = fn()
        return String(result)
    } catch (e: any) {
        return `(error: ${e.message?.split('\n')[0] || 'unknown'})`
    }
}

function Result({ expr, value }: { expr: string; value: string }) {
    useSignals()
    return (
        <div className='result-item'>
            <code>{expr}</code>
            <span className='arrow'>→</span>
            <code className='value'>{value}</code>
        </div>
    )
}
