export default function ProductState({ logo, number, title, color }) {
    const colorMap = {
        blue:   { bg: "bg-blue-50 dark:bg-blue-950/40",     icon: "bg-blue-100 dark:bg-blue-900/50 text-blue-500",    num: "text-blue-700 dark:text-blue-400"   },
        yellow: { bg: "bg-yellow-50 dark:bg-yellow-950/40", icon: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-500", num: "text-yellow-700 dark:text-yellow-400" },
        green:  { bg: "bg-green-50 dark:bg-green-950/40",   icon: "bg-green-100 dark:bg-green-900/50 text-green-500",  num: "text-green-700 dark:text-green-400"  },
        red:    { bg: "bg-red-50 dark:bg-red-950/40",       icon: "bg-red-100 dark:bg-red-900/50 text-red-400",        num: "text-red-600 dark:text-red-400"      },
    };
    const c = colorMap[color] ?? colorMap.blue;

    return (
        <div className={`${c.bg} border border-gray-100 dark:border-gray-700/50 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-200`}>
            <div className={`${c.icon} rounded-xl p-3 text-2xl flex-shrink-0`}>
                {logo}
            </div>
            <div>
                <p className={`${c.num} text-3xl font-bold leading-tight`}>{number}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium capitalize mt-0.5">{title}</p>
            </div>
        </div>
    )
}