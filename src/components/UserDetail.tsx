import { handleHref, useSignals } from 'stateurl'
import type { TypedProps } from '../stateurl-types'
import CodeExample from './CodeExample'

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
import { handleHref } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'

// Route: { path: 'profile/:userId', schema: { param: { userId: 0 } } }

export default function UserDetail({ param, via, to }: RouteComponentProps) {
  // userId is already a number (schema auto-deserializes)
  const userId = param.userId
  const nextUser = (userId + 1) % 3

  return (
        <div className='button-group'>
            <button data-href={to(prevUser)} onClick={handleHref}>
                to(prevUser)
            </button>
            <button
                data-href={via('profile:$1', [nextUser])}
                onClick={handleHref}
            >
                via('profile:$1', [{nextUser}]) → Next User
            </button>
        </div>
  )
}`

function UserDetail({
    param,
    via,
    to,
    breadcrumbs,
}: TypedProps<'UserDetail'>) {
    useSignals()
    // Access param directly from props (already a number via schema)
    const userId = param.userId
    const user = users[userId]

    // Navigate to other users using relative via
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
                        to(prevUser)
                    </button>
                    <button
                        type='button'
                        data-href={via('profile:$1', [nextUser])}
                        onClick={handleHref}
                    >
                        via('profile:$1', [{nextUser}]) → Next User
                    </button>
                </div>
            </div>

            <CodeExample code={code} language='tsx' />
        </div>
    )
}

export default UserDetail
