/**
 * Nested Layout Demo - Multiple layouts with route prefixes
 */

import CodeExample from './CodeExample'

export default function NestedLayoutDemo() {
    return (
        <section>
            <h2>Nested Layouts with Prefixes</h2>
            <p>Organize routes with nested layouts and automatic path prefixing.</p>

            <div className='settings-grid'>
                <div className='setting-item'>
                    <h3>Route Structure</h3>
                    <p>
                        Current route structure demonstrates three levels of nesting:
                    </p>
                    <ul>
                        <li>Root Layout - Header, navigation, footer</li>
                        <li>Section Layout - Optional grouping with prefix</li>
                        <li>Page Component - Actual content</li>
                    </ul>
                </div>

                <div className='setting-item'>
                    <h3>Path Composition</h3>
                    <p>Routes automatically compose paths from parent prefixes:</p>
                    <ul>
                        <li><code>/admin</code> → Admin Layout</li>
                        <li><code>/admin/users</code> → Users page</li>
                        <li><code>/admin/settings</code> → Settings page</li>
                    </ul>
                </div>
            </div>

            <div className='info-box'>
                <h4>Key Features:</h4>
                <ul>
                    <li>Automatic prefixing - Child routes inherit parent paths</li>
                    <li>Layout persistence - Parent layouts stay mounted</li>
                    <li>Nested outlets - Each layout renders child content</li>
                    <li>Clean organization - Group related routes logically</li>
                </ul>
            </div>

            <CodeExample
                code={`const routes = [
  {
    // Root layout - wraps everything
    outlet: [
      // Top-level pages
      { path: 'home', render: Home },
      { path: 'about', render: About },
      
      // Admin section with prefix
      {
        path: 'admin',
        outlet: [
          { path: 'users', render: AdminUsers },
          { path: 'settings', render: AdminSettings },
          { path: 'analytics', render: AdminAnalytics }
        ],
        render: AdminLayout
      },
      
      // Dashboard section with prefix
      {
        path: 'dashboard',
        outlet: [
          { path: 'overview', render: DashOverview },
          { path: 'reports', render: DashReports }
        ],
        render: DashboardLayout
      }
    ],
    render: RootLayout
  }
]

// AdminLayout.tsx
function AdminLayout() {
  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <a href="/admin/users">Users</a>
        <a href="/admin/settings">Settings</a>
        <a href="/admin/analytics">Analytics</a>
      </nav>
      <Outlet /> {/* Child routes render here */}
    </div>
  )
}

// Result:
// /home           → RootLayout > Home
// /about          → RootLayout > About
// /admin/users    → RootLayout > AdminLayout > AdminUsers
// /admin/settings → RootLayout > AdminLayout > AdminSettings`}
                language='tsx'
            />

            <div className='info-box'>
                <h4>Benefits:</h4>
                <ul>
                    <li>DRY paths - No need to repeat "/admin" in every child route</li>
                    <li>Shared layouts - Common navigation, headers, etc.</li>
                    <li>Performance - Parent layouts don't remount</li>
                    <li>Modularity - Easy to reorganize route structure</li>
                </ul>
            </div>

            <CodeExample
                code={`// Three levels of nesting
const routes = [
  {
    outlet: [
      {
        path: 'app',
        outlet: [
          {
            path: 'dashboard',
            outlet: [
              { path: 'home', render: DashHome },
              { path: 'stats', render: DashStats }
            ],
            render: DashboardLayout
          }
        ],
        render: AppLayout
      }
    ],
    render: RootLayout
  }
]

// Path composition:
// /app/dashboard/home  → Root > App > Dashboard > DashHome
// /app/dashboard/stats → Root > App > Dashboard > DashStats

// Each layout stays mounted as you navigate between children!`}
                language='tsx'
            />

            <div className='info-box'>
                <h4>Use Cases:</h4>
                <ul>
                    <li>Admin panels - Separate admin section with own navigation</li>
                    <li>Multi-tenant apps - /tenant/:id/dashboard, /tenant/:id/settings</li>
                    <li>Feature sections - Group related pages (blog, shop, docs)</li>
                    <li>Role-based areas - Different layouts for user/admin/guest</li>
                </ul>
            </div>
        </section>
    )
}

