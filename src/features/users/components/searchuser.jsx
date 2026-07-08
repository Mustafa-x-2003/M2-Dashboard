import React from "react";
import { FaSearch } from 'react-icons/fa';

function SearchUser({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full lg:w-80">
      <FaSearch className="absolute left-4 top-4.5 text-[var(--text-muted)]" />
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full py-3 pl-12 pr-4 rounded-2xl border bg-[var(--surface-secondary)] border-[var(--input-border)] text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-[var(--input-focus)] transition-colors duration-300"
      />
    </div>
  );
}

export default SearchUser;