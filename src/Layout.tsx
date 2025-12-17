import { useState, useEffect } from 'react'
import { useSignals, Outlet, feature, path, handleHref } from 'stateurl'
import { cx } from 'stateurl/utils'
import type { RouteComponentProps } from 'stateurl'
import Header from './Header'

export default function Layout({ to, ahead }: RouteComponentProps) {
    useSignals()
    const collapsed = feature.sidebar === 'collapsed'
    const [active] = ahead
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [active])

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileMenuOpen(false)
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileMenuOpen])

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        handleHref(e)
        setMobileMenuOpen(false)
    }

    return (
        <div className='app-container'>
            <Header to={to} onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} mobileMenuOpen={mobileMenuOpen} />

            {/* Mobile menu overlay */}
            <div
                className={cx('mobile-overlay', mobileMenuOpen && 'open')}
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden='true'
            />

            <div className={cx('app-body', collapsed && 'sidebar-collapsed')}>
                <button
                    type='button'
                    className='sidebar-toggle'
                    onClick={() => (feature.sidebar = collapsed ? 'open' : 'collapsed')}
                    title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? '›' : '‹'}
                </button>
                <aside className={cx('side-nav', collapsed && 'collapsed', mobileMenuOpen && 'mobile-open')}>
                    <nav>
                        {/* Overview */}
                        <a href={to('/home')} onClick={handleNavClick} className={cx(active === 'home' && 'active')}>
                            Home
                        </a>
                        <a href={to('/about')} onClick={handleNavClick} className={cx(active === 'about' && 'active')}>
                            About
                        </a>

                        {/* Basic Examples */}
                        <a href={to('/counter')} onClick={handleNavClick} className={cx(active === 'counter' && 'active')}>
                            Counter
                        </a>
                        <a href={to('/products')} onClick={handleNavClick} className={cx(active === 'products' && 'active')}>
                            Products
                        </a>
                        <a href={to('/users')} onClick={handleNavClick} className={cx(active === 'users' && 'active')}>
                            Users
                        </a>

                        {/* Core Features */}
                        <a href={to('/query-demo')} onClick={handleNavClick} className={cx(active === 'query-demo' && 'active')}>
                            Query Params
                        </a>
                        <a href={to('/param-demo/1')} onClick={handleNavClick} className={cx(active === 'param-demo' && 'active')}>
                            Param Assignment
                        </a>
                        <a href={to('/label-demo')} onClick={handleNavClick} className={cx(active === 'label-demo' && 'active')}>
                            Label Navigation
                        </a>
                        <a href={to('/at-demo')} onClick={handleNavClick} className={cx(active === 'at-demo' && 'active')}>
                            at.* Accessor
                        </a>
                        <a href={to('/type-safety')} onClick={handleNavClick} className={cx(active === 'type-safety' && 'active')}>
                            Type Safety
                        </a>
                        <a href={to('/nested-layout-demo')} onClick={handleNavClick} className={cx(active === 'nested-layout-demo' && 'active')}>
                            Nested Layouts
                        </a>
                        <a href={to('/tabs')} onClick={handleNavClick} className={cx(active === 'tabs' && 'active')}>
                            Tabs
                        </a>
                        <a href={to('/scroll-spy')} onClick={handleNavClick} className={cx(active === 'scroll-spy' && 'active')}>
                            Scroll Spy
                        </a>

                        {/* Advanced Features */}
                        <a href={to('/loader-demo')} onClick={handleNavClick} className={cx(active === 'loader-demo' && 'active')}>
                            Loader API
                        </a>
                        <a href={to('/guards-demo')} onClick={handleNavClick} className={cx(active === 'guards-demo' && 'active')}>
                            Guards
                        </a>
                        <a href={to('/transitions-demo')} onClick={handleNavClick} className={cx(active === 'transitions-demo' && 'active')}>
                            Transitions
                        </a>
                        <a href={to('/fork-demo')} onClick={handleNavClick} className={cx(active === 'fork-demo' && 'active')}>
                            Fork Routes
                        </a>
                        <a href={to('/error-boundary-demo')} onClick={handleNavClick} className={cx(active === 'error-boundary-demo' && 'active')}>
                            Error Boundary
                        </a>

                        {/* Configuration */}
                        <a href={to('/settings')} onClick={handleNavClick} className={cx(active === 'settings' && 'active')}>
                            Settings
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
                    Path: <code>{path.full}</code>
                </p>
            </footer>
        </div>
    )
}
