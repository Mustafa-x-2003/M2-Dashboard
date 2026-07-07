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
            className={`h-full rounded-2xl border transition-all duration-300 border-[var(--border)] bg-[var(--background)] py-2 px-6 shadow-lg w-full ${className}`}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h5 className="md:tracking-[6px] uppercase text-cyan-400 md:text-sm text-sm mt-2">
                        {title}
                    </h5>

                    <h2 className="text-lg md:text-xl text-[var(--text)] transition-all duration-300 mb-4 mt-2 font-semibold">
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