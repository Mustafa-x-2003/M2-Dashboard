import React from "react";
const ProductCard = ({ image, name, subtitle }) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={image}
        alt={name}
        className="w-14 h-14 md:w-15 md:h-15 rounded-2xl object-cover"
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



