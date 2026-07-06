export default function CategoryCard({ cat }) {
    return (
        <span className="inline-block bg-gray-100 hover:bg-teal-50 hover:text-teal-600 border border-gray-200 hover:border-teal-200 text-gray-500 text-xs font-medium px-2.5 py-1 rounded-lg cursor-default transition-all duration-200">
            {cat}
        </span>
    )
}