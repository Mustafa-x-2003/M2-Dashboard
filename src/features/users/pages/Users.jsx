import React, { useState } from "react";
import UserManager from '../components/usermanagement';
import StatsGrid from '../components/statsgrid';
import UsersTable from "../components/UsersTable";
function Users() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-10">
      <UserManager searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <StatsGrid />
      <UsersTable searchTerm={searchTerm} />
    </div>
  );
}

export default Users;
