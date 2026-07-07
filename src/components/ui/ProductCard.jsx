import React from "react";
const ProductCard = ({ image, name, subtitle }) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={image}
        alt={name}
        className="w-14 h-14 bg-[var(--border)] md:w-15 md:h-15 rounded-2xl object-cover"
      />

      <div>
        <h2 className="text-base font-semibold transition-all duration-300 text-[var(--text)]">
          {name}
        </h2>

        <p className="text-xs transition-all duration-300 text-[var(--text-secondary)]">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;



