import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Videos from './pages/Videos';
import MockTest from './pages/MockTest';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';
import Syllabus from './pages/Syllabus';
import CurrentAffairs from './pages/CurrentAffairs';
import PYQ from './pages/PYQ';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import Enroll from './pages/Enroll';

function ProtectedRoute({ children, adminOnly }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/dashboard" element={<ProtectedRoute><><Navbar /><Dashboard /></></ProtectedRoute>} />
        <Route path="/videos" element={<ProtectedRoute><><Navbar /><Videos /></></ProtectedRoute>} />
        <Route path="/tests" element={<ProtectedRoute><><Navbar /><MockTest /></></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><><Navbar /><Leaderboard /></></ProtectedRoute>} />
        <Route path="/syllabus" element={<ProtectedRoute><><Navbar /><Syllabus /></></ProtectedRoute>} />
        <Route path="/current-affairs" element={<ProtectedRoute><><Navbar /><CurrentAffairs /></></ProtectedRoute>} />
        <Route path="/pyq" element={<ProtectedRoute><><Navbar /><PYQ /></></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><><Navbar /><Profile /></></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><><Navbar /><Admin /></></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}