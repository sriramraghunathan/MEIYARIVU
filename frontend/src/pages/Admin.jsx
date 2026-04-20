import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const { token } = useAuth();
  const [tab, setTab] = useState('videos');
  const [stats, setStats] = useState({});
  const [students, setStudents] = useState([]);
  const [videoForm, setVideoForm] = useState({ title: '', youtubeId: '', subject: 'History', description: '' });
  const [videos, setVideos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', youtubeId: '', subject: 'History', description: '' });
  const [questionForm, setQuestionForm] = useState({ questionText: '', options: ['', '', '', ''], correctIndex: 0, subject: 'History' });
  const [testForm, setTestForm] = useState({ title: '', subject: '', durationMinutes: 30 });
  const [liveClasses, setLiveClasses] = useState([]);
  const [liveForm, setLiveForm] = useState({
    title: '',
    description: '',
    subject: 'History',
    date: '',
    time: '',
    meetLink: '',
    duration: 60
  });
  const [liveEditingId, setLiveEditingId] = useState(null);
  const [liveEditForm, setLiveEditForm] = useState({
    title: '',
    description: '',
    subject: 'History',
    date: '',
    time: '',
    meetLink: '',
    duration: 60,
    isActive: true
  });
  const subjects = ['History', 'Geography', 'Polity', 'GK', 'Maths', 'Tamil'];

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const h = authHeaders;
    axios.get('/api/admin/stats', h).then(r => setStats(r.data));
    axios.get('/api/admin/students', h).then(r => setStudents(r.data));
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get('/api/videos', authHeaders);
      setVideos(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (tab !== 'videos' || !token) return;
    fetchVideos();
  }, [tab, token]);

  const addVideo = async () => {
    await axios.post('/api/videos', videoForm, authHeaders);
    alert('Video added!');
    setVideoForm({ title: '', youtubeId: '', subject: 'History', description: '' });
    fetchVideos();
  };

  const startEdit = (v) => {
    setEditingId(v._id);
    setEditForm({
      title: v.title || '',
      youtubeId: v.youtubeId || '',
      subject: v.subject || 'History',
      description: v.description || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    await axios.put(`/api/videos/${editingId}`, editForm, authHeaders);
    setEditingId(null);
    fetchVideos();
  };

  const deleteVideo = async (id) => {
    if (!window.confirm('Delete this video? This cannot be undone.')) return;
    await axios.delete(`/api/videos/${id}`, authHeaders);
    fetchVideos();
  };

  const fetchLiveClasses = async () => {
    try {
      const res = await axios.get('/api/liveclasses?all=true', authHeaders);
      setLiveClasses(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (tab !== 'live' || !token) return;
    fetchLiveClasses();
  }, [tab, token]);

  const pad2 = (n) => String(n).padStart(2, '0');
  const scheduledToDateTimeInputs = (iso) => {
    const d = new Date(iso);
    return {
      date: `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`,
      time: `${pad2(d.getHours())}:${pad2(d.getMinutes())}`
    };
  };

  const addLiveClass = async () => {
    if (!liveForm.date || !liveForm.time) {
      alert('Please select date and time');
      return;
    }
    await axios.post(
      '/api/liveclasses',
      {
        title: liveForm.title,
        description: liveForm.description,
        subject: liveForm.subject,
        scheduledAt: new Date(`${liveForm.date}T${liveForm.time}`).toISOString(),
        meetLink: liveForm.meetLink,
        duration: Number(liveForm.duration),
        isActive: true
      },
      authHeaders
    );
    alert('Live class scheduled!');
    setLiveForm({
      title: '',
      description: '',
      subject: 'History',
      date: '',
      time: '',
      meetLink: '',
      duration: 60
    });
    fetchLiveClasses();
  };

  const startLiveEdit = (lc) => {
    const { date, time } = scheduledToDateTimeInputs(lc.scheduledAt);
    setLiveEditingId(lc._id);
    setLiveEditForm({
      title: lc.title || '',
      description: lc.description || '',
      subject: lc.subject || 'History',
      date,
      time,
      meetLink: lc.meetLink || '',
      duration: lc.duration ?? 60,
      isActive: lc.isActive !== false
    });
  };

  const cancelLiveEdit = () => setLiveEditingId(null);

  const saveLiveEdit = async () => {
    if (!liveEditingId || !liveEditForm.date || !liveEditForm.time) return;
    await axios.put(
      `/api/liveclasses/${liveEditingId}`,
      {
        title: liveEditForm.title,
        description: liveEditForm.description,
        subject: liveEditForm.subject,
        scheduledAt: new Date(`${liveEditForm.date}T${liveEditForm.time}`).toISOString(),
        meetLink: liveEditForm.meetLink,
        duration: Number(liveEditForm.duration),
        isActive: liveEditForm.isActive
      },
      authHeaders
    );
    setLiveEditingId(null);
    fetchLiveClasses();
  };

  const deleteLiveClass = async (id) => {
    if (!window.confirm('Delete this live class?')) return;
    await axios.delete(`/api/liveclasses/${id}`, authHeaders);
    fetchLiveClasses();
  };

  const addQuestion = async () => {
    const res = await axios.post('/api/tests/question', questionForm, { headers: { Authorization: `Bearer ${token}` } });
    alert(`Question added! ID: ${res.data._id}`);
  };

  const addTest = async () => {
    await axios.post('/api/tests', testForm, { headers: { Authorization: `Bearer ${token}` } });
    alert('Test created!');
    setTestForm({ title: '', subject: '', durationMinutes: 30 });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>⚙️ Admin Panel</h1>
        <p>Manage content, students and platform settings</p>
      </div>

      <div className="card-grid card-grid-2" style={{ marginBottom: 32 }}>
        <div className="admin-stat">
          <div className="number">{stats.totalStudents || 0}</div>
          <div className="label">👨‍🎓 Total Students</div>
        </div>
        <div className="admin-stat">
          <div className="number">{stats.totalAttempts || 0}</div>
          <div className="label">📝 Test Attempts</div>
        </div>
      </div>

      <div className="tabs">
        {['videos', 'questions', 'tests', 'live', 'students'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`tab ${tab === t ? 'active' : ''}`}>
            {t === 'live' ? 'Live Classes' : t}
          </button>
        ))}
      </div>

      {tab === 'videos' && (
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>Add Video Lesson</h3>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="form-input" value={videoForm.title}
              onChange={e => setVideoForm({ ...videoForm, title: e.target.value })}
              placeholder="e.g. Indian History - Part 1" />
          </div>
          <div className="form-group">
            <label className="form-label">YouTube Video ID</label>
            <input className="form-input" value={videoForm.youtubeId}
              onChange={e => setVideoForm({ ...videoForm, youtubeId: e.target.value })}
              placeholder="e.g. dQw4w9WgXcQ" />
            <div className="hint-box">💡 YouTube ID is the part after "v=" in the URL. For youtube.com/watch?v=<strong>abc123</strong> enter abc123</div>
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <select className="form-select" value={videoForm.subject}
              onChange={e => setVideoForm({ ...videoForm, subject: e.target.value })}>
              {subjects.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Description (optional)</label>
            <textarea className="form-textarea" value={videoForm.description}
              onChange={e => setVideoForm({ ...videoForm, description: e.target.value })}
              placeholder="Brief description of the video" />
          </div>
          <button onClick={addVideo} className="btn btn-primary btn-lg">Add Video</button>

          <h3 style={{ marginTop: 32, marginBottom: 16 }}>Existing videos</h3>
          {videos.length === 0 ? (
            <p style={{ color: '#64748b' }}>No videos yet. Add one above.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {videos.map(v => (
                <li key={v._id} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 16, marginBottom: 12, background: '#fff' }}>
                  {editingId === v._id ? (
                    <div>
                      <div className="form-group">
                        <label className="form-label">Title</label>
                        <input className="form-input" value={editForm.title}
                          onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">YouTube Video ID</label>
                        <input className="form-input" value={editForm.youtubeId}
                          onChange={e => setEditForm({ ...editForm, youtubeId: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Subject</label>
                        <select className="form-select" value={editForm.subject}
                          onChange={e => setEditForm({ ...editForm, subject: e.target.value })}>
                          {subjects.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea className="form-textarea" value={editForm.description}
                          onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
                      </div>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <button type="button" onClick={saveEdit} className="btn btn-primary">Save</button>
                        <button type="button" onClick={cancelEdit} className="btn btn-outline">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{v.title}</div>
                        <div style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>{v.subject}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button type="button" onClick={() => startEdit(v)} className="btn btn-outline btn-sm">Edit</button>
                        <button type="button" onClick={() => deleteVideo(v._id)} className="btn btn-danger btn-sm">Delete</button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === 'questions' && (
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>Add Question</h3>
          <div className="form-group">
            <label className="form-label">Question Text</label>
            <textarea className="form-textarea" value={questionForm.questionText}
              onChange={e => setQuestionForm({ ...questionForm, questionText: e.target.value })}
              placeholder="Enter the question here..." />
          </div>
          {questionForm.options.map((opt, i) => (
            <div className="form-group" key={i}>
              <label className="form-label">
                Option {i + 1} {i === questionForm.correctIndex ? <span className="badge badge-green">✓ Correct</span> : ''}
              </label>
              <input className="form-input" value={opt}
                onChange={e => { const o = [...questionForm.options]; o[i] = e.target.value; setQuestionForm({ ...questionForm, options: o }); }}
                placeholder={`Option ${i + 1}`} />
            </div>
          ))}
          <div className="form-group">
            <label className="form-label">Correct Answer</label>
            <select className="form-select" value={questionForm.correctIndex}
              onChange={e => setQuestionForm({ ...questionForm, correctIndex: Number(e.target.value) })}>
              {[0, 1, 2, 3].map(i => <option key={i} value={i}>Option {i + 1}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <select className="form-select" value={questionForm.subject}
              onChange={e => setQuestionForm({ ...questionForm, subject: e.target.value })}>
              {subjects.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={addQuestion} className="btn btn-success btn-lg">Add Question</button>
        </div>
      )}

      {tab === 'tests' && (
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>Create Test</h3>
          <div className="form-group">
            <label className="form-label">Test Title</label>
            <input className="form-input" value={testForm.title}
              onChange={e => setTestForm({ ...testForm, title: e.target.value })}
              placeholder="e.g. TNPSC Group 2 - History Mock Test 1" />
          </div>
          <div className="form-group">
            <label className="form-label">Subject (optional)</label>
            <input className="form-input" value={testForm.subject}
              onChange={e => setTestForm({ ...testForm, subject: e.target.value })}
              placeholder="e.g. History" />
          </div>
          <div className="form-group">
            <label className="form-label">Duration (minutes)</label>
            <input className="form-input" type="number" value={testForm.durationMinutes}
              onChange={e => setTestForm({ ...testForm, durationMinutes: Number(e.target.value) })} />
          </div>
          <button onClick={addTest} className="btn btn-primary btn-lg">Create Test</button>
        </div>
      )}

      {tab === 'live' && (
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>Schedule Live Class</h3>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              className="form-input"
              value={liveForm.title}
              onChange={(e) => setLiveForm({ ...liveForm, title: e.target.value })}
              placeholder="e.g. Group 2 Polity Marathon"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={liveForm.description}
              onChange={(e) => setLiveForm({ ...liveForm, description: e.target.value })}
              placeholder="What students can expect"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <select
              className="form-select"
              value={liveForm.subject}
              onChange={(e) => setLiveForm({ ...liveForm, subject: e.target.value })}
            >
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label className="form-label">Date</label>
              <input
                className="form-input"
                type="date"
                value={liveForm.date}
                onChange={(e) => setLiveForm({ ...liveForm, date: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Time</label>
              <input
                className="form-input"
                type="time"
                value={liveForm.time}
                onChange={(e) => setLiveForm({ ...liveForm, time: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Meeting Link (Google Meet or Zoom)</label>
            <input
              className="form-input"
              type="url"
              value={liveForm.meetLink}
              onChange={(e) => setLiveForm({ ...liveForm, meetLink: e.target.value })}
              placeholder="https://meet.google.com/... or https://zoom.us/j/..."
            />
          </div>
          <div className="form-group">
            <label className="form-label">Duration (minutes)</label>
            <input
              className="form-input"
              type="number"
              min={15}
              step={15}
              value={liveForm.duration}
              onChange={(e) => setLiveForm({ ...liveForm, duration: Number(e.target.value) })}
            />
          </div>
          <button type="button" onClick={addLiveClass} className="btn btn-primary btn-lg">
            Add Live Class
          </button>

          <h3 style={{ marginTop: 32, marginBottom: 16 }}>Scheduled classes</h3>
          {liveClasses.length === 0 ? (
            <p style={{ color: '#64748b' }}>No live classes yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {liveClasses.map((lc) => (
                <li
                  key={lc._id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: 10,
                    padding: 16,
                    marginBottom: 12,
                    background: '#fff'
                  }}
                >
                  {liveEditingId === lc._id ? (
                    <div>
                      <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                          className="form-input"
                          value={liveEditForm.title}
                          onChange={(e) => setLiveEditForm({ ...liveEditForm, title: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-textarea"
                          value={liveEditForm.description}
                          onChange={(e) => setLiveEditForm({ ...liveEditForm, description: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Subject</label>
                        <select
                          className="form-select"
                          value={liveEditForm.subject}
                          onChange={(e) => setLiveEditForm({ ...liveEditForm, subject: e.target.value })}
                        >
                          {subjects.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                          <label className="form-label">Date</label>
                          <input
                            className="form-input"
                            type="date"
                            value={liveEditForm.date}
                            onChange={(e) => setLiveEditForm({ ...liveEditForm, date: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="form-label">Time</label>
                          <input
                            className="form-input"
                            type="time"
                            value={liveEditForm.time}
                            onChange={(e) => setLiveEditForm({ ...liveEditForm, time: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Google Meet link</label>
                        <input
                          className="form-input"
                          type="url"
                          value={liveEditForm.meetLink}
                          onChange={(e) => setLiveEditForm({ ...liveEditForm, meetLink: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Duration (minutes)</label>
                        <input
                          className="form-input"
                          type="number"
                          min={15}
                          step={15}
                          value={liveEditForm.duration}
                          onChange={(e) =>
                            setLiveEditForm({ ...liveEditForm, duration: Number(e.target.value) })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <input
                            type="checkbox"
                            checked={liveEditForm.isActive}
                            onChange={(e) =>
                              setLiveEditForm({ ...liveEditForm, isActive: e.target.checked })
                            }
                          />
                          Active (visible to students)
                        </label>
                      </div>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <button type="button" onClick={saveLiveEdit} className="btn btn-primary">
                          Save
                        </button>
                        <button type="button" onClick={cancelLiveEdit} className="btn btn-outline">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700 }}>{lc.title}</div>
                        <div style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>
                          {lc.subject} · {new Date(lc.scheduledAt).toLocaleString()} · {lc.duration} min
                          {!lc.isActive && (
                            <span className="badge" style={{ marginLeft: 8 }}>
                              Inactive
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button type="button" onClick={() => startLiveEdit(lc)} className="btn btn-outline btn-sm">
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteLiveClass(lc._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === 'students' && (
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>Registered Students ({students.length})</h3>
          {students.length === 0 ? (
            <div className="empty-state">
              <h3>No students yet</h3>
              <p>Students will appear here once they register</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s._id}>
                    <td><strong>{s.name}</strong></td>
                    <td>{s.email}</td>
                    <td>{s.phone || '-'}</td>
                    <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}