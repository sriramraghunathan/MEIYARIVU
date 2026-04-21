import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/mei1.jpeg";
import { useState, useEffect } from "react";

// ── Mobile styles injected once ────────────────────────────────────────────
const navMobileStyles = `
  .mei-hamburger { display: none; }

  @media (max-width: 768px) {
    /* Hide all nav links by default on mobile */
    .navbar > a.nav-link,
    .navbar > .nav-right {
      display: none !important;
    }

    /* Show hamburger */
    .mei-hamburger {
      display: flex;
      margin-left: auto;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      color: white;
      width: 38px;
      height: 38px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 18px;
      flex-shrink: 0;
    }

    /* Mobile dropdown panel */
    .mei-mobile-menu {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #0a1628;
      border-top: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      padding: 12px 0;
      z-index: 999;
    }

    .mei-mobile-menu a.nav-link,
    .mei-mobile-menu .nav-link {
      display: block !important;
      padding: 12px 24px !important;
      font-size: 15px !important;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .mei-mobile-menu a.nav-link:hover {
      background: rgba(255,255,255,0.05);
    }

    .mei-mobile-menu .mei-mobile-logout {
      margin: 12px 16px 4px;
    }

    .mei-mobile-profile {
      padding: 12px 24px;
      color: #c9a84c;
      font-weight: 600;
      font-size: 15px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
  }

  @media (min-width: 769px) {
    .mei-mobile-menu { display: none !important; }
  }
`;

function InjectNavMobileStyles() {
  useEffect(() => {
    const id = "mei-nav-mobile-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = navMobileStyles;
      document.head.appendChild(tag);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);
  return null;
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const close = () => setMenuOpen(false);

  return (
    <>
      <InjectNavMobileStyles />
      <nav className="navbar" style={{ position: "relative" }}>
        <Link to="/dashboard" className="navbar-brand">
          <div>
            <img src={logo} className="w-16 h-16 rounded-2xl" alt="Logo" />
          </div>
          <div>
            <div className="logo-text">மெய்யறிவு</div>
            <div style={{ color: "#a8b8d0", fontSize: 9, letterSpacing: 0.5 }}>
              COMPETITIVE EXAMS
            </div>
          </div>
        </Link>

        {user && (
          <>
            {/* ── Desktop links (unchanged) ── */}
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/videos" className="nav-link">
              Videos
            </Link>
            <Link to="/tests" className="nav-link">
              Mock Tests
            </Link>
            <Link to="/live-classes" className="nav-link">
              Live Classes
            </Link>
            <Link to="/pyq" className="nav-link">
              PYQ
            </Link>
            <Link to="/current-affairs" className="nav-link">
              Current Affairs
            </Link>
            <Link to="/syllabus" className="nav-link">
              Syllabus
            </Link>
            <Link to="/leaderboard" className="nav-link">
              Leaderboard
            </Link>
            {user.role === "admin" && (
              <Link to="/admin" className="nav-link admin">
                ⚙️ Admin
              </Link>
            )}
            <div className="nav-right">
              <Link to="/profile" className="nav-link ">
                👤 {user.name}
              </Link>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="mei-hamburger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

            {/* ── Mobile dropdown ── */}
            {menuOpen && (
              <div className="mei-mobile-menu">
                <Link
                  to="/profile"
                  className="mei-mobile-profile"
                  onClick={close}
                >
                  👤 {user?.displayName || "User"}
                </Link>{" "}
                <Link to="/dashboard" className="nav-link" onClick={close}>
                  Dashboard
                </Link>
                <Link to="/videos" className="nav-link" onClick={close}>
                  Videos
                </Link>
                <Link to="/tests" className="nav-link" onClick={close}>
                  Mock Tests
                </Link>
                <Link to="/live-classes" className="nav-link" onClick={close}>
                  Live Classes
                </Link>
                <Link to="/pyq" className="nav-link" onClick={close}>
                  PYQ
                </Link>
                <Link
                  to="/current-affairs"
                  className="nav-link"
                  onClick={close}
                >
                  Current Affairs
                </Link>
                <Link to="/syllabus" className="nav-link" onClick={close}>
                  Syllabus
                </Link>
                <Link to="/leaderboard" className="nav-link" onClick={close}>
                  Leaderboard
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin" className="nav-link admin" onClick={close}>
                    ⚙️ Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    close();
                    handleLogout();
                  }}
                  className="btn btn-danger mei-mobile-logout"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </nav>
    </>
  );
}
