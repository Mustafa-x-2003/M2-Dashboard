import React, { useState } from 'react';
import AddUserForm from './adduser';
import SearchUser from './searchuser';
import { FaSearch,FaUserPlus, FaChevronDown } from 'react-icons/fa';

const UserManager = () => {
const UserManager = ({ searchTerm, setSearchTerm }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">User Management</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">Manage Users</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <SearchUser searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <button onClick={() => setIsFormOpen(!isFormOpen)} className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 active:scale-95 transition text-white px-6 py-3 rounded-2xl font-semibold shadow-md cursor-pointer">
              <FaUserPlus />
              <span>Add User</span>
              <FaChevronDown className={`transition-transform duration-300 ${isFormOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`grid transition-all duration-400 ease-in-out ${isFormOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <AddUserForm onClose={() => setIsFormOpen(false)} />
        </div>
      </div>
    </div>
  );
};
}

export default UserManager;