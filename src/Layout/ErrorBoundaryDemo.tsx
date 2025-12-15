/**
 * Error Boundary Demo - Automatic error recovery with rollback
 */

import { useState } from 'react'
import { defineRoute, go, useSignals, ErrorBoundary, Outlet, type SurlRouteProps } from 'stateurl'
import CodeExample from './CodeExample'
import { ErrorStableRoute } from './ErrorBoundaryDemo/ErrorStable'
import { ErrorImmediateRoute } from './ErrorBoundaryDemo/ErrorImmediate'
import { ErrorDelayedRoute } from './ErrorBoundaryDemo/ErrorDelayed'

const errorBoundaryDemoConfig = {
    path: 'error-boundary-demo',
    trail: '/',
    outlet: [ErrorStableRoute, ErrorImmediateRoute, ErrorDelayedRoute],
} as const

export const ErrorBoundaryDemoRoute = defineRoute(ErrorBoundaryDemo, errorBoundaryDemoConfig)

export default function ErrorBoundaryDemo(props: SurlRouteProps<typeof errorBoundaryDemoConfig>) {
    useSignals()

    // Render child routes if navigating to them
    if (props.ahead.length > 0) {
        return <Outlet />
    }

    return (
        <section>
            <h2>Error Boundary Demo</h2>
            <p>Automatic error recovery with URL rollback.</p>

            <div className='settings-grid'>
                <div className='setting-item'>
                    <h3>Test Scenarios</h3>
                    <p>Try these pages to see error recovery</p>
                    <div className='button-group'>
                        <button onClick={() => go('/error-boundary-demo/stable')} className='btn'>
                            Stable Page
                        </button>
                        <button onClick={() => go('/error-boundary-demo/immediate')} className='btn'>
                            Immediate Error
                        </button>
                        <button onClick={() => go('/error-boundary-demo/delayed')} className='btn'>
                            Delayed Error
                        </button>
                    </div>
                </div>
            </div>

            <div className='info-box'>
                <h4>How Error Recovery Works:</h4>
                <ol>
                    <li>Router marks each successful render as "stable"</li>
                    <li>If a page throws an error, ErrorBoundary catches it</li>
                    <li>Router automatically calls <code>rollback()</code></li>
                    <li>URL and state revert to the last stable location</li>
                    <li>User is returned to the previous working page</li>
                </ol>
            </div>

            <ErrorBoundaryPropsDemo />

            <div className='info-box'>
                <h4>Suggested Flow:</h4>
                <ol>
                    <li>Click Stable Page (router marks it as stable)</li>
                    <li>Click Immediate Error (instant rollback to Stable Page)</li>
                    <li>Click Delayed Error (renders OK)</li>
                    <li>Click the red button (triggers error → rollback to Stable Page)</li>
                </ol>
            </div>

            <div className='info-box'>
                <h4>Key Benefits:</h4>
                <ul>
                    <li><strong>Minimize blast radius</strong> - Error contained to one component, rest of app works</li>
                    <li>Automatic - No manual error handling needed</li>
                    <li>URL revert - Browser URL matches application state</li>
                    <li>State preservation - Last stable state is restored</li>
                    <li>User-friendly - Graceful recovery instead of crashes</li>
                </ul>
            </div>
        </section>
    )
}

/**
 * Demo for ErrorBoundary props
 */
function ErrorBoundaryPropsDemo() {
    const [showError, setShowError] = useState(false)
    const [resetKey, setResetKey] = useState(0)

    return (
        <div className='info-box'>
            <h4>ErrorBoundary Props</h4>
            <p>
                The <code>ErrorBoundary</code> component is exported for custom use.
                It supports <code>fallback</code> and <code>testing</code> props.
            </p>

            <CodeExample
                code={`import { ErrorBoundary } from 'stateurl'

// With custom fallback (ReactNode)
<ErrorBoundary fallback={<CustomErrorPage />}>
  <MyComponent />
</ErrorBoundary>

// With fallback render function
<ErrorBoundary
  fallback={({ error, resetError }) => (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={resetError}>Retry</button>
    </div>
  )}
>
  <MyComponent />
</ErrorBoundary>

// Testing mode (errors propagate)
<ErrorBoundary testing>
  <ComponentUnderTest />
</ErrorBoundary>`}
                language='tsx'
            />

            <h5 style={{ marginTop: '1rem' }}>Live Demo: Minimize Blast Radius</h5>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Error is contained to this box only. The rest of the page continues to work!
            </p>
            <div style={{ border: '2px dashed var(--color-primary, #3b82f6)', padding: '1rem', borderRadius: '8px', background: 'var(--bg-surface)', maxWidth: '280px' }}>
                <ErrorBoundary
                    key={resetKey}
                    fallback={({ error, resetError }) => (
                        <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '4px', minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <strong style={{ color: '#dc2626' }}>Error Caught!</strong>
                            <p style={{ margin: '0.5rem 0', fontSize: '0.875rem' }}>{error.message}</p>
                            <button
                                className='btn btn-primary'
                                onClick={() => {
                                    setShowError(false)
                                    setResetKey(k => k + 1)
                                    resetError()
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    )}
                >
                    {showError ? <ThrowingComponent /> : (
                        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '4px', minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <strong style={{ color: '#166534' }}>Component OK</strong>
                            <p style={{ margin: '0.5rem 0', fontSize: '0.875rem' }}>Click to simulate an error:</p>
                            <button
                                className='btn'
                                style={{ background: '#ef4444', color: 'white' }}
                                onClick={() => setShowError(true)}
                            >
                                Trigger Error
                            </button>
                        </div>
                    )}
                </ErrorBoundary>
            </div>
        </div>
    )
}

function ThrowingComponent(): never {
    throw new Error('Component error! Only this section fails - the rest of the page still works.')
}

