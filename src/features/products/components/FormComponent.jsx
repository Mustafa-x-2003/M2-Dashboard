import React from 'react'
import { Link } from 'react-router';
import { BasicFiled, GridFiled } from "./Input";
import Input from './Input';
import SkeltonWarpper from './SkeltonWarpper';
import { RxCross2 } from "react-icons/rx";
export default function FormComponent({product , setproduct, register , watch , setValue, isLoading , status}) {
     const handelDeletTag = (tagToRemove) => {
        setproduct({
          ...product,
          tags: product.tags.filter((tag) => tag !== tagToRemove),
        });
      };
    
      const handelAddtags = (e) => {
        e.preventDefault();
        const tag = watch("tags").trim();
        if (!tag) {
          return;
        }
        if (product.tags.includes(tag)) {
          return;
        }
        setproduct((prevProduct) => ({
          ...prevProduct,
          tags: [...prevProduct.tags, tag],
        }));
        setValue("tags", "");
      };
  return (
  <div className="text-2xl font-bold capitalize flex flex-col  gap-5">
       {BasicFiled.map((item) => {
                return (
                  <Input
                    type={item.type}
                    name={item.name}
                    value={product[item.key]}
                    isLoading={isLoading}
                    register={register}
                    title={item.title}
                  />
                );
              })}
    
              <SkeltonWarpper isloading={isLoading}>
                <label htmlFor="description" className="labelDesign">
                  <p>Description</p>
                  <textarea
                    id="description"
                    className="inputDesign min-h-40"
                    defaultValue={product.description}
                    {...register("description")}
                  />
                </label>
              </SkeltonWarpper>
    
              <div className=" flex flex-col 2xl:grid  grid-cols-2 gap-15 gap-y-5 ">
                {GridFiled.map((item) => {
                  return (
                    <Input
                      type={item.type}
                      name={item.name}
                      value={product[item.key]}
                      isLoading={isLoading}
                      register={register}
                      title={item.title}
                    />
                  );
                })}
    
                <SkeltonWarpper isloading={isLoading}>
                  <label htmlFor="Category" className="labelDesign">
                    Category
                    <select
                      className="inputDesign w-full"
                      defaultValue={product.category}
                      {...register("category")}
                    >
                      <option value="electronics">electronics</option>
                      <option value="phones">phones</option>
                      <option value="fashion">fashion</option>
                      <option value="home">home</option>
                      <option value="beauty">beauty</option>
                      <option value="sport">sport</option>
                    </select>
                  </label>
                </SkeltonWarpper>
    
                <Input
                  name="subcategory"
                  value={product.subcategory}
                  title="Subcategory"
                  type="text"
                  register={register}
                  isLoading={isLoading}
                />
              </div>
    
              <Input
                name="brand"
                value={product.brand}
                title="Brand"
                type="text"
                isLoading={isLoading}
                register={register}
              />
    
              <div className=" bg-[var(--surface-secondary)] min-h-55 p-7 rounded-3xl text-[var(--text)] font-medium flex flex-col gap-3 ">
                <SkeltonWarpper width={285} isloading={isLoading} style="mt-7">
                  {" "}
                  <p className="mt-3 ml-3">Tags</p>
                </SkeltonWarpper>
    
                <SkeltonWarpper isloading={isLoading}>
                  <div className="flex justify-between">
                    <input
                      type="text"
                      className="inputDesign text-2xl "
                      placeholder='Type a tag or press + '
                      {...register("tags")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handelAddtags(e);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="bg-violet-800/55 hover:bg-violet-800/70 hover:cursor-pointer border border-violet-800/30 p-5 px-7  rounded-2xl ml-5"
                      onClick={handelAddtags}
                    >
                      +
                    </button>
                  </div>
                </SkeltonWarpper>
    
                <div>
                  <SkeltonWarpper isloading={isLoading}>
                    <div className='flex'>
                      {product.tags?.map((tag, i) => {
                        return (
                          <button
                            key={i}
                            type="button"
                            className= "flex gap-4 items-center justify-center text-xl hover:cursor-pointer border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 p-4 px-5 rounded-full ml-3 mt-3"
                            onClick={() => handelDeletTag(tag)}
                          >
                           # {tag}
                            <RxCross2 />
                          </button>
                        );
                      })}
                    </div>
                  </SkeltonWarpper>
                </div>
              </div>
    
              <div className="flex my-6 ">
                <SkeltonWarpper width={150} isloading={isLoading} style="h-10">
                  <div className=" flex gap-3 w-45 bg-[var(--surface-secondary)] border border-[var(--border)]  text-[var(--text)] p-5 rounded-2xl ml-1">
                    <input
                      type="checkbox"
                      className="w-4"
                      {...register("featured")}
                      defaultChecked={product.featured}
                    />
                    <p>Featured</p>
                  </div>
                </SkeltonWarpper>
                <SkeltonWarpper width={150} isloading={isLoading} style="h-10 ml-7">
                  <div className=" flex gap-3 w-45 bg-[var(--surface-secondary)] border border-[var(--border)]  text-[var(--text)]  p-5 rounded-2xl ml-5">
                    <input
                      type="checkbox"
                      className="w-4"
                      {...register("isActive")}
                      defaultChecked={product.isActive}
                    />
                    <p>Active</p>
                  </div>
                </SkeltonWarpper>
              </div>
    
              <div className="h-0.5 w-6/6 my-auto bg-gray-700 " />
    
              <div className="flex gap-2 items-center pt-6">
                <SkeltonWarpper isloading={isLoading} width={150} style="h-10">
                  <Link to={-1}>
                    {" "}
                    <button
                      type="button"
                      className="px-5  rounded-2xl ml-1 bg-gray-700/90 hover:bg-gray-700 hover:cursor-pointer h-20"
                    >
                      Cancel
                    </button>
                  </Link>
                </SkeltonWarpper>
                <SkeltonWarpper isloading={isLoading} width={150} style="h-10">
                  <input
                    type="submit"
                    className="p-5  rounded-2xl ml-5 bg-violet-800/80 hover:bg-violet-800"
                    disabled={status}
                    value={status ? "Saving ..." : "Save Changes"}
                  />
                </SkeltonWarpper>
              </div>
  </div>
  )
}
