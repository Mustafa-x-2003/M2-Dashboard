import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import {
    getProductById,
    updateProduct,
    createProduct,
} from "../../services/productsApi";
import { handleUpload } from "../../services/UploadImage";
// import { handleUpload } from "../services/UploadImage";
import Input from "../Input";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LuImagePlus } from "react-icons/lu";
import { LuSparkles } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function FormProducts({ mode = "edit", id, refresh, setshowPopup, popoup, }) {
 
    const { register, watch, reset, setValue, handleSubmit } = useForm();

    const [product, setProduct] = useState({

        name: "",

        shortDescription: "",

        description: "",

        price: "",

        discountPrice: "",

        stock: "",

        sku: "",

        category: "",

        subcategory: "",

        brand: "",

        images: [],

        tags: []

    })
    const [status, setstatus] = useState(false);
    const [imagetoDelete, setimagetoDelete] = useState([]);
    const [featured, setFeatured] = useState(false);
    const [active, setActive] = useState(false);


    useEffect(() => {
        if (mode !== "edit") return;

        getProductById(id).then((res) => {
            const item = res.data.product;

            setProduct(item);
            setFeatured(item.featured);
            setActive(item.isActive);

            reset({
                ...item,
                tags: item.tags.join(", "),
            });
        });

    }, [id, mode, reset]);



    const handelDeletTag = (tagToRemove) => {
        setProduct({
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
        setProduct((prevProduct) => ({
            ...prevProduct,
            tags: [...prevProduct.tags, tag],
        }));
        setValue("tags", "");
    };

    const onsubmit = async (data) => {
        try {
            setstatus(true);

            let images;

            if (mode === "edit") {

                images = product.images.filter(
                    image => !imagetoDelete.includes(image.public_id)
                );

            } else {

                images = product.images;

            }

            const newData = {
                name: data.name,
                shortDescription: data.shortDescription,
                description: data.description,
                price: Number(data.price),
                discountPrice: Number(data.discountPrice),
                stock: Number(data.stock),
                sku: data.sku,
                category: data.category,
                subcategory: data.subcategory,
                brand: data.brand,

                featured,
                isActive: active,

                tags: (data.tags || "")
                    .split(",")
                    .map(tag => tag.trim())
                    .filter(Boolean),

                images,
            };


            console.log("Sending Data:", newData);


            if (mode === "edit") {
                await UpdateProduct(id, newData);

                const res = await GetProduct(id);

                setProduct(res.product);

                reset({
                    ...res.product,
                    tags: res.product.tags,
                });
            } else {
                await createProduct(
                    newData,
                    newData.tags,
                    product.images
                );
            }
            refresh?.();
            setshowPopup?.(false);

        } catch (error) {
            // console.error(error);
            console.log("Full Error:", error.response?.data);
            console.log("Validation Errors:", error.response?.data?.errors);
        } finally {
            setstatus(false);
        }
    };

    const handleFormKeyDown = (e) => {
        if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
        }
    };

    const handleImageUpload = async (e) => {

        const files = Array.from(e.target.files);

        if (mode === "edit") {

            const uploaded = await handleUpload(files);

            setProduct(prev => ({

                ...prev,

                images: [
                    ...prev.images,
                    ...uploaded
                ]

            }));

        } else {

            setProduct(prev => ({

                ...prev,

                images: [
                    ...prev.images,
                    ...files
                ]

            }));

        }

    }

    const handleMarkedImagetoDelete = (id) => {
        if (imagetoDelete.includes(id)) {
            setimagetoDelete(imagetoDelete.filter((image) => image != id));
        } else {
            setimagetoDelete([...imagetoDelete, id]);
        }
    };

    const removeImage = (image, index) => {

        if (mode === "edit") {

            handleMarkedImagetoDelete(image.public_id);

        } else {

            setProduct(prev => ({

                ...prev,

                images: prev.images.filter((_, i) => i !== index)

            }));

        }

    }
   
    return (
        <div className={popoup ? "flex flex-col xl:flex-row" : "xl:flex mt-8"}>

            <div
                className={
                    popoup
                        ? "w-full xl:w-1/2 p-10 text-[var(--text)]"
                        : "w-full 2xl:w-3/5 left-sec bg-card p-10 text-[var(--text)]"
                }
            >


                <div className="flex items-start gap-4 ">
                    <div className="w-10 h-10 rounded-2xl bg-violet-100 flex items-center justify-center">
                        <LuImagePlus className="text-lg text-violet-600" />
                    </div>

                    <div>
                        <h2 className="text-meduim font-bold text-[var(--text)]">
                            Product Gallery
                        </h2>

                        <p className="text-xs text-gray-500 ">
                            Upload and manage images
                        </p>
                    </div>
                </div>



                <div className="grid grid-cols-1  xl:grid-cols-2  gap-4 mt-6">


                    {product.images.map((image, i) => {

                        const imageSrc =
                            image.url || URL.createObjectURL(image);
                        return (
                            <div
                                key={image.public_id || i}
                                className=" group relative rounded-3xl overflow-hidden  shadow-sm "
                            >
                                <img
                                    src={imageSrc}
                                    
                                    id={image.public_id}
                                    alt=""
                                    className="h-36 w-full object-cover rounded-t-2xl "

                                />
                                <button
                                    onClick={() => removeImage(image, i)}
                                    className="absolute top-3 right-3 bg-gray-800 text-white rounded-full p-2  opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 cursor-pointer"
                                >
                                    <IoClose />
                                </button>

                                <div className="absolute bottom-3 left-3 bg-gray-800/40 text-white text-xs rounded-full p-2 ">
                                    <p className="" >IMAGE {i + 1}</p>


                                </div>
                            </div>
                        );
                    })}



                </div>



                <div className="  w-full py-6 flex mt-6 justify-center items-center text-center rounded-3xl border-2 border-dashed border-cyan-400/30 bg-cyan-500/5">
                    <label
                        htmlFor="imageUploader"
                        className="  w-full  "
                    >
                        <span className="bg-white/10 w-10 h-10  rounded-2xl">
                            <LuImagePlus className="text-2xl text-violet-400 m-auto" />
                        </span>
                        <p className="mt-2 text-sm  ">Click to upload images</p>
                        <p className="mt-3 text-xs text-gray-300 ">
                            PNG, JPG, WEBP
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





            </div>
            <div
                className={
                    popoup
                        ? "w-full xl:w-1/2 p-10 text-[var(--text)]"
                        : "right-sec w-full 2xl:w-3/5 p-10 2xl:ml-15 text-zinc-50 "
                }
            >

                <form className="flex flex-col gap-5"
                    onSubmit={handleSubmit(onsubmit)}
                    onKeyDown={handleFormKeyDown}
                >
                    <Input
                        type="text"
                        name="name"

                        title="Product Name"
                        register={register}
                        className="w-full outline-none bg-gray-100 p-4 mb-2 rounded-xl text-gray-200 border border-gray-200"
                    />
                    <Input
                        type="text"
                        name="shortDescription"

                        title="Short Description"
                        register={register}
                    />

                    <label htmlFor="description" className="flex flex-col gap-2  ">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Description
                        </p>
                        <textarea
                            id="description"
                            // className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none focus:border-cyan-300"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-5 py-4 outline-none"


                            {...register("description")} minLength={20} rows={3}
                        />
                    </label>

                    <div className=" flex flex-col 2xl:grid  grid-cols-2 gap-4 ">
                        <Input
                            styling=""
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
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Category
                            </p>

                            <select

                                {...register("category")}
                                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-100 px-5 outline-none transition duration-300 focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white"

                                // className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-2 text-slate-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                            >
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
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Tags
                            </p>

                            <input
                                type="text"
                                placeholder="apple, phone"
                                {...register("tags")}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-2 text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                            />
                        </label>

                    </div>





                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={() => setFeatured(!featured)}
                            className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition
      ${featured
                                    ? "border-cyan-200 bg-cyan-50 text-cyan-600"
                                    : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300"
                                }`}
                        >
                            <span
                                className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition
        ${featured
                                        ? "border-cyan-500 bg-cyan-500"
                                        : "border-slate-300"
                                    }`}
                            >
                                {featured && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                                )}
                            </span>

                            Featured
                        </button>

                        <button
                            type="button"
                            onClick={() => setActive(!active)}
                            className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition
      ${active
                                    ? "border-cyan-200 bg-cyan-50 text-cyan-600"
                                    : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300"
                                }`}
                        >
                            <span
                                className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition
        ${active
                                        ? "border-cyan-500 bg-cyan-500"
                                        : "border-slate-300"
                                    }`}
                            >
                                {active && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                                )}
                            </span>

                            Active
                        </button>

                    </div>

                    <hr className="bg-gray-100/10 mt-4" />

                    <div className="flex gap-4 mt-6">
                        <button
                            type="button"
                            className="px-6 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                        >
                            <Link to={-1}>Cancel</Link>
                        </button>
                        <input
                            type="submit"
                            disabled={status}
                            value={
                                status
                                    ? mode === "edit"
                                        ? "Saving..."
                                        : "Creating..."
                                    : mode === "edit"
                                        ? "Save Changes"
                                        : "Create Product"
                            }
                            className="px-6 py-3 rounded-xl bg-cyan-500 text-white hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                </form>
            </div>
        </div>
    )
}
