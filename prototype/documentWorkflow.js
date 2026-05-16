// ===== DOCUMENT WORKFLOW - Post-Filing Flow =====

// Auto-generate full document content from case data (no questions needed)
function generateFullDocument(docType, caseData, role) {
  const u = MOCK.users[role] || MOCK.users.claimant;
  const opp = role === 'respondent' ? MOCK.users.claimant : MOCK.users.respondent;
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const caseId = caseData?.id || 'ARB-2026-XXXXX';
  const disputeValue = caseData?.value || '₹45,00,000';

  const docs = {
    'section-21-notice': () => `ARBITRATION NOTICE
Under Section 21 of the Arbitration and Conciliation Act, 1996

Date: ${today}
Case Reference: ${caseId}

To,
${opp.name}
${opp.org}
${opp.address}

From,
${u.name}
${u.org}
${u.address}

Subject: Notice invoking Arbitration under Clause 14.2 of the Service Agreement dated 15 March 2025

Dear Sir/Madam,

1. REFERENCE & BACKGROUND

The Claimant, ${u.org}, and the Respondent, ${opp.org}, entered into a Service Agreement dated 15 March 2025 ("the Agreement"). Clause 14.2 of the Agreement provides for resolution of disputes through arbitration.

2. DISPUTE

The Respondent has failed to fulfil its obligations under the Agreement, resulting in a dispute valued at ${disputeValue}. Despite repeated requests and correspondence, the Respondent has failed to remedy the breach or provide adequate compensation.

3. INVOCATION OF ARBITRATION

In view of the above, the Claimant hereby invokes the arbitration clause contained in Clause 14.2 of the Agreement and calls upon the Respondent to refer the disputes to arbitration in accordance with the Arbitration and Conciliation Act, 1996.

4. CLAIMS & RELIEF SOUGHT

The Claimant claims the following:

(a) A sum of ${disputeValue} towards the principal amount;
(b) Interest at 18% per annum from the date of cause of action till realization;
(c) Costs of arbitration proceedings;
(d) Such other and further relief as the learned Arbitrator may deem fit and proper.

5. PROPOSED ARBITRATOR

The Claimant proposes that the disputes be adjudicated by a sole Arbitrator. The Respondent is requested to agree on the appointment of an Arbitrator within 30 days of receipt of this notice, failing which the Claimant shall approach the Hon'ble Court under Section 11 of the Act.

6. SEAT & LANGUAGE

The seat of arbitration shall be New Delhi and the language of arbitration shall be English.

7. RESPONSE

The Respondent is called upon to file a response to this notice within 30 days of receipt, as required under the Act.

Yours faithfully,

${u.name}
${u.org}
Email: ${u.email} | Phone: ${u.phone}

Enclosures:
1. Copy of the Agreement dated 15 March 2025
2. Supporting documents and correspondence
3. Proof of breach / non-performance`,

    'annexures': () => `ANNEXURES TO ARBITRATION NOTICE
Case Reference: ${caseId}
Date: ${today}

INDEX OF ANNEXURES

Annexure A — Copy of Service Agreement dated 15 March 2025
Annexure B — Correspondence between parties (emails dated 10 June 2025, 15 August 2025, 1 November 2025)
Annexure C — Invoice(s) raised and unpaid — Invoice No. SL/2025/0142 dated 20 May 2025
Annexure D — Proof of delivery / performance of services
Annexure E — Legal notice dated 1 December 2025 and reply (if any)
Annexure F — Bank statements showing non-receipt of payment

────────────────────────────────────────

ANNEXURE A
SERVICE AGREEMENT

[Agreement between ${u.org} and ${opp.org} dated 15 March 2025 — containing arbitration clause at Clause 14.2]

────────────────────────────────────────

ANNEXURE B
CORRESPONDENCE

1. Email dated 10 June 2025 — First reminder for payment
2. Email dated 15 August 2025 — Second reminder with notice of breach
3. Email dated 1 November 2025 — Final demand before legal action

────────────────────────────────────────

ANNEXURE C
INVOICES

Invoice No: SL/2025/0142
Date: 20 May 2025
Amount: ${disputeValue}
Status: UNPAID
Due Date: 20 June 2025 (overdue by ${Math.floor((new Date() - new Date('2025-06-20')) / 86400000)} days)

────────────────────────────────────────

ANNEXURE D
PROOF OF PERFORMANCE

[Delivery receipts, completion certificates, or service reports evidencing that the Claimant fulfilled its obligations under the Agreement]

────────────────────────────────────────

ANNEXURE E
LEGAL NOTICE

Legal Notice dated 1 December 2025 sent via Registered Post (AD) to:
${opp.name}, ${opp.org}, ${opp.address}

[Copy of notice demanding payment within 15 days]

────────────────────────────────────────

ANNEXURE F
BANK STATEMENTS

[Relevant bank statements showing non-receipt of the claimed amount]`,

    'section-9': () => `IN THE HIGH COURT OF DELHI AT NEW DELHI

MISCELLANEOUS APPLICATION NO. _____ OF 2026
Under Section 9 of the Arbitration and Conciliation Act, 1996

${u.name} (${u.org})
${u.address}
                                                    ... APPLICANT/CLAIMANT

VERSUS

${opp.name} (${opp.org})
${opp.address}
                                                    ... RESPONDENT

APPLICATION FOR INTERIM MEASURES

Most Respectfully Showeth:

1. The Applicant is a party to arbitration proceedings in Case No. ${caseId}, having invoked arbitration under Section 21 of the Act.

2. TYPE OF MEASURE SOUGHT: Securing the disputed amount of ${disputeValue}

3. URGENCY

The Applicant has credible information that the Respondent is dissipating assets and transferring funds to related entities to defeat the eventual arbitral award. Unless urgent interim measures are granted, the award will be rendered infructuous.

4. FACTS SUPPORTING THE APPLICATION

(a) The Respondent owes ${disputeValue} under the Service Agreement;
(b) Despite the arbitration notice, the Respondent has not responded;
(c) The Respondent has recently transferred significant assets;
(d) There is imminent risk of the Respondent becoming judgment-proof.

5. The Applicant submits that unless the interim measure is granted, the Applicant will suffer irreparable loss and the final award will be rendered infructuous.

6. The Applicant undertakes to commence/continue arbitration proceedings as required under Section 9(2) of the Act.

PRAYER

It is most respectfully prayed that this Hon'ble Court may be pleased to:

(a) Direct the Respondent to furnish security for ${disputeValue};
(b) Restrain the Respondent from alienating or encumbering its assets;
(c) Pass such other order(s) as this Hon'ble Court may deem fit.

Filed by:
${u.name} | ${u.org}
Date: ${today}`,

    'section-11': () => `IN THE HIGH COURT OF DELHI AT NEW DELHI

ARBITRATION PETITION NO. _____ OF 2026
Under Section 11(6) of the Arbitration and Conciliation Act, 1996

${u.name} (${u.org})
${u.address}
                                                    ... PETITIONER

VERSUS

${opp.name} (${opp.org})
${opp.address}
                                                    ... RESPONDENT

APPLICATION FOR APPOINTMENT OF ARBITRATOR

Most Respectfully Showeth:

1. The Petitioner and the Respondent entered into a Service Agreement dated 15 March 2025 containing an arbitration clause (Clause 14.2).

2. Disputes having arisen, the Petitioner issued an Arbitration Notice under Section 21 on ${caseData?.filed || today}.

3. FAILURE OF APPOINTMENT:

The Respondent has failed to respond to the Arbitration Notice within the statutory period of 30 days. Despite two reminders sent on [Reminder 1 Date] and [Reminder 2 Date], the Respondent has neither agreed to the appointment of an arbitrator nor proposed an alternative.

4. Despite the lapse of 30 days, the parties have been unable to agree on an arbitrator. The Petitioner approaches this Hon'ble Court under Section 11(6) of the Act.

5. The dispute value is ${disputeValue}.

6. The Petitioner proposes that this Hon'ble Court may appoint a sole Arbitrator with expertise in commercial disputes.

PRAYER

(a) Appoint a sole Arbitrator to adjudicate the disputes between the parties;
(b) Direct that the arbitration be conducted in New Delhi in English;
(c) Pass such other order(s) as deemed fit and proper.

Filed by:
${u.name} | ${u.org}
Date: ${today}`,
  };

  return docs[docType] ? docs[docType]() : '[Document content will be generated here]';
}

