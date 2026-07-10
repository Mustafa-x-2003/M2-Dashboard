import { useProductSearch } from "../hooks/useProductSearch"
import ProductList from "../components/productList"
import SearchBar from "../components/searchBar"
import ProductsStatesLIst from "../components/productsStatesLIst"
import AddProduct from "../components/addProduct"
import { useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";
import PageLoader from "../../../components/ui/PageLoader";
export default function Products({ onEdit, onDelete, onView, AddToCart , addProduct}) {
    const { result, loading, error, query, setQuery, cat, setCat } = useProductSearch()
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
  <div className={`${theme === "dark" ? "dark" : ""} min-h-full w-full bg-gray-50 px-6 py-6 transition-colors duration-300 dark:bg-gray-900`}>
    {loading ? (
      <>
        <PageLoader text="Loading products..." />

        <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-5 shadow-[var(--shadow)]">
          <div className="mb-4 h-5 w-48 animate-pulse rounded-full bg-[var(--border)]"></div>
          <div className="h-8 w-40 animate-pulse rounded-xl bg-[var(--border)]"></div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow)]"
            >
              <div className="mb-4 h-10 w-10 animate-pulse rounded-xl bg-[var(--border)]"></div>
              <div className="mb-3 h-4 w-28 animate-pulse rounded-full bg-[var(--border)]"></div>
              <div className="h-7 w-16 animate-pulse rounded-xl bg-[var(--border)]"></div>
            </div>
          ))}
        </div>

        <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-[var(--shadow)]">
          <div className="h-5 w-full animate-pulse rounded-full bg-[var(--border)]"></div>
        </div>

        <div className="grid grid-cols-1 gap-5 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow)]"
            >
              <div className="mb-4 h-44 w-full animate-pulse rounded-xl bg-[var(--border)]"></div>
              <div className="mb-3 h-5 w-3/4 animate-pulse rounded-full bg-[var(--border)]"></div>
              <div className="mb-4 h-4 w-1/2 animate-pulse rounded-full bg-[var(--border)]"></div>
              <div className="h-9 w-full animate-pulse rounded-xl bg-[var(--border)]"></div>
            </div>
          ))}
        </div>
      </>
    ) : (
      <>
        <AddProduct addProduct={addProduct} />
        <ProductsStatesLIst products={result} />
        <SearchBar
          query={query}
          setQuery={setQuery}
          loading={loading}
          cat={cat}
          setCat={setCat}
          products={result}
        />
        <ProductList
          query={query}
          products={result}
          loading={false}
          error={error}
          isUser={false}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
          AddToCart={AddToCart}
        />
      </>
    )}
  </div>
);
}
