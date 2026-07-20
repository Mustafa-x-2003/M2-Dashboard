import React from "react";

const CategorySection = ({ register }) => {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="my-2 block text-sm font-semibold text-[var(--text-secondary)]  transition-colors duration-300">
            Category
          </span>

          <select
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-100 px-5 outline-none transition duration-300 focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            {...register("category", { required: true })}
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home & Garden</option>
            <option value="beauty">Beauty</option>
          </select>
        </label>

        <label className="block">
          <span className="my-2 block text-sm font-semibold text-[var(--text-secondary)]  transition-colors duration-300">
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

      <label className="block">
        <span className="my-2 block text-sm font-semibold text-[var(--text-secondary)]  transition-colors duration-300">
          Brand
        </span>

        <input
          type="text"
          placeholder="e.g. Apple"
          className="h-14 w-full text-[var(--text)] rounded-2xl border border-[var(--input-border)] focus:border-[var(--input-focus)]  bg-[var(--input-bg)] px-5 outline-none transition duration-300 focus:border-[var(--input-focus)]"
          {...register("brand")}
        />
      </label>
    </>
  );
};

export default CategorySection;
