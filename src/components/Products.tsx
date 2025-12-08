import { Outlet, useNavigator, param } from 'stateurl'

const products = [
    { id: '1', name: 'Laptop', price: 999 },
    { id: '2', name: 'Mouse', price: 29 },
    { id: '3', name: 'Keyboard', price: 79 },
    { id: '4', name: 'Monitor', price: 299 },
]

export default function Products() {
    const { handleHref, to } = useNavigator()
    const productId = param.products?.item?.value

    return (
        <section>
            <h2>Products (Params Demo)</h2>
            <p>Click a product to see its details. Notice the URL changes to <code>/products/item/123</code></p>

            <div className='products-container'>
                <div className='products-list'>
                    <h3>Product List</h3>
                    <ul className='product-items'>
                        {products.map((product) => (
                            <li key={product.id}>
                                <a
                                    href={to(`/products/item/${product.id}`)}
                                    onClick={handleHref}
                                    className={productId === product.id ? 'active' : ''}
                                >
                                    <span className='product-name'>{product.name}</span>
                                    <span className='product-price'>${product.price}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='product-detail-container'>
                    {productId ? (
                        <Outlet />
                    ) : (
                        <div className='placeholder'>
                            <p>← Select a product to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
