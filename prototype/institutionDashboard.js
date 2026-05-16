// ===== INSTITUTION / ARBITRATOR DASHBOARD =====

function InstitutionDashboard({ cases, role }) {
  const [activeTab, setActiveTab] = React.useState('summary');
  const arb = MOCK.users.arbitrator;
  const assignedCases = cases.filter(c => c.arbitrator && c.arbitrator.includes('Venkataraman'));
  const allCases = cases;

  const tabs = [
    { id: 'summary', icon: '🤖', label: 'AI Weekly Brief' },
    { id: 'search', icon: '🔍', label: 'Case Search' },
    { id: 'prep', icon: '📚', label: 'Case Prep AI' },
    { id: 'actions', icon: '⚡', label: 'Action Board' },
    { id: 'calendar', icon: '📅', label: 'Calendar' },
  ];

  return React.createElement('div', null,
    // Tab bar
    React.createElement('div', { style: { display: 'flex', gap: 4, marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 8 } },
      tabs.map(t => React.createElement('button', { key: t.id, className: `btn btn-sm ${activeTab === t.id ? 'btn-primary' : 'btn-outline'}`, onClick: () => setActiveTab(t.id) }, t.icon, ' ', t.label))
    ),
    activeTab === 'summary' && React.createElement(AIWeeklySummary, { cases: assignedCases, arb }),
    activeTab === 'search' && React.createElement(CaseSearchPanel, { cases: allCases }),
    activeTab === 'prep' && React.createElement(CasePrepAI, { cases: assignedCases }),
    activeTab === 'actions' && React.createElement(ActionBoard, { cases: assignedCases }),
    activeTab === 'calendar' && React.createElement(CalendarView, { cases: assignedCases })
  );
}

// ===== AI WEEKLY SUMMARY =====
function AIWeeklySummary({ cases, arb }) {
  const today = new Date();
  const weekEnd = new Date(today.getTime() + 7 * 86400000);
  const weekStr = `${today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – ${weekEnd.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;

  const summary = {
    hearings: MOCK.hearings.filter(h => h.status === 'Scheduled').length,
    pendingOrders: 2,
    deadlines: 3,
    newFilings: 1,
  };

  return React.createElement('div', null,
    React.createElement('div', { style: { background: 'linear-gradient(135deg, #1a4731 0%, #276749 100%)', color: 'white', borderRadius: 'var(--radius)', padding: 20, marginBottom: 16 } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: '0.8rem', opacity: 0.8 } }, '🤖 AI-Generated Weekly Brief'),
          React.createElement('h3', { style: { margin: '4px 0', fontSize: '1.1rem' } }, `Good morning, ${arb.name.split('.').pop().trim()}`),
          React.createElement('div', { style: { fontSize: '0.83rem', opacity: 0.9 } }, `Week of ${weekStr}`)
        ),
        React.createElement('div', { style: { textAlign: 'right', fontSize: '0.8rem', opacity: 0.7 } }, `Generated: ${today.toLocaleString('en-IN')}`)
      )
    ),

    // Key metrics
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 } },
      [
        { label: 'Hearings This Week', value: summary.hearings, color: '#2b6cb0' },
        { label: 'Pending Orders', value: summary.pendingOrders, color: '#c05621' },
        { label: 'Upcoming Deadlines', value: summary.deadlines, color: '#c53030' },
        { label: 'New Filings', value: summary.newFilings, color: '#276749' },
      ].map((m, i) => React.createElement('div', { key: i, style: { padding: 14, border: '1px solid var(--border)', borderRadius: 'var(--radius)', textAlign: 'center' } },
        React.createElement('div', { style: { fontSize: '1.5rem', fontWeight: 700, color: m.color } }, m.value),
        React.createElement('div', { style: { fontSize: '0.78rem', color: 'var(--text-light)' } }, m.label)
      ))
    ),

    // AI narrative summary
    React.createElement('div', { style: { background: '#f7fafc', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16 } },
      React.createElement('div', { style: { fontWeight: 600, marginBottom: 10, fontSize: '0.9rem' } }, '📋 This Week at a Glance'),
      React.createElement('div', { style: { fontSize: '0.85rem', lineHeight: 1.8 } },
        React.createElement('p', { style: { margin: '0 0 10px' } }, `📌 **ARB-2026-00142** (Sharma Logistics vs Apex Freight) — Oral Arguments scheduled for 22 Apr. Both parties have filed Written Submissions. Review the Claimant's Exhibit Bundle (12 documents) before hearing. Key issue: whether force majeure clause applies to delayed shipments.`),
        React.createElement('p', { style: { margin: '0 0 10px' } }, `📌 **ARB-2026-00156** (InnoPatent vs DigiSoft) — Document Production deadline on 25 Apr. Respondent has requested extension. You need to pass a Procedural Order by 23 Apr.`),
        React.createElement('p', { style: { margin: '0 0 10px' } }, `⚠️ **Disclosure reminder**: New case ARB-2026-00201 assigned. Section 12 disclosure due within 7 days of acceptance.`),
        React.createElement('p', { style: { margin: 0 } }, `💡 **Recommendation**: Block 2 hours on Thursday for award drafting in ARB-2025-00891 (enforcement pending, court has asked for certified copy).`)
      )
    )
  );
}

