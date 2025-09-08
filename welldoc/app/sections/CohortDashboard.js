"use client";
import { useEffect, useMemo, useState } from "react";
import { mockPatients } from "../utils/mockData";
import { cacheGet, cacheSet, cacheRemoveByPrefix } from "../utils/cache";
import PatientCard from "../ui/PatientCard";
import RiskBadge from "../ui/RiskBadge";
import SimpleLineChart from "../viz/SimpleLineChart";

export default function CohortDashboard() {
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [patientsState, setPatientsState] = useState(mockPatients);

  // Fetch real risk from API and merge into patients
  useEffect(() => {
    const fetchRisk = async () => {
      try {
        setLoading(true);
        const updated = await Promise.all(
          patientsState.map(async (p) => {
            try {
              const cached = cacheGet(`risk:${p.id}`);
              if (cached) {
                return { ...p, risk: cached };
              }
              const res = await fetch("/api/backend/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(apiPayloadFromPatient(p)),
              });
              if (!res.ok) throw new Error("prediction failed");
              const data = await res.json();
              const risk = {
                ...p,
                risk: { probability: data.probability ?? p.risk.probability, level: data.risk_level ?? p.risk.level },
              }.risk;
              cacheSet(`risk:${p.id}`, risk, 6 * 60 * 60 * 1000); // 6h TTL
              return { ...p, risk };
            } catch {
              return p; // fallback to mock risk
            }
          })
        );
        setPatientsState(updated);
      } finally {
        setLoading(false);
      }
    };
    fetchRisk();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const patients = useMemo(() => {
    let list = [...patientsState];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
    }
    if (riskFilter !== "all") {
      list = list.filter((p) => p.risk.level.toLowerCase() === riskFilter);
    }
    return list.sort((a, b) => b.risk.probability - a.risk.probability);
  }, [patientsState, query, riskFilter]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const canCompare = selected.length === 2;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-xl font-semibold">Patient Cohort</h1>
        <div className="flex items-center gap-2 ml-auto">
          <input aria-label="Search patients" placeholder="Search by name or ID" value={query} onChange={(e)=>setQuery(e.target.value)} className="input" />
          <select aria-label="Filter by risk" className="input" value={riskFilter} onChange={(e)=>setRiskFilter(e.target.value)}>
            <option value="all">All risk</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="btn" aria-label="Export cohort as CSV" onClick={() => exportCsv(patients)}>
          Export CSV
        </button>
        <button className="btn" aria-label="Refresh risk cache" onClick={() => { cacheRemoveByPrefix('risk:'); window.location.reload(); }}>
          Refresh
        </button>
        <button
          className={`btn ${canCompare ? '' : 'opacity-40 pointer-events-none'}`}
          aria-label="Open comparison in new tab"
          onClick={() => {
            if (!canCompare) return;
            const url = `/compare?left=${selected[0]}&right=${selected[1]}`;
            window.open(url, '_blank');
          }}
        >
          Compare
        </button>
      </div>
      {loading && <div className="text-sm opacity-75">Loading risk scores…</div>}
      {!loading && patients.length === 0 && (
        <div className="text-sm opacity-75">No patients match your filters.</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="grid">
        {patients.map((p) => (
          <PatientCard
            key={p.id}
            patient={p}
            selected={selected.includes(p.id)}
            onSelect={() => toggleSelect(p.id)}
          />
        ))}
      </div>

      {canCompare && (
        <InlineCompare leftId={selected[0]} rightId={selected[1]} patients={patients} />
      )}
    </div>
  );
}

function InlineCompare({ leftId, rightId, patients }){
  const left = patients.find(p => p.id === leftId);
  const right = patients.find(p => p.id === rightId);
  if (!left || !right) return null;
  return (
    <div className="card">
      <div className="font-medium mb-2">Comparison</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[left, right].map((p) => (
          <div key={p.id} className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-black/60 dark:text-white/60">{p.id} • {p.age} • {p.gender}</div>
              </div>
              <RiskBadge level={p.risk.level} probability={p.risk.probability} />
            </div>
            <SimpleLineChart
              labels={p.vitals.dates}
              series={[
                { name: "WBC", data: p.vitals.wbc },
                { name: "Platelets", data: p.vitals.platelets },
              ]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function apiPayloadFromPatient(p){
  // Map mock patient into expected API features; placeholder defaults where data is not present
  const zero = 0;
  return {
    age_numeric: p.age,
    time_in_hospital: 3,
    num_lab_procedures: 10,
    num_procedures: 1,
    num_medications: 5,
    number_outpatient: 0,
    number_emergency: 0,
    number_inpatient: 0,
    number_diagnoses: 3,
    total_healthcare_encounters: 0,
    emergency_ratio: 0,
    inpatient_ratio: 0,
    medical_complexity_score: 1,
    short_stay: 0,
    long_stay: 0,
    total_medications_changed: 0,
    diabetes_managed: 1,
    race_encoded: 1,
    gender_encoded: p.gender === "Male" ? 0 : 1,
    payer_code_encoded: 1,
    medical_specialty_encoded: 1,
    max_glu_serum_encoded: 1,
    A1Cresult_encoded: 1,
    change_encoded: 1,
    diabetesMed_encoded: 1,
    diag_1_category_encoded: 3,
    diag_2_category_encoded: 2,
    diag_3_category_encoded: 1,
    metformin_binary: zero,
    repaglinide_binary: zero,
    nateglinide_binary: zero,
    chlorpropamide_binary: zero,
    glimepiride_binary: zero,
    acetohexamide_binary: zero,
    glipizide_binary: zero,
    glyburide_binary: zero,
    tolbutamide_binary: zero,
    pioglitazone_binary: zero,
    rosiglitazone_binary: zero,
    acarbose_binary: zero,
    miglitol_binary: zero,
    troglitazone_binary: zero,
    tolazamide_binary: zero,
    examide_binary: zero,
    citoglipton_binary: zero,
    insulin_binary: zero,
    "glyburide-metformin_binary": zero,
    "glipizide-metformin_binary": zero,
    "glimepiride-pioglitazone_binary": zero,
    "metformin-rosiglitazone_binary": zero,
    "metformin-pioglitazone_binary": zero
  };
}

function exportCsv(patients){
  const headers = ["id","name","age","gender","risk_level","risk_probability","wbc","hb","platelets"];
  const rows = patients.map(p => [
    p.id,
    p.name,
    p.age,
    p.gender,
    p.risk.level,
    p.risk.probability,
    p.vitals.wbc.at(-1),
    p.vitals.hb.at(-1),
    p.vitals.platelets.at(-1)
  ]);
  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cohort.csv';
  a.click();
  URL.revokeObjectURL(url);
}


