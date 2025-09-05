"use client";

import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        // The original script relies on DOMContentLoaded. In Next.js client components,
        // the DOM is already available here.
        const script = document.createElement("script");
        script.type = "module";
        script.innerHTML = `(${function () {
            (function () {
                const cohortView = document.getElementById("cohort-view");
                const detailView = document.getElementById(
                    "patient-detail-view"
                );
                const comparisonView =
                    document.getElementById("comparison-view");
                const patientList = document.getElementById("patient-list");
                const backButton = document.getElementById("back-button");
                const compareBackButton = document.getElementById(
                    "compare-back-button"
                );
                const compareButton = document.getElementById("compare-button");
                const compareDate1Input =
                    document.getElementById("compare-date1");
                const compareDate2Input =
                    document.getElementById("compare-date2");
                const comparisonPanels =
                    document.getElementById("comparison-panels");
                const detailName = document.getElementById("detail-name");
                const detailId = document.getElementById("detail-id");
                const detailIcon = document.getElementById("detail-icon");
                const detailScore = document.getElementById("detail-score");
                const detailActions = document.getElementById("detail-actions");
                const detailDrivers = document.getElementById("detail-drivers");
                const compareDaysButton = document.getElementById(
                    "compare-days-button"
                );
                const compareDay1Input =
                    document.getElementById("compare-day1-input");
                const compareDay2Input =
                    document.getElementById("compare-day2-input");
                const dayComparisonChartContainer = document.getElementById(
                    "day-comparison-chart-container"
                );
                const dayComparisonTextContainer = document.getElementById(
                    "day-comparison-text-container"
                );
                let dayComparisonChart;
                let currentPatient;
                const generateSummaryButton = document.getElementById(
                    "generate-summary-button"
                );
                const generatePlanButton = document.getElementById(
                    "generate-plan-button"
                );
                const aiContentContainer = document.getElementById(
                    "ai-content-container"
                );
                const aiContentTitle =
                    document.getElementById("ai-content-title");
                const aiContentText =
                    document.getElementById("ai-content-text");
                const detailAge = document.getElementById("detail-age");
                const detailBloodGroup =
                    document.getElementById("detail-blood-group");
                const detailHeight = document.getElementById("detail-height");
                const detailWeight = document.getElementById("detail-weight");
                const detailDisease = document.getElementById("detail-disease");

                let selectedPatients = new Set();
                let myChart;

                const patients = [
                     {
                        id: 'P-001',
                        name: 'Priya Sharma', // Leukemia (AML)
                        age: 65,
                        gender: 'Female',
                        bloodGroup: 'A+',
                        disease: 'Acute Myeloid Leukemia (AML)',
                        riskScore: 0.85,
                        riskLevel: 'high',
                        symptoms: ['Persistent fatigue', 'Frequent infections', 'Easy bruising'],
                        familyHistory: 'None',
                        bloodTest: {
                            wbc: 150.5, // K/uL
                            rbc: 3.2, // M/uL
                            hemoglobin: 9.1, // g/dL
                            platelets: 50, // K/uL
                            ldh: 300, // U/L
                            calcium: 9.0, // mg/dL
                        },
                        boneMarrow: {
                            blasts: 25, // %
                            cellularity: 90, // %
                        },
                        genetics: {
                            mutations: ['NPM1', 'FLT3-ITD'],
                            chromosomal: 'Normal Karyotype'
                        },
                        trends: generateMockTrendData({ wbc: 150, platelets: 50, hemoglobin: 9.1 }),
                        drivers: [
                            { factor: 'High Blast Percentage (25%)', influence: 'high' },
                            { factor: 'NPM1 Mutation', influence: 'high' },
                            { factor: 'Low Platelet Count', influence: 'medium' },
                        ],
                        actions: [
                            'Immediate hematologist consultation',
                            'Schedule bone marrow biopsy',
                            'Initiate cytogenetic analysis',
                        ],
                    },
                    {
                        id: 'P-002',
                        name: 'Rajesh Kumar', // Multiple Myeloma
                        age: 72,
                        gender: 'Male',
                        bloodGroup: 'O-',
                        disease: 'Multiple Myeloma',
                        riskScore: 0.78,
                        riskLevel: 'high',
                        symptoms: ['Bone pain (back)', 'Fatigue', 'Unexplained weight loss'],
                        familyHistory: 'None',
                        bloodTest: {
                            wbc: 4.5,
                            rbc: 3.8,
                            hemoglobin: 10.2,
                            platelets: 180,
                            ldh: 250,
                            calcium: 11.5, // High
                            albumin: 3.2, // Low
                            b2m: 5.8, // High
                            mProtein: 3.5 // g/dL
                        },
                        boneMarrow: {
                            plasmaCells: 40, // %
                        },
                        imaging: ['Lytic lesions in spine (CT)'],
                        trends: generateMockTrendData({ calcium: 11.5, albumin: 3.2, hemoglobin: 10.2 }),
                        drivers: [
                            { factor: 'High M-protein (SPEP)', influence: 'high' },
                            { factor: 'Bone lesions on CT scan', influence: 'high' },
                            { factor: 'Elevated B2M levels', influence: 'medium' },
                        ],
                        actions: [
                            'Refer to oncology for treatment planning',
                            'Monitor kidney function',
                            'Assess for bone pain management',
                        ],
                    },
                    {
                        id: 'P-003',
                        name: 'Anjali Singh', // Lymphoma
                        age: 55,
                        gender: 'Male',
                        bloodGroup: 'B+',
                        disease: 'Non-Hodgkin Lymphoma',
                        riskScore: 0.58,
                        riskLevel: 'medium',
                        symptoms: ['Swollen lymph nodes (neck)', 'Night sweats', 'Fever'],
                        familyHistory: 'Brother with Lymphoma',
                        bloodTest: {
                            wbc: 12.0,
                            rbc: 4.5,
                            hemoglobin: 13.5,
                            platelets: 250,
                            ldh: 450, // High
                            calcium: 9.5,
                        },
                        imaging: ['Enlarged lymph nodes in chest (PET)'],
                        trends: generateMockTrendData({ ldh: 450, wbc: 12.0 }),
                        drivers: [
                            { factor: 'Enlarged lymph nodes (PET scan)', influence: 'high' },
                            { factor: 'Elevated LDH levels', influence: 'medium' },
                            { factor: 'Reported night sweats', influence: 'low' },
                        ],
                        actions: [
                            'Schedule lymph node biopsy',
                            'Monitor for B symptoms (fever, weight loss)',
                            'Follow-up in 3 months',
                        ],
                    },
                    {
                        id: 'P-004',
                        name: 'Suresh Patel', // CLL
                        age: 68,
                        gender: 'Female',
                        bloodGroup: 'AB+',
                        disease: 'Chronic Lymphocytic Leukemia (CLL)',
                        riskScore: 0.45,
                        riskLevel: 'low',
                        symptoms: ['None, found on routine check-up'],
                        familyHistory: 'None',
                        bloodTest: {
                            wbc: 35.0, // High
                            rbc: 4.2,
                            hemoglobin: 12.5,
                            platelets: 190,
                            lymphocytes: 85, // % of WBC, high
                            ldh: 180,
                        },
                        physicalExam: ['Enlarged spleen'],
                        trends: generateMockTrendData({ wbc: 35.0, lymphocytes: 85 }),
                        drivers: [
                            { factor: 'High Lymphocyte Count', influence: 'medium' },
                            { factor: 'Enlarged Spleen (physical exam)', influence: 'low' },
                        ],
                        actions: [
                            'Watch and wait approach',
                            'Annual physical and blood work',
                            'Educate on signs of progression',
                        ],
                    },
                    {
                        id: 'P-005',
                        name: 'Deepak Gupta', // Healthy
                        age: 39,
                        gender: 'Male',
                        bloodGroup: 'A-',
                        disease: 'No Diagnosis',
                        riskScore: 0.05,
                        riskLevel: 'low',
                        symptoms: ['None'],
                        familyHistory: 'None',
                        bloodTest: {
                            wbc: 6.5,
                            rbc: 5.0,
                            hemoglobin: 15.5,
                            platelets: 250,
                            ldh: 140,
                            calcium: 9.8,
                        },
                        trends: generateMockTrendData({ wbc: 6.5, platelets: 250, hemoglobin: 15.5 }),
                        drivers: [
                            { factor: 'Normal CBC values', influence: 'high-negative' },
                            { factor: 'No concerning symptoms', influence: 'high-negative' },
                        ],
                        actions: [
                            'Continue routine monitoring',
                            'Promote healthy lifestyle',
                        ],
                    },
                    {
                        id: 'P-006',
                        name: 'Sunita Reddy', // CML
                        age: 45,
                        gender: 'Female',
                        bloodGroup: 'O+',
                        disease: 'Chronic Myeloid Leukemia (CML)',
                        riskScore: 0.65,
                        riskLevel: 'medium',
                        symptoms: ['Fatigue', 'Night sweats'],
                        familyHistory: 'None',
                        bloodTest: {
                            wbc: 55.0, // High
                            rbc: 4.1,
                            hemoglobin: 11.8,
                            platelets: 450, // High
                            ldh: 210,
                        },
                        genetics: {
                            chromosomal: 'Philadelphia chromosome (BCR-ABL1)',
                        },
                        trends: generateMockTrendData({ wbc: 55.0, platelets: 450, hemoglobin: 11.8 }),
                        drivers: [
                            { factor: 'Philadelphia chromosome positive', influence: 'high' },
                            { factor: 'Elevated WBC and Platelet counts', influence: 'medium' },
                        ],
                        actions: ['Start Tyrosine Kinase Inhibitor (TKI) therapy', 'Monitor molecular response with PCR', 'Regular CBC checks'],
                    },
                ];

                function generateMockTrendData(overrides = {}) {
                    const data = {};
                    for (let i = 89; i >= 0; i--) {
                        const date = new Date();
                        date.setDate(date.getDate() - i);
                        const dateStr = date.toISOString().split("T")[0];
                        data[dateStr] = {
                            date: dateStr,
                            wbc: (overrides.wbc || 7.5) + (Math.random() - 0.5) * 2,
                            platelets: (overrides.platelets || 200) + (Math.random() - 0.5) * 50,
                            rbc: (overrides.rbc || 4.5) + (Math.random() - 0.5) * 0.5,
                            hemoglobin: (overrides.hemoglobin || 14) + (Math.random() - 0.5) * 1,
                            ldh: (overrides.ldh || 150) + (Math.random() - 0.5) * 40,
                            calcium: (overrides.calcium || 9.5) + (Math.random() - 0.5) * 1,
                            albumin: (overrides.albumin || 4.0) + (Math.random() - 0.5) * 0.5,
                            lymphocytes: (overrides.lymphocytes || 30) + (Math.random() - 0.5) * 5,
                        };
                    }
                    return data;
                }

                async function callGeminiAPI(prompt) {
                    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
                    const payload = {
                        contents: [{ parts: [{ text: prompt }] }],
                        tools: [{ google_search: {} }],
                    };
                    try {
                        const response = await fetch(apiUrl, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload),
                        });
                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(
                                `API error: ${JSON.stringify(errorData)}`
                            );
                        }
                        const result = await response.json();
                        const candidate = result.candidates?.[0];
                        if (candidate && candidate.content?.parts?.[0]?.text) {
                            return candidate.content.parts[0].text;
                        }
                        return "No response generated.";
                    } catch (error) {
                        console.error("Gemini API call failed:", error);
                        return `Error: ${error.message}`;
                    }
                }

                function renderCohortView() {
                    patientList.innerHTML = "";
                    patients.sort((a, b) => b.riskScore - a.riskScore).forEach((patient) => {
                        let riskClass = '';
                        let riskIcon = 'fa-check-circle';
                        let riskText = 'Low Risk';
                        if (patient.riskLevel === 'high') {
                            riskClass = 'from-red-50 to-red-100 border-red-200';
                            riskIcon = 'fa-triangle-exclamation text-red-500';
                            riskText = 'High Risk';
                        } else if (patient.riskLevel === 'medium') {
                            riskClass = 'from-yellow-50 to-yellow-100 border-yellow-200';
                            riskIcon = 'fa-shield-halved text-yellow-500';
                            riskText = 'Medium Risk';
                        } else {
                            riskClass = 'from-green-50 to-green-100 border-green-200';
                            riskIcon = 'fa-check-circle text-green-500';
                            riskText = 'Low Risk';
                        }

                        const card = `
                <div class="bg-gradient-to-br ${riskClass} p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border" data-id="${patient.id}">
                    <div class="flex items-start justify-between">
                        <div>
                            <h3 class="text-xl font-bold text-gray-800">${patient.name}</h3>
                            <p class="text-sm text-gray-500">ID: ${patient.id} &middot; ${patient.age}yo ${patient.gender.charAt(0)}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-2xl text-gray-800">${(patient.riskScore * 100).toFixed(0)}%</p>
                            <p class="text-xs font-medium ${riskIcon.split(' ')[1]}">${riskText}</p>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-gray-900/10 flex justify-between items-center text-sm">
                        <div class="text-center">
                            <p class="text-xs text-gray-500">WBC</p>
                            <p class="font-semibold text-gray-800">${patient.bloodTest.wbc.toFixed(1)}</p>
                        </div>
                        <div class="text-center">
                            <p class="text-xs text-gray-500">Hgb</p>
                            <p class="font-semibold text-gray-800">${patient.bloodTest.hemoglobin.toFixed(1)}</p>
                        </div>
                        <div class="text-center">
                            <p class="text-xs text-gray-500">Platelets</p>
                            <p class="font-semibold text-gray-800">${patient.bloodTest.platelets.toFixed(0)}</p>
                        </div>
                        <div class="flex items-center pl-4">
                            <input type="checkbox" data-id="${patient.id}" class="compare-checkbox h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-md">
                        </div>
                    </div>
                </div>`;
                        patientList.innerHTML += card;
                    });

                    patientList
                        .querySelectorAll(".compare-checkbox")
                        .forEach((checkbox) => {
                            checkbox.addEventListener("click", (e) =>
                                e.stopPropagation()
                            );
                            checkbox.addEventListener("change", (e) => {
                                const id = e.target.dataset.id;
                                if (e.target.checked) {
                                    if (selectedPatients.size < 2) {
                                        selectedPatients.add(id);
                                    } else {
                                        e.target.checked = false;
                                    }
                                } else {
                                    selectedPatients.delete(id);
                                }
                                updateCompareButtonState();
                            });
                        });

                    patientList
                        .querySelectorAll("div[data-id]")
                        .forEach((card) => {
                            card.addEventListener("click", (e) => {
                                if (!e.target.closest(".compare-checkbox")) {
                                    const id = card.dataset.id;
                                    const url = new URL(window.location.href);
                                    url.searchParams.set("patient", id);
                                    window.history.replaceState(
                                        {},
                                        "",
                                        url.toString()
                                    );
                                    transitionView(cohortView, detailView);
                                    setTimeout(() => {
                                        renderPatientDetailView(id);
                                    }, 550);
                                }
                            });
                        });
                }

                function updateCompareButtonState() {
                    if (selectedPatients.size === 2) {
                        compareButton.classList.remove(
                            "opacity-50",
                            "cursor-not-allowed"
                        );
                        compareButton.classList.add("hover:bg-blue-600");
                        compareButton.disabled = false;
                    } else {
                        compareButton.classList.add(
                            "opacity-50",
                            "cursor-not-allowed"
                        );
                        compareButton.classList.remove("hover:bg-blue-600");
                        compareButton.disabled = true;
                    }
                }

                function renderPatientDetailView(id) {
                    const patient = patients.find((p) => p.id === id);
                    if (!patient) return;
                    currentPatient = patient;
                    const color =
                        patient.riskLevel === "high"
                            ? "text-red-600"
                            : patient.riskLevel === "medium"
                            ? "text-yellow-600"
                            : "text-green-600";
                    const icon =
                        patient.riskLevel === "high"
                            ? "fas fa-exclamation-triangle"
                            : patient.riskLevel === "medium"
                            ? "fas fa-shield-alt"
                            : "fas fa-check-circle";
                    detailName.textContent = patient.name;
                    detailId.textContent = patient.id;
                    detailIcon.className = icon + " " + color;
                    detailScore.textContent = `${(
                        patient.riskScore * 100
                    ).toFixed(0)}%`;
                    detailAge.textContent = patient.age;
                    detailBloodGroup.textContent = patient.bloodGroup;
                    detailDisease.textContent = patient.disease;
                    detailActions.innerHTML = patient.actions
                        .map(
                            (action) => `
            <li class="flex items-start space-x-2">
              <i class="fas fa-arrow-right text-gray-400 mt-1"></i>
              <span>${action}</span>
            </li>
          `
                        )
                        .join("");
                    detailDrivers.innerHTML = patient.drivers
                        .map((driver) => {
                            let driverColor = "text-gray-600";
                            if (driver.influence.includes("high")) {
                                driverColor = "text-red-500";
                            }
                            if (driver.influence.includes("negative")) {
                                driverColor = "text-green-500";
                            }
                            return `
              <li class="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <span class="font-medium text-gray-700">${driver.factor}</span>
                <span class="font-semibold text-sm ${driverColor}">${driver.influence.replace(
                                "-",
                                " "
                            )}</span>
              </li>
            `;
                        })
                        .join("");
                    dayComparisonChartContainer.classList.add("hidden");
                    dayComparisonTextContainer.classList.add("hidden");
                    dayComparisonTextContainer.innerHTML = "";
                    if (dayComparisonChart) {
                        dayComparisonChart.destroy();
                    }
                    aiContentContainer.classList.add("hidden");
                    aiContentTitle.textContent = "";
                    aiContentText.innerHTML = "";

                    // New: Display all patient details
                    renderFullPatientDetails(patient);
                    // New: Set up chart selection buttons
                    setupChartSelection(patient);
                                    renderChart(patient.trends, 90);

                                    document.querySelectorAll('.trends-period-button').forEach(button => {
                                        button.addEventListener('click', (e) => {
                                            // Remove active styles from all buttons
                                            document.querySelectorAll('.trends-period-button').forEach(btn => {
                                                btn.classList.remove('bg-blue-600', 'text-white');
                                                btn.classList.add('bg-gray-200', 'text-gray-700');
                                            });
                                            // Add active styles to the clicked button
                                            e.currentTarget.classList.add('bg-blue-600', 'text-white');
                                            e.currentTarget.classList.remove('bg-gray-200', 'text-gray-700');
                                            const days = parseInt(e.currentTarget.dataset.days, 10);
                                            renderChart(patient.trends, days);
                                        });
                                    });
                }

                // New function to render detailed patient info
                function renderFullPatientDetails(patient) {
                    const detailGender = document.getElementById('detail-gender');
                    const bloodTestList = document.getElementById('blood-test-list');
                    const boneMarrowList = document.getElementById('bone-marrow-list');
                    const symptomsList = document.getElementById('symptoms-list');

                    if (detailGender) detailGender.textContent = patient.gender || 'N/A';

                    if (bloodTestList) {
                        bloodTestList.innerHTML = `
                            <li class="flex justify-between"><span>WBC:</span> <span class="font-semibold">${patient.bloodTest.wbc} K/uL</span></li>
                            <li class="flex justify-between"><span>RBC:</span> <span class="font-semibold">${patient.bloodTest.rbc} M/uL</span></li>
                            <li class="flex justify-between"><span>Hemoglobin:</span> <span class="font-semibold">${patient.bloodTest.hemoglobin} g/dL</span></li>
                            <li class="flex justify-between"><span>Platelets:</span> <span class="font-semibold">${patient.bloodTest.platelets} K/uL</span></li>
                            <li class="flex justify-between"><span>LDH:</span> <span class="font-semibold">${patient.bloodTest.ldh} U/L</span></li>
                            ${patient.bloodTest.calcium ? `<li class="flex justify-between"><span>Calcium:</span> <span class="font-semibold">${patient.bloodTest.calcium} mg/dL</span></li>` : ''}
                            ${patient.bloodTest.albumin ? `<li class="flex justify-between"><span>Albumin:</span> <span class="font-semibold">${patient.bloodTest.albumin} g/dL</span></li>` : ''}
                            ${patient.bloodTest.b2m ? `<li class="flex justify-between"><span>B2M:</span> <span class="font-semibold">${patient.bloodTest.b2m} mg/L</span></li>` : ''}
                            ${patient.bloodTest.mProtein ? `<li class="flex justify-between"><span>M-Protein:</span> <span class="font-semibold">${patient.bloodTest.mProtein} g/dL</span></li>` : ''}
                        `;
                    }

                    if (boneMarrowList) {
                        boneMarrowList.innerHTML = `
                            ${patient.boneMarrow?.blasts ? `<li class="flex justify-between"><span>Blasts %:</span> <span class="font-semibold">${patient.boneMarrow.blasts}%</span></li>` : ''}
                            ${patient.boneMarrow?.cellularity ? `<li class="flex justify-between"><span>Cellularity:</span> <span class="font-semibold">${patient.boneMarrow.cellularity}%</span></li>` : ''}
                            ${patient.boneMarrow?.plasmaCells ? `<li class="flex justify-between"><span>Plasma Cells %:</span> <span class="font-semibold">${patient.boneMarrow.plasmaCells}%</span></li>` : ''}
                            ${patient.genetics?.mutations ? `<li class="flex justify-between"><span>Mutations:</span> <span class="font-semibold">${patient.genetics.mutations.join(', ')}</span></li>` : ''}
                        `;
                    }

                    if (symptomsList) {
                        symptomsList.innerHTML = patient.symptoms.map(symptom => `<li>- ${symptom}</li>`).join('');
                    }
                }

                // New function to handle chart selection
                function setupChartSelection(patient) {
                    const chartContainer = document.getElementById('chart-container');
                    document.querySelectorAll('.chart-select-button').forEach(button => {
                        button.addEventListener('click', (e) => {
                            document.querySelectorAll('.chart-select-button').forEach(btn => btn.classList.remove('bg-indigo-600', 'text-white'));
                            e.currentTarget.classList.add('bg-indigo-600', 'text-white');
                            
                            const chartType = e.currentTarget.dataset.chart;
                            chartContainer.innerHTML = `<canvas id="${chartType}-chart" class="block w-full h-full"></canvas>`;
                            
                            // Always show the period selector
                            document.getElementById('trends-period-selector').classList.remove('hidden');

                            // Get the currently active day selection
                            const selectedDaysButton = document.querySelector('.trends-period-button.bg-blue-600');
                            const days = selectedDaysButton ? parseInt(selectedDaysButton.dataset.days, 10) : 90;

                            if (chartType === 'trends') renderChart(patient.trends, days);
                            else if (chartType === 'blood-cell') renderBloodCellChart(patient.trends, days);
                            else if (chartType === 'lab-results') renderLabResultsChart(patient.trends, days);
                        });
                    });

                    // Set default chart
                    document.querySelector('.trends-period-button[data-days="90"]').click();
                    document.querySelector('.chart-select-button[data-chart="trends"]').click();
                }


                                function renderChart(data, days = 90) {
                    if (myChart) {
                        myChart.destroy();
                    }
                                    const allLabels = Object.keys(data).reverse();
                                    const labels = allLabels.slice(0, days).reverse();
                    const wbcData = labels.map(
                        (key) => data[key].wbc
                    );
                    const plateletData = labels.map(
                        (key) => data[key].platelets
                    );
                    // @ts-ignore - Chart is provided by CDN
                    myChart = new Chart(
                        document
                            .getElementById("trends-chart")
                            .getContext("2d"),
                        {
                            type: "line",
                            data: {
                                labels,
                                datasets: [
                                    {
                                        label: "WBC Count (K/uL)",
                                        data: wbcData,
                                        borderColor: "rgba(59, 130, 246, 1)",
                                        backgroundColor:
                                            "rgba(59, 130, 246, 0.2)",
                                        pointRadius: 2,
                                        pointHoverRadius: 5,
                                        pointBackgroundColor: "rgba(59, 130, 246, 1)",
                                        borderWidth: 2,
                                        fill: true,
                                        tension: 0.4,
                                    },
                                    {
                                        label: "Platelets (K/uL)",
                                        data: plateletData,
                                        borderColor: "rgba(147, 51, 234, 1)",
                                        backgroundColor: "rgba(147, 51, 234, 0.2)",
                                        pointRadius: 2,
                                        pointHoverRadius: 5,
                                        pointBackgroundColor: "rgba(147, 51, 234, 1)",
                                        borderWidth: 2,
                                        fill: true,
                                        tension: 0.35,
                                    },
                                ],
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                animation: { duration: 500, easing: 'easeInOutQuart' },
                                resizeDelay: 200,
                                plugins: {
                                    legend: { position: "top" },
                                    tooltip: {
                                        mode: "index",
                                        position: 'nearest',
                                        intersect: false,
                                    },
                                },
                                scales: { y: { beginAtZero: false } },
                            },
                        }
                    );
                }

                // New function for Blood Cell Count Chart
                function renderBloodCellChart(trendsData, days = 90) {
                    if (myChart) myChart.destroy();

                    const trendKeys = Object.keys(trendsData).reverse().slice(0, days);
                    const relevantTrends = trendKeys.map(key => trendsData[key]);

                    const avgRbc = relevantTrends.reduce((sum, t) => sum + t.rbc, 0) / relevantTrends.length;
                    const avgHemoglobin = relevantTrends.reduce((sum, t) => sum + t.hemoglobin, 0) / relevantTrends.length;
                    const avgPlatelets = relevantTrends.reduce((sum, t) => sum + t.platelets, 0) / relevantTrends.length;

                    const ctx = document.getElementById('blood-cell-chart').getContext('2d');
                    myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['RBC (M/uL)', 'Hemoglobin (g/dL)', 'Platelets (K/uL)'],
                            datasets: [{
                                label: `Avg over last ${days} days`,
                                data: [
                                    avgRbc.toFixed(2),
                                    avgHemoglobin.toFixed(2),
                                    avgPlatelets.toFixed(0)
                                ],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(239, 68, 68, 0.6)',
                                    'rgba(245, 158, 11, 0.6)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(239, 68, 68, 1)',
                                    'rgba(245, 158, 11, 1)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            animation: { duration: 500, easing: 'easeInOutQuart' },
                            scales: { y: { beginAtZero: false } },
                            plugins: { legend: { display: true }, title: { display: true, text: 'Key Blood Cell Counts' } }
                        }
                    });
                }

                // New function for Lab Results Pie Chart
                function renderLabResultsChart(trendsData, days = 90) {
                    if (myChart) myChart.destroy();

                    const trendKeys = Object.keys(trendsData).reverse().slice(0, days);
                    const relevantTrends = trendKeys.map(key => trendsData[key]);

                    const avgLdh = relevantTrends.reduce((sum, t) => sum + t.ldh, 0) / relevantTrends.length;
                    const avgCalcium = relevantTrends.reduce((sum, t) => sum + t.calcium, 0) / relevantTrends.length;
                    const avgAlbumin = relevantTrends.reduce((sum, t) => sum + t.albumin, 0) / relevantTrends.length;

                    const ctx = document.getElementById('lab-results-chart').getContext('2d');
                    const data = [];
                    const labels = [];
                    
                    if (avgLdh) { data.push(avgLdh); labels.push('Avg LDH (U/L)'); }
                    if (avgCalcium) { data.push(avgCalcium); labels.push('Avg Calcium (mg/dL)'); }
                    if (avgAlbumin) { data.push(avgAlbumin); labels.push('Avg Albumin (g/dL)'); }

                    myChart = new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Lab Values',
                                data: data,
                                backgroundColor: [
                                    'rgba(59, 130, 246, 0.7)',
                                    'rgba(16, 185, 129, 0.7)',
                                    'rgba(249, 115, 22, 0.7)',
                                    'rgba(147, 51, 234, 0.7)'
                                ],
                                hoverOffset: 4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            animation: { duration: 800, easing: 'easeOutBounce' },
                            plugins: { legend: { position: 'top' }, title: { display: true, text: `Average Lab Results (${days} Days)` } }
                        }
                    });
                }

                let comparisonChart1, comparisonChart2;
                function renderComparisonView() {
                    comparisonPanels.innerHTML = "";
                    const selectedPatientIds = Array.from(selectedPatients);
                    const patient1 = patients.find(
                        (p) => p.id === selectedPatientIds[0]
                    );
                    const patient2 = patients.find(
                        (p) => p.id === selectedPatientIds[1]
                    );
                    [patient1, patient2].forEach((patient, index) => {
                        if (!patient) return;

                        const riskClass = patient.riskLevel === 'high' ? 'border-red-200' : patient.riskLevel === 'medium' ? 'border-yellow-200' : 'border-green-200';

                        const panel = document.createElement("div");
                        panel.className = `bg-white p-6 rounded-xl shadow-lg border-t-4 ${riskClass}`;
                        panel.innerHTML = `
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="text-xl font-bold text-gray-800">${patient.name}</h3>
                                    <p class="text-sm text-gray-900">${patient.age}yo, ${patient.disease}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-xs text-gray-500">Risk Score</p>
                                    <p class="text-2xl font-bold text-gray-800">${(patient.riskScore * 100).toFixed(0)}%</p>
                                </div>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-800 mb-3">90-Day Vitals Trend</h4>
                                <div class="relative h-56 w-full">
                                    <canvas id="comparison-chart-${index}"></canvas>
                                </div>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-3">Key Vitals Snapshot</h4>
                                <ul id="vitals-list-${patient.id}" class="space-y-2 text-sm"></ul>
                            </div>
                        `;
                        comparisonPanels.appendChild(panel);

                        // Render Snapshot
                        const vitalsList = document.getElementById(`vitals-list-${patient.id}`);
                        const latestVitals = Object.values(patient.trends).pop();
                        if (vitalsList && latestVitals) {
                            vitalsList.innerHTML = `
                                <li class="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-gray-900"><span>WBC</span><span class="font-semibold">${latestVitals.wbc.toFixed(1)} K/uL</span></li>
                                <li class="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-gray-900"><span>Hemoglobin</span><span class="font-semibold">${latestVitals.hemoglobin.toFixed(1)} g/dL</span></li>
                                <li class="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-gray-900"><span>Platelets</span><span class="font-semibold">${latestVitals.platelets.toFixed(0)} K/uL</span></li>
                            `;
                        }

                        // Render Chart
                        const chartCanvas = document.getElementById(`comparison-chart-${index}`);
                        if (chartCanvas) {
                            const labels = Object.keys(patient.trends);
                            const wbcData = labels.map(key => patient.trends[key].wbc);
                            const hemoglobinData = labels.map(key => patient.trends[key].hemoglobin);
                            
                            const chartInstance = new Chart(chartCanvas.getContext('2d'), {
                                type: 'line',
                                data: {
                                    labels: labels.map(l => ''), // Hide x-axis labels for a cleaner look
                                    datasets: [{
                                        label: 'WBC',
                                        data: wbcData,
                                        borderColor: 'rgba(59, 130, 246, 0.8)',
                                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                        borderWidth: 2,
                                        pointRadius: 0,
                                        fill: true,
                                        tension: 0.4,
                                    }, {
                                        label: 'Hemoglobin',
                                        data: hemoglobinData,
                                        borderColor: 'rgba(239, 68, 68, 0.8)',
                                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                        borderWidth: 2,
                                        pointRadius: 0,
                                        fill: true,
                                        tension: 0.4,
                                    }]
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    animation: false,
                                    plugins: {
                                        legend: { display: true, position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } },
                                        tooltip: { mode: 'index', intersect: false }
                                    },
                                    scales: {
                                        x: { display: false },
                                        y: { beginAtZero: false, ticks: { font: { size: 10 } } }
                                    }
                                }
                            });

                            if (index === 0) {
                                if(comparisonChart1) comparisonChart1.destroy();
                                comparisonChart1 = chartInstance;
                            } else {
                                if(comparisonChart2) comparisonChart2.destroy();
                                comparisonChart2 = chartInstance;
                            }
                        }
                    });
                }

                function renderDayComparison() {
                    const date1 = compareDate1Input.value;
                    const date2 = compareDate2Input.value;
                    if (!date1 || !date2) return;
                    // This function is now handled by the new renderComparisonView logic
                }

                function renderSinglePatientComparison() {
                    const date1 = compareDay1Input.value;
                    const date2 = compareDay2Input.value;
                    if (!date1 || !date2 || !currentPatient) {
                        dayComparisonChartContainer.classList.add("hidden");
                        dayComparisonTextContainer.classList.add("hidden");
                        return;
                    }
                    const day1Data = currentPatient.trends[date1];
                    const day2Data = currentPatient.trends[date2];
                    if (!day1Data || !day2Data) {
                        dayComparisonChartContainer.classList.add("hidden");
                        dayComparisonTextContainer.classList.remove("hidden");
                        dayComparisonTextContainer.innerHTML = `<p class="text-red-500 text-sm">Data not available for selected dates.</p>`;
                        if (dayComparisonChart) {
                            dayComparisonChart.destroy();
                        }
                        return;
                    }
                    const vitals = [
                        "wbc",
                        "platelets",
                        "hemoglobin",
                    ];
                    let summaryHtml = "";
                    summaryHtml += '<ul class="space-y-3">';
                    vitals.forEach((metric) => {
                        const val1 = day1Data[metric];
                        const val2 = day2Data[metric];
                        const diff = (val2 - val1).toFixed(2);
                        let trend = "";
                        let icon = 'fa-minus text-gray-500';
                        let color = 'text-gray-800';

                        if (diff > 0) {
                            trend = `Increased by ${diff}`;
                            icon = 'fa-arrow-up text-red-500';
                            color = 'text-red-600';
                        } else if (diff < 0) {
                            trend = `Decreased by ${Math.abs(diff)}`;
                            icon = 'fa-arrow-down text-green-500';
                            color = 'text-green-600';
                        } else {
                            trend = "No change";
                        }
                        summaryHtml += `<li class="flex items-center justify-between text-sm"><div class="flex items-center"><i class="fas ${icon} w-4 mr-3"></i><span class="font-medium capitalize text-gray-700">${metric.replace(/_/g, " ")}</span></div><div class="font-semibold ${color}">${trend}</div></li>`;
                    });
                    summaryHtml += '</ul>';                    
                    dayComparisonTextContainer.innerHTML = summaryHtml;
                    dayComparisonTextContainer.classList.remove("hidden");
                    if (dayComparisonChart) {
                        dayComparisonChart.destroy();                        
                    }
                    const metrics = [
                        "wbc",
                        "platelets",
                        "hemoglobin",
                    ];
                    const labels = metrics.map((m) => m.replace(/_/g, " "));
                    // @ts-ignore - Chart comes from CDN
                    dayComparisonChart = new Chart(
                        document
                            .getElementById("day-comparison-chart")
                            .getContext("2d"),
                        {
                            type: "bar",
                            data: {
                                labels,
                                datasets: [
                                    {
                                        label: `Day 1 (${new Date(
                                            date1
                                        ).toLocaleDateString()})`,
                                        data: metrics.map((m) => day1Data[m]),
                                        backgroundColor:
                                            "rgba(59, 130, 246, 0.8)",
                                    },
                                    {
                                        label: `Day 2 (${new Date(
                                            date2
                                        ).toLocaleDateString()})`,
                                        data: metrics.map((m) => day2Data[m]),
                                        backgroundColor:
                                            "rgba(147, 51, 234, 0.8)",
                                    },
                                ],
                            },
                            options: {
                                responsive: false,
                                maintainAspectRatio: false,
                                animation: { duration: 500, easing: 'easeInOutQuart' },
                                resizeDelay: 200,
                                plugins: {
                                    legend: { position: "top" },
                                    title: {
                                        display: true,
                                        text: "Vitals Comparison",
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: false,
                                        title: { display: true, text: "Value" },
                                    },
                                },
                            },
                        }
                    );
                    dayComparisonChartContainer.classList.remove("hidden");
                }

                function transitionView(fromView, toView) {
                    fromView.classList.replace("opacity-100", "opacity-0");
                    fromView.classList.add("hidden");
                    setTimeout(() => {
                        toView.classList.replace("opacity-0", "opacity-100");
                        toView.classList.remove("hidden");
                    }, 500);
                }

                compareButton.addEventListener("click", () => {
                    if (selectedPatients.size === 2) {
                        renderComparisonView();
                        transitionView(cohortView, comparisonView);
                    }
                });
                backButton.addEventListener("click", () => {
                    const url = new URL(window.location.href);
                    url.searchParams.delete("patient");
                    window.history.replaceState({}, "", url.toString());
                    transitionView(detailView, cohortView);
                });
                compareBackButton.addEventListener("click", () => {
                    transitionView(comparisonView, cohortView);
                    selectedPatients.clear();
                    renderCohortView();
                    updateCompareButtonState();
                });
                compareDay1Input.addEventListener(
                    "change",
                    renderSinglePatientComparison
                );
                compareDay2Input.addEventListener(
                    "change",
                    renderSinglePatientComparison
                );
                generateSummaryButton.addEventListener("click", async () => {
                    if (!currentPatient) return;
                    aiContentTitle.textContent =
                        "Generating Clinical Summary...";
                    aiContentText.innerHTML =
                        '<i class="fas fa-spinner fa-spin text-2xl text-gray-400"></i>';
                    aiContentContainer.classList.remove("hidden");
                    const vitals = Object.values(currentPatient.trends).slice(
                        -7
                    );
                    const drivers = currentPatient.drivers
                        .map((d) => `${d.factor} (${d.influence})`)
                        .join(", ");
                    const prompt = `Act as a clinical AI assistant. Given the patient's data (age: ${
                        currentPatient.age
                    }, disease: ${
                        currentPatient.disease
                    }), recent vitals (${JSON.stringify(
                        vitals
                    )}), and risk drivers (${drivers}), generate a concise, point-wise summary of their health status and the primary reasons for their elevated risk of deterioration in the next 90 days. Focus on actionable insights.`;
                    const summary = await callGeminiAPI(prompt);
                    aiContentTitle.textContent = "AI Clinical Summary";
                    const formattedSummary = summary
                        .split("*")
                        .filter((item) => item.trim() !== "")
                        .map(
                            (item) => `
            <li class="flex items-start space-x-2">
              <i class="fas fa-check-circle text-green-500 mt-1"></i>
              <span>${item.trim()}</span>
            </li>`
                        )
                        .join("");
                    aiContentText.innerHTML = `<ul class="space-y-2">${formattedSummary}</ul>`;
                });
                generatePlanButton.addEventListener("click", async () => {
                    if (!currentPatient) return;
                    aiContentTitle.textContent =
                        "Generating Smart Action Plan...";
                    aiContentText.innerHTML =
                        '<i class="fas fa-spinner fa-spin text-2xl text-gray-400"></i>';
                    aiContentContainer.classList.remove("hidden");
                    const drivers = currentPatient.drivers
                        .map((d) => `${d.factor} (${d.influence})`)
                        .join(", ");
                    const vitals = Object.values(currentPatient.trends)
                        .slice(-1)
                        .map(
                            (v) => `WBC: ${v.wbc}, Platelets: ${v.platelets}, Hemoglobin: ${v.hemoglobin}`
                        )
                        .join(", ");
                    const prompt = `Act as a healthcare consultant. Based on the patient's data (disease: ${
                        currentPatient.disease
                    }, gender: ${currentPatient.gender}, age: ${currentPatient.age}, risk score: ${(currentPatient.riskScore * 100).toFixed(
                        0
                    )}%), which includes a high risk score due to ${drivers}, and recent vitals of ${vitals}, what are three actionable, specific interventions a care team should consider to mitigate the risk of deterioration in the next 90 days? Format the response as a bulleted list.`;
                    const planText = await callGeminiAPI(prompt);
                    aiContentTitle.textContent = "Smart Action Plan";
                    const formattedPlan = planText
                        .split("*")
                        .filter((item) => item.trim() !== "")
                        .map(
                            (item) => `
            <li class="flex items-start space-x-2">
              <i class="fas fa-check-circle text-green-500 mt-1"></i>
              <span>${item.trim()}</span>
            </li>`
                        )
                        .join("");
                    aiContentText.innerHTML = `<ul class="space-y-2">${formattedPlan}</ul>`;
                });
                renderCohortView();
                const initialPatient = new URL(
                    window.location.href
                ).searchParams.get("patient");
                if (initialPatient) {
                    transitionView(cohortView, detailView);
                    setTimeout(() => {
                        renderPatientDetailView(initialPatient);
                    }, 550);
                }
            })();
        }.toString()})();`;
        document.body.appendChild(script);
        // Ensure initialization runs even if DOMContentLoaded already fired
        if (document.readyState !== "loading") {
            try {
                document.dispatchEvent(new Event("DOMContentLoaded"));
            } catch {}
        }
        return () => {
            script.remove();
        };
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen w-full">
            <div className="bg-white overflow-hidden w-full transition-all duration-300">
                <header className="gradient-bg text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <i className="fas fa-heartbeat text-3xl md:text-4xl"></i>
                        <h1 className="text-xl md:text-3xl font-bold tracking-tight">
                            Chronic Care Risk Prediction
                        </h1>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <p className="text-sm opacity-80">
                            Dashboard for Proactive Patient Care
                        </p>
                    </div>
                </header>

                <main className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
                    <div
                        id="cohort-view"
                        className="transition-opacity duration-500 opacity-100 block">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Patient Cohort Overview
                        </h2>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-500 text-sm">
                                Select patients for comparison and click
                                "Compare".
                            </p>
                            <button
                                id="compare-button"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm opacity-50 cursor-not-allowed">
                                <i className="fas fa-chart-line mr-2"></i>
                                Compare
                            </button>
                        </div>
                        <div
                            id="patient-list"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
                    </div>

                    <div
                        id="patient-detail-view"
                        className="transition-opacity duration-500 opacity-0 hidden">
                        <button
                            id="back-button"
                            className="text-gray-500 hover:text-gray-700 mb-6 flex items-center space-x-2">
                            <i className="fas fa-arrow-left"></i>
                            <span>Back to Cohort</span>
                        </button>
                        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
                            <div className="md:w-1/3">
                                <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                                    <h3
                                        className="text-xl font-semibold text-gray-800 mb-2"
                                        id="detail-name"></h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Patient ID: <span id="detail-id"></span>
                                    </p>
                                    <div className="flex items-center space-x-4 mb-6">
                                        <i
                                            id="detail-icon"
                                            className="text-4xl"></i>
                                        <div>
                                            <p className="text-gray-500 font-medium">
                                                Risk Score
                                            </p>
                                            <h4 className="text-3xl font-bold text-gray-900"
                                                id="detail-score">
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl shadow p-4 mt-4">
                                        <h5 className="font-semibold text-gray-800 mb-2">
                                            Patient Information
                                        </h5>
                                        <ul className="text-gray-800 space-y-1 text-sm">
                                            <li>
                                                <i className="fas fa-user-circle mr-2"></i>
                                                Age:{" "}
                                                <span id="detail-age"></span>
                                            </li>
                                            <li>
                                                <i className="fas fa-venus-mars mr-2"></i>
                                                Gender:{" "}
                                                <span id="detail-gender"></span>
                                            </li>
                                            <li>
                                                <i className="fas fa-tint mr-2"></i>
                                                Blood Group:{" "}
                                                <span id="detail-blood-group"></span>
                                            </li>
                                            <li>
                                                <i className="fas fa-heartbeat mr-2"></i>
                                                Disease:{" "}
                                                <span id="detail-disease"></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-white rounded-xl shadow p-4 mt-4">
                                        <h5 className="font-semibold text-gray-800 mb-2">
                                            Blood Test Results
                                        </h5>
                                        <ul id="blood-test-list" className="text-gray-800 space-y-1 text-sm">
                                        </ul>
                                    </div>
                                    <div className="bg-white rounded-xl shadow p-4 mt-4">
                                        <h5 className="font-semibold text-gray-800 mb-2">
                                            Bone Marrow & Genetics
                                        </h5>
                                        <ul id="bone-marrow-list" className="text-gray-800 space-y-1 text-sm">
                                        </ul>
                                    </div>
                                     <div className="bg-white rounded-xl shadow p-4 mt-4">
                                        <h5 className="font-semibold text-gray-800 mb-2">
                                            Reported Symptoms
                                        </h5>
                                        <ul id="symptoms-list" className="text-gray-800 space-y-1 text-sm list-disc list-inside">
                                        </ul>
                                    </div>
                                    <div className="bg-white rounded-xl shadow p-4 mt-4">
                                        <h5 class="font-semibold text-gray-800 mb-2">Recommended Next Actions</h5>
                                        <ul
                                            id="detail-actions"
                                            className="text-gray-600 space-y-2 text-sm"></ul>
                                    </div>
                                    <div className="mt-6 space-y-2">
                                        <button
                                            id="generate-summary-button"
                                            className="w-full bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-sky-600 transition-colors duration-200 flex items-center justify-center space-x-2">
                                            <i className="fas fa-wand-magic-sparkles"></i><span>Generate Clinical Summary</span>
                                        </button>
                                        <button
                                            id="generate-plan-button"
                                            className="w-full bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center space-x-2">
                                            <i className="fas fa-bolt"></i><span>Generate Smart Action Plan</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-2/3 space-y-6">
                                <div className="bg-white p-6 rounded-xl shadow">
                                    <h3 className="font-bold text-gray-800 mb-4">
                                        Patient Charts
                                    </h3>                                    
                                    <div class="flex flex-wrap items-center justify-between border-b border-gray-200 mb-4">
                                        <div class="flex space-x-2">
                                            <button data-chart="trends" class="chart-select-button py-2 px-4 text-sm font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-t-md transition-colors">Vitals Trend</button>
                                            <button data-chart="blood-cell" class="chart-select-button py-2 px-4 text-sm font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-t-md transition-colors">Blood Counts</button>
                                            <button data-chart="lab-results" class="chart-select-button py-2 px-4 text-sm font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-t-md transition-colors">Lab Results</button>
                                        </div>
                                        <div id="trends-period-selector" class="flex space-x-2 mb-2 md:mb-0">
                                            <button data-days="90" class="trends-period-button bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-md hover:bg-blue-700 transition-colors">90D</button>
                                            <button data-days="60" class="trends-period-button bg-gray-200 text-gray-800 px-3 py-1 text-xs font-semibold rounded-md hover:bg-gray-300 transition-colors">60D</button>
                                            <button data-days="30" class="trends-period-button bg-gray-200 text-gray-800 px-3 py-1 text-xs font-semibold rounded-md hover:bg-gray-300 transition-colors">30D</button>
                                            <button data-days="7" class="trends-period-button bg-gray-200 text-gray-800 px-3 py-1 text-xs font-semibold rounded-md hover:bg-gray-300 transition-colors">7D</button>
                                        </div>
                                    </div>
                                    <div id="chart-container" class="relative h-[320px] w-full">
                                        {/* Canvas will be injected here */}
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow">
                                    <h3 className="font-bold text-gray-800 mb-4">
                                        Day-by-Day Vitals Comparison
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 items-end">
                                        <div>
                                            <label
                                                htmlFor="compare-day1-input"                                                
                                                className="block text-sm font-medium text-gray-700">
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                id="compare-day1-input"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="compare-day2-input"                                                
                                                className="block text-sm font-medium text-gray-700">
                                                End Date
                                            </label>
                                            <input
                                                type="date"
                                                id="compare-day2-input"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-gray-900"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        id="compare-days-button"
                                        className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-600 transition-colors duration-200">
                                        Compare Days
                                    </button>
                                    <div
                                        id="day-comparison-chart-container"
                                        className="mt-6 hidden">
                                        <canvas
                                            id="day-comparison-chart"
                                            height="320"
                                            className="block w-full h-[320px]"></canvas>
                                    </div>
                                    <div
                                        id="day-comparison-text-container"
                                        className="mt-4 p-4 bg-slate-50 border border-gray-200 rounded-lg hidden"></div>
                                </div>
                                <div
                                    id="ai-content-container"
                                    className="bg-white p-6 rounded-xl shadow hidden">
                                    <h3
                                        id="ai-content-title"
                                        className="font-bold text-gray-800 mb-4"></h3>
                                    <div id="ai-content-text" className="text-gray-900"></div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow">
                                    <h3 className="font-bold text-gray-800 mb-4">
                                        Key Drivers for This Prediction
                                    </h3>
                                    <ul
                                        id="detail-drivers"
                                        className="space-y-4"></ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        id="comparison-view"
                        className="transition-opacity duration-500 opacity-0 hidden">
                        <button
                            id="compare-back-button"
                            className="text-gray-500 hover:text-gray-700 mb-6 flex items-center space-x-2">
                            <i className="fas fa-arrow-left"></i>
                            <span>Back to Cohort</span>
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Patient Comparison
                        </h2>
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6 hidden">
                            <div className="md:w-1/2">
                                <label
                                    htmlFor="compare-date1"
                                    className="block text-sm font-medium text-gray-700">
                                    Select Day 1
                                </label>
                                <input
                                    type="date"
                                    id="compare-date1"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="md:w-1/2">
                                <label
                                    htmlFor="compare-date2"
                                    className="block text-sm font-medium text-gray-700">
                                    Select Day 2
                                </label>
                                <input
                                    type="date"
                                    id="compare-date2"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div
                            id="comparison-panels"
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
                    </div>
                </main>
            </div>
        </div>
    );
}
