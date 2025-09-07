"use client";
import { useEffect, useMemo, useState } from "react";
import { cacheGet, cacheSet } from "../utils/cache";

const API = "/api/backend";

const REQUIRED = [
  "age_numeric","time_in_hospital","num_lab_procedures","num_procedures","num_medications","number_outpatient","number_emergency","number_inpatient","number_diagnoses","total_healthcare_encounters","emergency_ratio","inpatient_ratio","medical_complexity_score","short_stay","long_stay","total_medications_changed","diabetes_managed","race_encoded","gender_encoded","payer_code_encoded","medical_specialty_encoded","max_glu_serum_encoded","A1Cresult_encoded","change_encoded","diabetesMed_encoded","diag_1_category_encoded","diag_2_category_encoded","diag_3_category_encoded","metformin_binary","repaglinide_binary","nateglinide_binary","chlorpropamide_binary","glimepiride_binary","acetohexamide_binary","glipizide_binary","glyburide_binary","tolbutamide_binary","pioglitazone_binary","rosiglitazone_binary","acarbose_binary","miglitol_binary","troglitazone_binary","tolazamide_binary","examide_binary","citoglipton_binary","insulin_binary","glyburide-metformin_binary","glipizide-metformin_binary","glimepiride-pioglitazone_binary","metformin-rosiglitazone_binary","metformin-pioglitazone_binary"
];

export default function PredictPage(){
  const [form, setForm] = useState(()=>{
    const cached = cacheGet("predict:form");
    if (cached) return cached;
    const initial = {};
    REQUIRED.forEach(k => { initial[k] = 0; });
    initial.age_numeric = 50;
    initial.time_in_hospital = 3;
    initial.gender_encoded = 0;
    initial.diabetes_managed = 1;
    return initial;
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [health, setHealth] = useState({ status: "unknown", model_loaded: false, message: "" });

  useEffect(()=>{ cacheSet("predict:form", form, 24*60*60*1000); }, [form]);

  const onChange = (k, v) => {
    setForm((f) => ({ ...f, [k]: Number(v) }));
  };

  const checkHealth = async () => {
    try {
      // Test basic connectivity first
      const testRes = await fetch(`${API}/test`);
      if (!testRes.ok) throw new Error(`Test failed: ${testRes.status}`);
      
      // Then check health
      const res = await fetch(`${API}/health`);
      const data = await res.json();
      setHealth(data);
    } catch (e) {
      setHealth({ status: "unreachable", model_loaded: false, message: String(e?.message || "API unreachable") });
    }
  };

  useEffect(()=>{ checkHealth(); }, []);

  const submit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API}/predict`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) {
        let detailText = "";
        try { detailText = await res.text(); } catch {}
        let detail = detailText;
        try { const err = JSON.parse(detailText); detail = err?.detail || err?.error || JSON.stringify(err); } catch {}
        throw new Error(detail || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (e) {
      const msg = typeof e === 'string' ? e : (e?.message || JSON.stringify(e));
      setResult({ error: `Prediction failed: ${msg}` });
    } finally {
      setLoading(false);
    }
  };

  const grouped = useMemo(()=>{
    const groups = [
      { title: "Demographics & Stay", keys: ["age_numeric","time_in_hospital","number_diagnoses","total_healthcare_encounters","short_stay","long_stay"] },
      { title: "Encounters & Meds", keys: ["num_lab_procedures","num_procedures","num_medications","number_outpatient","number_emergency","number_inpatient","total_medications_changed"] },
      { title: "Ratios & Scores", keys: ["emergency_ratio","inpatient_ratio","medical_complexity_score"] },
      { title: "Encodings", keys: ["race_encoded","gender_encoded","payer_code_encoded","medical_specialty_encoded","max_glu_serum_encoded","A1Cresult_encoded","change_encoded","diabetesMed_encoded","diag_1_category_encoded","diag_2_category_encoded","diag_3_category_encoded"] },
      { title: "Meds Binary", keys: ["metformin_binary","repaglinide_binary","nateglinide_binary","chlorpropamide_binary","glimepiride_binary","acetohexamide_binary","glipizide_binary","glyburide_binary","tolbutamide_binary","pioglitazone_binary","rosiglitazone_binary","acarbose_binary","miglitol_binary","troglitazone_binary","tolazamide_binary","examide_binary","citoglipton_binary","insulin_binary","glyburide-metformin_binary","glipizide-metformin_binary","glimepiride-pioglitazone_binary","metformin-rosiglitazone_binary","metformin-pioglitazone_binary"] },
    ];
    return groups;
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Model Prediction</h1>
      <div className="text-sm opacity-75">Enter values for required features and submit to the FastAPI model.</div>
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            API: <span className="font-mono opacity-80">{API}</span> • Status: <span className="font-medium">{health.status}</span> • Model: <span className="font-medium">{health.model_loaded ? "loaded" : "not loaded"}</span>
          </div>
          <button className="btn" onClick={checkHealth}>Check</button>
        </div>
        {health.message && <div className="text-xs opacity-70 mt-1">{health.message}</div>}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {grouped.map((g) => (
          <div className="card" key={g.title}>
            <div className="font-medium mb-2">{g.title}</div>
            <div className="grid grid-cols-2 gap-2">
              {g.keys.map((k) => (
                <label key={k} className="text-xs">
                  <span className="block opacity-75 mb-1">{k}</span>
                  <input className="input w-full" type="number" step="any" value={form[k]} onChange={(e)=>onChange(k, e.target.value)} />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button className="btn" onClick={submit} disabled={loading}>{loading ? "Predicting…" : "Predict"}</button>
        <button className="btn" onClick={()=>setResult(null)}>Clear</button>
      </div>
      {result && (
        <div className="card">
          <div className="font-medium mb-2">Result</div>
          {result.error ? (
            <div className="text-sm text-red-400 whitespace-pre-wrap">{result.error}</div>
          ) : (
            <div className="text-sm">
              <div>Prediction: <span className="font-medium">{String(result.prediction)}</span></div>
              <div>Probability: <span className="font-medium">{(result.probability*100).toFixed(2)}%</span></div>
              <div>Risk level: <span className="font-medium">{result.risk_level}</span></div>
              <div>Model: <span className="opacity-75">{result.model_version}</span></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


