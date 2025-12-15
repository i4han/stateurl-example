/**
 * ScrollSpyDemo - Demonstrates reusable scroll spy component
 *
 * The scroll spy:
 * - Discovers sections with [data-section] automatically
 * - Updates URL hash as you scroll
 * - Exposes currentSection via useScrollSpy() for nav highlighting
 */
import React from 'react'
import {
    defineRoute,
    useSignals,
    type SurlRouteProps,
} from 'stateurl'
import { cx, ScrollSpy, useScrollSpy } from 'stateurl/utils'
import CodeExample from './CodeExample'

const scrollSpyDemoConfig = {
    path: 'scroll-spy',
    trail: '/',
} as const

export const ScrollSpyDemoRoute = defineRoute(ScrollSpyDemo, scrollSpyDemoConfig)

function SpyNav() {
    const currentSection = useScrollSpy()
    const navRef = React.useRef<HTMLElement>(null)
    const activeRef = React.useRef<HTMLAnchorElement>(null)

    // Auto-scroll nav to keep active item visible (only when out of view)
    React.useEffect(() => {
        const nav = navRef.current
        const active = activeRef.current
        if (!active || !nav) return

        const navRect = nav.getBoundingClientRect()
        const activeRect = active.getBoundingClientRect()

        // Only scroll if active item is outside visible nav area
        const isAbove = activeRect.top < navRect.top
        const isBelow = activeRect.bottom > navRect.bottom

        if (isAbove || isBelow) {
            active.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth',
            })
        }
    }, [currentSection])

    const sections = [
        { id: 'intro', label: 'Introduction' },
        { id: 'how-it-works', label: 'How It Works' },
        { id: 'usage', label: 'Usage' },
        { id: 'api', label: 'API' },
        { id: 'installation', label: 'Installation' },
        { id: 'configuration', label: 'Configuration' },
        { id: 'examples', label: 'Examples' },
        { id: 'advanced', label: 'Advanced Usage' },
        { id: 'troubleshooting', label: 'Troubleshooting' },
        { id: 'faq', label: 'FAQ' },
        { id: 'changelog', label: 'Changelog' },
        { id: 'contributing', label: 'Contributing' },
    ]

    return (
        <nav className="spy-nav" ref={navRef}>
            {sections.map(({ id, label }) => {
                const isActive = currentSection === id
                return (
                    <a
                        key={id}
                        href={`#${id}`}
                        ref={isActive ? activeRef : null}
                        className={cx(isActive && 'active')}
                    >
                        {label}
                    </a>
                )
            })}
        </nav>
    )
}

/** Article extracted as nested component - ScrollSpy still discovers sections */
function SpyArticle() {
    return (
        <article className="spy-content">
            <IntroSection />
            <HowItWorksSection />
            <UsageSection />
            <ApiSection />
            <PlaceholderSection id="installation" title="Installation" />
            <PlaceholderSection id="configuration" title="Configuration" />
            <PlaceholderSection id="examples" title="Examples" />
            <PlaceholderSection id="advanced" title="Advanced Usage" />
            <PlaceholderSection id="troubleshooting" title="Troubleshooting" />
            <PlaceholderSection id="faq" title="FAQ" />
            <PlaceholderSection id="changelog" title="Changelog" />
            <PlaceholderSection id="contributing" title="Contributing" />
        </article>
    )
}

function PlaceholderSection({ id, title }: { id: string; title: string }) {
    return (
        <section id={id} data-section>
            <h2>{title}</h2>
            <p>
                This is placeholder content for the <strong>{title}</strong> section.
                Scroll through to test the sticky nav auto-scroll behavior.
            </p>
            <p>
                Notice how the navigation on the right automatically scrolls to keep
                the active item visible, without requiring a second scrollbar interaction.
            </p>
        </section>
    )
}

function IntroSection() {
    return (
        <section id="intro" data-section>
            <h2>Introduction</h2>
            <p>
                Scroll Spy watches which section is currently visible and updates
                the URL hash accordingly. The navigation highlights the active section.
            </p>
            <p>
                This implementation is a <strong>reusable component</strong> that can
                be added to any page. It discovers sections automatically by looking
                for <code>[data-section]</code> attributes.
            </p>
            <p>
                Try scrolling down and watch the URL hash and navigation update.
                You can also click the nav links to jump to sections.
            </p>
            <p className="nested-note">
                <strong>Note:</strong> This article is extracted into nested components
                (SpyArticle → IntroSection, etc.) to demonstrate that ScrollSpy works
                regardless of component nesting.
            </p>
        </section>
    )
}

function HowItWorksSection() {
    return (
        <section id="how-it-works" data-section>
            <h2>How It Works</h2>
            <p>
                The scroll spy uses <code>IntersectionObserver</code> to watch
                all elements with <code>data-section</code> attribute. When a section
                enters the viewport, it:
            </p>
            <ol>
                <li>Updates <code>window.location.hash</code> silently (no scroll jump)</li>
                <li>Stores current section in shared state</li>
                <li>Components read this via <code>useScrollSpy()</code> hook</li>
            </ol>
            <p>
                Because it's a standalone component, scroll spy behavior is completely
                decoupled from the page content. Any page can opt-in by rendering
                the <code>&lt;ScrollSpy /&gt;</code> component.
            </p>
        </section>
    )
}

