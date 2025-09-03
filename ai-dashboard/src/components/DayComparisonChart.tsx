"use client";
import { useEffect, useRef } from "react";

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
    const chartRef = useRef<any>(null);

    useEffect(() => {
        const ChartGlobal = (window as any).Chart;
        if (!ChartGlobal || !canvasRef.current) return;
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        chartRef.current = new ChartGlobal(canvasRef.current.getContext("2d"), {
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
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "top" as const } },
                scales: {
                    y: { beginAtZero: false, ticks: { color: "#334155" } },
                    x: { ticks: { color: "#334155" } },
                },
            },
        });
        return () => chartRef.current?.destroy();
    }, [
        labels.join(","),
        day1Label,
        day2Label,
        day1Values.join(","),
        day2Values.join(","),
    ]);

    return <canvas ref={canvasRef} className="w-full h-64" />;
}
