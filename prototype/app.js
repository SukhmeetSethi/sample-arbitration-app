// ===== MAIN APP =====
function App() {
  const [page, setPage] = React.useState('dashboard');
  const [role, setRole] = React.useState('claimant');
  const [selectedCase, setSelectedCase] = React.useState(null);
  const [activeHearing, setActiveHearing] = React.useState(null);
  const [showNewCase, setShowNewCase] = React.useState(false);
  const [drafterState, setDrafterState] = React.useState(null); // { templateId, caseData }
  const [cases, setCases] = React.useState(MOCK.cases);
  const [toast, setToast] = React.useState(null);

  const showToast = (msg, type='success') => setToast({ message: msg, type });
  const user = MOCK.users[role];

  const handleNewCase = (form) => {
    const newCase = {
      id: `ARB-2026-${String(cases.length + 200).padStart(5,'0')}`,
      type: form.type, claimant: form.claimantName, respondent: form.respondentName,
      value: `₹${parseInt(form.value.replace(/,/g,'')||0).toLocaleString('en-IN')}`,
      status: 'Filed', arbitrator: null, institution: null,
      filed: new Date().toISOString().split('T')[0], nextHearing: null,
      deadline: '2027-04-26', stage: 'Draft Section 21 Notice',
      noticeServed: false, responseReceived: false,
    };
    setCases(c => [newCase, ...c]);
    setShowNewCase(false);
    showToast(`Case ${newCase.id} filed! Now draft your Section 21 Arbitration Notice using the AI Drafting Engine.`);
    setSelectedCase(newCase);
    setPage('caseDetail');
  };

  const handleViewCase = (c) => { setSelectedCase(c); setPage('caseDetail'); };
  const handleJoinHearing = (h) => { setActiveHearing(h); setPage('hearingRoom'); };
  const handleOpenDrafter = (templateId, caseData) => { setDrafterState({ templateId, caseData }); };

  const handleRoleSwitch = (r) => {
    setRole(r);
    setPage('dashboard');
    setSelectedCase(null);
    setActiveHearing(null);
    setDrafterState(null);
  };

  const navItems = role === 'arbitrator' ? [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'cases', icon: '📁', label: 'Assigned Cases' },
    { id: 'hearings', icon: '🎥', label: 'Hearings' },
    { id: 'arbitrators', icon: '⚖️', label: 'Arbitrator Panel' },
    { id: 'awards', icon: '📜', label: 'Awards' },
  ] : [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'cases', icon: '📁', label: role === 'respondent' ? 'Cases Against Me' : 'My Cases' },
    { id: 'arbitrators', icon: '⚖️', label: 'Arbitrators' },
    { id: 'hearings', icon: '🎥', label: 'Hearings' },
    { id: 'awards', icon: '📜', label: 'Awards & Enforcement' },
  ];

  const pageTitle = {
    dashboard: 'Dashboard',
    cases: role === 'respondent' ? 'Cases Against Me' : role === 'arbitrator' ? 'Assigned Cases' : 'My Cases',
    caseDetail: `Case ${selectedCase?.id || ''}`,
    arbitrators: 'Arbitrator Marketplace',
    hearings: 'Virtual Hearings',
    hearingRoom: `Hearing Room — ${activeHearing?.caseId || ''}`,
    awards: 'Awards & Court Filings',
  };

  const personas = [
    { id: 'claimant', label: 'Claimant', icon: '👤', color: '#2b6cb0' },
    { id: 'respondent', label: 'Respondent', icon: '🏢', color: '#c53030' },
    { id: 'arbitrator', label: 'Arbitrator', icon: '⚖️', color: '#276749' },
  ];

  return (
    <div className="app-shell">
      <div className="sidebar" style={{background: role === 'respondent' ? '#742a2a' : role === 'arbitrator' ? '#1a4731' : 'var(--primary)'}}>
        <div className="sidebar-brand"><span>⚖️</span> NyayaSetu</div>
        <div className="sidebar-nav">
          {navItems.map(n => (
            <div key={n.id} className={`sidebar-item ${page === n.id || (n.id === 'cases' && page === 'caseDetail') ? 'active' : ''}`}
              onClick={() => { setPage(n.id); setSelectedCase(null); setActiveHearing(null); }}>
              <span className="icon">{n.icon}</span> {n.label}
            </div>
          ))}
        </div>
        <div className="sidebar-user">
          <div style={{fontWeight:600}}>{user.name}</div>
          <div className="role">{user.org}</div>
        </div>
      </div>

      <div className="main-content">
        <div className="topbar">
          <h2>{pageTitle[page]}</h2>
          <div className="topbar-actions">
            <div className="role-switcher">
              {personas.map(p => (
                <button key={p.id} className={`role-btn ${role===p.id?'active':''}`}
                  onClick={() => handleRoleSwitch(p.id)}
                  style={role === p.id ? {color: p.color} : {}}>
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
            <div className="notif-bell">🔔<span className="notif-count">{(MOCK.notifications[role]||[]).filter(n=>!n.read).length}</span></div>
          </div>
        </div>

        <div className="page-content">
          {page === 'dashboard' && <Dashboard cases={cases} role={role} onViewCase={handleViewCase} onNavigate={setPage} />}
          {page === 'cases' && !selectedCase && <CasesList cases={cases} role={role} onViewCase={handleViewCase} onNewCase={() => setShowNewCase(true)} />}
          {page === 'caseDetail' && selectedCase && <CaseDetail caseData={selectedCase} role={role} onBack={() => setPage('cases')} onJoinHearing={handleJoinHearing} onOpenDrafter={handleOpenDrafter} showToast={showToast} />}
          {page === 'arbitrators' && <ArbitratorMarketplace arbitrators={MOCK.arbitrators} role={role} onNavigate={setPage} />}
          {page === 'hearings' && <HearingsPage hearings={MOCK.hearings} onJoinHearing={handleJoinHearing} />}
          {page === 'hearingRoom' && activeHearing && <HearingRoom hearing={activeHearing} onLeave={() => { setPage('hearings'); setActiveHearing(null); showToast('Hearing left. Recording saved.'); }} />}
          {page === 'awards' && <AwardsPage role={role} />}
        </div>
      </div>

      {showNewCase && <NewCaseWizard onClose={() => setShowNewCase(false)} onSubmit={handleNewCase} />}
      {drafterState && <DraftingEngine templateId={drafterState.templateId} caseData={drafterState.caseData} role={role} onClose={() => setDrafterState(null)} showToast={showToast} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
