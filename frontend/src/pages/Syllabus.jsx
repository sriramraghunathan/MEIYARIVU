import { useState, useEffect } from 'react';

const SYLLABUS = {
  'TNPSC': {
    'General Studies': [
      'Unit 1 - General Science',
      'Unit 2 - Current Events',
      'Unit 3 - Geography of India',
      'Unit 4 - History & Culture of India',
      'Unit 5 - Indian Polity',
      'Unit 6 - Indian Economy',
      'Unit 7 - Indian National Movement',
      'Unit 8 - Aptitude & Mental Ability',
    ],
    'Tamil Language': [
      'Tamil Literature',
      'Tamil Grammar',
      'Tamil Culture',
    ]
  },
  'UPSC': {
    'Prelims GS Paper 1': [
      'History of India & Indian National Movement',
      'Indian & World Geography',
      'Indian Polity & Governance',
      'Economic & Social Development',
      'Environmental Ecology & Climate Change',
      'General Science',
      'Current Events of National & International Importance',
    ],
    'Prelims GS Paper 2 (CSAT)': [
      'Comprehension',
      'Interpersonal Skills & Communication',
      'Logical Reasoning & Analytical Ability',
      'Decision Making & Problem Solving',
      'General Mental Ability',
      'Basic Numeracy',
    ],
    'Mains GS Paper 1': [
      'Indian Heritage & Culture',
      'Modern Indian History',
      'World History',
      'Indian Society',
      'Geography',
    ],
    'Mains GS Paper 2': [
      'Indian Constitution & Polity',
      'Social Justice',
      'International Relations',
    ],
    'Mains GS Paper 3': [
      'Indian Economy',
      'Agriculture',
      'Science & Technology',
      'Environment & Ecology',
      'Disaster Management',
      'Internal Security',
    ],
    'Mains GS Paper 4': [
      'Ethics, Integrity & Aptitude',
      'Attitude & Foundational Values',
      'Emotional Intelligence',
      'Public Administration & Governance',
    ],
  }
};

export default function Syllabus() {
  const [exam, setExam] = useState('TNPSC');
  const [done, setDone] = useState(() => JSON.parse(localStorage.getItem('syllabus_done') || '{}'));

  const toggle = (key) => {
    const updated = { ...done, [key]: !done[key] };
    setDone(updated);
    localStorage.setItem('syllabus_done', JSON.stringify(updated));
  };

  const topics = Object.values(SYLLABUS[exam]).flat();
  const completed = topics.filter(t => done[`${exam}_${t}`]).length;
  const percent = Math.round((completed / topics.length) * 100);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📋 Syllabus Tracker</h1>
        <p>Track your preparation progress topic by topic</p>
      </div>

      <div className="tabs" style={{ marginBottom: 24 }}>
        {['TNPSC', 'UPSC'].map(e => (
          <button key={e} onClick={() => setExam(e)} className={`tab ${exam === e ? 'active' : ''}`}>{e}</button>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontFamily: 'Outfit', fontSize: 18 }}>Overall Progress</h3>
          <span style={{ fontWeight: 700, fontSize: 20, color: '#0a1628' }}>{percent}%</span>
        </div>
        <div style={{ background: '#f1f5f9', borderRadius: 99, height: 12, overflow: 'hidden' }}>
          <div style={{ width: `${percent}%`, height: '100%', background: 'linear-gradient(90deg, #c9a84c, #e8c97a)', borderRadius: 99, transition: 'width 0.4s' }} />
        </div>
        <p style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>{completed} of {topics.length} topics completed</p>
      </div>

      {Object.entries(SYLLABUS[exam]).map(([section, items]) => (
        <div key={section} className="card" style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'Outfit', fontSize: 17, marginBottom: 16, color: '#0a1628' }}>{section}</h3>
          {items.map(topic => {
            const key = `${exam}_${topic}`;
            return (
              <div key={topic} onClick={() => toggle(key)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: done[key] ? 'none' : '2px solid #cbd5e1', background: done[key] ? '#22c55e' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                  {done[key] && <span style={{ color: 'white', fontSize: 13 }}>✓</span>}
                </div>
                <span style={{ fontSize: 14, color: done[key] ? '#94a3b8' : '#0a1628', textDecoration: done[key] ? 'line-through' : 'none' }}>{topic}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}