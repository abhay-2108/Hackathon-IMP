"use client";
import React, { useState } from "react";

interface PatientProfile {
    id: string;
    name: string;
    age: number;
    gender: "Male" | "Female";
    profileImage: string;
    primaryDiagnoses: string[];
    chiefComplaints: string;
    medicalHistory: {
        previousConditions: string[];
        familyHistory: string[];
        lifestyleHabits: string[];
    };
    clinicalVitals: {
        bloodPressure: string;
        heartRate: number;
        temperature: number;
        weight: number;
        height: number;
        bmi: number;
    };
    labResults: {
        hba1c?: number;
        cholesterol?: number;
        ldl?: number;
        hdl?: number;
        triglycerides?: number;
        creatinine?: number;
        egfr?: number;
        glucose?: number;
        wbc?: number;
        hemoglobin?: number;
        platelets?: number;
        testosterone?: number;
        lh?: number;
        fsh?: number;
    };
    physicianRoadmap: RoadmapStep[];
    riskLevel: "Low" | "Medium" | "High";
    lastVisit: string;
    nextAppointment: string;
    physician: string;
}

interface RoadmapStep {
    id: string;
    title: string;
    description: string;
    justification: string;
    status: "Completed" | "In Progress" | "Pending" | "Overdue";
    date: string;
    category:
        | "Diagnosis"
        | "Treatment"
        | "Monitoring"
        | "Lifestyle"
        | "Follow-up"
        | "Education";
    priority: "High" | "Medium" | "Low";
    estimatedDuration: string;
    responsibleProvider: string;
}

