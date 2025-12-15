/**
 * LoaderUserPage - demonstrates receiving loader data with cross-fade transition
 *
 * path: 'user/:userId' → LoaderUserPage component, LoaderUserRoute
 */

import type { SurlRouteProps } from 'stateurl'
import { defineRoute, useSignals, go, toLabel } from 'stateurl'

const loaderUserConfig = {
    path: 'user/:userId',
    schema: { param: { userId: 0 } },
    trail: '/loader-demo',
    label: 'loaderUser',
    loader: async ({ param }: { param: { userId: number } }) => {
        await new Promise((r) => setTimeout(r, 500))
        return {
            user: {
                id: param.userId,
                name: `User ${param.userId}`,
                email: `user${param.userId}@example.com`,
            },
        }
    },
} as const

export const LoaderUserRoute = defineRoute(LoaderUserPage, loaderUserConfig)

export default function LoaderUserPage({ data }: SurlRouteProps<typeof loaderUserConfig>) {
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
