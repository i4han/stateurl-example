import { defineRoute, useSignals, type SurlRouteProps } from 'stateurl'
import CodeExample from './CodeExample'

const aboutConfig = {
    path: 'about',
    trail: '/',
} as const

export const AboutRoute = defineRoute(About, aboutConfig)

export default function About(_props: SurlRouteProps<typeof aboutConfig>) {
    useSignals()
    return (
        <section>
            <h2>About StateURL</h2>
            <p>
                <strong>stateurl</strong> is a modern, type-safe router for
                React applications.
            </p>

            <div className='feature-grid' style={{ marginTop: '2rem' }}>
                <div className='feature-card'>
                    <h3>Type-Safe</h3>
                    <p>Full TypeScript support with type-safe routing and parameters</p>
                </div>
                <div className='feature-card'>
                    <h3>Nested Routes</h3>
                    <p>Powerful nested routing with layouts and child routes</p>
                </div>
                <div className='feature-card'>
                    <h3>Index Cascade</h3>
                    <p>/app → /app/home → /app/home/dashboard automatically</p>
                </div>
                <div className='feature-card'>
                    <h3>URL State</h3>
                    <p>Manage application state directly in URL parameters</p>
                </div>
                <div className='feature-card'>
                    <h3>Schema Types</h3>
                    <p>Auto serialize/deserialize: param.count + 1 just works</p>
                </div>
                <div className='feature-card'>
                    <h3>Loader API</h3>
                    <p>Data fetching with automatic loading states</p>
                </div>
                <div className='feature-card'>
                    <h3>Guards</h3>
                    <p>Route protection with async authentication checks</p>
                </div>
                <div className='feature-card'>
                    <h3>Transitions</h3>
                    <p>Smooth page transitions with loading indicators</p>
                </div>
                <div className='feature-card'>
                    <h3>Fork Routes</h3>
                    <p>Parallel route rendering for sidebars and panels</p>
                </div>
                <div className='feature-card'>
                    <h3>Error Boundary</h3>
                    <p>Automatic error recovery with URL rollback</p>
                </div>
                <div className='feature-card'>
                    <h3>Fallback Route</h3>
                    <p>Custom 404 pages for unmatched routes</p>
                </div>
                <div className='feature-card'>
                    <h3>Feature Flags</h3>
                    <p>Built-in feature flags using URL patterns</p>
                </div>
                <div className='feature-card'>
                    <h3>Signal-Based</h3>
                    <p>Fine-grained reactivity without re-rendering entire trees</p>
                </div>
                <div className='feature-card'>
                    <h3>Testable</h3>
                    <p>Comprehensive testing support with Playwright</p>
                </div>
            </div>

            <CodeExample
                code={`import { handleHref } from 'stateurl'
import { cx } from 'stateurl/utils'
import type { RouteComponentProps } from 'stateurl'

// Route components receive props automatically
export default function Navigation({ to, ahead }: RouteComponentProps) {
  // ahead[0] is the current route segment
  const [active] = ahead

  return (
    <nav>
      <a
        href={to('/home')}
        onClick={handleHref}
        className={cx(active === 'home' && 'active')}
      >
        Home
      </a>
      <a
        href={to('/products')}
        onClick={handleHref}
        className={cx(active === 'products' && 'active')}
      >
        Products
      </a>
    </nav>
  )
}`}
                language='tsx'
            />

            <div className='info-box' style={{ marginTop: '2.5rem' }}>
                <h4>Learn More</h4>
                <ul>
                    <li>
                        Explore the <strong>Counter</strong> page to see query
                        state management
                    </li>
                    <li>
                        Check out <strong>Products</strong> and{' '}
                        <strong>Users</strong> for params examples
                    </li>
                    <li>
                        Visit <strong>Settings</strong> to play with feature
                        flags
                    </li>
                    <li>
                        View the code examples on each page to understand the
                        implementation
                    </li>
                </ul>
            </div>
        </section>
    )
}
