import React from "react";
import UserManager from '../components/usermanagement';
import UsersTable from "../components/UsersTable";
function Users() {
  return (
    <div className="w-full h-full p-10">
      <UserManager />
      <UsersTable />
    </div>
  );
}

export default Users;
