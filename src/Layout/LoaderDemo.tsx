import { defineRoute, path, useSignals, go, Outlet, toLabel } from 'stateurl'
import CodeExample from './CodeExample'
import { LoaderUserRoute } from './LoaderDemo/LoaderUserPage'

const loaderDemoConfig = {
    path: 'loader-demo',
    trail: '/',
    outlet: [LoaderUserRoute],
} as const

export const LoaderDemoRoute = defineRoute(LoaderExample, loaderDemoConfig)

const mainCode = `
import { type SurlRouteProps } from 'stateurl'

// Schema with trail for type-safe breadcrumbs
export const loaderUserSchema = {
    trail: '/loader-demo/user/:userId',
    schema: { param: { userId: 0 } }
} as const

// Route with loader in routes.ts:
// { path: 'user/:userId', ...loaderUserSchema, loader: async ({ param }) => {...} }

// Access loader data in component
function UserPage({ data, param, breadcrumbs }: SurlRouteProps<typeof loaderUserSchema>) {
  // breadcrumbs: ['loader-demo', 'user'] (static segments only, params in param prop)
    // data contains the loader result, param.userId is typed as number
    if (!data) return <Loading />
    return <div>{data.user.name}</div>
}`

export default function LoaderExample() {
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
