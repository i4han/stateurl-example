/**
 * TypeSafetyDemo - Type-safe routing demonstration with tabbed navigation
 *
 * path: 'type-safety' → TypeSafetyDemo component, TypeSafetyDemoRoute
 */
import { useEffect } from 'react'
import {
    defineRoute,
    useSignals,
    path,
    handleHref,
    go,
    Outlet,
    type SurlRouteProps,
} from 'stateurl'

// Import child route components
import { TypeSafetySetupRoute } from './TypeSafetyDemo/TypeSafetySetup'
import { TypeSafetyPropsRoute } from './TypeSafetyDemo/TypeSafetyProps'
import { TypeSafetyAtRoute } from './TypeSafetyDemo/TypeSafetyAt'
import { TypeSafetyToRoute } from './TypeSafetyDemo/TypeSafetyTo'
import { TypeSafetyLabelRoute } from './TypeSafetyDemo/TypeSafetyLabel'

const typeSafetyDemoConfig = {
    path: 'type-safety',
    trail: '/',
    outlet: [
        TypeSafetySetupRoute,
        TypeSafetyPropsRoute,
        TypeSafetyAtRoute,
        TypeSafetyToRoute,
        TypeSafetyLabelRoute,
    ],
} as const

export const TypeSafetyDemoRoute = defineRoute(
    TypeSafetyDemo,
    typeSafetyDemoConfig,
)

