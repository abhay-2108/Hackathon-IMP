export type TrendEntry = {
    date: string;
    blood_pressure: number;
    blood_glucose: number;
    resting_heart_rate: number;
    weight: number;
};

export type Driver = {
    factor: string;
    influence:
        | "high"
        | "medium"
        | "low"
        | "high-negative"
        | "medium-negative"
        | "low-negative";
};

export type Patient = {
    id: string;
    name: string;
    age: number;
    bloodGroup: string;
    height: string;
    weight: string;
    disease: string;
    riskScore: number; // 0..1
    riskLevel: "high" | "medium" | "low";
    trends: Record<string, TrendEntry>;
    drivers: Driver[];
    actions: string[];
};
