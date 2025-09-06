"use client";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "../../../components/Header";
import { patientsMock } from "../../../lib/mockData";

function formatDayLabel(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}

export default function ComparePatientsPage() {
    const router = useRouter();
    const params = useSearchParams();
    const idsParam = params.get("ids") || "";
    const [idA, idB] = idsParam.split(",");
    const a = useMemo(() => patientsMock.find((p) => p.id === idA), [idA]);
    const b = useMemo(() => patientsMock.find((p) => p.id === idB), [idB]);
    const [date1, setDate1] = useState<string>("");
    const [date2, setDate2] = useState<string>("");

    return (
        <div className="bg-slate-50 min-h-screen w-full">
            <Header />
            <main className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
                <button
                    onClick={() => router.push("/")}
                    className="text-gray-500 hover:text-gray-700 mb-6 flex items-center space-x-2">
                    <i className="fas fa-arrow-left"></i>
                    <span>Back to Dashboard</span>
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Patient Comparison
                </h2>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                    <div className="md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                            Select Day 1
                        </label>
                        <input
                            type="date"
                            value={date1}
                            onChange={(e) => setDate1(e.currentTarget.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                            Select Day 2
                        </label>
                        <input
                            type="date"
                            value={date2}
                            onChange={(e) => setDate2(e.currentTarget.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[a, b].map((p, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-xl shadow">
                            {!p ? (
                                <div className="text-gray-500">
                                    Patient not found.
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                                        {p.name}
                                    </h3>
                                    <div className="flex items-center space-x-4 mb-4">
                                        <p className="font-medium text-gray-500">
                                            Risk Score:
                                        </p>
                                        <span className="text-2xl font-bold text-gray-900">
                                            {(p.riskScore * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-semibold text-sm">
                                            Metric
                                        </p>
                                        <p className="font-semibold text-sm w-1/3 text-center">
                                            {date1
                                                ? formatDayLabel(date1)
                                                : "-"}
                                        </p>
                                        <p className="font-semibold text-sm w-1/3 text-center">
                                            {date2
                                                ? formatDayLabel(date2)
                                                : "-"}
                                        </p>
                                    </div>
                                    <ul className="space-y-2">
                                        {(() => {
                                            if (!date1 || !date2 || !p)
                                                return <li className="text-gray-400 text-sm">Please select two dates to compare.</li>;
                                            const d1 = p.trends[date1] as Record<string, number>;
                                            const d2 = p.trends[date2] as Record<string, number>;
                                            if (!d1 || !d2)
                                                return (
                                                    <li className="text-red-500 text-sm">
                                                        Data not available for
                                                        selected dates.
                                                    </li>
                                                );
                                            return [
                                                "blood_pressure",
                                                "blood_glucose",
                                                "resting_heart_rate",
                                            ].map((metric) => (
                                                <li
                                                    key={metric}
                                                    className="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-sm">
                                                    <span className="font-medium w-1/3">
                                                        {metric.replace(
                                                            /_/g,
                                                            " "
                                                        )}
                                                    </span>
                                                    <span className="w-1/3 text-center">
                                                        {d1[metric]}
                                                    </span>
                                                    <span className="w-1/3 text-center">
                                                        {d2[metric]}
                                                    </span>
                                                </li>
                                            ));
                                        })()}
                                    </ul>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
