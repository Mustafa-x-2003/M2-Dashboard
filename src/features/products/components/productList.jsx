import EditComponent from "./EditComponent"
import ProductCard from "../components/ProductCard/ProductCard"
import { HiOutlineEmojiSad } from "react-icons/hi"

export default function ProductList({ query, products, loading, error, isUser, onEdit, onDelete, onView, AddToCart, setSelectedId, setShowPopup }) {

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">Loading products...</p>
        </div>
    )

    if (error) return (
        <div className="flex items-center justify-center py-16">
            <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-red-500 dark:text-red-400 rounded-2xl px-6 py-4 text-sm font-medium">
                ⚠️ {String(error)}
            </div>
        </div>
    )

    if (!products || products.length === 0) return (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400 dark:text-gray-500">
            <HiOutlineEmojiSad className="text-5xl" />
            <p className="text-base font-medium">No products found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
        </div>
    )

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 pb-8">
            {products.filter(product => product.name.toLowerCase().startsWith(query.toLowerCase())).map(product => (
                <ProductCard
                    key={product._id}
                    product={product}
                    isUser={isUser}  
                    loading={loading}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                    AddToCart={AddToCart}
                    setSelectedId={setSelectedId}
                    setShowPopup={setShowPopup}
                />
            ))}

            
        </div>
    )
}