// ===== DOCUMENT WORKFLOW COMPONENT =====
function DocumentWorkflow({ caseData, role, showToast }) {
  const [docStates, setDocStates] = React.useState({
    'section-21-notice': { status: 'ready', content: null, finalized: false },
    'annexures': { status: 'locked', content: null, finalized: false },
    'section-9': { status: 'locked', content: null, finalized: false },
    'section-11': { status: 'locked', content: null, finalized: false },
  });
  const [activeDoc, setActiveDoc] = React.useState(null);
  const [showReminders, setShowReminders] = React.useState(false);
  const [showArbPicker, setShowArbPicker] = React.useState(false);
  const [selectedArbitrator, setSelectedArbitrator] = React.useState(null);

  const handleArbSelect = (arb) => {
    setSelectedArbitrator(arb);
    setShowArbPicker(false);
    if (showToast) showToast(`Arbitrator proposed: ${arb.name}`);
  };

  const WORKFLOW_DOCS = [
    { id: 'section-21-notice', name: 'Section 21 — Arbitration Notice', desc: 'Formal notice invoking arbitration clause. Must be sent first.', mandatory: true, icon: '📨' },
    { id: 'annexures', name: 'Annexures & Supporting Documents', desc: 'Index of exhibits — agreement, invoices, correspondence, proof.', mandatory: true, icon: '📎' },
    { id: 'section-9', name: 'Section 9 — Interim Measures (Court)', desc: 'Application for urgent interim relief if assets at risk. Optional.', mandatory: false, icon: '⚡' },
    { id: 'section-11', name: 'Section 11 — Appointment of Arbitrator', desc: 'Court application if respondent doesn\'t agree on arbitrator within 30 days.', mandatory: false, icon: '⚖️' },
  ];

  const handleGenerate = (docId) => {
    const content = generateFullDocument(docId, caseData, role);
    setDocStates(prev => ({ ...prev, [docId]: { ...prev[docId], status: 'generated', content } }));
    setActiveDoc(docId);
  };

  const handleFinalize = (docId) => {
    setDocStates(prev => {
      const updated = { ...prev, [docId]: { ...prev[docId], status: 'finalized', finalized: true } };
      // Unlock next docs when section-21 is finalized
      if (docId === 'section-21-notice') {
        updated['annexures'] = { ...updated['annexures'], status: 'ready' };
        updated['section-9'] = { ...updated['section-9'], status: 'ready' };
        updated['section-11'] = { ...updated['section-11'], status: 'ready' };
      }
      return updated;
    });
    if (docId === 'section-21-notice') setShowReminders(true);
    if (showToast) showToast(`${WORKFLOW_DOCS.find(d => d.id === docId).name} finalized!`);
  };

  const handleUpdateContent = (docId, newContent) => {
    setDocStates(prev => ({ ...prev, [docId]: { ...prev[docId], content: newContent } }));
  };

  // If viewing a document, show PDF preview
  if (activeDoc) {
    return React.createElement(PDFPreview, {
      docId: activeDoc,
      docName: WORKFLOW_DOCS.find(d => d.id === activeDoc).name,
      content: docStates[activeDoc].content,
      finalized: docStates[activeDoc].finalized,
      onBack: () => setActiveDoc(null),
      onFinalize: () => handleFinalize(activeDoc),
      onUpdateContent: (c) => handleUpdateContent(activeDoc, c),
      caseData, role, showToast
    });
  }

  // If showing reminders after notice finalized
  if (showReminders && docStates['section-21-notice'].finalized) {
    return React.createElement(ReminderSystem, {
      caseData, role, showToast,
      onBack: () => setShowReminders(false)
    });
  }

  // Main checklist view
  return (
    React.createElement('div', null,
      React.createElement('div', { style: { marginBottom: 16, padding: 16, background: '#f0fff4', border: '1px solid #c6f6d5', borderRadius: 'var(--radius)' } },
        React.createElement('div', { style: { fontWeight: 600, color: '#276749', marginBottom: 4 } }, '📋 Post-Filing Document Workflow'),
        React.createElement('div', { style: { fontSize: '0.85rem', color: 'var(--text-light)' } }, 'Complete these documents in sequence. Section 21 Notice must be finalized first to unlock remaining documents.')
      ),
      WORKFLOW_DOCS.map(doc => {
        const state = docStates[doc.id];
        const isLocked = state.status === 'locked';
        const isFinalized = state.finalized;
        return React.createElement('div', {
          key: doc.id,
          className: 'doc-item',
          style: { padding: 14, marginBottom: 8, border: '1px solid var(--border)', borderRadius: 'var(--radius)', opacity: isLocked ? 0.5 : 1, cursor: isLocked ? 'not-allowed' : 'pointer', background: isFinalized ? '#f0fff4' : 'white' }
        },
          React.createElement('div', { className: 'doc-icon', style: { fontSize: '1.5rem' } }, doc.icon),
          React.createElement('div', { className: 'doc-info', style: { flex: 1 } },
            React.createElement('div', { className: 'doc-name', style: { fontWeight: 600 } }, doc.name,
              !doc.mandatory && React.createElement('span', { style: { fontSize: '0.75rem', color: 'var(--text-light)', marginLeft: 8 } }, '(Optional)')
            ),
            React.createElement('div', { className: 'doc-meta' }, doc.desc)
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
            isFinalized && React.createElement('span', { className: 'badge badge-active', style: { background: '#c6f6d5', color: '#276749' } }, '✓ Finalized'),
            state.status === 'generated' && React.createElement('span', { className: 'badge', style: { background: '#fefcbf', color: '#975a16' } }, 'Draft Ready'),
            isLocked && React.createElement('span', { style: { fontSize: '0.8rem', color: 'var(--text-light)' } }, '🔒 Locked'),
            !isLocked && !isFinalized && React.createElement('button', {
              className: 'btn btn-primary btn-sm',
              onClick: () => state.content ? setActiveDoc(doc.id) : handleGenerate(doc.id)
            }, state.content ? '📄 View Draft' : '🤖 Generate with AI'),
            isFinalized && React.createElement('button', {
              className: 'btn btn-outline btn-sm',
              onClick: () => setActiveDoc(doc.id)
            }, '👁 View')
          )
        );
      }),
      docStates['section-21-notice'].finalized && !showArbPicker && React.createElement('div', {
        style: { marginTop: 12, padding: 14, border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: selectedArbitrator ? '#f0fff4' : '#fffaf0' }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontWeight: 600 } }, '⚖️ Propose Arbitrator'),
            React.createElement('div', { style: { fontSize: '0.83rem', color: 'var(--text-light)' } }, selectedArbitrator ? `Selected: ${selectedArbitrator.name}` : 'Select an arbitrator to include in your notice')
          ),
          React.createElement('button', { className: 'btn btn-sm ' + (selectedArbitrator ? 'btn-outline' : 'btn-primary'), onClick: () => setShowArbPicker(true) }, selectedArbitrator ? 'Change' : 'Select Arbitrator')
        )
      ),
      showArbPicker && React.createElement('div', { style: { marginTop: 12 } },
        React.createElement(ArbitratorPicker, { onSelect: handleArbSelect, onClose: () => setShowArbPicker(false), caseType: caseData.type })
      ),
      docStates['section-21-notice'].finalized && React.createElement('div', {
        style: { marginTop: 16, padding: 16, background: '#ebf8ff', border: '1px solid #bee3f8', borderRadius: 'var(--radius)', cursor: 'pointer' },
        onClick: () => setShowReminders(true)
      },
        React.createElement('div', { style: { fontWeight: 600, color: '#2b6cb0' } }, '📬 Send Notice & Manage Reminders'),
        React.createElement('div', { style: { fontSize: '0.85rem', color: 'var(--text-light)', marginTop: 4 } }, 'Send the finalized notice to respondent. 2 automated reminders will be sent before the 30-day deadline.')
      )
    )
  );
}

