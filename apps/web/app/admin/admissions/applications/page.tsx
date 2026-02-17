import Link from "next/link";
import { getAllApplications } from "@/actions/application";
import { Search, Filter, Eye } from "lucide-react";
import { format } from "date-fns";

export default async function AdmissionsPage() {
    const applications = await getAllApplications();

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Applications
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage student applications and review process.
                    </p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search applicants..."
                        className="h-10 w-full rounded-md border border-gray-300 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Filter className="h-4 w-4" />
                    Filter
                </button>
            </div>

            {/* Applications Table */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Applicant</th>
                                <th className="px-6 py-4 font-medium">Program / Track</th>
                                <th className="px-6 py-4 font-medium">Submitted Date</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {applications.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No applications found.
                                    </td>
                                </tr>
                            ) : (
                                applications.map((app: any) => (
                                    <tr key={app.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">
                                                {app.applicant.firstName} {app.applicant.lastName}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {app.applicant.citizenId}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-900 font-medium">{app.program.nameEn}</div>
                                            <div className="text-xs text-gray-500">
                                                {app.program.faculty.nameEn}
                                            </div>
                                            {app.track && (
                                                <div className="mt-1 inline-flex items-center rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                                                    {app.track.code}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {app.submittedAt
                                                ? format(new Date(app.submittedAt), "MMM d, yyyy")
                                                : "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${app.status === "SUBMITTED"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : app.status === "ACCEPTED"
                                                            ? "bg-green-100 text-green-800"
                                                            : app.status === "REJECTED"
                                                                ? "bg-red-100 text-red-800"
                                                                : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {app.status.replace("_", " ")}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/admin/admissions/applications/${app.id}`}>
                                                <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                                                    <Eye className="h-3 w-3" />
                                                    Review
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
