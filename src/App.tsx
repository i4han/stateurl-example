import { Router } from 'stateurl'
import { routes } from './routes'

function NotFound() {
    return (
        <div className='not-found'>
            <h2>404 - Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <p>Current path: {window.location.pathname}</p>
        </div>
    )
}

export const appFeature = { version: ['v1', 'v2'], theme: ['light', 'dark'] } as const

export default function App() {
    return (
        <Router
            base='app'
            feature={appFeature}
            routes={routes}
            NotFound={NotFound}
            redirectToBase={true}
        />
    )
}
