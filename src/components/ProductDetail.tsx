import { handleGo, useSignals } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'
import CodeExample from './CodeExample'

const products = [
    { id: 0, name: 'Laptop', price: 999, desc: 'High-performance laptop for professionals' },
    { id: 1, name: 'Mouse', price: 29, desc: 'Wireless ergonomic mouse' },
    { id: 2, name: 'Keyboard', price: 79, desc: 'Mechanical keyboard with RGB' },
    { id: 3, name: 'Monitor', price: 299, desc: '27" 4K IPS display' },
]

const code = `
import { handleGo } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'

export default function ProductDetail({ param, via, to }: RouteComponentProps) {
  // param.productId is a number - schema handles serialization
  const product = products[param.productId]
  const nextId = (param.productId + 1) % products.length
  const prevId = (param.productId + products.length - 1) % products.length

  return (
    <div>
      <h3>{product.name}</h3>
      <p>\${product.price}</p>

      <div className='button-group'>
        <button onClick={handleGo(to('$1', [prevId]))}>
          Prev <- to('$1', [prevId])
        </button>
        <button onClick={handleGo(via('item:$1', [nextId]))}>
          via('item:$1', [nextId]) -> Next
        </button>
      </div>
    </div>
  )
}`

export default function ProductDetail({
    param,
    via,
    to,
    breadcrumbs,
}: RouteComponentProps) {
    useSignals()
    // param.productId is a number - schema handles serialization
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
                <h4>Relative Navigation</h4>
                <div className='button-group'>
                    <button
                        type='button'
                        onClick={handleGo(to('$1', [prevId]))}
                    >
                        to('$1', [{prevId}]) → Prev
                    </button>
                    <button
                        type='button'
                        onClick={handleGo(via('item:$1', [nextId]))}
                    >
                        via('item:$1', [{nextId}]) → Next
                    </button>
                </div>
            </div>

            <CodeExample
                code={code}
                language='tsx'
                highlightLines={[16, 17, 18, 19, 20, 21]}
            />
        </div>
    )
}