// ===== PDF PREVIEW WITH ITERATION =====
function PDFPreview({ docId, docName, content, finalized, onBack, onFinalize, onUpdateContent, caseData, role, showToast }) {
  const [refineInput, setRefineInput] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState([
    { from: 'ai', text: `📄 Here's your AI-generated draft for "${docName}". Review it and ask me to make changes using the prompt below.` }
  ]);
  const [generating, setGenerating] = React.useState(false);
  const chatEndRef = React.useRef(null);

  React.useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatHistory]);

  const handleRefine = () => {
    if (!refineInput.trim() || generating) return;
    const instruction = refineInput.trim();
    setChatHistory(prev => [...prev, { from: 'user', text: instruction }]);
    setRefineInput('');
    setGenerating(true);

    setTimeout(() => {
      let refined = content;
      if (instruction.toLowerCase().includes('formal') || instruction.toLowerCase().includes('tone')) {
        refined = content.replace('Dear Sir/Madam,', 'Dear Sir/Madam,\n\nWith due respect and without prejudice to the rights and contentions of the Claimant,');
        setChatHistory(prev => [...prev, { from: 'ai', text: '✅ Made the tone more formal with standard legal courtesy language.' }]);
      } else if (instruction.toLowerCase().includes('interest') || instruction.toLowerCase().includes('rate')) {
        refined = content.replace('18%', '24%');
        setChatHistory(prev => [...prev, { from: 'ai', text: '✅ Updated the interest rate to 24% p.a. Verify this aligns with your agreement.' }]);
      } else if (instruction.toLowerCase().includes('deadline') || instruction.toLowerCase().includes('days')) {
        refined = content.replace('30 days', '15 days');
        setChatHistory(prev => [...prev, { from: 'ai', text: '✅ Changed response deadline to 15 days. Note: statutory minimum under the Act is typically 30 days.' }]);
      } else if (instruction.toLowerCase().includes('remove') || instruction.toLowerCase().includes('delete')) {
        setChatHistory(prev => [...prev, { from: 'ai', text: '✅ Removed the requested section. Review the updated document.' }]);
      } else if (instruction.toLowerCase().includes('add') || instruction.toLowerCase().includes('include')) {
        refined = content + '\n\nADDITIONAL CLAUSE:\n' + instruction.replace(/^(add|include)\s*/i, '');
        setChatHistory(prev => [...prev, { from: 'ai', text: '✅ Added the clause at the end. You can ask me to move it to a specific section.' }]);
      } else {
        refined = content.replace(/\n\nEnclosures:/, `\n\n[${instruction}]\n\nEnclosures:`).replace(/\nFiled by:/, `\n[${instruction}]\n\nFiled by:`);
        setChatHistory(prev => [...prev, { from: 'ai', text: `✅ Incorporated: "${instruction}". Review the updated draft.` }]);
      }
      onUpdateContent(refined);
      setGenerating(false);
    }, 1200);
  };

  return (
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', height: '100%' } },
      // Top bar
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
        React.createElement('button', { className: 'btn btn-outline btn-sm', onClick: onBack }, '← Back to Workflow'),
        React.createElement('div', { style: { fontWeight: 600 } }, '📄 ', docName),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          !finalized && React.createElement('button', { className: 'btn btn-primary btn-sm', onClick: onFinalize }, '✓ Finalize Document'),
          React.createElement('button', { className: 'btn btn-outline btn-sm', onClick: () => { if (showToast) showToast('PDF downloaded!'); } }, '📥 Download PDF')
        )
      ),
      // Main content: PDF + Chat side by side
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 350px', gap: 16, flex: 1, minHeight: 0 } },
        // PDF rendered view
        React.createElement('div', { style: { border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'white', overflow: 'auto', padding: 40, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', fontFamily: "'Times New Roman', serif", fontSize: '0.9rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', maxHeight: 'calc(100vh - 280px)' } },
          React.createElement('div', { style: { textAlign: 'center', marginBottom: 8, fontSize: '0.75rem', color: '#999', fontFamily: 'sans-serif' } }, '— PDF Preview —'),
          content
        ),
        // Chat panel for iteration
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: '#fafafa', maxHeight: 'calc(100vh - 280px)' } },
          React.createElement('div', { style: { padding: '10px 14px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem' } }, '🤖 Refine with AI'),
          React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: 12 } },
            chatHistory.map((msg, i) =>
              React.createElement('div', { key: i, style: { marginBottom: 10, display: 'flex', gap: 8 } },
                React.createElement('span', null, msg.from === 'ai' ? '🤖' : '👤'),
                React.createElement('div', { style: { background: msg.from === 'ai' ? 'white' : '#ebf8ff', padding: '8px 12px', borderRadius: 8, fontSize: '0.83rem', maxWidth: '90%' } }, msg.text)
              )
            ),
            generating && React.createElement('div', { style: { marginBottom: 10, display: 'flex', gap: 8 } },
              React.createElement('span', null, '🤖'),
              React.createElement('div', { style: { background: 'white', padding: '8px 12px', borderRadius: 8, fontSize: '0.83rem' } }, 'Updating...')
            ),
            React.createElement('div', { ref: chatEndRef })
          ),
          !finalized && React.createElement('div', { style: { padding: 10, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 } },
            React.createElement('input', {
              value: refineInput,
              onChange: (e) => setRefineInput(e.target.value),
              onKeyDown: (e) => e.key === 'Enter' && handleRefine(),
              placeholder: 'e.g., "Make tone more formal"',
              style: { flex: 1, padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '0.83rem' },
              disabled: generating
            }),
            React.createElement('button', { className: 'btn btn-primary btn-sm', onClick: handleRefine, disabled: !refineInput.trim() || generating }, 'Send')
          ),
          finalized && React.createElement('div', { style: { padding: 12, textAlign: 'center', color: '#276749', fontSize: '0.83rem' } }, '✓ Document finalized — no further edits')
        )
      )
    )
  );
}

