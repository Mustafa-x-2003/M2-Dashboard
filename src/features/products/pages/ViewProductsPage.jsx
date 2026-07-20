import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getProductById } from "../services/ViewProductsService";
import {
  FiEye,
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiTag,
  FiStar,
  FiFolder,
} from "react-icons/fi";
import PageLoader from "../../../components/ui/PageLoader";
import AddProductsHeader from "../components/AddProductsHeader";

function ViewProductsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const images = (product?.images || []).map((img) => img.url);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setSliderIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) {
    return (
      <div className="p-4">
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
        <p className="text-[var(--danger)]">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
        <p className="text-[var(--text-secondary)]">Product not found</p>
      </div>
    );
  }

  const currentImage = images[currentImageIndex] || "";
  const currentSliderImage = images[sliderIndex] || "";

  const handlePrevImage = () => {
    setSliderIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSliderIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const categoryPath = [product.category, product.subcategory, product.brand]
    .filter(Boolean)
    .join(" • ");

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--text)] p-6 transition-colors duration-300 ">
      <AddProductsHeader
        type={"Product Details"}
        title={"Manage and review this product"}
        desc={
          "Review product details, images, pricing, inventory status, and category information from one place."
        }
        RightStatus={{
          title: "Published",
          desc: "Visible to customers and available for purchase",
        }}
      />
      <div className=" mt-2 mx-auto rounded-xl transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Images Section */}
          <div className="space-y-4 mt-4">
            {/* Main Image */}
            <div className="rounded-3xl  overflow-hidden bg-[var(--surface)] aspect-[4/2.9] flex items-center justify-center border-[0.5px] border-[#ddd] dark:border-0 transition-colors duration-300">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-[var(--text-secondary)] transition-colors duration-300">
                  No images available
                </p>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 0 && (
              <div className="flex gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`${
                      images.length > 1 ? "flex-1" : "w-32"
                    } h-19.5 rounded-2xl cursor-pointer overflow-hidden transition ${
                      index === currentImageIndex
                        ? "ring-2 ring-[var(--primary)]"
                        : "border-[0.5px] border-[#ddd] dark:border-0 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumbnail-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Auto Slider - arrows and dots live inside this container */}
            {images.length > 0 && (
              <div className="relative rounded-3xl mt-5 overflow-hidden bg-[var(--surface)] aspect-[4/2] flex items-center justify-center border-[0.5px] border-[#ddd] dark:border-0 transition-colors duration-300">
                <img
                  src={currentSliderImage}
                  alt={`${product.name} slider`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--primary)] hover:text-[var(--primary-hover)] transition text-6xl cursor-pointer transition-colors duration-300"
                    >
                      <FiChevronLeft />
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--primary)] hover:text-[var(--primary-hover)] transition text-6xl cursor-pointer transition-colors duration-300"
                    >
                      <FiChevronRight />
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => setSliderIndex(dotIndex)}
                          className={`w-2 h-2 cursor-pointer rounded-full transition ${
                            dotIndex === sliderIndex
                              ? "bg-[var(--primary)]"
                              : "bg-gray-800 dark:bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Details Section */}

          <div className="space-y-4 mt-4">
            {/* Overview Card */}
            <div className="bg-[var(--card)] rounded-3xl p-6  border-[0.5px] border-[#ddd] dark:border-0 transition-colors duration-300">
              <h2 className="text-[var(--primary)] text-md font-light tracking-wide mb-2 transition-colors duration-300">
                OVERVIEW
              </h2>

              <h3 className="text-3xl font-bold mb-2 text-[var(--text)] transition-colors duration-300">
                {product.name}
              </h3>

              <p className="text-[var(--text-secondary)] text-md leading-relaxed transition-colors duration-300">
                {product.description}
              </p>
            </div>

            {/* Price and Discount */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--card)] rounded-2xl p-5 border-[0.5px] border-[#ddd] dark:border-0 transition-colors duration-300">
                <p className="text-[var(--text-secondary)] text-xs font-light tracking-wide mb-2 transition-colors duration-300">
                  PRICE
                </p>

                <p className="text-xl font-bold text-[var(--text)] transition-colors duration-300">
                  ${product.price}
                </p>
              </div>

              <div className="bg-[var(--card)] rounded-2xl p-5 border-[0.5px] border-[#ddd] dark:border-0 transition-colors duration-300">
                <p className="text-[var(--text-secondary)] text-xs font-light tracking-wide mb-2 transition-colors duration-300">
                  DISCOUNT
                </p>

                <p className="text-xl font-bold text-[var(--text)] transition-colors duration-300">
                  {product.discountPrice
                    ? `$${product.discountPrice}`
                    : "No discount"}
                </p>
              </div>
            </div>

            {/* Stock and SKU */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--card)] rounded-2xl p-5 border-[0.5px] border-[#ddd] dark:border-0 transition-colors duration-300">
                <p className="text-[var(--text-secondary)] text-xs font-light tracking-wide mb-2 transition-colors duration-300">
                  STOCK
                </p>

                <p className="text-xl font-bold text-[var(--text)] transition-colors duration-300">
                  {product.stock || 0}
                </p>
              </div>

              <div className="bg-[var(--card)] rounded-2xl p-5 border-[0.5px] border-[#ddd] dark:border-0 transition-colors duration-300">
                <p className="text-[var(--text-secondary)] text-xs font-light tracking-wide mb-2 transition-colors duration-300">
                  SKU
                </p>

                <p className="text-lg font-mono text-[var(--text)] transition-colors duration-300">
                  {product.sku || "N/A"}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-[var(--card)] rounded-3xl p-5 py-4 border-[0.5px] border-[#ddd] dark:border-0 transition-colors duration-300">
              <p className="text-[var(--text)] text-md font-bold tracking-wide mb-3 flex items-center gap-2 transition-colors duration-300">
                <FiTag className="text-sm" />
                Tags
              </p>

              <div className="flex flex-wrap gap-2">
                {product.tags && product.tags.length > 0 ? (
                  product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[var(--surface-secondary)] text-[var(--text-secondary)] px-3 py-1 rounded-xl text-sm font-medium transition-colors duration-300"
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-[var(--text-secondary)] text-sm transition-colors duration-300">
                    No tags available
                  </span>
                )}
              </div>
            </div>

            {/* Category Info */}
            <div className="bg-[var(--card)] rounded-3xl p-4 py-4 border-[0.5px] border-[#ddd] dark:border-0 transition-colors duration-300">
              <p className="text-[var(--text)] text-md font-bold tracking-wide mb-3 flex items-center gap-2 transition-colors duration-300">
                <FiFolder className="text-sm" />
                Category Info
              </p>

              <p className="text-[var(--text-secondary)] text-sm transition-colors duration-300">
                {categoryPath}
              </p>
            </div>
            {/* Highlights */}
            {product.shortDescription && (
              <div className="bg-[var(--warning-light)] rounded-3xl p-4 py-4 mb-3 border-[0.5px] border-[#ddd] dark:border-0 transition-colors duration-300">
                <p className="text-[var(--text)] text-md font-bold tracking-wide mb-3 flex items-center gap-2 transition-colors duration-300">
                  <FiStar className="text-sm" />
                  Highlights
                </p>

                <p className="text-[var(--text-secondary)] font-md text-sm transition-colors duration-300">
                  {product.shortDescription}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProductsPage;