// ===== CASE SEARCH =====
function CaseSearchPanel({ cases }) {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState(cases);

  const handleSearch = (q) => {
    setQuery(q);
    if (!q.trim()) { setResults(cases); return; }
    const lower = q.toLowerCase();
    setResults(cases.filter(c =>
      c.id.toLowerCase().includes(lower) ||
      c.claimant.toLowerCase().includes(lower) ||
      c.respondent.toLowerCase().includes(lower) ||
      c.type.toLowerCase().includes(lower) ||
      c.status.toLowerCase().includes(lower) ||
      (c.arbitrator || '').toLowerCase().includes(lower)
    ));
  };

  return React.createElement('div', null,
    React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16 } },
      React.createElement('input', { value: query, onChange: e => handleSearch(e.target.value), placeholder: '🔍 Search by case ID, party name, type, status...', style: { flex: 1, padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '0.88rem' } })
    ),
    React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: 8 } }, `${results.length} case(s) found`),
    React.createElement('div', { className: 'table-wrap' },
      React.createElement('table', null,
        React.createElement('thead', null, React.createElement('tr', null,
          ['Case ID', 'Type', 'Claimant', 'Respondent', 'Value', 'Status', 'Stage'].map(h => React.createElement('th', { key: h }, h))
        )),
        React.createElement('tbody', null,
          results.map(c => React.createElement('tr', { key: c.id },
            React.createElement('td', { style: { fontWeight: 600 } }, c.id),
            React.createElement('td', null, c.type),
            React.createElement('td', null, c.claimant),
            React.createElement('td', null, c.respondent),
            React.createElement('td', null, c.value),
            React.createElement('td', null, React.createElement(Badge, { status: c.status })),
            React.createElement('td', null, c.stage)
          ))
        )
      )
    )
  );
}

