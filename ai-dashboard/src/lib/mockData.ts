import { Patient } from "./types";

export function generateMockTrendData(base = 100, deviation = 10) {
    const data: Record<string, Record<string, number | string>> = {};
    for (let i = 89; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        data[dateStr] = {
            date: dateStr,
            blood_pressure: Math.round(
                base + (Math.random() - 0.5) * deviation
            ),
            blood_glucose: Math.round(100 + (Math.random() - 0.5) * 15),
            resting_heart_rate: Math.round(60 + (Math.random() - 0.5) * 10),
            weight: Math.round(180 + (Math.random() - 0.5) * 10),
        };
    }
    return data;
}

export const patientsMock: Patient[] = [
    {
        id: "P-001",
        name: "Aditi Sharma",
        age: 65,
        bloodGroup: "A+",
        height: "165 cm",
        weight: "75 kg",
        disease: "Type 2 Diabetes",
        riskScore: 0.85,
        riskLevel: "high",
        trends: generateMockTrendData(),
        drivers: [
            { factor: "Recent A1C Spike", influence: "high" },
            { factor: "Missed Meds", influence: "high" },
        ],
        actions: [
            "Flag for immediate follow-up",
            "Review medication adherence",
            "Schedule urgent check-up",
        ],
    },
    {
        id: "P-002",
        name: "Rajesh Kumar",
        age: 48,
        bloodGroup: "O-",
        height: "180 cm",
        weight: "88 kg",
        disease: "Hypertension",
        riskScore: 0.22,
        riskLevel: "low",
        trends: generateMockTrendData(120, 15),
        drivers: [
            { factor: "Consistent Blood Glucose", influence: "high-negative" },
            { factor: "100% Med Adherence", influence: "high-negative" },
        ],
        actions: ["Continue routine monitoring", "Encourage healthy habits"],
    },
    {
        id: "P-003",
        name: "Rohan Mehta",
        age: 55,
        bloodGroup: "B+",
        height: "175 cm",
        weight: "92 kg",
        disease: "Heart Failure",
        riskScore: 0.58,
        riskLevel: "medium",
        trends: generateMockTrendData(140, 20),
        drivers: [
            { factor: "Fluctuating Systolic BP", influence: "high" },
            { factor: "Increased Sodium Intake", influence: "medium" },
        ],
        actions: [
            "Send automated lifestyle tip",
            "Schedule follow-up with nutritionist",
            "Alert care team to review BP",
        ],
    },
    {
        id: "P-004",
        name: "Ananya Gupta",
        age: 72,
        bloodGroup: "AB+",
        height: "160 cm",
        weight: "68 kg",
        disease: "COPD",
        riskScore: 0.71,
        riskLevel: "high",
        trends: generateMockTrendData(90, 5),
        drivers: [
            { factor: "Elevated Resting Heart Rate", influence: "high" },
            { factor: "Sleep Irregularity", influence: "medium" },
        ],
        actions: [
            "Recommend cardio assessment",
            "Suggest sleep hygiene review",
            "Review recent vitals for patterns",
        ],
    },
    {
        id: "P-005",
        name: "Sanjay Verma",
        age: 39,
        bloodGroup: "A-",
        height: "178 cm",
        weight: "79 kg",
        disease: "Obesity",
        riskScore: 0.35,
        riskLevel: "low",
        trends: generateMockTrendData(110, 10),
        drivers: [
            { factor: "Stable Weight", influence: "medium-negative" },
            { factor: "Consistent Activity Logs", influence: "high-negative" },
        ],
        actions: ["Continue monitoring", "Congratulate on progress"],
    },
    {
        id: "P-006",
        name: "Pooja Desai",
        age: 61,
        bloodGroup: "O+",
        height: "170 cm",
        weight: "85 kg",
        disease: "Kidney Disease",
        riskScore: 0.65,
        riskLevel: "medium",
        trends: generateMockTrendData(150, 25),
        drivers: [
            { factor: "Weight Gain (last 30 days)", influence: "high" },
            { factor: "Occasional High Glucose Spikes", influence: "medium" },
        ],
        actions: ["Refer to registered dietitian", "Advise on meal planning"],
    },
];
