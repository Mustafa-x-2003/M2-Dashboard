import ProfileHeader from "../components/profileHeader";
import Address from "../components/address";
import ChangePassword from "../components/changePassword";
import Logout from "../components/logout";
import { useAuth } from "../../../context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 animate-fade-in">
      <Toaster position="top-right" />
      <h1 className="mb-8 text-2xl font-bold dark:text-slate-100">My Profile</h1>
      <ProfileHeader user={user} />
      <Address user={user} />
      <ChangePassword userEmail={user?.email} />
      <Logout />
    </div>
  );
}