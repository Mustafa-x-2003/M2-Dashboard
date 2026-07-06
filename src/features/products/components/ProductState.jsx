export default function ProductState({ logo, number, title, color }) {
    const colorMap = {
        blue:   { bg: "bg-blue-50",   icon: "bg-blue-100 text-blue-500",   num: "text-blue-700"   },
        yellow: { bg: "bg-yellow-50", icon: "bg-yellow-100 text-yellow-500", num: "text-yellow-700" },
        green:  { bg: "bg-green-50",  icon: "bg-green-100 text-green-500",  num: "text-green-700"  },
        red:    { bg: "bg-red-50",    icon: "bg-red-100 text-red-400",      num: "text-red-600"    },
    };
    const c = colorMap[color] ?? colorMap.blue;

    return (
        <div className={`${c.bg} border border-gray-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-200`}>
            <div className={`${c.icon} rounded-xl p-3 text-2xl flex-shrink-0`}>
                {logo}
            </div>
            <div>
                <p className={`${c.num} text-3xl font-bold leading-tight`}>{number}</p>
                <p className="text-gray-500 text-sm font-medium capitalize mt-0.5">{title}</p>
            </div>
        </div>
    )
}