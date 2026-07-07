import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function EditUserModal({ user, isOpen, onClose, onSave }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        avatar: "",
        role: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                phone: user.phone || "",
                avatar: user.avatar || "",
                role: user.role || "",
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
        try {
            await onSave(formData);
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`fixed inset-0 z-[9999]
  flex items-center justify-center
  px-4
  transition-all duration-500 ease-in-out
  ${isOpen
                    ? "bg-black/40 backdrop-blur-sm opacity-100 visible"
                    : "bg-black/0 opacity-0 invisible"
                }`}
            style={{
                background: "var(--overlay)",
                backdropFilter: isOpen ? "blur(4px)" : "blur(0px)",
            }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
rounded-3xl
w-full
max-w-xl 
max-h-[100vh] 
p-4 sm:p-5
mx-4
relative
border
transition-all duration-300 ease-out transform
${isOpen
                        ? "opacity-100 scale-100 translate-y-6"
                        : "opacity-0 scale-95 translate-y-12"
                    }`}
                style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                    boxShadow: "var(--shadow)",
                }}
            >

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 transition-all duration-300 p-2 rounded-xl"
                    style={{
                        color: "var(--text-muted)",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--button-secondary)";
                        e.currentTarget.style.color = "var(--text)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--text-muted)";
                    }}
                >
                    <FaTimes size={22} />
                </button>

                <div className="flex justify-center mb-6">
                    <img
                        src={formData.avatar || "https://i.pravatar.cc/150"}
                        alt="avatar"
                        className="w-20 h-20 rounded-full border-4 object-cover"
                        style={{
                            borderColor: "var(--border)",
                            boxShadow: "var(--shadow)",
                        }}
                    />
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
                    Edit User
                </h2>
                <p
                    className="uppercase tracking-[0.35em] text-xs font-semibold mb-"
                    style={{
                        color: "var(--primary)"
                    }}
                >
                    USER INFORMATION
                </p>
                <div
                    className="mb-5 mt-3"
                    style={{
                        borderBottom: "1px solid var(--border)"
                    }}
                />

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <label className="block text-sm uppercase tracking-widest mb-2" style={{ color: "var(--text-secondary)" }}>
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full rounded-xl px-5 py-3 text-sm border outline-none transition-all duration-300"
                            style={{
                                background: "var(--input-bg)",
                                borderColor: "var(--input-border)",
                                color: "var(--text)",
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "var(--input-focus)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "var(--input-border)";
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm uppercase tracking-widest mb-2" style={{ color: "var(--text-secondary)" }}>
                            Phone
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-xl px-5 py-3 text-sm border outline-none transition-all duration-300"
                            style={{
                                background: "var(--input-bg)",
                                borderColor: "var(--input-border)",
                                color: "var(--text)",
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "var(--input-focus)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "var(--input-border)";
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm uppercase tracking-widest mb-2" style={{ color: "var(--text-secondary)" }}>
                            Avatar URL
                        </label>

                        <input
                            type="text"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            className="w-full rounded-xl px-5 py-3 text-sm border outline-none transition-all duration-300"
                            style={{
                                background: "var(--input-bg)",
                                borderColor: "var(--input-border)",
                                color: "var(--text)",
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "var(--input-focus)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "var(--input-border)";
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 sm:py-4 rounded-2xl font-bold transition-all duration-300 disabled:opacity-60"
                        style={{
                            background: "var(--primary)",
                            color: "var(--text-inverse)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--primary-hover)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "var(--primary)";
                        }}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default EditUserModal;