// ===== MOCK DATA =====
const MOCK = {
  cases: [
    { id: 'ARB-2026-00142', type: 'Commercial', claimant: 'Priya Sharma (Sharma Logistics Pvt Ltd)', respondent: 'Apex Freight Solutions', value: '₹45,00,000', status: 'Hearing', arbitrator: 'Justice (Retd.) K. Venkataraman', institution: 'MCIA', filed: '2026-01-15', nextHearing: '2026-04-22', deadline: '2027-01-15', stage: 'Oral Arguments' },
    { id: 'ARB-2026-00187', type: 'Construction', claimant: 'Greenfield Infra Ltd', respondent: 'Metro Builders Corp', value: '₹2,10,00,000', status: 'Filed', arbitrator: null, institution: 'DIAC', filed: '2026-03-28', nextHearing: null, deadline: '2027-03-28', stage: 'Awaiting Respondent Reply' },
    { id: 'ARB-2025-00891', type: 'Employment', claimant: 'Rahul Verma', respondent: 'TechNova Solutions', value: '₹12,50,000', status: 'Awarded', arbitrator: 'Adv. Meera Krishnan', institution: null, filed: '2025-06-10', nextHearing: null, deadline: null, stage: 'Award Published' },
    { id: 'ARB-2026-00156', type: 'IP / Licensing', claimant: 'InnoPatent Holdings', respondent: 'DigiSoft India Pvt Ltd', value: '₹85,00,000', status: 'Active', arbitrator: 'Prof. Anil Deshmukh', institution: 'MCIA', filed: '2026-02-05', nextHearing: '2026-04-30', deadline: '2027-02-05', stage: 'Document Production' },
    { id: 'ARB-2025-01023', type: 'Insurance', claimant: 'Kavita Reddy', respondent: 'National Insurance Co', value: '₹8,75,000', status: 'Closed', arbitrator: 'Adv. Suresh Iyer', institution: null, filed: '2025-08-20', nextHearing: null, deadline: null, stage: 'Settlement Reached' },
    { id: 'ARB-2026-00201', type: 'Commercial', claimant: 'Bharat Exports Ltd', respondent: 'Gulf Trading FZE', value: '₹3,50,00,000', status: 'Active', arbitrator: 'Justice (Retd.) K. Venkataraman', institution: 'SIAC', filed: '2026-04-01', nextHearing: '2026-05-10', deadline: '2027-04-01', stage: 'Statement of Defence Due' },
  ],

  arbitrators: [
    { id: 'arb-1', name: 'Justice (Retd.) K. Venkataraman', title: 'Former High Court Judge, Chennai', domain: ['Commercial', 'Construction', 'International'], experience: 35, fee: '₹3,00,000 – ₹10,00,000', rating: 4.9, cases: 142, status: 'Premium', available: true, barCouncil: 'TN/1234/1991', languages: ['English', 'Tamil', 'Hindi'] },
    { id: 'arb-2', name: 'Adv. Meera Krishnan', title: 'Senior Advocate, Mumbai', domain: ['Employment', 'IP / Licensing', 'Commercial'], experience: 22, fee: '₹1,50,000 – ₹5,00,000', rating: 4.7, cases: 87, status: 'Verified', available: true, barCouncil: 'MH/5678/2004', languages: ['English', 'Hindi', 'Marathi'] },
    { id: 'arb-3', name: 'Prof. Anil Deshmukh', title: 'Professor of Law, NLSIU Bangalore', domain: ['IP / Licensing', 'Technology', 'Commercial'], experience: 18, fee: '₹1,00,000 – ₹3,00,000', rating: 4.5, cases: 45, status: 'Verified', available: false, barCouncil: 'KA/9012/2008', languages: ['English', 'Hindi', 'Kannada'] },
    { id: 'arb-4', name: 'Adv. Suresh Iyer', title: 'Advocate, Delhi', domain: ['Insurance', 'Consumer', 'Banking'], experience: 15, fee: '₹75,000 – ₹2,00,000', rating: 4.3, cases: 63, status: 'Verified', available: true, barCouncil: 'DL/3456/2011', languages: ['English', 'Hindi'] },
    { id: 'arb-5', name: 'Justice (Retd.) Shalini Gupta', title: 'Former District Judge, Delhi', domain: ['Family', 'Property', 'Commercial'], experience: 28, fee: '₹2,00,000 – ₹6,00,000', rating: 4.8, cases: 98, status: 'Premium', available: true, barCouncil: 'DL/7890/1998', languages: ['English', 'Hindi', 'Punjabi'] },
    { id: 'arb-6', name: 'Adv. Farhan Sheikh', title: 'Advocate, Hyderabad', domain: ['Construction', 'Real Estate'], experience: 10, fee: '₹50,000 – ₹1,50,000', rating: 4.1, cases: 21, status: 'Basic', available: true, barCouncil: 'TS/2345/2016', languages: ['English', 'Hindi', 'Telugu'] },
  ],

  hearings: [
    { id: 'HRG-001', caseId: 'ARB-2026-00142', date: '2026-04-22', time: '10:30 AM', type: 'Oral Arguments', status: 'Scheduled', duration: null, participants: ['Priya Sharma', 'Adv. Rajesh Menon', 'Justice (Retd.) K. Venkataraman'] },
    { id: 'HRG-002', caseId: 'ARB-2026-00156', date: '2026-04-30', time: '2:00 PM', type: 'Document Review', status: 'Scheduled', duration: null, participants: ['InnoPatent Holdings', 'DigiSoft India', 'Prof. Anil Deshmukh'] },
    { id: 'HRG-003', caseId: 'ARB-2026-00201', date: '2026-05-10', time: '11:00 AM', type: 'Preliminary Hearing', status: 'Scheduled', duration: null, participants: ['Bharat Exports Ltd', 'Gulf Trading FZE', 'Justice (Retd.) K. Venkataraman'] },
    { id: 'HRG-004', caseId: 'ARB-2026-00142', date: '2026-04-10', time: '10:30 AM', type: 'Cross Examination', status: 'Completed', duration: '2h 15m', participants: ['Priya Sharma', 'Adv. Rajesh Menon', 'Justice (Retd.) K. Venkataraman'] },
    { id: 'HRG-005', caseId: 'ARB-2026-00142', date: '2026-03-15', time: '11:00 AM', type: 'Preliminary Hearing', status: 'Completed', duration: '1h 30m', participants: ['Priya Sharma', 'Adv. Rajesh Menon', 'Justice (Retd.) K. Venkataraman'] },
  ],

  documents: [
    { id: 'doc-1', caseId: 'ARB-2026-00142', name: 'Arbitration Agreement.pdf', type: 'Agreement', uploadedBy: 'Priya Sharma', date: '2026-01-15', size: '245 KB' },
    { id: 'doc-2', caseId: 'ARB-2026-00142', name: 'Statement of Claim.pdf', type: 'Pleading', uploadedBy: 'Priya Sharma', date: '2026-02-01', size: '1.2 MB' },
    { id: 'doc-3', caseId: 'ARB-2026-00142', name: 'Statement of Defence.pdf', type: 'Pleading', uploadedBy: 'Adv. Rajesh Menon', date: '2026-02-28', size: '890 KB' },
    { id: 'doc-4', caseId: 'ARB-2026-00142', name: 'Exhibit A — Invoice Bundle.pdf', type: 'Exhibit', uploadedBy: 'Priya Sharma', date: '2026-03-05', size: '3.4 MB' },
    { id: 'doc-5', caseId: 'ARB-2026-00142', name: 'Exhibit B — Email Correspondence.pdf', type: 'Exhibit', uploadedBy: 'Adv. Rajesh Menon', date: '2026-03-10', size: '1.8 MB' },
    { id: 'doc-6', caseId: 'ARB-2026-00142', name: 'Procedural Order No. 1.pdf', type: 'Order', uploadedBy: 'Tribunal', date: '2026-02-10', size: '120 KB' },
    { id: 'doc-7', caseId: 'ARB-2026-00142', name: 'Hearing Recording — 15 Mar 2026.mp4', type: 'Recording', uploadedBy: 'Platform', date: '2026-03-15', size: '450 MB' },
  ],

  caseTimeline: [
    { date: '2026-01-15', title: 'Case Filed', desc: 'Arbitration notice served under Section 21', completed: true },
    { date: '2026-01-20', title: 'Respondent Notified', desc: 'Notice sent via email + SMS + platform', completed: true },
    { date: '2026-02-01', title: 'Statement of Claim Filed', desc: 'Filed by Claimant with supporting exhibits', completed: true },
    { date: '2026-02-05', title: 'Arbitrator Appointed', desc: 'Justice (Retd.) K. Venkataraman — mutually agreed', completed: true },
    { date: '2026-02-10', title: 'Procedural Order No. 1', desc: 'Hearing schedule and timelines set', completed: true },
    { date: '2026-02-28', title: 'Statement of Defence Filed', desc: 'Filed by Respondent via Adv. Rajesh Menon', completed: true },
    { date: '2026-03-15', title: 'Preliminary Hearing', desc: 'Completed — 1h 30m — issues framed', completed: true },
    { date: '2026-04-10', title: 'Cross Examination Hearing', desc: 'Completed — 2h 15m', completed: true },
    { date: '2026-04-22', title: 'Oral Arguments', desc: 'Scheduled — 10:30 AM', completed: false },
    { date: '2027-01-15', title: 'Award Deadline', desc: 'Section 29A — 12 months from filing', completed: false },
  ],

  notifications: [
    { id: 1, text: 'Hearing scheduled for ARB-2026-00142 on 22 Apr 2026', time: '2 hours ago', read: false },
    { id: 2, text: 'New document uploaded in ARB-2026-00156', time: '5 hours ago', read: false },
    { id: 3, text: 'Respondent reply due in 5 days for ARB-2026-00187', time: '1 day ago', read: true },
    { id: 4, text: 'Arbitrator fee payment pending for ARB-2026-00142', time: '2 days ago', read: true },
  ],

  awards: [
    { id: 'AWD-001', caseId: 'ARB-2025-00891', date: '2025-11-20', arbitrator: 'Adv. Meera Krishnan', amount: '₹10,25,000', status: 'Enforcement', parties: 'Rahul Verma vs TechNova Solutions' },
    { id: 'AWD-002', caseId: 'ARB-2025-01023', date: '2025-12-15', arbitrator: 'Adv. Suresh Iyer', amount: '₹6,50,000', status: 'Closed', parties: 'Kavita Reddy vs National Insurance Co' },
  ],

  courtFilings: [
    { id: 'CF-001', awardId: 'AWD-001', court: 'Delhi High Court', type: 'Section 36 — Enforcement', status: 'Filed', date: '2025-12-01', caseNumber: 'EXP/2025/4521' },
  ],

  docTemplates: [
    { id: 'tpl-1', name: 'Arbitration Notice (Section 21)', category: 'Filing', description: 'Formal notice invoking arbitration under the arbitration clause. Required to commence proceedings under Section 21 of A&C Act 1996.', sections: [
      { title: 'Header & Reference', hint: 'Reference to the contract, clause number, and date of agreement' },
      { title: 'Parties', hint: 'Full names, addresses, and designations of Claimant and Respondent' },
      { title: 'Dispute Description', hint: 'Nature of the dispute, relevant facts, and timeline of events' },
      { title: 'Relief Sought', hint: 'Specific relief / damages claimed with amounts' },
      { title: 'Proposed Arbitrator', hint: 'Name of proposed arbitrator or request for institutional appointment' },
      { title: 'Seat & Language', hint: 'Proposed seat of arbitration and language of proceedings' },
    ]},
    { id: 'tpl-2', name: 'Statement of Claim (Section 23)', category: 'Pleading', description: 'Detailed statement of facts, issues, and relief sought by the Claimant. Must include all supporting documents.', sections: [
      { title: 'Parties & Jurisdiction', hint: 'Details of parties and basis for tribunal jurisdiction' },
      { title: 'Factual Background', hint: 'Chronological narration of facts giving rise to the dispute' },
      { title: 'Contractual Terms', hint: 'Relevant contract clauses, obligations, and breach details' },
      { title: 'Issues for Determination', hint: 'Specific legal and factual issues the tribunal should decide' },
      { title: 'Relief & Damages', hint: 'Itemized relief sought with computation of damages' },
      { title: 'List of Exhibits', hint: 'Index of all supporting documents being filed' },
    ]},
    { id: 'tpl-3', name: 'Statement of Defence (Section 23)', category: 'Pleading', description: 'Respondent\'s reply to the Statement of Claim with counter-arguments and any counterclaim.', sections: [
      { title: 'Preliminary Objections', hint: 'Jurisdictional or procedural objections, if any' },
      { title: 'Response to Facts', hint: 'Para-wise response to Claimant\'s factual allegations' },
      { title: 'Defence on Merits', hint: 'Legal and factual defence arguments' },
      { title: 'Counterclaim (if any)', hint: 'Details of any counterclaim with relief sought' },
      { title: 'List of Exhibits', hint: 'Index of supporting documents' },
    ]},
    { id: 'tpl-4', name: 'Interim Relief Application (Section 17)', category: 'Application', description: 'Application to the tribunal for interim measures of protection pending final award.', sections: [
      { title: 'Urgency & Background', hint: 'Why interim relief is urgently needed' },
      { title: 'Relief Sought', hint: 'Specific interim measures requested' },
      { title: 'Prima Facie Case', hint: 'Brief merits showing likelihood of success' },
      { title: 'Balance of Convenience', hint: 'Why balance of convenience favours the applicant' },
      { title: 'Irreparable Harm', hint: 'Harm that cannot be compensated by damages alone' },
    ]},
    { id: 'tpl-5', name: 'Rejoinder', category: 'Pleading', description: 'Claimant\'s reply to the Statement of Defence, addressing new points raised by Respondent.', sections: [
      { title: 'Response to Preliminary Objections', hint: 'Counter-arguments to jurisdictional/procedural objections' },
      { title: 'Response to Defence on Merits', hint: 'Point-by-point rebuttal of defence arguments' },
      { title: 'Response to Counterclaim', hint: 'Defence against any counterclaim raised' },
      { title: 'Additional Evidence', hint: 'Any new evidence in response to defence' },
    ]},
    { id: 'tpl-6', name: 'Written Submissions / Arguments', category: 'Submission', description: 'Final written arguments summarizing the party\'s case with legal authorities.', sections: [
      { title: 'Summary of Facts', hint: 'Brief factual summary as established during proceedings' },
      { title: 'Issues & Arguments', hint: 'Issue-wise legal arguments with case law citations' },
      { title: 'Analysis of Evidence', hint: 'Key evidence and its impact on each issue' },
      { title: 'Prayer', hint: 'Final relief sought from the tribunal' },
    ]},
    { id: 'tpl-7', name: 'Section 34 — Setting Aside Application', category: 'Court Filing', description: 'Application to the court to set aside an arbitral award under Section 34 of A&C Act 1996.', sections: [
      { title: 'Court & Parties', hint: 'Court details, case parties, and award reference' },
      { title: 'Grounds for Challenge', hint: 'Specific grounds under Section 34(2) — incapacity, invalid agreement, lack of notice, beyond scope, improper composition, or public policy' },
      { title: 'Facts & Chronology', hint: 'Timeline of arbitration proceedings and award' },
      { title: 'Legal Arguments', hint: 'Detailed legal basis for setting aside' },
      { title: 'Prayer', hint: 'Relief sought from the court' },
    ]},
    { id: 'tpl-8', name: 'Section 36 — Enforcement Petition', category: 'Court Filing', description: 'Petition to enforce the arbitral award as a decree of the court under Section 36.', sections: [
      { title: 'Court & Parties', hint: 'Court details and party information' },
      { title: 'Award Details', hint: 'Award date, arbitrator, amount, and summary of directions' },
      { title: 'No Pending Challenge', hint: 'Confirmation that no Section 34 application is pending or has been dismissed' },
      { title: 'Execution Prayer', hint: 'Specific enforcement directions sought' },
    ]},
    { id: 'tpl-9', name: 'Conflict of Interest Disclosure (Section 12)', category: 'Arbitrator', description: 'Mandatory disclosure by arbitrator of any circumstances likely to give rise to justifiable doubts as to independence or impartiality.', sections: [
      { title: 'Arbitrator Details', hint: 'Name, designation, and appointment details' },
      { title: 'Relationship with Parties', hint: 'Any past or present relationship with parties or counsel' },
      { title: 'Financial Interest', hint: 'Any financial interest in the dispute or its outcome' },
      { title: 'Prior Involvement', hint: 'Any prior involvement with the subject matter' },
      { title: 'Declaration', hint: 'Confirmation of independence and impartiality' },
    ]},
  ],

  aiSuggestions: {
    'Header & Reference': 'ARBITRATION NOTICE\n\nUnder Section 21 of the Arbitration and Conciliation Act, 1996\n\nRef: Agreement dated [DATE] between [CLAIMANT] and [RESPONDENT]\nArbitration Clause: Clause [NUMBER] of the said Agreement\n\nDate: [TODAY\'S DATE]',
    'Parties': 'CLAIMANT:\n[Full Name / Company Name]\n[Registered Address]\n[Through: Authorized Representative / Advocate]\n\nRESPONDENT:\n[Full Name / Company Name]\n[Registered Address]',
    'Dispute Description': 'The dispute arises out of the [TYPE] Agreement dated [DATE] entered into between the parties for [PURPOSE].\n\nThe Claimant states that:\n1. [Key fact 1 — describe the contractual obligation]\n2. [Key fact 2 — describe the breach/default]\n3. [Key fact 3 — describe the consequence/loss]\n\nDespite repeated requests dated [DATES], the Respondent has failed to [specific default].',
    'Relief Sought': 'The Claimant seeks the following relief:\n\n1. A direction to the Respondent to pay ₹[AMOUNT] towards [principal amount/damages]\n2. Interest at [RATE]% per annum from [DATE] till realization\n3. Costs of arbitration\n4. Such other relief as the Tribunal deems fit and proper',
    'Factual Background': 'FACTUAL BACKGROUND\n\n1. The Claimant is a [description] engaged in [business activity].\n\n2. The Respondent is a [description] engaged in [business activity].\n\n3. On [DATE], the parties entered into a [TYPE] Agreement (hereinafter "the Agreement") for [PURPOSE].\n\n4. Under the Agreement, the Claimant was obligated to [obligation] and the Respondent was obligated to [obligation].\n\n5. [Continue chronological narration of events leading to the dispute]',
    'Preliminary Objections': 'PRELIMINARY OBJECTIONS\n\nThe Respondent raises the following preliminary objections:\n\n1. Jurisdiction: [State any jurisdictional objection, if applicable]\n\n2. Limitation: The claim is barred by limitation as the cause of action arose on [DATE], and the notice was issued beyond the prescribed period.\n\n3. Arbitrability: [State if the dispute is not arbitrable]\n\nWithout prejudice to the above objections, the Respondent submits its defence on merits.',
    'Urgency & Background': 'APPLICATION FOR INTERIM MEASURES\n(Under Section 17 of the Arbitration and Conciliation Act, 1996)\n\nThe Applicant/Claimant most respectfully submits this application seeking urgent interim relief on the following grounds:\n\n1. The Respondent is [describe the threatened action — e.g., dissipating assets, destroying evidence, continuing the breach]\n\n2. Unless restrained, the Respondent\'s actions will render the final award infructuous.\n\n3. The matter is urgent because [explain time-sensitivity].',
  },
};
