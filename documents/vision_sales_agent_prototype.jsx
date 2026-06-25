import React, { useMemo, useState } from "react";

const i3 = {
  navy: "#0E4C6D",
  teal: "#1C8A8A",
  aqua: "#A9D6D9",
  light: "#F4F8F9",
  dark: "#12313F",
};

const STAGES = [
  "Dashboard",
  "Admin Setup",
  "Onboarding",
  "Prospecting",
  "Presentation",
  "POC",
  "Legal & Privacy",
  "Closing",
];

const SEGMENTS = [
  "Grocery",
  "Retail",
  "QSR",
  "Commercial",
  "Schools",
  "Integrator",
  "Healthcare",
];

const PERSONA_MAP = {
  Grocery: ["VP Asset Protection", "Director of Operations", "IT Director", "Loss Prevention Manager", "Store Operations Leader"],
  Retail: ["VP Asset Protection", "Director of Retail Operations", "IT Director", "Loss Prevention Director", "Regional Manager"],
  QSR: ["VP Operations", "Director of Loss Prevention", "IT Director", "Franchise Operations Leader", "Facilities Leader"],
  Commercial: ["Security Director", "Operations Director", "IT Manager", "Risk Manager", "Facilities Director"],
  Schools: ["Superintendent", "Director of Security", "IT Director", "Principal", "Facilities Director"],
  Integrator: ["Owner", "VP Sales", "Technical Director", "Solutions Architect", "Operations Lead"],
  Healthcare: ["Security Director", "Director of Operations", "IT Director", "Compliance Leader", "Facilities Director"],
};

