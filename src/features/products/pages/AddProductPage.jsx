import React from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router";

import AddProductsHeader from '../components/AddProductsHeader';

import { AddProductProvider } from '../context/AddProductContext';

import { updateProduct } from "../services/productsApi";
import ProductForm from '../components/ProductForm';

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
    <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      <AddProductsHeader mode={mode} />

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