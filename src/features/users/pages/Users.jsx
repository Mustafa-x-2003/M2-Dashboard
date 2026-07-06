import React, { useState } from "react";
import UserManager from '../components/usermanagement';
import UsersTable from "../components/UsersTable";
import StatsGrid from '../components/statsgrid';
import UsersTable from "../components/UsersTable";
function Users() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full h-full p-10">
      <UserManager />
       <StatsGrid />
      <UsersTable />
      <UserManager searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <UsersTable searchTerm={searchTerm} />
    </div>
  );
}

export default Users;
