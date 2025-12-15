/**
 * ErrorStable - Stable page for error recovery demo
 *
 * path: 'error-stable' → ErrorStablePage component, ErrorStableRoute
 */

import { defineRoute, go } from 'stateurl'

const errorStableConfig = {
    path: 'stable',
    trail: '/error-boundary-demo',
    label: 'errorStable',
} as const

export const ErrorStableRoute = defineRoute(ErrorStablePage, errorStableConfig)

export default function ErrorStablePage() {
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
