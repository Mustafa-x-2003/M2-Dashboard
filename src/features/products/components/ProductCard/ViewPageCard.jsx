import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    FiArrowLeft,
    FiEye,
    FiTag,
    FiShoppingBag,
    FiStar,
} from "react-icons/fi";
import { getProductById } from "../../services/productsApi";
export default function ViewPageCard() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);

                console.log(response.data);

                setProduct(response.data.product);
            } catch (error) {
                console.error(error);
                console.log(response.data);
            }
        };

        fetchProduct();
    }, [id]);



    if (!product) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6 bg-slate-100 min-h-screen">

            {/* Header */}

            <div className="rounded-3xl bg-gradient-to-r from-slate-950 to-slate-800 p-8 text-white">

                <button
                    onClick={() => navigate(-1)}
                    className="mb-5 flex items-center gap-2 text-white/80 hover:text-white"
                >
                    <FiArrowLeft />
                    Back
                </button>

                <div className="flex items-center gap-3">
                    <FiEye size={26} />

                    <div>
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="text-sm text-white/60">
                            Product details overview
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                {/* Images */}

                <div>

                    <div className="overflow-hidden rounded-3xl bg-white shadow">

                        <img
                            src={product.images[currentImage]?.url}
                            alt={product.name}
                            className="h-[430px] w-full object-cover"
                        />

                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-3">

                        {product.images.map((img, index) => (

                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`overflow-hidden rounded-2xl border-2 transition ${currentImage === index
                                        ? "border-blue-500"
                                        : "border-gray-200"
                                    }`}
                            >
                                <img
                                    src={img.url}
                                    className="h-20 w-full object-cover"
                                    alt=""
                                />
                            </button>

                        ))}

                    </div>

                </div>

                {/* Right */}

                <div className="space-y-5">

                    {/* Overview */}

                    <div className="rounded-3xl bg-white p-6 shadow">

                        <p className="text-sm uppercase text-blue-500">
                            Overview
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {product.name}
                        </h2>

                        <p className="mt-4 text-gray-600">
                            {product.description}
                        </p>

                    </div>

                    {/* Stats */}

                    <div className="grid grid-cols-2 gap-4">

                        <div className="rounded-2xl bg-white p-5 shadow">
                            <p className="text-xs uppercase text-gray-500">
                                Price
                            </p>

                            <h3 className="mt-2 text-xl font-bold">
                                ${product.price}
                            </h3>
                        </div>

                        <div className="rounded-2xl bg-white p-5 shadow">
                            <p className="text-xs uppercase text-gray-500">
                                Discount
                            </p>

                            <h3 className="mt-2 text-xl font-bold text-green-600">
                                ${product.discountPrice}
                            </h3>
                        </div>

                        <div className="rounded-2xl bg-white p-5 shadow">
                            <p className="text-xs uppercase text-gray-500">
                                Stock
                            </p>

                            <h3 className="mt-2 text-xl font-bold">
                                {product.stock}
                            </h3>
                        </div>

                        <div className="rounded-2xl bg-white p-5 shadow">
                            <p className="text-xs uppercase text-gray-500">
                                SKU
                            </p>

                            <h3 className="mt-2 text-xl font-bold">
                                {product.sku}
                            </h3>
                        </div>

                    </div>

                    {/* Tags */}

                    <div className="rounded-3xl bg-white p-5 shadow">

                        <div className="flex items-center gap-2 font-semibold">
                            <FiTag />
                            Tags
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">

                            {product.tags?.map((tag, index) => (

                                <span
                                    key={index}
                                    className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                                >
                                    #{tag}
                                </span>

                            ))}

                        </div>

                    </div>

                    {/* Category */}

                    <div className="rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50 p-5">

                        <div className="flex items-center gap-2 font-semibold">
                            <FiShoppingBag />
                            Category Info
                        </div>

                        <div className="mt-3 text-sm text-gray-600">
                            {product.category} • {product.subcategory} • {product.brand}
                        </div>

                    </div>

                    {/* Highlight */}

                    <div className="rounded-3xl bg-amber-50 p-5">

                        <div className="flex items-center gap-2 font-semibold">
                            <FiStar />
                            Highlights
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                            {product.shortDescription}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}