"use client";
import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration } from "chart.js";

type Props = {
    labels: string[];
    day1Label: string;
    day2Label: string;
    day1Values: number[];
    day2Values: number[];
};

export function DayComparisonChart({
    labels,
    day1Label,
    day2Label,
    day1Values,
    day2Values,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        const ChartJS = (window as any).Chart as typeof Chart;
        if (!ChartJS || !canvasRef.current) return;
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        // Fix canvas size to parent width and fixed height
        const parent = canvasRef.current.parentElement as HTMLElement | null;
        const width = parent?.clientWidth ?? 800;
        canvasRef.current.width = width;
        canvasRef.current.height = 320;        
        chartRef.current = new ChartJS(canvasRef.current.getContext("2d")!, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: day1Label,
                        data: day1Values,
                        backgroundColor: "rgba(37, 99, 235, 0.85)",
                    },
                    {
                        label: day2Label,
                        data: day2Values,
                        backgroundColor: "rgba(147, 51, 234, 0.85)",
                    },
                ],
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                plugins: { legend: { position: "top" as const } },
                scales: {
                    y: { beginAtZero: false, ticks: { color: "#334155" } },
                    x: { ticks: { color: "#334155" } },
                },
            },
        });
        return () => chartRef.current?.destroy();
    }, [labels, day1Label, day2Label, day1Values, day2Values]);

    return <canvas ref={canvasRef} className="block w-full h-[320px]" />;
}
