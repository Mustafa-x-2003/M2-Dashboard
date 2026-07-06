import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useState } from "react";
import ImagesList from "./imagesLIst";
import CategoryCardList from "./categoryCardLIst";
export default function ProductCard({isUser, product, onEdit, onDelete , onView ,AddToCart}){
    const [clickAdd, setClickAdd] = useState(false);
    return(
        <>
         <div key={product._id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-3 ">
      <ImagesList images={product.images}/>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <button onClick={()=> onView(product)} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-alias">
          <span>view</span>
          <MdOutlineRemoveRedEye className="inline-block w-5 h-5 ml-1" />
        </button>
      </div>
      <p className="text-gray-500 text-sm line-clamp-2">{product.shortDescription}</p>

      <div className="flex items-center justify-between">
        <span className="text-blue-600 font-bold ">${product.price}</span>
        <span className="text-sm text-gray-400">{product.stock} in stock</span>
      </div>
      <div>
        <CategoryCardList cats={product.tags}/>
      </div>
      <div className="flex flex-col gap-2 mt-auto">
        {!isUser &&<div className="flex gap-2 mt-auto">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm"
          >
            Delete
          </button>
        </div>
        }
          <button
            onClick={() => {
                AddToCart(product) 
                setClickAdd(!clickAdd)
            }
            }
            
            className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm "
            style={{
                backgroundColor: clickAdd ? "#ef4444" : "#2563eb",
            }}
          >{clickAdd ? "Remove from Cart" : "Add to Cart"}</button>
      </div>
    </div>
        </>
    )
}