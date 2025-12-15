/**
 * TabsDemo - URL-based tabs with stateurl
 *
 * Shows how to implement tabs using routes instead of useState.
 * Each tab is a URL: /tabs/overview, /tabs/details, /tabs/activity
 */
import {
    defineRoute,
    useSignals,
    handleHref,
    Outlet,
    type SurlRouteProps,
} from 'stateurl'
import { cx } from 'stateurl/utils'
import CodeExample from './CodeExample'

import { OverviewRoute } from './TabsDemo/Overview'
import { DetailsRoute } from './TabsDemo/Details'
import { ActivityRoute } from './TabsDemo/Activity'

const tabsDemoConfig = {
    path: 'tabs',
    trail: '/',
    outlet: [OverviewRoute, DetailsRoute, ActivityRoute],
} as const

export const TabsDemoRoute = defineRoute(TabsDemo, tabsDemoConfig)

export default function TabsDemo(props: SurlRouteProps<typeof tabsDemoConfig>) {
    useSignals()
    const [active] = props.ahead

    return (
        <section className="tabs-demo">
            <h2>URL-Based Tabs</h2>
            <p>
                Tabs as routes. No useState, no switch statement.
                Each tab is a URL that can be bookmarked and shared.
            </p>

            {/* The actual tabs - that's it */}
            <div className="tabs">
                <a href={props.to('overview')} onClick={handleHref} className={cx(active === 'overview' && 'active')}>
                    Overview
                </a>
                <a href={props.to('details')} onClick={handleHref} className={cx(active === 'details' && 'active')}>
                    Details
                </a>
                <a href={props.to('activity')} onClick={handleHref} className={cx(active === 'activity' && 'active')}>
                    Activity
                </a>
            </div>

            {/* Tab content renders here */}
            <Outlet />

            <div className="how-it-works">
                <h3>How It Works</h3>

                <h4>1. Define tab routes</h4>
                <CodeExample
                    code={`// TabsDemo/Overview.tsx
import { defineRoute } from 'stateurl'

const overviewConfig = {
    path: 'overview',
    trail: '/tabs',
    index: true,  // Default tab when visiting /tabs
} as const

export const OverviewRoute = defineRoute(Overview, overviewConfig)

export default function Overview() {
    return <div>Overview content</div>
}`}
                    language="tsx"
                />

                <h4>2. Parent with outlet</h4>
                <CodeExample
                    code={`// TabsDemo.tsx
import { defineRoute, handleHref, Outlet } from 'stateurl'
import { cx } from 'stateurl/utils'
import { OverviewRoute } from './TabsDemo/Overview'
import { DetailsRoute } from './TabsDemo/Details'

const tabsDemoConfig = {
    path: 'tabs',
    trail: '/',
    outlet: [OverviewRoute, DetailsRoute],  // Child routes
} as const

export const TabsDemoRoute = defineRoute(TabsDemo, tabsDemoConfig)

export default function TabsDemo(props) {
    const [active] = props.ahead  // Current tab from URL

    return (
        <>
            <div className="tabs">
                <a href={props.to('overview')} onClick={handleHref}
                   className={cx(active === 'overview' && 'active')}>
                    Overview
                </a>
                <a href={props.to('details')} onClick={handleHref}
                   className={cx(active === 'details' && 'active')}>
                    Details
                </a>
            </div>
            <Outlet />  {/* Tab content renders here */}
        </>
    )
}`}
                    language="tsx"
                />

                <h4>Key Points</h4>
                <ul>
                    <li><code>props.ahead[0]</code> — current tab segment from URL</li>
                    <li><code>props.to('overview')</code> — generates href to child route</li>
                    <li><code>handleHref</code> — handles click navigation</li>
                    <li><code>cx(condition && 'class')</code> — conditional className</li>
                    <li><code>index: true</code> — default tab when parent URL is visited</li>
                    <li><code>&lt;Outlet /&gt;</code> — renders matched child route</li>
                </ul>
            </div>

            <style>{`
                .tabs-demo .tabs {
                    display: flex;
                    gap: 0;
                    border-bottom: 2px solid var(--border-default);
                    margin: 1.5rem 0 0;
                }

                .tabs-demo .tabs a {
                    padding: 0.75rem 1.5rem;
                    text-decoration: none;
                    color: var(--text-secondary);
                    border-bottom: 2px solid transparent;
                    margin-bottom: -2px;
                    transition: color 0.15s, border-color 0.15s;
                }

                .tabs-demo .tabs a:hover {
                    color: var(--text-primary);
                }

                .tabs-demo .tabs a.active {
                    color: var(--primary-color, #3b82f6);
                    border-bottom-color: var(--primary-color, #3b82f6);
                    font-weight: 500;
                }

                .tabs-demo .tab-content {
                    padding: 1.5rem;
                    background: var(--bg-surface);
                    border: 1px solid var(--border-default);
                    border-top: none;
                    border-radius: 0 0 8px 8px;
                }

                .tabs-demo .how-it-works {
                    margin-top: 3rem;
                    padding-top: 2rem;
                    border-top: 1px solid var(--border-default);
                }

                .tabs-demo .how-it-works h4 {
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                    color: var(--text-secondary);
                }

                .tabs-demo .how-it-works ul {
                    margin: 1rem 0;
                    padding-left: 1.5rem;
                }

                .tabs-demo .how-it-works li {
                    margin: 0.5rem 0;
                }
            `}</style>
        </section>
    )
}
