import { useNavigator } from 'stateurl'
import CodeExample from './CodeExample'

export default function Counter() {
    const { route } = useNavigator()
    
    // Register query parameter (must be called before using route.query.count)
    route.createQuery('count')
    
    // Get count from URL query parameter (signal-based)
    const count = Number(route.query.count) || 0

    const increment = () => route.query.count = count + 1
    const decrement = () => route.query.count = count - 1
    const reset = () => route.query.count = undefined


    return (
        <section>
            <h2>Counter (Query State Demo)</h2>
            <p>This counter uses <strong>query parameters</strong> to store state in the URL.</p>

            <div className='counter-demo'>
                <div className='counter-display'>
                    <h3>Count: {count}</h3>
                </div>

                <div className='counter-controls'>
                    <button onClick={decrement} className='btn'>➖ Decrement</button>
                    <button onClick={increment} className='btn btn-primary'>➕ Increment</button>
                    <button onClick={reset} className='btn btn-secondary'>🔄 Reset</button>
                </div>

                <div className='info-box'>
                    <h4>💡 Try this:</h4>
                    <ul>
                        <li>Click buttons to change the count</li>
                        <li>Watch the URL update with <code>?count=...</code></li>
                        <li>Copy the URL and paste in a new tab</li>
                        <li>The state persists across page loads!</li>
                        <li>Use browser back/forward buttons</li>
                    </ul>
                </div>

                <CodeExample code={`const { route } = useNavigator()

// Register query parameter first!
route.createQuery('count')

// Get from URL (signal)
const count = Number(route.query.count) || 0

// Update URL (signal assignment)
route.query.count = count + 1`} />
            </div>
        </section>
    )
}
