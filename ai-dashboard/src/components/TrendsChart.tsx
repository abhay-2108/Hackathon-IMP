"use client";
import { useEffect, useRef } from "react";

type Props = {
    labels: string[];
    bloodPressure: number[];
    bloodGlucose: number[];
};

export function TrendsChart({ labels, bloodPressure, bloodGlucose }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<any>(null);

    useEffect(() => {
        const ChartGlobal = (window as any).Chart;
        if (!ChartGlobal || !canvasRef.current) return;
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        const parent = canvasRef.current.parentElement as HTMLElement | null;
        const width = parent?.clientWidth ?? 800;
        canvasRef.current.width = width;
        canvasRef.current.height = 320;
        chartRef.current = new ChartGlobal(canvasRef.current.getContext("2d"), {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "Blood Pressure",
                        data: bloodPressure,
                        borderColor: "#2563eb",
                        backgroundColor: "rgba(37, 99, 235, 0.2)",
                        borderWidth: 2,
                        fill: true,
                        tension: 0.35,
                    },
                    {
                        label: "Blood Glucose",
                        data: bloodGlucose,
                        borderColor: "#9333ea",
                        backgroundColor: "rgba(147, 51, 234, 0.2)",
                        borderWidth: 2,
                        fill: true,
                        tension: 0.35,
                    },
                ],
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: "top" as const },
                    tooltip: { mode: "index" as const, intersect: false },
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: { color: "#334155" },
                        grid: { color: "rgba(148,163,184,0.2)" },
                    },
                    x: {
                        ticks: { color: "#334155" },
                        grid: { display: false },
                    },
                },
            },
        });
        return () => chartRef.current?.destroy();
    }, [labels.join(","), bloodPressure.join(","), bloodGlucose.join(",")]);

    return <canvas ref={canvasRef} className="block w-full h-[320px]" />;
}
