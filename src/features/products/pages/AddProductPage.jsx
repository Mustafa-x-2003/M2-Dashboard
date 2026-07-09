import React from 'react';
import { useNavigate } from 'react-router';
import AddProductsHeader from '../components/AddProductsHeader';
import AddProductForm from '../components/AddProductForm';
import { AddProductProvider } from '../context/AddProductContext';

export default function AddProductPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Add Products Header */}
      <AddProductsHeader />

      {/* Main Form Component wrapped in Context Provider */}
      <AddProductProvider>
        <AddProductForm />
      </AddProductProvider>
    </div>
  );
}
