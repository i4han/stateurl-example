import { useSignals, path, type SurlRouteProps } from 'stateurl'
import CodeExample from './CodeExample'

// Schema exported for routes.ts
export const paramDemoSchema = {
    trail: '/param-demo/:userId',
    schema: { param: { userId: 0 } }
} as const

const code = `import { type SurlRouteProps } from 'stateurl'

// Schema with trail for type-safe breadcrumbs
export const paramDemoSchema = {
    trail: '/param-demo/:userId',
    schema: { param: { userId: 0 } }
} as const

function UserProfile({ param, breadcrumbs }: SurlRouteProps<typeof paramDemoSchema>) {
  // breadcrumbs: [\`param-demo/\${number}\`]
    return (
        <div>
            <h1>User: {param.userId}</h1>
            <button onClick={() => { param.userId = 123 }}>User 123</button>
            <button onClick={() => { param.userId = 456 }}>User 456</button>
            <button onClick={() => { param.userId = 789 }}>User 789</button>
        </div>
    )
}
`

export default function ParamDemo({ param }: SurlRouteProps<typeof paramDemoSchema>) {
    useSignals()
    return (
        <section>
            <h2>Reactive Param Assignment</h2>
            <p>
                Assign to <code>param.*</code> and the URL updates instantly.
                Component re-renders reactively. No page refresh.
            </p>

            <div className='current-location'>
                <strong>URL:</strong> <code>{path.full}</code>
            </div>

            <div className='demo-section'>
                <h3>Try It</h3>
                <p>Click a button and watch the URL change:</p>

                <div className='param-controls'>
                    <div className='current-value'>
                        <strong>param.userId:</strong>{' '}
                        <code>{param.userId || <em>(not set)</em>}</code>
                    </div>

                    <div className='button-group'>
                        <button
                            type='button'
                            onClick={() => {
                                param.userId = 123
                            }}
                        >
                            param.userId = 123
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                param.userId = 456
                            }}
                        >
                            param.userId = 456
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                param.userId = 789
                            }}
                        >
                            param.userId = 789
                        </button>
                    </div>
                </div>

                <div className='info-box'>
                    <h4>What's happening:</h4>
                    <ol>
                        <li>
                            <code>param.userId = {param.userId}</code> is
                            called
                        </li>
                        <li>
                            URL updates via <code>history.replaceState()</code>
                        </li>
                        <li>Signal triggers reactive re-render</li>
                        <li>
                            Component updates -{' '}
                            <strong>no page refresh!</strong>
                        </li>
                    </ol>
                </div>
            </div>

            <div className='demo-section'>
                <h3>The Pitch</h3>
                <div className='pitch-box'>
                    <code className='pitch-code'>
                        param.userId = {param.userId}
                    </code>
                    <p className='pitch-text'>
                        Reactive re-render. URL updates. No page refresh.
                        <br />
                        <strong>That's it. That's the pitch.</strong>
                    </p>
                </div>
            </div>

            <CodeExample
                code={code}
                language='tsx'
                highlightLines={[7, 8, 9]}
            />

            <style>{`
                .param-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin: 1rem 0 1.5rem;
                }

                .current-value {
                    font-size: 1.1rem;
                    padding: 0.75rem 1rem;
                    background: var(--bg-muted);
                    border-radius: 6px;
                    font-family: var(--font-mono, monospace);
                }

                .info-box {
                    margin-top: 1.5rem;
                    padding: 1rem;
                    background: var(--bg-muted);
                    border-radius: 8px;
                    border-left: 3px solid var(--primary-color, #3b82f6);
                }

                .info-box h4 {
                    margin: 0 0 0.5rem 0;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                }

                .info-box ol {
                    margin: 0;
                    padding-left: 1.5rem;
                }

                .info-box li {
                    margin-bottom: 0.5rem;
                    line-height: 1.5;
                }

                .pitch-box {
                    text-align: center;
                    padding: 2rem;
                    background: linear-gradient(135deg, var(--bg-muted) 0%, var(--bg-surface) 100%);
                    border-radius: 12px;
                    border: 1px solid var(--border-default);
                }

                .pitch-code {
                    display: block;
                    font-size: 2rem;
                    font-weight: 600;
                    color: var(--primary-color, #3b82f6);
                    margin-bottom: 1rem;
                }

                .pitch-text {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: var(--text-secondary);
                    margin: 0;
                }
            `}</style>
        </section>
    )
}
