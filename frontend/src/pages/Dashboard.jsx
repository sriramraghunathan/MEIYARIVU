import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

// ── Mobile styles injected once ────────────────────────────────────────────
const dashMobileStyles = `
  @media (max-width: 768px) {

    /* Hero section */
    .hero {
      padding: 40px 20px 32px !important;
    }
    .hero h1 {
      font-size: 22px !important;
    }
    .hero p {
      font-size: 14px !important;
    }
    .hero > div[style] {
      flex-direction: column !important;
      align-items: center !important;
    }
    .hero > div[style] a {
      width: 100% !important;
      max-width: 300px !important;
      text-align: center !important;
    }

    /* Hero stats */
    .hero-stats {
      flex-wrap: wrap !important;
      gap: 16px !important;
      justify-content: center !important;
    }
    .hero-stat {
      min-width: 80px !important;
    }
    .hero-stat h3 {
      font-size: 22px !important;
    }

    /* Page container */
    .page-container {
      padding: 16px !important;
    }

    /* Card grid → single column */
    .card-grid-3 {
      grid-template-columns: 1fr !important;
      gap: 12px !important;
    }

    /* Stat cards */
    .stat-card {
      padding: 16px !important;
    }

    /* Card */
    .card {
      padding: 16px !important;
      border-radius: 12px !important;
    }

    /* Page header inside card */
    .page-header h1 {
      font-size: 18px !important;
    }
    .page-header p {
      font-size: 13px !important;
    }

    /* Table → scrollable */
    .table {
      display: block !important;
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch !important;
      font-size: 13px !important;
    }
    .table th,
    .table td {
      white-space: nowrap !important;
      padding: 10px 12px !important;
    }

    /* Empty state */
    .empty-state {
      padding: 24px 16px !important;
    }
    .empty-state h3 {
      font-size: 16px !important;
    }
  }

  @media (max-width: 480px) {
    .hero h1 {
      font-size: 19px !important;
    }
    .hero-badge {
      font-size: 11px !important;
      padding: 4px 12px !important;
    }
    .hero-stat h3 {
      font-size: 20px !important;
    }
  }
`;

function InjectDashMobileStyles() {
  useEffect(() => {
    const id = "mei-dash-mobile-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = dashMobileStyles;
      document.head.appendChild(tag);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);
  return null;
}

export default function Dashboard() {
  const { user, token } = useAuth();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios
      .get("/api/scores/mine", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setScores(res.data))
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <InjectDashMobileStyles />

      <div className="hero">
        <div className="hero-badge">
          🎯 🎯 மெய்யறிவு — போட்டி தேர்வுகளுக்கான அகாடமி
        </div>
        <h1>
          Welcome back, <span>{user?.name}</span>!
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            justifyContent: "center",
          }}
        >
          {/* ✅ Profile Image */}
          <img
            src={user?.photoURL || "https://via.placeholder.com/40"}
            alt="Profile"
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #4f46e5",
            }}
          />

          <div>
            <h1 style={{ margin: 0 }}>
              Welcome back, <span>{user?.displayName || user?.email}</span>!
            </h1>

            {/* ✅ Email */}
            <p style={{ margin: 0, fontSize: 13, opacity: 0.8 }}>
              {user?.email}
            </p>
          </div>
        </div>
        <p>Your success journey continues. Pick up where you left off.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link to="/tests" className="btn btn-primary btn-lg">
            Start Mock Test →
          </Link>
          <Link to="/videos" className="btn btn-outline btn-lg">
            Watch Videos
          </Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <h3>{scores.length}</h3>
            <p>Tests Attempted</p>
          </div>
          <div className="hero-stat">
            <h3>
              {scores.length > 0
                ? Math.round(
                    scores.reduce((a, s) => a + (s.score / s.total) * 100, 0) /
                      scores.length,
                  )
                : 0}
              %
            </h3>
            <p>Average Score</p>
          </div>
          <div className="hero-stat">
            <h3>
              {scores.length > 0
                ? Math.max(
                    ...scores.map((s) => Math.round((s.score / s.total) * 100)),
                  )
                : 0}
              %
            </h3>
            <p>Best Score</p>
          </div>
        </div>
      </div>

      <div className="page-container">
        <div className="card-grid card-grid-3" style={{ marginBottom: 40 }}>
          <Link
            to="/videos"
            className="stat-card"
            style={{ textDecoration: "none" }}
          >
            <div className="stat-icon blue">📹</div>
            <div>
              <h3>Video Lessons</h3>
              <p>Watch expert lectures</p>
            </div>
          </Link>
          <Link
            to="/tests"
            className="stat-card"
            style={{ textDecoration: "none" }}
          >
            <div className="stat-icon green">📝</div>
            <div>
              <h3>Mock Tests</h3>
              <p>Practice with timer</p>
            </div>
          </Link>
          <Link
            to="/leaderboard"
            className="stat-card"
            style={{ textDecoration: "none" }}
          >
            <div className="stat-icon orange">🏆</div>
            <div>
              <h3>Leaderboard</h3>
              <p>See your ranking</p>
            </div>
          </Link>
        </div>

        <div className="card">
          <div className="page-header">
            <h1>Recent Test Scores</h1>
            <p>Your last attempted tests</p>
          </div>
          {scores.length === 0 ? (
            <div className="empty-state">
              <h3>No tests taken yet</h3>
              <p>Take your first mock test to see your scores here</p>
              <Link
                to="/tests"
                className="btn btn-primary"
                style={{ marginTop: 16, display: "inline-block" }}
              >
                Take a Test →
              </Link>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((s) => (
                  <tr key={s._id}>
                    <td>{s.test?.title}</td>
                    <td>
                      <strong>
                        {s.score}/{s.total}
                      </strong>
                    </td>
                    <td>
                      <span
                        className={`badge ${Math.round((s.score / s.total) * 100) >= 60 ? "badge-green" : "badge-blue"}`}
                      >
                        {Math.round((s.score / s.total) * 100)}%
                      </span>
                    </td>
                    <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
