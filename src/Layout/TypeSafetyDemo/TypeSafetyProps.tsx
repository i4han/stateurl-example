/**
 * TypeSafetyProps - SurlRouteProps tab for type safety demo
 *
 * path: 'props' → TypeSafetyProps component, TypeSafetyPropsRoute
 */
import { defineRoute, useSignals, go, to, at } from 'stateurl'
import CodeExample from '../CodeExample'
import { AutocompleteVisual, TypeBadge, typedPropsCode } from './components'

const typeSafetyPropsConfig = {
    path: 'props',
    trail: '/type-safety',
} as const

export const TypeSafetyPropsRoute = defineRoute(
    TypeSafetyProps,
    typeSafetyPropsConfig,
)

export default function TypeSafetyProps() {
    useSignals()

    return (
        <div className='demo-section'>
            <h3>
                SurlRouteProps&lt;Schema&gt;
                <TypeBadge type='param' color='#3b82f6' />
                <TypeBadge type='query' color='#8b5cf6' />
                <TypeBadge type='trail' color='#10b981' />
            </h3>
            <p>
                Get typed <code>param</code>, <code>query</code>, and{' '}
                <code>breadcrumbs</code> from schema. Sugar syntax:{' '}
                <code>{'{count: 0}'}</code> → <code>number</code> type.
            </p>

            <div className='autocomplete-demo'>
                <h4>Schema-Based Types</h4>
                <div className='autocomplete-row'>
                    <AutocompleteVisual
                        prefix='SurlRouteProps<typeof '
                        suggestions={[
                            'counterSchema',
                            'userDetailSchema',
                            'productDetailSchema',
                        ]}
                        selected='counterSchema'
                    />
                </div>
                <div className='autocomplete-row'>
                    <AutocompleteVisual
                        prefix='query.'
                        suggestions={['count']}
                        selected='count'
                    />
                    <span className='type-hint'>: number | undefined</span>
                </div>
            </div>

            <h4>Try It</h4>
            <div className='button-row'>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => go(to('/counter'))}
                >
                    Go to Counter (typed query)
                </button>
                <button
                    type='button'
                    className='btn'
                    onClick={() => (at.users.profile.param.userId = 1)}
                >
                    Go to User 1 (typed param)
                </button>
            </div>

            <CodeExample code={typedPropsCode} language='tsx' />
        </div>
    )
}
