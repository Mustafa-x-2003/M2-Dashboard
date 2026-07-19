export default function Input({
  type,
  name,
  title,
  register,
  validation = {},
  error,
}) {
  return (
    <label className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </p>

      <input
        type={type}
        {...register(name, validation)}
        className={`h-14 w-full rounded-2xl border bg-slate-100 px-5 outline-none transition duration-300 dark:border-slate-800 dark:bg-slate-950 dark:text-white
        ${error
            ? "border-red-500 focus:border-red-500"
            : "border-slate-200 focus:border-cyan-400"
          }`}
      />

      {error && (
        <span className="text-xs font-medium text-red-500">
          {error.message}
        </span>
      )}
    </label>
  );
}