export default function TypeSafetyDemo(
    props: SurlRouteProps<typeof typeSafetyDemoConfig>,
) {
    useSignals()

    // Redirect to setup tab if no child route selected
    useEffect(() => {
        if (props.ahead.length === 0) {
            go(props.to('setup'))
        }
    }, [props.ahead.length])

    // Determine active tab from ahead path (first segment after /type-safety/)
    const activeTab = props.ahead[0] || 'setup'

    return (
        <section className='type-safety-demo'>
            <h2>Type-Safe Routing</h2>
            <p>
                StateURL provides{' '}
                <strong>full TypeScript autocomplete</strong> for routes,
                params, and queries. Define your types once, get IDE support
                everywhere.
            </p>

            <div className='current-location'>
                <strong>Current:</strong> <code>{path.full}</code>
            </div>

            {/* Feature tabs - Chrome style */}
            <div className='chrome-tabs'>
                <a
                    href={props.to('setup')}
                    onClick={handleHref}
                    className={activeTab === 'setup' ? 'active' : ''}
                >
                    Setup
                </a>
                <a
                    href={props.to('props')}
                    onClick={handleHref}
                    className={activeTab === 'props' ? 'active' : ''}
                >
                    RouteProps
                </a>
                <a
                    href={props.to('at')}
                    onClick={handleHref}
                    className={activeTab === 'at' ? 'active' : ''}
                >
                    at.*
                </a>
                <a
                    href={props.to('to')}
                    onClick={handleHref}
                    className={activeTab === 'to' ? 'active' : ''}
                >
                    to()
                </a>
                <a
                    href={props.to('label')}
                    onClick={handleHref}
                    className={activeTab === 'label' ? 'active' : ''}
                >
                    label.*
                </a>
            </div>

            {/* Render active tab content via Outlet */}
            <Outlet />

            <style>{`
                .type-safety-demo {
                    max-width: 900px;
                }

                .chrome-tabs {
                    display: flex;
                    gap: 0;
                    margin: 1.5rem 0 0;
                    padding: 4px 4px 0;
                    background: var(--border-default);
                    border-radius: 10px 10px 0 0;
                    overflow-x: auto;
                }

                .chrome-tabs a {
                    flex: 1;
                    min-width: 100px;
                    padding: 10px 16px 11px;
                    margin-bottom: -1px;
                    background: transparent;
                    cursor: pointer;
                    font-size: 15px;
                    color: var(--text-secondary);
                    transition: background 0.15s, color 0.15s;
                    white-space: nowrap;
                    text-decoration: none;
                    text-align: center;
                    position: relative;
                    border-radius: 8px 8px 0 0;
                }

                .chrome-tabs a:not(:last-child)::after {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    height: 16px;
                    width: 1px;
                    background: var(--text-secondary);
                    opacity: 0.3;
                }

                .chrome-tabs a:hover {
                    background: rgba(255,255,255,0.5);
                    color: var(--text-primary);
                }

                .chrome-tabs a.active,
                .chrome-tabs a.active:hover {
                    background: var(--bg-surface);
                    color: var(--text-primary);
                    font-weight: 500;
                }

                .chrome-tabs a.active::after,
                .chrome-tabs a:has(+ a.active)::after {
                    display: none;
                }

                .type-safety-demo .demo-section {
                    background: var(--bg-surface);
                    padding: 1.5rem;
                    border-radius: 0 0 10px 10px;
                    margin-top: 0;
                    border: 3px solid var(--border-default);
                    border-top: 1px solid transparent;
                }

                .type-badge {
                    display: inline-block;
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    margin-left: 0.5rem;
                    vertical-align: middle;
                }

                .feature-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin: 1.5rem 0;
                }

                .feature-card {
                    padding: 1rem;
                    background: var(--bg-muted);
                    border-radius: 8px;
                    border: 1px solid var(--border-default);
                }

                .feature-card h4 {
                    margin: 0 0 0.5rem;
                    color: var(--primary-color, #3b82f6);
                }

                .feature-card p {
                    margin: 0 0 0.75rem;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                }

                .feature-card code {
                    display: block;
                    padding: 0.5rem;
                    background: var(--bg-surface);
                    border-radius: 4px;
                    font-size: 0.85rem;
                }

                .autocomplete-demo {
                    background: var(--bg-muted);
                    padding: 1.5rem;
                    border-radius: 8px;
                    margin: 1rem 0;
                }

                .autocomplete-demo h4 {
                    margin: 0 0 1rem;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                }

                .autocomplete-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .autocomplete-visual {
                    flex: 1;
                    max-width: 350px;
                }

                .autocomplete-input {
                    background: #1e1e1e;
                    color: #d4d4d4;
                    padding: 0.5rem 0.75rem;
                    border-radius: 4px 4px 0 0;
                    font-family: var(--font-mono, monospace);
                    font-size: 0.9rem;
                    border: 1px solid #3c3c3c;
                    border-bottom: none;
                }

                .autocomplete-input .prefix {
                    color: #9cdcfe;
                }

                .autocomplete-input .cursor {
                    color: #aeafad;
                    animation: blink 1s infinite;
                }

                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }

                .autocomplete-dropdown {
                    background: #252526;
                    border: 1px solid #3c3c3c;
                    border-radius: 0 0 4px 4px;
                    overflow: hidden;
                }

                .autocomplete-item {
                    display: flex;
                    align-items: center;
                    padding: 0.4rem 0.75rem;
                    font-family: var(--font-mono, monospace);
                    font-size: 0.85rem;
                    color: #d4d4d4;
                    cursor: pointer;
                    gap: 0.5rem;
                }

                .autocomplete-item:hover {
                    background: #094771;
                }

                .autocomplete-item.selected, .autocomplete-item.first {
                    background: #094771;
                }

                .autocomplete-item .item-icon {
                    color: #75beff;
                    font-size: 0.8rem;
                }

                .autocomplete-item .item-text {
                    flex: 1;
                    color: #9cdcfe;
                }

                .autocomplete-item .item-type {
                    color: #808080;
                    font-size: 0.8rem;
                }

                .type-hint {
                    color: var(--text-secondary);
                    font-family: var(--font-mono, monospace);
                    font-size: 0.85rem;
                    padding-top: 0.5rem;
                }

                .comparison-box {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .comparison-col {
                    padding: 1rem;
                    border-radius: 8px;
                }

                .comparison-col h4 {
                    margin: 0 0 0.75rem;
                }

                .comparison-col code {
                    display: block;
                    padding: 0.4rem 0.6rem;
                    margin-bottom: 0.5rem;
                    border-radius: 4px;
                    font-size: 0.85rem;
                }

                .comparison-col.valid {
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                }

                .comparison-col.valid h4 {
                    color: #10b981;
                }

                .comparison-col.valid code {
                    background: rgba(16, 185, 129, 0.15);
                }

                .comparison-col.invalid {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                }

                .comparison-col.invalid h4 {
                    color: #ef4444;
                }

                .comparison-col.invalid code {
                    background: rgba(239, 68, 68, 0.15);
                    text-decoration: line-through;
                    opacity: 0.7;
                }

                .comparison-col .error-hint {
                    display: block;
                    font-size: 0.8rem;
                    color: #ef4444;
                    margin-top: 0.5rem;
                }
            `}</style>
        </section>
    )
}
