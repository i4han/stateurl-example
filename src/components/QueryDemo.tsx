import { useSignals, path } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'
import CodeExample from './CodeExample'

const code = `import type { RouteComponentProps } from 'stateurl'

function QueryDemo({ query }: RouteComponentProps) {
    // Just assign - auto-registers and updates URL!
    // No manual registration needed

    return (
        <div>
            <select
                value={query.sort || 'name'}
                onChange={(e) => (query.sort = e.target.value)}
            >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="date">Sort by Date</option>
            </select>

            <select
                value={query.filter || 'all'}
                onChange={(e) => (query.filter = e.target.value)}
            >
                <option value="all">All Items</option>
                <option value="active">Active Only</option>
                <option value="archived">Archived</option>
            </select>

            <input
                type="text"
                value={query.search || ''}
                onChange={(e) => (query.search = e.target.value)}
                placeholder="Search..."
            />
        </div>
    )
}`

export default function QueryDemo({ query }: RouteComponentProps) {
    useSignals()

    return (
        <section>
            <h2>Query Auto-Registration</h2>
            <p>
                Just assign to <code>query.*</code> and the URL updates automatically.
                No manual registration needed!
            </p>

            <div className='current-location'>
                <strong>URL:</strong> <code>{window.location.pathname}{window.location.search}</code>
            </div>

            <div className='demo-section'>
                <h3>Try It</h3>
                <p>Change any value and watch the URL update:</p>

                <div className='query-controls'>
                    <div className='control-group'>
                        <label htmlFor='sort'>Sort</label>
                        <select
                            id='sort'
                            value={query.sort || 'name'}
                            onChange={(e) => (query.sort = e.target.value)}
                        >
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                            <option value="date">Date</option>
                        </select>
                    </div>

                    <div className='control-group'>
                        <label htmlFor='filter'>Filter</label>
                        <select
                            id='filter'
                            value={query.filter || 'all'}
                            onChange={(e) => (query.filter = e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="active">Active</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>

                    <div className='control-group'>
                        <label htmlFor='search'>Search</label>
                        <input
                            id='search'
                            type="text"
                            value={query.search || ''}
                            onChange={(e) => (query.search = e.target.value)}
                            placeholder="Type to search..."
                        />
                    </div>
                </div>

                <div className='query-state'>
                    <h4>Current Query State</h4>
                    <div className='state-values'>
                        <span><strong>sort:</strong> {query.sort || <em>(not set)</em>}</span>
                        <span><strong>filter:</strong> {query.filter || <em>(not set)</em>}</span>
                        <span><strong>search:</strong> {query.search || <em>(not set)</em>}</span>
                    </div>
                </div>
            </div>

            <div className='demo-section'>
                <h3>How It Works</h3>
                <ul className='feature-list'>
                    <li><strong>Auto-registration:</strong> First assignment creates the query parameter</li>
                    <li><strong>URL sync:</strong> Values appear in the query string immediately</li>
                    <li><strong>Shareable:</strong> Copy the URL to share exact state</li>
                    <li><strong>No boilerplate:</strong> No useState, no useEffect, no manual parsing</li>
                </ul>
            </div>

            <CodeExample code={code} language="tsx" />

            <style>{`
                .query-controls {
                    display: flex;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                    margin: 1rem 0 1.5rem;
                }

                .control-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .control-group label {
                    font-weight: 500;
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                }

                .control-group select,
                .control-group input {
                    padding: 0.5rem 0.75rem;
                    border: 1px solid var(--border-color, #e0e0e0);
                    border-radius: 6px;
                    font-size: 0.9rem;
                    min-width: 150px;
                    background: var(--bg-input, #fff);
                    color: var(--text-primary);
                }

                .control-group select:focus,
                .control-group input:focus {
                    outline: none;
                    border-color: var(--primary-color, #3b82f6);
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
                }

                .query-state {
                    padding: 1rem;
                    border-radius: 8px;
                    border: 1px solid var(--border-color, #e0e0e0);
                    background: var(--bg-tertiary, #fafafa);
                }

                .query-state h4 {
                    margin: 0 0 0.75rem 0;
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                }

                .state-values {
                    display: flex;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                    font-family: var(--font-mono, monospace);
                    font-size: 0.875rem;
                }

                .state-values em {
                    color: var(--text-muted, #999);
                    font-style: italic;
                }

                .feature-list {
                    margin: 1rem 0;
                    padding-left: 1.5rem;
                }

                .feature-list li {
                    margin-bottom: 0.75rem;
                    line-height: 1.5;
                }
            `}</style>
        </section>
    )
}
