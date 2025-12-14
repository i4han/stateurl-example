import type { RouteComponentProps } from 'stateurl'
import { path, useSignals, go, Outlet, toLabel } from 'stateurl'
import CodeExample from './CodeExample'

const mainCode = `
// Define a route with loader in routes.ts
{
    path: 'user/:userId',
    loader: async ({ param }) => {
        const response = await fetch(\`/api/users/\${param.userId}\`)
        return { user: await response.json() }
    },
    render: UserPage
}

// Access loader data in component
function UserPage({ data }: RouteComponentProps) {
    // data contains the loader result
    if (!data) return <Loading />
    return <div>{data.user.name}</div>
}`

export default function LoaderExample(_props: RouteComponentProps) {
    useSignals()
    const currentPath = path.full

    return (
        <section>
            <h2>Loader API</h2>
            <p>
                Loaders fetch data before rendering. Define a <code>loader</code> function
                on routes to prepare data for components.
            </p>

            <div className='current-location'>
                <strong>Current:</strong> <code>{currentPath}</code>
            </div>

            <div className='via-examples'>
                <LoaderNavigationSection />
                <Outlet />
                <LoaderBasicsSection />
            </div>

            <CodeExample code={mainCode} language='tsx' />
        </section>
    )
}

function LoaderBasicsSection() {
    useSignals()
    return (
        <div className='demo-section'>
            <h3>Loader Basics</h3>
            <p>
                The <code>loader</code> function receives context with <code>param</code>,{' '}
                <code>query</code>, and <code>input</code>. Its return value becomes{' '}
                <code>props.data</code>.
            </p>

            <CodeExample
                code={`// Route with loader
{
    path: 'user/:userId',
    loader: async ({ param, query, input }) => {
        // param.userId - URL params
        // query - URL query params
        // input - data from .go({ input })

        await new Promise(r => setTimeout(r, 500))
        return {
            user: {
                id: param.userId,
                name: \`User \${param.userId}\`,
                email: \`user\${param.userId}@example.com\`
            }
        }
    },
    render: UserPage
}`}
                language='tsx'
            />
        </div>
    )
}

function LoaderNavigationSection() {
    useSignals()
    return (
        <div className='demo-section'>
            <h3>Try It</h3>
            <p>
                Navigate to a user profile to see the loader in action.
                The loader simulates a 500ms API delay.
            </p>

            <div className='button-row'>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => go(toLabel('loaderUser', { userId: 1 }))}
                >
                    Load User 1
                </button>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => go(toLabel('loaderUser', { userId: 2 }))}
                >
                    Load User 2
                </button>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => go(toLabel('loaderUser', { userId: 3 }))}
                >
                    Load User 3
                </button>
            </div>

            <CodeExample
                code={`// Navigate to trigger loader (userId is an integer via schema)
go(toLabel('loaderUser', { userId: 1 }))
go(toLabel('loaderUser', { userId: 2 }))`}
                language='typescript'
            />
        </div>
    )
}

/**
 * LoaderUserPage - demonstrates receiving loader data with cross-fade transition
 */
export function LoaderUserPage({ data, param }: RouteComponentProps) {
    useSignals()

    const isLoading = !data

    // Render both skeleton and content, cross-fade with CSS
    return (
        <div className='demo-section' style={{
            position: 'relative',
            padding: '1.5rem',
            borderRadius: '8px',
            marginTop: '1rem',
            minHeight: '180px',
            background: '#dbeafe',
        }}>
            {/* Skeleton layer - fades out when data loads */}
            <div style={{
                position: isLoading ? 'relative' : 'absolute',
                inset: isLoading ? undefined : '1.5rem',
                opacity: isLoading ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
                pointerEvents: isLoading ? 'auto' : 'none',
            }}>
                <div style={{
                    height: '24px',
                    width: '180px',
                    background: '#bfdbfe',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    animation: isLoading ? 'shimmer 1.5s ease-in-out infinite' : 'none',
                }} />
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '0.5rem 1rem',
                    marginBottom: '1rem',
                }}>
                    <div style={{ height: '16px', width: '30px', background: '#bfdbfe', borderRadius: '4px', animation: isLoading ? 'shimmer 1.5s ease-in-out infinite 0.1s' : 'none' }} />
                    <div style={{ height: '16px', width: '60px', background: '#bfdbfe', borderRadius: '4px', animation: isLoading ? 'shimmer 1.5s ease-in-out infinite 0.1s' : 'none' }} />
                    <div style={{ height: '16px', width: '50px', background: '#bfdbfe', borderRadius: '4px', animation: isLoading ? 'shimmer 1.5s ease-in-out infinite 0.2s' : 'none' }} />
                    <div style={{ height: '16px', width: '100px', background: '#bfdbfe', borderRadius: '4px', animation: isLoading ? 'shimmer 1.5s ease-in-out infinite 0.2s' : 'none' }} />
                    <div style={{ height: '16px', width: '45px', background: '#bfdbfe', borderRadius: '4px', animation: isLoading ? 'shimmer 1.5s ease-in-out infinite 0.3s' : 'none' }} />
                    <div style={{ height: '16px', width: '160px', background: '#bfdbfe', borderRadius: '4px', animation: isLoading ? 'shimmer 1.5s ease-in-out infinite 0.3s' : 'none' }} />
                </div>
            </div>

            {/* Content layer - fades in when data loads */}
            <div style={{
                position: isLoading ? 'absolute' : 'relative',
                inset: isLoading ? '1.5rem' : undefined,
                opacity: isLoading ? 0 : 1,
                transition: 'opacity 0.3s ease-out',
                pointerEvents: isLoading ? 'none' : 'auto',
            }}>
                {data && (
                    <>
                        <h3 style={{ color: '#1e40af', margin: '0 0 1rem' }}>User Profile (from loader)</h3>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'auto 1fr',
                            gap: '0.5rem 1rem',
                            marginBottom: '1rem'
                        }}>
                            <strong style={{ color: '#1e40af' }}>ID:</strong>
                            <code style={{ background: '#bfdbfe', padding: '2px 8px', borderRadius: '4px' }}>{data.user.id}</code>

                            <strong style={{ color: '#1e40af' }}>Name:</strong>
                            <code style={{ background: '#bfdbfe', padding: '2px 8px', borderRadius: '4px' }}>{data.user.name}</code>

                            <strong style={{ color: '#1e40af' }}>Email:</strong>
                            <code style={{ background: '#bfdbfe', padding: '2px 8px', borderRadius: '4px' }}>{data.user.email}</code>
                        </div>

                        <div className='button-row'>
                            <button
                                type='button'
                                className='btn'
                                style={{ background: '#3b82f6', color: 'white' }}
                                onClick={() => go(toLabel('loaderDemo'))}
                            >
                                Back to Loader Demo
                            </button>
                        </div>
                    </>
                )}
            </div>

            <style>{`
                @keyframes shimmer {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    )
}
