import React from "react";

const DashboardOverviewGrid = ({
    title,
    subtitle,
    badge,
    children,
    className = "",
}) => {
    return (
        <section
            className={`h-full rounded-2xl border border-gray-200 bg-white py-2 px-6 shadow-lg w-full ${className}`}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h5 className="md:tracking-[6px] uppercase text-cyan-400 md:text-sm text-sm mt-2">
                        {title}
                    </h5>

                    <h2 className="text-lg md:text-xl mb-4 mt-2 font-semibold">
                        {subtitle}
                    </h2>
                </div>

                {badge}
            </div>

            {children}
        </section>
    );
};

export default DashboardOverviewGrid;