// ===== REMINDER SYSTEM =====
function ReminderSystem({ caseData, role, showToast, onBack }) {
  const opp = MOCK.users.respondent;
  const [noticeSent, setNoticeSent] = React.useState(false);
  const [reminders, setReminders] = React.useState([
    { id: 1, label: 'Reminder 1 — Day 10', scheduledFor: '10 days after notice', status: 'scheduled', sentAt: null },
    { id: 2, label: 'Reminder 2 — Day 20', scheduledFor: '20 days after notice', status: 'scheduled', sentAt: null },
  ]);
  const [sending, setSending] = React.useState(false);

  const handleSendNotice = (method) => {
    setSending(true);
    setTimeout(() => {
      setNoticeSent(true);
      setSending(false);
      const now = new Date();
      const r1Date = new Date(now.getTime() + 10 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      const r2Date = new Date(now.getTime() + 20 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      setReminders([
        { id: 1, label: 'Reminder 1', scheduledFor: r1Date, status: 'scheduled', sentAt: null },
        { id: 2, label: 'Reminder 2', scheduledFor: r2Date, status: 'scheduled', sentAt: null },
      ]);
      if (showToast) showToast(`Notice sent to ${opp.name} via ${method}! 2 reminders auto-scheduled.`);
    }, 1500);
  };

  const handleSimulateReminder = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, status: 'sent', sentAt: new Date().toLocaleString('en-IN') } : r));
    if (showToast) showToast(`Reminder ${id} sent to ${opp.name}`);
  };

  const deadlineDate = new Date(Date.now() + 30 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    React.createElement('div', null,
      React.createElement('button', { className: 'btn btn-outline btn-sm', onClick: onBack, style: { marginBottom: 12 } }, '← Back to Workflow'),
      React.createElement('div', { style: { padding: 20, border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'white' } },
        React.createElement('h3', { style: { marginBottom: 4 } }, '📬 Notice Delivery & Reminder System'),
        React.createElement('p', { style: { fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: 20 } },
          'Send the Section 21 Notice to the respondent. The system will automatically send 2 reminders before the 30-day response deadline.'
        ),

        // Respondent info
        React.createElement('div', { style: { background: '#f7fafc', padding: 14, borderRadius: 'var(--radius)', marginBottom: 20 } },
          React.createElement('div', { style: { fontWeight: 600, marginBottom: 6 } }, 'Respondent Details'),
          React.createElement('div', { style: { fontSize: '0.85rem' } }, `${opp.name} — ${opp.org}`),
          React.createElement('div', { style: { fontSize: '0.85rem', color: 'var(--text-light)' } }, `📧 ${opp.email} | 📱 ${opp.phone}`),
          React.createElement('div', { style: { fontSize: '0.85rem', color: 'var(--text-light)' } }, `📍 ${opp.address}`)
        ),

        // Send notice buttons
        !noticeSent && React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('div', { style: { fontWeight: 600, marginBottom: 8 } }, 'Send Notice via:'),
          React.createElement('div', { style: { display: 'flex', gap: 10 } },
            React.createElement('button', { className: 'btn btn-primary', onClick: () => handleSendNotice('Email + SMS'), disabled: sending }, sending ? '⏳ Sending...' : '📧 Email + SMS'),
            React.createElement('button', { className: 'btn btn-outline', onClick: () => handleSendNotice('WhatsApp'), disabled: sending }, '💬 WhatsApp'),
            React.createElement('button', { className: 'btn btn-outline', onClick: () => handleSendNotice('Registered Post'), disabled: sending }, '📮 Registered Post')
          )
        ),

        // After notice sent — show timeline
        noticeSent && React.createElement('div', null,
          React.createElement('div', { style: { background: '#f0fff4', padding: 12, borderRadius: 'var(--radius)', marginBottom: 16 } },
            React.createElement('span', { style: { color: '#276749', fontWeight: 600 } }, '✅ Notice sent successfully!'),
            React.createElement('span', { style: { fontSize: '0.83rem', color: 'var(--text-light)', marginLeft: 8 } }, new Date().toLocaleString('en-IN'))
          ),

          // Deadline bar
          React.createElement('div', { style: { background: '#fff5f5', padding: 12, borderRadius: 'var(--radius)', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontWeight: 600, color: '#c53030', fontSize: '0.9rem' } }, '⏰ 30-Day Response Deadline'),
              React.createElement('div', { style: { fontSize: '0.83rem', color: 'var(--text-light)' } }, `Respondent must reply by: ${deadlineDate}`)
            ),
            React.createElement('div', { style: { fontWeight: 700, color: '#c53030', fontSize: '1.2rem' } }, '30 days')
          ),

          // Reminder timeline
          React.createElement('div', { style: { fontWeight: 600, marginBottom: 10 } }, '🔔 Automated Reminders'),
          reminders.map(r =>
            React.createElement('div', { key: r.id, style: { display: 'flex', alignItems: 'center', gap: 12, padding: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius)', marginBottom: 8, background: r.status === 'sent' ? '#f0fff4' : 'white' } },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: '50%', background: r.status === 'sent' ? '#c6f6d5' : '#fefcbf', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, r.status === 'sent' ? '✓' : '🔔'),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontWeight: 600, fontSize: '0.88rem' } }, r.label),
                React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-light)' } },
                  r.status === 'sent' ? `Sent: ${r.sentAt}` : `Scheduled: ${r.scheduledFor}`
                )
              ),
              r.status === 'scheduled' && React.createElement('button', {
                className: 'btn btn-outline btn-sm',
                onClick: () => handleSimulateReminder(r.id)
              }, '⚡ Simulate Send')
            )
          ),

          // Section 11 trigger note
          React.createElement('div', { style: { marginTop: 16, padding: 12, background: '#ebf8ff', borderRadius: 'var(--radius)', fontSize: '0.83rem', color: '#2b6cb0' } },
            React.createElement('strong', null, '💡 What happens next: '),
            'If the respondent does not reply within 30 days, you can file a Section 11 Application for court-appointed arbitrator. Go back to the workflow to generate it.'
          )
        )
      )
    )
  );
}
