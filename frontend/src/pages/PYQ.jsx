import { useState } from 'react';

const PYQS = [
  { year: 2023, exam: 'TNPSC', subject: 'History', question: 'Who was the first Governor-General of independent India?', options: ['Lord Mountbatten', 'C. Rajagopalachari', 'Dr. Rajendra Prasad', 'Jawaharlal Nehru'], answer: 0, explanation: 'Lord Mountbatten served as the first Governor-General of independent India from August 1947 to June 1948.' },
  { year: 2023, exam: 'TNPSC', subject: 'Polity', question: 'Which article of the Indian Constitution deals with the Right to Education?', options: ['Article 19', 'Article 21', 'Article 21A', 'Article 23'], answer: 2, explanation: 'Article 21A was inserted by the 86th Constitutional Amendment Act 2002, making free and compulsory education a fundamental right for children aged 6-14.' },
  { year: 2022, exam: 'TNPSC', subject: 'Geography', question: 'Which is the longest river in Tamil Nadu?', options: ['Cauvery', 'Vaigai', 'Tamiraparani', 'Palar'], answer: 0, explanation: 'The Cauvery river is the longest river in Tamil Nadu, flowing through the state for about 416 km.' },
  { year: 2022, exam: 'UPSC', subject: 'History', question: 'The Quit India Movement was launched in which year?', options: ['1940', '1941', '1942', '1943'], answer: 2, explanation: 'The Quit India Movement was launched by Mahatma Gandhi on 8 August 1942 at the Bombay session of the All India Congress Committee.' },
  { year: 2022, exam: 'UPSC', subject: 'Economy', question: 'Which institution publishes the Human Development Index?', options: ['World Bank', 'IMF', 'UNDP', 'WHO'], answer: 2, explanation: 'The Human Development Index (HDI) is published annually by the United Nations Development Programme (UNDP).' },
  { year: 2021, exam: 'TNPSC', subject: 'GK', question: 'Who wrote the Tamil epic Silappatikaram?', options: ['Thiruvalluvar', 'Ilango Adigal', 'Kambar', 'Avvaiyar'], answer: 1, explanation: 'Silappatikaram was written by Ilango Adigal, a Jain monk and prince. It is one of the Five Great Epics of Tamil Literature.' },
  { year: 2021, exam: 'UPSC', subject: 'Polity', question: 'The concept of Judicial Review in India is borrowed from which country?', options: ['UK', 'USA', 'Canada', 'Australia'], answer: 1, explanation: 'The concept of Judicial Review in India is borrowed from the USA, allowing courts to examine the constitutionality of legislative and executive actions.' },
  { year: 2020, exam: 'TNPSC', subject: 'Science', question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], answer: 2, explanation: 'Mars is called the Red Planet because its surface is covered with iron oxide (rust), giving it a reddish appearance.' },
];

export default function PYQ() {
  const [examFilter, setExamFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [selected, setSelected] = useState({});
  const [showAnswer, setShowAnswer] = useState({});

  const exams = ['All', 'TNPSC', 'UPSC'];
  const years = ['All', ...new Set(PYQS.map(q => q.year))].sort((a, b) => b - a);
  const subjects = ['All', ...new Set(PYQS.map(q => q.subject))];

  const filtered = PYQS.filter(q =>
    (examFilter === 'All' || q.exam === examFilter) &&
    (yearFilter === 'All' || q.year === Number(yearFilter)) &&
    (subjectFilter === 'All' || q.subject === subjectFilter)
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📚 Previous Year Questions</h1>
        <p>Practice with real questions from past UPSC & TNPSC exams</p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <div>
            <label className="form-label">Exam</label>
            <select className="form-select" value={examFilter} onChange={e => setExamFilter(e.target.value)}>
              {exams.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Year</label>
            <select className="form-select" value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
              {years.map(y => <option key={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Subject</label>
            <select className="form-select" value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}>
              {subjects.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>{filtered.length} questions found</p>

      {filtered.map((q, qi) => (
        <div key={qi} className="question-card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <span className="badge badge-blue">{q.exam}</span>
            <span className="badge badge-gold">{q.year}</span>
            <span className="badge badge-green">{q.subject}</span>
          </div>
          <div className="question-text">{q.question}</div>
          {q.options.map((opt, oi) => {
            const isSelected = selected[qi] === oi;
            const isCorrect = oi === q.answer;
            const hasAnswered = showAnswer[qi];
            let style = {};
            if (hasAnswered && isCorrect) style = { borderColor: '#22c55e', background: '#f0fdf4' };
            else if (hasAnswered && isSelected && !isCorrect) style = { borderColor: '#ef4444', background: '#fef2f2' };
            return (
              <label key={oi} className={`option-label ${isSelected ? 'selected' : ''}`} style={style}
                onClick={() => !hasAnswered && setSelected({ ...selected, [qi]: oi })}>
                <input type="radio" name={`pyq${qi}`} checked={isSelected} onChange={() => {}} />
                {opt}
                {hasAnswered && isCorrect && <span style={{ marginLeft: 'auto', color: '#22c55e' }}>✓</span>}
                {hasAnswered && isSelected && !isCorrect && <span style={{ marginLeft: 'auto', color: '#ef4444' }}>✗</span>}
              </label>
            );
          })}
          {!showAnswer[qi] ? (
            <button onClick={() => setShowAnswer({ ...showAnswer, [qi]: true })}
              className="btn btn-outline" style={{ marginTop: 12, fontSize: 13 }}>
              Show Answer & Explanation
            </button>
          ) : (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 14, marginTop: 12 }}>
              <div style={{ fontWeight: 600, color: '#16a34a', marginBottom: 6 }}>✅ Correct Answer: {q.options[q.answer]}</div>
              <div style={{ fontSize: 14, color: '#166534' }}>{q.explanation}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}