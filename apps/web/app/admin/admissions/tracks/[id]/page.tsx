import { getAdmissionTrackById } from "@/actions/admission-track";
import { Button } from "@repo/ui";
import { ArrowLeft, Pencil, Calendar, Users, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import * as Icons from "lucide-react";

export default async function AdmissionTrackDetailPage({ params }: { params: { id: string } }) {
    const track = await getAdmissionTrackById(params.id);

    if (!track) {
        notFound();
    }

    const IconComponent = (Icons as any)[track.type.icon] || Icons.Target;
    const now = new Date();
    const isOpen = track.isActive && track.isPublished && now >= track.openDate && now <= track.closeDate;
    const percentFilled = Math.round((track.filledSeats / track.totalSeats) * 100);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/admissions/tracks">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-gray-900">{track.nameTh}</h1>
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                {track.code}
                            </span>
                        </div>
                        <p className="text-gray-500">{track.nameEn}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link href={`/admin/admissions/tracks/${track.id}/edit`}>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" />
                            Edit Track
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Status Cards */}
            <div className="grid gap-6 md:grid-cols-4">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-500">Status</h3>
                        {isOpen ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                            <Clock className="h-5 w-5 text-gray-400" />
                        )}
                    </div>
                    <div className="mt-2">
                        <div className="text-2xl font-bold text-gray-900">
                            {isOpen ? "Open Now" : "Closed"}
                        </div>
                        <p className="text-xs text-gray-500">
                            {track.isPublished ? "Published" : "Draft (Unpublished)"}
                        </p>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-500">Applications</h3>
                        <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="mt-2">
                        <div className="text-2xl font-bold text-gray-900">
                            {track._count.applications}
                        </div>
                        <p className="text-xs text-gray-500">Total submissions</p>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-500">Seats Filled</h3>
                        <Users className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="mt-2">
                        <div className="text-2xl font-bold text-gray-900">
                            {track.filledSeats} <span className="text-sm font-normal text-gray-500">/ {track.totalSeats}</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100">
                            <div
                                className={`h-1.5 rounded-full ${percentFilled >= 100 ? 'bg-red-500' : 'bg-blue-500'}`}
                                style={{ width: `${Math.min(percentFilled, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-500">Days Remaining</h3>
                        <Calendar className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="mt-2">
                        <div className="text-2xl font-bold text-gray-900">
                            {isOpen ? Math.ceil((new Date(track.closeDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : "-"}
                        </div>
                        <p className="text-xs text-gray-500">
                            Until closing date
                        </p>
                    </div>
                </div>
            </div>

            {/* Detailed Info */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Left Column: Info */}
                <div className="space-y-6 md:col-span-2">
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-lg font-medium text-gray-900">Track Information</h2>
                        </div>
                        <div className="p-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Program</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{track.program.nameTh}</dd>
                                    <dd className="text-xs text-gray-500">{track.program.nameEn}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Degree Level</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{track.program.degreeLevel}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Track Type</dt>
                                    <dd className="mt-1 flex items-center gap-2 text-sm text-gray-900">
                                        <div
                                            className="flex h-5 w-5 items-center justify-center rounded-full"
                                            style={{ backgroundColor: `${track.type.color}20`, color: track.type.color }}
                                        >
                                            <IconComponent className="h-3 w-3" />
                                        </div>
                                        {track.type.nameTh}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Academic Year</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{track.academicYear}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Application Fee</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {track.applicationFee ? `฿${track.applicationFee.toLocaleString()}` : "Free"}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Waitlist</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {track.enableWaitlist ? "Enabled" : "Disabled"}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-lg font-medium text-gray-900">Requirements</h2>
                        </div>
                        <div className="p-6">
                            <pre className="overflow-x-auto rounded-md bg-gray-50 p-4 text-xs text-gray-700">
                                {track.requirements ? JSON.stringify(JSON.parse(track.requirements), null, 2) : "No specific requirements configured."}
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Right Column: Timeline */}
                <div className="space-y-6">
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-lg font-medium text-gray-900">Timeline</h2>
                        </div>
                        <div className="p-6">
                            <ol className="relative border-l border-gray-200">
                                <li className="mb-10 ml-4">
                                    <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-green-500"></div>
                                    <time className="mb-1 text-sm font-normal leading-none text-gray-400">
                                        {format(new Date(track.openDate), "PPP p")}
                                    </time>
                                    <h3 className="text-sm font-semibold text-gray-900">Applications Open</h3>
                                </li>
                                <li className="mb-10 ml-4">
                                    <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-red-500"></div>
                                    <time className="mb-1 text-sm font-normal leading-none text-gray-400">
                                        {format(new Date(track.closeDate), "PPP p")}
                                    </time>
                                    <h3 className="text-sm font-semibold text-gray-900">Applications Close</h3>
                                </li>
                                {track.announceDate && (
                                    <li className="ml-4">
                                        <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-blue-500"></div>
                                        <time className="mb-1 text-sm font-normal leading-none text-gray-400">
                                            {format(new Date(track.announceDate), "PPP p")}
                                        </time>
                                        <h3 className="text-sm font-semibold text-gray-900">Result Announcement</h3>
                                    </li>
                                )}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
