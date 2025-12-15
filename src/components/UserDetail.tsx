import { handleHref, useSignals, type SurlRouteProps } from 'stateurl'
import CodeExample from './CodeExample'

// Schema exported for routes.ts
export const userDetailSchema = {
    trail: '/users/profile/:userId',
    schema: { param: { userId: 0 } }
} as const

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
import { handleHref, type SurlRouteProps } from 'stateurl'

// Schema with trail for type-safe to() navigation
export const userDetailSchema = {
    trail: '/users/profile/:userId',
    schema: { param: { userId: 0 } }
} as const

function UserDetail({ param, to }: SurlRouteProps<typeof userDetailSchema>) {
  const userId = param.userId
  const prevUser = (userId - 1 + 3) % 3
  const nextUser = (userId + 1) % 3

  return (
    <div>
      {/* Type-safe relative navigation */}
      <div className='button-group'>
        {/* to('../') goes up to /users */}
        <button data-href={to('../')} onClick={handleHref}>
          ← Back to Users
        </button>
        {/* Navigate to sibling with :param style */}
        <button data-href={to('../:id', { id: prevUser })} onClick={handleHref}>
          Prev User
        </button>
        <button data-href={to('../:id', { id: nextUser })} onClick={handleHref}>
          Next User
        </button>
      </div>
    </div>
  )
}`

function UserDetail({
    param,
    to,
    breadcrumbs,
}: SurlRouteProps<typeof userDetailSchema>) {
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
                <h4>Type-Safe Navigation with to()</h4>
                <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '0.5rem' }}>
                    Navigate through the tree using relative paths with :param style
                </p>
                <div className='button-group'>
                    <button type='button' data-href={to('../')} onClick={handleHref}>
                        ← Back (../)
                    </button>
                    <button type='button' data-href={to('../:id', { id: prevUser })} onClick={handleHref}>
                        ← Prev ({prevUser})
                    </button>
                    <button type='button' data-href={to('../:id', { id: nextUser })} onClick={handleHref}>
                        Next ({nextUser}) →
                    </button>
                </div>
                <p style={{ fontSize: '0.9em', color: '#666', marginTop: '1rem', marginBottom: '0.5rem' }}>
                    Navigate to sibling route (../settings)
                </p>
                <div className='button-group'>
                    <button type='button' data-href={to('../settings')} onClick={handleHref}>
                        User Settings (../settings)
                    </button>
                </div>
            </div>

            <CodeExample code={code} language='tsx' highlightLines={[20, 24, 28]} />
        </div>
    )
}

export default UserDetail
