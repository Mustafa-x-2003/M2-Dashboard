import React from "react";
import { FaSearch } from 'react-icons/fa';
function SearchUser({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full lg:w-80">
      <FaSearch className="absolute left-4 top-4.5 text-slate-400" />
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full py-3 pl-12 pr-4 rounded-2xl border bg-gray-100 border-slate-200 outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>
  );
}
export default SearchUser;