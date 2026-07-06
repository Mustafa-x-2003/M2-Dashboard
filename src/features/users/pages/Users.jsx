import React from "react";
import UserManager from '../components/usermanagement';
import UsersTable from "../components/UsersTable";
import StatsGrid from '../components/statsgrid';
function Users() {
  return (
    <div className="w-full h-full p-10">
      <UserManager />
      <UsersTable />
      <StatsGrid />
    </div>
  );
}

export default Users;
