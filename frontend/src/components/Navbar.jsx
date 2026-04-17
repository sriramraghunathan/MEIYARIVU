import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        <div className="logo-icon">🎯</div>
        <div>
          <div className="logo-text">மெய்யறிவு</div>
          <div style={{ color: '#a8b8d0', fontSize: 9, letterSpacing: 0.5 }}>COMPETITIVE EXAMS</div>
        </div>
      </Link>
      {user && (
        <>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/videos" className="nav-link">Videos</Link>
          <Link to="/tests" className="nav-link">Mock Tests</Link>
          <Link to="/live-classes" className="nav-link">Live Classes</Link>
          <Link to="/pyq" className="nav-link">PYQ</Link>
          <Link to="/current-affairs" className="nav-link">Current Affairs</Link>
          <Link to="/syllabus" className="nav-link">Syllabus</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          {user.role === 'admin' && (
            <Link to="/admin" className="nav-link admin">⚙️ Admin</Link>
          )}
          <div className="nav-right">
            <Link to="/profile" className="nav-link">👤 {user.name}</Link>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </>
      )}
    </nav>
  );
}