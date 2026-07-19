export default function CategoryCardList({ cats }) {
    return (
        <div className="flex flex-wrap gap-2">
            {cats.map((cat) => (
                <span
                    key={cat}
                    className="inline-block rounded-lg border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:border-teal-700 dark:hover:bg-teal-900/40 dark:hover:text-teal-400"
                >
                    {cat}
                </span>
            ))}
        </div>
    );
}