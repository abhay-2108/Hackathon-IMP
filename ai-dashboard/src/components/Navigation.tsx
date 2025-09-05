"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (pathname === "/") {
            // If we're already on the main page, scroll to cohort view and reset to cohort view
            const cohortView = document.getElementById("cohort-view");
            const detailView = document.getElementById("patient-detail-view");
            const comparisonView = document.getElementById("comparison-view");

            if (cohortView && detailView && comparisonView) {
                // Hide other views and show cohort view
                detailView.classList.add("hidden");
                detailView.classList.remove("opacity-100");
                detailView.classList.add("opacity-0");

                comparisonView.classList.add("hidden");
                comparisonView.classList.remove("opacity-100");
                comparisonView.classList.add("opacity-0");

                cohortView.classList.remove("hidden");
                cohortView.classList.remove("opacity-0");
                cohortView.classList.add("opacity-100");

                // Clear any URL parameters to reset state
                if (window.location.search) {
                    window.history.replaceState(
                        {},
                        "",
                        window.location.pathname
                    );
                }

                // Scroll to cohort view
                cohortView.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // Navigate to main page
            router.push("/");
        }
    };

    const navItems = [
        {
            href: "/scenarios",
            label: "Care Scenarios",
            icon: "fas fa-user-md",
            description: "Patient profiles with treatment roadmaps",
        },
        {
            href: "/enhanced-scenarios",
            label: "Enhanced Scenarios",
            icon: "fas fa-stethoscope",
            description:
                "Detailed clinical scenarios with comprehensive patient data",
        },
    ];

    return (
        <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <button
                        onClick={handleLogoClick}
                        className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1"
                        title="Go to Patient Cohort Overview"
                        aria-label="Go to Patient Cohort Overview">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200">
                            <i className="fas fa-heartbeat text-white text-lg"></i>
                        </div>
                        <div>
                            <span className="text-xl font-bold text-gray-900">
                                Chronic Care
                            </span>
                            <p className="text-xs text-gray-500 -mt-1">
                                Dashboard
                            </p>
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                                    pathname === item.href ||
                                    pathname.startsWith(item.href + "/")
                                        ? "bg-blue-100 text-blue-700 shadow-sm"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}>
                                <i className={`${item.icon} text-sm`}></i>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200">
                            <span className="sr-only">Open main menu</span>
                            {!isMobileMenuOpen ? (
                                <i className="fas fa-bars text-xl"></i>
                            ) : (
                                <i className="fas fa-times text-xl"></i>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                                        pathname === item.href ||
                                        pathname.startsWith(item.href + "/")
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    }`}>
                                    <i className={`${item.icon} mr-3`}></i>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
