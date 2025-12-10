import { useNavigator } from 'stateurl'
import CodeExample from './CodeExample'

const users = [
    {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'Admin',
    },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    {
        id: '3',
        name: 'Carol Williams',
        email: 'carol@example.com',
        role: 'Manager',
    },
]

export default function UserDetail() {
    const { route } = useNavigator()
    const userId = route.param.userId
    const user = users[Number(userId) - 1]

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
                <strong>Full Path:</strong> <code>/users/profile/{userId}</code>
            </div>

            <CodeExample
                code={`import { useNavigator } from 'stateurl'

export default function UserDetail() {
  const { route } = useNavigator()
  
  // Access route param (Proxy API)
  const userId = route.param.userId
  
  // Use it to fetch/display data
  const user = users.find(u => u.id === userId)
  
  return (
    <div>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  )
}`}
                language='tsx'
            />
        </div>
    )
}
