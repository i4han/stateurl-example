/**
 * UserDetail - User profile page
 *
 * path: 'profile/:userId' → UserDetail component, UserDetailRoute
 */

import { defineRoute, handleHref, useSignals, type SurlRouteProps } from 'stateurl'
import CodeExample from '../CodeExample'

const userDetailConfig = {
    path: 'profile/:userId',
    schema: { param: { userId: 0 } },
    trail: '/users',
    label: 'userProfile',
} as const

export const UserDetailRoute = defineRoute(UserDetail, userDetailConfig)

const users = [
    {
        id: 0,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'Admin',
    },
    { id: 1, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    {
        id: 2,
        name: 'Carol Williams',
        email: 'carol@example.com',
        role: 'Manager',
    },
]

const code = `
import { handleHref, useSignals, type SurlRouteProps } from 'stateurl'

// Schema with trail for type-safe navigation
export const userDetailSchema = {
    trail: '/users/profile/:userId',
    schema: { param: { userId: 0 } }
} as const

function UserDetail({ param, to }: SurlRouteProps<typeof userDetailConfig>) {
  useSignals()
  const userId = param.userId
  const prevUser = (userId - 1 + 3) % 3
  const nextUser = (userId + 1) % 3

  return (
    <div>
      <div className='button-group'>
        {/* to('../') goes up to /users */}
        <button data-href={to('../')} onClick={handleHref}>
          ← Back to Users
        </button>
        {/* Change param at current route - just assign */}
        <button onClick={() => { param.userId = prevUser }}>
          Prev User
        </button>
        <button onClick={() => { param.userId = nextUser }}>
          Next User
        </button>
      </div>
    </div>
  )
}`

export default function UserDetail({
    param,
    to,
    breadcrumbs,
}: SurlRouteProps<typeof userDetailConfig>) {
    useSignals()
    const userId = param.userId
    const user = users[userId]

    const prevUser = (userId - 1 + users.length) % users.length
    const nextUser = (userId + 1) % users.length

    if (!user) {
        return (
            <div className='placeholder'>
                <p>User not found</p>
            </div>
        )
    }

    return (
        <div className='detail-card'>
            <h3>{user.name}</h3>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <p>
                <strong>Role:</strong> {user.role}
            </p>
            <div className='param-info'>
                <strong>URL Param:</strong> <code>userId = {userId}</code>
                <br />
                <strong>Breadcrumbs:</strong>{' '}
                <code>{breadcrumbs.join(' / ')}</code>
            </div>

            <br />
            <div className='navigation-demo'>
                <h4>Type-Safe Relative Navigation</h4>
                <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '0.5rem' }}>
                    Trail: <code>/users/profile/:userId</code> — params don't count as depth
                </p>

                <div className='nav-level'>
                    <strong>Same route</strong>
                    <span style={{ fontSize: '0.85em', color: '#888' }}> → assign param directly</span>
                    <div className='button-group'>
                        <button type='button' onClick={() => { param.userId = prevUser }}>
                            ← Prev User ({prevUser})
                        </button>
                        <button type='button' onClick={() => { param.userId = nextUser }}>
                            Next User ({nextUser}) →
                        </button>
                        <button type='button' data-href={to('../settings')} onClick={handleHref}>
                            Settings (../settings)
                        </button>
                    </div>
                </div>

                <div className='nav-level'>
                    <strong>Cousin (../../)</strong>
                    <span style={{ fontSize: '0.85em', color: '#888' }}> → /*</span>
                    <div className='button-group'>
                        <button type='button' data-href={to('../../')} onClick={handleHref}>
                            Home (../../)
                        </button>
                        <button type='button' data-href={to('../../products')} onClick={handleHref}>
                            Products (../../products)
                        </button>
                        <button type='button' data-href={to('../../counter')} onClick={handleHref}>
                            Counter (../../counter)
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .nav-level {
                    margin-bottom: 1rem;
                    padding: 0.75rem;
                    background: var(--bg-muted, #f5f5f5);
                    border-radius: 6px;
                }
                .nav-level strong {
                    display: inline-block;
                    min-width: 140px;
                }
                .nav-level .button-group {
                    margin-top: 0.5rem;
                }
            `}</style>

            <CodeExample code={code} language='tsx' highlightLines={[20, 24, 28]} />
        </div>
    )
}
