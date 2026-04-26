// ===== SHARED COMPONENTS =====

function Toast({ message, type, onClose }) {
  React.useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return <div className={`toast ${type}`}>{message}</div>;
}

function Modal({ title, onClose, children, footer }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header"><h3>{title}</h3><button className="close-btn" onClick={onClose}>×</button></div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

function Badge({ status }) {
  const cls = status.toLowerCase().replace(/[\s\/]/g, '-');
  return <span className={`badge badge-${cls}`}>{status}</span>;
}

// ===== DASHBOARD =====
function Dashboard({ cases, role, onViewCase, onNavigate }) {
  const notifs = MOCK.notifications[role] || [];
  const myCases = role === 'respondent' ? cases.filter(c => c.respondent.includes('Apex') || c.respondent.includes('Metro') || c.respondent.includes('TechNova') || c.respondent.includes('DigiSoft')) : cases;
  const stats = role === 'arbitrator' ? [
    { label: 'Assigned Cases', value: cases.filter(c => c.arbitrator?.includes('Venkataraman')).length, sub: 'Active assignments' },
    { label: 'Upcoming Hearings', value: MOCK.hearings.filter(h => h.status === 'Scheduled').length, sub: 'Next: 22 Apr' },
    { label: 'Pending Orders', value: 1, sub: 'Procedural orders due' },
    { label: 'Awards Drafted', value: MOCK.awards.length, sub: 'This year' },
  ] : [
    { label: role === 'respondent' ? 'Cases Against Me' : 'My Cases', value: myCases.filter(c => ['Filed','Active','Hearing'].includes(c.status)).length, sub: '↑ 2 this month' },
    { label: 'Upcoming Hearings', value: MOCK.hearings.filter(h => h.status === 'Scheduled').length, sub: 'Next: 22 Apr' },
    { label: role === 'respondent' ? 'Pending Responses' : 'Documents Filed', value: role === 'respondent' ? 1 : MOCK.documents.length, sub: role === 'respondent' ? 'Action required' : 'Across all cases' },
    { label: 'Notifications', value: notifs.filter(n => !n.read).length, sub: 'Unread' },
  ];
  return (
    <div>
      <div className="stats-row">
        {stats.map((s, i) => <div key={i} className="stat-card"><div className="label">{s.label}</div><div className="value">{s.value}</div><div className="sub">{s.sub}</div></div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card">
          <div className="card-header"><h3>{role === 'respondent' ? 'Cases Requiring Action' : 'Recent Cases'}</h3><button className="btn btn-outline btn-sm" onClick={() => onNavigate('cases')}>View All</button></div>
          <div className="table-wrap"><table><thead><tr><th>Case ID</th><th>Type</th><th>Status</th><th>Stage</th></tr></thead><tbody>
            {myCases.slice(0, 4).map(c => <tr key={c.id} onClick={() => onViewCase(c)}><td style={{fontWeight:600}}>{c.id}</td><td>{c.type}</td><td><Badge status={c.status} /></td><td>{c.stage}</td></tr>)}
          </tbody></table></div>
        </div>
        <div className="card">
          <div className="card-header"><h3>Notifications</h3></div>
          {notifs.map(n => (
            <div key={n.id} className="doc-item" style={{ opacity: n.read ? 0.6 : 1 }}>
              <div className="doc-icon">{n.read ? '📩' : '🔔'}</div>
              <div className="doc-info"><div className="doc-name">{n.text}</div><div className="doc-meta">{n.time}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== CASES LIST =====
function CasesList({ cases, role, onViewCase, onNewCase }) {
  const [filter, setFilter] = React.useState('All');
  const filtered = filter === 'All' ? cases : cases.filter(c => c.status === filter);
  return (
    <div className="card">
      <div className="card-header">
        <div className="btn-group">
          {['All','Filed','Active','Hearing','Awarded','Closed'].map(f => <button key={f} className={`btn btn-sm ${filter===f?'btn-primary':'btn-outline'}`} onClick={() => setFilter(f)}>{f}</button>)}
        </div>
        {role === 'claimant' && <button className="btn btn-primary" onClick={onNewCase}>+ File New Case</button>}
      </div>
      <div className="table-wrap"><table><thead><tr><th>Case ID</th><th>Type</th><th>Claimant</th><th>Respondent</th><th>Value</th><th>Status</th><th>Stage</th></tr></thead><tbody>
        {filtered.map(c => (
          <tr key={c.id} onClick={() => onViewCase(c)}>
            <td style={{fontWeight:600}}>{c.id}</td><td>{c.type}</td><td>{c.claimant}</td><td>{c.respondent}</td><td>{c.value}</td><td><Badge status={c.status} /></td><td>{c.stage}</td>
          </tr>
        ))}
      </tbody></table></div>
    </div>
  );
}

// ===== CASE DETAIL =====
function CaseDetail({ caseData, role, onBack, onJoinHearing, onOpenDrafter, showToast }) {
  const [tab, setTab] = React.useState('overview');
  const docs = MOCK.documents.filter(d => d.caseId === caseData.id);
  const hearings = MOCK.hearings.filter(h => h.caseId === caseData.id);
  const timeline = caseData.id === 'ARB-2026-00142' ? MOCK.caseTimeline : [];
  const needsResponse = role === 'respondent' && !caseData.responseReceived && caseData.noticeServed;

  return (
    <div className="detail-panel">
      <div className="detail-header">
        <div>
          <button className="btn btn-outline btn-sm" onClick={onBack} style={{marginBottom:8}}>← Back</button>
          <h3 style={{fontSize:'1.1rem'}}>{caseData.id} — {caseData.type} Dispute</h3>
          <div style={{fontSize:'0.85rem',color:'var(--text-light)',marginTop:4}}>{caseData.claimant} vs {caseData.respondent}</div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'flex-start'}}>
          <Badge status={caseData.status} />
          {needsResponse && <span className="badge badge-live">⚠ Response Required</span>}
        </div>
      </div>
      <div className="detail-tabs">
        {['overview','documents','hearings','timeline'].map(t => <div key={t} className={`detail-tab ${tab===t?'active':''}`} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</div>)}
      </div>
      <div className="detail-body">
        {tab === 'overview' && (
          <div>
            {needsResponse && (
              <div style={{background:'#fff5f5',border:'1px solid #fed7d7',borderRadius:'var(--radius)',padding:16,marginBottom:16}}>
                <div style={{fontWeight:600,color:'#c53030',marginBottom:4}}>⚠ Action Required: Reply to Arbitration Notice</div>
                <div style={{fontSize:'0.85rem',color:'var(--text-light)',marginBottom:10}}>You have received an arbitration notice under Section 21. You must file your response within 30 days. Use the AI Drafting Engine to prepare your Statement of Defence.</div>
                <button className="btn btn-primary" onClick={() => onOpenDrafter('defence', caseData)}>📝 Draft Response with AI</button>
              </div>
            )}
            <div className="info-grid">
              <div className="info-item"><div className="info-label">Dispute Value</div><div className="info-value">{caseData.value}</div></div>
              <div className="info-item"><div className="info-label">Institution</div><div className="info-value">{caseData.institution || 'Ad-hoc'}</div></div>
              <div className="info-item"><div className="info-label">Arbitrator</div><div className="info-value">{caseData.arbitrator || 'Pending Appointment'}</div></div>
              <div className="info-item"><div className="info-label">Current Stage</div><div className="info-value">{caseData.stage}</div></div>
              <div className="info-item"><div className="info-label">Filed On</div><div className="info-value">{caseData.filed}</div></div>
              <div className="info-item"><div className="info-label">Award Deadline</div><div className="info-value">{caseData.deadline || 'N/A'}</div></div>
              <div className="info-item"><div className="info-label">Next Hearing</div><div className="info-value">{caseData.nextHearing || 'None scheduled'}</div></div>
              <div className="info-item"><div className="info-label">Notice Served</div><div className="info-value">{caseData.noticeServed ? '✅ Yes' : '❌ No'}</div></div>
            </div>
          </div>
        )}
        {tab === 'documents' && (
          <div>
            <div style={{marginBottom:12,display:'flex',gap:8}}>
              <button className="btn btn-primary btn-sm" onClick={() => onOpenDrafter('picker', caseData)}>📝 Draft Document with AI</button>
              <button className="btn btn-outline btn-sm">+ Upload Document</button>
            </div>
            {docs.map(d => (
              <div key={d.id} className="doc-item">
                <div className="doc-icon">{d.type === 'Recording' ? '🎥' : '📄'}</div>
                <div className="doc-info"><div className="doc-name">{d.name}</div><div className="doc-meta">{d.type} · {d.uploadedBy} · {d.date} · {d.size}</div></div>
                <button className="btn btn-outline btn-sm">Download</button>
              </div>
            ))}
          </div>
        )}
        {tab === 'hearings' && (
          <div>
            {hearings.map(h => (
              <div key={h.id} className="doc-item" style={{padding:12}}>
                <div className="doc-icon">🎙️</div>
                <div className="doc-info">
                  <div className="doc-name">{h.type}</div>
                  <div className="doc-meta">{h.date} at {h.time} {h.duration ? `· ${h.duration}` : ''}</div>
                </div>
                <div className="btn-group">
                  <Badge status={h.status} />
                  {h.status === 'Scheduled' && <button className="btn btn-primary btn-sm" onClick={() => onJoinHearing(h)}>Join</button>}
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === 'timeline' && (
          <div className="timeline">
            {timeline.map((t, i) => (
              <div key={i} className={`timeline-item ${t.completed ? 'completed' : i === timeline.findIndex(x => !x.completed) ? 'current' : ''}`}>
                <div className="t-date">{t.date}</div>
                <div className="t-title">{t.title}</div>
                <div className="t-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ===== CONVERSATIONAL AI DRAFTING ENGINE =====
function DraftingEngine({ templateId, caseData, role, onClose, showToast }) {
  const [activeTemplateId, setActiveTemplateId] = React.useState(templateId === 'picker' ? null : templateId);
  const [catFilter, setCatFilter] = React.useState('All');

  // Picker mode
  if (!activeTemplateId) {
    const categories = ['All', ...new Set(Object.values(DRAFT_TEMPLATES).map(t => t.category))];
    const available = Object.entries(DRAFT_TEMPLATES).filter(([, t]) => t.forRole.includes(role));
    const filtered = catFilter === 'All' ? available : available.filter(([, t]) => t.category === catFilter);
    return (
      <Modal title={`📝 Select Document to Draft — ${role.charAt(0).toUpperCase() + role.slice(1)} View`} onClose={onClose}>
        <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap'}}>
          {categories.map(c => {
            const count = available.filter(([,t]) => c === 'All' || t.category === c).length;
            return count > 0 || c === 'All' ? <button key={c} className={`btn btn-sm ${catFilter===c?'btn-primary':'btn-outline'}`} onClick={() => setCatFilter(c)}>{c} ({c === 'All' ? available.length : count})</button> : null;
          })}
        </div>
        {filtered.map(([id, tpl]) => (
          <div key={id} className="doc-item" style={{padding:12,cursor:'pointer',border:'1px solid var(--border)',borderRadius:'var(--radius)',marginBottom:8}} onClick={() => setActiveTemplateId(id)}>
            <div className="doc-icon">📋</div>
            <div className="doc-info">
              <div className="doc-name">{tpl.name}</div>
              <div className="doc-meta">{tpl.section} · {tpl.category} · {tpl.questions.length} questions</div>
              <div style={{fontSize:'0.8rem',color:'var(--text-light)',marginTop:2}}>{tpl.description}</div>
            </div>
            <span style={{fontSize:'0.8rem',color:'var(--primary)',whiteSpace:'nowrap'}}>Draft →</span>
          </div>
        ))}
      </Modal>
    );
  }

  const template = DRAFT_TEMPLATES[activeTemplateId];
  const [phase, setPhase] = React.useState('questions'); // questions | draft | refine
  const [answers, setAnswers] = React.useState({});
  const [currentQ, setCurrentQ] = React.useState(0);
  const [chatHistory, setChatHistory] = React.useState([
    { from: 'ai', text: `Welcome! I'll help you draft the **${template.name}**. I'll ask you a few questions to understand your case, then generate a complete first draft.\n\nLet's begin.` },
    { from: 'ai', text: template.questions[0].q },
  ]);
  const [userInput, setUserInput] = React.useState('');
  const [draft, setDraft] = React.useState('');
  const [refineInput, setRefineInput] = React.useState('');
  const [generating, setGenerating] = React.useState(false);
  const [sendingNotice, setSendingNotice] = React.useState(false);
  const chatEndRef = React.useRef(null);

  React.useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatHistory, phase]);

  const handleAnswer = () => {
    if (!userInput.trim()) return;
    const q = template.questions[currentQ];
    const newAnswers = { ...answers, [q.id]: userInput.trim() };
    setAnswers(newAnswers);
    setChatHistory(prev => [...prev, { from: 'user', text: userInput.trim() }]);
    setUserInput('');

    if (currentQ < template.questions.length - 1) {
      const nextQ = currentQ + 1;
      setCurrentQ(nextQ);
      setTimeout(() => {
        setChatHistory(prev => [...prev, { from: 'ai', text: `Got it. ${template.questions[nextQ].q}` }]);
      }, 400);
    } else {
      // All questions answered — generate draft
      setTimeout(() => {
        setChatHistory(prev => [...prev, { from: 'ai', text: '✅ Thank you! I have all the information I need. Generating your complete draft now...' }]);
        setGenerating(true);
      }, 400);
      setTimeout(() => {
        const d = generateDraft(activeTemplateId, newAnswers, caseData, role);
        setDraft(d);
        setPhase('draft');
        setGenerating(false);
        setChatHistory(prev => [...prev, { from: 'ai', text: '📄 **Your draft is ready!** Review it on the right panel. You can:\n\n• **Edit directly** in the document\n• **Ask me to refine** specific sections using the chat below\n• **Send as notice** via email, SMS, or download as PDF' }]);
      }, 2000);
    }
  };

  const handleRefine = () => {
    if (!refineInput.trim()) return;
    const instruction = refineInput.trim();
    setChatHistory(prev => [...prev, { from: 'user', text: instruction }]);
    setRefineInput('');
    setGenerating(true);

    setTimeout(() => {
      // Simulate AI refinement
      let refined = draft;
      if (instruction.toLowerCase().includes('formal') || instruction.toLowerCase().includes('tone')) {
        refined = draft.replace('Dear Sir/Madam,', 'Dear Sir/Madam,\n\nWith due respect and without prejudice to the rights of the Claimant,');
        setChatHistory(prev => [...prev, { from: 'ai', text: '✅ I\'ve made the tone more formal. The opening salutation now includes a standard legal courtesy. Review the updated draft.' }]);
      } else if (instruction.toLowerCase().includes('interest') || instruction.toLowerCase().includes('rate')) {
        refined = draft.replace('18%', '24%');
        setChatHistory(prev => [...prev, { from: 'ai', text: '✅ Updated the interest rate as requested. Please verify this aligns with your agreement terms and applicable law.' }]);
      } else if (instruction.toLowerCase().includes('add') || instruction.toLowerCase().includes('include')) {
        refined = draft + '\n\nADDITIONAL NOTE:\n' + instruction;
        setChatHistory(prev => [...prev, { from: 'ai', text: '✅ I\'ve added the additional content at the end of the document. You can move it to the appropriate section by editing directly.' }]);
      } else {
        setChatHistory(prev => [...prev, { from: 'ai', text: `✅ I've incorporated your feedback: "${instruction}". The draft has been updated. Please review the changes.` }]);
        refined = draft.replace(/\n\nEnclosures:/, `\n\n[Note: ${instruction}]\n\nEnclosures:`);
      }
      setDraft(refined);
      setGenerating(false);
    }, 1500);
  };

  const handleSendNotice = (method) => {
    setSendingNotice(true);
    setTimeout(() => {
      setSendingNotice(false);
      if (method === 'pdf') {
        setChatHistory(prev => [...prev, { from: 'ai', text: '📥 **PDF Generated!** The notice has been saved as a PDF document. You can download it and send a physical copy via registered post/courier.' }]);
      } else {
        const opp = MOCK.users.respondent;
        setChatHistory(prev => [...prev, { from: 'ai', text: `📨 **Notice sent via ${method.toUpperCase()}!**\n\nRecipient: ${opp.name} (${method === 'email' ? opp.email : opp.phone})\nTimestamp: ${new Date().toLocaleString('en-IN')}\nDelivery tracking has been enabled.` }]);
      }
      if (showToast) showToast(`Notice ${method === 'pdf' ? 'PDF generated' : 'sent via ' + method} successfully!`);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="drafting-engine" onClick={e => e.stopPropagation()}>
        <div className="de-header">
          <div>
            <h3>🤖 AI Drafting Engine — {template.name}</h3>
            {caseData && <div style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.7)',marginTop:2}}>{caseData.id} · {caseData.claimant} vs {caseData.respondent}</div>}
          </div>
          <button className="close-btn" onClick={onClose} style={{color:'white',fontSize:'1.5rem'}}>×</button>
        </div>

        <div className="de-body">
          {/* Chat Panel */}
          <div className="de-chat">
            <div className="de-chat-messages">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`de-msg ${msg.from}`}>
                  <div className="de-msg-avatar">{msg.from === 'ai' ? '🤖' : '👤'}</div>
                  <div className="de-msg-bubble">
                    {msg.text.split('\n').map((line, j) => <div key={j}>{line.replace(/\*\*(.*?)\*\*/g, (_, t) => t) || '\u00A0'}</div>)}
                  </div>
                </div>
              ))}
              {generating && (
                <div className="de-msg ai">
                  <div className="de-msg-avatar">🤖</div>
                  <div className="de-msg-bubble"><span className="de-typing">Drafting<span>.</span><span>.</span><span>.</span></span></div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="de-chat-input">
              {phase === 'questions' && (
                <>
                  {template.questions[currentQ]?.type === 'select' ? (
                    <select value={userInput} onChange={e => setUserInput(e.target.value)} style={{flex:1,padding:'10px 12px',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'0.88rem'}}>
                      <option value="">Select an option...</option>
                      {template.questions[currentQ].options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      value={userInput}
                      onChange={e => setUserInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAnswer()}
                      placeholder={template.questions[currentQ]?.placeholder || 'Type your answer...'}
                      style={{flex:1}}
                    />
                  )}
                  <button className="btn btn-primary" onClick={handleAnswer} disabled={!userInput.trim()}>Send</button>
                </>
              )}
              {phase === 'draft' && (
                <>
                  <input
                    value={refineInput}
                    onChange={e => setRefineInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleRefine()}
                    placeholder="Ask AI to refine... e.g., 'Make the tone more formal' or 'Add a clause about penalty'"
                    style={{flex:1}}
                    disabled={generating}
                  />
                  <button className="btn btn-primary" onClick={handleRefine} disabled={!refineInput.trim() || generating}>Refine</button>
                </>
              )}
            </div>
          </div>

          {/* Draft Panel */}
          <div className="de-draft">
            {phase === 'questions' && !draft && (
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:'var(--text-light)',textAlign:'center',padding:40}}>
                <div>
                  <div style={{fontSize:'3rem',marginBottom:12}}>📄</div>
                  <div style={{fontSize:'1rem',fontWeight:600}}>Your draft will appear here</div>
                  <div style={{fontSize:'0.85rem',marginTop:4}}>Answer the questions in the chat to generate a complete first draft</div>
                  <div style={{fontSize:'0.8rem',marginTop:12,color:'var(--text-light)'}}>
                    Progress: {currentQ + 1} of {template.questions.length} questions
                  </div>
                </div>
              </div>
            )}
            {draft && (
              <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
                <div className="de-draft-toolbar">
                  <span style={{fontWeight:600,fontSize:'0.85rem'}}>📄 {template.name}</span>
                  <div style={{display:'flex',gap:6}}>
                    {role === 'claimant' && activeTemplateId === 'section-21' && <>
                      <button className="btn btn-sm btn-primary" onClick={() => handleSendNotice('email')} disabled={sendingNotice}>📧 Send via Email</button>
                      <button className="btn btn-sm btn-outline" onClick={() => handleSendNotice('sms')} disabled={sendingNotice}>💬 Send via SMS</button>
                      <button className="btn btn-sm btn-outline" onClick={() => handleSendNotice('pdf')} disabled={sendingNotice}>📥 Download PDF</button>
                    </>}
                    {(role !== 'claimant' || activeTemplateId !== 'section-21') && <>
                      <button className="btn btn-sm btn-primary" onClick={() => { if(showToast) showToast('Document saved to case file!'); }}>💾 Save to Case</button>
                      <button className="btn btn-sm btn-outline" onClick={() => handleSendNotice('pdf')}>📥 Download PDF</button>
                    </>}
                  </div>
                </div>
                <textarea
                  className="de-draft-content"
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  spellCheck={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== NEW CASE FILING WIZARD =====
function NewCaseWizard({ onClose, onSubmit }) {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({ type: 'Commercial', claimantName: MOCK.users.claimant.org, respondentName: '', value: '', description: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const steps = ['Dispute Type', 'Parties', 'Details', 'Review & File'];
  const fee = form.value ? `₹${Math.max(5000, Math.round(parseInt(form.value.replace(/,/g,'')) * 0.01)).toLocaleString('en-IN')}` : '—';

  return (
    <Modal title="File New Arbitration Case" onClose={onClose} footer={
      <div className="btn-group">
        {step > 0 && <button className="btn btn-outline" onClick={() => setStep(s => s-1)}>Back</button>}
        {step < 3 ? <button className="btn btn-primary" onClick={() => setStep(s => s+1)}>Next</button>
          : <button className="btn btn-success" onClick={() => onSubmit(form)}>File Case & Pay {fee}</button>}
      </div>
    }>
      <div className="stepper">
        {steps.map((s, i) => (
          <div key={i} className={`step ${i < step ? 'done' : i === step ? 'active' : ''}`}>
            <div className="step-num">{i < step ? '✓' : i + 1}</div>
            <div className="step-label">{s}</div>
          </div>
        ))}
      </div>
      {step === 0 && (
        <div className="form-group">
          <label>Dispute Type</label>
          <select value={form.type} onChange={e => set('type', e.target.value)}>
            {['Commercial','Construction','Employment','IP / Licensing','Insurance','Banking','Consumer','Property'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      )}
      {step === 1 && (
        <div>
          <div className="form-group"><label>Claimant Name / Organization</label><input value={form.claimantName} onChange={e => set('claimantName', e.target.value)} /></div>
          <div className="form-group"><label>Respondent Name / Organization</label><input value={form.respondentName} onChange={e => set('respondentName', e.target.value)} placeholder="e.g., Apex Freight Solutions" /></div>
        </div>
      )}
      {step === 2 && (
        <div>
          <div className="form-group"><label>Dispute Value (₹)</label><input value={form.value} onChange={e => set('value', e.target.value)} placeholder="e.g., 4500000" /></div>
          <div className="form-group"><label>Brief Description of Dispute</label><textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe the dispute and relief sought..." /></div>
        </div>
      )}
      {step === 3 && (
        <div>
          <div className="info-grid">
            <div className="info-item"><div className="info-label">Type</div><div className="info-value">{form.type}</div></div>
            <div className="info-item"><div className="info-label">Claimant</div><div className="info-value">{form.claimantName || '—'}</div></div>
            <div className="info-item"><div className="info-label">Respondent</div><div className="info-value">{form.respondentName || '—'}</div></div>
            <div className="info-item"><div className="info-label">Value</div><div className="info-value">₹{parseInt(form.value.replace(/,/g,'')||0).toLocaleString('en-IN')}</div></div>
            <div className="info-item"><div className="info-label">Filing Fee</div><div className="info-value">{fee}</div></div>
          </div>
          <p style={{marginTop:16,fontSize:'0.82rem',color:'var(--text-light)'}}>By filing, you confirm the arbitration agreement is valid under Section 7 of the Arbitration & Conciliation Act, 1996. After filing, use the AI Drafting Engine to prepare your Section 21 Arbitration Notice.</p>
        </div>
      )}
    </Modal>
  );
}
