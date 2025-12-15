/**
 * TransitionsFast - Fast transition page
 *
 * path: 'transitions-fast' → TransitionsFast component, TransitionsFastRoute
 */

import { defineRoute, useSignals, handleHref } from 'stateurl'

const transitionsFastConfig = {
    path: 'fast',
    trail: '/transitions-demo',
    label: 'transitionsFast',
} as const

export const TransitionsFastRoute = defineRoute(TransitionsFast, transitionsFastConfig)

export default function TransitionsFast() {
    useSignals()
    return (
        <section>
            <h2>Fast Page</h2>
            <p>
                Transition complete! The loading bar showed while navigating
                here.
            </p>

            <div className='setting-item'>
                <h3>Page Loaded Successfully</h3>
                <p>
                    The router automatically tracked navigation and displayed
                    the loading indicator for ~400ms minimum.
                </p>
                <div
                    style={{
                        height: '4px',
                        background: '#10b981',
                        borderRadius: '2px',
                        marginTop: '1rem',
                    }}
                />
            </div>

            <div className='info-box'>
                <h4>About This Page:</h4>
                <ul>
                    <li>Loading bar appeared at the top during navigation</li>
                    <li>Transition state was tracked throughout</li>
                    <li>Page rendered after transition completed</li>
                </ul>
            </div>

            <div className='button-group'>
                <a
                    href='/transitions-demo'
                    onClick={handleHref}
                    className='btn'
                >
                    ← Back to Transitions Demo
                </a>
            </div>
        </section>
    )
}
