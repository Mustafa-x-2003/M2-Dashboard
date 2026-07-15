import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  FiImage,
  FiPlus,
  FiX,
  FiAlertCircle,
  FiCheckCircle,
  FiLoader,
} from "react-icons/fi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { useAddProduct } from "../context/AddProductContext";
import Input from "./Input";

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state, dispatch, submitProduct } = useAddProduct();
  const {
    images,
    tags,
    isLoading,
    error: submitError,
    success: submitSuccess,
  } = state;
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    dispatch({
      type: "SET_IMAGES",
      payload: [...images, ...files].slice(0, 5),
    });
    // Reset input value to allow selecting the same file again if deleted
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (index) => {
    dispatch({
      type: "SET_IMAGES",
      payload: images.filter((_, i) => i !== index),
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (images.length + files.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    dispatch({
      type: "SET_IMAGES",
      payload: [...images, ...files].slice(0, 5),
    });
  };

  const onSubmit = async (data) => {
    const result = await submitProduct(data);
    if (result.success) {
      setTimeout(() => navigate("/products"), 1500);
    }
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      dispatch({ type: "ADD_TAG", payload: trimmed });
    }
    setTagInput("");
  };

  const removeTag = (index) => {
    dispatch({ type: "REMOVE_TAG", payload: index });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-8  bg-[var(--background)]  transition-colors duration-300 xl:grid-cols-[0.95fr_1.05fr]"
    >
      {/* SECTION A: Gallery */}
      <section className="rounded-4xl border border-[var(--border)] bg-[var(--card)] p-6  transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
            <MdOutlineAddPhotoAlternate size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white transition-colors duration-300">
              Gallery
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-300 transition-colors duration-300">
              Upload multiple images and preview instantly.
            </p>
          </div>
        </div>

        {images.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {images.map((img, index) => (
              <article
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950/80 transition-colors duration-300"
              >
                <div className="flex h-48 items-center justify-center bg-white dark:bg-slate-950/70 transition-colors duration-300">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Preview ${index}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <FiX className="h-4 w-4" />
                </button>
                <div className="px-4 py-3 text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-300">
                  Image {index + 1}
                </div>
              </article>
            ))}
          </div>
        )}

        {images.length < 5 && (
          <label
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-cyan-400/30 bg-cyan-500/5 p-8 text-center transition hover:bg-cyan-500/10"
          >
            <FiImage className="mb-3 text-cyan-400 h-6 w-6" />
            <p className="font-semibold text-slate-800 dark:text-white transition-colors duration-300">
              Upload images
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
              PNG, JPG, WEBP • multiple files supported
            </p>
            <input
              hidden
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </label>
        )}

        <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-500/5 dark:text-emerald-100 transition-colors duration-300">
          <div className="flex items-center gap-2 font-semibold text-emerald-900 dark:text-emerald-50 transition-colors duration-300">
            <BsStars className="h-4 w-4 text-emerald-600 dark:text-emerald-400 transition-colors duration-300" />
            Senior UX
          </div>
          <p className="mt-1 text-emerald-700 dark:text-emerald-100/90 transition-colors duration-300">
            Optimized product creation experience with responsive design and
            smooth interactions.
          </p>
        </div>
      </section>

      {/* SECTION B: Product Metadata */}
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors duration-300">
        <div className="grid gap-5">
          <Input
            type={"text"}
            name={"name"}
            title={"Product Name"}
            placeholder={"iPhone 16 Pro"}
            register={register}
          />

          <Input
            type={"text"}
            name={"shortDescription"}
            title={"Short Description"}
            placeholder={"Minimum 10 characters"}
            register={register}
          />

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-300">
              Description
            </span>
            <textarea
              rows={5}
              placeholder="Minimum 20 characters"
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] text-[var(--text)] px-5 py-4 outline-none transition-colors duration-300 focus:border-[var(--input-focus)]"
              {...register("description", { required: true })}
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              type={"number"}
              name={"price"}
              title={"Price"}
              placeholder={"0.00"}
              register={register}
            />

            <Input
              type={"number"}
              name={"discountPrice"}
              title={"Discount Price"}
              placeholder={"0.00"}
              register={register}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              type={"number"}
              name={"stock"}
              title={"Stock"}
              placeholder={"0"}
              register={register}
            />

            <Input
              type={"text"}
              name={"sku"}
              title={"SKU"}
              placeholder={"PROD-123"}
              register={register}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-300">
                Category
              </span>
              <select
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-100 px-5 outline-none transition duration-300 focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                {...register("category", { required: true })}
              >
                <option value="electronics">electronics</option>
                <option value="phones">phones</option>
                <option value="fashion">fashion</option>
                <option value="home">home</option>
                <option value="beauty">beauty</option>
                <option value="sport">sport</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-300">
                Subcategory
              </span>
              <input
                type="text"
                placeholder="e.g. Smartphones"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-100 px-5 outline-none transition duration-300 focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                {...register("subcategory")}
              />
            </label>
          </div>

          <Input
            type={"text"}
            name={"brand"}
            title={"Brand"}
            placeholder={"e.g. Apple"}
            register={register}
          />

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/80 transition-colors duration-300">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-300">
                Tags
              </span>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Type a tag and press +"
                  className="h-14 w-full  rounded-2xl text-[var(--text)] border border-[var(--input-border)] bg-[var(--background)] px-3 outline-none transition-colors duration-300 focus:border-[var(--input-focus)]"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="relative inline-flex items-center justify-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 select-none shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_28px_rgba(6,182,212,0.35)] dark:shadow-none rounded-2xl bg-cyan-500 text-white hover:bg-cyan-400"
                >
                  <FiPlus className="h-5 w-5" />
                </button>
              </div>
              {/* Hidden field to carry tags into react-hook-form data */}
              <input type="hidden" {...register("tags")} />
            </label>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-300 transition-colors duration-300">
                  Add one or more tags to organize the product.
                </p>
              ) : (
                tags.map((tag, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => removeTag(index)}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-400/30 bg-gray-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-gray-500/70"
                  >
                    #{tag}
                    <FiX className="h-3.5 w-3.5" />
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-5 py-4 dark:border-slate-800 dark:bg-slate-950 dark:text-white transition-colors duration-300">
              <input type="checkbox" {...register("featured")} />
              Featured
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-5 py-4 dark:border-slate-800 dark:bg-slate-950 dark:text-white transition-colors duration-300">
              <input type="checkbox" defaultChecked {...register("isActive")} />
              Active
            </label>
          </div>

          {/* Feedback banners */}
          {submitError && (
            <div className="flex items-center gap-3 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300">
              <FiAlertCircle className="h-4 w-4 shrink-0" />
              {submitError}
            </div>
          )}
          {submitSuccess && (
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
              <FiCheckCircle className="h-4 w-4 shrink-0" />
              Product created successfully! Redirecting…
            </div>
          )}

          <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={isLoading}
              className="relative inline-flex items-center justify-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 select-none rounded-2xl bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="relative inline-flex items-center justify-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 select-none shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_28px_rgba(6,182,212,0.35)] dark:shadow-none rounded-2xl bg-cyan-500 text-white hover:bg-cyan-400"
            >
              {isLoading ? (
                <>
                  <FiLoader className="h-4 w-4 animate-spin" />
                  Creating…
                </>
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}
