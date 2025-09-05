"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "../../components/Navigation";

export default function PatientsPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to main page since the patient dashboard is now on the entry page
        router.replace("/");
    }, [router]);

    return (
        <div className="bg-slate-50 min-h-screen w-full">
            <Navigation />
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">
                        Redirecting to main dashboard...
                    </p>
                </div>
            </div>
        </div>
    );
}
