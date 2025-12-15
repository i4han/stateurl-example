/**
 * ForkLayout - Fork route layout with sidebar and ForkOutlet
 *
 * path: 'fork-layout' → ForkLayout component, ForkLayoutRoute
 */

import { defineRoute, ForkOutlet, go, useSignals } from 'stateurl'
import { ForkPanelARoute } from './ForkLayout/ForkPanelA'
import { ForkPanelBRoute } from './ForkLayout/ForkPanelB'

const forkLayoutConfig = {
    path: 'fork-layout',
    trail: '/',
    fork: true,
    outlet: [ForkPanelARoute, ForkPanelBRoute],
} as const

export const ForkLayoutRoute = defineRoute(ForkLayout, forkLayoutConfig)

export default function ForkLayout() {
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
                background: 'var(--bg-surface)',
                padding: '1rem',
                borderRight: '1px solid var(--border-default)'
            }}>
                <h3 style={{ margin: '0 0 1rem' }}>Sidebar</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
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
                    background: 'var(--bg-muted)',
                    border: '2px dashed var(--border-default)',
                    borderRadius: '8px',
                    padding: '1rem',
                    minHeight: '200px'
                }}>
                    <ForkOutlet fallback={
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                            <p>No child route selected.</p>
                            <p>Click a panel button in the sidebar.</p>
                        </div>
                    } />
                </div>
            </main>
        </div>
    )
}
