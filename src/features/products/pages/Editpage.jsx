import { React, useEffect, useState } from "react";
import EditComponent from "../components/EditComponent";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import { LuPackage2 } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
export default function Editpage() {
  const [isLoading, setisLoading] = useState(true);

  return (
    <section className="  w-full mt-15 2xl:px-8   ml-auto  flex flex-col ">
      <div className=" flex gap-y-5 sm:flex-col 2xl:flex-row  justify-between bg-card text-zinc-100 p-7 2xl:p-10 pt-15 pb-15 ">
        {isLoading ? (
          <Skeleton width={500} className="skeltonDesign" count={4} />
        ) : (
          <div className="headingDiv">
            <Link
              to={-1}
              className="btn md:flex items-center gap-3 md:w-50 bg-white/10 p-4 px-6 border rounded-full border-white/5 hover:bg-white/15"
            >
              <span>
                <FaArrowLeft />
              </span>
              <span className="max-sm:hidden">Back to product</span>
            </Link>
            <div className="heading-content  flex gap-6 mt-8">
              <span className="bg-white/10 w-22 h-22 self-center flex justify-center items-center rounded-2xl ">
                <LuPackage2 className="text-4xl text-violet-700" />
              </span>
              <div>
                <p className=" text-[14px] md:text-lg text-violet-500 uppercase tracking-[.3rem]">
                  EDIT PRODUCT
                </p>
                <h5 className="text-2xl md:text-6xl font-bold mt-3">
                  Update and refine the product entry
                </h5>
              </div>
            </div>
            <p className="mt-10 md:text-2xl max-w-4xl text-white/85">
              Review the current product data, add new images, remove existing
              ones, and save your updates safely.
            </p>
          </div>
        )}

        {isLoading ? (
          <Skeleton
            width={400}
            className="skeltonDesign"
            className="h-40 border border-white/5 rounded-4xl self-center mt-5"
          />
        ) : (
          <div className=" 2xl:mt-7  self-end   bg-white/5 p-7 md:p-10 rounded-[45px] border border-white/20 md:w-full xl:w-120">
            <p className=" md:text-xl text-violet-500 uppercase tracking-[.3rem]">
              LIVE
            </p>
            <p className="mt-2 md:text-xl text-white/85  ">
              Connected to the real product update API.
            </p>
          </div>
        )}
      </div>
      <EditComponent isLoading={isLoading} setisLoading={setisLoading} />
    </section>
  );
}
