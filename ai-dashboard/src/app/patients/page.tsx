"use client";
import { useMemo, useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { CohortList } from "../../components/CohortList";
import { patientsMock } from "../../lib/mockData";
import { useRouter } from "next/navigation";

export default function PatientsPage() {
    const router = useRouter();
    const patients = useMemo(() => patientsMock, []);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const onSelectPatient = (id: string) => {
        router.push(`/patients/${id}`);
    };

    const onToggleCompare = (id: string, checked: boolean) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (checked) {
                if (next.size < 2) next.add(id);
            } else {
                next.delete(id);
            }
            return next;
        });
    };

    const onCompare = () => {
        if (selectedIds.size === 2) {
            const [a, b] = Array.from(selectedIds);
            router.push(`/patients/compare?ids=${a},${b}`);
        }
    };

    useEffect(() => {
        // clear any patient param from old route style
        const url = new URL(window.location.href);
        if (url.searchParams.has("patient")) {
            url.searchParams.delete("patient");
            window.history.replaceState({}, "", url.toString());
        }
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen w-full">
            <Header />
            <main className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
                <CohortList
                    patients={patients}
                    onSelectPatient={onSelectPatient}
                    onToggleCompare={onToggleCompare}
                    compareEnabled={selectedIds.size === 2}
                    onCompare={onCompare}
                />
            </main>
        </div>
    );
}
