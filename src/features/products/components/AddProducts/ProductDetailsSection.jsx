import React from "react";

const ProductDetailsSection = ({ register }) => {
  return (
    <>
      <div>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]  transition-colors duration-300">
            Product Name
          </span>
          <input
            type="text"
            placeholder="iPhone 16 Pro"
            className="h-14 w-full text-[var(--text)] rounded-2xl border border-[var(--input-border)] focus:border-[var(--input-focus)]  bg-[var(--input-bg)] px-5 outline-none transition duration-300 focus:border-[var(--input-focus)]"
            {...register("name", { required: true })}
          />
        </label>

        <label className="block">
          <span className="my-2 block text-sm font-semibold text-[var(--text-secondary)]  transition-colors duration-300">
            Short Description
          </span>
          <input
            type="text"
            placeholder="Minimum 10 characters"
            className="h-14 w-full text-[var(--text)] rounded-2xl border border-[var(--input-border)] focus:border-[var(--input-focus)]  bg-[var(--input-bg)] px-5 outline-none transition duration-300 focus:border-[var(--input-focus)]"
            {...register("shortDescription", { required: true })}
          />
        </label>

        <label className="block">
          <span className="my-2 block text-sm font-semibold text-[var(--text-secondary)]  transition-colors duration-300">
            Description
          </span>
          <textarea
            rows={5}
            placeholder="Minimum 20 characters"
            className="w-full rounded-2xl border border-[var(--input-border)] focus:border-[var(--input-focus)]  bg-[var(--input-bg)] px-5 py-4 outline-none transition duration-300 text-[var(--text)]"
            {...register("description", { required: true })}
          />
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="my-2 block text-sm font-semibold text-[var(--text-secondary)]  transition-colors duration-300">
              Price
            </span>
            <input
              type="number"
              placeholder="0.00"
              className="h-14 w-full text-[var(--text)] rounded-2xl border border-[var(--input-border)] focus:border-[var(--input-focus)]  bg-[var(--input-bg)] px-5 outline-none transition duration-300 focus:border-[var(--input-focus)]"
              {...register("price", { required: true, min: 0 })}
            />
          </label>
          <label className="block">
            <span className="my-2 block text-sm font-semibold text-[var(--text-secondary)]  transition-colors duration-300">
              Discount Price
            </span>
            <input
              type="number"
              placeholder="0.00"
              className="h-14 w-full text-[var(--text)] rounded-2xl border border-[var(--input-border)] focus:border-[var(--input-focus)]  bg-[var(--input-bg)] px-5 outline-none transition duration-300 focus:border-[var(--input-focus)]"
              {...register("discountPrice", { min: 0 })}
            />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="my-2 block text-sm font-semibold text-[var(--text-secondary)]  transition-colors duration-300">
              Stock
            </span>
            <input
              type="number"
              placeholder="0"
              className="h-14 w-full text-[var(--text)] rounded-2xl border border-[var(--input-border)] focus:border-[var(--input-focus)]  bg-[var(--input-bg)] px-5 outline-none transition duration-300 focus:border-[var(--input-focus)]"
              {...register("stock", { required: true, min: 0 })}
            />
          </label>
          <label className="block">
            <span className="my-2 block text-sm font-semibold text-[var(--text-secondary)]  transition-colors duration-300">
              SKU
            </span>
            <input
              type="text"
              placeholder="PROD-123"
              className="h-14 w-full text-[var(--text)] rounded-2xl border border-[var(--input-border)] focus:border-[var(--input-focus)]  bg-[var(--input-bg)] px-5 outline-none transition duration-300 focus:border-[var(--input-focus)]"
              {...register("sku")}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsSection;
