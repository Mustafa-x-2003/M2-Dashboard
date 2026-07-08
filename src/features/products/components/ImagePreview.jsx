import React from 'react'
import SkeltonWarpper from './SkeltonWarpper';
import { FaRegTrashAlt } from "react-icons/fa";

export default function ImagePreview({isLoading , product , imagetoDelete , setimagetoDelete}) {

      const handleMarkedImagetoDelete = (id) => {
    if (imagetoDelete.includes(id)) {
      setimagetoDelete(imagetoDelete.filter((image) => image != id));
    } else {
      setimagetoDelete([...imagetoDelete, id]);
    }
  };
  return (
      <SkeltonWarpper isloading={isLoading} width={350} style="h-90">
              <div className="img-parent mt-25 flex flex-wrap justify-between gap-y-12 my-10 ">
                {product.images?.map((image, i) => {
                  return (
                    <div
                      className=" flex flex-col h-100 w-[45%] rounded-4xl relative "
                      key={image.public_id}
                    >
                      <img
                        src={image.url}
                        id={image.public_id}
                        alt=""
                        className="h-full w-full object-cover overflow-hidden rounded-t-2xl"
                      />
                      <button
                        onClick={() => handleMarkedImagetoDelete(image.public_id)}
                      >
                        {" "}
                        <FaRegTrashAlt className=" trashicon text-[45px] absolute top-3 right-5 p-2 rounded-full text-zinc-50 bg-gray-800 " />
                      </button>
                      <div className="w-full h-10 pl-10 bg-gray-800 rounded-b-3xl flex items-center p-2">
                        {!imagetoDelete.includes(image.public_id) ? (
                          <p className='text-zinc-50'>IMAGE {i + 1}</p>
                        ) : (
                          <p className="text-xl tracking-[.15em]">
                            Marked to Delete
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </SkeltonWarpper>
  )
}
