import { feature } from 'stateurl'
import CodeExample from './CodeExample'

export default function Settings() {
    const version = feature.version.value
    const theme = feature.theme.value

    return (
        <section>
            <h2>Settings</h2>
            <p>Control app features using <strong>feature flags</strong> in the URL pattern.</p>

            <div className='settings-grid'>
                <div className='setting-item'>
                    <h3>Version</h3>
                    <p>Current version: <strong>v{version}</strong></p>
                    <div className='button-group'>
                        <button
                            onClick={() => { feature.version.set('1') }}
                            className={version === '1' ? 'btn-active' : 'btn'}
                        >
                            Version 1
                        </button>
                        <button
                            onClick={() => { feature.version.set('2') }}
                            className={version === '2' ? 'btn-active' : 'btn'}
                        >
                            Version 2
                        </button>
                    </div>
                </div>

                <div className='setting-item'>
                    <h3>Theme</h3>
                    <p>Current theme: <strong>{theme === 'light' ? '☀️ Light' : '🌙 Dark'}</strong></p>
                    <div className='button-group'>
                        <button
                            onClick={() => { feature.theme.set('light') }}
                            className={theme === 'light' ? 'btn-active' : 'btn'}
                        >
                            ☀️ Light Mode
                        </button>
                        <button
                            onClick={() => { feature.theme.set('dark') }}
                            className={theme === 'dark' ? 'btn-active' : 'btn'}
                        >
                            🌙 Dark Mode
                        </button>
                    </div>
                </div>
            </div>

            <div className='info-box'>
                <h4>💡 About Features:</h4>
                <ul>
                    <li>Features are part of the base URL pattern: <code>/app/:version/:theme</code></li>
                    <li>Changing features updates the entire URL instantly</li>
                    <li>Features persist across navigation</li>
                    <li>The theme feature changes the entire app appearance!</li>
                    <li>Try changing theme and watch the URL update</li>
                </ul>
            </div>

            <CodeExample code={`// In App.tsx:
<Router
  routes={routes}
  basePattern='/app/:version=v1/:theme=light'
  RenderNotFound={NotFound}
/>

// Access in components:
const theme = feature.theme.value

// Update feature (use .set() method!)
feature.theme.set('dark')

// Apply theme:
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme)
}, [theme])`} language="tsx" />
        </section>
    )
}
