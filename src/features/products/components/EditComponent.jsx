import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { GetProduct, UpdateProduct } from "../services/Editproduct";
import { handleUpload } from "../services/UploadImage";
import Input from "./Input";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LuImagePlus, LuSparkles } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import SkeltonWarpper from "./SkeltonWarpper";
import ImagePreview from "./ImagePreview";
import FormComponent from "./FormComponent";

export default function EditComponent({
  isLoading,
  setisLoading,
  ids,
  popoup,
  setshowPopup,
  theme,
}) {
  const params = useParams();
  const id = ids ? ids : params.id;
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
      setisLoading(true);
      if (popoup) {
        setshowPopup(false);
      }
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

  return (
    <div className="2xl:flex   mt-8 border border-[var(--border)]">
      <div
        className={
          popoup
            ? "w-[50%] mt-20 md:w-full p-10 shadow-4xl"
            : " w-full 2xl:w-3/5 left-sec bg-card  p-10 shadow-4xl"
        }
      >
        <div className="title-content flex items-center gap-5 ">
          <SkeltonWarpper isloading={isLoading} width={80} style="h-15">
            <span className="bg-violet-500/15 w-15 h-15 self-center flex justify-center items-center rounded-2xl">
              <LuImagePlus className="text-4xl text-violet-500" />
            </span>
          </SkeltonWarpper>
          <SkeltonWarpper isloading={isLoading} width={480} count={2}>
            <div>
              <h5 className="text-3xl font-bold mt-3">Product Gallery</h5>
              <p className="mt-3 text-xl max-w-4xl ">
                Keep existing images, add new ones, or remove selected assets
                before saving.
              </p>
            </div>
          </SkeltonWarpper>
        </div>

        {/*  */}
        <ImagePreview
          isLoading={isLoading}
          product={product}
          imagetoDelete={imagetoDelete}
          setimagetoDelete={setimagetoDelete}
        />

        <SkeltonWarpper isloading={isLoading} style="h-65" width={680}>
          <div className="  w-full h-60 bg-violet-400/10 hover:bg-violet-400/20 hover:cursor-pointer rounded-[50px] border-dashed border-violet-900 border-4">
            <label
              htmlFor="imageUploader"
              className=" flex flex-col justify-center items-center w-full  h-full "
            >
              <span className="bg-violet-500/10 w-15 h-15 self-center flex justify-center items-center rounded-2xl">
                <LuImagePlus className="text-4xl text-violet-400" />
              </span>
              <p className="mt-2 text-xl  ">Add more images</p>
              <p className="mt-3 text-xl">
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
        </SkeltonWarpper>

        <SkeltonWarpper isloading={isLoading} style="mt-10 h-60" width={680}>
          <div
            hidden={popoup}
            className="my-15 mb-30 bg-emerald-500/5 border border-emerald-400/10  py-10 px-7 rounded-4xl"
          >
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
        </SkeltonWarpper>
      </div>

      <div
        className={
          popoup
            ? "w-[50%] mt-20 p-10 md:w-full text-white shadow-4xl"
            : "right-sec w-full 2xl:w-3/5 p-10 2xl:ml-15 bg-card text-zinc-50 pt-20 shadow-4xl "
        }
      >
        <form onSubmit={handleSubmit(onsubmit)} onKeyDown={handleFormKeyDown}>
          <FormComponent
            register={register}
            product={product}
            isLoading={isLoading}
            setproduct={setproduct}
            watch={watch}
            setValue={setValue}
            status={status}
          />
        </form>
      </div>
    </div>
  );
}
