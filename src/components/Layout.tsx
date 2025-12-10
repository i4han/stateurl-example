import { useEffect } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import { Outlet, useNavigator, feature, path, routerState } from 'stateurl'

export default function Layout() {
    useSignals() // Enable signal tracking
    const { handleHref, to } = useNavigator()
    const version = feature.version
    const theme = feature.theme
    const currentPath = path.full.value
    const transition = routerState.value.transition

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const isActive = (path: string) => currentPath.includes(path)

    const toggleTheme = () => {
        feature.theme = theme === 'light' ? 'dark' : 'light'
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
                <div className='logo'>
                    <h1>StateURL Example</h1>
                </div>
                <nav className='top-nav'>
                    <div className='feature-badges'>
                        <span className='badge version'>{version}</span>
                        <span className={`badge theme ${theme}`}>
                            {theme === 'light' ? 'Light' : 'Dark'}
                        </span>
                    </div>
                    <button
                        type='button'
                        onClick={() => {
                            feature.version = version === 'v1' ? 'v2' : 'v1'
                        }}
                        className='feature-toggle'
                    >
                        Toggle Version
                    </button>
                    <button
                        type='button'
                        onClick={toggleTheme}
                        className='feature-toggle theme-toggle'
                    >
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </nav>
            </header>

            <div className='app-body'>
                <aside className='side-nav'>
                    <nav>
                        <a
                            href={to('/home')}
                            onClick={handleHref}
                            className={isActive('/home') ? 'active' : ''}
                        >
                            Home
                        </a>
                        <a
                            href={to('/counter')}
                            onClick={handleHref}
                            className={isActive('/counter') ? 'active' : ''}
                        >
                            Counter
                        </a>
                        <a
                            href={to('/products')}
                            onClick={handleHref}
                            className={isActive('/products') ? 'active' : ''}
                        >
                            Products
                        </a>
                        <a
                            href={to('/users')}
                            onClick={handleHref}
                            className={isActive('/users') ? 'active' : ''}
                        >
                            Users
                        </a>
                        <a
                            href={to('/settings')}
                            onClick={handleHref}
                            className={isActive('/settings') ? 'active' : ''}
                        >
                            Settings
                        </a>
                        <a
                            href={to('/via-demo')}
                            onClick={handleHref}
                            className={isActive('/via-demo') ? 'active' : ''}
                        >
                            Via Navigation
                        </a>
                        <a
                            href={to('/about')}
                            onClick={handleHref}
                            className={isActive('/about') ? 'active' : ''}
                        >
                            About
                        </a>
                        <a
                            href={to('/nested-layout-demo')}
                            onClick={handleHref}
                            className={
                                isActive('/nested-layout-demo') ? 'active' : ''
                            }
                        >
                            Nested Layouts
                        </a>
                        <a
                            href={to('/guards-demo')}
                            onClick={handleHref}
                            className={isActive('/guards-demo') ? 'active' : ''}
                        >
                            Guards
                        </a>
                        <a
                            href={to('/transitions-demo')}
                            onClick={handleHref}
                            className={
                                isActive('/transitions-demo') ? 'active' : ''
                            }
                        >
                            Transitions
                        </a>
                        <a
                            href={to('/error-boundary-demo')}
                            onClick={handleHref}
                            className={
                                isActive('/error-boundary-demo') ? 'active' : ''
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
                    StateURL Demo • Theme: <strong>{theme}</strong> • Path:{' '}
                    <code>{path.full.value}</code>
                </p>
            </footer>
        </div>
    )
}
