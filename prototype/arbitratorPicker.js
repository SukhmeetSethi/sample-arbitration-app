// ===== ARBITRATOR PICKER =====
// Allows parties to pick from system arbitrators or add external arbitrator details

function ArbitratorPicker({ onSelect, onClose, caseType }) {
  const [mode, setMode] = React.useState('system'); // system | external
  const [search, setSearch] = React.useState('');
  const [domainFilter, setDomainFilter] = React.useState('All');
  const [external, setExternal] = React.useState({ name: '', designation: '', barCouncilId: '', expertise: '', experience: '', email: '', phone: '' });

  const domains = ['All', ...new Set(MOCK.arbitrators.flatMap(a => a.domain))];
  const filtered = MOCK.arbitrators.filter(a => {
    if (domainFilter !== 'All' && !a.domain.includes(domainFilter)) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleExternalSubmit = () => {
    if (!external.name.trim()) return;
    onSelect({ type: 'external', ...external });
  };

  return React.createElement('div', { style: { border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'white', padding: 16 } },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
      React.createElement('h4', { style: { margin: 0 } }, '⚖️ Propose Arbitrator'),
      onClose && React.createElement('button', { className: 'btn btn-outline btn-sm', onClick: onClose }, '×')
    ),
    // Mode toggle
    React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 14 } },
      React.createElement('button', { className: `btn btn-sm ${mode === 'system' ? 'btn-primary' : 'btn-outline'}`, onClick: () => setMode('system') }, '📋 From Platform'),
      React.createElement('button', { className: `btn btn-sm ${mode === 'external' ? 'btn-primary' : 'btn-outline'}`, onClick: () => setMode('external') }, '➕ External Arbitrator')
    ),

    mode === 'system' ? React.createElement('div', null,
      // Search & filter
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 12 } },
        React.createElement('input', { value: search, onChange: e => setSearch(e.target.value), placeholder: 'Search by name...', style: { flex: 1, padding: '7px 10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '0.83rem' } }),
        React.createElement('select', { value: domainFilter, onChange: e => setDomainFilter(e.target.value), style: { padding: '7px 10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '0.83rem' } },
          domains.map(d => React.createElement('option', { key: d, value: d }, d))
        )
      ),
      // Arbitrator list
      React.createElement('div', { style: { maxHeight: 280, overflow: 'auto' } },
        filtered.map(arb =>
          React.createElement('div', { key: arb.id, style: { display: 'flex', alignItems: 'center', gap: 12, padding: 10, border: '1px solid var(--border)', borderRadius: 'var(--radius)', marginBottom: 6, cursor: 'pointer' }, onClick: () => onSelect({ type: 'system', ...arb }) },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: '50%', background: '#ebf8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#2b6cb0' } }, arb.name.charAt(0)),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontWeight: 600, fontSize: '0.88rem' } }, arb.name),
              React.createElement('div', { style: { fontSize: '0.78rem', color: 'var(--text-light)' } }, arb.title),
              React.createElement('div', { style: { fontSize: '0.75rem', color: 'var(--text-light)' } }, arb.domain.join(', '), ' · ', arb.experience, ' yrs · ', arb.fee)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { fontSize: '0.85rem', fontWeight: 600, color: '#d69e2e' } }, '⭐ ', arb.rating),
              React.createElement('div', { style: { fontSize: '0.75rem', color: arb.available ? '#276749' : '#c53030' } }, arb.available ? '✓ Available' : '✗ Busy')
            )
          )
        ),
        filtered.length === 0 && React.createElement('div', { style: { textAlign: 'center', padding: 20, color: 'var(--text-light)' } }, 'No arbitrators found')
      )
    ) :
    // External arbitrator form
    React.createElement('div', null,
      React.createElement('div', { style: { fontSize: '0.83rem', color: 'var(--text-light)', marginBottom: 12 } }, 'Add details of an arbitrator not registered on the platform. Their credentials will be verified.'),
      [
        { key: 'name', label: 'Full Name *', placeholder: 'e.g., Justice (Retd.) A.K. Sikri' },
        { key: 'designation', label: 'Designation', placeholder: 'e.g., Former Judge, Supreme Court of India' },
        { key: 'barCouncilId', label: 'Bar Council ID', placeholder: 'e.g., D/1234/1985' },
        { key: 'expertise', label: 'Domain Expertise', placeholder: 'e.g., Commercial, Construction' },
        { key: 'experience', label: 'Years of Experience', placeholder: 'e.g., 30' },
        { key: 'email', label: 'Email', placeholder: 'e.g., arbitrator@email.com' },
        { key: 'phone', label: 'Phone', placeholder: 'e.g., +91 98xxx xxxxx' },
      ].map(f =>
        React.createElement('div', { key: f.key, style: { marginBottom: 8 } },
          React.createElement('label', { style: { fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: 2 } }, f.label),
          React.createElement('input', { value: external[f.key], onChange: e => setExternal(prev => ({ ...prev, [f.key]: e.target.value })), placeholder: f.placeholder, style: { width: '100%', padding: '7px 10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '0.83rem' } })
        )
      ),
      React.createElement('button', { className: 'btn btn-primary btn-sm', onClick: handleExternalSubmit, disabled: !external.name.trim(), style: { marginTop: 8 } }, '✓ Propose This Arbitrator')
    )
  );
}
