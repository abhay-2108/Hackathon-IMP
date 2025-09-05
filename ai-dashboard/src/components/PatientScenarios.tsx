"use client";
import React, { useState } from "react";

interface PatientProfile {
    id: string;
    name: string;
    age: number;
    gender: "Male" | "Female";
    primaryDiagnoses: string[];
    profileImage: string;
    medicalHistory: string[];
    currentMedications: string[];
    physicianRoadmap: RoadmapStep[];
    riskLevel: "Low" | "Medium" | "High";
    lastVisit: string;
    nextAppointment: string;
}

interface RoadmapStep {
    id: string;
    title: string;
    description: string;
    status: "Completed" | "In Progress" | "Pending" | "Overdue";
    date: string;
    category:
        | "Diagnosis"
        | "Treatment"
        | "Monitoring"
        | "Lifestyle"
        | "Follow-up";
    priority: "High" | "Medium" | "Low";
}

const patientScenarios: PatientProfile[] = [
    {
        id: "SC-001",
        name: "Sarah Johnson",
        age: 34,
        gender: "Female",
        primaryDiagnoses: ["Type 2 Diabetes", "Obesity (BMI: 32)"],
        profileImage: "👩‍🦱",
        medicalHistory: [
            "Family history of diabetes (mother, grandmother)",
            "Gestational diabetes during pregnancy (2019)",
            "Pre-diabetes diagnosis (2021)",
            "No previous hospitalizations",
        ],
        currentMedications: [
            "Metformin 500mg twice daily",
            "Lisinopril 10mg daily (blood pressure)",
        ],
        physicianRoadmap: [
            {
                id: "R1",
                title: "Initial Diabetes Diagnosis",
                description: "Confirmed Type 2 diabetes with HbA1c of 8.2%",
                status: "Completed",
                date: "2024-01-15",
                category: "Diagnosis",
                priority: "High",
            },
            {
                id: "R2",
                title: "Metformin Initiation",
                description: "Started Metformin 500mg BID with meal",
                status: "Completed",
                date: "2024-01-15",
                category: "Treatment",
                priority: "High",
            },
            {
                id: "R3",
                title: "Diabetes Education Program",
                description: "Referred to certified diabetes educator",
                status: "In Progress",
                date: "2024-01-20",
                category: "Lifestyle",
                priority: "High",
            },
            {
                id: "R4",
                title: "Nutritional Counseling",
                description:
                    "Registered dietitian consultation for meal planning",
                status: "Pending",
                date: "2024-02-01",
                category: "Lifestyle",
                priority: "High",
            },
            {
                id: "R5",
                title: "HbA1c Follow-up",
                description: "3-month HbA1c check to assess treatment response",
                status: "Pending",
                date: "2024-04-15",
                category: "Monitoring",
                priority: "High",
            },
            {
                id: "R6",
                title: "Weight Management Program",
                description:
                    "Structured weight loss program with goal of 10% body weight reduction",
                status: "Pending",
                date: "2024-02-15",
                category: "Lifestyle",
                priority: "Medium",
            },
        ],
        riskLevel: "High",
        lastVisit: "2024-01-15",
        nextAppointment: "2024-02-15",
    },
    {
        id: "SC-002",
        name: "Michael Chen",
        age: 67,
        gender: "Male",
        primaryDiagnoses: [
            "Heart Failure (EF: 35%)",
            "Hypertension",
            "Atrial Fibrillation",
        ],
        profileImage: "👨‍🦳",
        medicalHistory: [
            "Myocardial infarction (2018)",
            "Coronary artery bypass surgery (2018)",
            "Atrial fibrillation diagnosis (2020)",
            "Chronic kidney disease stage 3",
        ],
        currentMedications: [
            "Carvedilol 25mg twice daily",
            "Lisinopril 20mg daily",
            "Furosemide 40mg daily",
            "Warfarin 5mg daily",
            "Atorvastatin 40mg daily",
        ],
        physicianRoadmap: [
            {
                id: "R7",
                title: "Heart Failure Optimization",
                description:
                    "Optimized heart failure medications and confirmed EF 35%",
                status: "Completed",
                date: "2024-01-10",
                category: "Treatment",
                priority: "High",
            },
            {
                id: "R8",
                title: "Cardiac Rehabilitation",
                description:
                    "Phase II cardiac rehabilitation program completion",
                status: "Completed",
                date: "2024-01-05",
                category: "Lifestyle",
                priority: "High",
            },
            {
                id: "R9",
                title: "Echocardiogram Follow-up",
                description: "6-month echo to assess cardiac function",
                status: "In Progress",
                date: "2024-02-10",
                category: "Monitoring",
                priority: "High",
            },
            {
                id: "R10",
                title: "INR Monitoring",
                description: "Weekly INR checks for warfarin management",
                status: "In Progress",
                date: "2024-01-20",
                category: "Monitoring",
                priority: "High",
            },
            {
                id: "R11",
                title: "Dietary Sodium Restriction",
                description: "Cardiac diet education - <2g sodium daily",
                status: "Pending",
                date: "2024-02-01",
                category: "Lifestyle",
                priority: "Medium",
            },
            {
                id: "R12",
                title: "Cardiology Follow-up",
                description: "3-month cardiology appointment",
                status: "Pending",
                date: "2024-04-10",
                category: "Follow-up",
                priority: "High",
            },
        ],
        riskLevel: "High",
        lastVisit: "2024-01-10",
        nextAppointment: "2024-02-10",
    },
    {
        id: "SC-003",
        name: "Emily Rodriguez",
        age: 28,
        gender: "Female",
        primaryDiagnoses: ["Pre-diabetes", "PCOS", "Obesity (BMI: 29)"],
        profileImage: "👩‍💼",
        medicalHistory: [
            "Irregular menstrual cycles since age 16",
            "Weight gain of 40 lbs over 3 years",
            "Family history of diabetes (father)",
            "No previous pregnancies",
        ],
        currentMedications: [
            "Metformin 500mg daily (off-label for PCOS)",
            "Oral contraceptive pill",
        ],
        physicianRoadmap: [
            {
                id: "R13",
                title: "PCOS Diagnosis Confirmation",
                description:
                    "Confirmed PCOS with elevated androgens and polycystic ovaries",
                status: "Completed",
                date: "2024-01-08",
                category: "Diagnosis",
                priority: "High",
            },
            {
                id: "R14",
                title: "Pre-diabetes Identification",
                description: "Fasting glucose 110 mg/dL, HbA1c 5.8%",
                status: "Completed",
                date: "2024-01-08",
                category: "Diagnosis",
                priority: "High",
            },
            {
                id: "R15",
                title: "Metformin Initiation",
                description: "Started Metformin for insulin resistance",
                status: "Completed",
                date: "2024-01-08",
                category: "Treatment",
                priority: "High",
            },
            {
                id: "R16",
                title: "Endocrinology Referral",
                description: "Referral to endocrinologist for PCOS management",
                status: "In Progress",
                date: "2024-01-25",
                category: "Treatment",
                priority: "High",
            },
            {
                id: "R17",
                title: "Exercise Program",
                description:
                    "Structured exercise program - 150 min/week moderate activity",
                status: "Pending",
                date: "2024-02-01",
                category: "Lifestyle",
                priority: "High",
            },
            {
                id: "R18",
                title: "Weight Loss Goal Setting",
                description: "Target 5-10% weight loss over 6 months",
                status: "Pending",
                date: "2024-02-01",
                category: "Lifestyle",
                priority: "Medium",
            },
        ],
        riskLevel: "Medium",
        lastVisit: "2024-01-08",
        nextAppointment: "2024-02-08",
    },
    {
        id: "SC-004",
        name: "Robert Thompson",
        age: 72,
        gender: "Male",
        primaryDiagnoses: [
            "Type 2 Diabetes",
            "Heart Failure (EF: 45%)",
            "Chronic Kidney Disease",
        ],
        profileImage: "👨‍🦲",
        medicalHistory: [
            "Diabetes for 15 years",
            "Coronary artery disease with stents (2019, 2021)",
            "Chronic kidney disease stage 3B",
            "Diabetic neuropathy",
        ],
        currentMedications: [
            "Insulin glargine 40 units daily",
            "Insulin lispro with meals",
            "Metformin 1000mg twice daily",
            "Carvedilol 12.5mg twice daily",
            "Lisinopril 10mg daily",
        ],
        physicianRoadmap: [
            {
                id: "R19",
                title: "Insulin Regimen Optimization",
                description: "Adjusted basal and bolus insulin doses",
                status: "Completed",
                date: "2024-01-12",
                category: "Treatment",
                priority: "High",
            },
            {
                id: "R20",
                title: "Kidney Function Monitoring",
                description: "Monthly creatinine and eGFR monitoring",
                status: "In Progress",
                date: "2024-01-20",
                category: "Monitoring",
                priority: "High",
            },
            {
                id: "R21",
                title: "Diabetic Foot Care",
                description: "Podiatry referral for diabetic foot assessment",
                status: "Pending",
                date: "2024-02-05",
                category: "Treatment",
                priority: "Medium",
            },
            {
                id: "R22",
                title: "Cardiology Follow-up",
                description:
                    "3-month cardiology appointment for heart failure management",
                status: "Pending",
                date: "2024-04-12",
                category: "Follow-up",
                priority: "High",
            },
            {
                id: "R23",
                title: "Diabetes Education Update",
                description: "Advanced diabetes self-management education",
                status: "Pending",
                date: "2024-02-15",
                category: "Lifestyle",
                priority: "Medium",
            },
        ],
        riskLevel: "High",
        lastVisit: "2024-01-12",
        nextAppointment: "2024-02-12",
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
        default:
            return "📋";
    }
};

