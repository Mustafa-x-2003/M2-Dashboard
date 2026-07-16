import { React, useEffect, useState } from "react";
import EditComponent from "../components/EditComponent";
import { Link, useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import { LuPackage2 } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import AddProductsHeader from "../components/AddProductsHeader";
import PageLoader from "../../../components/ui/PageLoader";
import { GetProduct } from "../services/Editproduct";
export default function Editpage() {
  const [isLoading, setisLoading] = useState(true);
  const [product, setproduct] = useState([]);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    GetProduct(id)
      .then((res) => {
        const item = res.product;
        setproduct(item);
      })
      .catch((error) => {
        console.error("Load product failed", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  }, [id]);

  return (
    <section className="  w-full  p-8   ml-auto  flex flex-col ">
      {isLoading ? (
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
          <AddProductsHeader
            type={"Edit Product"}
            title={"Update and refine the product entry"}
            desc={
              "Review the current product data, add new images, remove existing ones, and save your updates safely"
            }
            RightStatus={{
              title: "Live",
              desc: "Connected to the real product update API",
            }}
          />
          <EditComponent product={product} isLoading={isLoading} setisLoading={setisLoading} setproduct={setproduct} />
        </>
      )}
    </section>
  );
}
