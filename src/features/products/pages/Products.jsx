import { useProductSearch } from "../hooks/useProductSearch"
import ProductList from "../components/productList"
import SearchBar from "../components/searchBar"
import ProductsStatesLIst from "../components/productsStatesLIst"
import AddProduct from "../components/addProduct"
export default function Products({ onEdit, onDelete, onView, AddToCart , addProduct}) {
    const { result, loading, error, query, setQuery, cat, setCat } = useProductSearch()

    return (
        <div className="bg-gray-50 min-h-full w-full px-6 py-6">
            <AddProduct addProduct={addProduct}/>
            <ProductsStatesLIst products={result}/>
            <SearchBar query={query} setQuery={setQuery} loading={loading} cat={cat} setCat={setCat} />
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
