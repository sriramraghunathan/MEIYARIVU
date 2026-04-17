import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const COURSES = [
  {
    id: 'tnpsc',
    name: 'TNPSC Complete Course',
    tamilName: 'TNPSC முழு படிப்பு',
    price: 15000,
    icon: '🏛️',
    color: '#1a3a6b',
    exams: ['Group I', 'Group II & IIA', 'Group IV', 'Technical Services'],
    features: [
      'Complete TNPSC Syllabus Coverage',
      'Live Classes in Tamil & English',
      '500+ Mock Tests',
      'Previous Year Questions Bank',
      'Daily Current Affairs',
      'Study Notes PDF',
      'Doubt Clearing Sessions',
      '1 Year Access'
    ]
  },
  {
    id: 'ssc',
    name: 'SSC Complete Course',
    tamilName: 'SSC முழு படிப்பு',
    price: 15000,
    icon: '🇮🇳',
    color: '#b45309',
    exams: ['CGL', 'CHSL', 'MTS', 'JE', 'Stenographer'],
    features: [
      'Complete SSC Syllabus Coverage',
      'Live Classes with Expert Faculty',
      '500+ Mock Tests',
      'Previous Year Questions Bank',
      'Daily Current Affairs',
      'Study Notes PDF',
      'Doubt Clearing Sessions',
      '1 Year Access'
    ]
  },
  {
    id: 'rrb',
    name: 'RRB Complete Course',
    tamilName: 'RRB முழு படிப்பு',
    price: 15000,
    icon: '🚂',
    color: '#065f46',
    exams: ['ALP', 'Technician', 'JE', 'NTPC', 'Group D'],
    features: [
      'Complete RRB Syllabus Coverage',
      'Technical & Non-Technical Subjects',
      '500+ Mock Tests',
      'Previous Year Questions Bank',
      'Daily Current Affairs',
      'Study Notes PDF',
      'Doubt Clearing Sessions',
      '1 Year Access'
    ]
  },
  {
    id: 'tnusrb',
    name: 'TNUSRB Complete Course',
    tamilName: 'TNUSRB முழு படிப்பு',
    price: 15000,
    icon: '👮',
    color: '#6b21a8',
    exams: ['Sub-Inspector', 'Constable', 'Band Police Constable'],
    features: [
      'Complete TNUSRB Syllabus Coverage',
      'Physical Test Guidance',
      '300+ Mock Tests',
      'Previous Year Questions Bank',
      'Daily Current Affairs',
      'Study Notes PDF',
      'Doubt Clearing Sessions',
      '1 Year Access'
    ]
  },
  {
    id: 'upsc',
    name: 'UPSC Complete Course',
    tamilName: 'UPSC முழு படிப்பு',
    price: 15000,
    icon: '⚖️',
    color: '#0f172a',
    exams: ['Civil Services Prelims', 'Civil Services Mains', 'CDS', 'NDA'],
    features: [
      'Complete UPSC Syllabus Coverage',
      'Prelims & Mains Strategy',
      '1000+ Mock Tests',
      'Previous Year Questions Bank',
      'Daily Current Affairs & The Hindu Analysis',
      'Study Notes PDF',
      'Essay Writing Practice',
      '1 Year Access'
    ]
  }
];

