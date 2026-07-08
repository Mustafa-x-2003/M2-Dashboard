import React, { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import { addUser } from '../services/addUser';

const AddUserForm = ({ onClose }) => {
  const placeholders = {
    username: 'e.g. abdallah',
    email: 'e.g. abdallah@email.com',
    password: 'Min. 5characters',
    phone: 'e.g. +201023374327'
  };
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({ username: '', email: '', password: '', phone: '' });
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Username, email and password are required");
      return;
    }
    try {
      await addUser(formData);
      toast.success("User added successfully!");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-lg mb-5">
        <div className="bg-[var(--info-light)] px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-cyan-500 p-2 rounded-xl text-white">
              <FaUserPlus size={20} />
            </div>
            <div>
              <h3 className="font-bold text-[var(--text)]">Create New User</h3>
              <p className="text-xs text-[var(--text-secondary)]">Fill in the details below to add a new user</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text)] text-lg transition cursor-pointer">✕</button>
        </div>
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-6">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase text-[var(--text-secondary)]">
                  {key}<span className="text-red-400 ml-1">*</span>
                </label>
                <input
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  type={key === 'password' ? 'password' : 'text'}
                  placeholder={placeholders[key]}
                  className="rounded-xl border border-[var(--input-border)]  bg-[var(--surface-secondary)] text-[var(--text)] placeholder:text-[var(--text-muted)] px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-[var(--input-focus)]"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-5 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--text-muted)]"><span className="text-red-400">*</span> Required fields</p>
            <div className="flex gap-3">
              <button
                onClick={handleClear}
                className="px-6 py-2.5 rounded-xl border border-[var(--border)] text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] transition cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                className="cursor-pointer px-6 py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-semibold flex items-center gap-2 hover:bg-cyan-700 transition"
              >
                <FaUserPlus /> Create User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;