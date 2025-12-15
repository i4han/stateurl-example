/**
 * ProductDetail - Product detail page
 *
 * path: 'item/:productId' → ProductDetail component, ProductDetailRoute
 */

import { defineRoute, handleHref, useSignals, type SurlRouteProps } from 'stateurl'
import CodeExample from '../CodeExample'

const productDetailConfig = {
    path: 'item/:productId',
    schema: { param: { productId: 0 } },
    trail: '/products',
    label: 'productDetail',
} as const

export const ProductDetailRoute = defineRoute(ProductDetail, productDetailConfig)

const products = [
    { id: 0, name: 'Laptop', price: 999, desc: 'High-performance laptop for professionals' },
    { id: 1, name: 'Mouse', price: 29, desc: 'Wireless ergonomic mouse' },
    { id: 2, name: 'Keyboard', price: 79, desc: 'Mechanical keyboard with RGB' },
    { id: 3, name: 'Monitor', price: 299, desc: '27" 4K IPS display' },
]

const code = `
import { handleHref, useSignals, type SurlRouteProps } from 'stateurl'

// Schema with trail for type-safe navigation
export const productDetailSchema = {
    trail: '/products/item/:productId',
    schema: { param: { productId: 0 } }
} as const

function ProductDetail({ param, to }: SurlRouteProps<typeof productDetailConfig>) {
  useSignals()
  const nextId = (param.productId + 1) % products.length
  const prevId = (param.productId + products.length - 1) % products.length

  return (
    <div>
      <div className='button-group'>
        {/* to('../') goes up to /products */}
        <button data-href={to('../')} onClick={handleHref}>
          ← Back to Products
        </button>
        {/* Change param at current route - just assign */}
        <button onClick={() => { param.productId = prevId }}>
          Prev Product
        </button>
        <button onClick={() => { param.productId = nextId }}>
          Next Product
        </button>
      </div>
    </div>
  )
}`

export default function ProductDetail({
    param,
    to,
    breadcrumbs,
}: SurlRouteProps<typeof productDetailConfig>) {
    useSignals()
    const product = products[param.productId]
    const nextId = (param.productId + 1) % products.length
    const prevId = (param.productId + products.length - 1) % products.length

    if (!product) {
        return (
            <div className='placeholder'>
                <p>Product not found</p>
            </div>
        )
    }

    return (
        <div className='detail-card'>
            <h3>{product.name}</h3>
            <p className='price'>${product.price}</p>
            <p className='description'>{product.desc}</p>
            <div className='param-info'>
                <strong>URL Param:</strong>{' '}
                <code>productId = {param.productId}</code>
                <br />
                <strong>Breadcrumbs:</strong>{' '}
                <code>{breadcrumbs.join(' / ')}</code>
            </div>

            <br />
            <div className='navigation-demo'>
                <h4>Type-Safe Navigation with to()</h4>
                <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '0.5rem' }}>
                    Navigate through the tree using relative paths with :param style
                </p>
                <div className='button-group'>
                    <button type='button' data-href={to('../')} onClick={handleHref}>
                        ← Back (../)
                    </button>
                    <button type='button' onClick={() => { param.productId = prevId }}>
                        ← Prev ({prevId})
                    </button>
                    <button type='button' onClick={() => { param.productId = nextId }}>
                        Next ({nextId}) →
                    </button>
                </div>
            </div>

            <CodeExample code={code} language='tsx' highlightLines={[19, 22, 25]} />
        </div>
    )
}
