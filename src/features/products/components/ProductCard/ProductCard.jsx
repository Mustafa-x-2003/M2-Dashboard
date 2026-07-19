
import ProductImageSection from "./ProductImageSection";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";
import AddToCartButton from "./AddToCartButton";


export default function productCard({
    isUser,
    product,
    onDelete,
    AddToCart,
    setSelectedId,
    setShowPopup
}) {

    return (
        <div className="
        bg-white dark:bg-slate-900 
        mt-4 rounded-3xl 
        border border-slate-200 
        dark:border-slate-700
        shadow-sm hover:shadow-xl 
        hover:-translate-y-1 
        transition-all duration-300 
        overflow-hidden flex flex-col
        ">


            <ProductImageSection product={product} />


            <div className="
            flex flex-col flex-1 gap-4 p-6
            ">

                <ProductInfo product={product} />


                <div className="
                mt-auto border-t 
                border-slate-200 
                dark:border-slate-700 pt-4
                ">


                    {
                        isUser ?

                            <AddToCartButton
                                product={product}
                                AddToCart={AddToCart}
                            />

                            :

                            <ProductActions
                                product={product}
                                onDelete={onDelete}
                                setSelectedId={setSelectedId}
                                setShowPopup={setShowPopup}
                            />

                    }


                </div>

            </div>


        </div>
    )
}