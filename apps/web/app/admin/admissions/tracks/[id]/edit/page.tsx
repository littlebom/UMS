import { getAdmissionTrackById } from "@/actions/admission-track";
import { getTrackTypes } from "@/actions/admission-track-type";
import { getProgramOptions } from "@/actions/program-options";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditTrackForm from "./edit-form";

export default async function EditAdmissionTrackPage({ params }: { params: { id: string } }) {
    const [track, trackTypes, programs] = await Promise.all([
        getAdmissionTrackById(params.id),
        getTrackTypes(true), // Include inactive types as the current track might use one
        getProgramOptions()
    ]);

    if (!track) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/admissions/tracks">
                    <button className="rounded-full p-2 hover:bg-gray-100">
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Admission Track</h1>
                    <p className="text-gray-500">Update admission round details</p>
                </div>
            </div>

            <EditTrackForm track={track} trackTypes={trackTypes} programs={programs} />
        </div>
    );
}