function Card({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-3xl shadow-sm border border-slate-200 ${className}`}>
      <div className="px-5 pt-5 pb-3 text-slate-900 font-semibold text-lg">{title}</div>
      <div className="px-5 pb-5">{children}</div>
    </div>
  );
}

function Metric({ label, value, tone = "default", onClick }) {
  const styles = {
    default: "bg-slate-50 border-slate-200 text-slate-900",
    good: "bg-emerald-50 border-emerald-200 text-emerald-900",
    warn: "bg-amber-50 border-amber-200 text-amber-900",
    risk: "bg-rose-50 border-rose-200 text-rose-900",
    info: "bg-cyan-50 border-cyan-200 text-cyan-900",
  };
  return (
    <button onClick={onClick} className={`rounded-2xl border p-4 text-left w-full ${styles[tone]}`}>
      <div className="text-xs uppercase tracking-wide opacity-70">{label}</div>
      <div className="text-xl font-bold mt-1">{value}</div>
    </button>
  );
}

function TextField({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="block space-y-2">
      <div className="text-sm font-medium text-slate-800">{label}</div>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2" />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 4, placeholder = "" }) {
  return (
    <label className="block space-y-2">
      <div className="text-sm font-medium text-slate-800">{label}</div>
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2" />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block space-y-2">
      <div className="text-sm font-medium text-slate-800">{label}</div>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2">
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export default function VisionSalesAgentPrototype() {
  const [stage, setStage] = useState("Dashboard");
  const [agentVoice, setAgentVoice] = useState("Good morning. I reviewed your pipeline and built your highest priority actions for today.");

  const [admin, setAdmin] = useState({
    employee: "Avery Chen",
    role: "Business Development Manager",
    segment: "Grocery",
    territory: "Quebec and Atlantic Canada",
    annualGoal: "$4.5M revenue",
    manager: "David Crook",
    responsibilities: "Drive pipeline, run presentations, move qualified accounts into POC.",
    linkedin: "linkedin.com/in/averychen",
  });

  const [deal, setDeal] = useState({
    repName: "Avery Chen",
    account: "Metro Quebec Pilot",
    segment: "Grocery",
    region: "Quebec, Canada",
    objective: "Shorten sales cycle and validate privacy readiness for a retail pilot.",
    monthlyGoal: "$375K",
    commitments: "3 presentations, 1 POC, 8 new prospect meetings",
    pipeline: "$1.2M active",
    orders: "$180K booked",
  });

  const [onboarding, setOnboarding] = useState({
    experience: "New Hire",
    trainingWeek: "Week 2",
    mentorsMet: "2",
    confidence: "6",
    learned: "Product positioning, grocery pain points, and demo flow.",
    challenge: "Linking solution features to real operator outcomes.",
    linkedinAssessment: "Needs stronger point of view on grocery, fewer generic posts, more proof and segment relevance.",
  });

  const [prospecting, setProspecting] = useState({
    targetProblem: "ORC, shrink, and limited store visibility",
    intentSignals: "Visited retail safety page, opened two emails, viewed AI analytics deck",
    outreachStyle: "Insight-led",
    recommendedAudience: PERSONA_MAP[deal.segment],
    nextDayAction: "Call Director of Operations first, send tailored note to VP Asset Protection, and route social proof to IT Director.",
  });

  const [presentation, setPresentation] = useState({
    audience: "VP AP, Director of Ops, IT Manager",
    meetingGoal: "Get agreement for a scoped pilot and executive walkthrough",
    objections: "Budget, privacy concerns, integration effort",
    transcript: "Customer said they want fewer disconnected systems, stronger ORC visibility, and a pilot that proves value before rollout. IT wants clear scope. Operations wants reporting that managers can actually use.",
  });

  const [poc, setPoc] = useState({
    site: "Toronto terminal",
    successMetrics: "Incident capture, measurable safety insights, operator adoption",
    duration: "45 days",
    blockers: "Need exact scope and approved validation criteria",
    supporters: [
      { name: "Chris Lytwtn", title: "IT Director", email: "chris@example.com" },
      { name: "Dana Brooks", title: "Operations Leader", email: "dana@example.com" },
    ],
    generated: false,
  });

  const [legal, setLegal] = useState({
    jurisdiction: "Quebec, Canada",
    purpose: "Loss prevention and incident investigation",
    identifiesPeople: "Yes",
    biometrics: "Yes",
    profiling: "Potentially",
    signage: "Needs update",
    dataResidency: "Canada cloud with some U.S. support access",
    privacyOfficer: "Unknown",
    evidence: "Shrink data, repeat incidents, and internal case logs",
  });

  const [closing, setClosing] = useState({
    commercialGoal: "Move from pilot to phased rollout",
    pricePosition: "Value and scalability",
    competitiveRisk: "High cost incumbent and privacy hesitation",
    nextCommitment: "Executive review and commercial checkpoint",
  });

  const personaSuggestions = useMemo(() => PERSONA_MAP[deal.segment] || [], [deal.segment]);

  const onboardingResult = useMemo(() => {
    const confidence = Number(onboarding.confidence || 0);
    const readiness = confidence >= 8 ? "Ready for live calls" : confidence >= 6 ? "Needs guided reps" : "Needs more structure";
    const actions = [];
    if (Number(onboarding.mentorsMet) < 3) actions.push("Schedule more mentor shadowing before independent outreach.");
    if (confidence < 7) actions.push("Assign role-play session with manager and product specialist.");
    actions.push("Set meeting with marketing to tighten LinkedIn presence and segment relevance.");
    actions.push("Recommend associations and social channels aligned to the assigned market.");
    return { readiness, actions };
  }, [onboarding]);

  const linkedinPlan = useMemo(() => {
    return [
      `Rewrite headline so it clearly supports the ${admin.segment} segment and territory.` ,
      "Add 3 proof points tied to real operator or retailer outcomes.",
      "Pin one post that explains i3's practical market value, not just features.",
      "Meet with marketing to create a simple 30-day social relevance plan.",
      `Join associations, groups, and events where ${admin.segment} buyers already spend time.`
    ];
  }, [admin.segment]);

  const prospectingResult = useMemo(() => {
    const signals = prospecting.intentSignals.toLowerCase();
    const score = ["visited", "opened", "viewed", "downloaded", "demo"].filter((x) => signals.includes(x)).length * 18 + 28;
    const intensity = score >= 80 ? "Hot" : score >= 60 ? "Warm" : "Cold";
    const message = intensity === "Hot"
      ? `The account is showing strong intent. Go multi-threaded. Start with ${personaSuggestions[0] || "the lead contact"}, then map the buying group and assign follow-up by role.`
      : intensity === "Warm"
      ? `Keep momentum with a role-specific follow-up sequence and one useful insight per persona.`
      : `This account needs nurture and more proof before direct push.`;
    return { score: Math.min(score, 96), intensity, message };
  }, [prospecting, personaSuggestions]);

  const generatedPOC = useMemo(() => {
    const names = poc.supporters.filter((s) => s.name && s.title).map((s) => `${s.name}, ${s.title}`).join("; ");
    return `POC Summary\nSite: ${poc.site}\nObjective: Validate ${presentation.transcript.includes("ORC") ? "visibility and operational value" : "solution fit"} through a ${poc.duration} pilot.\nCustomer Drivers: ${presentation.transcript}\nSuccess Metrics: ${poc.successMetrics}\nSupport Team: ${names || "Add named supporters before launch"}\nBlockers: ${poc.blockers}\nRecommended Next Step: handoff to PM agent to formalize scope, timeline, cybersecurity forms, and stakeholder approvals.`;
  }, [poc, presentation]);

  const riskResult = useMemo(() => {
    let score = 0;
    const laws = [];
    const nextSteps = [];
    const warnings = [];
    if (legal.jurisdiction.includes("Quebec")) laws.push("Bill 25");
    if (legal.jurisdiction.includes("Canada")) laws.push("PIPEDA");
    if (legal.identifiesPeople === "Yes") score += 2;
    if (legal.biometrics === "Yes") { score += 3; warnings.push("Biometric processing detected."); nextSteps.push("Confirm whether biometric processing is actually necessary for the stated purpose."); }
    if (legal.profiling === "Potentially") { score += 2; warnings.push("Profiling risk may exist because data sets are being combined."); nextSteps.push("Run the four-part necessity and proportionality test on this exact use case."); }
    if (legal.signage !== "Adequate") { score += 1; nextSteps.push("Generate updated signage and transparency language before launch."); }
    if (legal.dataResidency.includes("U.S.")) { score += 1; warnings.push("Cross-border support access needs review."); nextSteps.push("Review cross-border data access and document support roles."); }
    if (legal.privacyOfficer === "Unknown") nextSteps.push("Confirm privacy owner before POC starts.");
    nextSteps.push("Store all notes, stakeholders, and legal answers back to Salesforce and i3-owned records.");
    const level = score >= 7 ? "High" : score >= 4 ? "Medium" : "Low";
    const decision = level === "High" ? "Escalate before POC approval" : level === "Medium" ? "Proceed with privacy checkpoint" : "Proceed with standard controls";
    return { score, laws, nextSteps, warnings, level, decision };
  }, [legal]);

  const dashboardActions = [
    "Call 3 highest-intent accounts before noon",
    "Advance 1 presentation to a scoped POC",
    "Review legal checkpoints on 1 active deal",
    "Complete weekly reflection and update next-day plan",
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: i3.light, color: i3.dark }}>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="rounded-[32px] text-white p-8 shadow-lg" style={{ background: `linear-gradient(135deg, ${i3.navy}, ${i3.teal})` }}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">V</div>
                <div>
                  <div className="text-sm uppercase tracking-[0.25em] text-white/70">i3 Host Internal Agent</div>
                  <h1 className="text-4xl font-bold tracking-tight">VISION</h1>
                </div>
              </div>
              <p className="max-w-3xl text-white/90 text-lg leading-7">Your internal sales agent to guide reps and approved partners by stage, protect company knowledge, and move deals faster from lead to close.</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-3xl p-5 min-w-[320px]">
              <div className="text-sm text-white/75">Agent voice simulation</div>
              <div className="text-base font-semibold mt-2 leading-6">“{agentVoice}”</div>
            </div>
          </div>
        </div>

        <Card title="Navigation">
          <div className="flex flex-wrap gap-2">
            {STAGES.map((s) => (
              <button key={s} onClick={() => setStage(s)} className={`rounded-2xl px-4 py-3 text-sm font-semibold border ${stage === s ? "text-white border-transparent" : "bg-white text-slate-700 border-slate-200"}`} style={stage === s ? { backgroundColor: i3.teal } : {}}>{s}</button>
            ))}
          </div>
        </Card>

        {stage === "Dashboard" && (
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="space-y-6">
              <Card title="Salesperson dashboard">
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                  <Metric label="Goal this month" value={deal.monthlyGoal} tone="info" onClick={() => setAgentVoice("Your monthly goal is behind pace. Start with the accounts showing the highest buying intent today.")} />
                  <Metric label="Commitments" value={deal.commitments} tone="good" onClick={() => setStage("Presentation")} />
                  <Metric label="Pipeline" value={deal.pipeline} tone="default" onClick={() => setStage("Prospecting")} />
                  <Metric label="Orders booked" value={deal.orders} tone="warn" onClick={() => setStage("Closing")} />
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <Metric label="Today's leads" value="12" onClick={() => { setStage("Prospecting"); setAgentVoice("I ranked your leads by intent and suggested the best buying group to target first."); }} />
                  <Metric label="Active presentations" value="4" onClick={() => { setStage("Presentation"); setAgentVoice("I prepared your presentation path and the transcript-to-POC workflow."); }} />
                  <Metric label="Active POCs" value="2" onClick={() => { setStage("POC"); setAgentVoice("I can help you convert presentation notes into a POC plan and prepare the PM handoff."); }} />
                </div>
              </Card>
              <Card title="What VISION says to do today">
                <ul className="space-y-3 text-sm text-slate-700 list-disc pl-5">
                  {dashboardActions.map((a) => <li key={a}>{a}</li>)}
                </ul>
              </Card>
            </div>
            <div className="space-y-6">
              <Card title="Company control">
                <div className="text-sm text-slate-700 leading-6">Everything entered into VISION is treated as proprietary company knowledge. The purpose is to push clean, structured information into Salesforce and i3-owned systems so no deal knowledge walks away with the rep.</div>
              </Card>
              <Card title="Fast paths">
                <div className="space-y-3">
                  <button onClick={() => setStage("Admin Setup")} className="w-full rounded-2xl px-4 py-3 text-left text-white font-semibold" style={{ backgroundColor: i3.navy }}>Open new employee setup</button>
                  <button onClick={() => setStage("Prospecting")} className="w-full rounded-2xl px-4 py-3 text-left text-white font-semibold" style={{ backgroundColor: i3.teal }}>Open lead engine</button>
                  <button onClick={() => setStage("Legal & Privacy")} className="w-full rounded-2xl px-4 py-3 text-left text-white font-semibold" style={{ backgroundColor: "#b45309" }}>Open legal and privacy agent</button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {stage === "Admin Setup" && (
          <Card title="Administrator setup for a new salesperson">
            <div className="grid md:grid-cols-2 gap-4">
              <TextField label="Employee" value={admin.employee} onChange={(v) => setAdmin({ ...admin, employee: v })} />
              <TextField label="Role" value={admin.role} onChange={(v) => setAdmin({ ...admin, role: v })} />
              <SelectField label="Segment" value={admin.segment} onChange={(v) => { setAdmin({ ...admin, segment: v }); setDeal({ ...deal, segment: v }); }} options={SEGMENTS} />
              <TextField label="Territory" value={admin.territory} onChange={(v) => setAdmin({ ...admin, territory: v })} />
              <TextField label="Annual goal" value={admin.annualGoal} onChange={(v) => setAdmin({ ...admin, annualGoal: v })} />
              <TextField label="Manager" value={admin.manager} onChange={(v) => setAdmin({ ...admin, manager: v })} />
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <TextArea label="Responsibilities" value={admin.responsibilities} onChange={(v) => setAdmin({ ...admin, responsibilities: v })} rows={4} />
              <TextField label="LinkedIn profile" value={admin.linkedin} onChange={(v) => setAdmin({ ...admin, linkedin: v })} />
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <Metric label="System result" value="Workflow generated" tone="good" onClick={() => setAgentVoice("The administrator setup is complete. I can now guide this rep daily based on segment, territory, and goals.")} />
              <Metric label="Recommended next screen" value="Onboarding dashboard" onClick={() => setStage("Onboarding")} />
            </div>
          </Card>
        )}

        {stage === "Onboarding" && (
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <Card title="Onboarding and LinkedIn readiness">
              <div className="grid md:grid-cols-2 gap-4">
                <SelectField label="Experience level" value={onboarding.experience} onChange={(v) => setOnboarding({ ...onboarding, experience: v })} options={["New Hire", "Mid-Level", "Veteran", "Partner"]} />
                <TextField label="Training week" value={onboarding.trainingWeek} onChange={(v) => setOnboarding({ ...onboarding, trainingWeek: v })} />
                <TextField label="Mentors met" value={onboarding.mentorsMet} onChange={(v) => setOnboarding({ ...onboarding, mentorsMet: v })} />
                <TextField label="Confidence score out of 10" value={onboarding.confidence} onChange={(v) => setOnboarding({ ...onboarding, confidence: v })} />
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <TextArea label="What the rep learned" value={onboarding.learned} onChange={(v) => setOnboarding({ ...onboarding, learned: v })} rows={4} />
                <TextArea label="Main challenge" value={onboarding.challenge} onChange={(v) => setOnboarding({ ...onboarding, challenge: v })} rows={4} />
              </div>
              <div className="mt-4">
                <TextArea label="LinkedIn assessment" value={onboarding.linkedinAssessment} onChange={(v) => setOnboarding({ ...onboarding, linkedinAssessment: v })} rows={4} />
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-5">
                <Metric label="Readiness" value={onboardingResult.readiness} tone={onboardingResult.readiness === "Ready for live calls" ? "good" : onboardingResult.readiness === "Needs guided reps" ? "warn" : "risk"} />
                <Metric label="Next step" value="Marketing image review" onClick={() => setAgentVoice("I recommend a meeting with marketing to improve segment relevance, social proof, and online trust signals.")} />
              </div>
            </Card>
            <Card title="Recommended actions">
              <ul className="space-y-3 text-sm text-slate-700 list-disc pl-5">
                {onboardingResult.actions.map((a) => <li key={a}>{a}</li>)}
              </ul>
              <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="font-semibold text-slate-900">LinkedIn and relevance plan</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc pl-5">
                  {linkedinPlan.map((a) => <li key={a}>{a}</li>)}
                </ul>
              </div>
            </Card>
          </div>
        )}

        {stage === "Prospecting" && (
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <Card title="Lead engine and buying group guidance">
              <div className="grid md:grid-cols-2 gap-4">
                <SelectField label="Segment" value={deal.segment} onChange={(v) => setDeal({ ...deal, segment: v })} options={SEGMENTS} />
                <SelectField label="Outreach style" value={prospecting.outreachStyle} onChange={(v) => setProspecting({ ...prospecting, outreachStyle: v })} options={["Insight-led", "Technical", "Executive", "Problem-first"]} />
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <TextArea label="Target problem" value={prospecting.targetProblem} onChange={(v) => setProspecting({ ...prospecting, targetProblem: v })} rows={4} />
                <TextArea label="Intent signals from ZoomInfo and 6sense" value={prospecting.intentSignals} onChange={(v) => setProspecting({ ...prospecting, intentSignals: v })} rows={4} />
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-5">
                <Metric label="Intent score" value={`${prospectingResult.score}/100`} tone={prospectingResult.intensity === "Hot" ? "good" : prospectingResult.intensity === "Warm" ? "warn" : "default"} />
                <Metric label="Lead status" value={prospectingResult.intensity} tone={prospectingResult.intensity === "Hot" ? "good" : prospectingResult.intensity === "Warm" ? "warn" : "default"} />
                <Metric label="Next-day action" value="Ready" tone="info" onClick={() => setAgentVoice(prospecting.nextDayAction)} />
              </div>
              <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 leading-6">{prospectingResult.message}</div>
            </Card>
            <Card title="Suggested buying group for this segment">
              <ul className="space-y-3 text-sm text-slate-700 list-disc pl-5">
                {personaSuggestions.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 leading-6">VISION should not target just one person. It should suggest the full decision map, route content by role, and tell the rep who to contact first, second, and third.</div>
            </Card>
          </div>
        )}

        {stage === "Presentation" && (
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <Card title="Presentation stage and transcript capture">
              <div className="grid md:grid-cols-2 gap-4">
                <TextField label="Audience" value={presentation.audience} onChange={(v) => setPresentation({ ...presentation, audience: v })} />
                <TextField label="Meeting goal" value={presentation.meetingGoal} onChange={(v) => setPresentation({ ...presentation, meetingGoal: v })} />
              </div>
              <div className="mt-4">
                <TextArea label="Likely objections" value={presentation.objections} onChange={(v) => setPresentation({ ...presentation, objections: v })} rows={4} />
              </div>
              <div className="mt-4">
                <TextArea label="Presentation transcript or meeting notes" value={presentation.transcript} onChange={(v) => setPresentation({ ...presentation, transcript: v })} rows={6} />
              </div>
              <div className="mt-4 flex gap-3 flex-wrap">
                <button onClick={() => setAgentVoice("I reviewed the presentation notes. I can now build the draft proof of concept and show you what the PM handoff could look like.")} className="rounded-2xl px-4 py-3 text-white font-semibold" style={{ backgroundColor: i3.teal }}>Analyze transcript</button>
                <button onClick={() => { setStage("POC"); setPoc({ ...poc, generated: true }); }} className="rounded-2xl px-4 py-3 text-white font-semibold" style={{ backgroundColor: i3.navy }}>Generate draft POC</button>
              </div>
            </Card>
            <Card title="Transcript to POC preview">
              <div className="text-sm text-slate-700 leading-6">This simulation shows how presentation transcripts become structured POC input instead of getting lost in email or personal notes.</div>
              <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 whitespace-pre-wrap text-sm text-slate-700">{generatedPOC}</div>
            </Card>
          </div>
        )}

        {stage === "POC" && (
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <Card title="POC builder and PM handoff">
              <div className="grid md:grid-cols-2 gap-4">
                <TextField label="Site or pilot location" value={poc.site} onChange={(v) => setPoc({ ...poc, site: v })} />
                <TextField label="Pilot duration" value={poc.duration} onChange={(v) => setPoc({ ...poc, duration: v })} />
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <TextArea label="Success metrics" value={poc.successMetrics} onChange={(v) => setPoc({ ...poc, successMetrics: v })} rows={4} />
                <TextArea label="Current blocker" value={poc.blockers} onChange={(v) => setPoc({ ...poc, blockers: v })} rows={4} />
              </div>
              <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="font-semibold text-slate-900">POC supporters and named stakeholders</div>
                <div className="space-y-3 mt-3">
                  {poc.supporters.map((s, idx) => (
                    <div key={idx} className="grid md:grid-cols-3 gap-3">
                      <TextField label="Name" value={s.name} onChange={(v) => { const next = [...poc.supporters]; next[idx].name = v; setPoc({ ...poc, supporters: next }); }} />
                      <TextField label="Title" value={s.title} onChange={(v) => { const next = [...poc.supporters]; next[idx].title = v; setPoc({ ...poc, supporters: next }); }} />
                      <TextField label="Email" value={s.email} onChange={(v) => { const next = [...poc.supporters]; next[idx].email = v; setPoc({ ...poc, supporters: next }); }} />
                    </div>
                  ))}
                </div>
                <button onClick={() => setPoc({ ...poc, supporters: [...poc.supporters, { name: "", title: "", email: "" }] })} className="mt-4 rounded-2xl px-4 py-3 text-white font-semibold" style={{ backgroundColor: i3.teal }}>Add supporter</button>
              </div>
            </Card>
            <Card title="Generated POC preview">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 whitespace-pre-wrap text-sm text-slate-700">{generatedPOC}</div>
              <div className="mt-4 flex gap-3 flex-wrap">
                <button onClick={() => setAgentVoice("The POC draft is ready. Next, route it to the PM agent so scope, timeline, cybersecurity forms, and implementation tasks stay on track.")} className="rounded-2xl px-4 py-3 text-white font-semibold" style={{ backgroundColor: i3.navy }}>Simulate PM handoff</button>
                <button className="rounded-2xl px-4 py-3 text-white font-semibold" style={{ backgroundColor: "#166534" }}>Push structured notes to Salesforce</button>
              </div>
            </Card>
          </div>
        )}

        {stage === "Legal & Privacy" && (
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <Card title="V-Guard: Privacy and legal simulation">
              <div className="grid md:grid-cols-2 gap-4">
                <TextField label="Jurisdiction" value={legal.jurisdiction} onChange={(v) => setLegal({ ...legal, jurisdiction: v })} />
                <TextField label="Business purpose" value={legal.purpose} onChange={(v) => setLegal({ ...legal, purpose: v })} />
                <SelectField label="Identifies people" value={legal.identifiesPeople} onChange={(v) => setLegal({ ...legal, identifiesPeople: v })} options={["Yes", "No", "Not sure"]} />
                <SelectField label="Biometrics involved" value={legal.biometrics} onChange={(v) => setLegal({ ...legal, biometrics: v })} options={["Yes", "No", "Not sure"]} />
                <SelectField label="Profiling risk" value={legal.profiling} onChange={(v) => setLegal({ ...legal, profiling: v })} options={["No", "Potentially", "Yes"]} />
                <SelectField label="Signage status" value={legal.signage} onChange={(v) => setLegal({ ...legal, signage: v })} options={["Adequate", "Needs update", "None"]} />
                <TextField label="Data residency and access" value={legal.dataResidency} onChange={(v) => setLegal({ ...legal, dataResidency: v })} />
                <SelectField label="Privacy officer" value={legal.privacyOfficer} onChange={(v) => setLegal({ ...legal, privacyOfficer: v })} options={["Yes", "No", "Unknown"]} />
              </div>
              <div className="mt-4"><TextArea label="Evidence supporting necessity" value={legal.evidence} onChange={(v) => setLegal({ ...legal, evidence: v })} rows={4} /></div>
              <div className="grid md:grid-cols-4 gap-4 mt-5">
                <Metric label="Applicable laws" value={riskResult.laws.join(", ") || "None"} />
                <Metric label="Risk points" value={String(riskResult.score)} tone={riskResult.level === "High" ? "risk" : riskResult.level === "Medium" ? "warn" : "good"} />
                <Metric label="Risk level" value={riskResult.level} tone={riskResult.level === "High" ? "risk" : riskResult.level === "Medium" ? "warn" : "good"} />
                <Metric label="Decision" value={riskResult.decision} tone={riskResult.level === "High" ? "risk" : riskResult.level === "Medium" ? "warn" : "good"} />
              </div>
            </Card>
            <Card title="Required next steps">
              <ul className="space-y-3 text-sm text-slate-700 list-disc pl-5">
                {riskResult.nextSteps.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </Card>
          </div>
        )}

        {stage === "Closing" && (
          <Card title="Commercial close simulation">
            <div className="grid md:grid-cols-2 gap-4">
              <TextField label="Commercial goal" value={closing.commercialGoal} onChange={(v) => setClosing({ ...closing, commercialGoal: v })} />
              <TextField label="Price position" value={closing.pricePosition} onChange={(v) => setClosing({ ...closing, pricePosition: v })} />
              <TextArea label="Competitive risk" value={closing.competitiveRisk} onChange={(v) => setClosing({ ...closing, competitiveRisk: v })} rows={4} />
              <TextArea label="Next commitment" value={closing.nextCommitment} onChange={(v) => setClosing({ ...closing, nextCommitment: v })} rows={4} />
            </div>
            <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 leading-6">VISION should use the earlier stages to arrive here with clean documentation, named stakeholders, legal answers, and commercial clarity already captured. Closing should feel like the final controlled step, not a scramble.</div>
          </Card>
        )}
      </div>
    </div>
  );
}
