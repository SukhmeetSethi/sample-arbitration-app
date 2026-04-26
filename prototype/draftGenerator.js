// ===== AI DRAFT GENERATOR =====
function amountInWords(amt) {
  if (!amt) return '[Amount in words]';
  const n = parseInt(String(amt).replace(/,/g, ''));
  if (isNaN(n)) return '[Amount in words]';
  if (n >= 10000000) return (n / 10000000).toFixed(2) + ' Crore';
  if (n >= 100000) return (n / 100000).toFixed(2) + ' Lakh';
  if (n >= 1000) return (n / 1000).toFixed(0) + ' Thousand';
  return String(n);
}

function generateDraft(templateId, answers, caseData, role) {
  const u = MOCK.users[role] || MOCK.users.claimant;
  const opp = role === 'respondent' ? MOCK.users.claimant : MOCK.users.respondent;
  const arb = MOCK.users.arbitrator;
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const caseId = caseData?.id || 'ARB-2026-XXXXX';

  // Header block reused across documents
  const partyBlock = (petitioner, respondentParty, labels) => {
    const l = labels || ['CLAIMANT', 'RESPONDENT'];
    return `${petitioner.name} (${petitioner.org})\n${petitioner.address}\n${'                                                    '}... ${l[0]}\n\nVERSUS\n\n${respondentParty.name} (${respondentParty.org})\n${respondentParty.address}\n${'                                                    '}... ${l[1]}`;
  };

  const templates = {
    'section-21': () => `ARBITRATION NOTICE
Under Section 21 of the Arbitration and Conciliation Act, 1996

Date: ${today}

To,
${opp.name}
${opp.org}
${opp.address}

From,
${u.name}
${u.org}
${u.address}

Subject: Notice invoking Arbitration under ${answers.clause_number || 'Clause [__]'} of the ${answers.contract_type || 'Agreement'} dated ${answers.contract_date || '[DATE]'}

Dear Sir/Madam,

1. REFERENCE & BACKGROUND

The Claimant, ${u.org}, and the Respondent, ${opp.org}, entered into a ${answers.contract_type || 'Agreement'} dated ${answers.contract_date || '[DATE]'} ("the Agreement"). ${answers.clause_number || 'Clause [__]'} of the Agreement provides for resolution of disputes through arbitration.

2. DISPUTE

${answers.dispute_summary || '[Description of the dispute]'}

3. INVOCATION OF ARBITRATION

In view of the above, the Claimant hereby invokes the arbitration clause contained in ${answers.clause_number || 'Clause [__]'} of the Agreement and calls upon the Respondent to refer the disputes to arbitration in accordance with the Arbitration and Conciliation Act, 1996.

4. CLAIMS & RELIEF SOUGHT

The Claimant claims the following:

(a) A sum of ₹${answers.amount_claimed || '[AMOUNT]'} (Rupees ${amountInWords(answers.amount_claimed)} only) towards the principal amount;
(b) ${answers.relief_details || 'Interest at 18% per annum from the date of cause of action till realization'};
(c) Costs of arbitration proceedings;
(d) Such other and further relief as the learned Arbitrator may deem fit and proper.

5. PROPOSED ARBITRATOR

The Claimant proposes that the disputes be adjudicated by a sole Arbitrator. The Respondent is requested to agree on the appointment of an Arbitrator within 30 days of receipt of this notice, failing which the Claimant shall approach the Hon'ble Court under Section 11 of the Act.

6. SEAT & LANGUAGE

The seat of arbitration shall be ${answers.seat || 'New Delhi'} and the language of arbitration shall be ${answers.language || 'English'}.

7. RESPONSE

The Respondent is called upon to file a response to this notice within 30 days of receipt, as required under the Act.

Yours faithfully,

${u.name}
${u.org}
Email: ${u.email} | Phone: ${u.phone}

Enclosures:
1. Copy of the Agreement dated ${answers.contract_date || '[DATE]'}
2. Supporting documents and correspondence`,

    'section-9': () => `IN THE ${(answers.court_name || 'HIGH COURT').toUpperCase()}

MISCELLANEOUS APPLICATION NO. _____ OF 2026
Under Section 9 of the Arbitration and Conciliation Act, 1996

${partyBlock(u, opp, role === 'respondent' ? ['APPLICANT/RESPONDENT', 'RESPONDENT/CLAIMANT'] : ['APPLICANT/CLAIMANT', 'RESPONDENT'])}

APPLICATION FOR INTERIM MEASURES

Most Respectfully Showeth:

1. The Applicant is a party to arbitration proceedings in Case No. ${caseId}.

2. TYPE OF MEASURE SOUGHT: ${answers.measure_type || '[Type of interim measure]'}

3. URGENCY

${answers.urgency_reason || '[Explain why this measure is urgently needed]'}

4. FACTS SUPPORTING THE APPLICATION

${answers.facts_supporting || '[Key facts supporting the application]'}

5. The Applicant submits that unless the interim measure is granted, the Applicant will suffer irreparable loss and the final award, if any, will be rendered infructuous.

6. The Applicant undertakes to commence arbitration proceedings within 90 days from the date of this order, as required under Section 9(2) of the Act.

PRAYER

It is most respectfully prayed that this Hon'ble Court may be pleased to:

(a) ${answers.relief_sought || 'Grant the interim measure as prayed for'};
(b) Pass such other order(s) as this Hon'ble Court may deem fit.

Filed by:
${u.name} | ${u.org}
Date: ${today}`,

    'section-11': () => `IN THE ${(answers.court_name || 'HIGH COURT').toUpperCase()}

ARBITRATION PETITION NO. _____ OF 2026
Under Section 11(6) of the Arbitration and Conciliation Act, 1996

${partyBlock(u, opp, ['PETITIONER', 'RESPONDENT'])}

APPLICATION FOR APPOINTMENT OF ARBITRATOR

Most Respectfully Showeth:

1. The Petitioner and the Respondent entered into an Agreement dated ${answers.agreement_date || '[DATE]'} containing an arbitration clause.

2. Disputes having arisen, the Petitioner issued an Arbitration Notice under Section 21 on ${answers.notice_date || '[DATE]'}.

3. FAILURE OF APPOINTMENT:
${answers.failure_reason || '[Describe why appointment failed]'}

4. Despite the lapse of 30 days, the parties have been unable to agree on an arbitrator. The Petitioner approaches this Hon'ble Court under Section 11(6).

5. PROPOSED ARBITRATOR:
${answers.proposed_arbitrator || 'The Petitioner requests this Hon\'ble Court to appoint a suitable arbitrator.'}

6. The dispute value is ₹${answers.dispute_value || '[AMOUNT]'}.

PRAYER

(a) Appoint a sole Arbitrator to adjudicate the disputes;
(b) Pass such other order(s) as deemed fit.

Filed by: ${u.name} | ${u.org}
Date: ${today}`,

    'section-12-disclosure': () => `DISCLOSURE STATEMENT
Under Section 12 of the Arbitration and Conciliation Act, 1996
(Read with the Fifth Schedule)

Case No.: ${answers.case_reference || caseId}
Date: ${today}

I, ${arb.name}, having been appointed / proposed as Arbitrator in the above matter, hereby make the following disclosure in compliance with Section 12(1) of the Act:

1. RELATIONSHIP WITH PARTIES OR COUNSEL

${answers.relationship_parties || 'I have no past or present relationship with any of the parties or their counsel that could give rise to justifiable doubts as to my independence or impartiality.'}

2. FINANCIAL INTEREST

${answers.financial_interest || 'I have no financial interest, direct or indirect, in the dispute or its outcome.'}

3. PRIOR INVOLVEMENT

${answers.prior_involvement || 'I have had no prior involvement with the subject matter of the dispute.'}

4. OTHER CIRCUMSTANCES

${answers.other_circumstances || 'There are no other circumstances that I am aware of that could give rise to justifiable doubts as to my independence or impartiality.'}

5. DECLARATION

I hereby declare that I am independent and impartial and shall remain so throughout the arbitration proceedings. I undertake to promptly disclose any circumstances that may arise during the proceedings that could affect my independence or impartiality.

${arb.name}
Arbitrator
Date: ${today}`,

    'section-13-challenge': () => `BEFORE THE ARBITRAL TRIBUNAL
Case No.: ${caseId}

CHALLENGE TO ARBITRATOR
Under Section 13 of the Arbitration and Conciliation Act, 1996

${partyBlock(u, opp)}

The ${role === 'respondent' ? 'Respondent' : 'Claimant'} hereby challenges the appointment of ${answers.arbitrator_name || '[Arbitrator Name]'} as Arbitrator on the following grounds:

1. GROUND FOR CHALLENGE: ${answers.grounds || '[Ground]'}

2. DETAILED REASONS

${answers.detailed_grounds || '[Detailed grounds]'}

3. EVIDENCE

${answers.evidence_summary || '[Evidence supporting the challenge]'}

4. This challenge is being filed within 15 days of becoming aware of the circumstances, as required under Section 13(2).

PRAYER

The ${role === 'respondent' ? 'Respondent' : 'Claimant'} prays that the learned Tribunal may:
(a) Accept this challenge and terminate the mandate of ${answers.arbitrator_name || '[Arbitrator]'};
(b) Appoint a substitute arbitrator in accordance with the Act.

${u.name} | ${u.org}
Date: ${today}`,

    'section-16-jurisdiction': () => `BEFORE THE ARBITRAL TRIBUNAL
Case No.: ${caseId}

PLEA REGARDING JURISDICTION
Under Section 16 of the Arbitration and Conciliation Act, 1996

The Respondent raises the following plea regarding the jurisdiction of this Tribunal:

1. NATURE OF OBJECTION: ${answers.objection_type || '[Type of objection]'}

2. DETAILED GROUNDS

${answers.detailed_objection || '[Detailed grounds]'}

3. LEGAL BASIS

${answers.legal_basis || '[Legal provisions and case law]'}

The Respondent submits that this plea is being raised prior to the submission of the Statement of Defence, as required under Section 16(2).

PRAYER

The Respondent prays that the Tribunal may rule that it does not have jurisdiction and terminate the proceedings.

${u.name} | ${u.org}
Date: ${today}`,

    'section-17-interim': () => `BEFORE THE ARBITRAL TRIBUNAL
Case No.: ${caseId}

APPLICATION FOR INTERIM MEASURES
Under Section 17 of the Arbitration and Conciliation Act, 1996

${partyBlock(u, opp)}

1. TYPE OF MEASURE: ${answers.measure_type || '[Measure type]'}

2. URGENCY
${answers.urgency || '[Why this is urgent]'}

3. PRIMA FACIE CASE
${answers.prima_facie_case || '[Brief merits]'}

4. BALANCE OF CONVENIENCE
${answers.balance_convenience || '[Balance of convenience]'}

5. IRREPARABLE HARM
${answers.irreparable_harm || '[Irreparable harm]'}

PRAYER

The Applicant prays that the Tribunal may grant the interim measure as prayed for. Orders under Section 17 are enforceable as orders of the Court under the CPC, 1908.

${u.name} | ${u.org}
Date: ${today}`,

    'statement-of-claim': () => `BEFORE THE ARBITRAL TRIBUNAL
Case No.: ${caseId}

STATEMENT OF CLAIM
Under Section 23(1) of the Arbitration and Conciliation Act, 1996

${partyBlock(u, opp)}

The Claimant respectfully submits as follows:

1. FACTUAL BACKGROUND

${answers.factual_background || '[Chronological narration of facts]'}

2. CONTRACTUAL TERMS AND BREACH

${answers.contractual_terms || '[Contract clauses and breach details]'}

3. ISSUES FOR DETERMINATION

${answers.issues_for_determination || '[Issues for the tribunal to decide]'}

4. COMPUTATION OF DAMAGES

${answers.damages_computation || '[Itemized damages]'}

5. RELIEF SOUGHT

${answers.relief_sought || '[All relief sought]'}

6. LIST OF EXHIBITS

${answers.exhibits_list || '[Index of supporting documents]'}

Respectfully submitted,
${u.name} | ${u.org}
Date: ${today}`,

    'defence': () => `BEFORE THE ARBITRAL TRIBUNAL
Case No.: ${caseId}

STATEMENT OF DEFENCE
Under Section 23 of the Arbitration and Conciliation Act, 1996

${partyBlock(opp, u)}

1. RECEIPT OF NOTICE
The Respondent received the Arbitration Notice dated ${answers.notice_date || '[DATE]'}.

2. ARBITRATION AGREEMENT
${answers.admit_deny === 'Admit the arbitration agreement' ? 'The Respondent admits the arbitration agreement and does not challenge jurisdiction.' : answers.admit_deny === 'Deny — no valid clause exists' ? 'The Respondent denies the existence of a valid arbitration agreement within the meaning of Section 7.' : 'The Respondent admits the arbitration clause but challenges jurisdiction on the following grounds:'}

3. PRELIMINARY OBJECTIONS
${answers.objections || 'No preliminary objections at this stage.'}

4. RESPONSE ON FACTS
${answers.factual_response || '[Respondent version of facts]'}

5. DEFENCE ON MERITS
The Respondent submits that the claims are without merit and liable to be dismissed.

${answers.counterclaim?.trim() ? `6. COUNTERCLAIM (Section 23(2A))\n${answers.counterclaim}` : ''}

${answers.counterclaim?.trim() ? '7' : '6'}. ARBITRATOR
${answers.proposed_arbitrator || 'No objection to the proposed Tribunal.'}

PRAYER
(a) Dismiss the Claimant's claims;
${answers.counterclaim?.trim() ? '(b) Allow the counterclaim;\n(c)' : '(b)'} Award costs in favour of the Respondent.

${u.name} | ${u.org}
Date: ${today}`,

    'rejoinder': () => `BEFORE THE ARBITRAL TRIBUNAL
Case No.: ${caseId}

REJOINDER
Under Section 23 of the Arbitration and Conciliation Act, 1996

${partyBlock(u, opp)}

1. RESPONSE TO PRELIMINARY OBJECTIONS
${answers.response_to_objections || '[Counter-arguments to objections]'}

2. REBUTTAL OF DEFENCE
${answers.response_to_defence || '[Point-by-point rebuttal]'}

3. RESPONSE TO COUNTERCLAIM
${answers.response_to_counterclaim || 'No counterclaim was filed. / [Response to counterclaim]'}

4. ADDITIONAL EVIDENCE
${answers.additional_evidence || 'No additional evidence at this stage.'}

${u.name} | ${u.org}
Date: ${today}`,

    'sur-rejoinder': () => `BEFORE THE ARBITRAL TRIBUNAL
Case No.: ${caseId}

SUR-REJOINDER

${partyBlock(opp, u)}

1. RESPONSE TO REJOINDER
${answers.response_to_rejoinder || '[Response to Rejoinder arguments]'}

2. ADDITIONAL FACTS
${answers.additional_facts || '[Additional facts or clarifications]'}

3. ADDITIONAL EVIDENCE
${answers.additional_evidence || 'No further evidence.'}

${u.name} | ${u.org}
Date: ${today}`,

    'written-arguments': () => `BEFORE THE ARBITRAL TRIBUNAL
Case No.: ${caseId}

WRITTEN SUBMISSIONS
Under Section 24 of the Arbitration and Conciliation Act, 1996

On behalf of the ${role === 'respondent' ? 'Respondent' : 'Claimant'}

1. SUMMARY OF FACTS
${answers.summary_of_facts || '[Factual summary]'}

2. ISSUES AND ARGUMENTS
${answers.issues_and_arguments || '[Issue-wise arguments with case law]'}

3. ANALYSIS OF EVIDENCE
${answers.evidence_analysis || '[Evidence analysis]'}

4. PRAYER
${answers.prayer || '[Final relief sought]'}

${u.name} | ${u.org}
Date: ${today}`,

    'procedural-order': () => `BEFORE THE ARBITRAL TRIBUNAL
Case No.: ${caseId}

PROCEDURAL ORDER NO. ____

The Arbitral Tribunal, having considered the submissions of the parties, hereby issues the following directions:

1. HEARING SCHEDULE
${answers.hearing_schedule || '[Hearing dates and times]'}

2. FILING DEADLINES
${answers.filing_deadlines || '[Deadlines for pleadings]'}

3. DOCUMENT PRODUCTION
${answers.document_production || '[Directions for document exchange]'}

4. PROCEDURAL RULES
${answers.procedural_rules || '[Specific procedural rules]'}

5. OTHER DIRECTIONS
${answers.other_directions || '[Additional directions]'}

The parties are directed to comply with the above timelines strictly. Any application for extension must be filed at least 7 days before the deadline.

${arb.name}
Sole Arbitrator
Date: ${today}
Place: ${caseData?.institution || 'New Delhi'}`,

    'arbitral-award': () => `BEFORE THE ARBITRAL TRIBUNAL
Case No.: ${caseId}

ARBITRAL AWARD
Under Section 31 of the Arbitration and Conciliation Act, 1996

${partyBlock(MOCK.users.claimant, MOCK.users.respondent)}

1. ISSUES DETERMINED
${answers.issues_determined || '[Issues framed]'}

2. FINDINGS OF FACT
${answers.findings_of_fact || '[Factual findings]'}

3. LEGAL ANALYSIS
${answers.legal_analysis || '[Legal reasoning]'}

4. AWARD

Having considered the pleadings, evidence, and submissions of both parties, the Tribunal hereby awards as follows:

(a) The Respondent shall pay to the Claimant a sum of ₹${answers.award_amount || '[AMOUNT]'} (Rupees ${amountInWords(answers.award_amount)} only);
(b) Interest at the rate of ${answers.interest_rate || '[RATE]'} from the date of the claim till realization;
(c) Costs: ${answers.costs_direction || 'Each party to bear its own costs.'};
(d) ${answers.operative_part || 'The award shall be complied with within 30 days.'}

This award is made at ${caseData?.institution || 'New Delhi'} on ${today}.

${arb.name}
Sole Arbitrator

[Digitally Signed]`,

    'section-33-correction': () => `BEFORE THE ARBITRAL TRIBUNAL
Case No.: ${caseId}

APPLICATION FOR CORRECTION / INTERPRETATION OF AWARD
Under Section 33 of the Arbitration and Conciliation Act, 1996

1. TYPE: ${answers.error_type || '[Type of correction]'}

2. ERROR DETAILS
${answers.error_details || '[Describe the error]'}

3. PROPOSED CORRECTION
${answers.proposed_correction || '[Proposed corrected text]'}

This application is filed within 30 days of receipt of the award, as required under Section 33(1).

${u.name} | ${u.org}
Date: ${today}`,

    'section-34': () => `IN THE ${(answers.court_name || 'HIGH COURT').toUpperCase()}

ARBITRATION PETITION NO. _____ OF 2026
Under Section 34 of the Arbitration and Conciliation Act, 1996

${partyBlock(u, opp, ['PETITIONER', 'RESPONDENT'])}

APPLICATION TO SET ASIDE ARBITRAL AWARD

1. The award dated ${answers.award_date || '[DATE]'} in Case No. ${caseId} is challenged on the following grounds:

2. GROUND: ${answers.grounds || '[Ground under Section 34(2)]'}

3. DETAILED GROUNDS
${answers.detailed_grounds || '[Detailed grounds]'}

4. LEGAL ARGUMENTS
${answers.legal_arguments || '[Legal arguments with case law]'}

This application is filed within the limitation period prescribed under Section 34(3).

PRAYER
(a) Set aside the arbitral award dated ${answers.award_date || '[DATE]'};
(b) Pass such other order(s) as deemed fit.

${u.name} | ${u.org}
Date: ${today}`,

    'section-36': () => `IN THE ${(answers.court_name || 'HIGH COURT').toUpperCase()}

EXECUTION PETITION NO. _____ OF 2026
Under Section 36 of the Arbitration and Conciliation Act, 1996

${partyBlock(u, opp, ['DECREE HOLDER', 'JUDGMENT DEBTOR'])}

PETITION FOR ENFORCEMENT OF ARBITRAL AWARD

1. An arbitral award dated ${answers.award_date || '[DATE]'} was passed in Case No. ${caseId} awarding ₹${answers.award_amount || '[AMOUNT]'} in favour of the Petitioner.

2. STATUS OF CHALLENGE: ${answers.no_challenge || '[Status]'}

3. The award is enforceable as a decree of the Court under Section 36.

4. EXECUTION DIRECTIONS SOUGHT
${answers.execution_directions || '[Specific enforcement directions]'}

PRAYER
(a) Enforce the award as a decree;
(b) ${answers.execution_directions || 'Direct attachment and sale of Respondent assets'};
(c) Pass such other order(s) as deemed fit.

${u.name} | ${u.org}
Date: ${today}`,

    'settlement-agreement': () => `SETTLEMENT AGREEMENT
Under Section 30 of the Arbitration and Conciliation Act, 1996

Case No.: ${caseId}
Date: ${today}

BETWEEN:
${MOCK.users.claimant.name} (${MOCK.users.claimant.org}) ... Party 1
AND
${MOCK.users.respondent.name} (${MOCK.users.respondent.org}) ... Party 2

WHEREAS the parties are involved in arbitration proceedings and have agreed to settle the dispute on the following terms:

1. SETTLEMENT TERMS
${answers.settlement_terms || '[Agreed terms]'}

2. PAYMENT TERMS
${answers.payment_terms || '[Payment schedule]'}

3. OTHER OBLIGATIONS
${answers.other_obligations || '[Other obligations]'}

4. CONSEQUENCES OF BREACH
${answers.consequences_of_breach || '[Breach consequences]'}

5. The parties request the Arbitral Tribunal to record this settlement as an Arbitral Award on agreed terms under Section 30(2).

Party 1: ${MOCK.users.claimant.name}
Party 2: ${MOCK.users.respondent.name}
Date: ${today}`,

    'conciliation-request': () => `INVITATION TO CONCILIATE
Under Section 62 of the Arbitration and Conciliation Act, 1996 (Part III)

Date: ${today}

To,
${opp.name} | ${opp.org} | ${opp.address}

From,
${u.name} | ${u.org} | ${u.address}

Dear Sir/Madam,

The undersigned hereby invites you to conciliate the following dispute under Part III of the Arbitration and Conciliation Act, 1996:

1. DISPUTE
${answers.dispute_summary || '[Description of dispute]'}

2. PROPOSED CONCILIATOR
${answers.proposed_conciliator || '[Proposed conciliator]'}

3. VENUE: ${answers.proposed_venue || 'New Delhi'}

4. TIMELINE: ${answers.preferred_timeline || 'Within 60 days'}

Conciliation proceedings shall commence when you accept this invitation in writing (Section 62(2)).

${u.name} | ${u.org}`,
  };

  const fn = templates[templateId];
  return fn ? fn() : `[Draft template "${templateId}" — AI would generate a complete document based on your answers and applicable provisions of the Arbitration and Conciliation Act, 1996.]`;
}
