/**
 * ForkPanelB - Child panel B of ForkLayout
 *
 * path: 'panel-b' → ForkPanelB component, ForkPanelBRoute
 */

import { defineRoute, useSignals } from 'stateurl'

const forkPanelBConfig = {
    path: 'panel-b',
    trail: '/fork-layout',
    label: 'forkPanelB',
} as const

export const ForkPanelBRoute = defineRoute(ForkPanelB, forkPanelBConfig)

export default function ForkPanelB() {
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
