import React from "react";
import { useNavigate, useLocation } from "react-router";

import AddProductsHeader from "../components/AddProductsHeader";
import { AddProductProvider } from "../context/AddProductContext";
import { updateProduct } from "../services/productsApi";
import ProductForm from "../components/ProductForm";

export default function AddProductPage({
  mode = "add",
  product: propProduct,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const product = propProduct || location.state?.product;

  const handleUpdate = async (data) => {
    if (!data) return;

    await updateProduct(
      product._id,
      data,
      data.tags,
      data.images
    );

    navigate("/products");
  };

  return (
    <div className="max-w-full mx-auto p-6 sm:px-6 lg:px-8 space-y-6">
      <AddProductsHeader
        type={mode === "edit" ? "Edit Product" : "Create Product"}
        title={
          mode === "edit"
            ? "Update and refine the product entry"
            : "Launch a polished product entry"
        }
        desc={
          mode === "edit"
            ? "Review the current product data, update images, and save your changes."
            : "Add products with validation, image previews, multi-upload support, and smooth UX."
        }
        RightStatus={{
          title: mode === "edit" ? "Live" : "Ready",
          desc:
            mode === "edit"
              ? "Connected to the real product update API"
              : "Create, validate, and save with one click",
        }}
      />

      <AddProductProvider>
        <ProductForm
          mode={mode}
          product={product}
          onSubmit={mode === "edit" ? handleUpdate : undefined}
        />
      </AddProductProvider>
    </div>
  );
}