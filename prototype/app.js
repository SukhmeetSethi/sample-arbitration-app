// ===== MAIN APP =====
function App() {
  const [page, setPage] = React.useState('dashboard');
  const [role, setRole] = React.useState('Claimant');
  const [selectedCase, setSelectedCase] = React.useState(null);
  const [activeHearing, setActiveHearing] = React.useState(null);
  const [showNewCase, setShowNewCase] = React.useState(false);
  const [cases, setCases] = React.useState(MOCK.cases);
  const [toast, setToast] = React.useState(null);

  const showToast = (msg, type='success') => setToast({ message: msg, type });

  const handleNewCase = (form) => {
    const newCase = {
      id: `ARB-2026-${String(cases.length + 200).padStart(5,'0')}`,
      type: form.type, claimant: form.claimantName, respondent: form.respondentName,
      value: `₹${parseInt(form.value.replace(/,/g,'')||0).toLocaleString('en-IN')}`,
      status: 'Filed', arbitrator: null, institution: null,
      filed: new Date().toISOString().split('T')[0], nextHearing: null,
      deadline: '2027-04-17', stage: 'Awaiting Respondent Reply'
    };
    setCases(c => [newCase, ...c]);
    setShowNewCase(false);
    showToast(`Case ${newCase.id} filed successfully. Arbitration notice sent to respondent.`);
  };

  const handleViewCase = (c) => { setSelectedCase(c); setPage('caseDetail'); };
  const handleJoinHearing = (h) => { setActiveHearing(h); setPage('hearingRoom'); };

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'cases', icon: '📁', label: 'Cases' },
    { id: 'arbitrators', icon: '⚖️', label: 'Arbitrators' },
    { id: 'hearings', icon: '🎥', label: 'Hearings' },
    { id: 'awards', icon: '📜', label: 'Awards & Enforcement' },
  ];

  const pageTitle = {
    dashboard: 'Dashboard', cases: 'Case Management', caseDetail: `Case ${selectedCase?.id || ''}`,
    arbitrators: 'Arbitrator Marketplace', hearings: 'Virtual Hearings',
    hearingRoom: `Hearing Room — ${activeHearing?.caseId || ''}`, awards: 'Awards & Court Filings',
  };

  return (
    <div className="app-shell">
      <div className="sidebar">
        <div className="sidebar-brand"><span>⚖️</span> NyayaSetu</div>
        <div className="sidebar-nav">
          {navItems.map(n => (
            <div key={n.id} className={`sidebar-item ${page === n.id ? 'active' : ''}`}
              onClick={() => { setPage(n.id); setSelectedCase(null); setActiveHearing(null); }}>
              <span className="icon">{n.icon}</span> {n.label}
            </div>
          ))}
        </div>
        <div className="sidebar-user">
          <div style={{fontWeight:600}}>Priya Sharma</div>
          <div className="role">{role}</div>
        </div>
      </div>

      <div className="main-content">
        <div className="topbar">
          <h2>{pageTitle[page]}</h2>
          <div className="topbar-actions">
            <div className="role-switcher">
              {['Claimant','Arbitrator','Institution'].map(r => (
                <button key={r} className={`role-btn ${role===r?'active':''}`} onClick={() => setRole(r)}>{r}</button>
              ))}
            </div>
            <div className="notif-bell">🔔<span className="notif-count">{MOCK.notifications.filter(n=>!n.read).length}</span></div>
          </div>
        </div>

        <div className="page-content">
          {page === 'dashboard' && <Dashboard cases={cases} onViewCase={handleViewCase} onNavigate={setPage} />}
          {page === 'cases' && !selectedCase && <CasesList cases={cases} onViewCase={handleViewCase} onNewCase={() => setShowNewCase(true)} />}
          {page === 'caseDetail' && selectedCase && <CaseDetail caseData={selectedCase} onBack={() => setPage('cases')} onJoinHearing={handleJoinHearing} />}
          {page === 'arbitrators' && <ArbitratorMarketplace arbitrators={MOCK.arbitrators} onNavigate={setPage} />}
          {page === 'hearings' && <HearingsPage hearings={MOCK.hearings} onJoinHearing={handleJoinHearing} />}
          {page === 'hearingRoom' && activeHearing && <HearingRoom hearing={activeHearing} onLeave={() => { setPage('hearings'); setActiveHearing(null); showToast('Hearing left. Recording saved with SHA-256 hash.'); }} />}
          {page === 'awards' && <AwardsPage />}
        </div>
      </div>

      {showNewCase && <NewCaseWizard onClose={() => setShowNewCase(false)} onSubmit={handleNewCase} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