function UsageSection() {
    return (
        <section id="usage" data-section>
            <h2>Usage</h2>

            <h3>1. Add ScrollSpy to your page</h3>
            <CodeExample
                code={`import { ScrollSpy } from 'stateurl/utils'

export default function DocsPage() {
    return (
        <div>
            <ScrollSpy />  {/* Just add this */}
            <Nav />
            <Content />  {/* Sections can be deeply nested */}
        </div>
    )
}`}
                language="tsx"
            />

            <h3>2. Mark sections</h3>
            <CodeExample
                code={`// Just add data-section to your headings or sections
<section id="intro" data-section>
    <h2>Introduction</h2>
    ...
</section>

<section id="api" data-section>
    <h2>API Reference</h2>
    ...
</section>`}
                language="tsx"
            />

            <h3>3. Read current section</h3>
            <CodeExample
                code={`import { cx, useScrollSpy } from 'stateurl/utils'

function Nav() {
    const currentSection = useScrollSpy()

    return (
        <nav>
            <a href="#intro" className={cx(currentSection === 'intro' && 'active')}>
                Intro
            </a>
            <a href="#api" className={cx(currentSection === 'api' && 'active')}>
                API
            </a>
        </nav>
    )
}`}
                language="tsx"
            />
        </section>
    )
}

function ApiSection() {
    return (
        <section id="api" data-section>
            <h2>API</h2>

            <h3>&lt;ScrollSpy /&gt;</h3>
            <p>Component that provides scroll spy behavior. Renders nothing, just sets up observers.</p>

            <h3>useScrollSpy()</h3>
            <p>Hook that returns the current section ID, or <code>null</code> if none active.</p>
            <CodeExample
                code={`const currentSection = useScrollSpy()
// Returns: 'intro' | 'api' | ... | null`}
                language="tsx"
            />

            <h3>data-section attribute</h3>
            <p>
                Add to any element that should be tracked. Element must have an <code>id</code>.
            </p>
            <CodeExample
                code={`<h2 id="features" data-section>Features</h2>
<section id="overview" data-section>...</section>
<div id="custom" data-section>...</div>`}
                language="html"
            />

            <h3>Benefits</h3>
            <ul>
                <li><strong>No hardcoded list</strong> - sections discovered automatically</li>
                <li><strong>Reusable</strong> - same component works on any page</li>
                <li><strong>Decoupled</strong> - behavior separate from presentation</li>
                <li><strong>URL hash</strong> - sections are bookmarkable/shareable</li>
                <li><strong>Nesting agnostic</strong> - works with any component structure</li>
            </ul>
        </section>
    )
}

export default function ScrollSpyDemo(_props: SurlRouteProps<typeof scrollSpyDemoConfig>) {
    useSignals()

    return (
        <div className="scroll-spy-demo">
            <ScrollSpy />

            <div className="spy-layout">
                <SpyArticle />
                <SpyNav />
            </div>

            <style>{`
                .scroll-spy-demo {
                    max-width: 1000px;
                }

                .spy-layout {
                    display: grid;
                    grid-template-columns: 1fr 200px;
                    gap: 2rem;
                    align-items: start;
                }

                .spy-nav {
                    position: sticky;
                    top: 80px;
                    max-height: calc(100vh - 100px);
                    overflow-y: auto;
                    scrollbar-width: none;  /* Firefox */
                    -ms-overflow-style: none;  /* IE/Edge */
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                    padding: 1rem;
                    margin: 0;
                    background: var(--bg-surface);
                    border-radius: 8px;
                    border: 1px solid var(--border-default);
                    will-change: transform;
                    transform: translateZ(0);
                }

                .spy-nav::-webkit-scrollbar {
                    display: none;  /* Chrome/Safari */
                }

                .spy-nav a {
                    padding: 0.5rem 0.75rem;
                    text-decoration: none;
                    color: var(--text-secondary);
                    border-radius: 4px;
                    transition: all 0.15s;
                    font-size: 0.9rem;
                }

                .spy-nav a:hover {
                    background: var(--bg-muted);
                    color: var(--text-primary);
                }

                .spy-nav a.active {
                    background: var(--primary-color, #3b82f6);
                    color: white;
                    font-weight: 500;
                }

                .spy-content section {
                    padding: 2rem 0;
                    border-bottom: 1px solid var(--border-default);
                    min-height: 400px;
                }

                .spy-content section:last-child {
                    border-bottom: none;
                    min-height: 600px;
                }

                .spy-content h2 {
                    margin-top: 0;
                }

                .spy-content h3 {
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                    color: var(--text-secondary);
                }

                .spy-content ol, .spy-content ul {
                    padding-left: 1.5rem;
                    margin: 1rem 0;
                }

                .spy-content li {
                    margin: 0.5rem 0;
                }

                .nested-note {
                    background: var(--bg-muted);
                    padding: 1rem;
                    border-radius: 6px;
                    border-left: 3px solid var(--primary-color, #3b82f6);
                    margin-top: 1rem;
                }

                @media (max-width: 768px) {
                    .spy-layout {
                        grid-template-columns: 1fr;
                    }

                    .spy-nav {
                        position: static;
                        flex-direction: row;
                        flex-wrap: wrap;
                    }
                }
            `}</style>
        </div>
    )
}
