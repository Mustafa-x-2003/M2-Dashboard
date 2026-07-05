import React from "react";
import ProductCard from "../../../../components/ui/ProductCard";
import DashboardOverviewGrid from "../DashboardOverviewGrid/DashboardOverviewGrid";

const TopProduct = ({ dashboard }) => {
    const products = dashboard?.topProducts || [];

    return (
        <DashboardOverviewGrid
            title="Top products"
            subtitle="Best Seller"
            
        >
            {products.map((product) => (
                <div
                    key={product._id}
                    className="border border-red-100 bg-gray-100 rounded-2xl p-3 mb-3 shadow-sm"
                >
                    <ProductCard
                        image={product.image}
                        name={product.name}
                        subtitle={`${product.totalSold} units sold • $${product.revenue.toLocaleString()}`}
                    />
                </div>
            ))}
        </DashboardOverviewGrid>
    );
};

export default TopProduct;