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

export default function App() {
    return (
        <Router
            routes={routes}
            basePattern='/app/:version=v1/:theme=light'
            RenderNotFound={NotFound}
            redirectToBase={true}
        />
    )
}
