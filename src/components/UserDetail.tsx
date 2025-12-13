import { go, handleGo, useSignals } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'
import CodeExample from './CodeExample'

const users = [
    {
        id: '0',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'Admin',
    },
    { id: '1', name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    {
        id: '2',
        name: 'Carol Williams',
        email: 'carol@example.com',
        role: 'Manager',
    },
]

const code = `
import { handleGo, handleHref } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'

export default function UserDetail({ param, via, to }: RouteComponentProps) {
  const userId = param.userId
  const nextUser = (Number(userId) + 1) % 3

  return (
        <div className='button-group'>
            <button type='button' onClick={handleGo(to(prevUser))}>
                to(prevUser)
            </button>
            <button
                type='button'
                onClick={handleGo(via('profile:$1', [nextUser]))}
            >
                via('profile:$1', [{nextUser}]) → Next User
            </button>
        </div>

  )
}`

export default function UserDetail({
    param,
    via,
    to,
    breadcrumbs,
}: RouteComponentProps) {
    useSignals()
    // Access param directly from props
    const userId = param.userId
    const user = users[Number(userId)]

    // Navigate to other users using relative via
    const prevUser = String((Number(userId) - 1 + users.length) % users.length)

    const nextUser = String((Number(userId) + 1) % users.length)

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
                    <button type='button' onClick={handleGo(to(prevUser))}>
                        to(prevUser)
                    </button>
                    <button
                        type='button'
                        onClick={handleGo(via('profile:$1', [nextUser]))}
                    >
                        via('profile:$1', [{nextUser}]) → Next User
                    </button>
                </div>
            </div>

            <CodeExample code={code} language='tsx' />
        </div>
    )
}
