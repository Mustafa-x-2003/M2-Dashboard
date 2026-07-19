import {
    MdOutlineRemoveRedEye
} from "react-icons/md";

import {
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlineLightningBolt
} from "react-icons/hi";

import { useNavigate } from "react-router";


export default function ProductActions({
    product,
    onDelete,
    setSelectedId,
    setShowPopup
}) {


    const navigate = useNavigate();



    return (

        <div className="space-y-3 ">

                                   <div className="grid grid-cols-3 gap-2">

                                    <button
                                            onClick={() => navigate(`/products/view/${product._id}`)}
                                            className="flex items-center justify-center pointer-cursor hover:shadow gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:border-cyan-300 hover:bg-cyan-50 dark:hover:bg-slate-700 transition"
                                        >
                                            <MdOutlineRemoveRedEye className="text-base shrink-0" />
                                            <span>View</span>
                                        </button>

                                        <button
                                            onClick={() =>
                                                navigate(`/products/edit/${product._id}`, {
                                                    state: { product },
                                                })
                                            }
                                            className="flex items-center justify-center gap-1.5 pointer-cursor hover:shadow rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:border-violet-300 hover:bg-violet-50 dark:hover:bg-slate-700 transition"
                                        >
                                            <HiOutlinePencil className="text-base shrink-0" />
                                            <span>Edit</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSelectedId(product._id);
                                                setShowPopup(true);
                                            }}
                                            className="flex items-center pointer-cursor hover:shadow justify-center gap-1.5 text-nowrap rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:border-amber-300 hover:bg-amber-50 dark:hover:bg-slate-700 transition"
                                        >
                                            <HiOutlineLightningBolt className="text-base shrink-0" />
                                            <span>Quick Edit</span>
                                        </button>

                                    </div>

                                    <button
                                        onClick={() => onDelete(product._id)}
                                            className="w-full flex items-center justify-center pointer-cursor hover:shadow gap-2 rounded-lg border border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-500 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition"
                                    >
                                        <HiOutlineTrash className="text-base" />
                                        <span>Delete Product</span>
                                    </button>

                                </div>


   

    )

}