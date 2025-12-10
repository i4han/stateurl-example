/**
 * Transitions Demo - Transition state tracking for loading UI
 */

import { useSignals } from '@preact/signals-react/runtime'
import { transition as navigate, routerState, useNavigator } from 'stateurl'

function TransitionPage({ title, color }: { title: string; color: string }) {
    const { handleHref } = useNavigator()

    return (
        <section>
            <h2>{title}</h2>
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
                        background: color,
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

export default function TransitionsDemo() {
    const { handleHref } = useNavigator()
    useSignals()
    const transition = routerState.value.transition

    return (
        <section>
            <h2>Transitions Demo</h2>
            <p>Track navigation state for loading UI and animations.</p>

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
                            href='/transitions-fast'
                            onClick={handleHref}
                            className='btn'
                        >
                            Page 1
                        </a>
                        <a
                            href='/transitions-medium'
                            onClick={handleHref}
                            className='btn'
                        >
                            Page 2
                        </a>
                        <a
                            href='/transitions-slow'
                            onClick={handleHref}
                            className='btn'
                        >
                            Page 3
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

// Export slow loading pages
export function TransitionsFastPage() {
    return <TransitionPage title='Fast Page' color='#10b981' />
}

export function TransitionsMediumPage() {
    return <TransitionPage title='Medium Page' color='#3b82f6' />
}

export function TransitionsSlowPage() {
    return <TransitionPage title='Slow Page' color='#8b5cf6' />
}
