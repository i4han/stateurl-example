import { useSignals } from 'stateurl'
import type { TypedProps } from '../stateurl-types'
import CodeExample from './CodeExample'

const code = `
import { useSignals } from 'stateurl'
import type { TypedProps } from './stateurl-types'

// TypedProps<'Counter'> provides typed query from componentSchemas
// query.count is typed as number | undefined

function Counter({ query }: TypedProps<'Counter'>) {
  useSignals()
  const count = query.count ?? 0

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={() => { query.count = count + 1 }}>+</button>
      <button onClick={() => { query.count = count - 1 }}>-</button>
      <button onClick={() => { query.count = undefined }}>Reset</button>
    </div>
  )
}
export default Counter`

function Counter({ query }: TypedProps<'Counter'>) {
    useSignals()
    // query.count is typed as number (schema-defined)
    const count = query.count ?? 0

    return (
        <section>
            <h2>Counter (Query State Demo)</h2>
            <p>
                This counter uses <strong>schema-enabled query parameters</strong>{' '}
                to store state in the URL. Numbers serialize automatically.
            </p>

            <div className='counter-demo'>
                <div className='counter-display'>
                    <h3>Count: {count}</h3>
                </div>

                <div className='counter-controls'>
                    <button
                        type='button'
                        onClick={() => {
                            query.count = count - 1
                        }}
                        className='btn'
                    >
                        Decrement
                    </button>
                    <button
                        type='button'
                        onClick={() => {
                            query.count = count + 1
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
                    highlightLines={[10, 16, 21]}
                />
            </div>
        </section>
    )
}

export default Counter
