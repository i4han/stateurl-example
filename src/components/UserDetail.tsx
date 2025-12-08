import { param } from 'stateurl'

const users = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    { id: '3', name: 'Carol Williams', email: 'carol@example.com', role: 'Manager' },
]

export default function UserDetail() {
    const userId = param.users?.profile?.value
    const user = users.find((u) => u.id === userId)

    if (!user) {
        return <div className='placeholder'><p>User not found</p></div>
    }

    return (
        <div className='detail-card'>
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <div className='param-info'>
                <strong>URL Param:</strong> <code>userId = {userId}</code>
                <br />
                <strong>Full Path:</strong> <code>/users/profile/{userId}</code>
            </div>
        </div>
    )
}
