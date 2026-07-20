import { useProductSearch } from "../hooks/useProductSearch";
import ProductList from "../components/productList";
import SearchBar from "../components/searchBar";
import ProductsStatesLIst from "../components/productsStatesLIst";
import AddProduct from "../components/addProduct";
import ThemeContext from "../../../context/ThemeContext";
import PageLoader from "../../../components/ui/PageLoader";
import { useState, useContext } from "react";
import EditComponent from "../components/EditComponent";
import { deleteProduct, getAllProducts } from "../services/productsApi";
export default function Products({
  onEdit,
  onDelete,
  onView,
  AddToCart,
  addProduct,
}) {
  const {
    result,
    allProducts,
    loading,
    error,
    query,
    setQuery,
    cat,
    setCat,
    refresh,
  } = useProductSearch();
  const { theme } = useContext(ThemeContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      refresh()
      console.log('done');
      console.log(getAllProducts(),'done');
      
      
    } catch (error) {
      console.error("Delete product failed:", error);
    }finally{

      // await getAllProducts();
    }
  };

  return (
    <div
      className={` min-h-full w-full bg-[var(--background)] p-6 transition-colors duration-300 `}
    >
      {loading ? (
        <>
          <PageLoader text="Loading admin overview..." />

          <div className="my-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-4 shadow-[var(--shadow)]">
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
          <div>
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
              onDelete={handleDeleteProduct}
              onView={onView}
              AddToCart={AddToCart}
              setSelectedId={setSelectedId}
              setShowPopup={setShowPopup}
            />

            {showPopup && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4">
                <div className=" relative w-full max-w-6xl  max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--card)] text-[var(--text)] border border-[var(--border)] shadow-[var(--shadow)]">
                  <div className="flex items-center justify-between border-b p-4 mb-6 ">
                    <h2 className="text-lg font-bold">Edit Product</h2>

                    <button
                      onClick={() => setShowPopup(false)}
                      className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:hover:bg-red-400 dark:bg-red-500 dark:border dark:border-red-400"
                    >
                      ✕
                    </button>
                  </div>

                  <EditComponent
                    ids={selectedId}
                    popoup={true}
                    setshowPopup={setShowPopup}
                    refresh={refresh}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
