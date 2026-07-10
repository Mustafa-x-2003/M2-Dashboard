import Logo from "../../assets/images/Logo.png";

function PageLoader({ text = "Loading..." }) {
  return (
    <div className="flex w-full flex-col items-center pt-6 pb-10">
      <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full border-4 border-[var(--border)] border-t-cyan-400 bg-[var(--surface)] shadow-[0_0_35px_rgba(34,211,238,0.35),0_10px_25px_rgba(15,23,42,0.12)] animate-spin">
        <img
    src={Logo}
    alt="Logo"
    className="h-16 w-16 object-contain"
  />
      </div>

      <h2 className="text-2xl font-bold text-[var(--text)]">
        Koda Dashboard
      </h2>

      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        {text}
      </p>
    </div>
  );
}

export default PageLoader;