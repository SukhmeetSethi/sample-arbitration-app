// ===== SECTION 11 TRIGGER (Claimant Side) =====
// When 30 days pass without respondent reply, claimant can petition court for arbitrator appointment

function Section11Trigger({ caseData, role, showToast }) {
  const [showPetition, setShowPetition] = React.useState(false);
  const [petitionContent, setPetitionContent] = React.useState(null);
  const [filed, setFiled] = React.useState(false);

  // Simulate: notice was served on filing date, 30 days have passed
  const noticeDate = new Date(caseData.filed);
  const deadlineDate = new Date(noticeDate.getTime() + 30 * 86400000);
  const today = new Date();
  const daysElapsed = Math.floor((today - noticeDate) / 86400000);
  const isExpired = daysElapsed >= 30 || caseData.stage === 'Awaiting Respondent Reply'; // For demo, treat "Awaiting" cases as expired

  if (!isExpired || role !== 'claimant' || caseData.responseReceived) return null;

  const handleGeneratePetition = () => {
    const content = generateFullDocument('section-11', caseData, role);
    setPetitionContent(content);
    setShowPetition(true);
  };

  const handleFile = () => {
    setFiled(true);
    if (showToast) showToast('Section 11 Petition filed with the High Court! Tracking enabled.');
  };

  if (filed) {
    return React.createElement('div', { style: { background: '#f0fff4', border: '1px solid #c6f6d5', borderRadius: 'var(--radius)', padding: 16, marginBottom: 16 } },
      React.createElement('div', { style: { fontWeight: 600, color: '#276749', marginBottom: 4 } }, '✅ Section 11 Petition Filed'),
      React.createElement('div', { style: { fontSize: '0.85rem', color: 'var(--text-light)' } }, 'Your petition for appointment of arbitrator has been filed with the High Court. You will be notified when the court lists the matter.')
    );
  }

  if (showPetition) {
    return React.createElement('div', { style: { marginBottom: 16 } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
        React.createElement('h4', { style: { margin: 0 } }, '⚖️ Section 11 — Petition for Appointment of Arbitrator'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement('button', { className: 'btn btn-primary btn-sm', onClick: handleFile }, '📤 File with Court'),
          React.createElement('button', { className: 'btn btn-outline btn-sm', onClick: () => setShowPetition(false) }, 'Back')
        )
      ),
      React.createElement('div', { style: { border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'white', padding: 32, fontFamily: "'Times New Roman', serif", fontSize: '0.88rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', maxHeight: 400, overflow: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' } },
        petitionContent
      )
    );
  }

  return React.createElement('div', { style: { background: '#fff5f5', border: '1px solid #fed7d7', borderRadius: 'var(--radius)', padding: 16, marginBottom: 16 } },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontWeight: 600, color: '#c53030', marginBottom: 4 } }, '⚠️ 30-Day Deadline Expired — No Response from Respondent'),
        React.createElement('div', { style: { fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: 4 } },
          `Notice served: ${noticeDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · Deadline: ${deadlineDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · Days elapsed: ${daysElapsed}`
        ),
        React.createElement('div', { style: { fontSize: '0.85rem', color: 'var(--text-light)' } },
          'Under Section 11(6) of the A&C Act, you may now petition the High Court / Supreme Court to appoint an arbitrator.'
        )
      ),
      React.createElement('button', { className: 'btn btn-primary', onClick: handleGeneratePetition }, '⚖️ Generate Section 11 Petition')
    )
  );
}

// ===== RESPONDENT NOTICE VIEW =====
// Shows the received Section 21 notice with deadline countdown and response options

