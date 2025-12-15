import { handleHref, Outlet, useSignals, type SurlRouteProps } from 'stateurl'
import CodeExample from './CodeExample'

// Schema with trail for type-safe to() autocomplete
export const usersSchema = {
    trail: '/users',
    schema: {}
} as const

const users = [
    { id: 0, name: 'Alice Johnson' },
    { id: 1, name: 'Bob Smith' },
    { id: 2, name: 'Carol Williams' },
]

export default function Users({ to, param }: SurlRouteProps<typeof usersSchema>) {
    useSignals()
    return (
        <section>
            <h2>Users (Type-Safe to() Demo)</h2>
            <p>
                Click a user to see their profile. The <code>to()</code> function
                autocompletes <code>'profile/:userId'</code> from the route tree.
            </p>

            <div className='users-container'>
                <div className='users-list'>
                    <h3>User List</h3>
                    <ul className='user-items'>
                        {users.map((user) => (
                            <li key={user.id}>
                                <a
                                    // to() autocompletes 'profile/:userId' based on trail
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
                code={`import { Outlet, handleHref, type SurlRouteProps } from 'stateurl'

// Schema with trail enables type-safe to() autocomplete
export const usersSchema = {
    trail: '/users',
    schema: {}
} as const

// to() autocompletes 'profile/:userId' from SurlTo registry
export default function Users({ to, param }: SurlRouteProps<typeof usersSchema>) {
  return (
    <div>
      {users.map((user) => (
        <a
          // Type-safe: to() suggests 'profile/:userId'
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
