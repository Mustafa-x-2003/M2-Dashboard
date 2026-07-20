import { useEffect, useState } from "react";
import EditComponent from "../components/EditComponent";
import AddProductsHeader from "../components/AddProductsHeader";
import PageLoader from "../../../components/ui/PageLoader";
import { GetProduct } from "../services/Editproduct";
import { useParams } from "react-router";
import "react-loading-skeleton/dist/skeleton.css";
import ProductForm from "../components/ProductForm";
import { AddProductProvider } from "../context/AddProductContext";
import { updateProduct } from "../services/productsApi";
import { useNavigate } from "react-router";
export default function Editpage() {
  const [isLoading, setisLoading] = useState(true);
  const [product, setproduct] = useState(null);

  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const handleUpdate = async (data) => {
    try {
      await updateProduct(
        product._id,
        {
          ...data,
        }
      );

      navigate("/products");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetProduct(id)
      .then((res) => {
        setproduct(res.product);
      })
      .catch((error) => {
        console.error("Load product failed", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  }, [id]);

  return (
    <section className="w-full p-8 ml-auto flex flex-col">
      {isLoading ? (
        <>
          <PageLoader text="Loading products..." />

          

          

          <div className="my-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-[var(--shadow)]">
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
            <AddProductsHeader
              type="Edit Product"
              title="Update and refine the product entry"
              desc="Review the current product data, add new images, remove existing ones, and save your updates safely."
              RightStatus={{
                title: "Live",
                desc: "Connected to the real product update API",
              }}
            />

            <AddProductProvider>
              <ProductForm
                mode="edit"
                product={product}
                onSubmit={handleUpdate}
              />
            </AddProductProvider>
           
        </>
      )}
    </section>
  );
}