/**
 * Error Boundary Demo - Automatic error recovery with rollback
 */

import { useState } from 'react'
import { go } from 'stateurl'

export default function ErrorBoundaryDemo() {
    return (
        <section>
            <h2>Error Boundary Demo</h2>
            <p>Automatic error recovery with URL rollback.</p>

            <div className='settings-grid'>
                <div className='setting-item'>
                    <h3>Test Scenarios</h3>
                    <p>Try these pages to see error recovery</p>
                    <div className='button-group'>
                        <button onClick={() => go('/error-stable')} className='btn'>
                            Stable Page
                        </button>
                        <button onClick={() => go('/error-immediate')} className='btn'>
                            Immediate Error
                        </button>
                        <button onClick={() => go('/error-delayed')} className='btn'>
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
                    <li>Automatic - No manual error handling needed</li>
                    <li>URL revert - Browser URL matches application state</li>
                    <li>State preservation - Last stable state is restored</li>
                    <li>User-friendly - Graceful recovery instead of crashes</li>
                </ul>
            </div>
        </section>
    )
}

// Stable page - successful render
export function ErrorStablePage() {
    return (
        <section>
            <h2>Stable Page</h2>
            <p>This page renders successfully and is marked as stable.</p>

            <div className='setting-item'>
                <h3>Stable State Established</h3>
                <p>
                    The router has marked this location as the "lastStable" state.
                    If you navigate to an error page, the router will rollback to here!
                </p>
            </div>

            <div className='button-group'>
                <button onClick={() => go('/error-boundary-demo')} className='btn'>
                    ← Back to Error Demo
                </button>
            </div>
        </section>
    )
}

// Immediate error page - throws on render
export function ErrorImmediatePage() {
    throw new Error('💥 Immediate render error! Router will rollback to last stable location.')
}

// Delayed error page - can trigger error via user action
export function ErrorDelayedPage() {
    const [shouldThrow, setShouldThrow] = useState(false)

    if (shouldThrow) {
        throw new Error('User-triggered error! Router will rollback.')
    }

    return (
        <section>
            <h2>Delayed Error Page</h2>
            <p>This page renders successfully at first, but can trigger an error.</p>

            <div className='info-box'>
                <h4>What happens when you click the button:</h4>
                <ol>
                    <li>Component throws an error during re-render</li>
                    <li>ErrorBoundary catches the error</li>
                    <li>Router calls <code>rollback()</code></li>
                    <li>URL reverts to last stable location</li>
                    <li>Previous page is restored</li>
                </ol>
            </div>

            <div className='button-group'>
                <button
                    onClick={() => setShouldThrow(true)}
                    className='btn'
                    style={{ background: '#ef4444', color: 'white' }}
                >
                    Trigger Error
                </button>
                <button onClick={() => go('/error-boundary-demo')} className='btn'>
                    Back to Demo
                </button>
            </div>
        </section>
    )
}