const enhancedPatientScenarios: PatientProfile[] = [
    {
        id: "SC-001",
        name: "Sarah Johnson",
        age: 34,
        gender: "Female",
        profileImage: "👩‍🦱",
        primaryDiagnoses: ["Type 2 Diabetes", "Obesity (BMI: 32.1)"],
        chiefComplaints:
            "Frequent thirst, blurry vision, and excessive fatigue over the past 3 months. Patient reports drinking 8-10 glasses of water daily and needing to urinate frequently, especially at night.",
        medicalHistory: {
            previousConditions: [
                "Gestational diabetes during pregnancy (2019)",
                "Pre-diabetes diagnosis (2021)",
                "Polycystic ovary syndrome (PCOS) - diagnosed 2018",
            ],
            familyHistory: [
                "Mother: Type 2 diabetes (diagnosed age 45)",
                "Grandmother: Type 2 diabetes and hypertension",
                "Father: Hypertension and high cholesterol",
            ],
            lifestyleHabits: [
                "Sedentary lifestyle - desk job, minimal exercise",
                "Diet high in processed foods and sugary beverages",
                "Sleeps 5-6 hours per night due to work stress",
                "Non-smoker, occasional alcohol consumption",
            ],
        },
        clinicalVitals: {
            bloodPressure: "142/88 mmHg",
            heartRate: 88,
            temperature: 98.6,
            weight: 185,
            height: 66,
            bmi: 32.1,
        },
        labResults: {
            hba1c: 8.2,
            glucose: 180,
            cholesterol: 245,
            ldl: 165,
            hdl: 38,
            triglycerides: 285,
            creatinine: 0.9,
            egfr: 95,
        },
        physicianRoadmap: [
            {
                id: "R1",
                title: "Initial Diabetes Diagnosis & Assessment",
                description:
                    "Comprehensive evaluation including HbA1c, fasting glucose, and diabetes education",
                justification:
                    "HbA1c of 8.2% confirms Type 2 diabetes. Patient's symptoms and family history support this diagnosis. Immediate intervention needed to prevent complications.",
                status: "Completed",
                date: "2024-01-15",
                category: "Diagnosis",
                priority: "High",
                estimatedDuration: "2 hours",
                responsibleProvider: "Dr. Emily Chen, Endocrinologist",
            },
            {
                id: "R2",
                title: "Metformin Initiation & Titration",
                description:
                    "Start Metformin 500mg BID with meals, titrate to 1000mg BID over 2 weeks",
                justification:
                    "Metformin is first-line therapy for Type 2 diabetes. Helps reduce hepatic glucose production and improves insulin sensitivity. Patient has no contraindications.",
                status: "Completed",
                date: "2024-01-15",
                category: "Treatment",
                priority: "High",
                estimatedDuration: "Ongoing",
                responsibleProvider: "Dr. Emily Chen, Endocrinologist",
            },
            {
                id: "R3",
                title: "Diabetes Education Program",
                description:
                    "Referral to certified diabetes educator for comprehensive self-management training",
                justification:
                    "Patient education is crucial for diabetes management. Covers blood glucose monitoring, medication adherence, and lifestyle modifications.",
                status: "In Progress",
                date: "2024-01-20",
                category: "Education",
                priority: "High",
                estimatedDuration: "4 sessions (2 hours each)",
                responsibleProvider: "Certified Diabetes Educator",
            },
            {
                id: "R4",
                title: "Nutritional Counseling & Meal Planning",
                description:
                    "Registered dietitian consultation for personalized meal planning and carb counting",
                justification:
                    "Diet is fundamental to diabetes management. Patient needs guidance on portion control, carb counting, and healthy food choices to achieve glycemic control.",
                status: "Pending",
                date: "2024-02-01",
                category: "Lifestyle",
                priority: "High",
                estimatedDuration: "3 sessions (1 hour each)",
                responsibleProvider: "Registered Dietitian",
            },
            {
                id: "R5",
                title: "Exercise Program Development",
                description:
                    "Structured exercise program - 150 min/week moderate activity, resistance training 2x/week",
                justification:
                    "Exercise improves insulin sensitivity and aids weight loss. Patient's sedentary lifestyle is a major risk factor that needs immediate attention.",
                status: "Pending",
                date: "2024-02-05",
                category: "Lifestyle",
                priority: "High",
                estimatedDuration: "Ongoing",
                responsibleProvider: "Exercise Physiologist",
            },
            {
                id: "R6",
                title: "3-Month HbA1c Follow-up",
                description:
                    "Repeat HbA1c to assess treatment response and medication effectiveness",
                justification:
                    "HbA1c reflects average blood glucose over 3 months. Essential to evaluate if current treatment is achieving target goals (<7%).",
                status: "Pending",
                date: "2024-04-15",
                category: "Monitoring",
                priority: "High",
                estimatedDuration: "30 minutes",
                responsibleProvider: "Dr. Emily Chen, Endocrinologist",
            },
        ],
        riskLevel: "High",
        lastVisit: "2024-01-15",
        nextAppointment: "2024-02-15",
        physician: "Dr. Emily Chen, MD - Endocrinologist",
    },
    {
        id: "SC-002",
        name: "Michael Chen",
        age: 67,
        gender: "Male",
        profileImage: "👨‍🦳",
        primaryDiagnoses: [
            "Heart Failure (EF: 35%)",
            "Hypertension",
            "Atrial Fibrillation",
            "Chronic Kidney Disease Stage 3",
        ],
        chiefComplaints:
            "Progressive shortness of breath, especially with exertion, and swelling in both legs and feet. Patient reports difficulty sleeping due to breathlessness and frequent nighttime urination.",
        medicalHistory: {
            previousConditions: [
                "Myocardial infarction (2018) - anterior wall",
                "Coronary artery bypass surgery (2018) - 3-vessel disease",
                "Atrial fibrillation diagnosis (2020)",
                "Chronic kidney disease stage 3 (2021)",
            ],
            familyHistory: [
                "Father: Heart attack at age 58, diabetes",
                "Mother: Hypertension and stroke at age 72",
                "Brother: Coronary artery disease",
            ],
            lifestyleHabits: [
                "Former smoker (quit 2018 after heart attack)",
                "Sedentary lifestyle due to heart condition",
                "High sodium diet despite medical advice",
                "Sleeps 6-7 hours with frequent awakenings",
            ],
        },
        clinicalVitals: {
            bloodPressure: "158/92 mmHg",
            heartRate: 95,
            temperature: 98.4,
            weight: 195,
            height: 70,
            bmi: 28.0,
        },
        labResults: {
            creatinine: 1.8,
            egfr: 35,
            cholesterol: 185,
            ldl: 95,
            hdl: 42,
            triglycerides: 165,
            hemoglobin: 11.2,
            wbc: 7.2,
            platelets: 285,
        },
        physicianRoadmap: [
            {
                id: "R7",
                title: "Heart Failure Optimization",
                description:
                    "Optimize heart failure medications including ACE inhibitor, beta-blocker, and diuretic",
                justification:
                    "Patient's EF of 35% indicates moderate heart failure. Current medications need optimization to improve cardiac function and reduce symptoms.",
                status: "Completed",
                date: "2024-01-10",
                category: "Treatment",
                priority: "High",
                estimatedDuration: "Ongoing",
                responsibleProvider: "Dr. Robert Martinez, Cardiologist",
            },
            {
                id: "R8",
                title: "Cardiac Rehabilitation Program",
                description:
                    "Phase II cardiac rehabilitation - supervised exercise and education program",
                justification:
                    "Cardiac rehab improves outcomes in heart failure patients. Helps with exercise tolerance, medication adherence, and lifestyle modifications.",
                status: "Completed",
                date: "2024-01-05",
                category: "Lifestyle",
                priority: "High",
                estimatedDuration: "12 weeks (3x/week)",
                responsibleProvider: "Cardiac Rehabilitation Team",
            },
            {
                id: "R9",
                title: "Echocardiogram Follow-up",
                description:
                    "6-month echo to assess cardiac function and treatment response",
                justification:
                    "Regular monitoring of ejection fraction is essential to evaluate treatment effectiveness and guide therapy adjustments.",
                status: "In Progress",
                date: "2024-02-10",
                category: "Monitoring",
                priority: "High",
                estimatedDuration: "45 minutes",
                responsibleProvider: "Dr. Robert Martinez, Cardiologist",
            },
            {
                id: "R10",
                title: "INR Monitoring & Warfarin Management",
                description:
                    "Weekly INR checks for warfarin management and stroke prevention",
                justification:
                    "Patient has atrial fibrillation and requires anticoagulation. Regular INR monitoring ensures therapeutic levels and prevents bleeding complications.",
                status: "In Progress",
                date: "2024-01-20",
                category: "Monitoring",
                priority: "High",
                estimatedDuration: "15 minutes",
                responsibleProvider: "Anticoagulation Clinic",
            },
            {
                id: "R11",
                title: "Dietary Sodium Restriction Education",
                description:
                    "Cardiac diet education - <2g sodium daily, fluid restriction",
                justification:
                    "Sodium restriction reduces fluid retention and heart failure symptoms. Patient's current diet is high in sodium, contributing to edema.",
                status: "Pending",
                date: "2024-02-01",
                category: "Education",
                priority: "Medium",
                estimatedDuration: "1 hour",
                responsibleProvider: "Cardiac Dietitian",
            },
            {
                id: "R12",
                title: "Cardiology Follow-up",
                description:
                    "3-month cardiology appointment for heart failure management",
                justification:
                    "Regular follow-up is essential for heart failure management. Allows for medication adjustments and early detection of complications.",
                status: "Pending",
                date: "2024-04-10",
                category: "Follow-up",
                priority: "High",
                estimatedDuration: "30 minutes",
                responsibleProvider: "Dr. Robert Martinez, Cardiologist",
            },
        ],
        riskLevel: "High",
        lastVisit: "2024-01-10",
        nextAppointment: "2024-02-10",
        physician: "Dr. Robert Martinez, MD - Cardiologist",
    },
    {
        id: "SC-003",
        name: "Emily Rodriguez",
        age: 28,
        gender: "Female",
        profileImage: "👩‍💼",
        primaryDiagnoses: ["Pre-diabetes", "PCOS", "Obesity (BMI: 29.2)"],
        chiefComplaints:
            "Irregular menstrual cycles (every 45-60 days), weight gain of 25 pounds over 2 years, and excessive hair growth on face and body. Patient reports feeling tired and having difficulty losing weight despite dieting.",
        medicalHistory: {
            previousConditions: [
                "Irregular menstrual cycles since age 16",
                "Acne and hirsutism (excessive hair growth)",
                "No previous pregnancies",
            ],
            familyHistory: [
                "Father: Type 2 diabetes (diagnosed age 50)",
                "Mother: Hypertension",
                "Maternal grandmother: PCOS and infertility",
            ],
            lifestyleHabits: [
                "Sedentary lifestyle - office job, minimal exercise",
                "Diet high in refined carbohydrates and processed foods",
                "Stress eating due to work pressure",
                "Sleeps 6-7 hours per night, irregular sleep schedule",
            ],
        },
        clinicalVitals: {
            bloodPressure: "128/82 mmHg",
            heartRate: 78,
            temperature: 98.5,
            weight: 165,
            height: 68,
            bmi: 29.2,
        },
        labResults: {
            glucose: 110,
            hba1c: 5.8,
            cholesterol: 195,
            ldl: 125,
            hdl: 45,
            triglycerides: 180,
            testosterone: 85,
            lh: 12.5,
            fsh: 6.2,
        },
        physicianRoadmap: [
            {
                id: "R13",
                title: "PCOS Diagnosis Confirmation",
                description:
                    "Comprehensive evaluation including hormone levels, ultrasound, and clinical assessment",
                justification:
                    "Patient meets Rotterdam criteria for PCOS: irregular cycles, hyperandrogenism, and polycystic ovaries. Early intervention can prevent diabetes and infertility.",
                status: "Completed",
                date: "2024-01-08",
                category: "Diagnosis",
                priority: "High",
                estimatedDuration: "2 hours",
                responsibleProvider: "Dr. Sarah Williams, Endocrinologist",
            },
            {
                id: "R14",
                title: "Pre-diabetes Identification & Risk Assessment",
                description:
                    "Fasting glucose 110 mg/dL, HbA1c 5.8% - borderline pre-diabetes",
                justification:
                    "Patient is at high risk for developing diabetes due to PCOS, family history, and obesity. Early intervention can prevent progression to diabetes.",
                status: "Completed",
                date: "2024-01-08",
                category: "Diagnosis",
                priority: "High",
                estimatedDuration: "30 minutes",
                responsibleProvider: "Dr. Sarah Williams, Endocrinologist",
            },
            {
                id: "R15",
                title: "Metformin Initiation for Insulin Resistance",
                description:
                    "Start Metformin 500mg daily, titrate to 1000mg BID over 4 weeks",
                justification:
                    "Metformin improves insulin sensitivity in PCOS patients and may help with weight loss and menstrual regularity. Off-label but well-established use.",
                status: "Completed",
                date: "2024-01-08",
                category: "Treatment",
                priority: "High",
                estimatedDuration: "Ongoing",
                responsibleProvider: "Dr. Sarah Williams, Endocrinologist",
            },
            {
                id: "R16",
                title: "Endocrinology Referral for PCOS Management",
                description:
                    "Specialized care for PCOS including fertility counseling and long-term management",
                justification:
                    "PCOS requires specialized care for optimal outcomes. Endocrinologist can provide comprehensive management including fertility considerations.",
                status: "In Progress",
                date: "2024-01-25",
                category: "Treatment",
                priority: "High",
                estimatedDuration: "1 hour",
                responsibleProvider: "Dr. Sarah Williams, Endocrinologist",
            },
            {
                id: "R17",
                title: "Structured Exercise Program",
                description:
                    "150 min/week moderate activity, resistance training 2x/week, focus on weight loss",
                justification:
                    "Exercise is crucial for PCOS management. Improves insulin sensitivity, aids weight loss, and may help with menstrual regularity.",
                status: "Pending",
                date: "2024-02-01",
                category: "Lifestyle",
                priority: "High",
                estimatedDuration: "Ongoing",
                responsibleProvider: "Exercise Physiologist",
            },
            {
                id: "R18",
                title: "Weight Loss Goal Setting & Monitoring",
                description:
                    "Target 5-10% weight loss over 6 months (8-16 pounds)",
                justification:
                    "Even modest weight loss (5-10%) can significantly improve PCOS symptoms, insulin resistance, and reduce diabetes risk.",
                status: "Pending",
                date: "2024-02-01",
                category: "Lifestyle",
                priority: "Medium",
                estimatedDuration: "Ongoing",
                responsibleProvider: "Registered Dietitian",
            },
        ],
        riskLevel: "Medium",
        lastVisit: "2024-01-08",
        nextAppointment: "2024-02-08",
        physician: "Dr. Sarah Williams, MD - Endocrinologist",
    },
    {
        id: "SC-004",
        name: "Robert Thompson",
        age: 72,
        gender: "Male",
        profileImage: "👨‍🦲",
        primaryDiagnoses: [
            "Type 2 Diabetes",
            "Heart Failure (EF: 45%)",
            "Chronic Kidney Disease Stage 3B",
            "Diabetic Neuropathy",
        ],
        chiefComplaints:
            "Poor blood sugar control despite multiple medications, numbness and tingling in feet, and shortness of breath with minimal exertion. Patient reports frequent urination and blurred vision.",
        medicalHistory: {
            previousConditions: [
                "Diabetes for 15 years with poor control",
                "Coronary artery disease with stents (2019, 2021)",
                "Chronic kidney disease stage 3B (2022)",
                "Diabetic neuropathy (2023)",
                "Retinopathy (mild, 2023)",
            ],
            familyHistory: [
                "Father: Diabetes and heart disease",
                "Mother: Hypertension and stroke",
                "Sister: Type 2 diabetes",
            ],
            lifestyleHabits: [
                "Sedentary lifestyle due to multiple health conditions",
                "Poor diet adherence despite education",
                "Former smoker (quit 2019)",
                "Sleeps 5-6 hours due to frequent urination",
            ],
        },
        clinicalVitals: {
            bloodPressure: "165/95 mmHg",
            heartRate: 88,
            temperature: 98.3,
            weight: 220,
            height: 72,
            bmi: 29.8,
        },
        labResults: {
            hba1c: 9.8,
            glucose: 280,
            creatinine: 2.1,
            egfr: 28,
            cholesterol: 220,
            ldl: 145,
            hdl: 35,
            triglycerides: 320,
            hemoglobin: 10.8,
            wbc: 8.5,
            platelets: 195,
        },
        physicianRoadmap: [
            {
                id: "R19",
                title: "Insulin Regimen Optimization",
                description:
                    "Adjust basal and bolus insulin doses, add GLP-1 agonist for better control",
                justification:
                    "HbA1c of 9.8% indicates poor glycemic control. Patient needs intensive insulin therapy and additional medications to prevent complications.",
                status: "Completed",
                date: "2024-01-12",
                category: "Treatment",
                priority: "High",
                estimatedDuration: "Ongoing",
                responsibleProvider: "Dr. Michael Brown, Endocrinologist",
            },
            {
                id: "R20",
                title: "Kidney Function Monitoring",
                description:
                    "Monthly creatinine and eGFR monitoring, nephrology consultation",
                justification:
                    "eGFR of 28 indicates advanced kidney disease. Close monitoring needed to prevent progression to dialysis and adjust medications.",
                status: "In Progress",
                date: "2024-01-20",
                category: "Monitoring",
                priority: "High",
                estimatedDuration: "30 minutes",
                responsibleProvider: "Dr. Lisa Johnson, Nephrologist",
            },
            {
                id: "R21",
                title: "Diabetic Foot Care & Podiatry Referral",
                description:
                    "Comprehensive foot examination and diabetic foot care education",
                justification:
                    "Patient has diabetic neuropathy and is at high risk for foot ulcers and amputation. Preventive care is essential.",
                status: "Pending",
                date: "2024-02-05",
                category: "Treatment",
                priority: "Medium",
                estimatedDuration: "45 minutes",
                responsibleProvider: "Dr. James Wilson, Podiatrist",
            },
            {
                id: "R22",
                title: "Cardiology Follow-up for Heart Failure",
                description:
                    "3-month cardiology appointment for heart failure management and medication optimization",
                justification:
                    "Patient has heart failure with EF 45%. Regular monitoring needed to optimize medications and prevent decompensation.",
                status: "Pending",
                date: "2024-04-12",
                category: "Follow-up",
                priority: "High",
                estimatedDuration: "30 minutes",
                responsibleProvider: "Dr. Robert Martinez, Cardiologist",
            },
            {
                id: "R23",
                title: "Advanced Diabetes Education",
                description:
                    "Comprehensive diabetes self-management education including insulin administration and complication prevention",
                justification:
                    "Patient needs advanced education on insulin management, blood glucose monitoring, and complication prevention given his complex condition.",
                status: "Pending",
                date: "2024-02-15",
                category: "Education",
                priority: "Medium",
                estimatedDuration: "4 hours",
                responsibleProvider: "Certified Diabetes Educator",
            },
        ],
        riskLevel: "High",
        lastVisit: "2024-01-12",
        nextAppointment: "2024-02-12",
        physician: "Dr. Michael Brown, MD - Endocrinologist",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Completed":
            return "bg-green-100 text-green-800 border-green-200";
        case "In Progress":
            return "bg-blue-100 text-blue-800 border-blue-200";
        case "Pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "Overdue":
            return "bg-red-100 text-red-800 border-red-200";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200";
    }
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "High":
            return "bg-red-100 text-red-800";
        case "Medium":
            return "bg-yellow-100 text-yellow-800";
        case "Low":
            return "bg-green-100 text-green-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const getCategoryIcon = (category: string) => {
    switch (category) {
        case "Diagnosis":
            return "🔍";
        case "Treatment":
            return "💊";
        case "Monitoring":
            return "📊";
        case "Lifestyle":
            return "🏃‍♀️";
        case "Follow-up":
            return "📅";
        case "Education":
            return "📚";
        default:
            return "📋";
    }
};

