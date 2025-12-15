/**
 * UserSettings - User settings page
 *
 * path: 'settings' → UserSettings component, UserSettingsRoute
 */

import { defineRoute, handleHref, useSignals, type SurlRouteProps } from 'stateurl'
import CodeExample from '../CodeExample'

const userSettingsConfig = {
    path: 'settings',
    trail: '/users',
    label: 'userSettings',
} as const

export const UserSettingsRoute = defineRoute(UserSettings, userSettingsConfig)

const code = `
import { handleHref, type SurlRouteProps } from 'stateurl'

// Trail: /users/settings (sibling to /users/profile/:userId)
export const userSettingsSchema = {
    trail: '/users/settings',
    schema: {}
} as const

function UserSettings({ to }: SurlRouteProps<typeof userSettingsConfig>) {
    return (
        <div>
            {/* Navigate to sibling: ../profile/:userId */}
            <button data-href={to('../profile/:userId', { userId: 1 })} onClick={handleHref}>
                User 1 Profile
            </button>

            {/* Navigate to parent: ../ → /users */}
            <button data-href={to('../')} onClick={handleHref}>
                Users List
            </button>
        </div>
    )
}`

export default function UserSettings({
    to,
    breadcrumbs,
}: SurlRouteProps<typeof userSettingsConfig>) {
    useSignals()

    return (
        <div className='detail-card'>
            <h3>User Settings</h3>
            <p>Sibling route to /users/profile/:userId (both under /users)</p>

            <div className='param-info'>
                <strong>Trail:</strong> <code>/users/settings</code>
                <br />
                <strong>Breadcrumbs:</strong>{' '}
                <code>{breadcrumbs.join(' / ')}</code>
            </div>

            <br />
            <div className='navigation-demo'>
                <h4>Sibling Navigation (../)</h4>
                <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '0.5rem' }}>
                    Navigate to sibling /users/profile/:userId
                </p>
                <div className='button-group'>
                    <button type='button' data-href={to('../')} onClick={handleHref}>
                        ← Users (../)
                    </button>
                    <button type='button' data-href={to('../profile/:userId', { userId: 0 })} onClick={handleHref}>
                        User 0
                    </button>
                    <button type='button' data-href={to('../profile/:userId', { userId: 1 })} onClick={handleHref}>
                        User 1
                    </button>
                    <button type='button' data-href={to('../profile/:userId', { userId: 2 })} onClick={handleHref}>
                        User 2
                    </button>
                </div>
            </div>

            <CodeExample code={code} language='tsx' highlightLines={[13, 18, 23]} />
        </div>
    )
}
