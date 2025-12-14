/**
 * Fork Demo - Parallel route rendering with ForkOutlet
 */

import type { RouteComponentProps } from 'stateurl'
import { useSignals, go, ForkOutlet, path } from 'stateurl'
import CodeExample from './CodeExample'

const mainCode = `
// Route configuration with fork
const routes = [{
    path: 'app',
    render: MainLayout,
    fork: true,  // ← Enable fork mode
    outlet: [
        { path: 'dashboard', render: Dashboard },
        { path: 'settings', render: Settings },
    ]
}]

// MainLayout component - children render in ForkOutlet
function MainLayout() {
    return (
        <div className="layout">
            <Sidebar />
            <main>
                <ForkOutlet />  {/* ← Fork children render here */}
            </main>
        </div>
    )
}`

/**
 * Main ForkDemo page - explains the fork concept
 */
export default function ForkDemo(_props: RouteComponentProps) {
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

/**
 * ForkLayoutDemo - the actual fork layout with ForkOutlet
 */
export function ForkLayoutDemo(_props: RouteComponentProps) {
    useSignals()

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: '1rem',
            minHeight: '400px',
            border: '2px solid var(--primary-color, #3b82f6)',
            borderRadius: '8px',
            overflow: 'hidden'
        }}>
            {/* Sidebar */}
            <aside style={{
                background: 'var(--sidebar-bg, #f1f5f9)',
                padding: '1rem',
                borderRight: '1px solid var(--border-color, #e2e8f0)'
            }}>
                <h3 style={{ margin: '0 0 1rem' }}>Sidebar</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted-color, #64748b)' }}>
                    This sidebar is part of the fork layout.
                    Child routes render in the main area via ForkOutlet.
                </p>

                <nav style={{ marginTop: '1rem' }}>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        style={{ width: '100%', marginBottom: '0.5rem' }}
                        onClick={() => go('/fork-layout/panel-a')}
                    >
                        Panel A
                    </button>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        style={{ width: '100%', marginBottom: '0.5rem' }}
                        onClick={() => go('/fork-layout/panel-b')}
                    >
                        Panel B
                    </button>
                    <button
                        type='button'
                        className='btn'
                        style={{ width: '100%' }}
                        onClick={() => go('/fork-demo')}
                    >
                        ← Back to Demo
                    </button>
                </nav>
            </aside>

            {/* Main content area */}
            <main style={{ padding: '1rem' }}>
                <h3>Main Content Area</h3>
                <p>ForkOutlet renders child routes here:</p>

                <div style={{
                    background: 'var(--fork-content-bg, #f8fafc)',
                    border: '2px dashed var(--border-color, #cbd5e1)',
                    borderRadius: '8px',
                    padding: '1rem',
                    minHeight: '200px'
                }}>
                    <ForkOutlet fallback={
                        <div style={{ textAlign: 'center', color: 'var(--muted-color, #94a3b8)' }}>
                            <p>No child route selected.</p>
                            <p>Click a panel button in the sidebar.</p>
                        </div>
                    } />
                </div>
            </main>
        </div>
    )
}

/**
 * Panel A - child of fork layout
 */
export function ForkPanelA() {
    useSignals()
    return (
        <div style={{
            background: '#dbeafe',
            padding: '1.5rem',
            borderRadius: '8px'
        }}>
            <h4 style={{ color: '#1d4ed8', margin: '0 0 0.5rem' }}>Panel A</h4>
            <p>This content renders via ForkOutlet in the main area.</p>
            <p>The sidebar remains visible because it's part of the parent layout.</p>
        </div>
    )
}

/**
 * Panel B - child of fork layout
 */
export function ForkPanelB() {
    useSignals()
    return (
        <div style={{
            background: '#dcfce7',
            padding: '1.5rem',
            borderRadius: '8px'
        }}>
            <h4 style={{ color: '#166534', margin: '0 0 0.5rem' }}>Panel B</h4>
            <p>Another child rendered via ForkOutlet.</p>
            <p>Switch between panels using the sidebar navigation.</p>
        </div>
    )
}
