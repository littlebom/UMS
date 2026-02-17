import { getAdmissionTrackById } from "@/actions/admission-track";
import { notFound, redirect } from "next/navigation";
import { PublicNavbar } from "@/components/public-navbar";
import ApplicationForm from "./application-form";
import { Calendar, Users, Info } from "lucide-react";
import { format } from "date-fns";

export default async function ApplyPage({ params }: { params: { trackId: string } }) {
    const track = await getAdmissionTrackById(params.trackId);

    if (!track) {
        notFound();
    }

    // Check availability logic (simplified for now, can use checkTrackAvailability action later)
    const now = new Date();
    const isOpen = track.isActive && track.isPublished && now >= track.openDate && now <= track.closeDate;

    if (!isOpen) {
        return (
            <div className="min-h-screen bg-gray-50">
                <PublicNavbar />
                <div className="container mx-auto px-4 py-20 text-center">
                    <div className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-sm">
                        <Info className="mx-auto h-12 w-12 text-yellow-500" />
                        <h1 className="mt-4 text-2xl font-bold text-gray-900">Applications Closed</h1>
                        <p className="mt-2 text-gray-600">
                            The admission track <strong>{track.program.nameEn} ({track.type.nameEn})</strong> is currently not accepting applications.
                        </p>
                        <p className="mt-4 text-sm text-gray-500">
                            Open: {format(new Date(track.openDate), "PPP")} - Close: {format(new Date(track.closeDate), "PPP")}
                        </p>
                        <a href="/admissions" className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                            Back to Admissions
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PublicNavbar />

            <div className="bg-blue-900 py-12 text-white">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
                            <a href="/admissions" className="hover:text-white">Admissions</a>
                            <span>/</span>
                            <span>Apply</span>
                        </div>
                        <h1 className="text-3xl font-bold">{track.program.nameEn}</h1>
                        <div className="mt-4 flex flex-wrap gap-6 text-blue-100">
                            <div className="flex items-center gap-2">
                                <span className="rounded bg-blue-800 px-2 py-1 text-xs font-medium uppercase tracking-wider text-blue-100">
                                    {track.type.nameEn}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm">
                                    Closes: {format(new Date(track.closeDate), "PPP")}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span className="text-sm">
                                    {track.totalSeats} Seats
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto -mt-8 px-4 pb-20">
                <div className="mx-auto max-w-4xl rounded-xl bg-white shadow-lg ring-1 ring-gray-200">
                    <ApplicationForm track={track} />
                </div>
            </div>
        </div>
    );
}
