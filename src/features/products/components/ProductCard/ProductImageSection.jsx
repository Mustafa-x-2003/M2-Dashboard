import ImagesList from "./imagesLIst";


export default function ProductImageSection({ product }) {


    return (

        <div className="relative h-64 overflow-hidden">

                  <ImagesList
                            featured={product.featured}
                            images={product.images}
                                 className="h-64 w-full object-cover transition duration-500  group-hover:scale-105"
                        />

                        {/* Stock */}
                        <div className="absolute bottom-4 right-4 z-20">
                            <span
                                className={`rounded-full px-3 py-1.5 text-xs font-bold shadow backdrop-blur
                ${product.stock > 0
                                        ? "bg-emerald-100/90 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border dark:border-emerald-500/30"
                                        : "bg-rose-100/90 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300 dark:border dark:border-rose-500/30"
                                    }`}
                            >
                                {product.stock > 0
                                    ? `${product.stock} In Stock`
                                    : "Out of Stock"}
                            </span>
                        </div>

                        {/* Gradient */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent dark:from-slate-900/60" />
                    </div>

    )

}