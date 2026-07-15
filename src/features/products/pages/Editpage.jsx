import { React, useEffect, useState } from "react";
import EditComponent from "../components/EditComponent";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import { LuPackage2 } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import AddProductsHeader from "../components/AddProductsHeader";
export default function Editpage() {
  const [isLoading, setisLoading] = useState(true);

  return (
    <section className="  w-full  p-8   ml-auto  flex flex-col ">


      <AddProductsHeader
        type={"Edit Product"}
        title={"Update and refine the product entry"}
        desc={
          "Review the current product data, add new images, remove existing ones, and save your updates safely"
        }
        RightStatus={{
          title: "Live",
          desc: "Connected to the real product update API",
        }}
      />
      <EditComponent isLoading={isLoading} setisLoading={setisLoading} />
    </section>
  );
}
