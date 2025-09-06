"use client";
import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { patientsMock } from "../../../lib/mockData";
import { Header } from "../../../components/Header";
import { TrendsChart } from "../../../components/TrendsChart";
import { DayComparisonChart } from "../../../components/DayComparisonChart";

export default function PatientDetailPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const patient = useMemo(
        () => patientsMock.find((p) => p.id === params.id),
        [params.id]
    );
    const [labels, setLabels] = useState<string[]>([]);
    const [bp, setBp] = useState<number[]>([]);
    const [bg, setBg] = useState<number[]>([]);
    const [day1, setDay1] = useState<string>("");
    const [day2, setDay2] = useState<string>("");

    useEffect(() => {
        if (!patient) return;
        const keys = Object.keys(patient.trends).reverse();
        setLabels(keys);
        setBp(keys.map((k) => patient.trends[k].blood_pressure));
        setBg(keys.map((k) => patient.trends[k].blood_glucose));
    }, [patient]);

    if (!patient) {
        return (
            <div className="bg-slate-50 min-h-screen w-full">
                <Header />
                <main className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
                    <button
                        onClick={() => router.push("/")}
                        className="text-blue-600 hover:underline">
                        Back to Dashboard
                    </button>
                    <div className="mt-8 text-gray-600">Patient not found.</div>
                </main>
            </div>
        );
    }

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
                <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
                    <div className="md:w-1/3">
                        <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {patient.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Patient ID: {patient.id}
                            </p>
                            <div className="flex items-center space-x-4 mb-6">
                                <i className="text-4xl fas fa-user-circle"></i>
                                <div>
                                    <p className="text-gray-500 font-medium">
                                        Risk Score
                                    </p>
                                    <h4 className="text-3xl font-bold">
                                        {(patient.riskScore * 100).toFixed(0)}%
                                    </h4>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow p-4 mt-4">
                                <h5 className="font-semibold text-gray-800 mb-2">
                                    Patient Information
                                </h5>
                                <ul className="text-gray-600 space-y-1 text-sm">
                                    <li>
                                        <i className="fas fa-user-circle mr-2"></i>
                                        Age: {patient.age}
                                    </li>
                                    <li>
                                        <i className="fas fa-tint mr-2"></i>
                                        Blood Group: {patient.bloodGroup}
                                    </li>
                                    <li>
                                        <i className="fas fa-ruler-vertical mr-2"></i>
                                        Height: {patient.height}
                                    </li>
                                    <li>
                                        <i className="fas fa-weight-hanging mr-2"></i>
                                        Weight: {patient.weight}
                                    </li>
                                    <li>
                                        <i className="fas fa-heartbeat mr-2"></i>
                                        Disease: {patient.disease}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-2/3 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="font-bold text-gray-800 mb-4">
                                90-Day Vitals Trend
                            </h3>
                            <div className="w-full h-[320px]">
                                <TrendsChart
                                    labels={labels}
                                    bloodPressure={bp}
                                    bloodGlucose={bg}
                                />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="font-bold text-gray-800 mb-4">
                                Day-by-Day Vitals Comparison
                            </h3>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                                <div className="w-full sm:w-1/2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Select Day 1
                                    </label>
                                    <input
                                        type="date"
                                        value={day1}
                                        onChange={(e) =>
                                            setDay1(e.currentTarget.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Select Day 2
                                    </label>
                                    <input
                                        type="date"
                                        value={day2}
                                        onChange={(e) =>
                                            setDay2(e.currentTarget.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                            {day1 &&
                            day2 &&
                            patient.trends[day1] &&
                            patient.trends[day2] ? (
                                <div className="w-full h-[320px]">
                                    <DayComparisonChart
                                        labels={[
                                            "blood pressure",
                                            "blood glucose",
                                            "resting heart rate",
                                        ]}
                                        day1Label={new Date(
                                            day1
                                        ).toLocaleDateString()}
                                        day2Label={new Date(
                                            day2
                                        ).toLocaleDateString()}
                                        day1Values={ patient.trends[day1] ? Object.values(patient.trends[day1]).filter(v => typeof v === 'number') as number[] : []}
                                        day2Values={ patient.trends[day2] ? Object.values(patient.trends[day2]).filter(v => typeof v === 'number') as number[] : []}
                                        day1Values={ patient.trends[day1] ? [
                                            patient.trends[day1]
                                                .blood_pressure,
                                            patient.trends[day1]
                                                .blood_glucose,
                                            patient.trends[day1]
                                                .resting_heart_rate,
                                        ] : []}
                                        day2Values={ patient.trends[day2] ? [
                                            patient.trends[day2]
                                                .blood_pressure,
                                            patient.trends[day2]
                                                .blood_glucose,
                                            patient.trends[day2]
                                                .resting_heart_rate,
                                        ] : []}
                                    />
                                </div>
                            ) : (
                                <div className="text-sm text-gray-500">
                                    Select two valid dates to compare.
                                </div>
                            )}
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="font-bold text-gray-800 mb-4">
                                AI Tools
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button
                                    onClick={async () => {
                                        const vitals: Record<string, string | number>[] = Object.values(
                                            patient.trends
                                        ).slice(-7);
                                        const drivers: {factor: string, influence: string}[] = patient.drivers
                                            .map(
                                                (d: any) =>
                                                    `${d.factor} (${d.influence})`
                                            )
                                            .join(", ");
                                        const prompt = `Act as a clinical AI assistant. Given the patient's data (age: ${
                                            patient.age
                                        }, disease: ${
                                            patient.disease
                                        }), recent vitals (${JSON.stringify(
                                            vitals
                                        )}), and risk drivers (${drivers}), generate a concise, point-wise summary of their health status and the primary reasons for their elevated risk of deterioration in the next 90 days. Focus on actionable insights.`;
                                        alert(
                                            "Plug your Gemini API call here with prompt:\n\n" +
                                                prompt
                                        );
                                    }}
                                    className="w-full bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-sky-600 transition-colors duration-200 flex items-center justify-center space-x-2">
                                    ✨Generate Clinical Summary✨
                                </button>
                                <button
                                    onClick={() => {
                                        const drivers = patient.drivers
                                            .map(
                                                (d: any) =>
                                                    `${d.factor} (${d.influence})`
                                            )
                                            .join(", ");
                                        const v: Record<string, string | number> = Object.values(
                                            patient.trends
                                        ).slice(-1)[0] as any;
                                        const prompt = `Act as a healthcare consultant. Based on the patient's data (disease: ${ 
                                            patient.disease
                                        }, risk score: ${(
                                            patient.riskScore * 100
                                        ).toFixed(
                                            0
                                        )}%), which includes a high risk score due to ${drivers}, and recent vitals of Blood Pressure: ${
                                            v.blood_pressure
                                        }, Blood Glucose: ${
                                            v.blood_glucose
                                        }, what are three actionable, specific interventions a care team should consider to mitigate the risk of deterioration in the next 90 days? Format the response as a bulleted list.`;
                                        alert(
                                            "Plug your Gemini API call here with prompt:\n\n" +
                                                prompt
                                        );
                                    }}
                                    className="w-full bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center space-x-2">
                                    ✨Generate Smart Action Plan✨
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
