import { useNavigator, via, go, path, useSignals } from 'stateurl'
import { useState } from 'react'
import CodeExample from './CodeExample'

export default function ViaExample() {
    useSignals()
    const { route } = useNavigator()
    const [lastResult, setLastResult] = useState<string>('')
    
    // Read current path using new API
    const currentPath = path.full.value

    const handleVia = (expression: string, shouldNavigate = false) => {
        const result = via(expression)
        setLastResult(`via('${expression}') → "${result}"`)
        if (shouldNavigate) {
            go(result)
        }
    }

    return (
        <section>
            <h2>Via Navigation (v2.0)</h2>
            <p>
                The <code>via()</code> function provides semantic navigation using
                6-level priority search. Click examples below to see how it works!
            </p>

            <div className='current-location'>
                <strong>Current Location:</strong> <code>{currentPath}</code>
            </div>

            {lastResult && (
                <div className='via-result'>
                    <strong>Last Result:</strong> <code>{lastResult}</code>
                </div>
            )}

            {/* Section 1: Absolute Paths */}
            <div className='demo-section'>
                <h3>1. Absolute Paths</h3>
                <p>Direct navigation to any route using absolute paths.</p>
                
                <div className='button-group'>
                    <button type='button' onClick={() => handleVia('/home', true)}>
                        via('/home')
                    </button>
                    <button type='button' onClick={() => handleVia('/products', true)}>
                        via('/products')
                    </button>
                    <button type='button' onClick={() => handleVia('/users', true)}>
                        via('/users')
                    </button>
                    <button type='button' onClick={() => handleVia('/settings', true)}>
                        via('/settings')
                    </button>
                </div>

                <CodeExample
                    code={`// Absolute paths - direct navigation
const homePath = via('/home')          // → '/home'
const productsPath = via('/products')  // → '/products'

// Navigate using the path
go(via('/settings'))  // Jump to settings`}
                    language='typescript'
                />
            </div>

            {/* Section 2: Smart Search - 6-Level Priority */}
            <div className='demo-section'>
                <h3>2. Smart Search (6-Level Priority)</h3>
                <p>
                    Via v2.0 uses intelligent search that prioritizes routes based on
                    proximity and relationship to your current location.
                </p>

                <div className='priority-levels'>
                    <div className='priority-item'>
                        <strong>Priority 1:</strong> Immediate children
                    </div>
                    <div className='priority-item'>
                        <strong>Priority 2:</strong> Siblings (same level)
                    </div>
                    <div className='priority-item'>
                        <strong>Priority 3:</strong> Direct descendants (grandchildren)
                    </div>
                    <div className='priority-item'>
                        <strong>Priority 4:</strong> Lower neighbors (deeper branches)
                    </div>
                    <div className='priority-item'>
                        <strong>Priority 5:</strong> Direct ancestors (parents)
                    </div>
                    <div className='priority-item'>
                        <strong>Priority 6:</strong> Upper neighbors (shallower branches)
                    </div>
                </div>

                <div className='button-group'>
                    <button type='button' onClick={() => handleVia('counter')}>
                        via('counter')
                    </button>
                    <button type='button' onClick={() => handleVia('settings')}>
                        via('settings')
                    </button>
                    <button type='button' onClick={() => handleVia('about')}>
                        via('about')
                    </button>
                </div>

                <CodeExample
                    code={`// From /products:
via('counter')   // → '/counter' (finds sibling)
via('settings')  // → '/settings' (finds sibling)

// From /products/item/1:
via('products')  // → '/products' (finds ancestor)
via('users')     // → '/users' (finds upper neighbor)`}
                    language='typescript'
                />
            </div>

            {/* Section 3: Hierarchical Paths */}
            <div className='demo-section'>
                <h3>3. Hierarchical Paths</h3>
                <p>Navigate through multiple levels in a single expression.</p>

                <div className='button-group'>
                    <button type='button' onClick={() => handleVia('products/item:1', true)}>
                        via('products/item:1')
                    </button>
                    <button type='button' onClick={() => handleVia('users/profile:2', true)}>
                        via('users/profile:2')
                    </button>
                    <button type='button' onClick={() => handleVia('products/item:3', true)}>
                        via('products/item:3')
                    </button>
                </div>

                <CodeExample
                    code={`// Multi-level navigation with params
via('products/item:1')    // → '/products/item/1'
via('users/profile:2')    // → '/users/profile/2'

// Hierarchical paths work from anywhere
go(via('products/item:3')) // Jump to product 3`}
                    language='typescript'
                />
            </div>

            {/* Section 4: Params */}
            <div className='demo-section'>
                <h3>4. Params with Colon Syntax</h3>
                <p>Use <code>:value</code> syntax to set params in navigation.</p>

                <div className='button-group'>
                    <button type='button' onClick={() => handleVia('item:1', true)}>
                        via('item:1')
                    </button>
                    <button type='button' onClick={() => handleVia('item:2', true)}>
                        via('item:2')
                    </button>
                    <button type='button' onClick={() => handleVia('profile:1', true)}>
                        via('profile:1')
                    </button>
                    <button type='button' onClick={() => handleVia('profile:3', true)}>
                        via('profile:3')
                    </button>
                </div>

                <CodeExample
                    code={`// Colon syntax for params
via('item:1')      // Find 'item' route, set param to '1'
via('profile:2')   // Find 'profile' route, set param to '2'

// Combine with hierarchical paths
via('products/item:4')  // → '/products/item/4'
via('users/profile:1')  // → '/users/profile/1'`}
                    language='typescript'
                />
            </div>

            {/* Section 5: Integration */}
            <div className='demo-section'>
                <h3>5. Integration with go()</h3>
                <p>
                    <code>via()</code> returns a path string. Use <code>go()</code> to navigate.
                </p>

                <div className='button-group'>
                    <button
                        type='button'
                        onClick={() => {
                            const path = via('counter')
                            go(path)
                        }}
                    >
                        go(via('counter'))
                    </button>
                    <button
                        type='button'
                        onClick={() => {
                            const path = via('products')
                            go(path)
                        }}
                    >
                        go(via('products'))
                    </button>
                </div>

                <CodeExample
                    code={`// via() returns path, go() navigates
const path = via('settings')
console.log(path)  // '/settings'
go(path)           // Navigate to settings

// Or combine them
go(via('counter'))
go(via('products/item:1'))

// Use in event handlers
<button onClick={() => go(via('about'))}>
  About
</button>`}
                    language='tsx'
                />
            </div>

            {/* Section 6: Advanced Examples */}
            <div className='demo-section'>
                <h3>6. Key Differences from v1</h3>
                <div className='info-box'>
                    <h4>Via v2.0 Changes:</h4>
                    <ul>
                        <li>✅ Removed <code>^</code> ancestor operator (use name instead)</li>
                        <li>✅ Added 6-level priority search (finds routes intelligently)</li>
                        <li>✅ New colon syntax for params (<code>:value</code>)</li>
                        <li>✅ Returns path without basePattern (feature flags)</li>
                        <li>✅ More predictable and semantic navigation</li>
                    </ul>
                </div>

                <CodeExample
                    code={`// v1 (deprecated):
via('^users')           // ❌ No longer supported
via('settings', '^')    // ❌ No longer supported

// v2.0 (current):
via('users')            // ✅ Smart search finds it
via('settings')         // ✅ 6-level priority search

// The smart search automatically:
// 1. Checks children first
// 2. Then siblings
// 3. Then descendants
// 4. Then lower neighbors
// 5. Then ancestors
// 6. Finally upper neighbors`}
                    language='typescript'
                />
            </div>

            <div className='info-box'>
                <h4>Try it yourself!</h4>
                <p>
                    Click the buttons above to see via() in action. The result shows
                    what path via() returns, and navigation buttons will take you there.
                </p>
                <p>
                    <strong>Tip:</strong> Navigate to different pages, then try the same
                    via() expression to see how context affects the results!
                </p>
            </div>
        </section>
    )
}
