import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AI-Driven Chronic Care Dashboard",
    description:
        "Cohort insights, patient risk prediction, trends, and AI-assisted actions",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
                <Script
                    id="chartjs-cdn"
                    src="https://cdn.jsdelivr.net/npm/chart.js"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}
