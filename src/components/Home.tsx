import { feature, pathname } from 'stateurl'

export default function Home() {
    const version = feature.version.value
    const theme = feature.theme.value

    return (
        <section>
            <h2>Welcome to StateURL Example</h2>
            <p>This demo showcases all major features of the <code>stateurl</code> router.</p>

            <div className='feature-grid'>
                <div className='feature-card'>
                    <h3>✨ Features</h3>
                    <p>URL pattern-based feature flags</p>
                    <code>/app/:version/:theme</code>
                    <p className='current'>Current: v{version} ({theme})</p>
                </div>

                <div className='feature-card'>
                    <h3>📍 Params</h3>
                    <p>Dynamic route parameters</p>
                    <code>/products/:productId</code>
                    <p className='current'>See Products & Users pages</p>
                </div>

                <div className='feature-card'>
                    <h3>🔍 Query</h3>
                    <p>URL state management</p>
                    <code>?count=5</code>
                    <p className='current'>See Counter page</p>
                </div>

                <div className='feature-card'>
                    <h3>🧭 Navigation</h3>
                    <p>Layout with top & side nav</p>
                    <code>handleHref</code>
                    <p className='current'>Click menu items above</p>
                </div>
            </div>

            <div className='info-box'>
                <h4>🎯 Current State:</h4>
                <ul>
                    <li><strong>Path:</strong> <code>{pathname.value}</code></li>
                    <li><strong>Version:</strong> v{version}</li>
                    <li><strong>Theme:</strong> {theme === 'light' ? '☀️ Light' : '🌙 Dark'}</li>
                </ul>
            </div>

            <div className='quick-links'>
                <h3>Quick Start:</h3>
                <ol>
                    <li>Toggle <strong>Theme</strong> in top menu to see dark mode! 🌙</li>
                    <li>Try the <strong>Counter</strong> page to see query state</li>
                    <li>Browse <strong>Products</strong> to see params in action</li>
                    <li>Change <strong>Settings</strong> to toggle features</li>
                    <li>Watch the URL change with every interaction!</li>
                </ol>
            </div>
        </section>
    )
}