export default function PatientScenarios() {
    const [selectedPatient, setSelectedPatient] =
        useState<PatientProfile | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Patient Care Scenarios
                    </h1>
                    <p className="text-gray-600">
                        Comprehensive patient profiles with physician treatment
                        roadmaps
                    </p>
                </div>

                {/* Patient Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {patientScenarios.map((patient) => (
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
                                <div>
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
                                </div>
                                <div className="ml-auto text-right">
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

                                {/* Medical History */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                                        Medical History
                                    </h3>
                                    <div className="space-y-2">
                                        {selectedPatient.medicalHistory.map(
                                            (history, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start space-x-2">
                                                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2"></span>
                                                    <span className="text-gray-700 text-sm">
                                                        {history}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Current Medications */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                                        Current Medications
                                    </h3>
                                    <div className="space-y-2">
                                        {selectedPatient.currentMedications.map(
                                            (medication, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-2">
                                                    <span className="text-green-500">
                                                        💊
                                                    </span>
                                                    <span className="text-gray-700 text-sm">
                                                        {medication}
                                                    </span>
                                                </div>
                                            )
                                        )}
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
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                                                    className="bg-white rounded-lg p-4 border border-gray-200">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex items-center space-x-3">
                                                            <span className="text-2xl">
                                                                {getCategoryIcon(
                                                                    step.category
                                                                )}
                                                            </span>
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900">
                                                                    {step.title}
                                                                </h4>
                                                                <p className="text-sm text-gray-600">
                                                                    {
                                                                        step.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end space-y-1">
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
                                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                                        <span className="flex items-center space-x-1">
                                                            <span>📅</span>
                                                            <span>
                                                                {step.date}
                                                            </span>
                                                        </span>
                                                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                                                            {step.category}
                                                        </span>
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
