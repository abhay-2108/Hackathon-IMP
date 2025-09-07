"use client";
import Link from "next/link";
import RiskBadge from "./RiskBadge";

export default function PatientCard({ patient, selected, onSelect }) {
  const { id, name, age, gender, vitals, risk } = patient;
  return (
    <div className={`card ${selected ? "ring-2 ring-blue-500" : ""}`}> 
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-xs opacity-70">{id} • {age} • {gender}</div>
        </div>
        <RiskBadge level={risk.level} probability={risk.probability} />
      </div>
      <div className="mt-3 grid grid-cols-3 text-sm">
        <div>
          <div className="opacity-70">WBC</div>
          <div className="font-medium">{vitals.wbc.at(-1)}</div>
        </div>
        <div>
          <div className="opacity-70">Hemoglobin</div>
          <div className="font-medium">{vitals.hb.at(-1)}</div>
        </div>
        <div>
          <div className="opacity-70">Platelets</div>
          <div className="font-medium">{vitals.platelets.at(-1)}</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button onClick={onSelect} className="text-sm link">
          {selected ? "Selected" : "Select"}
        </button>
        <Link href={`/?patient=${id}`} className="text-sm font-medium link" aria-label={`View details for ${name}`}>
          View details →
        </Link>
      </div>
    </div>
  );
}


