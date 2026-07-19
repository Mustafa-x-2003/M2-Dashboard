import Input from "../Input";

export default function QuickEditDetails({
  register,
 
}) {
  return (
    <>
      <Input
        type="text"
        name="name"
        title="Product Name"
        register={register}
       
      />

      <Input
        type="text"
        name="shortDescription"
        title="Short Description"
        register={register}
        
      />

      <label className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Description
        </p>

        <textarea
          id="description"
          {...register("description")}
          rows={3}
          minLength={20}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition duration-300 focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white" />
      </label>

      <div className="flex flex-col 2xl:grid grid-cols-2 gap-4">
        <Input
          name="price"
          title="Price"
          type="number"
          register={register}
          
        />

        <Input
          name="discountPrice"
          title="Discount Price"
          type="number"
          register={register}
         
        />

        <Input
          name="stock"
          title="Stock"
          type="number"
          register={register}
        />

        <Input
          name="sku"
          title="SKU"
          type="text"
          register={register}
         
        />

        <label className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Category
          </p>

          <select {...register("category")} className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-100 px-5 text-slate-700 outline-none transition duration-300 focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
            <option value="electronics">Electronics</option>
            <option value="phones">Phones</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
            <option value="beauty">Beauty</option>
            <option value="sport">Sport</option>
          </select>
        </label>

        <Input
          name="subcategory"
          title="Subcategory"
          type="text"
          register={register}
          
        />

        <Input
          name="brand"
          title="Brand"
          type="text"
          register={register}
          
        />

        <label className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider px-2 py-1 text-slate-500 dark:text-slate-400">
            Tags
          </p>

          <input
            type="text"
            placeholder="apple, phone"
            
            {...register("tags")}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-100 px-5 outline-none transition duration-300 focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white" />
        </label>
      </div>
    </>
  );
}