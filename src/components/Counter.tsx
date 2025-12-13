import { useSignals, registerQuery } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'
import CodeExample from './CodeExample'

// Register query parameter at module level
registerQuery(['counter'], 'count', {})

const code = `
import { registerQuery } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'

// Register query parameter at module level
registerQuery(['counter'], 'count', {})

export default function Counter({ query }: RouteComponentProps) {
  // Get from URL (via props)
  const count = Number(query.count) || 0
  
  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={
          () => { query.count = String(count + 1)
        }>Increment</button>
      <button onClick={
          () => { query.count = String(count - 1)
        }>Decrement</button>
      <button onClick={
          () => { query.count = undefined }
        }>Reset</button>
    </div>
  )
}`

export default function Counter({ query }: RouteComponentProps) {
    useSignals()
    const count = Number(query.count) || 0

    return (
        <section>
            <h2>Counter (Query State Demo)</h2>
            <p>
                This counter uses <strong>query parameters</strong> to store
                state in the URL.
            </p>

            <div className='counter-demo'>
                <div className='counter-display'>
                    <h3>Count: {count}</h3>
                </div>

                <div className='counter-controls'>
                    <button
                        type='button'
                        onClick={() => {
                            query.count = String(count - 1)
                        }}
                        className='btn'
                    >
                        Decrement
                    </button>
                    <button
                        type='button'
                        onClick={() => {
                            query.count = String(count + 1)
                        }}
                        className='btn btn-primary'
                    >
                        Increment
                    </button>
                    <button
                        type='button'
                        onClick={() => {
                            query.count = undefined
                        }}
                        className='btn btn-secondary'
                    >
                        Reset
                    </button>
                </div>

                <div className='info-box'>
                    <h4>Try this:</h4>
                    <ul>
                        <li>Click buttons to change the count</li>
                        <li>
                            Watch the URL update with <code>?count=...</code>
                        </li>
                        <li>Copy the URL and paste in a new tab</li>
                        <li>The state persists across page loads!</li>
                        <li>Use browser back/forward buttons</li>
                    </ul>
                </div>

                <CodeExample
                    code={code}
                    language='tsx'
                    highlightLines={[16, 19, 22]}
                />
            </div>
        </section>
    )
}
