import { mockPatients } from "../utils/mockData";

function ProgressBar({ value }) {
  return (
    <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded">
      <div className="h-2 bg-blue-600 rounded" style={{ width: `${value}%` }} />
    </div>
  );
}

export default function ScenariosPage() {
  const patient = mockPatients[0];
  const roadmap = [
    { title: "Confirm Diagnosis", status: "Completed", category: "Diagnosis", priority: "High", duration: "1d", owner: "Dr. A", justification: "Peripheral smear, bone marrow biopsy", done: 100 },
    { title: "Initiate Induction", status: "In Progress", category: "Treatment", priority: "High", duration: "7d", owner: "Dr. B", justification: "7+3 regimen per NCCN", done: 60 },
    { title: "Monitor Tumor Lysis", status: "Pending", category: "Monitoring", priority: "Medium", duration: "3d", owner: "RN Team", justification: "LDH, uric acid trending", done: 0 },
  ];

  const progress = Math.round(roadmap.reduce((s, r) => s + r.done, 0) / roadmap.length);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Enhanced Patient Scenario</h1>
      <div className="card">
        <div className="font-medium">{patient.name} ({patient.id})</div>
        <div className="text-sm text-black/60 dark:text-white/60">Chief complaints: Fatigue, pallor. Family history: Negative. Lifestyle: Non-smoker.</div>
      </div>
      <div className="card space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-medium">Physician Treatment Roadmap</div>
          <div className="w-48"><ProgressBar value={progress} /></div>
        </div>
        <div className="space-y-2">
          {roadmap.map((step, i) => (
            <div key={i} className="border border-black/10 dark:border-white/10 rounded p-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">{step.title}</div>
                <span className="text-xs opacity-75">{step.status}</span>
              </div>
              <div className="text-xs opacity-75">{step.category} • Priority: {step.priority} • ETA: {step.duration} • Owner: {step.owner}</div>
              <div className="text-sm mt-1">{step.justification}</div>
              <div className="mt-2"><ProgressBar value={step.done} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


