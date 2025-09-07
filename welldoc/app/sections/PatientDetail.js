"use client";
import { useEffect, useMemo, useState } from "react";
import { mockPatients } from "../utils/mockData";
import RiskBadge from "../ui/RiskBadge";
import SimpleLineChart from "../viz/SimpleLineChart";
import SimpleBarChart from "../viz/SimpleBarChart";
import SimplePieChart from "../viz/SimplePieChart";
import { cacheGet, cacheSet, cacheRemoveByPrefix } from "../utils/cache";

export default function PatientDetail({ patientId }) {
  const patient = useMemo(() => mockPatients.find(p => p.id === patientId), [patientId]);
  const [dateA, setDateA] = useState(patient?.vitals?.dates?.[0] || "");
  const [dateB, setDateB] = useState(patient?.vitals?.dates?.[patient?.vitals?.dates?.length - 1] || "");

  // Keep selected dates in sync when patient changes
  useEffect(() => {
    if (!patient?.vitals?.dates?.length) return;
    const dlen = patient.vitals.dates.length;
    const a = dlen >= 2 ? patient.vitals.dates[dlen - 2] : patient.vitals.dates[0];
    const b = patient.vitals.dates[dlen - 1];
    setDateA(a);
    setDateB(b);
  }, [patient?.id]);

  if (!patient) return <div className="text-sm opacity-75">Patient not found.</div>;

  const idxA = patient.vitals.dates.indexOf(dateA);
  const idxB = patient.vitals.dates.indexOf(dateB);

  const safeDiff = (arr) => (idxA >= 0 && idxB >= 0 && arr[idxA] != null && arr[idxB] != null)
    ? (arr[idxB] - arr[idxA])
    : 0;
  const compare = safeDiff;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between card">
        <div>
          <div className="text-lg font-semibold">{patient.name} ({patient.id})</div>
          <div className="text-sm opacity-75">Age {patient.age} • {patient.gender} • {patient.bloodGroup} • {patient.height}cm • {patient.weight}kg</div>
          <div className="text-sm mt-1">Dx: {patient.diagnosis} • Symptoms: {patient.symptoms.join(", ")}</div>
          <div className="text-sm mt-1">Risk drivers: {patient.riskDrivers.join(", ")}</div>
        </div>
        <div className="flex items-center gap-2">
          <RiskBadge level={patient.risk.level} probability={patient.risk.probability} />
          <button className="btn" aria-label="Copy shareable link" onClick={copyLink}>Copy link</button>
          <button className="btn" aria-label="Refresh AI & risk data" onClick={() => { cacheRemoveByPrefix(`ai:`); window.location.reload(); }}>Refresh</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <div className="font-medium mb-2">Demographics</div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="opacity-70">Name</dt><dd>{patient.name}</dd>
            <dt className="opacity-70">Patient ID</dt><dd>{patient.id}</dd>
            <dt className="opacity-70">Age</dt><dd>{patient.age}</dd>
            <dt className="opacity-70">Gender</dt><dd>{patient.gender}</dd>
            <dt className="opacity-70">Blood group</dt><dd>{patient.bloodGroup}</dd>
            <dt className="opacity-70">Height</dt><dd>{patient.height} cm</dd>
            <dt className="opacity-70">Weight</dt><dd>{patient.weight} kg</dd>
          </dl>
        </div>
        <div className="card">
          <div className="font-medium mb-2">Clinical Information</div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="opacity-70">Primary diagnosis</dt><dd>{patient.diagnosis}</dd>
            <dt className="opacity-70">Symptoms</dt><dd>{patient.symptoms.join(", ")}</dd>
            <dt className="opacity-70">Risk drivers</dt><dd>{patient.riskDrivers.join(", ")}</dd>
          </dl>
        </div>
        <div className="card">
          <div className="font-medium mb-2">Vitals Trend (7-90d)</div>
          <SimpleLineChart labels={patient.vitals.dates} series={[
            { name: "WBC", data: patient.vitals.wbc },
            { name: "Platelets", data: patient.vitals.platelets },
          ]} />
        </div>
        <div className="card">
          <div className="font-medium mb-2">Blood Counts (avg)</div>
          <SimpleBarChart labels={["RBC","Hemoglobin","Platelets"]} values={[avg(patient.vitals.rbc), avg(patient.vitals.hb), avg(patient.vitals.platelets)]} />
        </div>
        <div className="card">
          <div className="font-medium mb-2">Lab Results</div>
          <SimplePieChart labels={["LDH","Calcium","Albumin"]} values={[patient.labs.ldh, patient.labs.calcium, patient.labs.albumin]} />
        </div>
        <div className="card">
          <div className="font-medium">Day-by-Day Vitals Comparison</div>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <select className="input" value={dateA} onChange={(e) => setDateA(e.target.value)}>
              {patient.vitals.dates.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <span>vs</span>
            <select className="input" value={dateB} onChange={(e) => setDateB(e.target.value)}>
              {patient.vitals.dates.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="mt-3">
            {patient.vitals?.wbc && patient.vitals?.platelets && patient.vitals?.hb ? (
              <>
                <SimpleBarChart labels={["WBC","Platelets","Hemoglobin"]} values={[
                  safeDiff(patient.vitals.wbc),
                  safeDiff(patient.vitals.platelets),
                  safeDiff(patient.vitals.hb),
                ]} />
                <div className="text-xs opacity-75 mt-2">
                  WBC: {deltaText(compare(patient.vitals.wbc))} • Platelets: {deltaText(compare(patient.vitals.platelets))} • Hb: {deltaText(compare(patient.vitals.hb))}
                </div>
                <div className="text-xs opacity-75 mt-2">
                  <span className="font-medium">{dateA}</span> vs <span className="font-medium">{dateB}</span>
                  <span className="ml-2">WBC {valAt(patient.vitals.wbc, idxA)} → {valAt(patient.vitals.wbc, idxB)}</span>
                  <span className="ml-2">Plt {valAt(patient.vitals.platelets, idxA)} → {valAt(patient.vitals.platelets, idxB)}</span>
                  <span className="ml-2">Hb {valAt(patient.vitals.hb, idxA)} → {valAt(patient.vitals.hb, idxB)}</span>
                </div>
              </>
            ) : (
              <div className="text-sm opacity-75">No day-by-day vitals available.</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AIButtons patient={patient} />
      </div>
    </div>
  );
}

function avg(arr){
  return Math.round((arr.reduce((s,v)=>s+v,0)/arr.length) * 10) / 10;
}

function deltaText(v){
  const s = Math.round(Math.abs(v) * 10)/10;
  if (v > 0) return `Increased by ${s}`;
  if (v < 0) return `Decreased by ${s}`;
  return "No change";
}

function valAt(arr, idx){
  if (!Array.isArray(arr) || idx < 0 || idx >= arr.length) return "-";
  return arr[idx];
}

function AIButtons({ patient }){
  const [summary, setSummary] = useState("");
  const [plan, setPlan] = useState([]);

  const run = async (endpoint, setter) => {
    const key = `ai:${endpoint}:${patient.id}`;
    const cached = cacheGet(key);
    if (cached) { setter(cached); return; }
    const res = await fetch(`/api/${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ patient }) });
    const data = await res.json();
    const value = data.result || data.actions || [];
    setter(value);
    cacheSet(key, value, 2 * 60 * 60 * 1000); // 2h TTL
  };

  return (
    <div className="card col-span-1 lg:col-span-2">
      <div className="font-medium mb-2">AI Clinical Decision Support</div>
      <div className="flex gap-3">
        <button className="btn" onClick={() => {
          setSummary("Generating summary…");
          run("summary", (r)=>setSummary(r));
        }}>Generate AI Summary</button>
        <button className="btn" onClick={() => {
          setPlan(["Generating action plan…"]);
          run("action-plan", (r)=>setPlan(r));
        }}>Generate Action Plan</button>
      </div>
      {summary && (
        <div className="mt-3 text-sm prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderRichText(summary) }} />
      )}
      {plan.length > 0 && (
        <ol className="mt-3 list-decimal list-inside text-sm space-y-2">
          {plan.map((a, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: renderRichText(a) }} />
          ))}
        </ol>
      )}
    </div>
  );
}

async function copyToClipboard(text){
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    return true;
  } catch {
    return false;
  }
}

function copyLink(){
  copyToClipboard(window.location.href);
}

function renderRichText(text){
  if (!text) return "";
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1<\/strong>')
    .replace(/\*(.*?)\*/g, '<em>$1<\/em>')
    .replace(/`([^`]+)`/g, '<code>$1<\/code>')
    .replace(/\n-\s+/g, '<br/>• ')
    .replace(/\n\*\s+/g, '<br/>• ')
    .replace(/\n\d+\.\s+/g, '<br/>')
    .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1<\/sup>');
  // Ensure bullet points render nicely even if AI returns raw text with asterisks
  if (/^\*\s|^-\s|^\d+\.\s/.test(text.trim())){
    html = html.replace(/^\*\s|^-\s/, '• ');
  }
  return html
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('<br/>');
}


