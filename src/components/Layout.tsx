import { useEffect, useState, type MouseEvent } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import { Outlet, feature, path, routerState, handleHref } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'

export default function Layout({ to, ahead }: RouteComponentProps) {
    useSignals() // Enable signal tracking
    const transition = routerState.value.transition
    const [toast, setToast] = useState<string | null>(null)
    const [active] = ahead
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', feature.theme)
    }, [feature.theme])

    const toggleTheme = () => {
        feature.theme = feature.theme === 'light' ? 'dark' : 'light'
    }

    const toggleVersion = () => {
        feature.version = feature.version === 'v1' ? 'v2' : 'v1'
        setToast(`Check URL updated to ${feature.version}`)
        setTimeout(() => setToast(null), 2500)
    }

    return (
        <div className='app-container'>
            {/* Global transition loading bar */}
            {transition && (
                <>
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            background: 'rgba(59, 130, 246, 0.1)',
                            zIndex: 9999,
                        }}
                    >
                        <div
                            style={{
                                height: '100%',
                                background:
                                    'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b)',
                                animation: 'loadingBar 0.4s ease-out forwards',
                                transformOrigin: 'left',
                                boxShadow: '0 0 10px rgba(139, 92, 207, 0.5)',
                            }}
                        />
                    </div>
                    <style>{`
                        @keyframes loadingBar {
                            0% { transform: scaleX(0); }
                            100% { transform: scaleX(1); }
                        }
                    `}</style>
                </>
            )}

            <header className='top-menu'>
                <a href={to('/home')} onClick={handleHref} className='logo'>
                    <span className='logo-icon'>S</span>
                    <span className='logo-text'>StateURL</span>
                </a>
                <nav className='top-nav'>
                    <a
                        href='https://github.com/i4han/stateurl-example'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='feature-toggle github-link'
                        style={{ textDecoration: 'none' }}
                    >
                        GitHub
                    </a>
                    <a
                        href='https://www.npmjs.com/package/stateurl'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='feature-toggle npm-link'
                        style={{ textDecoration: 'none' }}
                    >
                        📦 npm
                    </a>
                    <a
                        href='/docs/'
                        className='feature-toggle docs-link'
                        style={{ textDecoration: 'none' }}
                    >
                        📚 API Docs
                    </a>
                    <button
                        type='button'
                        onClick={toggleVersion}
                        className='feature-toggle'
                    >
                        Toggle Version
                    </button>
                    <button
                        type='button'
                        onClick={toggleTheme}
                        className='feature-toggle theme-toggle'
                    >
                        {feature.theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </nav>
            </header>

            {/* Toast notification - below header */}
            {toast && (
                <div
                    style={{
                        position: 'fixed',
                        top: '60px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background:
                            feature.theme === 'dark'
                                ? 'rgba(59, 130, 246, 0.2)'
                                : 'rgba(59, 130, 246, 0.1)',
                        color: feature.theme === 'dark' ? '#93c5fd' : '#1e40af',
                        padding: '8px 20px',
                        borderRadius: '6px',
                        border: '1px solid rgba(59, 130, 246, 0.25)',
                        zIndex: 10000,
                        animation:
                            'toastFade 0.3s ease-out, toastFadeOut 0.8s ease-in 2.2s',
                        fontWeight: 500,
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    {toast}
                    <style>{`
                        @keyframes toastFade {
                            0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
                            100% { opacity: 1; transform: translateX(-50%) translateY(0); }
                        }
                        @keyframes toastFadeOut {
                            0% { opacity: 1; }
                            100% { opacity: 0; }
                        }
                    `}</style>
                </div>
            )}

            <div className='app-body'>
                <aside className='side-nav'>
                    <nav>
                        <a
                            href={to('/home')}
                            onClick={handleHref}
                            className={active === 'home' ? 'active' : ''}
                        >
                            Home
                        </a>
                        <a
                            href={to('/counter')}
                            onClick={handleHref}
                            className={active === 'counter' ? 'active' : ''}
                        >
                            Counter
                        </a>
                        <a
                            href={to('/products')}
                            onClick={handleHref}
                            className={active === 'products' ? 'active' : ''}
                        >
                            Products
                        </a>
                        <a
                            href={to('/users')}
                            onClick={handleHref}
                            className={active === 'users' ? 'active' : ''}
                        >
                            Users
                        </a>
                        <a
                            href={to('/settings')}
                            onClick={handleHref}
                            className={active === 'settings' ? 'active' : ''}
                        >
                            Settings
                        </a>
                        <a
                            href={to('/via-demo')}
                            onClick={handleHref}
                            className={active === 'via-demo' ? 'active' : ''}
                        >
                            Via Navigation
                        </a>
                        <a
                            href={to('/query-demo')}
                            onClick={handleHref}
                            className={active === 'query-demo' ? 'active' : ''}
                        >
                            Query Params
                        </a>
                        <a
                            href={to('/param-demo/1')}
                            onClick={handleHref}
                            className={active === 'param-demo' ? 'active' : ''}
                        >
                            Param Assignment
                        </a>
                        <a
                            href={to('/about')}
                            onClick={handleHref}
                            className={active === 'about' ? 'active' : ''}
                        >
                            About
                        </a>
                        <a
                            href={to('/nested-layout-demo')}
                            onClick={handleHref}
                            className={
                                active === 'nested-layout-demo' ? 'active' : ''
                            }
                        >
                            Nested Layouts
                        </a>
                        <a
                            href={to('/guards-demo')}
                            onClick={handleHref}
                            className={active === 'guards-demo' ? 'active' : ''}
                        >
                            Guards
                        </a>
                        <a
                            href={to('/transitions-demo')}
                            onClick={handleHref}
                            className={
                                active === 'transitions-demo' ? 'active' : ''
                            }
                        >
                            Transitions
                        </a>
                        <a
                            href={to('/error-boundary-demo')}
                            onClick={handleHref}
                            className={
                                active === 'error-boundary-demo' ? 'active' : ''
                            }
                        >
                            Error Boundary
                        </a>
                    </nav>
                </aside>

                <main className='main-content'>
                    <Outlet />
                </main>
            </div>

            <footer>
                <p>
                    StateURL Demo • Theme: <strong>{feature.theme}</strong> •
                    Path: <code>{path.full.value}</code>
                </p>
            </footer>
        </div>
    )
}
