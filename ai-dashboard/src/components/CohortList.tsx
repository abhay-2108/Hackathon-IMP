"use client";
import { Patient } from "../lib/types";

type Props = {
    patients: Patient[];
    onSelectPatient: (id: string) => void;
    onToggleCompare: (id: string, checked: boolean) => void;
    compareEnabled: boolean;
    onCompare?: () => void;
};

export function CohortList({
    patients,
    onSelectPatient,
    onToggleCompare,
    compareEnabled,
    onCompare,
}: Props) {
    return (
        <div className="transition-opacity duration-500 opacity-100 block">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Patient Cohort Overview
            </h2>
            <div className="flex items-center justify-between mb-4">
                <p className="text-gray-500 text-sm">
                    Select patients for comparison and click &quot;Compare&quot;.
                </p>
                <button
                    id="compare-button"
                    disabled={!compareEnabled}
                    onClick={() => compareEnabled && onCompare?.()}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm text-white ${
                        compareEnabled
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-blue-500 opacity-50 cursor-not-allowed"
                    }`}>
                    <i className="fas fa-chart-line mr-2"></i>Compare
                </button>
            </div>
            <div
                id="patient-list"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {patients.map((p) => {
                    const color =
                        p.riskLevel === "high"
                            ? "border-red-500"
                            : p.riskLevel === "medium"
                            ? "border-yellow-500"
                            : "border-green-500";
                    const icon =
                        p.riskLevel === "high"
                            ? "fas fa-exclamation-triangle"
                            : p.riskLevel === "medium"
                            ? "fas fa-shield-alt"
                            : "fas fa-check-circle";
                    return (
                        <div
                            key={p.id}
                            className={`bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 ${color}`}
                            onClick={() => onSelectPatient(p.id)}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-gray-400">
                                        <i className={`${icon} text-2xl`}></i>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {p.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            ID: {p.id}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center"
                                    onClick={(e) => e.stopPropagation()}>
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded-md"
                                        onChange={(e) =>
                                            onToggleCompare(
                                                p.id,
                                                e.currentTarget.checked
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mt-4">
                                Risk of deterioration in 90 days
                            </p>
                            <div className="mt-2 text-2xl font-bold text-gray-900">
                                {(p.riskScore * 100).toFixed(0)}%
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
