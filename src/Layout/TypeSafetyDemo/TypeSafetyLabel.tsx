/**
 * TypeSafetyLabel - label.* navigation tab for type safety demo
 *
 * path: 'label' → TypeSafetyLabel component, TypeSafetyLabelRoute
 */
import { defineRoute, useSignals, label } from 'stateurl'
import CodeExample from '../CodeExample'
import { AutocompleteVisual, TypeBadge, labelCode } from './components'

const typeSafetyLabelConfig = {
    path: 'label',
    trail: '/type-safety',
} as const

export const TypeSafetyLabelRoute = defineRoute(
    TypeSafetyLabel,
    typeSafetyLabelConfig,
)

export default function TypeSafetyLabel() {
    useSignals()

    return (
        <div className='demo-section'>
            <h3>
                label.* Navigation
                <TypeBadge type='restructure-safe' color='#10b981' />
            </h3>
            <p>
                Navigate by route label instead of path. Survives route
                restructuring as long as labels are preserved.
            </p>

            <div className='autocomplete-demo'>
                <h4>Autocomplete Preview</h4>
                <div className='autocomplete-row'>
                    <AutocompleteVisual
                        prefix='label.'
                        suggestions={[
                            'userProfile',
                            'productDetail',
                            'loaderUser',
                            'userSettings',
                        ]}
                        selected='userProfile'
                    />
                </div>
                <div className='autocomplete-row'>
                    <AutocompleteVisual
                        prefix="toLabel('"
                        suggestions={[
                            'userProfile',
                            'productDetail',
                            'loaderUser',
                            'userSettings',
                        ]}
                        selected='userProfile'
                    />
                </div>
            </div>

            <div className='info-box' style={{ marginTop: '1rem' }}>
                <h4>at.* vs label.*</h4>
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        marginTop: '0.5rem',
                    }}
                >
                    <tbody>
                        <tr>
                            <td
                                style={{
                                    padding: '0.5rem',
                                    borderBottom:
                                        '1px solid var(--border-default)',
                                }}
                            >
                                <strong>at.*</strong>
                            </td>
                            <td
                                style={{
                                    padding: '0.5rem',
                                    borderBottom:
                                        '1px solid var(--border-default)',
                                }}
                            >
                                Based on path structure
                            </td>
                            <td
                                style={{
                                    padding: '0.5rem',
                                    borderBottom:
                                        '1px solid var(--border-default)',
                                }}
                            >
                                <code>at.users.profile</code>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.5rem' }}>
                                <strong>label.*</strong>
                            </td>
                            <td style={{ padding: '0.5rem' }}>
                                Based on route labels
                            </td>
                            <td style={{ padding: '0.5rem' }}>
                                <code>label.userProfile</code>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4>Try It</h4>
            <div className='button-row'>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => label.userProfile.go({ userId: 1 })}
                >
                    label.userProfile.go({'{ userId: 1 }'})
                </button>
                <button
                    type='button'
                    className='btn'
                    onClick={() => label.productDetail.go({ productId: 0 })}
                >
                    label.productDetail.go({'{ productId: 0 }'})
                </button>
                <button
                    type='button'
                    className='btn'
                    onClick={() => label.loaderUser.go({ userId: 2 })}
                >
                    label.loaderUser.go({'{ userId: 2 }'})
                </button>
            </div>

            <CodeExample code={labelCode} language='typescript' />
        </div>
    )
}
