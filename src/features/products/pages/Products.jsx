import { useProductSearch } from "../hooks/useProductSearch"
import ProductList from "../components/productList"
import SearchBar from "../components/searchBar"
import ProductsStatesLIst from "../components/productsStatesLIst"
import AddProduct from "../components/addProduct"
import { useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";
export default function Products({ onEdit, onDelete, onView, AddToCart , addProduct}) {
    const { result, loading, error, query, setQuery, cat, setCat } = useProductSearch()
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div className={`${theme === 'dark' ? 'dark' : ''} bg-gray-50 dark:bg-gray-900 min-h-full w-full px-6 py-6 transition-colors duration-300`}>
            <AddProduct addProduct={addProduct}/>
            <ProductsStatesLIst products={result}/>
            <SearchBar query={query} setQuery={setQuery} loading={loading} cat={cat} setCat={setCat} products={result} />
            <ProductList
                query={query}
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
