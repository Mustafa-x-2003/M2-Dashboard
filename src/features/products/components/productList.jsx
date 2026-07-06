import ProductCard from "./productCard"

export default function ProductList({ products, loading, error, isUser, onEdit, onDelete, onView, AddToCart }) {

    if (loading) return <div>loading...</div>
    if (error) return <div className="text-red-600">Error: {String(error)}</div>
    if (!products || products.length === 0) return <div>No products</div>

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {products.map(product => (
                <ProductCard
                    key={product._id}
                    product={product}
                    isUser={isUser}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                    AddToCart={AddToCart}
                />
            ))}
        </div>
    )
}