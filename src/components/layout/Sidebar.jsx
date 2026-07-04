import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <ul className="p-5 flex flex-col gap-4 text-white">

      <li>
        <Link className="hover:text-blue-300" to="">
          Dashboard
        </Link>
      </li>

      <li>
        <Link className="hover:text-blue-300" to="products">
          Products
        </Link>
      </li>

      <li>
        <Link className="hover:text-blue-300" to="orders">
          Orders
        </Link>
      </li>

      <li>
        <Link className="hover:text-blue-300" to="users">
          Users
        </Link>
      </li>

    </ul>
  );
}

export default Sidebar;