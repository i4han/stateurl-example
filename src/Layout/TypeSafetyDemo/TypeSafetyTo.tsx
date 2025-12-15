/**
 * TypeSafetyTo - to() path resolution tab for type safety demo
 *
 * path: 'to' → TypeSafetyTo component, TypeSafetyToRoute
 */
import { defineRoute, useSignals, go, to, handleHref } from 'stateurl'
import CodeExample from '../CodeExample'
import { AutocompleteVisual, TypeBadge, toPathCode } from './components'

const typeSafetyToConfig = {
    path: 'to',
    trail: '/type-safety',
} as const

export const TypeSafetyToRoute = defineRoute(TypeSafetyTo, typeSafetyToConfig)

export default function TypeSafetyTo() {
    useSignals()

    return (
        <div className='demo-section'>
            <h3>
                to() Path Resolution
                <TypeBadge type='absolute' color='#ef4444' />
                <TypeBadge type='relative' color='#06b6d4' />
            </h3>
            <p>
                Global <code>to()</code> requires absolute paths (starts with{' '}
                <code>/</code>). Props <code>to()</code> allows relative paths
                for context-aware navigation.
            </p>

            <div className='autocomplete-demo'>
                <h4>Global to() - Absolute Only</h4>
                <div className='autocomplete-row'>
                    <AutocompleteVisual
                        prefix="to('/"
                        suggestions={[
                            '/home',
                            '/counter',
                            '/users',
                            '/users/profile/:userId',
                            '/products',
                            '/products/item/:productId',
                        ]}
                        selected='/users/profile/:userId'
                    />
                </div>

                <h4 style={{ marginTop: '1.5rem' }}>
                    Props to() - Relative Allowed
                </h4>
                <div className='autocomplete-row'>
                    <AutocompleteVisual
                        prefix="to('"
                        suggestions={[
                            '../',
                            '../../',
                            './',
                            '/home',
                            '/counter',
                            '/users',
                        ]}
                        selected='../'
                    />
                </div>
            </div>

            <div className='comparison-box'>
                <div className='comparison-col valid'>
                    <h4>✓ Valid</h4>
                    <code>to('/home')</code>
                    <code>to('/users/profile/:userId', {'{ userId: 42 }'})</code>
                    <code>props.to('../settings')</code>
                    <code>props.to('edit')</code>
                </div>
                <div className='comparison-col invalid'>
                    <h4>✗ Type Error</h4>
                    <code>to('home')</code>
                    <code>to('../settings')</code>
                    <span className='error-hint'>
                        Global to() must start with /
                    </span>
                </div>
            </div>

            <h4>Try It</h4>
            <div className='button-row'>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => go(to('/home'))}
                >
                    go(to('/home'))
                </button>
                <button
                    type='button'
                    className='btn'
                    onClick={() => go(to('/counter'))}
                >
                    go(to('/counter'))
                </button>
                <button
                    type='button'
                    className='btn'
                    data-href={to('/users/profile/:userId', { userId: 1 })}
                    onClick={handleHref}
                >
                    to('/users/profile/:userId', {'{ userId: 1 }'})
                </button>
            </div>

            <CodeExample code={toPathCode} language='typescript' />
        </div>
    )
}
