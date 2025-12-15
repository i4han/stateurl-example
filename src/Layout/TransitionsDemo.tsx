/**
 * Transitions Demo - Transition state tracking for loading UI
 *
 * path: 'transitions-demo' → TransitionsDemo component, TransitionsDemoRoute
 */
import {
    defineRoute,
    useSignals,
    routerState,
    feature,
    handleHref,
    Outlet,
    type SurlRouteProps,
} from 'stateurl'
import { TransitionsFastRoute } from './TransitionsDemo/TransitionsFast'
import { TransitionsMediumRoute } from './TransitionsDemo/TransitionsMedium'
import { TransitionsSlowRoute } from './TransitionsDemo/TransitionsSlow'

const transitionsDemoConfig = {
    path: 'transitions-demo',
    trail: '/',
    outlet: [
        TransitionsFastRoute,
        TransitionsMediumRoute,
        TransitionsSlowRoute,
    ],
} as const

export const TransitionsDemoRoute = defineRoute(
    TransitionsDemo,
    transitionsDemoConfig,
)

export default function TransitionsDemo(
    props: SurlRouteProps<typeof transitionsDemoConfig>,
) {
    useSignals()
    const transition = routerState.value.transition

    // Render child routes if navigating to them
    if (props.ahead.length > 0) {
        return <Outlet />
    }

    return (
        <section>
            <h2>Transitions Demo</h2>
            <p>
                Track navigation state for loading UI and animations.
                <span
                    style={{
                        marginLeft: '1rem',
                        opacity: 0.6,
                        fontSize: '0.9em',
                    }}
                >
                    (Current version: {feature.version})
                </span>
            </p>

            <div className='settings-grid'>
                <div className='setting-item'>
                    <h3>Current State</h3>
                    <p>
                        Status:{' '}
                        <strong>{transition ? 'Transitioning' : 'Idle'}</strong>
                    </p>
                    {transition && (
                        <div
                            style={{
                                fontSize: '0.9rem',
                                color: '#666',
                                marginTop: '0.5rem',
                            }}
                        >
                            <p>
                                From: <code>{transition.from.resource}</code>
                            </p>
                            <p>
                                To: <code>{transition.to.resource}</code>
                            </p>
                        </div>
                    )}
                </div>

                <div className='setting-item'>
                    <h3>Test Navigation</h3>
                    <p>Click to navigate and watch the loading bar</p>
                    <div className='button-group'>
                        <a
                            href='/transitions-demo/fast'
                            onClick={handleHref}
                            className='btn'
                        >
                            Fast
                        </a>
                        <a
                            href='/transitions-demo/medium'
                            onClick={handleHref}
                            className='btn'
                        >
                            Medium
                        </a>
                        <a
                            href='/transitions-demo/slow'
                            onClick={handleHref}
                            className='btn'
                        >
                            Slow
                        </a>
                    </div>
                </div>
            </div>

            <div className='info-box'>
                <h4>How Transitions Work:</h4>
                <ol>
                    <li>User navigates to a new route</li>
                    <li>
                        Router sets transition state: <code>from → to</code>
                    </li>
                    <li>
                        Navigation completes (URL updated, new route renders)
                    </li>
                    <li>Router marks location as stable (~400ms minimum)</li>
                    <li>Transition state clears back to idle</li>
                </ol>
            </div>

            <div className='info-box'>
                <h4>What to Notice:</h4>
                <ul>
                    <li>
                        Gradient loading bar appears at the top during
                        navigation
                    </li>
                    <li>Current State section updates reactively</li>
                    <li>Loading bar visible for minimum 400ms</li>
                    <li>
                        Access via <code>routerState.value.transition</code>
                    </li>
                </ul>
            </div>

            <div className='info-box'>
                <h4>Use Cases:</h4>
                <ul>
                    <li>Show global loading bars</li>
                    <li>Display loading spinners in content areas</li>
                    <li>Add page transition animations</li>
                    <li>Disable navigation during transitions</li>
                    <li>Track navigation timing for analytics</li>
                </ul>
            </div>
        </section>
    )
}
