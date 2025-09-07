import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ThemeToggle from "./ui/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WellDoc Dashboard",
  description: "AI-powered cohort and patient management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="sticky top-0 z-50 border-b nav backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold text-lg tracking-tight">WellDoc</Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="link">Dashboard</Link>
              <Link href="/compare" className="link">Compare</Link>
              <Link href="/scenarios" className="link">Scenarios</Link>
              <Link href="/predict" className="link">Predict</Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">{children}</main>
      </body>
    </html>
  );
}
