import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MockTest() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [result, setResult] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    axios.get('/api/tests', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setTests(res.data));
  }, []);

  useEffect(() => {
    if (!activeTest || result) return;
    setTimeLeft(activeTest.durationMinutes * 60);
    setStartTime(Date.now());
  }, [activeTest]);

  useEffect(() => {
    if (timeLeft <= 0 || result) return;
    const timer = setInterval(() => setTimeLeft(t => {
      if (t <= 1) { clearInterval(timer); handleSubmit(); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, result]);

  const startTest = async (testId) => {
    const res = await axios.get(`/api/tests/${testId}`, { headers: { Authorization: `Bearer ${token}` } });
    setActiveTest(res.data);
    setAnswers(new Array(res.data.questions.length).fill(null));
    setResult(null);
    setAnalysis(null);
  };

  const handleSubmit = async () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const res = await axios.post('/api/scores', {
      testId: activeTest._id,
      answers,
      timeTaken,
      total: activeTest.questions.length
    }, { headers: { Authorization: `Bearer ${token}` } });
    setResult(res.data);
    setAnalysis(activeTest.questions.map((q, i) => ({
      question: q.questionText,
      options: q.options,
      correct: q.correctIndex,
      selected: answers[i],
      explanation: q.explanation
    })));
  };

  const formatTime = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const percent = result ? Math.round((result.score / result.total) * 100) : 0;

  const backToTests = () => {
    setActiveTest(null);
    setResult(null);
    setAnalysis(null);
    navigate('/tests');
  };

  const exitTest = () => {
    if (!window.confirm('Are you sure you want to leave? Your progress will be lost.')) return;
    setActiveTest(null);
    setAnswers([]);
    setResult(null);
    setAnalysis(null);
    setTimeLeft(0);
    setStartTime(null);
    navigate('/tests');
  };

  if (result && analysis) return (
    <div className="page-container">
      {/* Result Summary */}
      <div className="card" style={{ textAlign: 'center', marginBottom: 32, padding: 48 }}>
        <div style={{ fontSize: 64 }}>
          {percent >= 80 ? '🏆' : percent >= 60 ? '⭐' : '📚'}
        </div>
        <h2 style={{ fontFamily: 'Outfit', fontSize: 28, marginTop: 12 }}>Test Completed!</h2>
        <div className="result-score">{result.score}<span>/{result.total}</span></div>
        <p style={{ color: '#64748b', fontSize: 18 }}>{percent}% Score</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#22c55e' }}>{result.score}</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>Correct</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#ef4444' }}>{result.total - result.score}</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>Wrong</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#f59e0b' }}>{analysis.filter(a => a.selected === null).length}</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>Skipped</div>
          </div>
        </div>
        <button type="button" onClick={backToTests} className="btn btn-primary btn-lg" style={{ marginTop: 24 }}>
          ← Back to Tests
        </button>
      </div>

      {/* Detailed Analysis */}
      <h2 style={{ fontFamily: 'Outfit', fontSize: 22, marginBottom: 20 }}>📊 Detailed Analysis</h2>
      {analysis.map((a, i) => {
        const isCorrect = a.selected === a.correct;
        const isSkipped = a.selected === null;
        return (
          <div key={i} className="question-card" style={{ marginBottom: 16, borderLeft: `4px solid ${isSkipped ? '#f59e0b' : isCorrect ? '#22c55e' : '#ef4444'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div className="question-number">Question {i + 1}</div>
              <span className={`badge ${isSkipped ? 'badge-gold' : isCorrect ? 'badge-green' : ''}`}
                style={!isCorrect && !isSkipped ? { background: '#fef2f2', color: '#dc2626' } : {}}>
                {isSkipped ? '⏭ Skipped' : isCorrect ? '✓ Correct' : '✗ Wrong'}
              </span>
            </div>
            <div className="question-text">{a.question}</div>
            {a.options.map((opt, oi) => {
              const isCorrectOpt = oi === a.correct;
              const isSelectedOpt = oi === a.selected;
              let bg = '#f8fafc';
              let border = '#e2e8f0';
              let color = '#0a1628';
              if (isCorrectOpt) { bg = '#f0fdf4'; border = '#22c55e'; color = '#166534'; }
              else if (isSelectedOpt && !isCorrectOpt) { bg = '#fef2f2'; border = '#ef4444'; color = '#dc2626'; }
              return (
                <div key={oi} style={{ padding: '10px 14px', borderRadius: 10, border: `1.5px solid ${border}`, background: bg, color, marginBottom: 6, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {isCorrectOpt && <span>✓</span>}
                  {isSelectedOpt && !isCorrectOpt && <span>✗</span>}
                  {opt}
                </div>
              );
            })}
            {a.explanation && (
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: 12, marginTop: 12, fontSize: 13, color: '#92400e' }}>
                💡 <strong>Explanation:</strong> {a.explanation}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  if (activeTest) return (
    <div className="page-container">
      <div style={{ marginBottom: 16 }}>
        <button type="button" onClick={exitTest} className="btn btn-outline">
          ← Back
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 700 }}>{activeTest.title}</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>{activeTest.questions.length} questions</p>
        </div>
        <div className={`timer ${timeLeft < 60 ? 'warning' : 'normal'}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      {activeTest.questions.map((q, qi) => (
        <div key={q._id} className="question-card">
          <div className="question-number">Question {qi + 1} of {activeTest.questions.length}</div>
          <div className="question-text">{q.questionText}</div>
          {q.options.map((opt, oi) => (
            <label key={oi} className={`option-label ${answers[qi] === oi ? 'selected' : ''}`}>
              <input type="radio" name={`q${qi}`} checked={answers[qi] === oi}
                onChange={() => { const a = [...answers]; a[qi] = oi; setAnswers(a); }}
                style={{ accentColor: '#1a3a6b' }} />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: 8, paddingBottom: 40 }}>
        <button onClick={handleSubmit} className="btn btn-success btn-lg">
          Submit Test ✓
        </button>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📝 Mock Tests</h1>
        <p>Practice with real exam-style questions and timer</p>
      </div>
      {tests.length === 0 ? (
        <div className="empty-state">
          <h3>No tests available yet</h3>
          <p>Tests will appear here once the admin adds them</p>
        </div>
      ) : (
        <div className="card-grid card-grid-auto">
          {tests.map(test => (
            <div key={test._id} className="test-card">
              <h3>{test.title}</h3>
              <div className="test-meta">
                {test.subject && <span className="badge badge-blue">{test.subject}</span>}
                <span>⏱ {test.durationMinutes} mins</span>
              </div>
              <button onClick={() => startTest(test._id)} className="btn btn-primary btn-block">
                Start Test →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}