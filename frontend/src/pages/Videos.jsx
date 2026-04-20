import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Videos() {
  const { token } = useAuth();
  const [videos, setVideos] = useState([]);
  const [subject, setSubject] = useState('All');
  const subjects = ['All', 'History', 'Geography', 'Polity', 'GK', 'Maths', 'Tamil'];

  useEffect(() => {
    axios.get('/api/videos', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setVideos(res.data));
  }, []);

  const filtered = subject === 'All' ? videos : videos.filter(v => v.subject === subject);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📹 Video Lessons</h1>
        <p>Expert lectures for your UPSC & TNPSC preparation</p>
      </div>

      <div className="filter-bar">
        {subjects.map(s => (
          <button key={s} onClick={() => setSubject(s)}
            className={`filter-btn ${subject === s ? 'active' : ''}`}>
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: 64, marginBottom: 16 }}>📹</div>
          <h3>Videos Coming Soon!</h3>
          <p>Class recordings will be uploaded after each live session.</p>
          <p style={{ marginTop: 8 }}>A few helpful study videos will also be added soon.</p>
          <div style={{ marginTop: 20, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, padding: '16px 24px', display: 'inline-block' }}>
            <p style={{ color: '#c9a84c', fontWeight: 600, margin: 0 }}>📅 Check back after your live class!</p>
          </div>
        </div>
      ) : (
        <div className="card-grid card-grid-auto">
          {filtered.map(video => (
            <div key={video._id} className="video-card">
              <iframe
                width="100%" height="200"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                frameBorder="0" allowFullScreen title={video.title}
              />
              <div className="video-card-body">
                <h3>{video.title}</h3>
                <span className="badge badge-blue">{video.subject}</span>
                {video.description && (
                  <p style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>{video.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
