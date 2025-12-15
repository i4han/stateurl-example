import { path, useSignals, label, toLabel, go } from 'stateurl'
import CodeExample from './CodeExample'

const mainCode = `
import { label, toLabel, go } from 'stateurl'

// Define labels in routes (schema enables integer params)
const routes = [
  { path: 'users/:userId', label: 'userProfile', schema: { param: { userId: 0 } } },
  { path: 'products', label: 'products', render: Products }
]

// Navigation using labels (rename-safe)
go(toLabel('userProfile', { userId: 123 }))
go(toLabel('products'))

// Access route state via label accessor
label.userProfile.param.userId     // Current userId (number)
label.userProfile.fullPath         // '/users/123'
label.userProfile.go()             // Navigate to route`

export default function LabelExample() {
    useSignals()
    const currentPath = path.full

    return (
        <section>
            <h2>Label Navigation</h2>
            <p>
                Labels provide rename-safe route access. Unlike paths that break on
                refactor, labels always point to the same route.
            </p>

            <div className='current-location'>
                <strong>Current:</strong> <code>{currentPath}</code>
            </div>

            <div className='demo-examples'>
                <ToLabelExample />
                <LabelAccessorExample />
                <LabelNavigationExample />
            </div>

            <CodeExample code={mainCode} language='tsx' />
        </section>
    )
}

function ToLabelExample() {
    useSignals()
    return (
        <div className='demo-section'>
            <h3>toLabel() Function</h3>
            <p>
                Convert labels to paths for navigation.
            </p>

            <div className='result-grid'>
                <Result expr="toLabel('home')" value={safeToLabel('home')} />
                <Result expr="toLabel('products')" value={safeToLabel('products')} />
                <Result expr="toLabel('settings')" value={safeToLabel('settings')} />
                <Result
                    expr="toLabel('userProfile', { userId: 42 })"
                    value={safeToLabel('userProfile', { userId: 42 })}
                />
            </div>

            <CodeExample
                code={`// toLabel converts label to path (integers auto-serialize)
toLabel('home')                          // → '/home'
toLabel('products')                      // → '/products'
toLabel('userProfile', { userId: 42 })   // → '/users/profile/42'`}
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
                    expr='label.home.pattern'
                    value={safeAccess(() => label.home.pattern)}
                />
                <Result
                    expr='label.products.scopePath'
                    value={safeAccess(() => JSON.stringify(label.products.scopePath))}
                />
                <Result
                    expr='label.counter.fullPath'
                    value={safeAccess(() => label.counter.fullPath)}
                />
            </div>

            <CodeExample
                code={`// label.* provides full route accessor
label.home.pattern      // Route pattern
label.home.scopePath    // ['home']
label.home.fullPath     // '/home'
label.home.param        // Route params`}
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
                Use labels for navigation that survives refactoring.
            </p>

            <div className='button-row'>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => go(toLabel('home'))}
                >
                    go(toLabel('home'))
                </button>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => go(toLabel('products'))}
                >
                    go(toLabel('products'))
                </button>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => go(toLabel('counter'))}
                >
                    go(toLabel('counter'))
                </button>
            </div>

            <CodeExample
                code={`// Navigate using labels (integers auto-serialize)
go(toLabel('home'))
go(toLabel('products'))
go(toLabel('userProfile', { userId: 123 }))`}
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
