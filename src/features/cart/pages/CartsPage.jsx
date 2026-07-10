import React, { useEffect, useState } from "react";
import PageLoader from "../../../components/ui/PageLoader";

export default function CartsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-full p-4 sm:p-6 lg:p-8">
        <PageLoader text="Loading carts..." />
        <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--shadow)]">
          <div className="mb-6 h-4 w-24 animate-pulse rounded-full bg-[var(--surface-secondary)]"></div>

          <div className="mb-5 h-10 w-72 animate-pulse rounded-xl bg-[var(--surface-secondary)]"></div>

          <div className="h-5 w-[480px] max-w-full animate-pulse rounded-full bg-[var(--surface-secondary)]"></div>
        </div>
        <div className="mt-8 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] p-8">
          <div className="h-5 w-64 animate-pulse rounded-full bg-[var(--surface-secondary)]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--shadow)]">
        <p className="text-m  uppercase tracking-[0.35em] text-cyan-500">
          CARTS
        </p>

        <h1 className="mt-3 text-3xl font-semibold text-[var(--text)]">
          Cart overview
        </h1>

        <p className="mt-4 text-m text-[var(--text-secondary)]">
          All active carts returned from the API are rendered here with their
          latest item details.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] p-8 text-[var(--text-secondary)]">
        No carts returned from the API.
      </div>
    </div>
  );
}