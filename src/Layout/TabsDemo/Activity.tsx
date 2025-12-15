import { defineRoute } from 'stateurl'

const activityConfig = {
    path: 'activity',
    trail: '/tabs',
} as const

export const ActivityRoute = defineRoute(Activity, activityConfig)

export default function Activity() {
    return (
        <div className="tab-content">
            <h3>Activity</h3>
            <p>Recent activity would be shown here.</p>
        </div>
    )
}