export default function EnhancedPatientScenarios() {
    const [selectedPatient, setSelectedPatient] =
        useState<PatientProfile | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Enhanced Patient Care Scenarios
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Comprehensive patient profiles with detailed clinical
                        information and physician treatment roadmaps
                    </p>
                </div>

                {/* Patient Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {enhancedPatientScenarios.map((patient) => (
                        <div
                            key={patient.id}
                            onClick={() => setSelectedPatient(patient)}
                            className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${
                                selectedPatient?.id === patient.id
                                    ? "border-blue-500"
                                    : "border-transparent hover:border-gray-200"
                            }`}>
                            <div className="p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="text-4xl">
                                        {patient.profileImage}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">
                                            {patient.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {patient.age}yo {patient.gender}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {patient.physician}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    {patient.primaryDiagnoses.map(
                                        (diagnosis, index) => (
                                            <span
                                                key={index}
                                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1">
                                                {diagnosis}
                                            </span>
                                        )
                                    )}
                                </div>

                                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                    <p className="text-xs text-gray-600 mb-2 font-medium">
                                        Chief Complaints:
                                    </p>
                                    <p className="text-xs text-gray-700 line-clamp-3">
                                        {patient.chiefComplaints}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            patient.riskLevel === "High"
                                                ? "bg-red-100 text-red-800"
                                                : patient.riskLevel === "Medium"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-green-100 text-green-800"
                                        }`}>
                                        {patient.riskLevel} Risk
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {
                                            patient.physicianRoadmap.filter(
                                                (step) =>
                                                    step.status === "Completed"
                                            ).length
                                        }
                                        /{patient.physicianRoadmap.length}{" "}
                                        Complete
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Patient Detail View */}
                {selectedPatient && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Patient Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                            <div className="flex items-center space-x-6">
                                <div className="text-6xl">
                                    {selectedPatient.profileImage}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold">
                                        {selectedPatient.name}
                                    </h2>
                                    <p className="text-blue-100 text-lg">
                                        {selectedPatient.age} years old,{" "}
                                        {selectedPatient.gender}
                                    </p>
                                    <p className="text-blue-200">
                                        Patient ID: {selectedPatient.id}
                                    </p>
                                    <p className="text-blue-200 text-sm mt-1">
                                        Primary Care:{" "}
                                        {selectedPatient.physician}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-blue-200">Last Visit</p>
                                    <p className="text-xl font-semibold">
                                        {selectedPatient.lastVisit}
                                    </p>
                                    <p className="text-blue-200 mt-2">
                                        Next Appointment
                                    </p>
                                    <p className="text-xl font-semibold">
                                        {selectedPatient.nextAppointment}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                            {/* Left Column - Patient Info */}
                            <div className="space-y-6">
                                {/* Primary Diagnoses */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                                        Primary Diagnoses
                                    </h3>
                                    <div className="space-y-2">
                                        {selectedPatient.primaryDiagnoses.map(
                                            (diagnosis, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-2">
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                    <span className="text-gray-700">
                                                        {diagnosis}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Chief Complaints */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                                        Chief Complaints
                                    </h3>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {selectedPatient.chiefComplaints}
                                    </p>
                                </div>

                                {/* Medical History */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                                        Medical History
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 text-sm mb-1">
                                                Previous Conditions:
                                            </h4>
                                            <ul className="text-gray-700 text-sm space-y-1">
                                                {selectedPatient.medicalHistory.previousConditions.map(
                                                    (condition, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start space-x-2">
                                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                                                            <span>
                                                                {condition}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 text-sm mb-1">
                                                Family History:
                                            </h4>
                                            <ul className="text-gray-700 text-sm space-y-1">
                                                {selectedPatient.medicalHistory.familyHistory.map(
                                                    (history, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start space-x-2">
                                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                                                            <span>
                                                                {history}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 text-sm mb-1">
                                                Lifestyle Habits:
                                            </h4>
                                            <ul className="text-gray-700 text-sm space-y-1">
                                                {selectedPatient.medicalHistory.lifestyleHabits.map(
                                                    (habit, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start space-x-2">
                                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                                                            <span>{habit}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Clinical Vitals */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                                        Clinical Vitals
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-gray-600">
                                                BP:
                                            </span>
                                            <span className="font-semibold text-gray-900 ml-1">
                                                {
                                                    selectedPatient
                                                        .clinicalVitals
                                                        .bloodPressure
                                                }
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                HR:
                                            </span>
                                            <span className="font-semibold text-gray-900 ml-1">
                                                {
                                                    selectedPatient
                                                        .clinicalVitals
                                                        .heartRate
                                                }{" "}
                                                bpm
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                Temp:
                                            </span>
                                            <span className="font-semibold text-gray-900 ml-1">
                                                {
                                                    selectedPatient
                                                        .clinicalVitals
                                                        .temperature
                                                }
                                                °F
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                Weight:
                                            </span>
                                            <span className="font-semibold text-gray-900 ml-1">
                                                {
                                                    selectedPatient
                                                        .clinicalVitals.weight
                                                }{" "}
                                                lbs
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                Height:
                                            </span>
                                            <span className="font-semibold text-gray-900 ml-1">
                                                {
                                                    selectedPatient
                                                        .clinicalVitals.height
                                                }
                                                "
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                BMI:
                                            </span>
                                            <span className="font-semibold text-gray-900 ml-1">
                                                {
                                                    selectedPatient
                                                        .clinicalVitals.bmi
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Lab Results */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                                        Key Lab Results
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        {Object.entries(
                                            selectedPatient.labResults
                                        ).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex justify-between">
                                                <span className="text-gray-600 capitalize">
                                                    {key
                                                        .replace(
                                                            /([A-Z])/g,
                                                            " $1"
                                                        )
                                                        .trim()}
                                                    :
                                                </span>
                                                <span className="font-semibold text-gray-900">
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Physician Roadmap */}
                            <div className="lg:col-span-2">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-bold text-lg text-gray-900 mb-4">
                                        Physician Treatment Roadmap
                                    </h3>

                                    {/* Roadmap Progress */}
                                    <div className="mb-6">
                                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                                            <span>Treatment Progress</span>
                                            <span>
                                                {
                                                    selectedPatient.physicianRoadmap.filter(
                                                        (step) =>
                                                            step.status ===
                                                            "Completed"
                                                    ).length
                                                }{" "}
                                                of{" "}
                                                {
                                                    selectedPatient
                                                        .physicianRoadmap.length
                                                }{" "}
                                                completed
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className="bg-gradient-to-r from-blue-600 to-blue-700 h-3 rounded-full transition-all duration-300"
                                                style={{
                                                    width: `${
                                                        (selectedPatient.physicianRoadmap.filter(
                                                            (step) =>
                                                                step.status ===
                                                                "Completed"
                                                        ).length /
                                                            selectedPatient
                                                                .physicianRoadmap
                                                                .length) *
                                                        100
                                                    }%`,
                                                }}></div>
                                        </div>
                                    </div>

                                    {/* Roadmap Steps */}
                                    <div className="space-y-4">
                                        {selectedPatient.physicianRoadmap.map(
                                            (step) => (
                                                <div
                                                    key={step.id}
                                                    className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center space-x-3 flex-1">
                                                            <span className="text-2xl">
                                                                {getCategoryIcon(
                                                                    step.category
                                                                )}
                                                            </span>
                                                            <div className="flex-1">
                                                                <h4 className="font-semibold text-gray-900 mb-1">
                                                                    {step.title}
                                                                </h4>
                                                                <p className="text-sm text-gray-600 mb-2">
                                                                    {
                                                                        step.description
                                                                    }
                                                                </p>
                                                                <div className="bg-blue-50 rounded-lg p-3 mb-2">
                                                                    <p className="text-xs font-medium text-blue-800 mb-1">
                                                                        Clinical
                                                                        Justification:
                                                                    </p>
                                                                    <p className="text-xs text-blue-700 leading-relaxed">
                                                                        {
                                                                            step.justification
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end space-y-1 ml-4">
                                                            <span
                                                                className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                                                    step.status
                                                                )}`}>
                                                                {step.status}
                                                            </span>
                                                            <span
                                                                className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                                                    step.priority
                                                                )}`}>
                                                                {step.priority}{" "}
                                                                Priority
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
                                                        <div className="flex items-center space-x-4">
                                                            <span className="flex items-center space-x-1">
                                                                <span>📅</span>
                                                                <span>
                                                                    {step.date}
                                                                </span>
                                                            </span>
                                                            <span className="flex items-center space-x-1">
                                                                <span>⏱️</span>
                                                                <span>
                                                                    {
                                                                        step.estimatedDuration
                                                                    }
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                                                                {step.category}
                                                            </span>
                                                            <span className="text-xs text-gray-400">
                                                                {
                                                                    step.responsibleProvider
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
