/**
 * Guards Demo - Route-level conditional navigation
 */

import {
    go,
    useSignals,
    Outlet,
    type Route,
    type GuardContext,
    type RouteComponentProps,
} from 'stateurl'

// Simulated auth state
let isAuthenticated = false
let isPremiumUser = false

export const authGuard = { when: () => isAuthenticated, orRender: LoginModal }
export const premiumGuard = {
    when: () => isPremiumUser,
    orRender: UpgradeModal,
}

export const GuardsRoute: Route = {
    path: 'guards-demo',
    render: GuardsDemo,
    outlet: [
        {
            path: 'guards-protected',
            case: [authGuard],
            render: GuardsProtectedPage,
        },
        {
            path: 'guards-premium',
            case: [authGuard, premiumGuard],
            render: GuardsPremiumPage,
        },
    ],
}

function login() {
    isAuthenticated = true
}

function logout() {
    isAuthenticated = false
    isPremiumUser = false
    go('/home')
}

function upgradeToPremium() {
    isPremiumUser = true
}

// Guard Components
function LoginModal({ intended, current, next, cancel }: GuardContext) {
    useSignals()
    const handleLogin = () => {
        login()
        next()
    }

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h3>Authentication Required</h3>
                <p>
                    You must log in to access{' '}
                    <strong>{intended.resource}</strong>
                </p>

                <div className='button-group'>
                    <button onClick={handleLogin} className='btn'>
                        Log In
                    </button>
                    <button onClick={cancel} className='btn'>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

function UpgradeModal({ intended, current, next, cancel }: GuardContext) {
    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h3>Premium Feature</h3>
                <p>
                    The <strong>{intended.resource}</strong> section requires a
                    premium subscription.
                </p>

                <div className='info-box'>
                    <h4>Premium Benefits:</h4>
                    <ul>
                        <li>Access to advanced analytics</li>
                        <li>Priority support</li>
                        <li>Exclusive content</li>
                    </ul>
                </div>

                <div className='button-group'>
                    <button
                        onClick={() => {
                            upgradeToPremium()
                            next()
                        }}
                        className='btn'
                    >
                        Upgrade to Premium
                    </button>
                    <button onClick={cancel} className='btn'>
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function GuardsDemo({ ahead }: RouteComponentProps) {
    useSignals()
    if (ahead.length > 0) {
        return <Outlet />
    }
    return (
        <section>
            <h2>Route Guards Demo</h2>
            <p>Conditional navigation with sequential guard evaluation.</p>

            <div className='settings-grid'>
                <div className='setting-item'>
                    <h3>Current Status</h3>
                    <p>
                        Authenticated:{' '}
                        <strong>{isAuthenticated ? 'Yes' : 'No'}</strong>
                    </p>
                    <p>
                        Premium: <strong>{isPremiumUser ? 'Yes' : 'No'}</strong>
                    </p>
                    {isAuthenticated && (
                        <button
                            onClick={logout}
                            className='btn'
                            style={{ marginTop: '0.5rem' }}
                        >
                            Logout
                        </button>
                    )}
                </div>

                <div className='setting-item'>
                    <h3>Test Scenarios</h3>
                    <p>Try these pages to see guards in action</p>
                    <div className='button-group'>
                        <button
                            onClick={() =>
                                go('/guards-demo/guards-protected')
                            }
                            className='btn'
                        >
                            Protected Page
                        </button>
                        <button
                            onClick={() =>
                                go('/guards-demo/guards-premium')
                            }
                            className='btn'
                        >
                            Premium Page
                        </button>
                    </div>
                    <p style={{ color: '#666', marginTop: '0.5rem' }}>
                        Protected: 1 guard • Premium: 2 guards (sequential)
                    </p>
                </div>
            </div>

            <div className='info-box'>
                <h4>How Guards Work:</h4>
                <ol>
                    <li>User tries to navigate to a protected route</li>
                    <li>
                        Router evaluates guards sequentially (one at a time)
                    </li>
                    <li>
                        If a guard fails, the <code>orRender</code> component
                        shows as a modal
                    </li>
                    <li>User satisfies the condition (e.g., logs in)</li>
                    <li>
                        Guard calls <code>next()</code> to proceed to next guard
                        or complete navigation
                    </li>
                </ol>
            </div>

            <div className='info-box'>
                <h4>Key Features:</h4>
                <ul>
                    <li>Sequential evaluation - Guards run one at a time</li>
                    <li>
                        Modal overlays - Guard components render over current
                        page
                    </li>
                    <li>next() and cancel() - User controls navigation flow</li>
                    <li>
                        Context props - Guards receive intended destination and
                        current location
                    </li>
                </ul>
            </div>
        </section>
    )
}

// Protected pages for guards demo
export function GuardsProtectedPage() {
    return (
        <section>
            <h2>Protected Page</h2>
            <p>You are authenticated and have access to this page.</p>

            <div className='setting-item'>
                <h3>Success</h3>
                <p>
                    You passed through the authentication guard to access this
                    page.
                </p>
                <p>This page required 1 guard: Authentication</p>
            </div>

            <div className='button-group' style={{ marginTop: '1.5rem' }}>
                <button onClick={() => go('/guards-demo')} className='btn'>
                    ← Back to Guards Demo
                </button>
            </div>
        </section>
    )
}

export function GuardsPremiumPage() {
    return (
        <section>
            <h2>Premium Page</h2>
            <p>You are a premium user with full access.</p>

            <div className='setting-item'>
                <h3>Premium Content</h3>
                <p>
                    You passed through TWO guards sequentially to access this
                    page:
                </p>
                <ol>
                    <li>Authentication guard</li>
                    <li>Premium subscription guard</li>
                </ol>
            </div>

            <div className='info-box'>
                <h4>Exclusive Premium Analytics:</h4>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1rem',
                        marginTop: '1rem',
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#2563eb' }}>1,234</h2>
                        <p>Users</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#10b981' }}>$56,789</h2>
                        <p>Revenue</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#f59e0b' }}>+23%</h2>
                        <p>Growth</p>
                    </div>
                </div>
            </div>

            <div className='button-group' style={{ marginTop: '1.5rem' }}>
                <button onClick={() => go('/guards-demo')} className='btn'>
                    ← Back to Guards Demo
                </button>
            </div>
        </section>
    )
}

// Export guard definitions for use in routes
