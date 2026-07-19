import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { useAddProduct } from "../context/AddProductContext";

import GallerySection from "./AddProducts/GallerySection";
import ProductDetailsSection from "./AddProducts/ProductDetailsSection";
import CategorySection from "./AddProducts/CategorySection";
import TagsSection from "./AddProducts/TagsSection";
import StatusSection from "./AddProducts/StatusSection";
import FormActions from "./AddProducts/FormActions";
import useProductForm from "../hooks/useProductForm";

export default function ProductForm(
  { mode = "add",
  product = null,
  onSubmit, }) {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    images,
    tags,
    tagInput,

    setTagInput,

    fileInputRef,

    handleImageChange,
    handleRemoveImage,
    handleDragOver,
    handleDrop,

    addTag,
    removeTag,

    handleFormSubmit,

    submitError,
    submitSuccess,
    isLoading,
    status,
  } = useProductForm({
    mode,
    product,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">

      <GallerySection
        images={images}
        handleRemoveImage={handleRemoveImage}
        handleImageChange={handleImageChange}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        fileInputRef={fileInputRef}
      />
      
      
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 transition-colors duration-300">
        
        <div className="grid gap-5">
        <ProductDetailsSection
          register={register}
        />

          <CategorySection
            register={register}
          />

          <TagsSection
            register={register}
            tagInput={tagInput}
            setTagInput={setTagInput}
            addTag={addTag}
            tags={tags}
            removeTag={removeTag}
          />
         

          <StatusSection
            register={register}
            submitError={submitError}
            submitSuccess={submitSuccess}
            mode={mode}
          />


          <FormActions
            navigate={navigate}
            isLoading={isLoading}
            status={status}
            mode={mode}
          />
        </div>
      </section>
    </form>
  );
}
