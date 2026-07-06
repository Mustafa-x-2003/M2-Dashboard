import React, { useEffect, useState } from "react";
import { getUsers } from "../services/usersApi";
import { FiEdit2, FiShield, FiTrash2 } from "react-icons/fi";

function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl mt-6 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left px-4 py-5 text-gray-600 font-semibold">
              User
            </th>

            <th className="text-left px-4 py-5 text-gray-600 font-semibold">
              Role
            </th>

            <th className="text-left px-4 py-5 text-gray-600 font-semibold">
              Verified
            </th>

            <th className="text-left px-4 py-5 text-gray-600 font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="
             border-b border-gray-100
             hover:bg-gray-50
             transition-colors duration-300
            "
            >
              <td className="py-6 px-4">
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar || "https://i.pravatar.cc/150"}
                    alt={user.username}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {user.username}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {user.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className="py-6 px-4">
                <span
                  className={`px-5 py-2 rounded-full text-sm font-semibold
          ${user.role === "admin"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-cyan-100 text-cyan-600"
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
                      <span className="text-green-600 font-medium">
                        Verified
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-red-500 text-xl">❌</span>
                      <span className="text-gray-400 font-medium">
                        No
                      </span>
                    </>
                  )}
                </div>
              </td>

              <td className="py-6 px-4">
                <div className="flex gap-3">

                  <button
                    className="
        w-12 h-12 rounded-2xl
        bg-blue-500
        text-white
        flex items-center justify-center
        hover:bg-blue-600
        transition-all duration-300
      "
                  >
                    <FiEdit2 size={20} />
                  </button>

                  <button
                    className="
        w-12 h-12 rounded-2xl
        bg-green-500
        text-white
        flex items-center justify-center
        hover:bg-green-600
        transition-all duration-300
      "
                  >
                    <FiShield size={20} />
                  </button>

                  <button
                    className="
        w-12 h-12 rounded-2xl
        bg-red-500
        text-white
        flex items-center justify-center
        hover:bg-red-600
        transition-all duration-300
      "
                  >
                    <FiTrash2 size={20} />
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;