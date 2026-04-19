import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get('/api/scores/mine', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setScores(res.data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="hero">
        <div className="hero-badge">🎯 🎯 மெய்யறிவு — போட்டி தேர்வுகளுக்கான அகாடமி</div>
        <h1>Welcome back, <span>{user?.name}</span>!</h1>
        <p>Your success journey continues. Pick up where you left off.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/tests" className="btn btn-primary btn-lg">Start Mock Test →</Link>
          <Link to="/videos" className="btn btn-outline btn-lg">Watch Videos</Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <h3>{scores.length}</h3>
            <p>Tests Attempted</p>
          </div>
          <div className="hero-stat">
            <h3>{scores.length > 0 ? Math.round(scores.reduce((a, s) => a + (s.score / s.total) * 100, 0) / scores.length) : 0}%</h3>
            <p>Average Score</p>
          </div>
          <div className="hero-stat">
            <h3>{scores.length > 0 ? Math.max(...scores.map(s => Math.round((s.score / s.total) * 100))) : 0}%</h3>
            <p>Best Score</p>
          </div>
        </div>
      </div>

      <div className="page-container">
        <div className="card-grid card-grid-3" style={{ marginBottom: 40 }}>
          <Link to="/videos" className="stat-card" style={{ textDecoration: 'none' }}>
            <div className="stat-icon blue">📹</div>
            <div>
              <h3>Video Lessons</h3>
              <p>Watch expert lectures</p>
            </div>
          </Link>
          <Link to="/tests" className="stat-card" style={{ textDecoration: 'none' }}>
            <div className="stat-icon green">📝</div>
            <div>
              <h3>Mock Tests</h3>
              <p>Practice with timer</p>
            </div>
          </Link>
          <Link to="/leaderboard" className="stat-card" style={{ textDecoration: 'none' }}>
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
              <Link to="/tests" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-block' }}>Take a Test →</Link>
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
                {scores.map(s => (
                  <tr key={s._id}>
                    <td>{s.test?.title}</td>
                    <td><strong>{s.score}/{s.total}</strong></td>
                    <td>
                      <span className={`badge ${Math.round((s.score / s.total) * 100) >= 60 ? 'badge-green' : 'badge-blue'}`}>
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