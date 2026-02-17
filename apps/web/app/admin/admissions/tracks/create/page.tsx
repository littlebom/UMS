import { getTrackTypes } from "@/actions/admission-track-type";
import { getProgramOptions } from "@/actions/program-options";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CreateTrackForm from "./create-form";

export default async function CreateAdmissionTrackPage() {
    const [trackTypes, programs] = await Promise.all([
        getTrackTypes(false), // Only active types
        getProgramOptions()
    ]);

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/admissions/tracks">
                    <button className="rounded-full p-2 hover:bg-gray-100">
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Create Admission Track</h1>
                    <p className="text-gray-500">Set up a new admission round for a program</p>
                </div>
            </div>

            <CreateTrackForm trackTypes={trackTypes} programs={programs} />
        </div>
    );
}
