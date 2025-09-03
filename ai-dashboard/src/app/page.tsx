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
                        id: "P-001",
                        name: "Jane Doe",
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
                        name: "John Smith",
                        age: 48,
                        bloodGroup: "O-",
                        height: "180 cm",
                        weight: "88 kg",
                        disease: "Hypertension",
                        riskScore: 0.22,
                        riskLevel: "low",
                        trends: generateMockTrendData(120, 15),
                        drivers: [
                            {
                                factor: "Consistent Blood Glucose",
                                influence: "high-negative",
                            },
                            {
                                factor: "100% Med Adherence",
                                influence: "high-negative",
                            },
                        ],
                        actions: [
                            "Continue routine monitoring",
                            "Encourage healthy habits",
                        ],
                    },
                    {
                        id: "P-003",
                        name: "Michael Chen",
                        age: 55,
                        bloodGroup: "B+",
                        height: "175 cm",
                        weight: "92 kg",
                        disease: "Heart Failure",
                        riskScore: 0.58,
                        riskLevel: "medium",
                        trends: generateMockTrendData(140, 20),
                        drivers: [
                            {
                                factor: "Fluctuating Systolic BP",
                                influence: "high",
                            },
                            {
                                factor: "Increased Sodium Intake",
                                influence: "medium",
                            },
                        ],
                        actions: [
                            "Send automated lifestyle tip",
                            "Schedule follow-up with nutritionist",
                            "Alert care team to review BP",
                        ],
                    },
                    {
                        id: "P-004",
                        name: "Sarah Lee",
                        age: 72,
                        bloodGroup: "AB+",
                        height: "160 cm",
                        weight: "68 kg",
                        disease: "COPD",
                        riskScore: 0.71,
                        riskLevel: "high",
                        trends: generateMockTrendData(90, 5),
                        drivers: [
                            {
                                factor: "Elevated Resting Heart Rate",
                                influence: "high",
                            },
                            {
                                factor: "Sleep Irregularity",
                                influence: "medium",
                            },
                        ],
                        actions: [
                            "Recommend cardio assessment",
                            "Suggest sleep hygiene review",
                            "Review recent vitals for patterns",
                        ],
                    },
                    {
                        id: "P-005",
                        name: "David Kim",
                        age: 39,
                        bloodGroup: "A-",
                        height: "178 cm",
                        weight: "79 kg",
                        disease: "Obesity",
                        riskScore: 0.35,
                        riskLevel: "low",
                        trends: generateMockTrendData(110, 10),
                        drivers: [
                            {
                                factor: "Stable Weight",
                                influence: "medium-negative",
                            },
                            {
                                factor: "Consistent Activity Logs",
                                influence: "high-negative",
                            },
                        ],
                        actions: [
                            "Continue monitoring",
                            "Congratulate on progress",
                        ],
                    },
                    {
                        id: "P-006",
                        name: "Emily White",
                        age: 61,
                        bloodGroup: "O+",
                        height: "170 cm",
                        weight: "85 kg",
                        disease: "Kidney Disease",
                        riskScore: 0.65,
                        riskLevel: "medium",
                        trends: generateMockTrendData(150, 25),
                        drivers: [
                            {
                                factor: "Weight Gain (last 30 days)",
                                influence: "high",
                            },
                            {
                                factor: "Occasional High Glucose Spikes",
                                influence: "medium",
                            },
                        ],
                        actions: [
                            "Refer to registered dietitian",
                            "Advise on meal planning",
                        ],
                    },
                ];

                function generateMockTrendData(base = 100, deviation = 10) {
                    const data = {};
                    for (let i = 89; i >= 0; i--) {
                        const date = new Date();
                        date.setDate(date.getDate() - i);
                        const dateStr = date.toISOString().split("T")[0];
                        data[dateStr] = {
                            date: dateStr,
                            blood_pressure: Math.round(
                                base + (Math.random() - 0.5) * deviation
                            ),
                            blood_glucose: Math.round(
                                100 + (Math.random() - 0.5) * 15
                            ),
                            resting_heart_rate: Math.round(
                                60 + (Math.random() - 0.5) * 10
                            ),
                            weight: Math.round(
                                180 + (Math.random() - 0.5) * 10
                            ),
                        };
                    }
                    return data;
                }

                async function callGeminiAPI(prompt) {
                    const apiKey = "";
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
                    patients.forEach((patient) => {
                        const color =
                            patient.riskLevel === "high"
                                ? "border-red-500"
                                : patient.riskLevel === "medium"
                                ? "border-yellow-500"
                                : "border-green-500";
                        const icon =
                            patient.riskLevel === "high"
                                ? "fas fa-exclamation-triangle"
                                : patient.riskLevel === "medium"
                                ? "fas fa-shield-alt"
                                : "fas fa-check-circle";
                        const card = `
              <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 ${color}" data-id="${
                            patient.id
                        }">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center text-white bg-gray-400">
                      <i class="${icon} text-2xl"></i>
                    </div>
                    <div>
                      <h3 class="text-xl font-semibold text-gray-800">${
                          patient.name
                      }</h3>
                      <p class="text-gray-500 text-sm">ID: ${patient.id}</p>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" data-id="${
                        patient.id
                    }" class="compare-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 rounded-md">
                  </div>
                </div>
                <p class="text-gray-500 text-sm mt-4">Risk of deterioration in 90 days</p>
                <div class="mt-2 text-2xl font-bold text-gray-900">${(
                    patient.riskScore * 100
                ).toFixed(0)}%</div>
              </div>
            `;
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
                    detailHeight.textContent = patient.height;
                    detailWeight.textContent = patient.weight;
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
                    renderChart(patient.trends);
                }

                function renderChart(data) {
                    if (myChart) {
                        myChart.destroy();
                    }
                    const labels = Object.keys(data).reverse();
                    const bloodPressureData = labels.map(
                        (key) => data[key].blood_pressure
                    );
                    const bloodGlucoseData = labels.map(
                        (key) => data[key].blood_glucose
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
                                        label: "Blood Pressure",
                                        data: bloodPressureData,
                                        borderColor: "rgba(59, 130, 246, 1)",
                                        backgroundColor:
                                            "rgba(59, 130, 246, 0.2)",
                                        borderWidth: 2,
                                        fill: true,
                                        tension: 0.4,
                                    },
                                    {
                                        label: "Blood Glucose",
                                        data: bloodGlucoseData,
                                        borderColor: "rgba(147, 51, 234, 1)",
                                        backgroundColor:
                                            "rgba(147, 51, 234, 0.2)",
                                        borderWidth: 2,
                                        fill: true,
                                        tension: 0.35,
                                    },
                                ],
                            },
                            options: {
                                responsive: false,
                                maintainAspectRatio: false,
                                animation: { duration: 0 },
                                resizeDelay: 200,
                                plugins: {
                                    legend: { position: "top" },
                                    tooltip: {
                                        mode: "index",
                                        intersect: false,
                                    },
                                },
                                scales: { y: { beginAtZero: false } },
                            },
                        }
                    );
                }

                function renderComparisonView() {
                    comparisonPanels.innerHTML = "";
                    const selectedPatientIds = Array.from(selectedPatients);
                    const patient1 = patients.find(
                        (p) => p.id === selectedPatientIds[0]
                    );
                    const patient2 = patients.find(
                        (p) => p.id === selectedPatientIds[1]
                    );
                    [patient1, patient2].forEach((patient) => {
                        const panel = document.createElement("div");
                        panel.className = "bg-white p-6 rounded-xl shadow-md";
                        panel.innerHTML = `
              <h3 class="text-xl font-bold text-gray-800 mb-4">${
                  patient.name
              }</h3>
              <div class="flex items-center space-x-4 mb-6">
                <p class="font-medium text-gray-500">Risk Score:</p>
                <span class="text-3xl font-bold text-gray-900">${(
                    patient.riskScore * 100
                ).toFixed(0)}%</span>
              </div>
              <h4 class="font-bold text-gray-800 mb-2">Daily Vitals Comparison</h4>
              <div class="flex justify-between items-center mb-2">
                <p class="font-semibold text-sm">Metric</p>
                <p class="font-semibold text-sm w-1/3 text-center" id="day1-header-${
                    patient.id
                }"></p>
                <p class="font-semibold text-sm w-1/3 text-center" id="day2-header-${
                    patient.id
                }"></p>
              </div>
              <ul id="vitals-list-${patient.id}" class="space-y-2"></ul>`;
                        comparisonPanels.appendChild(panel);
                    });
                }

                function renderDayComparison() {
                    const date1 = compareDate1Input.value;
                    const date2 = compareDate2Input.value;
                    if (!date1 || !date2) return;
                    const selectedPatientIds = Array.from(selectedPatients);
                    selectedPatientIds.forEach((id) => {
                        const patient = patients.find((p) => p.id === id);
                        const vitalsList = document.getElementById(
                            `vitals-list-${patient.id}`
                        );
                        const day1Header = document.getElementById(
                            `day1-header-${patient.id}`
                        );
                        const day2Header = document.getElementById(
                            `day2-header-${patient.id}`
                        );
                        const day1Data = patient.trends[date1];
                        const day2Data = patient.trends[date2];
                        if (!day1Data || !day2Data) {
                            vitalsList.innerHTML = `<li class="text-red-500 text-sm">Data not available for selected dates.</li>`;
                            return;
                        }
                        day1Header.textContent = new Date(
                            date1
                        ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        });
                        day2Header.textContent = new Date(
                            date2
                        ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        });
                        vitalsList.innerHTML = "";
                        [
                            "blood_pressure",
                            "blood_glucose",
                            "resting_heart_rate",
                        ].forEach((metric) => {
                            vitalsList.innerHTML += `
                <li class="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-sm">
                  <span class="font-medium w-1/3">${metric.replace(
                      /_/g,
                      " "
                  )}</span>
                  <span class="w-1/3 text-center">${day1Data[metric]}</span>
                  <span class="w-1/3 text-center">${day2Data[metric]}</span>
                </li>`;
                        });
                    });
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
                        "blood_pressure",
                        "blood_glucose",
                        "resting_heart_rate",
                    ];
                    let summaryHtml = "";
                    vitals.forEach((metric) => {
                        const val1 = day1Data[metric];
                        const val2 = day2Data[metric];
                        const diff = val2 - val1;
                        let trend = "";
                        if (diff > 0) {
                            trend = "increased";
                        } else if (diff < 0) {
                            trend = "decreased";
                        } else {
                            trend = "remained stable";
                        }
                        summaryHtml += `<p class="text-gray-700 font-medium capitalize">${metric.replace(
                            /_/g,
                            " "
                        )}: <span class="text-gray-600">${val1}</span> on Day 1, then <span class="text-gray-600">${trend}</span> to <span class="text-gray-600">${val2}</span> on Day 2.</p>`;
                    });
                    dayComparisonTextContainer.innerHTML = summaryHtml;
                    dayComparisonTextContainer.classList.remove("hidden");
                    if (dayComparisonChart) {
                        dayComparisonChart.destroy();
                    }
                    const metrics = [
                        "blood_pressure",
                        "blood_glucose",
                        "resting_heart_rate",
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
                                animation: { duration: 0 },
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
                compareDaysButton.addEventListener(
                    "click",
                    renderSinglePatientComparison
                );
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
                    aiContentTitle.textContent = "✨AI Clinical Summary✨";
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
                            (v) =>
                                `Blood Pressure: ${v.blood_pressure}, Blood Glucose: ${v.blood_glucose}`
                        )
                        .join(", ");
                    const prompt = `Act as a healthcare consultant. Based on the patient's data (disease: ${
                        currentPatient.disease
                    }, risk score: ${(currentPatient.riskScore * 100).toFixed(
                        0
                    )}%), which includes a high risk score due to ${drivers}, and recent vitals of ${vitals}, what are three actionable, specific interventions a care team should consider to mitigate the risk of deterioration in the next 90 days? Format the response as a bulleted list.`;
                    const planText = await callGeminiAPI(prompt);
                    aiContentTitle.textContent = "✨Smart Action Plan✨";
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
                                            <h4
                                                className="text-3xl font-bold"
                                                id="detail-score"></h4>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl shadow p-4 mt-4">
                                        <h5 className="font-semibold text-gray-800 mb-2">
                                            Patient Information
                                        </h5>
                                        <ul className="text-gray-600 space-y-1 text-sm">
                                            <li>
                                                <i className="fas fa-user-circle mr-2"></i>
                                                Age:{" "}
                                                <span id="detail-age"></span>
                                            </li>
                                            <li>
                                                <i className="fas fa-tint mr-2"></i>
                                                Blood Group:{" "}
                                                <span id="detail-blood-group"></span>
                                            </li>
                                            <li>
                                                <i className="fas fa-ruler-vertical mr-2"></i>
                                                Height:{" "}
                                                <span id="detail-height"></span>
                                            </li>
                                            <li>
                                                <i className="fas fa-weight-hanging mr-2"></i>
                                                Weight:{" "}
                                                <span id="detail-weight"></span>
                                            </li>
                                            <li>
                                                <i className="fas fa-heartbeat mr-2"></i>
                                                Disease:{" "}
                                                <span id="detail-disease"></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-white rounded-xl shadow p-4 mt-4">
                                        <h5>Recommended Next Actions</h5>
                                        <ul
                                            id="detail-actions"
                                            className="text-gray-600 space-y-2 text-sm"></ul>
                                    </div>
                                    <div className="mt-6 space-y-2">
                                        <button
                                            id="generate-summary-button"
                                            className="w-full bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-sky-600 transition-colors duration-200">
                                            ✨Generate Clinical Summary✨
                                        </button>
                                        <button
                                            id="generate-plan-button"
                                            className="w-full bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-colors duration-200">
                                            ✨Generate Smart Action Plan✨
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-2/3 space-y-6">
                                <div className="bg-white p-6 rounded-xl shadow">
                                    <h3 className="font-bold text-gray-800 mb-4">
                                        90-Day Vitals Trend
                                    </h3>
                                    <canvas
                                        id="trends-chart"
                                        height="320"
                                        className="block w-full h-[320px]"></canvas>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow">
                                    <h3 className="font-bold text-gray-800 mb-4">
                                        Day-by-Day Vitals Comparison
                                    </h3>
                                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                htmlFor="compare-day1-input"
                                                className="block text-sm font-medium text-gray-700">
                                                Select Day 1
                                            </label>
                                            <input
                                                type="date"
                                                id="compare-day1-input"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                htmlFor="compare-day2-input"
                                                className="block text-sm font-medium text-gray-700">
                                                Select Day 2
                                            </label>
                                            <input
                                                type="date"
                                                id="compare-day2-input"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                                        className="mt-4 p-4 bg-gray-100 rounded-lg hidden"></div>
                                </div>
                                <div
                                    id="ai-content-container"
                                    className="bg-white p-6 rounded-xl shadow hidden">
                                    <h3
                                        id="ai-content-title"
                                        className="font-bold text-gray-800 mb-4"></h3>
                                    <div id="ai-content-text"></div>
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
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
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
