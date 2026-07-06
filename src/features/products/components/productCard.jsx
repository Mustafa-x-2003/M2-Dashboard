import { MdOutlineRemoveRedEye } from "react-icons/md";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineLightningBolt, HiShoppingCart } from "react-icons/hi";
import { useState } from "react";
import ImagesList from "./imagesLIst";
import CategoryCardList from "./categoryCardLIst";

export default function ProductCard({ isUser, product, onEdit, onDelete, onView, AddToCart }) {
    const [clickAdd, setClickAdd] = useState(false);

    const hasDiscount = Number(product.discountPrice) && Number(product.discountPrice) !== 0;
    const saving = hasDiscount ? product.price - product.discountPrice : 0;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">

            <div className="relative overflow-hidden">
                <ImagesList featured={product.featured} images={product.images} />

                <div className="absolute bottom-2 left-2">
                    {Number(product.stock) === 0 ? (
                        <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                            Out of Stock
                        </span>
                    ) : (
                        <span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                            {product.stock} in stock
                        </span>
                    )}
                </div>
            </div>

            <div className="p-4 flex flex-col gap-3 flex-1">

                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {[product.category, product.subcategory, product.brand]
                        .filter(Boolean)
                        .join(" · ")}
                </p>

                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-800 text-base leading-snug line-clamp-2 flex-1">{product.name}</h3>
                    <button
                        onClick={() => onView(product)}
                        className="flex-shrink-0 text-gray-400 hover:text-teal-500 transition-colors duration-200 mt-0.5"
                        title="View details"
                    >
                        <MdOutlineRemoveRedEye className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">{product.shortDescription}</p>

                <div>
                    {hasDiscount ? (
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-xl font-bold text-gray-900">${product.price}</span>
                            <span className="text-sm font-medium text-red-400 line-through">${product.discountPrice} off</span>
                        </div>
                    ) : (
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    )}
                </div>

                <CategoryCardList cats={product.tags} />

                <div className="flex flex-col gap-2 mt-auto pt-2 border-t border-gray-50">
                    {!isUser && (
                        <div className="grid grid-cols-3 gap-1.5">
                            <button
                                onClick={() => onView(product)}
                                className="flex items-center justify-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg transition-all duration-200 active:scale-95"
                            >
                                <MdOutlineRemoveRedEye className="text-sm" /> View
                            </button>
                            <button
                                onClick={() => onEdit(product)}
                                className="flex items-center justify-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 py-2 rounded-lg transition-all duration-200 active:scale-95"
                            >
                                <HiOutlinePencil className="text-sm" /> Edit
                            </button>
                            <button
                                onClick={() => onDelete(product._id)}
                                className="flex items-center justify-center gap-1 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 py-2 rounded-lg transition-all duration-200 active:scale-95"
                            >
                                <HiOutlineTrash className="text-sm" /> Delete
                            </button>
                        </div>
                    )}

                    {isUser && (
                        <button
                        onClick={() => {
                            AddToCart(product);
                            setClickAdd(!clickAdd);
                        }}
                        className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95
                            ${clickAdd 
                                ? "bg-red-50 text-red-500 hover:bg-red-100 border border-red-200"
                                : "bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-100"
                            }`}
                    >
                        <HiShoppingCart className="text-base" />
                        {clickAdd ? "Remove from Cart" : "Add to Cart"}
                    </button>
                    )}
                </div>
            </div>
        </div>
    )
}