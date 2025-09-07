"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CohortDashboard from "./sections/CohortDashboard";
import PatientDetail from "./sections/PatientDetail";

function HomeContent() {
    const params = useSearchParams();
    const pid = params.get("patient");
    if (pid) {
        return <PatientDetail patientId={pid} />;
    }
    return <CohortDashboard />;
}

export default function Home() {
    return (
        <Suspense>
            <HomeContent />
        </Suspense>
    );
}
