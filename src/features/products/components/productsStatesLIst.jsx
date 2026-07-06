import ProductState from "./ProductState";
import { FaStore , FaStar ,FaCubes} from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
export default function({products}){
    const featuredProducts = products.filter((product)=>product.featured)
    const inStock = products.filter((product)=>Number(product.stock) !== 0)
    const outOfStock = products.filter((product)=>Number(product.stock) === 0)
    return(
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProductState logo={<FaStore/>} title={"products"} number={products.length}/>
          <ProductState logo={<FaStar/>} title={"featured"} number={featuredProducts.length}/>
          <ProductState logo={<FaArrowTrendUp/>} title={"in stock"} number={inStock.length}/>
          <ProductState logo={<FaCubes/>} title={"out of stock"} number={outOfStock.length}/>
        </div>
    )
}