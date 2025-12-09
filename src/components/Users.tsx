import { Outlet, useNavigator, param } from 'stateurl'
import CodeExample from './CodeExample'

const users = [
    { id: '1', name: 'Alice Johnson' },
    { id: '2', name: 'Bob Smith' },
    { id: '3', name: 'Carol Williams' },
]

export default function Users() {
    const { handleHref, to } = useNavigator()
    const userId = param.users?.profile?.value

    return (
        <section>
            <h2>Users (Params Demo)</h2>
            <p>
                Click a user to see their profile. Notice the URL changes to{' '}
                <code>/users/profile/42</code>
            </p>

            <div className='users-container'>
                <div className='users-list'>
                    <h3>User List</h3>
                    <ul className='user-items'>
                        {users.map((user) => (
                            <li key={user.id}>
                                <a
                                    href={to(`/users/profile/${user.id}`)}
                                    onClick={handleHref}
                                    className={
                                        userId === user.id ? 'active' : ''
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
                code={`import { useNavigator, param } from 'stateurl'

export default function Users() {
  const { handleHref, to } = useNavigator()
  
  // Access route param (signal)
  const userId = param.users?.profile?.value
  
  return (
    <div>
      {users.map((user) => (
        <a 
          href={to(\`/users/profile/\${user.id}\`)}
          onClick={handleHref}
          className={userId === user.id ? 'active' : ''}
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
