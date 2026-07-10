export default function Settings() {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--shadow)]">
        <p className="text-m  tracking-[0.35em] uppercase text-cyan-500">
          SETTINGS
        </p>

        <h1 className="mt-3 text-2xl font-semibold text-[var(--text)]">
          Preferences and integrations
        </h1>

        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Theme mode, API credentials, and dashboard preferences are managed here.
        </p>
      </div>

    </div>
  );
}