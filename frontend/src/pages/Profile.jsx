import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, token } = useAuth();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get('/api/scores/mine', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setScores(res.data))
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalTests = scores.length;
  const avgScore = totalTests > 0
    ? Math.round(scores.reduce((a, s) => a + (s.score / s.total) * 100, 0) / totalTests)
    : 0;
  const bestScore = totalTests > 0
    ? Math.max(...scores.map(s => Math.round((s.score / s.total) * 100)))
    : 0;

  const getBadges = () => {
    const badges = [];
    if (totalTests >= 1) badges.push({ icon: '🎯', label: 'First Test', color: '#eff6ff' });
    if (totalTests >= 5) badges.push({ icon: '🔥', label: '5 Tests Done', color: '#fff7ed' });
    if (totalTests >= 10) badges.push({ icon: '⚡', label: '10 Tests Done', color: '#fefce8' });
    if (avgScore >= 60) badges.push({ icon: '⭐', label: 'Above Average', color: '#f0fdf4' });
    if (avgScore >= 80) badges.push({ icon: '🏆', label: 'Top Performer', color: '#fefce8' });
    if (bestScore === 100) badges.push({ icon: '💯', label: 'Perfect Score', color: '#fdf4ff' });
    if (badges.length === 0) badges.push({ icon: '🌱', label: 'Just Started', color: '#f0fdf4' });
    return badges;
  };

  const getLevel = () => {
    if (avgScore >= 80) return { label: 'Advanced', color: '#c9a84c' };
    if (avgScore >= 60) return { label: 'Intermediate', color: '#22c55e' };
    return { label: 'Beginner', color: '#3b82f6' };
  };

  const level = getLevel();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👤 My Profile</h1>
        <p>Your preparation journey at a glance</p>
      </div>

      {/* Profile Card */}
      <div className="card" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 28 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #1a3a6b, #c9a84c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, flexShrink: 0 }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
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
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 700 }}>{user?.name}</h2>
          <p style={{ color: '#64748b', fontSize: 14 }}>{user?.email}</p>
          <span style={{ background: level.color, color: 'white', padding: '3px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600, display: 'inline-block', marginTop: 8 }}>
            {level.label}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="card-grid card-grid-3" style={{ marginBottom: 24 }}>
        {[
          { label: 'Tests Taken', value: totalTests, icon: '📝', color: '#eff6ff' },
          { label: 'Average Score', value: `${avgScore}%`, icon: '📊', color: '#f0fdf4' },
          { label: 'Best Score', value: `${bestScore}%`, icon: '🏆', color: '#fefce8' },
        ].map(stat => (
          <div key={stat.label} style={{ background: stat.color, borderRadius: 16, padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>{stat.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Outfit', color: '#0a1628', marginTop: 8 }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'Outfit', marginBottom: 16 }}>Overall Performance</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 14, color: '#64748b' }}>Average Score</span>
          <span style={{ fontSize: 14, fontWeight: 700 }}>{avgScore}%</span>
        </div>
        <div style={{ background: '#f1f5f9', borderRadius: 99, height: 12, overflow: 'hidden' }}>
          <div style={{ width: `${avgScore}%`, height: '100%', background: 'linear-gradient(90deg, #1a3a6b, #c9a84c)', borderRadius: 99, transition: 'width 0.4s' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>0%</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>Target: 60%+</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>100%</span>
        </div>
      </div>

      {/* Badges */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'Outfit', marginBottom: 16 }}>🎖️ Badges Earned</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {getBadges().map((badge, i) => (
            <div key={i} style={{ background: badge.color, borderRadius: 12, padding: '12px 20px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 28 }}>{badge.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#0a1628', marginTop: 4 }}>{badge.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tests */}
      <div className="card">
        <h3 style={{ fontFamily: 'Outfit', marginBottom: 16 }}>Recent Tests</h3>
        {scores.length === 0 ? (
          <div className="empty-state">
            <h3>No tests taken yet</h3>
            <p>Take a mock test to see your history here</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Test</th>
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
  );
}