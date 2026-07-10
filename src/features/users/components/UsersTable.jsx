import React, { useEffect, useState } from "react";

import {
  getUsers,
  updateUser,
  toggleUserRole,
  deleteUser,
} from "../services/usersApi";
import { FiEdit2, FiShield, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import EditUserModal from "./EditUserModal";

function UsersTable({ searchTerm, setPageLoading, isHiddenWhileLoading }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setPageLoading?.(true);

      const data = await getUsers();
      setUsers(data.users);
    } catch (error) {
      toast.error("Failed to load users");
      console.log(error);
    } finally {
      setPageLoading?.(false);
    }
  };

  const handleSave = async (updatedData) => {
    await updateUser(selectedUser._id, updatedData);

    await fetchUsers();

    toast.success("User updated successfully");
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm?.toLowerCase() || "";

    return (
      user.username?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
  });

if (isHiddenWhileLoading) {
  return null;
}
  const handleToggleRole = async (user) => {
    const newRole = user.role === "admin" ? "customer" : "admin";

    setUsers((prevUsers) =>
      prevUsers.map((u) => (u._id === user._id ? { ...u, role: newRole } : u)),
    );

    try {
      await toggleUserRole(user._id, user.role);
    } catch (error) {
      console.log(error);

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === user._id ? { ...u, role: user.role } : u,
        ),
      );
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(userId);

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  const actionButtonClass =
    "w-11 h-11 sm:w-12 sm:h-12 rounded-2xl transition-colors duration-300 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:brightness-125 active:scale-95";

  return (
    <div
      className="rounded-3xl mt-6 w-[100%] transition-colors duration-300  border shadow-xl transition-[background-color,border-color,box-shadow]  ease-in-out overflow-x-scroll"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow)",
      }}
    >
      <div className=" w-full transition-colors duration-300">
        <table className="min-w-[850px] transition-colors duration-300 w-full border-collapse">
          <thead
            className="sticky top-0 z-10 transition-colors duration-300 "
            style={{
              background: "var(--table-header)",
              boxShadow: "inset 0 -1px 0 var(--border)",
            }}
          >
            <tr
              className=" transition-colors duration-300 "
              style={{
                borderColor: "var(--border)",
              }}
            >
              <th
                className="px-6 py-5 text-left font-semibold "
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                User
              </th>
              <th
                className="px-6 py-5 text-left font-semibold"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Role
              </th>
              <th
                className="px-6 py-5 text-left font-semibold"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Verified
              </th>
              <th
                className="px-6 py-5 text-left font-semibold"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>

          {filteredUsers.length > 0 ? (
            <tbody className="transition-colors duration-300">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b transition-colors duration-300"
                  style={{
                    borderColor: "var(--border)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--table-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.avatar || "https://i.pravatar.cc/150"}
                        alt={user.username}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-colors duration-300 object-cover border"
                        style={{
                          borderColor: "var(--border)",
                        }}
                      />
                      <div>
                        <h3
                          className="font-semibold text-sm transition-colors duration-300 sm:text-base text-lg"
                          style={{ color: "var(--text)" }}
                        >
                          {user.username}
                        </h3>
                        <p
                          className="text-xs sm:text-sm transition-colors duration-300"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-6 px-4">
                    <span
                      className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-in-out"
                      style={{
                        background:
                          user.role === "admin"
                            ? "var(--primary-light)"
                            : "var(--info-light)",

                        color:
                          user.role === "admin"
                            ? "var(--primary)"
                            : "var(--info)",
                      }}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="py-6 px-4 transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      {user.isVerified ? (
                        <>
                          <span
                            style={{
                              color: "var(--success)",
                            }}
                          >
                            ✅
                          </span>

                          <span
                            className="font-medium"
                            style={{
                              color: "var(--success)",
                            }}
                          >
                            Verified
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className="text-xl"
                            style={{
                              color: "var(--danger)",
                            }}
                          >
                            ❌
                          </span>
                          <span
                            className="font-medium"
                            style={{
                              color: "var(--text-muted)",
                            }}
                          >
                            No
                          </span>
                        </>
                      )}
                    </div>
                  </td>

                  <td className="py-6 px-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsEditOpen(true);
                        }}
                        className={actionButtonClass}
                        style={{
                          background: "var(--primary-light)",
                          color: "var(--primary)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--primary)";
                          e.currentTarget.style.color = "var(--text-inverse)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "var(--primary-light)";
                          e.currentTarget.style.color = "var(--primary)";
                        }}
                      >
                        <FiEdit2 className="text-sm sm:text-base md:text-lg" />
                      </button>
                      <button
                        onClick={() => handleToggleRole(user)}
                        className={actionButtonClass}
                        style={{
                          background: "var(--success-light)",
                          color: "var(--success)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--success)";
                          e.currentTarget.style.color = "var(--text-inverse)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "var(--success-light)";
                          e.currentTarget.style.color = "var(--success)";
                        }}
                      >
                        <FiShield className="text-sm sm:text-base md:text-lg" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className={actionButtonClass}
                        style={{
                          background: "var(--danger-light)",
                          color: "var(--danger)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--danger)";
                          e.currentTarget.style.color = "var(--text-inverse)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "var(--danger-light)";
                          e.currentTarget.style.color = "var(--danger)";
                        }}
                      >
                        <FiTrash2 className="text-sm sm:text-base md:text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className="transition-colors duration-300">
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-12 font-medium transition-colors duration-300"
                  style={{ color: "var(--text-muted)" }}
                >
                  No users found.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      <EditUserModal
        user={selectedUser}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

export default UsersTable;
