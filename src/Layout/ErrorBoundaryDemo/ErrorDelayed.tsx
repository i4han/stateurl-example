/**
 * ErrorDelayed - Delayed error page for error recovery demo
 *
 * path: 'error-delayed' → ErrorDelayedPage component, ErrorDelayedRoute
 */

import { useState } from 'react'
import { defineRoute, go } from 'stateurl'

const errorDelayedConfig = {
    path: 'delayed',
    trail: '/error-boundary-demo',
    label: 'errorDelayed',
} as const

export const ErrorDelayedRoute = defineRoute(ErrorDelayedPage, errorDelayedConfig)

export default function ErrorDelayedPage() {
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
