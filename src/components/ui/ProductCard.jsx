import React from "react";
const ProductCard = ({ image, name, subtitle, price }) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={image}
        alt={name}
        className="w-14 h-14 bg-[var(--border)] md:w-15 md:h-15 rounded-2xl object-cover"
      />

      <div className="flex  justify-between gap-15 ">

        <div>
          <h2 className={`text-base font-semibold transition-all duration-300  text-[var(--text)] ${price ?'overflow-hidden whitespace-nowrap text-ellipsis w-50':''}  `}>
            {name}
          </h2>

          <p className="text-xs transition-all duration-300 text-[var(--text-secondary)]">
            {subtitle}
          </p>
        </div>

        <h2 className="text-[var(--text)] text-[18px] w-20">{price} </h2>

      </div>
    </div>
  );
};

export default ProductCard;
