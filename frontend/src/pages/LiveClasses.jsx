import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const FIFTEEN_MS = 15 * 60 * 1000;

function getEndMs(c) {
  return new Date(c.scheduledAt).getTime() + c.duration * 60 * 1000;
}

function canJoin(c, now) {
  const start = new Date(c.scheduledAt).getTime();
  const end = getEndMs(c);
  return now >= start - FIFTEEN_MS && now <= end;
}

function isLiveNow(c, now) {
  const start = new Date(c.scheduledAt).getTime();
  const end = getEndMs(c);
  return now >= start - FIFTEEN_MS && now <= end;
}

function formatCountdown(ms) {
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  return parts.join(' ');
}

export default function LiveClasses() {
  const { token } = useAuth();
  const [classes, setClasses] = useState([]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    axios
      .get('/api/liveclasses', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setClasses(res.data))
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatDateTime = (iso) => {
    const d = new Date(iso);
    return {
      date: d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      time: d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📡 Live Classes</h1>
        <p>Join scheduled live sessions with your faculty</p>
      </div>

      {classes.length === 0 ? (
        <div className="empty-state">
          <h3>No live classes scheduled</h3>
          <p>Check back soon for upcoming sessions</p>
        </div>
      ) : (
        <div className="card-grid card-grid-auto">
          {classes.map((c) => {
            const { date, time } = formatDateTime(c.scheduledAt);
            const startMs = new Date(c.scheduledAt).getTime();
            const untilStart = startMs - now;
            const endMs = getEndMs(c);
            const live = isLiveNow(c, now);
            const join = canJoin(c, now) && c.meetLink;

            let countdownLabel = 'Starts in';
            let countdownValue = untilStart > 0 ? formatCountdown(untilStart) : null;
            if (now >= startMs && now <= endMs) {
              countdownLabel = 'Session';
              countdownValue = 'In progress';
            }

            return (
              <div key={c._id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                  {live ? (
                    <span className="badge" style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' }}>
                      Live Now
                    </span>
                  ) : (
                    <span className="badge badge-gold">Upcoming</span>
                  )}
                  <span className="badge badge-blue">{c.subject}</span>
                </div>
                <h3 style={{ fontFamily: 'Outfit', margin: 0 }}>{c.title}</h3>
                <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>{c.description}</p>
                <div style={{ fontSize: 14, color: '#0a1628' }}>
                  <div><strong>Date:</strong> {date}</div>
                  <div><strong>Time:</strong> {time}</div>
                  <div><strong>Duration:</strong> {c.duration} minutes</div>
                </div>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #fefce8 0%, #fffbeb 100%)',
                    border: '1px solid #fde68a',
                    borderRadius: 10,
                    padding: '12px 14px',
                    fontSize: 14
                  }}
                >
                  <span style={{ color: '#92400e' }}>{countdownLabel}: </span>
                  <strong style={{ color: '#1a3a6b' }}>{countdownValue}</strong>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  disabled={!join}
                  onClick={() => join && window.open(c.meetLink, '_blank', 'noopener,noreferrer')}
                  title={!join ? 'Join opens 15 minutes before start time' : 'Open Google Meet'}
                >
                  Join Class
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