// ===== CASE PREP AI =====
function CasePrepAI({ cases }) {
  const [selectedCase, setSelectedCase] = React.useState(null);
  const [chatHistory, setChatHistory] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const chatEndRef = React.useRef(null);

  React.useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatHistory]);

  const handleSelectCase = (c) => {
    setSelectedCase(c);
    setChatHistory([{ from: 'ai', text: `📚 Case Prep loaded for **${c.id}** (${c.claimant} vs ${c.respondent}).\n\nI've analyzed the case file. Ask me anything — key issues, timeline, party arguments, applicable law, or hearing preparation.` }]);
  };

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const q = input.trim();
    setChatHistory(prev => [...prev, { from: 'user', text: q }]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      let response = '';
      const lower = q.toLowerCase();
      if (lower.includes('issue') || lower.includes('key')) {
        response = `**Key Issues in ${selectedCase.id}:**\n\n1. Whether the Respondent's failure to deliver constitutes a fundamental breach under Clause 8.2\n2. Applicability of force majeure (Clause 12) — Respondent claims supply chain disruption\n3. Quantum of damages — Claimant claims ₹${selectedCase.value}, Respondent disputes calculation\n4. Whether interest at 18% p.a. is reasonable given RBI repo rate\n5. Costs allocation — both parties seek costs`;
      } else if (lower.includes('timeline') || lower.includes('chronolog')) {
        response = `**Case Timeline:**\n\n• 15 Mar 2025 — Agreement executed\n• 20 May 2025 — Invoice raised (₹${selectedCase.value})\n• 20 Jun 2025 — Payment due date (missed)\n• 10 Jun–1 Nov 2025 — 3 reminder emails sent\n• 1 Dec 2025 — Legal notice sent\n• ${selectedCase.filed} — Arbitration notice filed\n• Respondent claims force majeure from Aug 2025 onwards`;
      } else if (lower.includes('law') || lower.includes('section') || lower.includes('provision')) {
        response = `**Applicable Legal Provisions:**\n\n• Section 7 — Valid arbitration agreement (Clause 14.2)\n• Section 21 — Notice requirements (complied)\n• Section 23 — Statements of Claim/Defence\n• Section 29A — 12-month timeline for award\n• Section 31(7)(a) — Interest on award amount\n• Indian Contract Act, S.73 — Damages for breach\n• Force Majeure — Clause 12 of Agreement + Energy Watchdog (2017) SC precedent`;
      } else if (lower.includes('hearing') || lower.includes('prepar')) {
        response = `**Hearing Preparation Notes:**\n\n1. **Claimant's strongest argument**: Clear contractual obligation + 3 written reminders showing Respondent's awareness\n2. **Respondent's defence**: Force majeure — needs to prove (a) event was beyond control, (b) could not have been foreseen, (c) steps taken to mitigate\n3. **Documents to review**: Exhibit Bundle A1-A12 (Claimant), Exhibit B1-B7 (Respondent)\n4. **Suggested questions for Claimant**: Did they mitigate losses? Alternative suppliers?\n5. **Suggested questions for Respondent**: When exactly did force majeure event occur? Why no notice under Clause 12.3?`;
      } else if (lower.includes('award') || lower.includes('draft')) {
        response = `**Award Drafting Guidance:**\n\nBased on the evidence and submissions:\n• Claimant has established breach on balance of probabilities\n• Force majeure defence is weak — no timely notice under Clause 12.3\n• Suggested award: Principal amount (full/partial) + interest at 12% (reasonable) + partial costs\n\nShall I generate a draft award structure?`;
      } else {
        response = `Based on my analysis of ${selectedCase.id}:\n\n${q}\n\nThe case involves a ${selectedCase.type.toLowerCase()} dispute valued at ${selectedCase.value}. The current stage is "${selectedCase.stage}". Would you like me to dive deeper into any specific aspect — legal issues, evidence analysis, or hearing strategy?`;
      }
      setChatHistory(prev => [...prev, { from: 'ai', text: response }]);
      setLoading(false);
    }, 1200);
  };

  if (!selectedCase) {
    return React.createElement('div', null,
      React.createElement('div', { style: { marginBottom: 12, fontSize: '0.85rem', color: 'var(--text-light)' } }, 'Select a case to start AI-assisted preparation:'),
      cases.map(c => React.createElement('div', { key: c.id, onClick: () => handleSelectCase(c), style: { padding: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius)', marginBottom: 8, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontWeight: 600 } }, c.id, ' — ', c.type),
          React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-light)' } }, c.claimant, ' vs ', c.respondent)
        ),
        React.createElement(Badge, { status: c.status })
      )),
      cases.length === 0 && React.createElement('div', { style: { textAlign: 'center', padding: 20, color: 'var(--text-light)' } }, 'No assigned cases')
    );
  }

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', height: 'calc(100vh - 280px)' } },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
      React.createElement('div', null,
        React.createElement('span', { style: { fontWeight: 600 } }, '📚 ', selectedCase.id),
        React.createElement('span', { style: { fontSize: '0.8rem', color: 'var(--text-light)', marginLeft: 8 } }, selectedCase.claimant, ' vs ', selectedCase.respondent)
      ),
      React.createElement('button', { className: 'btn btn-outline btn-sm', onClick: () => setSelectedCase(null) }, '← All Cases')
    ),
    // Chat area
    React.createElement('div', { style: { flex: 1, overflow: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 12, marginBottom: 10, background: '#fafafa' } },
      chatHistory.map((msg, i) => React.createElement('div', { key: i, style: { marginBottom: 10, display: 'flex', gap: 8 } },
        React.createElement('span', null, msg.from === 'ai' ? '🤖' : '👤'),
        React.createElement('div', { style: { background: msg.from === 'ai' ? 'white' : '#ebf8ff', padding: '10px 14px', borderRadius: 8, fontSize: '0.84rem', maxWidth: '85%', whiteSpace: 'pre-wrap', lineHeight: 1.6 } }, msg.text.replace(/\*\*(.*?)\*\*/g, (_, t) => t))
      )),
      loading && React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 10 } }, React.createElement('span', null, '🤖'), React.createElement('div', { style: { background: 'white', padding: '10px 14px', borderRadius: 8, fontSize: '0.84rem' } }, 'Analyzing...')),
      React.createElement('div', { ref: chatEndRef })
    ),
    // Input
    React.createElement('div', { style: { display: 'flex', gap: 8 } },
      React.createElement('input', { value: input, onChange: e => setInput(e.target.value), onKeyDown: e => e.key === 'Enter' && handleSend(), placeholder: 'Ask about key issues, timeline, applicable law, hearing prep...', style: { flex: 1, padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '0.85rem' }, disabled: loading }),
      React.createElement('button', { className: 'btn btn-primary', onClick: handleSend, disabled: !input.trim() || loading }, 'Ask AI')
    )
  );
}

