import ProductState from "./ProductState";
import { FaStore, FaStar, FaCubes } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function({ products }) {
    const featuredProducts = products.filter((product) => product.featured)
    const inStock = products.filter((product) => Number(product.stock) !== 0)
    const outOfStock = products.filter((product) => Number(product.stock) === 0)

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <ProductState color="blue"   logo={<FaStore />}         title="Total Products" number={products.length} />
            <ProductState color="yellow" logo={<FaStar />}          title="Featured"       number={featuredProducts.length} />
            <ProductState color="green"  logo={<FaArrowTrendUp />}  title="In Stock"       number={inStock.length} />
            <ProductState color="red"    logo={<FaCubes />}         title="Out of Stock"   number={outOfStock.length} />
        </div>
    )
}