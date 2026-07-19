import React from "react";

const FormActions = ({
    navigate,
    isLoading,
    status,
    mode,
}) => {
    return (
        <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
            <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={isLoading}
                className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-slate-200 px-5 py-2.5 text-sm font-semibold tracking-wide text-slate-900 transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800 dark:text-white"
            >
                Cancel
            </button>

            <input
                type="submit"
                disabled={status}
                value={
                    status
                        ? mode === "add"
                            ? "Creating..."
                            : "Saving..."
                        : mode === "add"
                            ? "Create Product"
                            : "Save Changes"
                }
                className="rounded-xl bg-cyan-500 px-6 py-3 text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            />
        </div>
    );
};

export default FormActions;