// ===== ACTION BOARD =====
function ActionBoard({ cases }) {
  const [actions, setActions] = React.useState([
    { id: 1, case: 'ARB-2026-00142', type: 'Hearing', title: 'Conduct Oral Arguments', due: '22 Apr 2026', priority: 'high', status: 'pending' },
    { id: 2, case: 'ARB-2026-00156', type: 'Order', title: 'Pass Procedural Order — extension request', due: '23 Apr 2026', priority: 'high', status: 'pending' },
    { id: 3, case: 'ARB-2026-00201', type: 'Disclosure', title: 'File Section 12 Disclosure', due: '28 Apr 2026', priority: 'medium', status: 'pending' },
    { id: 4, case: 'ARB-2026-00142', type: 'Review', title: 'Review Claimant Exhibit Bundle (12 docs)', due: '21 Apr 2026', priority: 'medium', status: 'pending' },
    { id: 5, case: 'ARB-2025-00891', type: 'Award', title: 'Provide certified copy of award to court', due: '30 Apr 2026', priority: 'low', status: 'pending' },
    { id: 6, case: 'ARB-2026-00156', type: 'Review', title: 'Review Respondent document production', due: '26 Apr 2026', priority: 'medium', status: 'pending' },
  ]);

  const handleComplete = (id) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: 'done' } : a));
  };

  const priorityColors = { high: '#c53030', medium: '#c05621', low: '#276749' };
  const typeIcons = { Hearing: '🎙️', Order: '📋', Disclosure: '📝', Review: '📖', Award: '🏆' };
  const pending = actions.filter(a => a.status === 'pending').sort((a, b) => { const p = { high: 0, medium: 1, low: 2 }; return p[a.priority] - p[b.priority]; });
  const done = actions.filter(a => a.status === 'done');

  return React.createElement('div', null,
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
      React.createElement('div', { style: { fontWeight: 600 } }, `⚡ ${pending.length} pending actions`),
      React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-light)' } }, `${done.length} completed`)
    ),
    pending.map(a => React.createElement('div', { key: a.id, style: { display: 'flex', alignItems: 'center', gap: 12, padding: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius)', marginBottom: 8 } },
      React.createElement('span', { style: { fontSize: '1.2rem' } }, typeIcons[a.type] || '📌'),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', { style: { fontWeight: 600, fontSize: '0.88rem' } }, a.title),
        React.createElement('div', { style: { fontSize: '0.78rem', color: 'var(--text-light)' } }, a.case, ' · Due: ', a.due)
      ),
      React.createElement('span', { style: { fontSize: '0.72rem', padding: '2px 8px', borderRadius: 10, background: priorityColors[a.priority] + '15', color: priorityColors[a.priority], fontWeight: 600 } }, a.priority.toUpperCase()),
      React.createElement('button', { className: 'btn btn-outline btn-sm', onClick: () => handleComplete(a.id) }, '✓ Done')
    )),
    done.length > 0 && React.createElement('div', { style: { marginTop: 16 } },
      React.createElement('div', { style: { fontSize: '0.83rem', color: 'var(--text-light)', marginBottom: 8 } }, '✓ Completed'),
      done.map(a => React.createElement('div', { key: a.id, style: { display: 'flex', alignItems: 'center', gap: 12, padding: 10, opacity: 0.5, textDecoration: 'line-through' } },
        React.createElement('span', null, typeIcons[a.type] || '📌'),
        React.createElement('div', { style: { fontSize: '0.83rem' } }, a.title, ' — ', a.case)
      ))
    )
  );
}

