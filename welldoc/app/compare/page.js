"use client";
import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { mockPatients } from "../utils/mockData";
import RiskBadge from "../ui/RiskBadge";
import SimpleLineChart from "../viz/SimpleLineChart";

function ComparePageContent() {
    const params = useSearchParams();
    const leftId = params.get("left");
    const rightId = params.get("right");
    const [left, right] = useMemo(
        () => [
            mockPatients.find((p) => p.id === leftId),
            mockPatients.find((p) => p.id === rightId),
        ],
        [leftId, rightId]
    );

    if (!left || !right) {
        return (
            <div className="text-sm">
                Select two patients from Dashboard to compare.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[left, right].map((p) => (
                <div key={p.id} className="card">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="font-semibold">{p.name}</div>
                            <div className="text-xs text-black/60 dark:text-white/60">
                                {p.id} • {p.age} • {p.gender}
                            </div>
                        </div>
                        <RiskBadge
                            level={p.risk.level}
                            probability={p.risk.probability}
                        />
                    </div>
                    <div className="mt-4">
                        <SimpleLineChart
                            labels={p.vitals.dates}
                            series={[
                                { name: "WBC", data: p.vitals.wbc },
                                { name: "Platelets", data: p.vitals.platelets },
                            ]}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function ComparePage() {
    return (
        <Suspense>
            <ComparePageContent />
        </Suspense>
    );
}
