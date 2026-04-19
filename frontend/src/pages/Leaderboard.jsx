import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Leaderboard() {
  const { token } = useAuth();
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState('');
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get('/api/tests', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { setTests(res.data); if (res.data[0]) setSelectedTest(res.data[0]._id); });
  }, []);

  useEffect(() => {
    if (!selectedTest) return;
    axios.get(`/api/scores/leaderboard/${selectedTest}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setScores(res.data));
  }, [selectedTest]);

  const rowClass = (i) => {
    if (i === 0) return 'leaderboard-row gold-bg';
    if (i === 1) return 'leaderboard-row silver-bg';
    if (i === 2) return 'leaderboard-row bronze-bg';
    return 'leaderboard-row';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🏆 Leaderboard</h1>
        <p>Top performers across all mock tests</p>
      </div>

      <div className="card" style={{ marginBottom: 28 }}>
        <label className="form-label">Select Test</label>
        <select className="form-select" value={selectedTest}
          onChange={e => setSelectedTest(e.target.value)}
          style={{ maxWidth: 400 }}>
          {tests.map(t => <option key={t._id} value={t._id}>{t.title}</option>)}
        </select>
      </div>

      {scores.length === 0 ? (
        <div className="empty-state">
          <h3>No scores yet</h3>
          <p>Be the first to take this test!</p>
        </div>
      ) : (
        <div>
          {scores.map((s, i) => (
            <div key={s._id} className={rowClass(i)}>
              <div className="rank-badge">
                {['🥇', '🥈', '🥉'][i] || <span style={{ fontWeight: 700, color: '#64748b' }}>#{i + 1}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#0a1628' }}>{s.user?.name}</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>
                  {s.timeTaken ? `Completed in ${Math.floor(s.timeTaken / 60)}m ${s.timeTaken % 60}s` : ''}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#0a1628' }}>{s.score}/{s.total}</div>
                <span className={`badge ${Math.round((s.score / s.total) * 100) >= 60 ? 'badge-green' : 'badge-blue'}`}>
                  {Math.round((s.score / s.total) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}