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
import { LuSparkles } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";




export default function EditComponent({ isLoading, setisLoading , ids , popoup ,setshowPopup}) {
  const params = useParams() 
  const id = ids ? ids : params.id
  const { register, watch, reset, setValue, handleSubmit } = useForm();
  const [product, setproduct] = useState([]);
  const [status, setstatus] = useState(false);
  const [imagetoDelete, setimagetoDelete] = useState([]);
  const navigate = useNavigate();

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

  const onsubmit = (data) => {
    const newImages = product.images.filter(
      (image) => !imagetoDelete.includes(image.public_id),
    );
    const newData = {
      ...data,
      tags: product.tags,
      images: newImages,
    };

    setstatus(true)
    UpdateProduct(id, newData).then(() => {
      navigate("/products")
      setshowPopup(false)
      setisLoading(true)
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
    <div className="2xl:flex   mt-8">
      <div className={popoup ? "w-[50%] mt-20 md:w-full p-10 text-white" :" w-full 2xl:w-3/5 left-sec bg-card text-zinc-50 p-10"}>
        {isLoading ? (
          <div className="flex gap-10 items-center">
            <Skeleton width={80} className="skeltonDesign h-15" />
            <Skeleton width={480} count={2} className="skeltonDesign" />
          </div>
        ) : (
          <div className="title-content flex gap-5">
            <span className="bg-white/10 w-15 h-15 self-center flex justify-center items-center rounded-2xl">
              <LuImagePlus className="text-4xl text-violet-500" />
            </span>
            <div>
              <h5 className="text-3xl font-bold mt-3">Product Gallery</h5>
              <p className="mt-3 text-xl max-w-4xl text-white/85">
                Keep existing images, add new ones, or remove selected assets
                before saving.
              </p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div>
            <Skeleton width={350} className="skeltonDesign h-100 " />
          </div>
        ) : (
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
        )}

        {isLoading ? (
          <div className=" w-145 h-60 rounded-[50px]">
            {" "}
            <Skeleton className="skeltonDesign h-full " />{" "}
          </div>
        ) : (
          <div className="  w-full h-60 bg-gray-800 rounded-[50px] border-dashed border-violet-900 border-4">
            <label
              htmlFor="imageUploader"
              className=" flex flex-col justify-center items-center w-full  h-full "
            >
              <span className="bg-white/10 w-15 h-15 self-center flex justify-center items-center rounded-2xl">
                <LuImagePlus className="text-4xl text-violet-400" />
              </span>
              <p className="mt-2 text-xl  ">Add more images</p>
              <p className="mt-3 text-xl text-white/75 ">
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
          </div>
        )}

        {isLoading ? (
          <Skeleton className="skeltonDesign mt-15 h-50" />
        ) : (
          <div hidden={popoup} className="my-15 mb-30 bg-emerald-500/5 border border-emerald-400/10  py-10 px-7 rounded-4xl">
            <div className="flex ">
              <span className="text-2xl">
                <LuSparkles />
              </span>
              <span className="ml-2 text-xl ">Senior UX</span>
            </div>
            <p className="mt-2 text-xl">
              Edit without losing the existing product story, while still adding
              fresh media.
            </p>
          </div>
        )}
      </div>
      <div className={popoup ? "w-[50%] mt-20 p-10 md:w-full text-white"   :"right-sec w-full 2xl:w-3/5 p-10 2xl:ml-15 bg-card text-zinc-50 pt-20 " }>
        <form
          className="text-2xl font-bold capitalize flex flex-col  gap-5"
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
              <p>Description</p>
              <textarea
                id="description"
                className="inputDesign min-h-20"
                defaultValue={product.description}
                {...register("description")}
              />
            </label>
          )}
          <div className=" flex flex-col 2xl:grid  grid-cols-2 gap-15 gap-y-5 ">
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
            <label htmlFor="Category" className="labelDesign">
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

          <div className="bg-gray-700 min-h-55 p-3 rounded-2xl flex flex-col gap-3 ">
            {isLoading ? <Skeleton width={285} /> : <p>Tags</p>}

            {isLoading ? (
              <div className="flex justify-between">
                <Skeleton className="skeltonDesign p-3 mt-3" />
                <Skeleton width={100} className="skeltonDesign mt-3 p-3" />
              </div>
            ) : (
              <div className="flex justify-between">
                <input
                  type="text"
                  className="inputDesign"
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
                  className="bg-violet-800 p-5 rounded-2xl ml-5"
                  onClick={handelAddtags}
                >
                  add
                </button>
              </div>
            )}

            <div>
              {isLoading ? (
                <Skeleton />
              ) : (
                <div>
                  {product.tags.map((tag, i) => {
                    return (
                      <button
                        key={i}
                        type="button"
                        className="bg-green-950 p-3 rounded-2xl ml-3 mt-3"
                        onClick={() => handelDeletTag(tag)}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="flex gap-7">
              <Skeleton width={150} className="skeltonDesign" />
              <Skeleton width={150} className="skeltonDesign" />
            </div>
          ) : (
            <div className="flex ">
              <div className=" flex gap-3 w-45 bg-gray-700 p-5 rounded-2xl ml-5">
                <input
                  type="checkbox"
                  className="w-4"
                  {...register("featured")}
                  defaultChecked={product.featured}
                />
                <p>Featured</p>
              </div>
              <div className=" flex gap-3 w-45 bg-gray-700 p-5 rounded-2xl ml-5">
                <input
                  type="checkbox"
                  className="w-4"
                  {...register("isActive")}
                  defaultChecked={product.isActive}
                />
                <p>Active</p>
              </div>
            </div>
          )}

          <div className="h-0.5 w-6/6 my-auto bg-gray-700 " />

          {isLoading ? (
            <div className="flex gap-7">
              <Skeleton width={150} className="skeltonDesign" />
              <Skeleton width={150} className="skeltonDesign" />
            </div>
          ) : (
            <div>
              <button
                type="button"
                className="p-5 rounded-2xl ml-5 bg-gray-700"
              >
                <Link to={-1}>Cancel</Link>
              </button>
              <input
                type="submit"
                className="p-5 mt-10 rounded-2xl ml-5 bg-violet-800"
                disabled={status}
                value={status ? "Saving ...":"Save Changes"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
