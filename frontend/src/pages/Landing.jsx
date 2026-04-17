import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const EXAMS_DATA = {
  TNPSC: {
    label: 'TNPSC',
    tamilLabel: 'தமிழ்நாடு அரசுப் பணியாளர் தேர்வாணையம்',
    color: '#1a3a6b',
    source: 'TNPSC Annual Planner 2026 (Published: 03.12.2025)',
    columns: ['Exam Name', 'Notification Date', 'Exam Date', 'Days'],
    data: [
      ['Combined Technical Services Exam (Non-Interview Posts)', '20.05.2026', '03.08.2026', '7'],
      ['Combined Civil Services Exam – I (Group I Services)', '23.06.2026', '06.09.2026', '1'],
      ['Combined Technical Services Exam (Diploma / ITI Level)', '07.07.2026', '20.09.2026', '7'],
      ['Combined Civil Services Exam – II (Group II & IIA Services)', '11.08.2026', '25.10.2026', '1'],
      ['Combined Technical Services Exam (Interview Posts)', '31.08.2026', '14.11.2026', '4'],
      ['Combined Civil Services Exam – IV (Group IV Services)', '06.10.2026', '20.12.2026', '1'],
    ]
  },
  SSC: {
    label: 'SSC',
    tamilLabel: 'ஊழியர் தேர்வு ஆணையம்',
    color: '#b45309',
    source: 'SSC Tentative Calendar 2026-2027',
    columns: ['Exam Name', 'Advertisement Date', 'Closing Date', 'Exam Month'],
    data: [
      ['JSA/LDC Grade Limited Departmental Competitive Exam 2025 (DoPT)', '16 Mar 2026', '07 Apr 2026', 'May 2026'],
      ['SSA/UDC Grade Limited Departmental Competitive Exam 2025 (DoPT)', '16 Mar 2026', '07 Apr 2026', 'May 2026'],
      ['ASO Grade Limited Departmental Competitive Exam 2025', '16 Mar 2026', '07 Apr 2026', 'May 2026'],
      ['Combined Graduate Level (CGL) Examination 2026', 'Mar 2026', 'Apr 2026', 'May–Jun 2026'],
      ['Junior Engineer (Civil, Mechanical & Electrical) Exam 2026', 'Mar 2026', 'Apr 2026', 'May–Jun 2026'],
      ['Selection Post Examination Phase-XIV 2026', 'Mar 2026', 'Apr 2026', 'May–Jul 2026'],
      ['Combined Higher Secondary (10+2) Level Exam 2026', 'Apr 2026', 'May 2026', 'Jul–Sep 2026'],
      ['Stenographer Grade C & D Examination 2026', 'Apr 2026', 'May 2026', 'Aug–Sep 2026'],
      ['Combined Hindi Translators Examination 2026', 'Apr 2026', 'May 2026', 'Aug–Sep 2026'],
      ['Multi-Tasking Staff & Havaldar (CBIC & CBN) Exam 2026', 'Jun 2026', 'Jul 2026', 'Sep–Nov 2026'],
      ['Sub-Inspector in Delhi Police & Central Armed Police Forces Exam 2026', 'May 2026', 'Jun 2026', 'Oct–Nov 2026'],
      ['Constables (GD) in CAPFs, NIA, SSF & Rifleman (GD) Assam Rifles Exam 2027', 'Sep 2026', 'Oct 2026', 'Jan–Mar 2027'],
    ]
  },
  RRB: {
    label: 'RRB',
    tamilLabel: 'இரயில்வே ஆட்சேர்ப்பு வாரியம்',
    color: '#065f46',
    source: 'Ministry of Railways — RRB Annual Calendar 2026 (Dated: 05.12.2025)',
    columns: ['Period', 'Category', 'Vacancy Assessment Upto', 'Draft CEN'],
    data: [
      ['January – March', 'Assistant Loco Pilot', '30.06.2027', 'February 2026'],
      ['April – June', 'Technicians', '30.06.2027', 'March 2026'],
      ['April – June', 'Section Controller', '30.06.2027', 'April 2026'],
      ['July – September', 'Junior Engineers / Depot Material Superintendent / Chemical Metallurgical Assistant', '30.09.2027', 'July 2026'],
      ['July – September', 'Paramedical Categories', '30.09.2027', '—'],
      ['July – September', 'Non Technical Popular Categories – Graduate (Level 4, 5 & 6)', '30.09.2027', 'August 2026'],
      ['July – September', 'Non Technical Popular Categories – Under Graduate (Level 2 & 3)', '30.09.2027', 'August 2026'],
      ['October – December', 'Ministerial & Isolated Categories', '31.12.2027', 'Sep–Oct 2026'],
      ['October – December', 'Level 1', '31.12.2027', 'Sep–Oct 2026'],
    ]
  },
  TNUSRB: {
    label: 'TNUSRB',
    tamilLabel: 'தமிழ்நாடு சீருடைப் பணிகள் ஆட்சேர்ப்பு வாரியம்',
    color: '#6b21a8',
    source: 'TNUSRB Annual Planner 2026',
    columns: ['Post Name', 'Notification Tentative Date'],
    data: [
      ['Sub-Inspector (Technical)', 'May 2026'],
      ['Band Police Constable', 'July 2026'],
      ['Common Recruitment', 'September 2026'],
      ['Joint Recruitment', 'November 2026'],
    ]
  }
};

