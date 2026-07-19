import { React, useEffect, useState } from "react";
import EditComponent from "../components/EditComponent";
import {useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import { LuPackage2 } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import AddProductPage from "./AddProductPage";
export default function Editpage() {
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();

  const handleEdit = async (data) => {
    await UpdateProduct(id, data);

    navigate("/products");
  };
  return (
    <section >
     
      {/* <EditComponent  /> */}
      <AddProductPage mode="edit"
        />
  </section>
  );
}
