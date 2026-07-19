                    export default function ProductInfo({ product }) {


                        return (

                            <div className="flex flex-col gap-4">


                                <div>

                                    <h2 className="
                                        text-xl font-bold 
                                        text-slate-900 
                                        dark:text-white
                                        line-clamp-2 ">
                                        {product.name}
                                    </h2>


                                    <p className="
                    mt-1 text-xs uppercase 
                    tracking-wide 
                    text-slate-400
                    ">
                                        {product.category} • {product.sku} • {product.brand}
                                    </p>


                                </div>



                                <p className="  text-sm  text-slate-500    dark:text-slate-400  line-clamp-2  ">

                                    {product.shortDescription}

                                </p>




                                <div className="flex items-center gap-x-3 ">


                                    <span className="text-4xl font-bold  text-slate-900  dark:text-white ">

                                        ${product.price}

                                    </span>



                                    {
                                        Number(product.discountPrice) > 0 &&

                                        <span className=" text-lg font-semibold    text-emerald-600   ">

                                            -${product.discountPrice} off

                                        </span>

                                    }


                                </div>




                                <div className="flex flex-wrap gap-2 ">


                                    {
                                        product.tags?.map((tag, index) => (

                                            <span
                                                key={index}
                                                className="
                    rounded-lg
                    border 
                    border-slate-100/20
                    shadow
                    bg-slate-100 
                    px-2 py-1
                    text-xs 
                    font-medium
                    text-slate-600
                    dark:bg-slate-400/40
                    dark:text-slate-200
                    hover:dark:bg-slate-400
                    "
                                            >

                                                {tag}

                                            </span>

                                        ))
                                    }



                                </div>



                            </div>

                        )

                    }