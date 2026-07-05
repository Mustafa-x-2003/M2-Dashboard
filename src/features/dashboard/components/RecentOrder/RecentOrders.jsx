import React, { useState } from "react";
import RecentOrderItem from "./RecentOrderItem";
import { getDashboard } from "../../services/dashboardApi";

const RecentOrders = ({ dashboard })=>{

    const orders = dashboard?.recentOrders || [];
    return(
        <>
            <section className="rounded-2xl border border-gray-200 bg-white py-3 px-6  w-full   shadow-lg">
                <div className=" flex justify-between items-center ">
                    <div>
                        <h5 className="md:tracking-[6px] uppercase text-cyan-400 mt-2 md:text-xl text-sm ">Recent orders</h5>
                        <h2 className=" text-sm md:text-xl mb-4 mt-2 font-semibold">Latest customer activity</h2>
                    </div>
                    <p className="bg-slate-200 text-cyan-600  rounded-full md:px-4  py-1 px-2 md:text-sm text-xs">{orders.length} order</p>
              
                </div>
                

                {
                    orders.map((order) => {
                        return(
                            <RecentOrderItem key={order._id} order={order} /> 

                        )
                        
                    })
                }
                

           </section>
        
        </>

    )


}

export default RecentOrders;