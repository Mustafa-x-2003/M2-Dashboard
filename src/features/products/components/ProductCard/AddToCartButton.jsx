import { useState } from "react";
import { HiShoppingCart } from "react-icons/hi";


export default function AddToCartButton({
    product,
    AddToCart
}) {


    const [added, setAdded] = useState(false);



    return (

        <button

            onClick={() => {

                AddToCart(product);
                setAdded(!added);

            }}

            className={`
w-full rounded-xl 
py-3 text-sm 
font-semibold

${added
                    ?
                    "border border-red-200 bg-red-50 text-red-500"
                    :
                    "bg-teal-500 text-white"
                }

`}

        >


            <div className="
flex items-center 
justify-center gap-2
">


                <HiShoppingCart />


                {
                    added
                        ?
                        "Remove from Cart"
                        :
                        "Add to Cart"
                }


            </div>


        </button>


    )

}