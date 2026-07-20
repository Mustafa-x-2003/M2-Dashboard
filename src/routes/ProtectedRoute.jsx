import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import SessionLoader from "../components/ui/SessionLoader";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SessionLoader
        title="Loading Session"
        subtitle="Verifying authentication..."
      />
    );
  }

  if (user === undefined) return null;

  return user ? children : <Navigate to="/login" replace />;
}