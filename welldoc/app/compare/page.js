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
                <div key={p.id} className="space-y-4">
                    <div className="card">
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
                        <div className="text-xs opacity-75 mt-2">
                            Risk probability: {(p.risk.probability * 100).toFixed(1)}%
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="card">
                            <div className="font-medium mb-2">Demographics</div>
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                <dt className="opacity-70">Age</dt><dd>{p.age}</dd>
                                <dt className="opacity-70">Gender</dt><dd>{p.gender}</dd>
                                <dt className="opacity-70">Blood group</dt><dd>{p.bloodGroup}</dd>
                                <dt className="opacity-70">Height</dt><dd>{p.height} cm</dd>
                                <dt className="opacity-70">Weight</dt><dd>{p.weight} kg</dd>
                            </dl>
                        </div>
                        <div className="card">
                            <div className="font-medium mb-2">Clinical Information</div>
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                <dt className="opacity-70">Primary diagnosis</dt><dd>{p.diagnosis}</dd>
                                <dt className="opacity-70">Symptoms</dt><dd>{p.symptoms.join(", ")}</dd>
                                <dt className="opacity-70">Risk drivers</dt><dd>{p.riskDrivers.join(", ")}</dd>
                            </dl>
                        </div>
                        <div className="card">
                            <div className="font-medium mb-2">Latest Vitals</div>
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                <dt className="opacity-70">WBC</dt><dd>{p.vitals.wbc.at(-1)}</dd>
                                <dt className="opacity-70">Hemoglobin</dt><dd>{p.vitals.hb.at(-1)}</dd>
                                <dt className="opacity-70">Platelets</dt><dd>{p.vitals.platelets.at(-1)}</dd>
                                <dt className="opacity-70">Last date</dt><dd>{p.vitals.dates.at(-1)}</dd>
                            </dl>
                        </div>
                        <div className="card">
                            <div className="font-medium mb-2">Labs</div>
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                <dt className="opacity-70">LDH</dt><dd>{p.labs.ldh}</dd>
                                <dt className="opacity-70">Calcium</dt><dd>{p.labs.calcium}</dd>
                                <dt className="opacity-70">Albumin</dt><dd>{p.labs.albumin}</dd>
                            </dl>
                        </div>
                        <div className="card">
                            <div className="font-medium mb-2">Vitals Trend (7-90d)</div>
                            <SimpleLineChart
                                labels={p.vitals.dates}
                                series={[
                                    { name: "WBC", data: p.vitals.wbc },
                                    { name: "Platelets", data: p.vitals.platelets },
                                ]}
                            />
                        </div>
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
