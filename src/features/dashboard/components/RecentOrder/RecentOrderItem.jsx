import React from "react";

const RecentOrderItem =({order})=>{

    const statusColors = {
        confirmed: "bg-green-100 text-green-600",
        pending: "bg-yellow-100 text-yellow-600",
        cancelled: "bg-red-100 text-red-600",
        shipped: "bg-blue-100 text-blue-600",
        delivered: "bg-emerald-100 text-emerald-600",
        processing: "bg-purple-100 text-purple-600",
    };


    const date = new Date(order.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });


    const price =  order.totalPrice.toLocaleString("en-US", {
        minimumFractionDigits: 2,
    })


    // ******************************************************************************************************************************
    return(
        <>
            <div className="md:flex md:flex-row md:items-center md:justify-between flex-col  shadow-sm  border border-red-100 w-full  items-center p-4 mb-4  bg-gray-100 rounded-3xl ">
                
                <div className=" ">
                    <h2 className="text-base font-semibold  text-slate-900 md:text-lg ">{order.user?.username || "Unknown User"}</h2>
                    <p className="text-xs text-gray-500 truncate">{order.items?.[0]?.name} •  {date}</p> 
                </div>
                <div className=" flex sm:justify-between justify-start items-center gap-4">
                    <p className={`  ${statusColors[order.status] || "bg-gray-100 text-gray-600"}  rounded-full md:px-4 py-1 px-2  md:text-sm text-xs`}>{order.status}</p>
                    <p className="md:text-sm text-xs text-gray-600 ">${price}</p>
                </div>
            </div>

        </>
    )
}

export default RecentOrderItem;
