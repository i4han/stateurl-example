/**
 * ForkPanelA - Child panel A of ForkLayout
 *
 * path: 'panel-a' → ForkPanelA component, ForkPanelARoute
 */

import { defineRoute, useSignals } from 'stateurl'

const forkPanelAConfig = {
    path: 'panel-a',
    trail: '/fork-layout',
    label: 'forkPanelA',
} as const

export const ForkPanelARoute = defineRoute(ForkPanelA, forkPanelAConfig)

export default function ForkPanelA() {
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
