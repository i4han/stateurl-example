import CodeExample from './CodeExample'

export default function About() {
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
                    <p>
                        Full TypeScript support with type-safe routing and
                        parameters
                    </p>
                </div>
                <div className='feature-card'>
                    <h3>Nested Routes</h3>
                    <p>Powerful nested routing with layouts and child routes</p>
                </div>
                <div className='feature-card'>
                    <h3>URL State</h3>
                    <p>
                        Manage application state directly in the URL parameters
                    </p>
                </div>
                <div className='feature-card'>
                    <h3>Feature Flags</h3>
                    <p>Built-in feature flags using URL patterns</p>
                </div>
                <div className='feature-card'>
                    <h3>Lightweight</h3>
                    <p>Minimal bundle size with maximum performance</p>
                </div>
                <div className='feature-card'>
                    <h3>Testable</h3>
                    <p>Comprehensive testing support with Playwright</p>
                </div>
            </div>

            <CodeExample
                code={`import { useNavigator, pathname } from 'stateurl'

export default function Navigation() {
  const { handleHref, to } = useNavigator()
  const currentPath = pathname.value
  
  // Check if route is active
  const isActive = (path: string) => currentPath.includes(path)
  
  return (
    <nav>
      <a 
        href={to('/home')} 
        onClick={handleHref}
        className={isActive('/home') ? 'active' : ''}
      >
        Home
      </a>
      <a 
        href={to('/products')} 
        onClick={handleHref}
        className={isActive('/products') ? 'active' : ''}
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