function RespondentNoticeView({ caseData, role, showToast, onOpenDrafter }) {
  const [view, setView] = React.useState('notice'); // notice | reply
  const claimant = MOCK.users.claimant;
  const respondent = MOCK.users.respondent;

  // Calculate deadline
  const noticeDate = new Date(caseData.filed);
  const deadlineDate = new Date(noticeDate.getTime() + 30 * 86400000);
  const today = new Date();
  const daysRemaining = Math.max(0, Math.ceil((deadlineDate - today) / 86400000));
  const urgency = daysRemaining <= 7 ? 'critical' : daysRemaining <= 15 ? 'warning' : 'normal';

  // Generate the notice content that was "received"
  const noticeContent = `ARBITRATION NOTICE
Under Section 21 of the Arbitration and Conciliation Act, 1996

Date: ${noticeDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
Case Reference: ${caseData.id}

To,
${respondent.name}
${respondent.org}
${respondent.address}

From,
${claimant.name}
${claimant.org}
${claimant.address}

Subject: Notice invoking Arbitration under Clause 14.2 of the Service Agreement dated 15 March 2025

Dear Sir/Madam,

1. REFERENCE & BACKGROUND

The Claimant, ${claimant.org}, and the Respondent, ${respondent.org}, entered into a Service Agreement dated 15 March 2025 ("the Agreement"). Clause 14.2 of the Agreement provides for resolution of disputes through arbitration.

2. DISPUTE

The Respondent has failed to fulfil its obligations under the Agreement, resulting in a dispute valued at ${caseData.value}. Despite repeated requests and correspondence, the Respondent has failed to remedy the breach or provide adequate compensation.

3. INVOCATION OF ARBITRATION

In view of the above, the Claimant hereby invokes the arbitration clause contained in Clause 14.2 of the Agreement and calls upon the Respondent to refer the disputes to arbitration in accordance with the Arbitration and Conciliation Act, 1996.

4. CLAIMS & RELIEF SOUGHT

(a) A sum of ${caseData.value} towards the principal amount;
(b) Interest at 18% per annum from the date of cause of action till realization;
(c) Costs of arbitration proceedings;
(d) Such other and further relief as the learned Arbitrator may deem fit.

5. PROPOSED ARBITRATOR

The Claimant proposes that the disputes be adjudicated by a sole Arbitrator. The Respondent is requested to agree on the appointment of an Arbitrator within 30 days of receipt of this notice, failing which the Claimant shall approach the Hon'ble Court under Section 11 of the Act.

6. SEAT & LANGUAGE

Seat: New Delhi | Language: English

7. RESPONSE

The Respondent is called upon to file a response within 30 days of receipt.

${claimant.name}
${claimant.org}`;

  if (view === 'reply') {
    return React.createElement(RespondentReplyWorkflow, { caseData, role, showToast, onBack: () => setView('notice'), onOpenDrafter });
  }

  const urgencyColors = { critical: { bg: '#fff5f5', border: '#fed7d7', text: '#c53030' }, warning: { bg: '#fffaf0', border: '#feebc8', text: '#c05621' }, normal: { bg: '#ebf8ff', border: '#bee3f8', text: '#2b6cb0' } };
  const uc = urgencyColors[urgency];

  return React.createElement('div', null,
    // Deadline banner
    React.createElement('div', { style: { background: uc.bg, border: `1px solid ${uc.border}`, borderRadius: 'var(--radius)', padding: 16, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontWeight: 600, color: uc.text, fontSize: '1rem' } },
          urgency === 'critical' ? '🚨 URGENT: Response Deadline Approaching!' : urgency === 'warning' ? '⚠️ Response Deadline in ' + daysRemaining + ' days' : '📋 Arbitration Notice Received'
        ),
        React.createElement('div', { style: { fontSize: '0.85rem', color: 'var(--text-light)', marginTop: 4 } },
          `Notice received: ${noticeDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · Response due by: ${deadlineDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`
        ),
        React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-light)', marginTop: 2 } },
          '⚖️ Under Section 21 of the Arbitration & Conciliation Act, 1996, you must respond within 30 days or the claimant may approach the court under Section 11 for arbitrator appointment.'
        )
      ),
      React.createElement('div', { style: { textAlign: 'center', minWidth: 80 } },
        React.createElement('div', { style: { fontSize: '2rem', fontWeight: 700, color: uc.text } }, daysRemaining),
        React.createElement('div', { style: { fontSize: '0.75rem', color: uc.text } }, 'days left')
      )
    ),

    // Notice PDF view
    React.createElement('div', { style: { marginBottom: 16 } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
        React.createElement('h4', { style: { margin: 0 } }, '📄 Section 21 — Arbitration Notice'),
        React.createElement('button', { className: 'btn btn-outline btn-sm', onClick: () => { if (showToast) showToast('Notice PDF downloaded'); } }, '📥 Download PDF')
      ),
      React.createElement('div', { style: { border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'white', padding: 32, fontFamily: "'Times New Roman', serif", fontSize: '0.85rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', maxHeight: 350, overflow: 'auto', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' } },
        noticeContent
      )
    ),

    // Response options
    React.createElement('div', { style: { background: '#f7fafc', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16 } },
      React.createElement('div', { style: { fontWeight: 600, marginBottom: 12 } }, '📝 Your Response Options'),
      React.createElement('div', { style: { fontSize: '0.83rem', color: 'var(--text-light)', marginBottom: 12 } }, 'Choose how you want to respond. The AI will help you draft the appropriate document.'),
      React.createElement('button', { className: 'btn btn-primary', onClick: () => setView('reply'), style: { width: '100%' } }, '📝 Respond to Notice')
    )
  );
}

