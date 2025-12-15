import { defineRoute } from 'stateurl'

const overviewConfig = {
    path: 'overview',
    trail: '/tabs',
    index: true, // Default tab
} as const

export const OverviewRoute = defineRoute(Overview, overviewConfig)

export default function Overview() {
    return (
        <div className="tab-content">
            <h3>Overview</h3>
            <p>This is the overview tab. It loads by default because of <code>index: true</code>.</p>
        </div>
    )
}
