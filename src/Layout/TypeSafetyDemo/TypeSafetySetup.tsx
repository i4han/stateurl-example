/**
 * TypeSafetySetup - Setup tab for type safety demo
 *
 * path: 'setup' → TypeSafetySetup component, TypeSafetySetupRoute
 */
import { defineRoute, useSignals } from 'stateurl'
import CodeExample from '../CodeExample'
import { TypeBadge, setupCode } from './components'

const typeSafetySetupConfig = {
    path: 'setup',
    trail: '/type-safety',
} as const

export const TypeSafetySetupRoute = defineRoute(
    TypeSafetySetup,
    typeSafetySetupConfig,
)

export default function TypeSafetySetup() {
    useSignals()

    return (
        <div className='demo-section'>
            <h3>
                Module Augmentation Setup
                <TypeBadge type='one-time' color='#10b981' />
            </h3>
            <p>
                Define your route types in a single file using TypeScript module
                augmentation. This becomes the single source of truth for all
                type inference.
            </p>

            <div className='feature-grid'>
                <div className='feature-card'>
                    <h4>SurlAt</h4>
                    <p>Route tree for at.* accessor</p>
                    <code>SurlAtFrom&lt;routes&gt;</code>
                </div>
                <div className='feature-card'>
                    <h4>SurlTo</h4>
                    <p>Valid paths for to()</p>
                    <code>SurlToFrom&lt;routes&gt;</code>
                </div>
                <div className='feature-card'>
                    <h4>SurlFeature</h4>
                    <p>Feature flags from appFeature</p>
                    <code>SurlFeatureFrom&lt;appFeature&gt;</code>
                </div>
                <div className='feature-card'>
                    <h4>SurlLabel</h4>
                    <p>Typed label.*.go() params</p>
                    <code>SurlLabelFrom&lt;routes&gt;</code>
                </div>
            </div>

            <CodeExample code={setupCode} language='typescript' />
        </div>
    )
}
