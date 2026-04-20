import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, token } = useAuth();

  // 🚫 Not logged in → redirect
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow access
  return children;
}