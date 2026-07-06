import React, { useState } from "react";
import UserManager from '../components/usermanagement';
import UsersTable from "../components/UsersTable";
import StatsGrid from '../components/statsgrid';
import UsersTable from "../components/UsersTable";
function Users() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full h-full p-10">
<<<<<<< HEAD
      <UserManager searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <StatsGrid />
=======
      <UserManager />
       <StatsGrid />
      <UsersTable />
      <UserManager searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
>>>>>>> d1ba71f440680b76dfc0efcef8480d132c19608d
      <UsersTable searchTerm={searchTerm} />
    </div>
  );
}

export default Users;