// ===== CALENDAR VIEW =====
function CalendarView({ cases }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());

  // Generate calendar events from hearings, deadlines, etc.
  const events = [
    { date: '2026-04-21', title: 'Review Exhibits', case: 'ARB-2026-00142', type: 'prep', color: '#2b6cb0' },
    { date: '2026-04-22', title: 'Oral Arguments', case: 'ARB-2026-00142', type: 'hearing', color: '#c53030' },
    { date: '2026-04-23', title: 'Procedural Order Due', case: 'ARB-2026-00156', type: 'deadline', color: '#c05621' },
    { date: '2026-04-25', title: 'Doc Production Deadline', case: 'ARB-2026-00156', type: 'deadline', color: '#c05621' },
    { date: '2026-04-28', title: 'Section 12 Disclosure Due', case: 'ARB-2026-00201', type: 'deadline', color: '#c05621' },
    { date: '2026-04-30', title: 'Document Review Hearing', case: 'ARB-2026-00156', type: 'hearing', color: '#c53030' },
    { date: '2026-05-05', title: 'Award Drafting', case: 'ARB-2025-00891', type: 'prep', color: '#2b6cb0' },
    { date: '2026-05-12', title: 'Final Arguments', case: 'ARB-2026-00142', type: 'hearing', color: '#c53030' },
    { date: '2026-05-16', title: 'Certified Copy to Court', case: 'ARB-2025-00891', type: 'deadline', color: '#c05621' },
    { date: '2026-05-20', title: 'Cross Examination', case: 'ARB-2026-00156', type: 'hearing', color: '#c53030' },
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  const getEventsForDate = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const prevMonth = () => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); } else setCurrentMonth(m => m - 1); };
  const nextMonth = () => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); } else setCurrentMonth(m => m + 1); };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(React.createElement('div', { key: `e${i}`, style: { padding: 4 } }));
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDate(day);
    const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
    cells.push(React.createElement('div', { key: day, style: { padding: 4, minHeight: 70, border: '1px solid #edf2f7', borderRadius: 4, background: isToday ? '#ebf8ff' : 'white' } },
      React.createElement('div', { style: { fontSize: '0.78rem', fontWeight: isToday ? 700 : 400, color: isToday ? '#2b6cb0' : 'var(--text)', marginBottom: 2 } }, day),
      dayEvents.map((ev, i) => React.createElement('div', { key: i, style: { fontSize: '0.65rem', padding: '1px 4px', borderRadius: 3, background: ev.color + '15', color: ev.color, marginBottom: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, title: `${ev.title} (${ev.case})` }, ev.title))
    ));
  }

  // Upcoming events list
  const upcoming = events.filter(e => new Date(e.date) >= today).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 6);
  const typeLabels = { hearing: '🎙️ Hearing', deadline: '⏰ Deadline', prep: '📖 Preparation' };

  return React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 } },
    // Calendar grid
    React.createElement('div', null,
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
        React.createElement('button', { className: 'btn btn-outline btn-sm', onClick: prevMonth }, '←'),
        React.createElement('h4', { style: { margin: 0 } }, monthName),
        React.createElement('button', { className: 'btn btn-outline btn-sm', onClick: nextMonth }, '→')
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 } },
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => React.createElement('div', { key: d, style: { textAlign: 'center', fontSize: '0.75rem', fontWeight: 600, padding: 4, color: 'var(--text-light)' } }, d)),
        ...cells
      )
    ),
    // Upcoming sidebar
    React.createElement('div', null,
      React.createElement('div', { style: { fontWeight: 600, marginBottom: 10, fontSize: '0.9rem' } }, '📅 Upcoming'),
      upcoming.map((ev, i) => React.createElement('div', { key: i, style: { padding: 10, border: '1px solid var(--border)', borderRadius: 'var(--radius)', marginBottom: 6 } },
        React.createElement('div', { style: { fontSize: '0.78rem', color: ev.color, fontWeight: 600 } }, typeLabels[ev.type] || ev.type),
        React.createElement('div', { style: { fontSize: '0.83rem', fontWeight: 600, marginTop: 2 } }, ev.title),
        React.createElement('div', { style: { fontSize: '0.75rem', color: 'var(--text-light)' } }, ev.case, ' · ', new Date(ev.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }))
      )),
      upcoming.length === 0 && React.createElement('div', { style: { color: 'var(--text-light)', fontSize: '0.83rem' } }, 'No upcoming events')
    )
  );
}
