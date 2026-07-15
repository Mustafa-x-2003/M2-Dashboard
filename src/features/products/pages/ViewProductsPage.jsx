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
    // const fetchProduct = async () => {
    //   try {
    //     setLoading(true);

    //     console.log("Product ID:", id);

    //     const data = await getProductById(id);

    //     console.log("Product Data:", data);

    //     setProduct(data);
    //     setError(null);
    //   } catch (err) {
    //     console.log("FETCH ERROR:", err);
    //     setError(err.message);
    //     setProduct(null);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

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
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
        <p className="text-[var(--text-secondary)]">Loading...</p>
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
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    setSliderIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    setSliderIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const categoryPath = [product.category, product.subcategory, product.brand]
    .filter(Boolean)
    .join(" • ");

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--text)] p-4">
      <div className="max-w-6xl mx-auto rounded-xl">
        {/* Back Section */}
        {/* <div className="bg-[var(--surface)] rounded-3xl mt-4 mb-3 p-4 border-[0.5px] border-[#ddd] dark:border-0">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text)] mb-4 transition cursor-pointer"
          >
            <FiArrowLeft />
            Back
          </button>

          <div className="flex items-center gap-3 mb-1">
            <FiEye className="text-md text-[var(--text-secondary)] mt-4" />

            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>

          <p className="text-[var(--text-secondary)] text-sm ml-8">
            Product details overview
          </p>
        </div> */}

        {/* Back Section */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 rounded-3xl mt-4 mb-3 p-4">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-300 mb-4 transition cursor-pointer"
          >
            <FiArrowLeft />
            Back
          </button>

          <div className="flex items-center gap-3 mb-1">
            <FiEye className="text-md text-gray-300 mt-4" />

            <h1 className="text-3xl font-bold text-white">{product.name}</h1>
          </div>

          <p className="text-gray-400 text-sm ml-8">Product details overview</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Images Section */}
          <div className="space-y-4 mt-4">
            {/* Main Image */}
            <div className="rounded-3xl overflow-hidden bg-[var(--surface)] aspect-[4/2.9] flex items-center justify-center border-[0.5px] border-[#ddd] dark:border-0">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-[var(--text-secondary)]">
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
                        : "opacity-60 hover:opacity-100"
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
              <div className="relative rounded-3xl mt-5 overflow-hidden bg-[var(--surface)] aspect-[4/2] flex items-center justify-center border-[0.5px] border-[#ddd] dark:border-0">
                <img
                  src={currentSliderImage}
                  alt={`${product.name} slider`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--primary)] hover:text-[var(--primary-hover)] transition text-6xl cursor-pointer"
                    >
                      <FiChevronLeft />
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--primary)] hover:text-[var(--primary-hover)] transition text-6xl cursor-pointer"
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
            <div className="bg-[var(--card)] rounded-3xl p-6  border-[0.5px] border-[#ddd] dark:border-0">
              <h2 className="text-[var(--primary)] text-md font-light tracking-wide mb-2">
                OVERVIEW
              </h2>

              <h3 className="text-3xl font-bold mb-2 text-[var(--text)]">
                {product.name}
              </h3>

              <p className="text-[var(--text-secondary)] text-md leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price and Discount */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--card)] rounded-2xl p-5 border-[0.5px] border-[#ddd] dark:border-0">
                <p className="text-[var(--text-secondary)] text-xs font-light tracking-wide mb-2">
                  PRICE
                </p>

                <p className="text-xl font-bold text-[var(--text)]">
                  ${product.price}
                </p>
              </div>

              <div className="bg-[var(--card)] rounded-2xl p-5 border-[0.5px] border-[#ddd] dark:border-0">
                <p className="text-[var(--text-secondary)] text-xs font-light tracking-wide mb-2">
                  DISCOUNT
                </p>

                <p className="text-xl font-bold text-[var(--text)]">
                  {product.discountPrice
                    ? `$${product.discountPrice}`
                    : "No discount"}
                </p>
              </div>
            </div>

            {/* Stock and SKU */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--card)] rounded-2xl p-5 border-[0.5px] border-[#ddd] dark:border-0">
                <p className="text-[var(--text-secondary)] text-xs font-light tracking-wide mb-2">
                  STOCK
                </p>

                <p className="text-xl font-bold text-[var(--text)]">
                  {product.stock || 0}
                </p>
              </div>

              <div className="bg-[var(--card)] rounded-2xl p-5 border-[0.5px] border-[#ddd] dark:border-0">
                <p className="text-[var(--text-secondary)] text-xs font-light tracking-wide mb-2">
                  SKU
                </p>

                <p className="text-lg font-mono text-[var(--text)]">
                  {product.sku || "N/A"}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-[var(--card)] rounded-3xl p-5 py-4 border-[0.5px] border-[#ddd] dark:border-0">
              <p className="text-[var(--text)] text-md font-bold tracking-wide mb-3 flex items-center gap-2">
                <FiTag className="text-sm" />
                Tags
              </p>

              <div className="flex flex-wrap gap-2">
                {product.tags && product.tags.length > 0 ? (
                  product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[var(--surface-secondary)] text-[var(--text-secondary)] px-3 py-1 rounded-xl text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-[var(--text-secondary)] text-sm">
                    No tags available
                  </span>
                )}
              </div>
            </div>

            {/* Category Info */}
            <div className="bg-[var(--card)] rounded-3xl p-4 py-4 border-[0.5px] border-[#ddd] dark:border-0">
              <p className="text-[var(--text)] text-md font-bold tracking-wide mb-3 flex items-center gap-2">
                <FiFolder className="text-sm" />
                Category Info
              </p>

              <p className="text-[var(--text-secondary)] text-sm">
                {categoryPath}
              </p>
            </div>
            {/* Highlights */}
            {product.shortDescription && (
              <div className="bg-[var(--warning-light)] rounded-3xl p-4 py-4 mb-3 border-[0.5px] border-[#ddd] dark:border-0">
                <p className="text-[var(--text)] text-md font-bold tracking-wide mb-3 flex items-center gap-2">
                  <FiStar className="text-sm" />
                  Highlights
                </p>

                <p className="text-[var(--text-secondary)] font-md text-sm">
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
