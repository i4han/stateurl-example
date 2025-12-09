import { useEffect } from 'react'
import { Outlet, useNavigator, feature, pathname } from 'stateurl'

export default function Layout() {
    const { handleHref, to } = useNavigator()
    const version = feature.version.value
    const theme = feature.theme.value
    const currentPath = pathname.value

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const isActive = (path: string) => currentPath.includes(path)

    const toggleTheme = () => {
        feature.theme.set(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className='app-container'>
            <header className='top-menu'>
                <div className='logo'>
                    <h1>StateURL Example</h1>
                </div>
                <nav className='top-nav'>
                    <div className='feature-badges'>
                        <span className='badge version'>v{version}</span>
                        <span className={`badge theme ${theme}`}>
                            {theme === 'light' ? 'Light' : 'Dark'}
                        </span>
                    </div>
                    <button
                        type='button'
                        onClick={() => {
                            feature.version.set(version === '1' ? '2' : '1')
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
                    </nav>
                </aside>

                <main className='main-content'>
                    <Outlet />
                </main>
            </div>

            <footer>
                <p>
                    StateURL Demo • Theme: <strong>{theme}</strong> • Path:{' '}
                    <code>{pathname.value}</code>
                </p>
            </footer>
        </div>
    )
}
