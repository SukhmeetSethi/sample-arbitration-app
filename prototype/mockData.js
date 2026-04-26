// ===== MOCK DATA =====
const MOCK = {
  users: {
    claimant: { name: 'Priya Sharma', org: 'Sharma Logistics Pvt Ltd', email: 'priya@sharmalogistics.in', phone: '+91 98765 43210', address: '42, Nehru Place, New Delhi – 110019' },
    respondent: { name: 'Vikram Malhotra', org: 'Apex Freight Solutions', email: 'vikram@apexfreight.in', phone: '+91 98111 22334', address: '15, Andheri East, Mumbai – 400069' },
    arbitrator: { name: 'Justice (Retd.) K. Venkataraman', org: 'Independent Arbitrator', email: 'kv@arbitrator.in', phone: '+91 94440 55667', address: 'Chennai' },
  },

  cases: [
    { id: 'ARB-2026-00142', type: 'Commercial', claimant: 'Priya Sharma (Sharma Logistics Pvt Ltd)', respondent: 'Apex Freight Solutions', value: '₹45,00,000', status: 'Hearing', arbitrator: 'Justice (Retd.) K. Venkataraman', institution: 'MCIA', filed: '2026-01-15', nextHearing: '2026-04-22', deadline: '2027-01-15', stage: 'Oral Arguments', noticeServed: true, responseReceived: true },
    { id: 'ARB-2026-00187', type: 'Construction', claimant: 'Greenfield Infra Ltd', respondent: 'Metro Builders Corp', value: '₹2,10,00,000', status: 'Filed', arbitrator: null, institution: 'DIAC', filed: '2026-03-28', nextHearing: null, deadline: '2027-03-28', stage: 'Awaiting Respondent Reply', noticeServed: true, responseReceived: false },
    { id: 'ARB-2025-00891', type: 'Employment', claimant: 'Rahul Verma', respondent: 'TechNova Solutions', value: '₹12,50,000', status: 'Awarded', arbitrator: 'Adv. Meera Krishnan', institution: null, filed: '2025-06-10', nextHearing: null, deadline: null, stage: 'Award Published', noticeServed: true, responseReceived: true },
    { id: 'ARB-2026-00156', type: 'IP / Licensing', claimant: 'InnoPatent Holdings', respondent: 'DigiSoft India Pvt Ltd', value: '₹85,00,000', status: 'Active', arbitrator: 'Prof. Anil Deshmukh', institution: 'MCIA', filed: '2026-02-05', nextHearing: '2026-04-30', deadline: '2027-02-05', stage: 'Document Production', noticeServed: true, responseReceived: true },
  ],

  arbitrators: [
    { id: 'arb-1', name: 'Justice (Retd.) K. Venkataraman', title: 'Former High Court Judge, Chennai', domain: ['Commercial', 'Construction', 'International'], experience: 35, fee: '₹3,00,000 – ₹10,00,000', rating: 4.9, cases: 142, status: 'Premium', available: true },
    { id: 'arb-2', name: 'Adv. Meera Krishnan', title: 'Senior Advocate, Mumbai', domain: ['Employment', 'IP / Licensing', 'Commercial'], experience: 22, fee: '₹1,50,000 – ₹5,00,000', rating: 4.7, cases: 87, status: 'Verified', available: true },
    { id: 'arb-3', name: 'Prof. Anil Deshmukh', title: 'Professor of Law, NLSIU Bangalore', domain: ['IP / Licensing', 'Technology', 'Commercial'], experience: 18, fee: '₹1,00,000 – ₹3,00,000', rating: 4.5, cases: 45, status: 'Verified', available: false },
    { id: 'arb-4', name: 'Adv. Suresh Iyer', title: 'Advocate, Delhi', domain: ['Insurance', 'Consumer', 'Banking'], experience: 15, fee: '₹75,000 – ₹2,00,000', rating: 4.3, cases: 63, status: 'Verified', available: true },
  ],

  hearings: [
    { id: 'HRG-001', caseId: 'ARB-2026-00142', date: '2026-04-22', time: '10:30 AM', type: 'Oral Arguments', status: 'Scheduled', duration: null, participants: ['Priya Sharma', 'Adv. Rajesh Menon', 'Justice (Retd.) K. Venkataraman'] },
    { id: 'HRG-002', caseId: 'ARB-2026-00156', date: '2026-04-30', time: '2:00 PM', type: 'Document Review', status: 'Scheduled', duration: null, participants: ['InnoPatent Holdings', 'DigiSoft India', 'Prof. Anil Deshmukh'] },
    { id: 'HRG-004', caseId: 'ARB-2026-00142', date: '2026-04-10', time: '10:30 AM', type: 'Cross Examination', status: 'Completed', duration: '2h 15m', participants: ['Priya Sharma', 'Adv. Rajesh Menon', 'Justice (Retd.) K. Venkataraman'] },
  ],

  documents: [
    { id: 'doc-1', caseId: 'ARB-2026-00142', name: 'Arbitration Notice (Section 21).pdf', type: 'Notice', uploadedBy: 'Priya Sharma', date: '2026-01-15', size: '245 KB' },
    { id: 'doc-2', caseId: 'ARB-2026-00142', name: 'Statement of Claim.pdf', type: 'Pleading', uploadedBy: 'Priya Sharma', date: '2026-02-01', size: '1.2 MB' },
    { id: 'doc-3', caseId: 'ARB-2026-00142', name: 'Statement of Defence.pdf', type: 'Pleading', uploadedBy: 'Apex Freight Solutions', date: '2026-02-28', size: '890 KB' },
    { id: 'doc-4', caseId: 'ARB-2026-00142', name: 'Procedural Order No. 1.pdf', type: 'Order', uploadedBy: 'Tribunal', date: '2026-02-10', size: '120 KB' },
  ],

  caseTimeline: [
    { date: '2026-01-15', title: 'Case Filed', desc: 'Arbitration notice served under Section 21', completed: true },
    { date: '2026-01-20', title: 'Respondent Notified', desc: 'Notice sent via email + SMS + platform', completed: true },
    { date: '2026-02-01', title: 'Statement of Claim Filed', desc: 'Filed by Claimant with supporting exhibits', completed: true },
    { date: '2026-02-05', title: 'Arbitrator Appointed', desc: 'Justice (Retd.) K. Venkataraman — mutually agreed', completed: true },
    { date: '2026-02-28', title: 'Statement of Defence Filed', desc: 'Filed by Respondent', completed: true },
    { date: '2026-04-10', title: 'Cross Examination Hearing', desc: 'Completed — 2h 15m', completed: true },
    { date: '2026-04-22', title: 'Oral Arguments', desc: 'Scheduled — 10:30 AM', completed: false },
    { date: '2027-01-15', title: 'Award Deadline', desc: 'Section 29A — 12 months from filing', completed: false },
  ],

  notifications: {
    claimant: [
      { id: 1, text: 'Hearing scheduled for ARB-2026-00142 on 22 Apr 2026', time: '2 hours ago', read: false },
      { id: 2, text: 'Respondent filed Statement of Defence in ARB-2026-00142', time: '1 day ago', read: true },
    ],
    respondent: [
      { id: 3, text: 'New Arbitration Notice received — ARB-2026-00187', time: '1 hour ago', read: false },
      { id: 4, text: 'Response due in 5 days for ARB-2026-00187', time: '1 day ago', read: false },
      { id: 5, text: 'Hearing scheduled for ARB-2026-00142 on 22 Apr 2026', time: '2 days ago', read: true },
    ],
    arbitrator: [
      { id: 6, text: 'New appointment request — ARB-2026-00201', time: '3 hours ago', read: false },
      { id: 7, text: 'Hearing ARB-2026-00142 scheduled for 22 Apr 2026', time: '1 day ago', read: false },
    ],
  },

  awards: [
    { id: 'AWD-001', caseId: 'ARB-2025-00891', date: '2025-11-20', arbitrator: 'Adv. Meera Krishnan', amount: '₹10,25,000', status: 'Enforcement', parties: 'Rahul Verma vs TechNova Solutions' },
  ],

  courtFilings: [
    { id: 'CF-001', awardId: 'AWD-001', court: 'Delhi High Court', type: 'Section 36 — Enforcement', status: 'Filed', date: '2025-12-01', caseNumber: 'EXP/2025/4521' },
  ],
};
