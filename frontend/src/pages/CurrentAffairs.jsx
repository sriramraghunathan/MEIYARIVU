import { useState } from 'react';

const CA_CHANNELS = [
  { name: 'Vision IAS', youtubeId: 'UCcedLRpRgEMXDmODIFPQXbg', type: 'channel' },
];

const CA_VIDEOS = [
  { title: 'Daily Current Affairs - UPSC/TNPSC', youtubeId: 'pITbPbBtCvs', category: 'Daily CA' },
  { title: 'Monthly Current Affairs Compilation', youtubeId: 'Umvg1DLR36c', category: 'Monthly CA' },
  { title: 'The Hindu Analysis Today', youtubeId: 'mEFwMoxVMCQ', category: 'Newspaper' },
  { title: 'PIB Weekly Summary', youtubeId: 'rHqCMdsBJDI', category: 'Government' },
  { title: 'International Affairs Weekly', youtubeId: 'KJucKMRMWoI', category: 'International' },
  { title: 'Economy Current Affairs', youtubeId: 'dQw4w9WgXcQ', category: 'Economy' },
];

const CATEGORIES = ['All', 'Daily CA', 'Monthly CA', 'Newspaper', 'Government', 'International', 'Economy'];

const NEWS_TOPICS = [
  { title: 'India signs new trade agreement with UAE', category: 'Economy', date: 'Today' },
  { title: 'UPSC Civil Services 2024 notification released', category: 'Exam', date: 'Today' },
  { title: 'New education policy updates announced', category: 'Education', date: 'Yesterday' },
  { title: 'Supreme Court landmark judgment on privacy', category: 'Polity', date: 'Yesterday' },
  { title: 'India GDP growth rate hits 7.2% in Q3', category: 'Economy', date: '2 days ago' },
  { title: 'ISRO successfully launches new satellite', category: 'Science', date: '2 days ago' },
  { title: 'Tamil Nadu announces new infrastructure projects', category: 'State', date: '3 days ago' },
  { title: 'G20 summit outcomes and India\'s role', category: 'International', date: '3 days ago' },
];

export default function CurrentAffairs() {
  const [category, setCategory] = useState('All');

  const filtered = category === 'All' ? CA_VIDEOS : CA_VIDEOS.filter(v => v.category === category);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📰 Current Affairs</h1>
        <p>Stay updated with daily news and analysis for UPSC & TNPSC</p>
      </div>

      {/* Exam Countdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        {[
          { exam: 'TNPSC Group 2', date: '2025-06-15', color: '#1a3a6b' },
          { exam: 'UPSC Prelims', date: '2025-05-25', color: '#c9a84c' },
        ].map(({ exam, date, color }) => {
          const days = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
          return (
            <div key={exam} style={{ background: color, borderRadius: 16, padding: 24, color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: 42, fontWeight: 800, fontFamily: 'Outfit' }}>{days > 0 ? days : 0}</div>
              <div style={{ fontSize: 14, opacity: 0.8 }}>days until</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginTop: 4 }}>{exam}</div>
            </div>
          );
        })}
      </div>

      {/* News Headlines */}
      <div className="card" style={{ marginBottom: 32 }}>
        <h3 style={{ fontFamily: 'Outfit', fontSize: 18, marginBottom: 16 }}>📢 Latest Headlines</h3>
        {NEWS_TOPICS.map((news, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < NEWS_TOPICS.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
            <span className="badge badge-blue">{news.category}</span>
            <span style={{ flex: 1, fontSize: 14, color: '#0a1628' }}>{news.title}</span>
            <span style={{ fontSize: 12, color: '#94a3b8', flexShrink: 0 }}>{news.date}</span>
          </div>
        ))}
        <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 12 }}>* Update these headlines from the Admin panel with real news</p>
      </div>

      {/* Video Section */}
      <h2 style={{ fontFamily: 'Outfit', fontSize: 22, marginBottom: 16 }}>📹 Video Analysis</h2>
      <div className="filter-bar">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={`filter-btn ${category === c ? 'active' : ''}`}>{c}</button>
        ))}
      </div>

      <div className="card-grid card-grid-auto">
        {filtered.map((video, i) => (
          <div key={i} className="video-card">
            <iframe width="100%" height="200"
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              frameBorder="0" allowFullScreen title={video.title} />
            <div className="video-card-body">
              <h3>{video.title}</h3>
              <span className="badge badge-gold">{video.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}