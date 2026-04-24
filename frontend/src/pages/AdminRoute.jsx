import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, userData } = useAuth();

  if (!user) return <Navigate to="/" />;
  if (!userData) return <div>Loading...</div>;

  if (userData.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}