export default function Enroll() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    state: 'Tamil Nadu',
    qualification: '',
    password: '',
    confirmPassword: ''
  });

  const toggleCourse = (id) => {
    setSelectedCourses(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const totalAmount = selectedCourses.length * 15000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCourses.length === 0) {
      setError('Please select at least one course.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const res = await axios.post('/api/auth/register', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        courses: selectedCourses,
        dob: form.dob,
        gender: form.gender,
        address: `${form.address}, ${form.city}, ${form.state}`,
        qualification: form.qualification
      });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <div style={{ background: '#0a1628', padding: '16px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎯</div>
          <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, color: 'white' }}>மெய்யறிவு <span style={{ color: '#c9a84c' }}>மெய்யறிவு</span></div>
        </Link>
        <Link to="/login" style={{ color: '#a8b8d0', textDecoration: 'none', fontSize: 14 }}>Already enrolled? Login →</Link>
      </div>

      {/* Progress Steps */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '20px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 0 }}>
          {['Select Course', 'Your Details', 'Confirmation'].map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: step > i + 1 ? '#22c55e' : step === i + 1 ? '#c9a84c' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: step >= i + 1 ? 'white' : '#94a3b8', flexShrink: 0 }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span style={{ fontWeight: step === i + 1 ? 700 : 400, color: step === i + 1 ? '#0a1628' : '#94a3b8', fontSize: 14, whiteSpace: 'nowrap' }}>{label}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? '#22c55e' : '#e2e8f0', margin: '0 16px' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>

        {/* STEP 1 — Course Selection */}
        {step === 1 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h1 style={{ fontFamily: 'Outfit', fontSize: 36, fontWeight: 800, color: '#0a1628', marginBottom: 8 }}>
                Choose Your Course
              </h1>
              <p style={{ color: '#64748b', fontSize: 16 }}>Select one or more courses. Each course is ₹15,000 for 1 year full access.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24, marginBottom: 40 }}>
              {COURSES.map(course => (
                <div key={course.id}
                  onClick={() => toggleCourse(course.id)}
                  style={{ background: 'white', borderRadius: 20, overflow: 'hidden', border: selectedCourses.includes(course.id) ? `2px solid ${course.color}` : '2px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s', boxShadow: selectedCourses.includes(course.id) ? `0 8px 30px ${course.color}30` : '0 2px 12px rgba(0,0,0,0.04)', transform: selectedCourses.includes(course.id) ? 'translateY(-4px)' : 'translateY(0)' }}>

                  {/* Course Header */}
                  <div style={{ background: course.color, padding: '24px 28px', position: 'relative' }}>
                    {selectedCourses.includes(course.id) && (
                      <div style={{ position: 'absolute', top: 16, right: 16, width: 28, height: 28, background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14 }}>✓</div>
                    )}
                    <div style={{ fontSize: 40, marginBottom: 12 }}>{course.icon}</div>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: 'white', marginBottom: 4 }}>{course.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{course.tamilName}</div>
                  </div>

                  {/* Price */}
                  <div style={{ padding: '20px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 32, color: '#0a1628' }}>₹15,000</div>
                      <div style={{ color: '#64748b', fontSize: 13 }}>1 Year Full Access</div>
                    </div>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '6px 12px', color: '#16a34a', fontSize: 12, fontWeight: 600 }}>
                      EMI Available
                    </div>
                  </div>

                  {/* Exams Covered */}
                  <div style={{ padding: '16px 28px', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Exams Covered</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {course.exams.map((exam, i) => (
                        <span key={i} style={{ background: '#f1f5f9', color: '#475569', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500 }}>{exam}</span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div style={{ padding: '16px 28px' }}>
                    {course.features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ color: '#22c55e', fontWeight: 700, flexShrink: 0 }}>✓</span>
                        <span style={{ color: '#64748b', fontSize: 13 }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Total & CTA */}
            {selectedCourses.length > 0 && (
              <div style={{ background: '#0a1628', borderRadius: 20, padding: '28px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, position: 'sticky', bottom: 24 }}>
                <div>
                  <div style={{ color: '#a8b8d0', fontSize: 14, marginBottom: 4 }}>{selectedCourses.length} course{selectedCourses.length > 1 ? 's' : ''} selected</div>
                  <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 28, color: 'white' }}>
                    Total: <span style={{ color: '#c9a84c' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <button onClick={() => setStep(2)}
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#0a1628', padding: '16px 40px', borderRadius: 12, border: 'none', fontWeight: 800, fontSize: 18, cursor: 'pointer', fontFamily: 'Outfit' }}>
                  Continue to Enrollment →
                </button>
              </div>
            )}

            {selectedCourses.length === 0 && (
              <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 15, marginTop: 16 }}>
                👆 Select at least one course to continue
              </div>
            )}
          </div>
        )}

        {/* STEP 2 — Student Details */}
        {step === 2 && (
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h1 style={{ fontFamily: 'Outfit', fontSize: 36, fontWeight: 800, color: '#0a1628', marginBottom: 8 }}>
                Your Details
              </h1>
              <p style={{ color: '#64748b', fontSize: 16 }}>Fill in your details to complete enrollment</p>
            </div>

            {/* Selected Courses Summary */}
            <div style={{ background: '#0a1628', borderRadius: 16, padding: '20px 28px', marginBottom: 32 }}>
              <div style={{ color: '#a8b8d0', fontSize: 13, marginBottom: 8 }}>Enrolling for:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                {selectedCourses.map(id => {
                  const course = COURSES.find(c => c.id === id);
                  return (
                    <span key={id} style={{ background: course.color, color: 'white', padding: '4px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                      {course.icon} {course.name}
                    </span>
                  );
                })}
              </div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 20, color: '#c9a84c' }}>
                Total: ₹{totalAmount.toLocaleString('en-IN')}
              </div>
            </div>

            {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontSize: 14 }}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <div style={{ background: 'white', borderRadius: 20, padding: 32, border: '1px solid #e2e8f0', marginBottom: 24 }}>
                <h3 style={{ fontFamily: 'Outfit', fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#0a1628' }}>Personal Information</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>Full Name *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter your full name"
                      style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>Date of Birth *</label>
                    <input required type="date" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>Gender *</label>
                    <select required value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none', background: 'white' }}>
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>Qualification *</label>
                    <select required value={form.qualification} onChange={e => setForm({ ...form, qualification: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none', background: 'white' }}>
                      <option value="">Select Qualification</option>
                      <option>10th Standard</option>
                      <option>12th Standard</option>
                      <option>Diploma</option>
                      <option>UG Degree</option>
                      <option>PG Degree</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>Address *</label>
                  <input required value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
                    placeholder="Door No, Street, Area"
                    style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>City *</label>
                    <input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}
                      placeholder="City"
                      style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>State</label>
                    <input value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: 20, padding: 32, border: '1px solid #e2e8f0', marginBottom: 24 }}>
                <h3 style={{ fontFamily: 'Outfit', fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#0a1628' }}>Login Credentials</h3>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>Phone Number *</label>
                  <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>Password *</label>
                    <input required type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                      placeholder="Min 8 characters"
                      style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>Confirm Password *</label>
                    <input required type="password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                      placeholder="Repeat password"
                      style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <button type="button" onClick={() => setStep(1)}
                  style={{ flex: 1, padding: '16px', border: '2px solid #e2e8f0', borderRadius: 12, background: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer', color: '#64748b' }}>
                  ← Back
                </button>
                <button type="submit"
                  style={{ flex: 2, padding: '16px', background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', border: 'none', borderRadius: 12, fontSize: 18, fontWeight: 800, cursor: 'pointer', color: '#0a1628', fontFamily: 'Outfit' }}>
                  Complete Enrollment →
                </button>
              </div>

              <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13, marginTop: 16 }}>
                * Payment of ₹{totalAmount.toLocaleString('en-IN')} to be made after confirmation. Our team will contact you within 24 hours.
              </p>
            </form>
          </div>
        )}

        {/* STEP 3 — Confirmation */}
        {step === 3 && (
          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '40px 24px' }}>
            <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
            <h1 style={{ fontFamily: 'Outfit', fontSize: 36, fontWeight: 800, color: '#0a1628', marginBottom: 12 }}>
              Enrollment Submitted!
            </h1>
            <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
              Thank you for enrolling at <strong>மெய்யறிவு</strong>! Your application has been received.<br /><br />
              Our team will contact you on <strong>{form.phone}</strong> within <strong>24 hours</strong> to confirm your enrollment and share payment details.
            </p>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: '24px 32px', marginBottom: 32 }}>
              <div style={{ fontWeight: 700, color: '#166534', fontSize: 16, marginBottom: 12 }}>✅ Courses Selected:</div>
              {selectedCourses.map(id => {
                const course = COURSES.find(c => c.id === id);
                return (
                  <div key={id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#166534' }}>{course.icon} {course.name}</span>
                    <span style={{ fontWeight: 700, color: '#166534' }}>₹15,000</span>
                  </div>
                );
              })}
              <div style={{ borderTop: '1px solid #bbf7d0', paddingTop: 12, marginTop: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 18 }}>
                <span style={{ color: '#166534' }}>Total Amount</span>
                <span style={{ color: '#166534' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Link to="/login"
              style={{ display: 'inline-block', background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#0a1628', padding: '16px 40px', borderRadius: 12, textDecoration: 'none', fontSize: 18, fontWeight: 800, fontFamily: 'Outfit' }}>
              Login to Your Account →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}