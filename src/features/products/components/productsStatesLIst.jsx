import { FaStore, FaStar, FaCubes } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function ProductsStatesList({ products }) {
    const featuredProducts = products.filter((product) => product.featured);
    const inStock = products.filter((product) => Number(product.stock) !== 0);
    const outOfStock = products.filter((product) => Number(product.stock) === 0);

    const stats = [
        {
            title: "Total Products",
            number: products.length,
            logo: <FaStore />,
            color: {
                bg: "bg-blue-50 dark:bg-blue-950/40",
                icon: "bg-blue-100 dark:bg-blue-900/50 text-blue-500",
                num: "text-blue-700 dark:text-blue-400",
            },
        },
        {
            title: "Featured",
            number: featuredProducts.length,
            logo: <FaStar />,
            color: {
                bg: "bg-yellow-50 dark:bg-yellow-950/40",
                icon: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-500",
                num: "text-yellow-700 dark:text-yellow-400",
            },
        },
        {
            title: "In Stock",
            number: inStock.length,
            logo: <FaArrowTrendUp />,
            color: {
                bg: "bg-green-50 dark:bg-green-950/40",
                icon: "bg-green-100 dark:bg-green-900/50 text-green-500",
                num: "text-green-700 dark:text-green-400",
            },
        },
        {
            title: "Out of Stock",
            number: outOfStock.length,
            logo: <FaCubes />,
            color: {
                bg: "bg-red-50 dark:bg-red-950/40",
                icon: "bg-red-100 dark:bg-red-900/50 text-red-400",
                num: "text-red-600 dark:text-red-400",
            },
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
                <div
                    key={stat.title}
                    className={`${stat.color.bg} border border-gray-100 dark:border-gray-700/50 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-200`}
                >
                    <div
                        className={`${stat.color.icon} rounded-xl p-3 text-2xl flex-shrink-0`}
                    >
                        {stat.logo}
                    </div>

                    <div>
                        <p className={`${stat.color.num} text-3xl font-bold`}>
                            {stat.number}
                        </p>

                        <p className="mt-0.5 text-sm font-medium text-gray-500 dark:text-gray-400">
                            {stat.title}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}