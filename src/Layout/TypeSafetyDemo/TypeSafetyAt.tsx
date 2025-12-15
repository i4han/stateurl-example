/**
 * TypeSafetyAt - at.* accessor tab for type safety demo
 *
 * path: 'at' → TypeSafetyAt component, TypeSafetyAtRoute
 */
import { defineRoute, useSignals, at } from 'stateurl'
import CodeExample from '../CodeExample'
import { AutocompleteVisual, TypeBadge, atAccessorCode } from './components'

const typeSafetyAtConfig = {
    path: 'at',
    trail: '/type-safety',
} as const

export const TypeSafetyAtRoute = defineRoute(TypeSafetyAt, typeSafetyAtConfig)

export default function TypeSafetyAt() {
    useSignals()

    return (
        <div className='demo-section'>
            <h3>
                at.* Accessor
                <TypeBadge type='chained' color='#f59e0b' />
                <TypeBadge type='navigation' color='#10b981' />
            </h3>
            <p>
                Chain route segments for intuitive navigation. Mirrors your
                route structure with full autocomplete at each level.
            </p>

            <div className='autocomplete-demo'>
                <h4>Autocomplete Preview</h4>
                <div className='autocomplete-row'>
                    <AutocompleteVisual
                        prefix='at.'
                        suggestions={[
                            'counter',
                            'users',
                            'products',
                            'settings',
                            'home',
                            'about',
                        ]}
                        selected='users'
                    />
                </div>
                <div className='autocomplete-row'>
                    <AutocompleteVisual
                        prefix='at.users.'
                        suggestions={[
                            'profile',
                            'go()',
                            'param',
                            'query',
                            'pattern',
                        ]}
                        selected='profile'
                    />
                </div>
                <div className='autocomplete-row'>
                    <AutocompleteVisual
                        prefix='at.users.profile.'
                        suggestions={[
                            'go()',
                            'param',
                            'query',
                            'pattern',
                            'scopePath',
                        ]}
                        selected='go()'
                    />
                </div>
            </div>

            <h4>Try It</h4>
            <div className='button-row'>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => at.counter.go()}
                >
                    at.counter.go()
                </button>
                <button
                    type='button'
                    className='btn'
                    onClick={() => at.users.go()}
                >
                    at.users.go()
                </button>
                <button
                    type='button'
                    className='btn'
                    onClick={() => at.products.go()}
                >
                    at.products.go()
                </button>
            </div>

            <div className='info-box' style={{ marginTop: '1rem' }}>
                <strong>Route Info:</strong>
                <pre style={{ margin: '0.5rem 0 0', fontSize: '0.85rem' }}>
                    {`at.counter.pattern:  "${at.counter?.pattern ?? '...'}"
at.users.pattern:    "${at.users?.pattern ?? '...'}"
at.products.pattern: "${at.products?.pattern ?? '...'}"`}
                </pre>
            </div>

            <CodeExample code={atAccessorCode} language='typescript' />
        </div>
    )
}