// ===== RESPONDENT REPLY WORKFLOW =====
// Guided flow: (a) Accept & propose arbitrator, (b) File defence, (c) Challenge jurisdiction

function RespondentReplyWorkflow({ caseData, role, showToast, onBack, onOpenDrafter }) {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [step, setStep] = React.useState('choose'); // choose | pickArb | draft | submitted
  const [draftContent, setDraftContent] = React.useState('');
  const [refineInput, setRefineInput] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState([]);
  const [generating, setGenerating] = React.useState(false);
  const [pickedArbitrator, setPickedArbitrator] = React.useState(null);
  const chatEndRef = React.useRef(null);

  const respondent = MOCK.users.respondent;
  const claimant = MOCK.users.claimant;
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const OPTIONS = [
    { id: 'accept', icon: '🤝', title: 'Accept Arbitration & Propose Arbitrator', desc: 'You agree to resolve the dispute via arbitration. You can propose an arbitrator or agree to the claimant\'s proposal.', legal: 'Section 11 — Appointment of Arbitrator', recommended: true },
    { id: 'defence', icon: '🛡️', title: 'File Statement of Defence', desc: 'Respond to the claims on merits. Deny allegations, present your version of facts, and optionally file a counterclaim.', legal: 'Section 23 — Statement of Defence' },
    { id: 'jurisdiction', icon: '⚠️', title: 'Challenge Jurisdiction', desc: 'Object that the arbitral tribunal has no jurisdiction — e.g., no valid arbitration clause, dispute not arbitrable, wrong parties.', legal: 'Section 16 — Competence of Tribunal' },
  ];

  const generateReply = (optionId) => {
    setSelectedOption(optionId);
    if (optionId === 'accept') { setStep('pickArb'); return; }
    setGenerating(true);
    setStep('draft');

    setTimeout(() => {
      let content = '';
      if (optionId === 'accept') {
        const arbName = pickedArbitrator ? pickedArbitrator.name : 'To be mutually agreed';
        const arbDetails = pickedArbitrator ? (pickedArbitrator.type === 'system' ? `Name: ${pickedArbitrator.name}\nQualifications: ${pickedArbitrator.title}\nExpertise: ${pickedArbitrator.domain ? pickedArbitrator.domain.join(', ') : pickedArbitrator.expertise}\nExperience: ${pickedArbitrator.experience} years` : `Name: ${pickedArbitrator.name}\nDesignation: ${pickedArbitrator.designation}\nBar Council ID: ${pickedArbitrator.barCouncilId}\nExpertise: ${pickedArbitrator.expertise}\nExperience: ${pickedArbitrator.experience} years`) : 'To be mutually agreed upon by the parties';
        content = `RESPONSE TO ARBITRATION NOTICE
(Acceptance of Arbitration & Proposal for Arbitrator)

Date: ${today}
Case Reference: ${caseData.id}

To,
${claimant.name}
${claimant.org}
${claimant.address}

From,
${respondent.name}
${respondent.org}
${respondent.address}

Subject: Response to Arbitration Notice dated ${new Date(caseData.filed).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

Dear Sir/Madam,

1. We acknowledge receipt of your Arbitration Notice dated ${new Date(caseData.filed).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} invoking arbitration under Clause 14.2 of the Service Agreement dated 15 March 2025.

2. ACCEPTANCE OF ARBITRATION

Without prejudice to our rights and contentions on merits, we agree to resolve the disputes through arbitration as provided in the Agreement.

3. PROPOSED ARBITRATOR

We propose the following arbitrator for adjudication of the disputes:

${arbDetails}

Alternatively, we are agreeable to the appointment of a sole arbitrator by mutual consent or by the ${caseData.institution || 'Delhi International Arbitration Centre (DIAC)'}.

4. SEAT & LANGUAGE

We agree to the seat of arbitration at New Delhi and proceedings in English.

5. RESERVATION OF RIGHTS

We reserve our right to file a detailed Statement of Defence on merits at the appropriate stage of the proceedings.

${respondent.name}
${respondent.org}
Date: ${today}`;
      } else if (optionId === 'defence') {
        content = `BEFORE THE ARBITRAL TRIBUNAL
Case No.: ${caseData.id}

STATEMENT OF DEFENCE
Under Section 23 of the Arbitration and Conciliation Act, 1996

${claimant.name} (${claimant.org})                    ... CLAIMANT

VERSUS

${respondent.name} (${respondent.org})                ... RESPONDENT

The Respondent respectfully submits as follows:

1. PRELIMINARY

The Respondent received the Arbitration Notice dated ${new Date(caseData.filed).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} and files this Statement of Defence within the prescribed time.

2. BRIEF FACTS

The Respondent admits entering into the Service Agreement dated 15 March 2025 with the Claimant. However, the Respondent denies the allegations of breach as stated in the Notice.

3. DEFENCE ON MERITS

(a) The Claimant has failed to perform its own obligations under the Agreement;
(b) The alleged non-performance by the Respondent was caused by force majeure / the Claimant's own default;
(c) The claim of ${caseData.value} is grossly exaggerated and not supported by evidence;
(d) The Claimant has not mitigated its losses as required under law.

4. COUNTERCLAIM (Section 23(2A))

The Respondent files the following counterclaim:
(a) The Claimant owes ₹15,00,000 towards services rendered but unpaid;
(b) Damages of ₹10,00,000 for wrongful termination of the Agreement.

5. ARBITRATOR

The Respondent has no objection to the constitution of the Tribunal as proposed, subject to disclosure under Section 12.

PRAYER

(a) Dismiss the Claimant's claims in their entirety;
(b) Allow the Respondent's counterclaim;
(c) Award costs in favour of the Respondent.

${respondent.name}
${respondent.org}
Date: ${today}`;
      } else {
        content = `BEFORE THE ARBITRAL TRIBUNAL
Case No.: ${caseData.id}

PLEA REGARDING JURISDICTION
Under Section 16 of the Arbitration and Conciliation Act, 1996

${claimant.name} (${claimant.org})                    ... CLAIMANT

VERSUS

${respondent.name} (${respondent.org})                ... RESPONDENT

The Respondent raises the following plea regarding jurisdiction:

1. OBJECTION

The Respondent objects to the jurisdiction of the Arbitral Tribunal on the ground that no valid arbitration agreement exists between the parties within the meaning of Section 7 of the Act.

2. GROUNDS

(a) The Agreement dated 15 March 2025 was executed under coercion / undue influence and is voidable;
(b) Clause 14.2 does not constitute a valid arbitration agreement as it lacks the essential elements required under Section 7;
(c) The disputes raised by the Claimant do not arise "in connection with" the Agreement and are therefore not covered by the arbitration clause;
(d) The claim is barred by limitation under the Limitation Act, 1963.

3. LEGAL BASIS

Section 16(1) provides that the arbitral tribunal may rule on its own jurisdiction, including objections with respect to the existence or validity of the arbitration agreement.

Section 7 requires that an arbitration agreement must be in writing and must evidence an intention to submit disputes to arbitration.

4. This plea is raised prior to the submission of the Statement of Defence, as required under Section 16(2) of the Act.

PRAYER

(a) Rule that the Tribunal does not have jurisdiction;
(b) Terminate the arbitration proceedings;
(c) In the alternative, refer the parties to the appropriate civil court.

${respondent.name}
${respondent.org}
Date: ${today}`;
      }

      setDraftContent(content);
      setChatHistory([{ from: 'ai', text: `📄 Your ${OPTIONS.find(o => o.id === optionId).title} has been drafted. Review it and ask me to make changes.` }]);
      setGenerating(false);
    }, 1500);
  };

  const handleRefine = () => {
    if (!refineInput.trim() || generating) return;
    const instruction = refineInput.trim();
    setChatHistory(prev => [...prev, { from: 'user', text: instruction }]);
    setRefineInput('');
    setGenerating(true);

    setTimeout(() => {
      let refined = draftContent;
      if (instruction.toLowerCase().includes('counterclaim') || instruction.toLowerCase().includes('counter')) {
        refined = draftContent.replace(/COUNTERCLAIM[\s\S]*?(?=\n\d\.|\nPRAYER)/, `COUNTERCLAIM (Section 23(2A))\n\nThe Respondent files the following counterclaim:\n(a) ${instruction.replace(/^.*counterclaim[:\s]*/i, '') || 'Amount of ₹25,00,000 towards damages suffered'}\n\n`);
        setChatHistory(prev => [...prev, { from: 'ai', text: '✅ Updated the counterclaim section.' }]);
      } else if (instruction.toLowerCase().includes('remove') || instruction.toLowerCase().includes('delete')) {
        setChatHistory(prev => [...prev, { from: 'ai', text: '✅ Removed the requested content.' }]);
      } else {
        refined = draftContent + `\n\nADDITIONAL SUBMISSION:\n${instruction}`;
        setChatHistory(prev => [...prev, { from: 'ai', text: `✅ Added: "${instruction}"` }]);
      }
      setDraftContent(refined);
      setGenerating(false);
    }, 1000);
  };

  const handleSubmit = () => {
    setStep('submitted');
    if (showToast) showToast('Response filed successfully! Claimant has been notified.');
  };

  React.useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatHistory]);

  // Step: Choose response type
  // Step: Pick arbitrator (for accept flow)
  if (step === 'pickArb') {
    const onArbPicked = (arb) => {
      setPickedArbitrator(arb);
      setGenerating(true);
      setStep('draft');
      // Generate accept draft with picked arbitrator
      const arbDetails = arb.type === 'system' ? `Name: ${arb.name}\nQualifications: ${arb.title}\nExpertise: ${arb.domain ? arb.domain.join(', ') : ''}\nExperience: ${arb.experience} years` : `Name: ${arb.name}\nDesignation: ${arb.designation}\nBar Council ID: ${arb.barCouncilId}\nExpertise: ${arb.expertise}\nExperience: ${arb.experience} years`;
      setTimeout(() => {
        const content = `RESPONSE TO ARBITRATION NOTICE\n(Acceptance of Arbitration & Proposal for Arbitrator)\n\nDate: ${today}\nCase Reference: ${caseData.id}\n\nTo,\n${claimant.name}\n${claimant.org}\n${claimant.address}\n\nFrom,\n${respondent.name}\n${respondent.org}\n${respondent.address}\n\nSubject: Response to Arbitration Notice dated ${new Date(caseData.filed).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}\n\nDear Sir/Madam,\n\n1. We acknowledge receipt of your Arbitration Notice dated ${new Date(caseData.filed).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} invoking arbitration under Clause 14.2 of the Service Agreement dated 15 March 2025.\n\n2. ACCEPTANCE OF ARBITRATION\n\nWithout prejudice to our rights and contentions on merits, we agree to resolve the disputes through arbitration as provided in the Agreement.\n\n3. PROPOSED ARBITRATOR\n\nWe propose the following arbitrator for adjudication of the disputes:\n\n${arbDetails}\n\nAlternatively, we are agreeable to the appointment of a sole arbitrator by mutual consent or by the ${caseData.institution || 'Delhi International Arbitration Centre (DIAC)'}.\n\n4. SEAT & LANGUAGE\n\nWe agree to the seat of arbitration at New Delhi and proceedings in English.\n\n5. RESERVATION OF RIGHTS\n\nWe reserve our right to file a detailed Statement of Defence on merits at the appropriate stage of the proceedings.\n\n${respondent.name}\n${respondent.org}\nDate: ${today}`;
        setDraftContent(content);
        setChatHistory([{ from: 'ai', text: `📄 Your acceptance with proposed arbitrator (${arb.name}) has been drafted. Review and refine.` }]);
        setGenerating(false);
      }, 1500);
    };
    return React.createElement('div', null,
      React.createElement('button', { className: 'btn btn-outline btn-sm', onClick: () => setStep('choose'), style: { marginBottom: 12 } }, '← Back'),
      React.createElement('h4', { style: { marginBottom: 4 } }, '⚖️ Propose an Arbitrator'),
      React.createElement('p', { style: { fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: 12 } }, 'Select an arbitrator from the platform or add an external arbitrator\'s details.'),
      React.createElement(ArbitratorPicker, { onSelect: onArbPicked, caseType: caseData.type })
    );
  }

  // Step: Choose response type
  if (step === 'choose') {
    return React.createElement('div', null,
      React.createElement('button', { className: 'btn btn-outline btn-sm', onClick: onBack, style: { marginBottom: 12 } }, '← Back to Notice'),
      React.createElement('h4', { style: { marginBottom: 4 } }, '📝 Choose Your Response'),
      React.createElement('p', { style: { fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: 16 } }, 'Select the appropriate response based on your legal position. The AI will generate a complete draft for your review.'),
      OPTIONS.map(opt =>
        React.createElement('div', { key: opt.id, onClick: () => generateReply(opt.id), style: { padding: 16, border: opt.recommended ? '2px solid #2b6cb0' : '1px solid var(--border)', borderRadius: 'var(--radius)', marginBottom: 10, cursor: 'pointer', background: opt.recommended ? '#ebf8ff' : 'white', position: 'relative' } },
          opt.recommended && React.createElement('span', { style: { position: 'absolute', top: -10, right: 12, background: '#2b6cb0', color: 'white', fontSize: '0.7rem', padding: '2px 8px', borderRadius: 10 } }, '✓ Recommended'),
          React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
            React.createElement('span', { style: { fontSize: '1.5rem' } }, opt.icon),
            React.createElement('div', null,
              React.createElement('div', { style: { fontWeight: 600, marginBottom: 4 } }, opt.title),
              React.createElement('div', { style: { fontSize: '0.83rem', color: 'var(--text-light)', marginBottom: 4 } }, opt.desc),
              React.createElement('div', { style: { fontSize: '0.78rem', color: '#2b6cb0' } }, '📖 ', opt.legal)
            )
          )
        )
      )
    );
  }

  // Step: Submitted
  if (step === 'submitted') {
    return React.createElement('div', { style: { textAlign: 'center', padding: 40 } },
      React.createElement('div', { style: { fontSize: '3rem', marginBottom: 12 } }, '✅'),
      React.createElement('h3', null, 'Response Filed Successfully'),
      React.createElement('p', { style: { color: 'var(--text-light)', marginBottom: 16 } }, `Your ${OPTIONS.find(o => o.id === selectedOption).title} has been filed and served on the Claimant.`),
      React.createElement('div', { style: { background: '#f7fafc', padding: 12, borderRadius: 'var(--radius)', fontSize: '0.85rem', display: 'inline-block' } },
        React.createElement('div', null, `📅 Filed: ${today}`),
        React.createElement('div', null, `📧 Served to: ${claimant.name} (${claimant.email})`)
      )
    );
  }

  // Step: Draft view with refinement
  return React.createElement('div', null,
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
      React.createElement('button', { className: 'btn btn-outline btn-sm', onClick: () => { setStep('choose'); setSelectedOption(null); } }, '← Change Response Type'),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        React.createElement('button', { className: 'btn btn-primary btn-sm', onClick: handleSubmit }, '📤 File Response'),
        React.createElement('button', { className: 'btn btn-outline btn-sm', onClick: () => { if (showToast) showToast('PDF downloaded'); } }, '📥 PDF')
      )
    ),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: 12, minHeight: 0 } },
      // Document view
      React.createElement('div', { style: { border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'white', padding: 28, fontFamily: "'Times New Roman', serif", fontSize: '0.85rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', maxHeight: 'calc(100vh - 320px)', overflow: 'auto' } },
        generating && !draftContent ? React.createElement('div', { style: { textAlign: 'center', padding: 40, fontFamily: 'sans-serif' } }, '🤖 Generating your response...') : draftContent
      ),
      // Chat panel
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: '#fafafa', maxHeight: 'calc(100vh - 320px)' } },
        React.createElement('div', { style: { padding: '10px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.83rem' } }, '🤖 Refine Draft'),
        React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: 10 } },
          chatHistory.map((msg, i) =>
            React.createElement('div', { key: i, style: { marginBottom: 8, display: 'flex', gap: 6 } },
              React.createElement('span', { style: { fontSize: '0.8rem' } }, msg.from === 'ai' ? '🤖' : '👤'),
              React.createElement('div', { style: { background: msg.from === 'ai' ? 'white' : '#ebf8ff', padding: '6px 10px', borderRadius: 6, fontSize: '0.8rem', maxWidth: '88%' } }, msg.text)
            )
          ),
          generating && React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-light)', padding: 6 } }, '⏳ Updating...'),
          React.createElement('div', { ref: chatEndRef })
        ),
        React.createElement('div', { style: { padding: 8, borderTop: '1px solid var(--border)', display: 'flex', gap: 6 } },
          React.createElement('input', {
            value: refineInput, onChange: (e) => setRefineInput(e.target.value),
            onKeyDown: (e) => e.key === 'Enter' && handleRefine(),
            placeholder: 'Refine the draft...',
            style: { flex: 1, padding: '7px 10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '0.8rem' },
            disabled: generating
          }),
          React.createElement('button', { className: 'btn btn-primary btn-sm', onClick: handleRefine, disabled: !refineInput.trim() || generating }, 'Send')
        )
      )
    )
  );
}
