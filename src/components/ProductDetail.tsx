import { param } from 'stateurl'

const products = [
    { id: '1', name: 'Laptop', price: 999, desc: 'High-performance laptop for professionals' },
    { id: '2', name: 'Mouse', price: 29, desc: 'Wireless ergonomic mouse' },
    { id: '3', name: 'Keyboard', price: 79, desc: 'Mechanical keyboard with RGB' },
    { id: '4', name: 'Monitor', price: 299, desc: '27" 4K IPS display' },
]

export default function ProductDetail() {
    const productId = param.products?.item?.value
    const product = products.find((p) => p.id === productId)

    if (!product) {
        return <div className='placeholder'><p>Product not found</p></div>
    }

    return (
        <div className='detail-card'>
            <h3>{product.name}</h3>
            <p className='price'>${product.price}</p>
            <p className='description'>{product.desc}</p>
            <div className='param-info'>
                <strong>URL Param:</strong> <code>productId = {productId}</code>
                <br />
                <strong>Full Path:</strong> <code>/products/item/{productId}</code>
            </div>
        </div>
    )
}
