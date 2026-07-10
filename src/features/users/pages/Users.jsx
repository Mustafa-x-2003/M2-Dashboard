import React, { useState } from "react";
import UserManager from "../components/usermanagement";
import StatsGrid from "../components/statsgrid";
import UsersTable from "../components/UsersTable";
import PageLoader from "../../../components/ui/PageLoader";

function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen p-4 sm:p-6 lg:p-10">
        <PageLoader text="Loading users..." />

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

        <UsersTable
          searchTerm={searchTerm}
          setPageLoading={setIsLoading}
          isHiddenWhileLoading
        />

        <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow)] overflow-hidden">
  <div className="grid grid-cols-4 gap-4 bg-[var(--table-header)] px-6 py-5">
    <div className="h-4 w-20 animate-pulse rounded-full bg-[var(--border)]"></div>
    <div className="h-4 w-20 animate-pulse rounded-full bg-[var(--border)]"></div>
    <div className="h-4 w-24 animate-pulse rounded-full bg-[var(--border)]"></div>
    <div className="h-4 w-20 animate-pulse rounded-full bg-[var(--border)]"></div>
  </div>

  {Array.from({ length: 4 }).map((_, index) => (
    <div
      key={index}
      className="grid grid-cols-4 gap-4 border-t border-[var(--border)] px-6 py-6"
    >
      <div className="h-5 w-40 animate-pulse rounded-full bg-[var(--border)]"></div>
      <div className="h-5 w-24 animate-pulse rounded-full bg-[var(--border)]"></div>
      <div className="h-5 w-28 animate-pulse rounded-full bg-[var(--border)]"></div>
      <div className="h-5 w-32 animate-pulse rounded-full bg-[var(--border)]"></div>
    </div>
  ))}
</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-10">
      <UserManager searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <StatsGrid />
      <UsersTable searchTerm={searchTerm} setPageLoading={setIsLoading} />
    </div>
  );
}

export default Users;