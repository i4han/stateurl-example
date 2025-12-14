import { handleHref, Outlet, useSignals } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'
import CodeExample from './CodeExample'

const users = [
    { id: 0, name: 'Alice Johnson' },
    { id: 1, name: 'Bob Smith' },
    { id: 2, name: 'Carol Williams' },
]

export default function Users({ to, param }: RouteComponentProps) {
    useSignals()
    return (
        <section>
            <h2>Users (Params Demo)</h2>
            <p>
                Click a user to see their profile. Uses relative{' '}
                <code>to('profile/$1', [id])</code> for navigation.
            </p>

            <div className='users-container'>
                <div className='users-list'>
                    <h3>User List</h3>
                    <ul className='user-items'>
                        {users.map((user) => (
                            <li key={user.id}>
                                <a
                                    href={to('profile/$1', [user.id])}
                                    onClick={handleHref}
                                    className={
                                        param.userId === user.id ? 'active' : ''
                                    }
                                >
                                    {user.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='user-detail-container'>
                    <Outlet />
                </div>
            </div>

            <CodeExample
                code={`import { Outlet, handleHref } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'

export default function Users({ to, param }: RouteComponentProps) {
  return (
    <div>
      {users.map((user) => (
        <a
          // Use relative to() - 'profile/$1' from /users
          href={to('profile/$1', [user.id])}
          onClick={handleHref}
          className={param.userId === user.id ? 'active' : ''}
        >
          {user.name}
        </a>
      ))}

      {/* Outlet renders nested route */}
      <Outlet />
    </div>
  )
}`}
                language='tsx'
            />
        </section>
    )
}
