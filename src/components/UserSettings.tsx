import { handleHref, useSignals, type SurlRouteProps } from 'stateurl'
import CodeExample from './CodeExample'

// Schema with trail for type-safe navigation
export const userSettingsSchema = {
    trail: '/users/settings',
    schema: {}
} as const

const code = `
import { handleHref, type SurlRouteProps } from 'stateurl'

// Schema with trail for sibling navigation
export const userSettingsSchema = {
    trail: '/users/settings',
    schema: {}
} as const

function UserSettings({ to }: SurlRouteProps<typeof userSettingsSchema>) {
    return (
        <div>
            {/* Navigate to cousin: profile/:userId */}
            <button data-href={to('../profile/:userId', { userId: 1 })} onClick={handleHref}>
                Go to User 1 Profile (../profile/:userId)
            </button>

            {/* Navigate to parent */}
            <button data-href={to('../')} onClick={handleHref}>
                Back to Users (../)
            </button>
        </div>
    )
}`

function UserSettings({
    to,
    breadcrumbs,
}: SurlRouteProps<typeof userSettingsSchema>) {
    useSignals()

    return (
        <div className='detail-card'>
            <h3>User Settings</h3>
            <p>This is a sibling route to /users/profile/:userId</p>

            <div className='param-info'>
                <strong>Breadcrumbs:</strong>{' '}
                <code>{breadcrumbs.join(' / ')}</code>
            </div>

            <br />
            <div className='navigation-demo'>
                <h4>Sibling Navigation Demo</h4>
                <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '0.5rem' }}>
                    From /users/settings, navigate to cousin /users/profile/:userId
                </p>
                <div className='button-group'>
                    <button type='button' data-href={to('../')} onClick={handleHref}>
                        ← Back (../)
                    </button>
                    <button type='button' data-href={to('../profile/:userId', { userId: 0 })} onClick={handleHref}>
                        User 0 (../profile/:userId)
                    </button>
                    <button type='button' data-href={to('../profile/:userId', { userId: 1 })} onClick={handleHref}>
                        User 1 (../profile/:userId)
                    </button>
                    <button type='button' data-href={to('../profile/:userId', { userId: 2 })} onClick={handleHref}>
                        User 2 (../profile/:userId)
                    </button>
                </div>
            </div>

            <CodeExample code={code} language='tsx' highlightLines={[13, 18, 23]} />
        </div>
    )
}

export default UserSettings
