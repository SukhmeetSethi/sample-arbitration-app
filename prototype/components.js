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

function Stepper({ steps, current }) {
  return (
    <div className="stepper">
      {steps.map((s, i) => (
        <div key={i} className={`step ${i < current ? 'done' : i === current ? 'active' : ''}`}>
          <div className="step-num">{i < current ? '✓' : i + 1}</div>
          <div className="step-label">{s}</div>
        </div>
      ))}
    </div>
  );
}

// ===== DASHBOARD =====
function Dashboard({ cases, onViewCase, onNavigate }) {
  const stats = [
    { label: 'Active Cases', value: cases.filter(c => ['Filed','Active','Hearing'].includes(c.status)).length, sub: '↑ 2 this month' },
    { label: 'Upcoming Hearings', value: MOCK.hearings.filter(h => h.status === 'Scheduled').length, sub: 'Next: 22 Apr' },
    { label: 'Awards Issued', value: MOCK.awards.length, sub: 'This quarter' },
    { label: 'Arbitrators on Panel', value: MOCK.arbitrators.length, sub: `${MOCK.arbitrators.filter(a => a.available).length} available` },
  ];
  return (
    <div>
      <div className="stats-row">
        {stats.map((s, i) => <div key={i} className="stat-card"><div className="label">{s.label}</div><div className="value">{s.value}</div><div className="sub">{s.sub}</div></div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card">
          <div className="card-header"><h3>Recent Cases</h3><button className="btn btn-outline btn-sm" onClick={() => onNavigate('cases')}>View All</button></div>
          <div className="table-wrap"><table><thead><tr><th>Case ID</th><th>Type</th><th>Status</th><th>Stage</th></tr></thead><tbody>
            {cases.slice(0, 4).map(c => <tr key={c.id} onClick={() => onViewCase(c)}><td style={{fontWeight:600}}>{c.id}</td><td>{c.type}</td><td><Badge status={c.status} /></td><td>{c.stage}</td></tr>)}
          </tbody></table></div>
        </div>
        <div className="card">
          <div className="card-header"><h3>Upcoming Hearings</h3><button className="btn btn-outline btn-sm" onClick={() => onNavigate('hearings')}>View All</button></div>
          {MOCK.hearings.filter(h => h.status === 'Scheduled').map(h => (
            <div key={h.id} className="doc-item">
              <div className="doc-icon">📅</div>
              <div className="doc-info">
                <div className="doc-name">{h.type} — {h.caseId}</div>
                <div className="doc-meta">{h.date} at {h.time} · {h.participants.length} participants</div>
              </div>
              <Badge status={h.status} />
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-header"><h3>Recent Notifications</h3></div>
        {MOCK.notifications.map(n => (
          <div key={n.id} className="doc-item" style={{ opacity: n.read ? 0.6 : 1 }}>
            <div className="doc-icon">{n.read ? '📩' : '🔔'}</div>
            <div className="doc-info"><div className="doc-name">{n.text}</div><div className="doc-meta">{n.time}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== CASES LIST =====
function CasesList({ cases, onViewCase, onNewCase }) {
  const [filter, setFilter] = React.useState('All');
  const filtered = filter === 'All' ? cases : cases.filter(c => c.status === filter);
  return (
    <div className="card">
      <div className="card-header">
        <div className="btn-group">
          {['All','Filed','Active','Hearing','Awarded','Closed'].map(f => <button key={f} className={`btn btn-sm ${filter===f?'btn-primary':'btn-outline'}`} onClick={() => setFilter(f)}>{f}</button>)}
        </div>
        <button className="btn btn-primary" onClick={onNewCase}>+ New Case</button>
      </div>
      <div className="table-wrap"><table><thead><tr><th>Case ID</th><th>Type</th><th>Claimant</th><th>Respondent</th><th>Value</th><th>Status</th><th>Arbitrator</th><th>Filed</th></tr></thead><tbody>
        {filtered.map(c => (
          <tr key={c.id} onClick={() => onViewCase(c)}>
            <td style={{fontWeight:600}}>{c.id}</td><td>{c.type}</td><td>{c.claimant}</td><td>{c.respondent}</td><td>{c.value}</td><td><Badge status={c.status} /></td><td>{c.arbitrator || '—'}</td><td>{c.filed}</td>
          </tr>
        ))}
      </tbody></table></div>
    </div>
  );
}

// ===== CASE DETAIL =====
function CaseDetail({ caseData, onBack, onJoinHearing }) {
  const [tab, setTab] = React.useState('overview');
  const [showTemplatePicker, setShowTemplatePicker] = React.useState(false);
  const [editingTemplate, setEditingTemplate] = React.useState(null);
  const docs = MOCK.documents.filter(d => d.caseId === caseData.id);
  const hearings = MOCK.hearings.filter(h => h.caseId === caseData.id);
  const timeline = caseData.id === 'ARB-2026-00142' ? MOCK.caseTimeline : [];
  return (
    <div className="detail-panel">
      <div className="detail-header">
        <div>
          <button className="btn btn-outline btn-sm" onClick={onBack} style={{marginBottom:8}}>← Back</button>
          <h3 style={{fontSize:'1.1rem'}}>{caseData.id} — {caseData.type} Dispute</h3>
          <div style={{fontSize:'0.85rem',color:'var(--text-light)',marginTop:4}}>{caseData.claimant} vs {caseData.respondent}</div>
        </div>
        <Badge status={caseData.status} />
      </div>
      <div className="detail-tabs">
        {['overview','documents','hearings','timeline'].map(t => <div key={t} className={`detail-tab ${tab===t?'active':''}`} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</div>)}
      </div>
      <div className="detail-body">
        {tab === 'overview' && (
          <div className="info-grid">
            <div className="info-item"><div className="info-label">Dispute Value</div><div className="info-value">{caseData.value}</div></div>
            <div className="info-item"><div className="info-label">Institution</div><div className="info-value">{caseData.institution || 'Ad-hoc'}</div></div>
            <div className="info-item"><div className="info-label">Arbitrator</div><div className="info-value">{caseData.arbitrator || 'Pending Appointment'}</div></div>
            <div className="info-item"><div className="info-label">Current Stage</div><div className="info-value">{caseData.stage}</div></div>
            <div className="info-item"><div className="info-label">Filed On</div><div className="info-value">{caseData.filed}</div></div>
            <div className="info-item"><div className="info-label">Award Deadline</div><div className="info-value">{caseData.deadline || 'N/A'}</div></div>
            <div className="info-item"><div className="info-label">Next Hearing</div><div className="info-value">{caseData.nextHearing || 'None scheduled'}</div></div>
            <div className="info-item"><div className="info-label">Documents</div><div className="info-value">{docs.length} files</div></div>
          </div>
        )}
        {tab === 'documents' && (
          <div>
            <div style={{marginBottom:12,display:'flex',gap:8}}>
              <button className="btn btn-primary btn-sm" onClick={() => setShowTemplatePicker(true)}>📝 New from Template</button>
              <button className="btn btn-outline btn-sm">+ Upload Document</button>
            </div>
            {docs.map(d => (
              <div key={d.id} className="doc-item">
                <div className="doc-icon">{d.type === 'Recording' ? '🎥' : '📄'}</div>
                <div className="doc-info"><div className="doc-name">{d.name}</div><div className="doc-meta">{d.type} · {d.uploadedBy} · {d.date} · {d.size}</div></div>
                <button className="btn btn-outline btn-sm">Download</button>
              </div>
            ))}
            {showTemplatePicker && <TemplatePicker onClose={() => setShowTemplatePicker(false)} onSelect={(tpl) => { setShowTemplatePicker(false); setEditingTemplate(tpl); }} />}
            {editingTemplate && <TemplateEditor template={editingTemplate} caseData={caseData} onClose={() => setEditingTemplate(null)} />}
          </div>
        )}
        {tab === 'hearings' && (
          <div>
            {hearings.map(h => (
              <div key={h.id} className="doc-item" style={{padding:12}}>
                <div className="doc-icon">🎙️</div>
                <div className="doc-info">
                  <div className="doc-name">{h.type}</div>
                  <div className="doc-meta">{h.date} at {h.time} {h.duration ? `· ${h.duration}` : ''} · {h.participants.join(', ')}</div>
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

// ===== NEW CASE FILING WIZARD =====
function NewCaseWizard({ onClose, onSubmit }) {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({ type: 'Commercial', claimantName: '', respondentName: '', value: '', description: '', agreement: null });
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
      <Stepper steps={steps} current={step} />
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
          <div className="form-group"><label>Claimant Name / Organization</label><input value={form.claimantName} onChange={e => set('claimantName', e.target.value)} placeholder="e.g., Sharma Logistics Pvt Ltd" /></div>
          <div className="form-group"><label>Respondent Name / Organization</label><input value={form.respondentName} onChange={e => set('respondentName', e.target.value)} placeholder="e.g., Apex Freight Solutions" /></div>
        </div>
      )}
      {step === 2 && (
        <div>
          <div className="form-group"><label>Dispute Value (₹)</label><input value={form.value} onChange={e => set('value', e.target.value)} placeholder="e.g., 4500000" /></div>
          <div className="form-group"><label>Brief Description of Dispute</label><textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe the dispute and relief sought..." /></div>
          <div className="form-group"><label>Upload Arbitration Agreement (PDF)</label><input type="file" accept=".pdf" onChange={e => set('agreement', e.target.files[0]?.name)} /></div>
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
            <div className="info-item"><div className="info-label">Agreement</div><div className="info-value">{form.agreement || 'Not uploaded'}</div></div>
          </div>
          <p style={{marginTop:16,fontSize:'0.82rem',color:'var(--text-light)'}}>By filing, you confirm the arbitration agreement is valid under Section 7 of the Arbitration & Conciliation Act, 1996. An arbitration notice under Section 21 will be served to the respondent.</p>
        </div>
      )}
    </Modal>
  );
}

// ===== TEMPLATE PICKER =====
function TemplatePicker({ onClose, onSelect }) {
  const [catFilter, setCatFilter] = React.useState('All');
  const cats = ['All', ...new Set(MOCK.docTemplates.map(t => t.category))];
  const filtered = catFilter === 'All' ? MOCK.docTemplates : MOCK.docTemplates.filter(t => t.category === catFilter);
  return (
    <Modal title="Choose a Document Template" onClose={onClose}>
      <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap'}}>
        {cats.map(c => <button key={c} className={`btn btn-sm ${catFilter===c?'btn-primary':'btn-outline'}`} onClick={() => setCatFilter(c)}>{c}</button>)}
      </div>
      {filtered.map(tpl => (
        <div key={tpl.id} className="doc-item" style={{padding:12,cursor:'pointer',border:'1px solid var(--border)',borderRadius:'var(--radius)',marginBottom:8}} onClick={() => onSelect(tpl)}>
          <div className="doc-icon">📋</div>
          <div className="doc-info">
            <div className="doc-name">{tpl.name}</div>
            <div className="doc-meta">{tpl.category} · {tpl.sections.length} sections</div>
            <div style={{fontSize:'0.8rem',color:'var(--text-light)',marginTop:2}}>{tpl.description}</div>
          </div>
          <span style={{fontSize:'0.8rem',color:'var(--primary)'}}>Use →</span>
        </div>
      ))}
    </Modal>
  );
}

// ===== TEMPLATE EDITOR WITH AI =====
function TemplateEditor({ template, caseData, onClose }) {
  const [sections, setSections] = React.useState(template.sections.map(s => ({ ...s, content: '' })));
  const [aiLoading, setAiLoading] = React.useState(null);
  const [saved, setSaved] = React.useState(false);

  const updateSection = (idx, content) => {
    setSections(prev => prev.map((s, i) => i === idx ? { ...s, content } : s));
  };

  const aiGenerate = (idx) => {
    setAiLoading(idx);
    // Simulate AI generating content with a delay
    setTimeout(() => {
      const section = sections[idx];
      let content = MOCK.aiSuggestions[section.title] || '';
      if (!content) {
        content = `[AI-Generated Draft for "${section.title}"]\n\n${section.hint}\n\nCase Reference: ${caseData.id}\nParties: ${caseData.claimant} vs ${caseData.respondent}\nDispute Value: ${caseData.value}\n\n[Review and customize this content for your specific case. This is an AI-generated starting point based on standard arbitration practice under Indian law.]`;
      }
      // Replace placeholders with case data
      content = content
        .replace(/\[CLAIMANT\]/g, caseData.claimant)
        .replace(/\[RESPONDENT\]/g, caseData.respondent)
        .replace(/\[TYPE\]/g, caseData.type)
        .replace(/\[TODAY'S DATE\]/g, new Date().toLocaleDateString('en-IN'))
        .replace(/\[DATE\]/g, caseData.filed);
      updateSection(idx, content);
      setAiLoading(null);
    }, 1200);
  };

  const aiGenerateAll = () => {
    let delay = 0;
    sections.forEach((s, i) => {
      if (!s.content.trim()) {
        delay += 800;
        setTimeout(() => aiGenerate(i), delay);
      }
    });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{maxWidth:800,maxHeight:'90vh'}}>
        <div className="modal-header">
          <div>
            <h3>{template.name}</h3>
            <div style={{fontSize:'0.8rem',color:'var(--text-light)',marginTop:2}}>{caseData.id} · {caseData.claimant} vs {caseData.respondent}</div>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div style={{padding:'10px 20px',borderBottom:'1px solid var(--border)',display:'flex',gap:8,alignItems:'center',background:'var(--bg)'}}>
          <button className="btn btn-primary btn-sm" onClick={aiGenerateAll}>🤖 AI: Fill All Empty Sections</button>
          <button className="btn btn-success btn-sm" onClick={handleSave}>💾 Save Draft</button>
          <button className="btn btn-outline btn-sm">📤 Submit to Case File</button>
          {saved && <span style={{fontSize:'0.8rem',color:'var(--success)',fontWeight:600}}>✓ Draft saved</span>}
        </div>
        <div className="modal-body" style={{maxHeight:'65vh',overflowY:'auto'}}>
          {sections.map((s, i) => (
            <div key={i} style={{marginBottom:20}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                <label style={{fontWeight:600,fontSize:'0.9rem'}}>
                  <span style={{color:'var(--primary)',marginRight:6}}>{i+1}.</span>{s.title}
                </label>
                <button
                  className="btn btn-sm"
                  style={{background:'linear-gradient(135deg,#667eea,#764ba2)',color:'white',fontSize:'0.75rem'}}
                  onClick={() => aiGenerate(i)}
                  disabled={aiLoading === i}
                >
                  {aiLoading === i ? '⏳ Generating...' : '🤖 AI Assist'}
                </button>
              </div>
              <div style={{fontSize:'0.78rem',color:'var(--text-light)',marginBottom:4,fontStyle:'italic'}}>💡 {s.hint}</div>
              <textarea
                rows={s.content ? Math.min(12, s.content.split('\n').length + 2) : 4}
                value={s.content}
                onChange={e => updateSection(i, e.target.value)}
                placeholder={`Enter content for "${s.title}" or click AI Assist to auto-generate...`}
                style={{width:'100%',padding:'10px 12px',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontFamily:'inherit',fontSize:'0.85rem',resize:'vertical',transition:'border-color 0.15s'}}
              />
              {aiLoading === i && (
                <div style={{fontSize:'0.78rem',color:'#764ba2',marginTop:4}}>
                  🤖 AI is researching applicable legal provisions and drafting content for this section...
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
