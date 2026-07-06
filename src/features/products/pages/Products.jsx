import { useProductSearch } from "../hooks/useProductSearch"
import ProductList from "../components/productList"
import SearchBar from "../components/searchBar"

export default function Products({ onEdit, onDelete, onView, AddToCart }) {
    const { result, loading, error, query, setQuery } = useProductSearch()

    return (
        <div className="bg-gray-50 h-full w-full ">
            <SearchBar query={query} setQuery={setQuery} loading={loading} />
            <ProductList
                products={result}
                loading={loading}
                error={error}
                isUser={false}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
                AddToCart={AddToCart}
            />
        </div>
    )
}
