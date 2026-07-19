import React from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const StatusSection = ({
    register,
    submitError,
    submitSuccess,
    mode,
}) => {
    return (
        <>
            <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-5 py-4 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
                    <input
                        type="checkbox"
                        {...register("featured")}
                    />
                    Featured
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-5 py-4 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
                    <input
                        type="checkbox"
                        defaultChecked
                        {...register("isActive")}
                    />
                    Active
                </label>
            </div>

            {submitError && (
                <div className="flex items-center gap-3 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300">
                    <FiAlertCircle className="h-4 w-4 shrink-0" />

                    {submitError}
                </div>
            )}

            {submitSuccess && (
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                    <FiCheckCircle className="h-4 w-4 shrink-0" />

                    {mode === "add"
                        ? "Product created successfully!"
                        : "Product updated successfully!"}
                </div>
            )}
        </>
    );
};

export default StatusSection;