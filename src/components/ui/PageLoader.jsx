import Logo from "../../assets/images/Logo.png";

function PageLoader({ text = "Loading..." }) {
  return (
    <div>
      <div className="flex w-full flex-col items-center pt-6 pb-10">
        <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full border-4 border-[var(--border)] border-t-cyan-400 bg-[var(--surface)] shadow-[0_0_35px_rgba(34,211,238,0.35),0_10px_25px_rgba(15,23,42,0.12)] animate-spin">
          <img src={Logo} alt="Logo" className="h-16 w-16 object-contain" />
        </div>

        <h2 className="text-2xl font-bold text-[var(--text)]">
          Koda Dashboard
        </h2>

        <p className="mt-2 text-sm text-[var(--text-secondary)]">{text}</p>
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--shadow)]">
        <div className="mb-6 h-5 w-52 animate-pulse rounded-full bg-[var(--border)]"></div>
        <div className="mb-5 h-12 w-80 animate-pulse rounded-xl bg-[var(--border)]"></div>
        <div className="h-5 w-64 animate-pulse rounded-full bg-[var(--border)]"></div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--shadow)]"
          >
            <div className="mb-6 h-5 w-32 animate-pulse rounded-full bg-[var(--border)]"></div>
            <div className="mb-5 h-12 w-40 animate-pulse rounded-xl bg-[var(--border)]"></div>
            <div className="h-5 w-44 animate-pulse rounded-full bg-[var(--border)]"></div>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default PageLoader;
