"use client";
import { useSearchParams } from "next/navigation";
import CohortDashboard from "./sections/CohortDashboard";
import PatientDetail from "./sections/PatientDetail";

export default function Home() {
  const params = useSearchParams();
  const pid = params.get("patient");
  if (pid) {
    return <PatientDetail patientId={pid} />;
  }
  return <CohortDashboard />;
}
