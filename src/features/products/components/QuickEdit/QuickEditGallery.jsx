import React from "react";
import { LuImagePlus } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
export default function QuickEditGallery({
    product,
    handleImageUpload,
    handleMarkedImagetoDelete,
}) {
 
    
   
    return (
        <>
         <div className="flex items-start gap-4 ">
              <div className="w-10 h-10 rounded-2xl bg-violet-100 flex items-center justify-center">
                <LuImagePlus className="text-lg text-violet-600" />
              </div>

              <div>
            <h2 className="text-meduim font-bold text-[var(--text)]">
                  Product Gallery
                </h2>

                <p className="text-xs text-gray-500 ">
                  Upload and manage images
                </p>
              </div>
            </div>
       

       
            <div className="grid grid-cols-1  xl:grid-cols-2  gap-4 mt-6">


            {product.images.map((image, i) => {
              return (
                <div  
                  key={image.public_id}
                  className=" group relative rounded-3xl overflow-hidden  shadow-sm "
                >
                  <img
                    src={image.url}
                    id={image.public_id}
                    alt=""
                    className="h-36 w-full object-cover rounded-t-2xl "
                    
                  />
                  <button
                  onClick={() => handleMarkedImagetoDelete(image.public_id)}
                  className="absolute top-3 right-3 bg-gray-800 text-white rounded-full p-2  opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 cursor-pointer"
                >
                  <IoClose />
                </button>
                
                  <div className="absolute bottom-3 left-3 bg-gray-800/40 text-white text-xs rounded-full p-2 ">
                      <p className="" >IMAGE {i + 1}</p>

                  
                  </div>
                </div>
              );
            })}

             
             
          </div>
      

        
            <div className="  w-full py-6 flex mt-6 justify-center items-center text-center rounded-3xl border-2 border-dashed border-cyan-400/30 bg-cyan-500/5">
            <label
              htmlFor="imageUploader"
              className="  w-full  "
            >
              <span className="bg-white/10 w-10 h-10  rounded-2xl">
                <LuImagePlus className="text-2xl text-violet-400 m-auto" />
              </span>
                <p className="mt-2 text-sm  ">Click to upload images</p>
              <p className="mt-3 text-xs text-gray-300 ">
                  PNG, JPG, WEBP
              </p>
              <input
                id="imageUploader"
                hidden
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </>
    )
}
