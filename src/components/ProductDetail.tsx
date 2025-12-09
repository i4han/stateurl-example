import { param, useNavigator } from 'stateurl'
import CodeExample from './CodeExample'

const products = [
    {
        id: '1',
        name: 'Laptop',
        price: 999,
        desc: 'High-performance laptop for professionals',
    },
    { id: '2', name: 'Mouse', price: 29, desc: 'Wireless ergonomic mouse' },
    {
        id: '3',
        name: 'Keyboard',
        price: 79,
        desc: 'Mechanical keyboard with RGB',
    },
    { id: '4', name: 'Monitor', price: 299, desc: '27" 4K IPS display' },
]

export default function ProductDetail() {
    const { route } = useNavigator()
    const productId = route.param.productId
    const product = products.find((p) => p.id === productId)
    console.log(productId)
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
                <strong>URL Param:</strong> <code>productId = {productId}</code>
                <br />
                <strong>Full Path:</strong>{' '}
                <code>/products/item/{productId}</code>
            </div>

            <CodeExample
                code={`import { param, useNavigator } from 'stateurl'

export default function ProductDetail() {
  // Access nested route param (signal)
  const productId = param.products?.item?.value
  
  // Use it to fetch/display data
  const product = products.find(p => p.id === productId)
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>\${product.price}</p>
      <p>{product.desc}</p>
    </div>
  )
}`}
                language='tsx'
            />
        </div>
    )
}
