import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const BasicFiled = [
  {
    name: "name",
    title: "Product Name",
    type: "text",
    key: "name",
  },
  {
    type: "text",
    name: "shortDescription",
    key: "shortDescription",
    title: "Short Description",
  },
];
export const GridFiled = [{
   name:"price",
              key:"price",
              title:"Price",
              type:"number"
} ,

{
   name:"discountPrice",
              key:"discountPrice",
              title:"Discount Price",
              type:"number"
},
{
   name:"stock",
              key:"stock",
              title:"Stock",
              type:"number"
},{
   name:"sku",
              key:"sku",
              title:"SKU",
              type:"text"
}]

export default function Input({
  type,
  name,
  value,
  title,
  isLoading,
  styling,
  register,
}) {
  return (
    <label htmlFor={name} className="labelDesign">
      {isLoading ? <Skeleton width={300} /> : <p>{title}</p>}
      {isLoading ? (
        <Skeleton className="skeltonDesign" />
      ) : (
        <input
          type={type}
          id={name}
          className={`inputDesign ${styling}`}
          defaultValue={value ?? ""}
          {...(register ? register(name) : {})}
        />
      )}
    </label>
  );
}
