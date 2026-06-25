import React, { useMemo, useState } from "react";

export default function MagentaPrivacyAgentMockup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    account: "Metro Quebec Pilot",
    stage: "POC Qualification",
    region: "Quebec, Canada",
    country: "Canada",
    provinceState: "Quebec",
    tools: ["POS Video Integration", "Facial Matching"],
    purpose: "Loss Prevention",
    problemEvidence: "Shrink reports and incident logs available",
    identifiesPeople: "Yes",
    biometrics: "Yes",
    profiling: "Potentially",
    employeeMonitoring: "No",
    customerPrivacyMaturity: "Partial",
    signage: "Needs update",
    privacyOfficer: "Yes",
    piaCompleted: "No",
    storage: "Canada cloud with some U.S. support access",
    retention: "30 days",
  });

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const toggleTool = (tool) => {
    setForm((f) => ({
      ...f,
      tools: f.tools.includes(tool)
        ? f.tools.filter((t) => t !== tool)
        : [...f.tools, tool],
    }));
  };

  const result = useMemo(() => {
    let risk = 0;
    const laws = [];
    const actions = [];
    const warnings = [];

    if (form.country === "Canada") laws.push("PIPEDA");
    if (form.provinceState === "Quebec") laws.push("Bill 25");
    if (form.provinceState === "California") laws.push("CCPA");
    if (form.country === "European Union") laws.push("GDPR");

    if (form.identifiesPeople === "Yes") risk += 2;
    if (form.biometrics === "Yes") {
      risk += 3;
      actions.push("Confirm whether biometric processing is truly necessary for the stated purpose.");
      warnings.push("Biometric related use detected.");
    }
    if (form.profiling === "Yes" || form.profiling === "Potentially") {
      risk += 2;
      actions.push("Assess whether profiling or behavior prediction is taking place.");
    }
    if (form.tools.includes("POS Video Integration")) {
      risk += 2;
      warnings.push("Data combination risk from POS and video integration.");
    }
    if (form.tools.includes("LPR")) {
      risk += 2;
      warnings.push("Vehicle and plate data may increase identifiability risk.");
    }
    if (form.tools.includes("Audio Monitoring")) {
      risk += 3;
      warnings.push("Audio collection materially increases privacy sensitivity.");
    }
    if (form.employeeMonitoring === "Yes") {
      risk += 2;
      actions.push("Check labor and employee privacy implications before proceeding.");
    }
    if (form.piaCompleted === "No") {
      risk += 1;
      actions.push("Launch a PIA workflow before final deployment approval.");
    }
    if (form.signage !== "Adequate") {
      risk += 1;
      actions.push("Generate updated signage and customer disclosure language.");
    }
    if (form.storage.includes("U.S.")) {
      risk += 1;
      actions.push("Review cross border access and data transfer implications.");
    }

    let rating = "Low";
    if (risk >= 4) rating = "Medium";
    if (risk >= 7) rating = "High";

    const proceed = rating === "Low"
      ? "Proceed"
      : rating === "Medium"
      ? "Proceed with privacy checkpoint"
      : "Escalate before POC approval";

    const salesGuidance =
      rating === "High"
        ? "Position this as a narrowly defined security or incident investigation use case. Avoid describing it as broad tracking, profiling, or marketing intelligence."
        : rating === "Medium"
        ? "Keep the use case tightly tied to the documented business purpose and avoid expanding the scope during the sales cycle."
        : "Use standard security positioning while confirming notice, retention, and access controls.";

    return {
      risk,
      rating,
      laws: [...new Set(laws)],
      actions: [...new Set(actions)],
      warnings: [...new Set(warnings)],
      proceed,
      salesGuidance,
    };
  }, [form]);

  const Section = ({ title, children }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
      <div className="text-lg font-semibold text-slate-900">{title}</div>
      {children}
    </div>
  );

  const Pill = ({ children, active = false, onClick, tone = "slate" }) => {
    const tones = {
      slate: active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200",
      red: active ? "bg-red-600 text-white" : "bg-red-100 text-red-700 hover:bg-red-200",
      amber: active ? "bg-amber-500 text-white" : "bg-amber-100 text-amber-700 hover:bg-amber-200",
      green: active ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200",
      blue: active ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200",
      violet: active ? "bg-violet-600 text-white" : "bg-violet-100 text-violet-700 hover:bg-violet-200",
    };
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition ${tones[tone]}`}
      >
        {children}
      </button>
    );
  };

  const Select = ({ label, value, onChange, options }) => (
    <label className="block space-y-2">
      <div className="text-sm font-medium text-slate-800">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );

  const TextInput = ({ label, value, onChange }) => (
    <label className="block space-y-2">
      <div className="text-sm font-medium text-slate-800">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </label>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-slate-900 to-violet-900 rounded-3xl p-7 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="space-y-2">
              <div className="text-sm uppercase tracking-[0.2em] text-violet-200">Interactive simulation</div>
              <h1 className="text-3xl md:text-4xl font-bold">Magenta Privacy Agent</h1>
              <p className="text-slate-200 max-w-3xl">
                This is now a clickable prototype. It simulates how Magenta could work inside iHost when a quote triggers privacy review.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Pill tone="violet" active>Salesforce + iHost</Pill>
              <Pill tone="blue" active>North America v1</Pill>
              <Pill tone={result.rating === "High" ? "red" : result.rating === "Medium" ? "amber" : "green"} active>
                Current risk: {result.rating}
              </Pill>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((n) => (
            <Pill key={n} tone={step === n ? "violet" : "slate"} active={step === n} onClick={() => setStep(n)}>
              {n === 1 ? "Opportunity" : n === 2 ? "Risk intake" : n === 3 ? "Decision" : "Outputs"}
            </Pill>
          ))}
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={() => setStep((s) => Math.min(4, s + 1))}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Next
            </button>
          </div>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Section title="1. Opportunity context from Salesforce">
                <div className="grid md:grid-cols-2 gap-4">
                  <TextInput label="Account" value={form.account} onChange={(v) => update("account", v)} />
                  <Select label="Opportunity stage" value={form.stage} onChange={(v) => update("stage", v)} options={["Discovery", "Qualification", "POC Qualification", "Proposal", "Closing"]} />
                  <Select label="Country" value={form.country} onChange={(v) => update("country", v)} options={["Canada", "United States", "European Union"]} />
                  <Select label="Province or state" value={form.provinceState} onChange={(v) => update("provinceState", v)} options={["Quebec", "Ontario", "Alberta", "California", "Texas", "N/A"]} />
                </div>
              </Section>
            </div>
            <div>
              <Section title="Triggered tools in quote">
                <div className="flex flex-wrap gap-2">
                  {["POS Video Integration", "Facial Matching", "LPR", "Audio Monitoring", "Door Count", "Incident Search"].map((tool) => (
                    <Pill
                      key={tool}
                      tone={form.tools.includes(tool) ? "violet" : "slate"}
                      active={form.tools.includes(tool)}
                      onClick={() => toggleTool(tool)}
                    >
                      {tool}
                    </Pill>
                  ))}
                </div>
                <div className="text-sm text-slate-500 pt-2">
                  These simulate the products selected in iHost quoting.
                </div>
              </Section>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Section title="2. Guided risk intake">
              <div className="grid md:grid-cols-2 gap-4">
                <Select label="Primary purpose" value={form.purpose} onChange={(v) => update("purpose", v)} options={["Loss Prevention", "Safety", "Operational Analytics", "Customer Experience"]} />
                <TextInput label="Evidence of problem" value={form.problemEvidence} onChange={(v) => update("problemEvidence", v)} />
                <Select label="Does it identify people" value={form.identifiesPeople} onChange={(v) => update("identifiesPeople", v)} options={["Yes", "No", "Not sure"]} />
                <Select label="Biometrics involved" value={form.biometrics} onChange={(v) => update("biometrics", v)} options={["Yes", "No", "Not sure"]} />
                <Select label="Profiling or behavior prediction" value={form.profiling} onChange={(v) => update("profiling", v)} options={["Yes", "Potentially", "No"]} />
                <Select label="Employee monitoring" value={form.employeeMonitoring} onChange={(v) => update("employeeMonitoring", v)} options={["Yes", "No"]} />
              </div>
            </Section>
            <Section title="Customer privacy readiness">
              <div className="grid md:grid-cols-2 gap-4">
                <Select label="Privacy maturity" value={form.customerPrivacyMaturity} onChange={(v) => update("customerPrivacyMaturity", v)} options={["None", "Partial", "Strong"]} />
                <Select label="Signage" value={form.signage} onChange={(v) => update("signage", v)} options={["Adequate", "Needs update", "None"]} />
                <Select label="Privacy officer" value={form.privacyOfficer} onChange={(v) => update("privacyOfficer", v)} options={["Yes", "No", "Unknown"]} />
                <Select label="PIA completed" value={form.piaCompleted} onChange={(v) => update("piaCompleted", v)} options={["Yes", "No", "Unknown"]} />
                <TextInput label="Storage and access" value={form.storage} onChange={(v) => update("storage", v)} />
                <TextInput label="Retention" value={form.retention} onChange={(v) => update("retention", v)} />
              </div>
            </Section>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Section title="3. AI decision layer">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                    <div className="text-sm text-slate-500">Applicable laws</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">{result.laws.join(", ") || "None detected"}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                    <div className="text-sm text-slate-500">Risk points</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">{result.risk}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                    <div className="text-sm text-slate-500">Risk level</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">{result.rating}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                    <div className="text-sm text-slate-500">Decision</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">{result.proceed}</div>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl bg-slate-900 text-white p-5">
                  <div className="text-sm uppercase tracking-wide text-slate-300">Sales guidance</div>
                  <div className="mt-2 text-sm leading-6 text-slate-100">{result.salesGuidance}</div>
                </div>
              </Section>
            </div>
            <div>
              <Section title="Triggered concerns">
                <div className="space-y-3">
                  {result.warnings.length ? result.warnings.map((w) => (
                    <div key={w} className="rounded-2xl p-4 bg-amber-50 border border-amber-200 text-sm text-amber-900">
                      {w}
                    </div>
                  )) : (
                    <div className="rounded-2xl p-4 bg-green-50 border border-green-200 text-sm text-green-900">
                      No material warnings triggered.
                    </div>
                  )}
                </div>
              </Section>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Section title="4. Generated outputs">
                <div className="space-y-3">
                  {result.actions.map((a, i) => (
                    <div key={a} className="rounded-2xl border border-slate-200 p-4 bg-slate-50 text-sm text-slate-800">
                      {i + 1}. {a}
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="rounded-2xl border border-slate-200 p-4 bg-white">
                    <div className="font-semibold text-slate-900">Rep summary</div>
                    <div className="text-sm text-slate-600 mt-2">
                      Opportunity <span className="font-medium text-slate-900">{form.account}</span> is currently assessed as <span className="font-medium text-slate-900">{result.rating}</span> risk under <span className="font-medium text-slate-900">{result.laws.join(", ")}</span>. {result.proceed}.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4 bg-white">
                    <div className="font-semibold text-slate-900">Customer ready document</div>
                    <div className="text-sm text-slate-600 mt-2">
                      Generate signage guidance, a privacy checkpoint summary, and a PIA starter pack before moving to full POC.
                    </div>
                  </div>
                </div>
              </Section>
            </div>
            <div>
              <Section title="Simulated actions">
                <div className="space-y-3 text-sm">
                  <button className="w-full rounded-2xl bg-slate-900 text-white px-4 py-3 text-left hover:bg-slate-800">
                    Push summary to Salesforce opportunity
                  </button>
                  <button className="w-full rounded-2xl bg-violet-600 text-white px-4 py-3 text-left hover:bg-violet-500">
                    Open PIA workflow in iHost
                  </button>
                  <button className="w-full rounded-2xl bg-blue-600 text-white px-4 py-3 text-left hover:bg-blue-500">
                    Generate signage guidance
                  </button>
                  <button className="w-full rounded-2xl bg-amber-500 text-white px-4 py-3 text-left hover:bg-amber-400">
                    Notify Privacy and PM team
                  </button>
                </div>
                <div className="text-xs text-slate-500 pt-3">
                  These buttons simulate workflow actions. In a real build they would call APIs in Salesforce, iHost, Automatica, or your document systems.
                </div>
              </Section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
