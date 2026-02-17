import { getApplicantSession } from "@/actions/auth";
import { getPublicAdmissionTracks } from "@/actions/admission-track";
import { redirect } from "next/navigation";
import { Button } from "@repo/ui";
import { Calendar, Users, ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import * as Icons from "lucide-react";

export default async function ApplyPage() {
    const session = await getApplicantSession();

    if (!session || !session.applicantId) {
        redirect("/admissions/login");
    }

    const tracks = await getPublicAdmissionTracks();

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Select Admission Track
                    </h1>
                    <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
                        Choose an admission round to start your application.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {tracks.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
                            <Info className="h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">No active admission tracks</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                There are currently no admission rounds open for application. Please check back later.
                            </p>
                        </div>
                    ) : (
                        tracks.map((track) => {
                            const IconComponent = (Icons as any)[track.type.icon] || Icons.Target;
                            const percentFilled = Math.round((track.filledSeats / track.totalSeats) * 100);
                            const isFull = track.filledSeats >= track.totalSeats;

                            return (
                                <div
                                    key={track.id}
                                    className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl"
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div
                                                className="flex h-10 w-10 items-center justify-center rounded-full"
                                                style={{ backgroundColor: `${track.type.color}20`, color: track.type.color }}
                                            >
                                                <IconComponent className="h-6 w-6" />
                                            </div>
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                Open Now
                                            </span>
                                        </div>

                                        <div className="mt-4">
                                            <h3 className="text-lg font-medium text-gray-900">{track.nameTh}</h3>
                                            <p className="text-sm text-gray-500">{track.nameEn}</p>
                                        </div>

                                        <div className="mt-4 border-t border-gray-100 pt-4">
                                            <div className="mb-2 text-sm font-medium text-gray-900">
                                                {track.program.nameTh}
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {track.program.faculty.nameTh} • {track.program.degreeLevel}
                                            </p>
                                        </div>

                                        <div className="mt-6 space-y-4">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
                                                <span>Closes: {format(new Date(track.closeDate), "dd MMM yyyy")}</span>
                                            </div>

                                            <div className="flex items-center text-sm text-gray-500">
                                                <Users className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
                                                <span className="flex-1">
                                                    {track.totalSeats - track.filledSeats} seats remaining
                                                </span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="h-1.5 w-full rounded-full bg-gray-100">
                                                <div
                                                    className={`h-1.5 rounded-full ${percentFilled >= 90 ? 'bg-red-500' : 'bg-blue-500'}`}
                                                    style={{ width: `${Math.min(percentFilled, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto bg-gray-50 px-6 py-4">
                                        <Link href={isFull && !track.enableWaitlist ? "#" : `/admissions/application/new?trackId=${track.id}`}>
                                            <Button
                                                className="w-full justify-center"
                                                disabled={isFull && !track.enableWaitlist}
                                            >
                                                {isFull ? (
                                                    track.enableWaitlist ? "Join Waitlist" : "Full"
                                                ) : (
                                                    <>
                                                        Apply Now
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </>
                                                )}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
