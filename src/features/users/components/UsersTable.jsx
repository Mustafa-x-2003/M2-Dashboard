import React, { useEffect, useState } from "react";
import { getUsers, updateUser, toggleUserRole, deleteUser } from "../services/usersApi";
import { FiEdit2, FiShield, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import EditUserModal from "./EditUserModal";


function UsersTable({ searchTerm }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.users);
    } catch (error) {
      toast.error("Failed to update user");
      console.log(error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm?.toLowerCase() || "";
    return (
      user.username?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
  });

  const handleToggleRole = async (user) => {
    const newRole =
      user.role === "admin"
        ? "customer"
        : "admin";

    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u._id === user._id
          ? { ...u, role: newRole }
          : u
      )
    );

    try {
      await toggleUserRole(user._id, user.role);
    } catch (error) {
      console.log(error);

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === user._id
            ? { ...u, role: user.role }
            : u
        )
      );
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(userId);

      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user._id !== userId
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl mt-6 overflow-x-auto">
      <table className="min-w-[850px] w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left px-4 py-5 text-gray-600 font-semibold">User</th>
            <th className="text-left px-4 py-5 text-gray-600 font-semibold">Role</th>
            <th className="text-left px-4 py-5 text-gray-600 font-semibold">Verified</th>
            <th className="text-left px-4 py-5 text-gray-600 font-semibold">Actions</th>
          </tr>
        </thead>

        {filteredUsers.length > 0 ? (
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-300"
              >
                <td className="py-6 px-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.avatar || "https://i.pravatar.cc/150"}
                      alt={user.username}
                      className="
w-10 h-10
sm:w-12 sm:h-12
rounded-full
object-cover
"
                    />
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-800 text-lg">{user.username}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>

                <td className="py-6 px-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold
    transition-all duration-500 ease-in-out
  ${user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-cyan-100 text-cyan-700"
                      }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="py-6 px-4">
                  <div className="flex items-center gap-2">
                    {user.isVerified ? (
                      <>
                        <span className="text-green-500 text-xl">✅</span>
                        <span className="text-green-600 font-medium">Verified</span>
                      </>
                    ) : (
                      <>
                        <span className="text-red-500 text-xl">❌</span>
                        <span className="text-gray-400 font-medium">No</span>
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
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleToggleRole(user)}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-all duration-300"
                    >
                      <FiShield />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="
    w-11 h-11 sm:w-12 sm:h-12
    rounded-2xl
    bg-red-500
    hover:bg-red-600
    transition-all duration-300
    flex items-center justify-center
  "
                    >
                      <FiTrash2 className="text-white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="4" className="text-center py-12 text-gray-400 font-medium">
                No users found.
              </td>
            </tr>
          </tbody>
        )}
      </table>
      <EditUserModal
        user={selectedUser}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={fetchUsers}
      />
    </div>
  );
};


export default UsersTable;