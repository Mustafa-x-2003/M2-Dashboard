import Logo from "../../assets/images/Logo.png";

function SessionLoader({
  title = "Loading Session",
  subtitle = "Verifying authentication...",
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[var(--background)] px-6">
      <div className="mb-8 flex h-28 w-28 animate-spin items-center justify-center rounded-full border-4 border-[var(--border)] border-t-cyan-400 bg-[var(--surface)] shadow-[0_0_40px_rgba(34,211,238,0.35)]">
        <img
          src={Logo}
          alt="Logo"
          className="h-16 w-16 object-contain animate-none"
        />
      </div>

      <h1 className="animate-pulse text-4xl font-bold text-[var(--text)]">
  {title}
</h1>
      <p className="mt-3 text-lg text-[var(--text-secondary)]">
        {subtitle}
      </p>

      <div className="mt-8 flex gap-3">
        <span className="h-4 w-4 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]"></span>
        <span className="h-4 w-4 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]"></span>
        <span className="h-4 w-4 animate-bounce rounded-full bg-cyan-400"></span>
      </div>
    </div>
  );
}

export default SessionLoader;