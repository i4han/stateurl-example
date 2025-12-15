import { useSignals, handleHref, Outlet, type SurlRouteProps } from 'stateurl'
import CodeExample from './CodeExample'

// Schema with trail for type-safe to() autocomplete
export const productsSchema = {
    trail: '/products',
    schema: {}
} as const

const products = [
    { id: 0, name: 'Laptop', price: 999 },
    { id: 1, name: 'Mouse', price: 29 },
    { id: 2, name: 'Keyboard', price: 79 },
    { id: 3, name: 'Monitor', price: 299 },
]

const code = `
import { Outlet, handleHref, type SurlRouteProps } from 'stateurl'

// Schema with trail enables type-safe to() autocomplete
export const productsSchema = {
    trail: '/products',
    schema: {}
} as const

// to() autocompletes 'item/:productId' from SurlTo registry
export default function Products({ to, param }: SurlRouteProps<typeof productsSchema>) {
  return (
    <div>
      {products.map((product) => (
        <a
          // Type-safe: to() uses :param style interpolation
          href={to('item/:productId', { productId: product.id })}
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

export default function Products(props: SurlRouteProps<typeof productsSchema>) {
    useSignals()
    return (
        <section>
            <h2>Products (Type-Safe to() Demo)</h2>
            <p>
                Click a product to see its details. The <code>to()</code> function
                autocompletes <code>'item/:productId'</code> from the route tree.
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
                highlightLines={[5, 6, 7, 11, 17]}
            />
        </section>
    )
}

function ProductList({ to, param }: SurlRouteProps<typeof productsSchema>) {
    return (
        <ul className='product-items'>
            {products.map((product) => (
                <li key={product.id}>
                    <a
                        // to() uses :param style - autocompletes 'item/:productId'
                        href={to('item/:productId', { productId: product.id })}
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
