import { handleHref, useSignals, type SurlRouteProps } from 'stateurl'
import CodeExample from './CodeExample'

// Schema exported for routes.ts
export const productDetailSchema = {
    trail: '/products/item/:productId',
    schema: { param: { productId: 0 } }
} as const

const products = [
    { id: 0, name: 'Laptop', price: 999, desc: 'High-performance laptop for professionals' },
    { id: 1, name: 'Mouse', price: 29, desc: 'Wireless ergonomic mouse' },
    { id: 2, name: 'Keyboard', price: 79, desc: 'Mechanical keyboard with RGB' },
    { id: 3, name: 'Monitor', price: 299, desc: '27" 4K IPS display' },
]

const code = `
import { handleHref, type SurlRouteProps } from 'stateurl'

// Schema with trail for type-safe to() navigation
export const productDetailSchema = {
    trail: '/products/item/:productId',
    schema: { param: { productId: 0 } }
} as const

function ProductDetail({ param, to }: SurlRouteProps<typeof productDetailSchema>) {
  const nextId = (param.productId + 1) % products.length
  const prevId = (param.productId + products.length - 1) % products.length

  return (
    <div>
      {/* Type-safe relative navigation */}
      <div className='button-group'>
        {/* to('../') goes up to /products */}
        <button data-href={to('../')} onClick={handleHref}>
          ← Back to Products
        </button>
        {/* Navigate to sibling with :param style */}
        <button data-href={to('../:id', { id: prevId })} onClick={handleHref}>
          Prev Product
        </button>
        <button data-href={to('../:id', { id: nextId })} onClick={handleHref}>
          Next Product
        </button>
      </div>
    </div>
  )
}`

function ProductDetail({
    param,
    to,
    breadcrumbs,
}: SurlRouteProps<typeof productDetailSchema>) {
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
                    <button type='button' data-href={to('../:id', { id: prevId })} onClick={handleHref}>
                        ← Prev ({prevId})
                    </button>
                    <button type='button' data-href={to('../:id', { id: nextId })} onClick={handleHref}>
                        Next ({nextId}) →
                    </button>
                </div>
            </div>

            <CodeExample code={code} language='tsx' highlightLines={[19, 22, 25]} />
        </div>
    )
}

export default ProductDetail
