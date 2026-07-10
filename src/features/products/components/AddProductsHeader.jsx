import { useNavigate } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi';
import { FaBox } from "react-icons/fa";

export default function AddProductsHeader() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:border-white/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-8 shadow-xl dark:shadow-2xl transition-all duration-300">
      {/* Decorative blobs */}
      <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 transition-colors duration-300"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to products
          </button>

          {/* Title row */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/15 dark:text-cyan-300 transition-colors duration-300">
              <FaBox className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">Create Product</p>
              <h1 className="mt-1 text-4xl font-black text-slate-900 dark:text-white transition-colors duration-300">Launch a polished product entry</h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300 transition-colors duration-300">
            Add products with validation, image previews, multi-upload support, and smooth UX.
          </p>
        </div>

        {/* Right Status Badge */}
        <div className="rounded-3xl border border-slate-200 bg-white/50 p-4 shadow-lg backdrop-blur shrink-0 dark:border-white/10 dark:bg-white/5 dark:shadow-xl transition-all duration-300">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">Ready</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-200 transition-colors duration-300">Create, validate, and save with one click.</p>
        </div>
      </div>
    </div>
  );
}