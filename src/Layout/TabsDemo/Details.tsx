import { defineRoute } from 'stateurl'

const detailsConfig = {
    path: 'details',
    trail: '/tabs',
} as const

export const DetailsRoute = defineRoute(Details, detailsConfig)

export default function Details() {
    return (
        <div className="tab-content">
            <h3>Details</h3>
            <p>Additional details go here.</p>
        </div>
    )
}
