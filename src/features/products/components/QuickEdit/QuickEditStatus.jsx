
 export default function QuickEditStatus({
                featured,
                active,
                setFeatured,
                setActive,
              }) {
                return (
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFeatured(!featured)}
                      className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition
                          ${featured
                          ? "border-cyan-600 bg-cyan-200/30 text-cyan-300 dark:border-cyan-500 dark:bg-cyan-900/30 dark:text-cyan-300"
                          : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700"
                        }`}
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition
                        ${
                          featured
                            ? "border-cyan-500 bg-cyan-500"
                            : "border-slate-300"
                        }`}
                      >
                        {featured && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                        )}
                      </span>

                      Featured
                    </button>

                    <button
                      type="button"
                      onClick={() => setActive(!active)}
                      className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition
    ${active
                          ? "border-cyan-600 bg-cyan-200/30 text-cyan-300 dark:border-cyan-500 dark:bg-cyan-900/30 dark:text-cyan-300"
                          : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700"
                        }`}
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition
      ${active
                            ? "border-cyan-500 bg-cyan-500"
                            : "border-slate-300 dark:border-slate-600"
                          }`}
                      >
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                        )}
                      </span>

                      Active
                    </button>
                  </div>
                );
              }