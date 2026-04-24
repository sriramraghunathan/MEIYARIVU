import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Videos from "./pages/Videos";
import MockTest from "./pages/MockTest";
import Leaderboard from "./pages/Leaderboard";
import Syllabus from "./pages/Syllabus";
import CurrentAffairs from "./pages/CurrentAffairs";
import PYQ from "./pages/PYQ";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Enroll from "./pages/Enroll";
import AdminDashboard from "./pages/AdminDashboard";


// ✅ PROTECTED ROUTE (USER + ADMIN)
function ProtectedRoute({ children, adminOnly = false }) {
  const { user, userData } = useAuth();

  // ❌ Not logged in
  if (!user) return <Navigate to="/login" />;

  // ⏳ Wait for Firestore data
  if (!userData) return <div className="text-center mt-10">Loading...</div>;

  // ❌ Not approved
  if (!userData.approved) return <Navigate to="/login" />;

  // ❌ Not admin (if adminOnly route)
  if (adminOnly && userData.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/enroll" element={<Enroll />} />

        {/* 🔐 Protected User Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/videos"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Videos />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tests"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <MockTest />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Leaderboard />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/syllabus"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Syllabus />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/current-affairs"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <CurrentAffairs />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/pyq"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <PYQ />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Profile />
              </>
            </ProtectedRoute>
          }
        />

        {/* 👑 Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <>
                <Navbar />
                <AdminDashboard />
              </>
            </ProtectedRoute>
          }
        />

        {/* ❌ Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}