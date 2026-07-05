import React, { useState } from 'react';
import AddUserForm from './adduser';
import { FaSearch, FaUserPlus, FaChevronDown } from 'react-icons/fa';
import UsersTable from "./UsersTable";
const UserManager = () => {
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
          <div className="relative w-full lg:w-80">
            <FaSearch className="absolute left-4 top-4.5 text-slate-400" />
            <input type="text" placeholder="Search users..." 
              className="w-full py-3 pl-12 pr-4 rounded-2xl border bg-gray-100 border-slate-200 outline-none focus:ring-2 focus:ring-cyan-500"/>
          </div>
           <button onClick={() => setIsFormOpen(!isFormOpen)} className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 active:scale-95 transition text-white px-6 py-3 rounded-2xl font-semibold shadow-md cursor-pointer">
            <FaUserPlus /> 
            <span>Add User</span>
            <FaChevronDown className={`transition-transform duration-300 ${isFormOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </div>
    </div>
    {isFormOpen && ( <AddUserForm onClose={() => setIsFormOpen(false)} />)}
      <UsersTable />
    </div>
  );
};

export default UserManager;