/**
 * Fork Demo - Parallel route rendering with ForkOutlet
 */

import { defineRoute, go, path, useSignals } from 'stateurl'
import CodeExample from './CodeExample'

const forkDemoConfig = {
    path: 'fork-demo',
    trail: '/',
} as const

export const ForkDemoRoute = defineRoute(ForkDemo, forkDemoConfig)

const mainCode = `
// Component file: define route with path/schema/label validation
// ForkLayout/ForkLayout.tsx
export const ForkLayoutRoute = defineRoute({
    trail: '/',
    path: 'fork-layout',
    label: 'forkLayout',
    schema: {},
    render: ForkLayout,
})

// ForkLayout/ForkPanelA.tsx
export const ForkPanelARoute = defineRoute({
    trail: '/fork-layout',
    path: 'panel-a',
    label: 'forkPanelA',
    schema: {},
    render: ForkPanelA,
})

// routes.ts: compose tree structure
const routes = [{
    ...ForkLayoutRoute,
    fork: true,  // ← children render via ForkOutlet
    outlet: [
        ForkPanelARoute,
        ForkPanelBRoute,
    ]
}]

// In ForkLayout component
function ForkLayout() {
    return (
        <div className="layout">
            <Sidebar />
            <main>
                <ForkOutlet />  {/* ← Fork children here */}
            </main>
        </div>
    )
}`

/**
 * Main ForkDemo page - explains the fork concept
 */
export default function ForkDemo() {
    useSignals()
    const currentPath = path.full

    return (
        <section>
            <h2>Fork Routes Demo</h2>
            <p>
                Fork routes render their children to a <code>ForkOutlet</code> component
                instead of inline. This enables parallel route rendering for sidebars,
                modals, minimaps, and more.
            </p>

            <div className='current-location'>
                <strong>Current:</strong> <code>{currentPath}</code>
            </div>

            <div className='via-examples'>
                <ForkExplanationSection />
                <ForkNavigationSection />
                <ForkUseCasesSection />
            </div>

            <CodeExample code={mainCode} language='tsx' />
        </section>
    )
}

function ForkExplanationSection() {
    return (
        <div className='demo-section'>
            <h3>How Fork Works</h3>
            <p>
                Normally, child routes render inline via <code>&lt;Outlet /&gt;</code>.
                With <code>fork: true</code>, children are stored in fork state and
                rendered wherever you place <code>&lt;ForkOutlet /&gt;</code>.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                    <h4>Normal Outlet</h4>
                    <CodeExample
                        code={`function Parent() {
    return (
        <div>
            <Header />
            <Outlet />  {/* Child here */}
        </div>
    )
}`}
                        language='tsx'
                    />
                </div>
                <div>
                    <h4>Fork Outlet</h4>
                    <CodeExample
                        code={`function Parent() {
    return (
        <div>
            <Sidebar />
            <main>
                <ForkOutlet />  {/* Child here */}
            </main>
        </div>
    )
}`}
                        language='tsx'
                    />
                </div>
            </div>
        </div>
    )
}

function ForkNavigationSection() {
    useSignals()

    return (
        <div className='demo-section'>
            <h3>Try Fork Routes</h3>
            <p>
                Navigate to the fork layout demo to see ForkOutlet in action.
            </p>

            <div className='button-row'>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => go('/fork-layout')}
                >
                    Go to Fork Layout
                </button>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => go('/fork-layout/panel-a')}
                >
                    Fork Layout → Panel A
                </button>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => go('/fork-layout/panel-b')}
                >
                    Fork Layout → Panel B
                </button>
            </div>
        </div>
    )
}

function ForkUseCasesSection() {
    return (
        <div className='demo-section'>
            <h3>Use Cases</h3>
            <ul>
                <li><strong>Sidebars:</strong> Route content in main area, navigation in sidebar</li>
                <li><strong>Modals:</strong> Modal content from route, rendered in overlay</li>
                <li><strong>Split Views:</strong> Multiple panels with independent routing</li>
                <li><strong>Minimaps:</strong> Preview of route content in thumbnail view</li>
            </ul>

            <CodeExample
                code={`// Sidebar layout with fork
{
    path: 'dashboard',
    render: DashboardLayout,
    fork: true,
    outlet: [
        { path: 'overview', render: Overview },
        { path: 'analytics', render: Analytics },
        { path: 'reports', render: Reports },
    ]
}

// In DashboardLayout
function DashboardLayout() {
    return (
        <div className="dashboard">
            <aside className="sidebar">
                <NavLinks />
            </aside>
            <main className="content">
                <ForkOutlet fallback={<EmptyState />} />
            </main>
        </div>
    )
}`}
                language='tsx'
            />
        </div>
    )
}
