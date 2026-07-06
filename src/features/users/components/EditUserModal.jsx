import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function EditUserModal({ user, isOpen, onClose, onSave }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        avatar: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                phone: user.phone || "",
                avatar: user.avatar || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSave(formData);
        setLoading(false);
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 px-4
    transition-all duration-500 ease-in-out
    ${isOpen
                    ? "bg-black/40 backdrop-blur-sm opacity-100 visible"
                    : "bg-black/0 opacity-0 invisible"
                }`}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white
rounded-3xl
w-full
max-w-2xl
p-5 sm:p-8
mx-4 shadow-2xl relative
    transition-all duration-300 ease-out transform
    ${isOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-8"
                    }`}
            >

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition"
                >
                    <FaTimes size={22} />
                </button>

                <h2 className="text-2xl sm:text-4xl font-bold mb-8 text-slate-800">
                    Edit User
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm uppercase tracking-widest text-gray-400 mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-gray-100 rounded-2xl px-5 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm uppercase tracking-widest text-gray-400 mb-2">
                            Phone
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-gray-100 rounded-2xl px-5 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm uppercase tracking-widest text-gray-400 mb-2">
                            Avatar URL
                        </label>

                        <input
                            type="text"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            className="w-full bg-gray-100 rounded-2xl px-5 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-white py-3 sm:py-4 rounded-2xl font-bold transition"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default EditUserModal;