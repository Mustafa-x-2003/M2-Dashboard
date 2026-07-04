import React from "react";
import ProductCard from "../../../../components/ui/ProductCard";

const TopProduct = ({ dashboard }) => {
    const products = dashboard?.topProducts || [];

    return (
        <section className="rounded-2xl border border-gray-200 bg-white py-3 px-6 shadow-lg w-full min-h-[617px]">
            <h5 className="md:tracking-[6px] uppercase text-cyan-400 md:text-xl text-sm mt-2">
                Top products
            </h5>

            <h2 className="text-lg md:text-xl mb-4 mt-2 font-semibold">
                Best Seller
            </h2>

            {products.map((product) => (
                <div
                    key={product._id}
                    className="border border-red-100 bg-gray-100 rounded-2xl p-4 mt-3 shadow-sm"
                >
                    <ProductCard
                        image={product.image}
                        name={product.name}
                        subtitle={`${product.totalSold} units sold • $${product.revenue.toLocaleString()}`}
                    />
                </div>
            ))}
        </section>
    );
};

export default TopProduct;