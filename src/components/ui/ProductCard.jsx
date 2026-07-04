import React from "react";

const ProductCard = ({ image, name, subtitle }) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={image}
        alt={name}
        className="w-14 h-14 rounded-2xl object-cover"
      />

      <div>
        <h2 className="text-base font-semibold text-slate-900">
          {name}
        </h2>

        <p className="text-xs text-gray-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;




// const ProductCard = ({ image, name, subtitle, price, }) => {
//     return (
//         <>
//             <div className="flex  border border-red-100 w-full  items-center p-4 mt-3 gap-4 bg-gray-100 rounded-2xl shadow-sm ">
//                 <img src={image} alt={name} className="w-14 h-14 md:w-15 md:h-15  object-cover rounded-2xl " />
//                 <div>
//                     <h2 className="text-base font-semibold text-gray-900 md:text-sm text-xs">{name}</h2>
//                     <p className="text-xs text-gray-500 truncate">{product.totalSold} units sold • ${product.revenue?.toLocaleString()} </p>
//                 </div>
//             </div>

//         </>
//     )
// }