import React from "react";
const ProductCard = ({ image, name, subtitle, price }) => {
  return (
    <div className="flex items-center   gap-4">
      <img
        src={image}
        alt={name}
        className="w-14 h-14 bg-[var(--card)] transition-colors duration-300  md:w-15 md:h-15 rounded-2xl object-cover"
      />

      <div className="flex gap-15  justify-between overflow-hidden  ">
        <div className=" ">
          <h2
            className={`text-base font-semibold transition-colors duration-300 text-[var(--text)] ${price ? "overflow-hidden whitespace-nowrap text-ellipsis w-50" : "overflow-hidden whitespace-nowrap text-ellipsis w-full"}  `}
          >
            {name}
          </h2>

          <p className="text-xs transition-all duration-300 text-[var(--text-secondary)]">
            {subtitle}
          </p>
        </div>

        {price ? (
          <h2 className="text-[var(--text)] text-[18px]   self-center justify-self-end">{price} </h2>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductCard;
