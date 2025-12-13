import type { RouteComponentProps } from 'stateurl'
import { path, useSignals, via } from 'stateurl'
import CodeExample from './CodeExample'

const mainCode = `
import { via } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'

// Global via() - absolute paths only
via('/products')           // → '/products'
via('/users/profile:1')    // → '/users/profile/1'

// Contextual via/to from component props
function MyComponent({ via, to }: RouteComponentProps) {
  // Relative via - 6-level priority search
  via('settings')              // → '/settings'
  via('item/$1', [42])         // → '/products/item/42'

  // Relative to - supports ../ syntax
  to('../users')               // → '/users'
  to('item/$1', [3])           // → '/products/item/3'
}`

export default function ViaExample(props: RouteComponentProps) {
    useSignals()
    const currentPath = path.full.value

    return (
        <section>
            <h2>Via Navigation</h2>
            <p>
                Pure functions that resolve paths. <code>via()</code> uses
                semantic search, <code>to()</code> uses relative paths.
            </p>

            <div className='current-location'>
                <strong>Current:</strong> <code>{currentPath}</code>
            </div>

            <div className='via-examples'>
                <AbsolutePathsExample />
                <RelativeViaExample {...props} />
                <InterpolationExample {...props} />
                <RelativeToExample {...props} />
            </div>

            <CodeExample code={mainCode} language='tsx' />
        </section>
    )
}

function AbsolutePathsExample() {
    return (
        <div className='demo-section'>
            <h3>Absolute Paths</h3>
            <p>
                Global <code>via()</code> uses BFS search from root.
            </p>

            <div className='result-grid'>
                <Result expr="via('/home')" value={via('/home')} />
                <Result expr="via('/products')" value={via('/products')} />
                <Result expr="via('/users')" value={via('/users')} />
                <Result
                    expr="via('/products/item:1')"
                    value={via('/products/item:1')}
                />
            </div>

            <CodeExample
                code={`// Global via() - absolute paths
via('/home')            // → '/home'
via('/products/item:1') // → '/products/item/1'`}
                language='typescript'
            />
        </div>
    )
}

function RelativeViaExample({ via }: RouteComponentProps) {
    return (
        <div className='demo-section'>
            <h3>Relative via()</h3>
            <p>
                Contextual <code>via</code> prop uses 6-level priority search.
            </p>

            <div className='priority-levels'>
                <span>
                    <strong>0.</strong> Self
                </span>
                <span>
                    <strong>1.</strong> Children
                </span>
                <span>
                    <strong>2.</strong> Siblings
                </span>
                <span>
                    <strong>3.</strong> Descendants
                </span>
                <span>
                    <strong>4.</strong> Lower neighbors
                </span>
                <span>
                    <strong>5.</strong> Ancestors
                </span>
                <span>
                    <strong>6.</strong> Upper neighbors
                </span>
            </div>

            <div className='result-grid'>
                <Result expr="via('via-demo')" value={via('via-demo')} />
                <Result expr="via('products')" value={via('products')} />
                <Result expr="via('users')" value={via('users')} />
                <Result expr="via('settings')" value={via('settings')} />
            </div>

            <CodeExample
                code={`// Contextual via() from props
function MyComponent({ via }: RouteComponentProps) {
  via('via-demo')   // → '/via-demo' (self - priority 0)
  via('settings')   // → '/settings' (sibling - priority 2)
  via('item')       // → finds child/descendant
}`}
                language='tsx'
            />
        </div>
    )
}

function InterpolationExample({ via, to }: RouteComponentProps) {
    return (
        <div className='demo-section'>
            <h3>$1, $2 Interpolation</h3>
            <p>
                Use <code>$1</code>, <code>$2</code> placeholders with values.
            </p>

            <div className='result-grid'>
                <Result
                    expr="via('item:$1', [1])"
                    value={via('item:$1', [1])}
                />
                <Result
                    expr="via('profile:$1', [2])"
                    value={via('profile:$1', [2])}
                />
                <Result
                    expr="to('/products/item:$1', [3])"
                    value={to('/products/item:$1', [3])}
                />
            </div>

            <CodeExample
                code={`// $1, $2 interpolation
via('item/$1', [42])           // → '/products/item/42'
via('profile/$1', [7])         // → '/users/profile/7'
to('/user/$1/post/$2', [1, 2]) // → '/user/1/post/2'`}
                language='tsx'
            />
        </div>
    )
}

function RelativeToExample({ to }: RouteComponentProps) {
    return (
        <div className='demo-section'>
            <h3>Relative to()</h3>
            <p>
                Contextual <code>to</code> prop supports <code>../</code> and{' '}
                <code>./</code> syntax.
            </p>

            <div className='result-grid'>
                <Result expr="to('../products')" value={to('../products')} />
                <Result expr="to('../users')" value={to('../users')} />
                <Result expr="to('./edit')" value={to('./edit')} />
                <Result
                    expr="to('../item/$1', [4])"
                    value={to('../item/$1', [4])}
                />
            </div>

            <CodeExample
                code={`// Contextual to() with relative paths
to('../settings')        // → go up, then settings
to('../../home')         // → go up twice
to('./edit')             // → append to current
to('../item/$1', [42])   // → relative + interpolation`}
                language='tsx'
            />
        </div>
    )
}

function Result({ expr, value }: { expr: string; value: string }) {
    return (
        <div className='via-result'>
            <code>{expr}</code>
            <span className='arrow'>→</span>
            <code className='value'>{value}</code>
        </div>
    )
}
