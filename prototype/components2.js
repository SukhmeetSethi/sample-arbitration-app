// ===== ARBITRATOR MARKETPLACE =====
function ArbitratorMarketplace({ arbitrators, onNavigate }) {
  const [search, setSearch] = React.useState('');
  const [domain, setDomain] = React.useState('All');
  const [showOnboard, setShowOnboard] = React.useState(false);
  const domains = ['All', ...new Set(arbitrators.flatMap(a => a.domain))];
  const filtered = arbitrators.filter(a =>
    (domain === 'All' || a.domain.includes(domain)) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.domain.some(d => d.toLowerCase().includes(search.toLowerCase())))
  );
  return (
    <div>
      {showOnboard && <ArbitratorOnboarding onClose={() => setShowOnboard(false)} onSubmit={() => { setShowOnboard(false); }} />}
      <div className="card">
        <div className="card-header">
          <div style={{display:'flex',gap:10,alignItems:'center'}}>
            <input placeholder="Search arbitrators..." value={search} onChange={e => setSearch(e.target.value)} style={{padding:'7px 12px',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'0.85rem',width:220}} />
            <select value={domain} onChange={e => setDomain(e.target.value)} style={{padding:'7px 12px',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'0.85rem'}}>
              {domains.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" onClick={() => setShowOnboard(true)}>+ Register as Arbitrator</button>
        </div>
        <div className="card-grid">
          {filtered.map(a => (
            <div key={a.id} className="arb-card">
              <div className="arb-header">
                <div className="arb-avatar">{a.name.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
                <div>
                  <div className="arb-name">{a.name}</div>
                  <div className="arb-title">{a.title}</div>
                  <Badge status={a.status} />
                </div>
              </div>
              <div className="arb-meta">
                <span className="stars">{'★'.repeat(Math.floor(a.rating))} {a.rating}</span>
                <span>📋 {a.cases} cases</span>
                <span>⏱ {a.experience} yrs</span>
              </div>
              <div className="arb-meta">
                <span>💰 {a.fee}</span>
              </div>
              <div className="arb-meta">
                {a.domain.map(d => <span key={d} style={{background:'var(--bg)',padding:'2px 8px',borderRadius:4,fontSize:'0.75rem'}}>{d}</span>)}
              </div>
              <div style={{marginTop:10,display:'flex',gap:8}}>
                <button className="btn btn-primary btn-sm" style={{flex:1}} disabled={!a.available}>{a.available ? 'Appoint' : 'Unavailable'}</button>
                <button className="btn btn-outline btn-sm">Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== ARBITRATOR ONBOARDING =====
function ArbitratorOnboarding({ onClose, onSubmit }) {
  const [step, setStep] = React.useState(0);
  const steps = ['Personal Info', 'Credentials', 'Expertise & Fees', 'Review'];
  const [form, setForm] = React.useState({ name:'', email:'', phone:'', barCouncil:'', aadhaar:'', experience:'', domains:[], feeMin:'', feeMax:'', bio:'' });
  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  return (
    <Modal title="Arbitrator Registration" onClose={onClose} footer={
      <div className="btn-group">
        {step > 0 && <button className="btn btn-outline" onClick={() => setStep(s=>s-1)}>Back</button>}
        {step < 3 ? <button className="btn btn-primary" onClick={() => setStep(s=>s+1)}>Next</button>
          : <button className="btn btn-success" onClick={onSubmit}>Submit for Verification</button>}
      </div>
    }>
      <Stepper steps={steps} current={step} />
      {step === 0 && (
        <div>
          <div className="form-group"><label>Full Name</label><input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Justice (Retd.) / Adv. ..." /></div>
          <div className="form-row">
            <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={e=>set('email',e.target.value)} /></div>
            <div className="form-group"><label>Phone</label><input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+91..." /></div>
          </div>
        </div>
      )}
      {step === 1 && (
        <div>
          <div className="form-group"><label>Bar Council Enrollment No.</label><input value={form.barCouncil} onChange={e=>set('barCouncil',e.target.value)} placeholder="e.g., MH/5678/2004" /></div>
          <div className="form-group"><label>Aadhaar Number (for eKYC)</label><input value={form.aadhaar} onChange={e=>set('aadhaar',e.target.value)} placeholder="XXXX XXXX XXXX" /></div>
          <div className="form-group"><label>Upload CV / Resume (PDF)</label><input type="file" accept=".pdf" /></div>
          <div className="form-group"><label>Upload Sample Past Awards (optional)</label><input type="file" accept=".pdf" multiple /></div>
        </div>
      )}
      {step === 2 && (
        <div>
          <div className="form-group"><label>Years of Experience</label><input type="number" value={form.experience} onChange={e=>set('experience',e.target.value)} /></div>
          <div className="form-group"><label>Domain Expertise (select multiple)</label>
            <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
              {['Commercial','Construction','Employment','IP / Licensing','Insurance','Banking','Consumer','Property','International','Technology','Family'].map(d => (
                <label key={d} style={{fontSize:'0.82rem',display:'flex',alignItems:'center',gap:4,padding:'4px 8px',background:'var(--bg)',borderRadius:4,cursor:'pointer'}}>
                  <input type="checkbox" checked={form.domains.includes(d)} onChange={e => set('domains', e.target.checked ? [...form.domains,d] : form.domains.filter(x=>x!==d))} /> {d}
                </label>
              ))}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Minimum Fee (₹)</label><input value={form.feeMin} onChange={e=>set('feeMin',e.target.value)} placeholder="e.g., 100000" /></div>
            <div className="form-group"><label>Maximum Fee (₹)</label><input value={form.feeMax} onChange={e=>set('feeMax',e.target.value)} placeholder="e.g., 500000" /></div>
          </div>
          <div className="form-group"><label>Short Bio</label><textarea rows={3} value={form.bio} onChange={e=>set('bio',e.target.value)} placeholder="Brief professional background..." /></div>
        </div>
      )}
      {step === 3 && (
        <div>
          <div className="info-grid">
            <div className="info-item"><div className="info-label">Name</div><div className="info-value">{form.name || '—'}</div></div>
            <div className="info-item"><div className="info-label">Bar Council</div><div className="info-value">{form.barCouncil || '—'}</div></div>
            <div className="info-item"><div className="info-label">Experience</div><div className="info-value">{form.experience || '—'} years</div></div>
            <div className="info-item"><div className="info-label">Domains</div><div className="info-value">{form.domains.join(', ') || '—'}</div></div>
            <div className="info-item"><div className="info-label">Fee Range</div><div className="info-value">₹{form.feeMin || '—'} – ₹{form.feeMax || '—'}</div></div>
          </div>
          <p style={{marginTop:16,fontSize:'0.82rem',color:'var(--text-light)'}}>Your profile will be reviewed within 3–5 business days. KYC verification via Aadhaar eKYC will be initiated. You'll be notified once approved. Disclosure obligations under Section 12 (Fifth & Seventh Schedule) apply to all appointments.</p>
        </div>
      )}
    </Modal>
  );
}

// ===== HEARINGS PAGE =====
function HearingsPage({ hearings, onJoinHearing }) {
  return (
    <div>
      <div className="card">
        <div className="card-header"><h3>Upcoming Hearings</h3></div>
        <div className="table-wrap"><table><thead><tr><th>ID</th><th>Case</th><th>Date</th><th>Time</th><th>Type</th><th>Participants</th><th>Status</th><th>Action</th></tr></thead><tbody>
          {hearings.filter(h => h.status === 'Scheduled').map(h => (
            <tr key={h.id}><td>{h.id}</td><td style={{fontWeight:600}}>{h.caseId}</td><td>{h.date}</td><td>{h.time}</td><td>{h.type}</td><td>{h.participants.length}</td><td><Badge status={h.status} /></td>
              <td><button className="btn btn-primary btn-sm" onClick={() => onJoinHearing(h)}>Join</button></td></tr>
          ))}
        </tbody></table></div>
      </div>
      <div className="card">
        <div className="card-header"><h3>Past Hearings</h3></div>
        <div className="table-wrap"><table><thead><tr><th>ID</th><th>Case</th><th>Date</th><th>Type</th><th>Duration</th><th>Status</th><th>Recording</th></tr></thead><tbody>
          {hearings.filter(h => h.status === 'Completed').map(h => (
            <tr key={h.id}><td>{h.id}</td><td style={{fontWeight:600}}>{h.caseId}</td><td>{h.date}</td><td>{h.type}</td><td>{h.duration}</td><td><Badge status={h.status} /></td>
              <td><button className="btn btn-outline btn-sm">▶ Play</button></td></tr>
          ))}
        </tbody></table></div>
      </div>
    </div>
  );
}

// ===== VIRTUAL HEARING ROOM =====
function HearingRoom({ hearing, onLeave }) {
  const [muted, setMuted] = React.useState(false);
  const [videoOff, setVideoOff] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const [transcript, setTranscript] = React.useState([
    { time: '00:00', speaker: hearing.participants[2], text: 'Good morning. This hearing is now in session for case ' + hearing.caseId + '.' },
    { time: '00:15', speaker: hearing.participants[2], text: 'We will proceed with oral arguments. Claimant\'s counsel may begin.' },
  ]);

  React.useEffect(() => { const t = setInterval(() => setElapsed(e => e + 1), 1000); return () => clearInterval(t); }, []);
  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <div>
      <div className="hearing-room">
        <div className="hearing-info">
          <div><span className="recording-dot"></span> Recording · {hearing.caseId} — {hearing.type}</div>
          <div>{fmt(elapsed)}</div>
        </div>
        <div className="video-grid">
          {hearing.participants.map((p, i) => (
            <div key={i} className="video-tile">
              <div className="avatar">{p.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
              <div className="name">{p}</div>
              <div className="role-tag">{i === hearing.participants.length - 1 ? 'Arbitrator' : i === 0 ? 'Claimant' : 'Respondent'}</div>
            </div>
          ))}
        </div>
        <div className="hearing-controls">
          <button className={`ctrl-btn ${muted ? 'off' : 'on'}`} onClick={() => setMuted(!muted)} title="Mute">{muted ? '🔇' : '🎤'}</button>
          <button className={`ctrl-btn ${videoOff ? 'off' : 'on'}`} onClick={() => setVideoOff(!videoOff)} title="Camera">{videoOff ? '📷' : '📹'}</button>
          <button className="ctrl-btn on" title="Screen Share">🖥️</button>
          <button className="ctrl-btn on" title="Documents">📄</button>
          <button className="ctrl-btn on" title="Raise Hand">✋</button>
          <button className="ctrl-btn end" onClick={onLeave}>Leave Hearing</button>
        </div>
      </div>
      <div className="card" style={{marginTop:16}}>
        <div className="card-header"><h3>Live Transcript</h3><Badge status="Live" /></div>
        {transcript.map((t, i) => (
          <div key={i} style={{marginBottom:10,fontSize:'0.88rem'}}>
            <span style={{color:'var(--text-light)',marginRight:8,fontFamily:'monospace'}}>{t.time}</span>
            <span style={{fontWeight:600,marginRight:8}}>{t.speaker}:</span>
            <span>{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== AWARDS PAGE =====
function AwardsPage() {
  return (
    <div>
      <div className="card">
        <div className="card-header"><h3>Awards</h3><button className="btn btn-primary btn-sm">+ Draft New Award</button></div>
        <div className="table-wrap"><table><thead><tr><th>Award ID</th><th>Case</th><th>Parties</th><th>Arbitrator</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead><tbody>
          {MOCK.awards.map(a => (
            <tr key={a.id}><td style={{fontWeight:600}}>{a.id}</td><td>{a.caseId}</td><td>{a.parties}</td><td>{a.arbitrator}</td><td>{a.amount}</td><td>{a.date}</td><td><Badge status={a.status} /></td></tr>
          ))}
        </tbody></table></div>
      </div>
      <div className="card">
        <div className="card-header"><h3>Court Filings</h3></div>
        <div className="table-wrap"><table><thead><tr><th>Filing ID</th><th>Award</th><th>Court</th><th>Type</th><th>Court Case No.</th><th>Date</th><th>Status</th></tr></thead><tbody>
          {MOCK.courtFilings.map(f => (
            <tr key={f.id}><td style={{fontWeight:600}}>{f.id}</td><td>{f.awardId}</td><td>{f.court}</td><td>{f.type}</td><td>{f.caseNumber}</td><td>{f.date}</td><td><Badge status={f.status} /></td></tr>
          ))}
        </tbody></table></div>
      </div>
    </div>
  );
}
