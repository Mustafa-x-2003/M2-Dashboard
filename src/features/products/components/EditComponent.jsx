import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { GetProduct } from "../services/Editproduct";
import { UpdateProduct } from "../services/Editproduct";
import { handleUpload } from "../services/UploadImage";
import Input from "./Input";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { LuImagePlus } from "react-icons/lu";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import {
  FiImage,
  FiPlus,
  FiX,
  FiAlertCircle,
  FiCheckCircle,
  FiLoader,
} from "react-icons/fi";

import { LuSparkles } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

export default function EditComponent({
  isLoading,
  setisLoading,
  ids,
  popoup,
  setshowPopup,
}) {
  const params = useParams();
  const id = ids ? ids : params.id;
  const { register, watch, reset, setValue, handleSubmit } = useForm();
  const [product, setproduct] = useState([]);
  const [status, setstatus] = useState(false);
  const [imagetoDelete, setimagetoDelete] = useState([]);
  const navigate = useNavigate();
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    GetProduct(id)
      .then((res) => {
        const item = res.product;
        setproduct(item);
      })
      .catch((error) => {
        console.error("Load product failed", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  }, [id]);

  const handelDeletTag = (tagToRemove) => {
    setproduct({
      ...product,
      tags: product.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handelAddtags = (e) => {
    e.preventDefault();

    if (product.tags.includes(tagInput) || tagInput === "") {
      return;
    }
    setproduct((prevProduct) => ({
      ...prevProduct,
      tags: [...prevProduct.tags, tagInput],
    }));
    setValue("tags", "");
    setTagInput("");
  };

  const onsubmit = (data) => {
    const newImages = product.images.filter(
      (image) => !imagetoDelete.includes(image.public_id),
    );
    const newData = {
      ...data,
      tags: product.tags,
      images: newImages,
    };

    setstatus(true);
    UpdateProduct(id, newData).then(() => {
      navigate("/products");
      setshowPopup(false);
      setisLoading(true);
      console.log("product have been updated");
    });
  };

  const handleFormKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const result = await handleUpload(files);
    setproduct({ ...product, images: [...product.images, ...result] });
  };

  const handleMarkedImagetoDelete = (id) => {
    if (imagetoDelete.includes(id)) {
      setimagetoDelete(imagetoDelete.filter((image) => image != id));
    } else {
      setimagetoDelete([...imagetoDelete, id]);
    }
  };

  return (
    <div className=" bg-[var(--background)] pt-8 transition-colors duration-300 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
      <div
        className={
          popoup
            ? "w-[50%] mt-20 md:w-full p-10 text-white"
            : " w-full  left-sec bg-[var(--card)] border border-[var(--border)] rounded-4xl transition-colors duration-300 text-[var(--text)] p-10"
        }
      >
        {isLoading ? (
          <div className="flex gap-10 items-center">
            <Skeleton width={80} className="skeltonDesign h-15" />
            <Skeleton width={480} count={2} className="skeltonDesign" />
          </div>
        ) : (
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
        )}

        {isLoading ? (
          <div>
            <Skeleton width={350} className="skeltonDesign h-100 " />
          </div>
        ) : (
          // ========================
          <div className="img-parent mt-25 flex flex-wrap justify-between gap-y-12 my-10 ">
            {product.images.map((image, i) => {
              return (
                <div
                  className=" flex flex-col h-100 w-[45%] rounded-4xl relative "
                  key={image.public_id}
                >
                  <img
                    src={image.url}
                    id={image.public_id}
                    alt=""
                    className="h-full w-full object-cover overflow-hidden rounded-t-2xl"
                  />
                  <button
                    onClick={() => handleMarkedImagetoDelete(image.public_id)}
                  >
                    {" "}
                    <FaRegTrashAlt className=" trashicon text-[45px] absolute top-3 right-5 p-2 rounded-full  bg-gray-800 " />
                  </button>
                  <div className="w-full h-10 pl-10 bg-gray-800 rounded-b-3xl flex items-center p-2">
                    {!imagetoDelete.includes(image.public_id) ? (
                      <p>IMAGE {i + 1}</p>
                    ) : (
                      <p className="text-xl tracking-[.15em]">
                        Marked to Delete
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          // ===================================
        )}

        {isLoading ? (
          <div className=" w-145 h-60 rounded-[50px]">
            {" "}
            <Skeleton className="skeltonDesign h-full " />{" "}
          </div>
        ) : (
          // <div className="  w-full h-60 bg-gray-800 rounded-[50px] border-dashed border-violet-900 border-4">
          //   <label
          //     htmlFor="imageUploader"
          //     className=" flex flex-col justify-center items-center w-full  h-full "
          //   >
          //     <span className="bg-white/10 w-15 h-15 self-center flex justify-center items-center rounded-2xl">
          //       <LuImagePlus className="text-4xl text-violet-400" />
          //     </span>
          //     <p className="mt-2 text-xl  ">Add more images</p>
          //     <p className="mt-3 text-xl text-white/75 ">
          //       PNG, JPG, WEBP • multiple files supported
          //     </p>
          //     <input
          //       id="imageUploader"
          //       hidden
          //       type="file"
          //       multiple
          //       accept="image/*"
          //       onChange={handleImageUpload}
          //     />
          //   </label>
          // </div>

          <label
            htmlFor="imageUploader"
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
              id="imageUploader"
              hidden
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        )}

        {isLoading ? (
          <Skeleton className="skeltonDesign mt-15 h-50" />
        ) : (
          <div
            hidden={popoup}
            className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-500/5 dark:text-emerald-100 transition-colors duration-300"
          >
            <div className="flex items-center gap-2 font-semibold text-emerald-900 dark:text-emerald-50 transition-colors duration-300">
              <BsStars className="h-4 w-4 text-emerald-600 dark:text-emerald-400 transition-colors duration-300" />
              Senior UX
            </div>
            <p className="mt-1 text-emerald-700 dark:text-emerald-100/90 transition-colors duration-300">
              Edit without losing the existing product story, while still adding
              fresh media
            </p>
          </div>
        )}
      </div>

      {/* ================== */}

      <div
        className={
          popoup
            ? "w-[50%] mt-20 p-10 md:w-full text-white"
            : "right-sec  p-6  bg-[var(--card)] border border-[var(--border)] rounded-4xl transition-colors duration-300 text-zinc-50 pt-20 "
        }
      >
        <form
          className="  flex flex-col  gap-5"
          onSubmit={handleSubmit(onsubmit)}
          onKeyDown={handleFormKeyDown}
        >
          <Input
            type="text"
            name="name"
            value={product.name}
            title="Product Name"
            isLoading={isLoading}
            register={register}
          />
          <Input
            type="text"
            name="shortDescription"
            value={product.shortDescription}
            title="Short Description"
            isLoading={isLoading}
            register={register}
          />
          {isLoading ? (
            <div>
              <Skeleton width={295} className="mb-7" />
              <Skeleton className="skeltonDesign" />
            </div>
          ) : (
            <label htmlFor="description" className="labelDesign">
              <span className=" block text-sm font-semibold text-[var(--)] dark:text-slate-200 transition-colors duration-300">
                Description
              </span>
              <textarea
                rows={5}
                id="description"
                className="w-full rounded-2xl border text-[var(--text)] border border-[var(--input-border)] bg-[var(--background)] p-3 outline-none transition-colors duration-300 focus:border-[var(--input-focus)] bg-[var(--background)]"
                defaultValue={product.description}
                {...register("description")}
              />
            </label>
          )}
          <div className=" grid gap-5 md:grid-cols-2 ">
            <Input
              styling=""
              name="price"
              value={product.price}
              title="Price"
              type="number"
              isLoading={isLoading}
              register={register}
            />
            <Input
              name="discountPrice"
              value={product.discountPrice}
              title="Discount Price"
              type="number"
              isLoading={isLoading}
              register={register}
            />
            <Input
              name="stock"
              value={product.stock}
              title="Stock"
              type="number"
              isLoading={isLoading}
              register={register}
            />
            <Input
              name="sku"
              value={product.sku}
              title="SKU"
              type="text"
              isLoading={isLoading}
              register={register}
            />
            {/* <label htmlFor="Category" className="labelDesign">
              {isLoading ? <Skeleton width={285} /> : " Category"}
              {isLoading ? (
                <Skeleton className="skeltonDesign" />
              ) : (
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
              )}
            </label> */}

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-300">
                Category
              </span>
              <select
                defaultValue={product.category}
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
            {isLoading ? (
              <div>
                <Skeleton width={285} className="skeltonDesign" />
                <Skeleton className="skeltonDesign" />
              </div>
            ) : (
              <Input
                name="subcategory"
                value={product.subcategory}
                title="Subcategory"
                type="text"
                register={register}
              />
            )}
          </div>

          <Input
            name="brand"
            value={product.brand}
            title="Brand"
            type="text"
            isLoading={isLoading}
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
                  {...register("tags")}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handelAddtags(e);
                    }
                  }}
                  className="h-14 flex-1 rounded-2xl border border-[var(--border)] bg-[var(--background)] text-[var(--text)] px-5 outline-none transition duration-300 focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handelAddtags}
                  className=" inline-flex items-center justify-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 select-none   dark:shadow-none rounded-2xl bg-cyan-500 text-white hover:bg-cyan-400"
                >
                  <FiPlus className="h-5 w-5" />
                </button>
              </div>
              {/* Hidden field to carry tags into react-hook-form data */}
              <input type="hidden" {...register("tags")} />
            </label>
            <div className="mt-4 flex flex-wrap gap-2">
              {isLoading || product.tags.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-300 transition-colors duration-300">
                  Add one or more tags to organize the product.
                </p>
              ) : (
                product.tags.map((tag, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handelDeletTag(tag)}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] border border-emerald-200  bg-emerald-50 p-4 text-sm text-emerald-800  dark:border-emerald-400/20 dark:bg-emerald-500/5 dark:text-emerald-100 transition-colors duration-300 px-3 py-2 text-xs font-semibol"
                  >
                    {tag}
                    <FiX className="h-3.5 w-3.5" />
                  </button>
                ))
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="flex gap-7">
              <Skeleton width={150} className="skeltonDesign" />
              <Skeleton width={150} className="skeltonDesign" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-5 py-4 dark:border-slate-800 dark:bg-slate-950 dark:text-white transition-colors duration-300">
                <input
                  type="checkbox"
                  {...register("featured")}
                  defaultChecked={product.featured}
                />
                Featured
              </label>
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-5 py-4 dark:border-slate-800 dark:bg-slate-950 dark:text-white transition-colors duration-300">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  defaultChecked={product.isActive}
                />
                Active
              </label>
            </div>
          )}

          <div className="h-0.5 w-6/6 my-auto bg-gray-700 " />

          {isLoading ? (
            <div className="flex gap-7">
              <Skeleton width={150} className="skeltonDesign" />
              <Skeleton width={150} className="skeltonDesign" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={isLoading}
                className="relative inline-flex items-center justify-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 select-none rounded-2xl bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-white"
              >
                Cancel
              </button>

              <input
                type="submit"
                className=" inline-flex items-center justify-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 select-none   dark:shadow-none rounded-2xl bg-cyan-500 text-white hover:bg-cyan-400"
                disabled={status}
                value={status ? "Saving ..." : "Save Changes"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
