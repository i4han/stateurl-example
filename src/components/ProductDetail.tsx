import { handleGo, useSignals } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'
import CodeExample from './CodeExample'

const products = {
    '1': {
        id: '1',
        name: 'Laptop',
        price: 999,
        desc: 'High-performance laptop for professionals',
    },
    '2': {
        id: '2',
        name: 'Mouse',
        price: 29,
        desc: 'Wireless ergonomic mouse',
    },
    '3': {
        id: '3',
        name: 'Keyboard',
        price: 79,
        desc: 'Mechanical keyboard with RGB',
    },
    '4': {
        id: '4',
        name: 'Monitor',
        price: 299,
        desc: '27" 4K IPS display',
    },
}

const code = `
import { handleGo } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'

export default function ProductDetail({ param, via, to }: RouteComponentProps) {
  const product = products[param.productId]
  const nextProductId = (Number(param.productId) % 4) + 1
  const prevProductId = ((Number(param.productId) - 2 + 4) % 4) + 1

  return (
    <div>
      <h3>{product.name}</h3>
      <p>\${product.price}</p>

      <div className='button-group'>
        <button onClick={handleGo(to('$1', [prevProductId]))}>
          Prev <- to('$1', [prevProductId])
        </button>
        <button onClick={handleGo(via('item:$1', [nextProductId]))}>
          via('item:$1', [nextProductId]) -> Next
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
    // Access param directly from props
    const product = products[param.productId as keyof typeof products]
    const nextProductId = String((Number(param.productId) % 4) + 1)
    const prevProductId = String(((Number(param.productId) - 2 + 4) % 4) + 1)

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
                        onClick={handleGo(to('$1', [prevProductId]))}
                    >
                        to('$1', [{prevProductId}]) → Prev
                    </button>
                    <button
                        type='button'
                        onClick={handleGo(via('item:$1', [nextProductId]))}
                    >
                        via('item:$1', [{nextProductId}]) → Next
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
