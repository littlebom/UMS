import { getAdmissionTracks, deleteAdmissionTrack } from "@/actions/admission-track";
import { Plus, Pencil, Trash2, Calendar, Users, FileText } from "lucide-react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { format } from "date-fns";

export default async function AdmissionTracksPage() {
    const tracks = await getAdmissionTracks();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admission Tracks</h1>
                    <p className="text-gray-500">Manage admission rounds, timelines, and capacities</p>
                </div>
                <Link href="/admin/admissions/tracks/create">
                    <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                        <Plus className="h-4 w-4" />
                        New Admission Track
                    </button>
                </Link>
            </div>

            {/* Filters could go here */}

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="px-6 py-3">Track Info</th>
                                <th className="px-6 py-3">Program</th>
                                <th className="px-6 py-3">Timeline</th>
                                <th className="px-6 py-3">Capacity</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {tracks.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No admission tracks found. Create one to get started.
                                    </td>
                                </tr>
                            ) : (
                                tracks.map((track) => {
                                    const IconComponent = (Icons as any)[track.type.icon] || Icons.Target;
                                    const now = new Date();
                                    const isOpen = track.isActive && track.isPublished && now >= track.openDate && now <= track.closeDate;
                                    const percentFilled = Math.round((track.filledSeats / track.totalSeats) * 100);

                                    return (
                                        <tr key={track.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-start gap-3">
                                                    <div
                                                        className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                                                        style={{ backgroundColor: `${track.type.color}20`, color: track.type.color }}
                                                    >
                                                        <IconComponent className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{track.nameTh}</div>
                                                        <div className="text-xs text-gray-500">{track.nameEn}</div>
                                                        <div className="mt-1 font-mono text-xs text-gray-400">{track.code}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{track.program.nameTh}</div>
                                                <div className="text-xs text-gray-500">{track.program.degreeLevel}</div>
                                                <div className="mt-1 inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                                    Year {track.academicYear}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1 text-xs">
                                                    <div className="flex items-center gap-1 text-green-600">
                                                        <span className="font-medium">Open:</span>
                                                        {format(new Date(track.openDate), "dd MMM yyyy")}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-red-600">
                                                        <span className="font-medium">Close:</span>
                                                        {format(new Date(track.closeDate), "dd MMM yyyy")}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-32">
                                                    <div className="mb-1 flex justify-between text-xs">
                                                        <span className="font-medium text-gray-700">{track.filledSeats} / {track.totalSeats}</span>
                                                        <span className="text-gray-500">{percentFilled}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full rounded-full bg-gray-100">
                                                        <div
                                                            className={`h-1.5 rounded-full ${percentFilled >= 100 ? 'bg-red-500' : 'bg-blue-500'}`}
                                                            style={{ width: `${Math.min(percentFilled, 100)}%` }}
                                                        />
                                                    </div>
                                                    <div className="mt-1 text-xs text-gray-400">
                                                        {track._count.applications} applications
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    {isOpen ? (
                                                        <span className="inline-flex w-fit items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                            Open Now
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex w-fit items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                            Closed
                                                        </span>
                                                    )}
                                                    {!track.isPublished && (
                                                        <span className="inline-flex w-fit items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                                            Draft
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/admissions/tracks/${track.id}`}>
                                                        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white p-0 hover:bg-gray-50">
                                                            <FileText className="h-4 w-4 text-gray-500" />
                                                        </button>
                                                    </Link>
                                                    <Link href={`/admin/admissions/tracks/${track.id}/edit`}>
                                                        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white p-0 hover:bg-gray-50">
                                                            <Pencil className="h-4 w-4 text-gray-500" />
                                                        </button>
                                                    </Link>

                                                    {track._count.applications === 0 && (
                                                        <form action={async () => {
                                                            "use server";
                                                            await deleteAdmissionTrack(track.id);
                                                        }}>
                                                            <button
                                                                className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white p-0 hover:bg-red-50 hover:text-red-600"
                                                                type="submit"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </form>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
