import { handleHref, Outlet } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'
import CodeExample from './CodeExample'

const products = [
    { id: '1', name: 'Laptop', price: 999 },
    { id: '2', name: 'Mouse', price: 29 },
    { id: '3', name: 'Keyboard', price: 79 },
    { id: '4', name: 'Monitor', price: 299 },
]

const code = `
import { Outlet, handleHref } from 'stateurl'
import type { RouteComponentProps } from 'stateurl'

export default function Products({ to, param }: RouteComponentProps) {
  return (
    <div>
      {products.map((product) => (
        <a
          // Use relative to() - 'item/$1' from /products
          href={to('item/$1', [product.id])}
          onClick={handleHref}
          className={param.productId === product.id ? 'active' : ''}
        >
          {product.name} - \${product.price}
        </a>
      ))}

      {/* Outlet renders ProductDetail component */}
      <Outlet />
    </div>
  )
}`

export default function Products(props: RouteComponentProps) {
    return (
        <section>
            <h2>Products (Params Demo)</h2>
            <p>
                Click a product to see its details. Uses relative{' '}
                <code>to('item/$1', [id])</code> for navigation.
            </p>

            <div className='products-container'>
                <div className='products-list'>
                    <h3>Product List</h3>
                    <ProductList {...props} />
                </div>
                <div className='product-detail-container'>
                    <Outlet />
                </div>
            </div>

            <CodeExample
                code={code}
                language='tsx'
                highlightLines={[11, 12, 13]}
            />
        </section>
    )
}

function ProductList({ to, param }: RouteComponentProps) {
    return (
        <ul className='product-items'>
            {products.map((product) => (
                <li key={product.id}>
                    <a
                        href={to('item/$1', [product.id])}
                        onClick={handleHref}
                        className={
                            param.productId === product.id ? 'active' : ''
                        }
                    >
                        <span className='product-name'>{product.name}</span>
                        <span className='product-price'>${product.price}</span>
                    </a>
                </li>
            ))}
        </ul>
    )
}
