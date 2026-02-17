import { getMyApplications } from "@/actions/application";
import { FileText } from "lucide-react";
import Link from "next/link";
import ApplicationCard from "./application-card";

export default async function ApplicantDashboard() {
    const applications = await getMyApplications();

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
                        <p className="text-gray-500">Track the status of your admission applications</p>
                    </div>
                    <Link href="/admissions">
                        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                            Apply for Program
                        </button>
                    </Link>
                </div>

                {applications.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No applications yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Start your journey by applying to a program.</p>
                        <div className="mt-6">
                            <Link href="/admissions">
                                <button className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                                    Browse Programs
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {applications.map((app: any) => (
                            <ApplicationCard key={app.id} app={app} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