function ExamCarousel() {
  const tabs = Object.keys(EXAMS_DATA);
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % tabs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const exam = EXAMS_DATA[tabs[active]];

  return (
    <div style={{ background: '#0a1628', padding: '80px 48px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-block', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', padding: '6px 20px', borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            📅 2026 தேர்வு அட்டவணை / Exam Calendar 2026
          </div>
          <h2 style={{ fontFamily: 'Outfit', fontSize: 36, fontWeight: 800, color: 'white', marginBottom: 8 }}>
            அனைத்து தேர்வு தேதிகள் / All Exam Schedules
          </h2>
          <p style={{ color: '#a8b8d0', fontSize: 15 }}>Official dates from government sources. Updated December 2025.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
          {tabs.map((tab, i) => (
            <button key={tab} onClick={() => { setActive(i); setAutoPlay(false); }}
              style={{ padding: '10px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'Outfit', border: 'none', transition: 'all 0.3s', background: active === i ? EXAMS_DATA[tab].color : 'rgba(255,255,255,0.08)', color: 'white', transform: active === i ? 'scale(1.05)' : 'scale(1)' }}>
              {tab}
            </button>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 20, border: `1px solid ${exam.color}60`, overflow: 'hidden' }}>
          <div style={{ background: exam.color, padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 800, color: 'white' }}>{tabs[active]}</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4 }}>{exam.tamilLabel}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: 20, color: 'white', fontSize: 12 }}>
              📌 {exam.source}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.06)' }}>
                  {exam.columns.map((col, i) => (
                    <th key={i} style={{ padding: '14px 20px', textAlign: 'left', color: '#c9a84c', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exam.data.map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{ padding: '14px 20px', color: ci === 0 ? 'white' : '#a8b8d0', fontSize: 14, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          {tabs.map((_, i) => (
            <div key={i} onClick={() => { setActive(i); setAutoPlay(false); }}
              style={{ width: active === i ? 24 : 8, height: 8, borderRadius: 4, background: active === i ? '#c9a84c' : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#64748b', fontSize: 12, marginTop: 16 }}>
          * தேதிகள் தற்காலிகமானவை. அதிகாரப்பூர்வ அறிவிப்புகளை சரிபார்க்கவும். / Dates are tentative. Please verify with official notifications.
        </p>
      </div>
    </div>
  );
}

export default function Landing() {
  const [openFaq, setOpenFaq] = useState(null);
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ta' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (en, ta) => lang === 'ta' ? ta : en;

  const features = [
    { icon: '📹', title: t('Expert Video Lectures', 'நிபுணர் வீடியோ வகுப்புகள்'), desc: t('Structured video lessons covering complete syllabus for all competitive exams.', 'அனைத்து போட்டி தேர்வுகளுக்கும் முழுமையான பாடத்திட்டம் உள்ள வீடியோ வகுப்புகள்.') },
    { icon: '📝', title: t('Mock Tests with Timer', 'நேரக்கட்டுப்பாட்டு மாதிரி தேர்வுகள்'), desc: t('Simulate real exam conditions with timed mock tests and instant scores.', 'உண்மையான தேர்வு சூழலை உருவகப்படுத்தும் மாதிரி தேர்வுகள் மற்றும் உடனடி மதிப்பெண்கள்.') },
    { icon: '📊', title: t('Detailed Analysis', 'விரிவான பகுப்பாய்வு'), desc: t('After every test, see correct answers with full explanations.', 'ஒவ்வொரு தேர்வுக்கும் பிறகு சரியான விடைகளை விளக்கங்களுடன் காணலாம்.') },
    { icon: '🏆', title: t('Live Leaderboard', 'நேரடி தரவரிசை பட்டியல்'), desc: t('Compete with fellow aspirants and track your rank in real-time.', 'மற்ற மாணவர்களுடன் போட்டியிட்டு உங்கள் தரவரிசையை கண்காணிக்கவும்.') },
    { icon: '📋', title: t('Syllabus Tracker', 'பாடத்திட்ட கண்காணிப்பு'), desc: t('Track your preparation topic by topic for all exams.', 'அனைத்து தேர்வுகளுக்கும் தலைப்பு வாரியாக உங்கள் தயாரிப்பை கண்காணிக்கவும்.') },
    { icon: '📰', title: t('Daily Current Affairs', 'தினசரி நடப்பு நிகழ்வுகள்'), desc: t('Stay updated with curated daily news and video analysis.', 'தினசரி செய்திகள் மற்றும் வீடியோ பகுப்பாய்வுகளுடன் புதுப்பித்த நிலையில் இருங்கள்.') },
    { icon: '🎓', title: t('Live Classes', 'நேரடி வகுப்புகள்'), desc: t('Join live interactive classes via Google Meet & Zoom.', 'Google Meet மற்றும் Zoom மூலம் நேரடி வகுப்புகளில் கலந்துகொள்ளுங்கள்.') },
    { icon: '📚', title: t('Previous Year Questions', 'முந்தைய ஆண்டு வினாக்கள்'), desc: t('Practice with real questions from past TNPSC, SSC, RRB exams.', 'கடந்த TNPSC, SSC, RRB தேர்வுகளின் உண்மையான வினாக்களுடன் பயிற்சி செய்யுங்கள்.') },
  ];

  const examsWeCover = [
    { name: 'TNPSC', desc: t('Group I, II, IIA, IV & Technical Services', 'குழு I, II, IIA, IV & தொழில்நுட்ப சேவைகள்'), icon: '🏛️' },
    { name: 'SSC', desc: t('CGL, CHSL, MTS, JE, Stenographer & more', 'CGL, CHSL, MTS, JE, ஸ்டெனோகிராபர் மற்றும் பலவும்'), icon: '🇮🇳' },
    { name: 'RRB', desc: t('ALP, Technician, JE, NTPC & Group D', 'ALP, தொழில்நுட்பவியலாளர், JE, NTPC & குழு D'), icon: '🚂' },
    { name: 'TNUSRB', desc: t('Sub-Inspector, Constable & Police Recruitment', 'துணை ஆய்வாளர், கான்ஸ்டேபிள் & காவல்துறை ஆட்சேர்ப்பு'), icon: '👮' },
    { name: 'UPSC', desc: t('Civil Services, CDS, NDA & more', 'சிவில் சர்வீசஸ், CDS, NDA மற்றும் பலவும்'), icon: '⚖️' },
    { name: 'Banking', desc: t('IBPS PO, SBI PO, RBI & more (Coming Soon)', 'IBPS PO, SBI PO, RBI மற்றும் பலவும் (விரைவில்)'), icon: '🏦' },
  ];

  const testimonials = [
    { name: 'Priya S.', exam: 'TNPSC Group 2', text: t('The mock tests are exactly like the real exam. I cleared TNPSC Group 2 in the first attempt!', 'மாதிரி தேர்வுகள் உண்மையான தேர்வை போலவே இருந்தன. முதல் முயற்சியிலேயே வெற்றி பெற்றேன்!') },
    { name: 'Rahul M.', exam: 'SSC CGL', text: t('Best platform for SSC preparation. Current affairs and PYQs helped me a lot.', 'SSC தயாரிப்புக்கு சிறந்த தளம். நடப்பு நிகழ்வுகள் மற்றும் முந்தைய வினாக்கள் மிகவும் உதவின.') },
    { name: 'Kavitha R.', exam: 'TNPSC Group 4', text: t('Detailed test analysis helped me identify weak areas and improve significantly.', 'விரிவான தேர்வு பகுப்பாய்வு என் பலவீனமான பகுதிகளை கண்டறிய உதவியது.') },
  ];

  const faqs = [
    { q: t('Which exams does this platform cover?', 'இந்த தளம் எந்தெந்த தேர்வுகளை உள்ளடக்கியது?'), a: t('We cover TNPSC (All Groups), SSC (CGL, CHSL, MTS, JE), RRB (ALP, Technician, NTPC), TNUSRB, and UPSC.', 'TNPSC (அனைத்து குழுக்கள்), SSC (CGL, CHSL, MTS, JE), RRB (ALP, தொழில்நுட்பவியலாளர், NTPC), TNUSRB மற்றும் UPSC ஆகியவற்றை உள்ளடக்கியுள்ளோம்.') },
    { q: t('How do I enroll?', 'எப்படி சேர்வது?'), a: t('Click "Enroll Now", choose your course, fill in your details. Our team will contact you within 24 hours to confirm enrollment and payment.', '"இப்போதே சேருங்கள்" என்பதை கிளிக் செய்து, உங்கள் படிப்பை தேர்ந்தெடுத்து, விவரங்களை நிரப்புங்கள். 24 மணி நேரத்திற்குள் எங்கள் குழு தொடர்பு கொள்ளும்.') },
    { q: t('Are live classes available?', 'நேரடி வகுப்புகள் கிடைக்குமா?'), a: t('Yes! Live classes are conducted on Google Meet and Zoom. Schedule is available after enrollment.', 'ஆம்! நேரடி வகுப்புகள் Google Meet மற்றும் Zoom மூலம் நடத்தப்படுகின்றன.') },
    { q: t('Can I access on mobile?', 'மொபைலில் பயன்படுத்தலாமா?'), a: t('Yes! Works on mobile, tablet and desktop.', 'ஆம்! மொபைல், டேப்லெட் மற்றும் டெஸ்க்டாப்பில் செயல்படுகிறது.') },
    { q: t('What is included in the course?', 'படிப்பில் என்ன உள்ளது?'), a: t('Each course includes live classes, mock tests, previous year questions, current affairs, study notes PDF, and doubt clearing sessions for 1 year.', 'ஒவ்வொரு படிப்பிலும் நேரடி வகுப்புகள், மாதிரி தேர்வுகள், முந்தைய வினாக்கள், நடப்பு நிகழ்வுகள், PDF குறிப்புகள் மற்றும் 1 ஆண்டு அணுகல் அடங்கும்.') },
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff' }}>

      {/* NAVBAR */}
      <nav style={{ background: '#0a1628', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🎯</div>
          <div>
            <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, color: 'white', lineHeight: 1.2 }}>மெய்யறிவு</div>
            <div style={{ color: '#a8b8d0', fontSize: 10, letterSpacing: 0.5 }}>MEIYARIVU — COMPETITIVE EXAMS</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="#exams" style={{ color: '#a8b8d0', textDecoration: 'none', fontSize: 14 }}>{t('Exams', 'தேர்வுகள்')}</a>
          <a href="#features" style={{ color: '#a8b8d0', textDecoration: 'none', fontSize: 14 }}>{t('Features', 'அம்சங்கள்')}</a>
          <a href="#schedule" style={{ color: '#a8b8d0', textDecoration: 'none', fontSize: 14 }}>{t('Schedule', 'அட்டவணை')}</a>
          <a href="#faq" style={{ color: '#a8b8d0', textDecoration: 'none', fontSize: 14 }}>FAQ</a>
          <Link to="/login" style={{ color: '#a8b8d0', textDecoration: 'none', fontSize: 14 }}>{t('Login', 'உள்நுழைவு')}</Link>
          <button onClick={toggleLang} style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c', padding: '6px 14px', borderRadius: 20, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            {lang === 'en' ? 'தமிழ்' : 'English'}
          </button>
          <Link to="/enroll" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#0a1628', padding: '10px 24px', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>
            {t('Enroll Now →', 'இப்போதே சேருங்கள் →')}
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0a1628 0%, #112240 60%, #0d2044 100%)', padding: '100px 48px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(26,58,107,0.3) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-block', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', padding: '6px 20px', borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          🏆 {t("India's Premier Competitive Exam Platform", 'இந்தியாவின் சிறந்த போட்டி தேர்வு தளம்')}
        </div>

        <h1 style={{ fontFamily: 'Outfit', fontSize: 64, fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: 8, letterSpacing: -2 }}>
          மெய்யறிவு
        </h1>
        <h2 style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 500, color: '#c9a84c', marginBottom: 24, letterSpacing: 2 }}>
          {t('ACADEMY OF COMPETITIVE EXAMS', 'போட்டி தேர்வுகளுக்கான அகாடமி')}
        </h2>

        <p style={{ fontSize: 18, color: '#a8b8d0', maxWidth: 650, margin: '0 auto 40px', lineHeight: 1.7 }}>
          {t('Crack TNPSC, SSC, RRB, TNUSRB & UPSC on your first attempt. Join thousands of aspirants preparing smarter with expert guidance.',
            'TNPSC, SSC, RRB, TNUSRB & UPSC தேர்வுகளில் முதல் முயற்சியிலேயே வெற்றி பெறுங்கள். நிபுணர் வழிகாட்டுதலுடன் புத்திசாலித்தனமாக தயாரிக்கும் ஆயிரக்கணக்கான மாணவர்களுடன் சேருங்கள்.')}
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 60, flexWrap: 'wrap' }}>
          <Link to="/enroll" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#0a1628', padding: '16px 40px', borderRadius: 12, textDecoration: 'none', fontSize: 18, fontWeight: 700 }}>
            {t('Enroll Now →', 'இப்போதே சேருங்கள் →')}
          </Link>
          <a href="#schedule" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', padding: '16px 40px', borderRadius: 12, textDecoration: 'none', fontSize: 18, fontWeight: 600, border: '1px solid rgba(255,255,255,0.15)' }}>
            {t('View Exam Schedule', 'தேர்வு அட்டவணை காண்க')}
          </a>
        </div>

        {/* THIRUKKURAL */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 48px', background: 'rgba(201,168,76,0.08)', borderRadius: 20, border: '1px solid rgba(201,168,76,0.2)' }}>
          <div style={{ color: '#c9a84c', fontSize: 12, fontWeight: 600, letterSpacing: 2, marginBottom: 16, textTransform: 'uppercase' }}>
            திருக்குறள் / Thirukkural — அதிகாரம் 4 — கல்வி
          </div>
          <div style={{ fontFamily: 'Outfit', fontSize: 40, fontWeight: 800, color: 'white', lineHeight: 1.5, marginBottom: 8 }}>
            கற்க கசடற கற்பவை கற்றபின்
          </div>
          <div style={{ fontFamily: 'Outfit', fontSize: 40, fontWeight: 800, color: '#c9a84c', lineHeight: 1.5, marginBottom: 20 }}>
            நிற்க அதற்குத் தக.
          </div>
          <div style={{ color: '#a8b8d0', fontSize: 18, fontStyle: 'italic', lineHeight: 1.6, marginBottom: 8 }}>
            "Learn thoroughly what is worth learning; then live by what you have learnt."
          </div>
          <div style={{ color: '#64748b', fontSize: 14 }}>
            — திருவள்ளுவர் / Thiruvalluvar
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', paddingTop: 48, marginTop: 48, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { number: '500+', label: t('Questions Bank', 'வினாக்கள் தொகுப்பு') },
            { number: '50+', label: t('Mock Tests', 'மாதிரி தேர்வுகள்') },
            { number: '5+', label: t('Exam Categories', 'தேர்வு வகைகள்') },
            { number: '24/7', label: t('Platform Access', 'தளத்தை அணுகலாம்') },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Outfit', fontSize: 36, fontWeight: 800, color: '#c9a84c' }}>{s.number}</div>
              <div style={{ color: '#a8b8d0', fontSize: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EXAMS WE COVER */}
      <div id="exams" style={{ background: '#f8fafc', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 38, fontWeight: 800, color: '#0a1628', marginBottom: 8 }}>
              {t('Exams We Cover', 'நாம் உள்ளடக்கும் தேர்வுகள்')}
            </h2>
            <p style={{ color: '#64748b', fontSize: 16 }}>
              {t('One platform for all your government exam needs', 'அனைத்து அரசு தேர்வுகளுக்கும் ஒரே தளம்')}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {examsWeCover.map((exam, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ fontSize: 36, flexShrink: 0 }}>{exam.icon}</div>
                <div>
                  <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 20, color: '#0a1628', marginBottom: 4 }}>{exam.name}</div>
                  <div style={{ color: '#64748b', fontSize: 14, lineHeight: 1.5 }}>{exam.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EXAM SCHEDULE CAROUSEL */}
      <div id="schedule">
        <ExamCarousel />
      </div>

      {/* FEATURES */}
      <div id="features" style={{ padding: '80px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 38, fontWeight: 800, color: '#0a1628', marginBottom: 12 }}>
              {t('Everything You Need to ', 'வெற்றிக்கு தேவையான அனைத்தும் ')}
              <span style={{ color: '#c9a84c' }}>{t('Succeed', 'இங்கே உள்ளது')}</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              {t('A complete preparation ecosystem for all competitive exam aspirants', 'அனைத்து போட்டி தேர்வு மாணவர்களுக்கான முழுமையான தயாரிப்பு சூழல்')}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 20, padding: 28, border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Outfit', fontSize: 18, fontWeight: 700, color: '#0a1628', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ background: '#f8fafc', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 38, fontWeight: 800, color: '#0a1628', marginBottom: 8 }}>
              {t('Students Who ', 'வெற்றி பெற்ற ')}
              <span style={{ color: '#c9a84c' }}>{t('Succeeded', 'மாணவர்கள்')}</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {testimonials.map((tm, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 20, padding: 32, border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 18, marginBottom: 12 }}>⭐⭐⭐⭐⭐</div>
                <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>"{tm.text}"</p>
                <div style={{ fontWeight: 700, color: '#0a1628' }}>{tm.name}</div>
                <div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 600 }}>{tm.exam}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" style={{ padding: '80px 48px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 38, fontWeight: 800, color: '#0a1628', marginBottom: 8 }}>
              {t('Frequently Asked ', 'அடிக்கடி கேட்கப்படும் ')}
              <span style={{ color: '#c9a84c' }}>{t('Questions', 'கேள்விகள்')}</span>
            </h2>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 12, marginBottom: 12, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ padding: '20px 24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: '#0a1628', fontSize: 15 }}>{faq.q}</span>
                <span style={{ color: '#c9a84c', fontSize: 20, fontWeight: 700 }}>{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && (
                <div style={{ padding: '0 24px 20px', color: '#64748b', fontSize: 15, lineHeight: 1.6 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, #0a1628, #1a3a6b)', padding: '80px 48px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Outfit', fontSize: 44, fontWeight: 800, color: 'white', marginBottom: 16 }}>
          {t('Ready to Start Your ', 'உங்கள் ')}
          <span style={{ color: '#c9a84c' }}>{t('Journey?', 'பயணத்தை தொடங்க தயாரா?')}</span>
        </h2>
        <p style={{ color: '#a8b8d0', fontSize: 18, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
          {t('Join thousands of aspirants already preparing on மெய்யறிவு', 'மெய்யறிவு தளத்தில் ஏற்கனவே தயாரிக்கும் ஆயிரக்கணக்கான மாணவர்களுடன் சேருங்கள்')}
        </p>
        <Link to="/enroll" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#0a1628', padding: '18px 48px', borderRadius: 12, textDecoration: 'none', fontSize: 20, fontWeight: 800, display: 'inline-block', fontFamily: 'Outfit' }}>
          {t('Enroll Now — ₹15,000/course →', 'இப்போதே சேருங்கள் — ₹15,000/படிப்பு →')}
        </Link>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#0a1628', padding: '40px 48px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontFamily: 'Outfit', fontWeight: 800, color: 'white', fontSize: 18, marginBottom: 4 }}>மெய்யறிவு</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>{t('Academy of Competitive Exams', 'போட்டி தேர்வுகளுக்கான அகாடமி')}</div>
          </div>
          <div style={{ color: '#64748b', fontSize: 13 }}>© 2026 மெய்யறிவு. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: 13 }}>{t('Privacy Policy', 'தனியுரிமை கொள்கை')}</a>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: 13 }}>{t('Terms', 'விதிமுறைகள்')}</a>
            <Link to="/login" style={{ color: '#c9a84c', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>{t('Login', 'உள்நுழைவு')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}