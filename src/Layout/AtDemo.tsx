import { defineRoute, useSignals, path, at, type SurlRouteProps } from 'stateurl'
import CodeExample from './CodeExample'

const atDemoConfig = {
    path: 'at-demo',
    trail: '/',
} as const

export const AtDemoRoute = defineRoute(AtDemo, atDemoConfig)

const introCode = `import { at, go } from 'stateurl'

// at.* provides path-based chained access to routes
// Navigate using the route structure:

at.users                    // Access users route
at.users.profile            // Access users/profile route
at.products.item            // Access products/item route

// Each accessor has properties:
at.users.param              // Param proxy
at.users.query              // Query proxy
at.users.pattern            // Route pattern string
at.users.scopePath          // Path segments array`

const navigationCode = `// Navigate via at.*.go()
at.counter.go()                    // → /counter
at.users.profile.go()              // → /users/profile/:userId
at.products.item.go()              // → /products/item/:productId

// Pass input data
at.loader-demo.user.go({ input: { preloaded: true } })`

const paramsCode = `// Read and write params
const userId = at.users.profile.param.userId

// Write triggers navigation
at.users.profile.param.userId = 42   // → /users/profile/42

// Query access
at.counter.query.count = 5           // → /counter?count=5`

export default function AtDemo(_props: SurlRouteProps<typeof atDemoConfig>) {
    useSignals()
    const currentPath = path.full

    return (
        <section>
            <h2>at.* Accessor</h2>
            <p>
                The <code>at</code> accessor provides <strong>path-based chained access</strong> to routes.
                Navigate using the route structure directly.
            </p>

            <div className='current-location'>
                <strong>Current:</strong> <code>{currentPath}</code>
            </div>

            <div className='demo-section'>
                <h3>How It Works</h3>
                <p>
                    <code>at.*</code> mirrors your route structure. Chain segments to reach any route,
                    then access <code>.param</code>, <code>.query</code>, or call <code>.go()</code>.
                </p>
                <CodeExample code={introCode} language='typescript' />
            </div>

            <div className='demo-section'>
                <h3>Try It: Navigate with at.*</h3>
                <p>Click to navigate using the <code>at</code> accessor:</p>

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
                        className='btn btn-primary'
                        onClick={() => at.users.go()}
                    >
                        at.users.go()
                    </button>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => at.products.go()}
                    >
                        at.products.go()
                    </button>
                </div>

                <CodeExample code={navigationCode} language='typescript' />
            </div>

            <div className='demo-section'>
                <h3>Param & Query Access</h3>
                <p>
                    Read and write params through the accessor chain.
                    Writes trigger navigation automatically.
                </p>

                <div className='button-row'>
                    <button
                        type='button'
                        className='btn'
                        onClick={() => {
                            at.users.profile.param.userId = 1
                        }}
                    >
                        at.users.profile.param.userId = 1
                    </button>
                    <button
                        type='button'
                        className='btn'
                        onClick={() => {
                            at.users.profile.param.userId = 2
                        }}
                    >
                        at.users.profile.param.userId = 2
                    </button>
                </div>

                <div className='button-row' style={{ marginTop: '0.5rem' }}>
                    <button
                        type='button'
                        className='btn'
                        onClick={() => {
                            at.counter.query.count = '10'
                        }}
                    >
                        at.counter.query.count = '10'
                    </button>
                    <button
                        type='button'
                        className='btn'
                        onClick={() => {
                            at.counter.query.count = '99'
                        }}
                    >
                        at.counter.query.count = '99'
                    </button>
                </div>

                <CodeExample code={paramsCode} language='typescript' />
            </div>

            <div className='demo-section'>
                <h3>at.* vs label.*</h3>
                <div className='info-box'>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid var(--border-default)' }}>Feature</th>
                                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid var(--border-default)' }}>at.*</th>
                                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid var(--border-default)' }}>label.*</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '0.5rem' }}>Access Pattern</td>
                                <td style={{ padding: '0.5rem' }}><code>at.users.profile</code></td>
                                <td style={{ padding: '0.5rem' }}><code>label.userProfile</code></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5rem' }}>Based On</td>
                                <td style={{ padding: '0.5rem' }}>Route path structure</td>
                                <td style={{ padding: '0.5rem' }}>Route label names</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5rem' }}>Restructure Safe</td>
                                <td style={{ padding: '0.5rem' }}>❌ Breaks if paths change</td>
                                <td style={{ padding: '0.5rem' }}>✅ Works if labels kept</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5rem' }}>Best For</td>
                                <td style={{ padding: '0.5rem' }}>Quick prototyping</td>
                                <td style={{ padding: '0.5rem' }}>Production code</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='demo-section'>
                <h3>Route Info</h3>
                <p>Each accessor exposes route metadata:</p>
                <div className='info-box'>
                    <pre style={{ margin: 0, fontSize: '0.9rem' }}>
{`at.counter.pattern:   ${at.counter?.pattern ?? '(not loaded)'}
at.counter.scopePath: ${JSON.stringify(at.counter?.scopePath ?? [])}
at.users.pattern:     ${at.users?.pattern ?? '(not loaded)'}
at.products.pattern:  ${at.products?.pattern ?? '(not loaded)'}`}
                    </pre>
                </div>
            </div>
        </section>
    )
}
