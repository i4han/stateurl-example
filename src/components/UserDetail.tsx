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

// Schema with trail for type-safe breadcrumbs
export const userDetailSchema = {
    trail: '/users/profile/:userId',
    schema: { param: { userId: 0 } }
} as const

function UserDetail({ param, to, breadcrumbs }: SurlRouteProps<typeof userDetailSchema>) {
  // breadcrumbs: ['users', \`profile/\${number}\`]
  // userId is already a number (schema auto-deserializes)
  const userId = param.userId
  const prevUser = (userId - 1 + 3) % 3
  const nextUser = (userId + 1) % 3

  return (
    <div className='button-group'>
      <button data-href={to(String(prevUser))} onClick={handleHref}>
        to(prevUser) → Prev
      </button>
      <button data-href={to(String(nextUser))} onClick={handleHref}>
        to(nextUser) → Next
      </button>
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
                <h4>Relative Navigation</h4>
                <div className='button-group'>
                    <button type='button' data-href={to(String(prevUser))} onClick={handleHref}>
                        to(prevUser) → Prev
                    </button>
                    <button type='button' data-href={to(String(nextUser))} onClick={handleHref}>
                        to(nextUser) → Next
                    </button>
                </div>
            </div>

            <CodeExample code={code} language='tsx' />
        </div>
    )
}

export default UserDetail
