import { getTrackTypeById } from "@/actions/admission-track-type";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditTrackTypeForm from "./edit-form";

export default async function EditTrackTypePage({ params }: { params: { id: string } }) {
    const trackType = await getTrackTypeById(params.id);

    if (!trackType) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/admissions/track-types">
                    <button className="rounded-full p-2 hover:bg-gray-100">
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Track Type</h1>
                    <p className="text-gray-500">Update admission track type details</p>
                </div>
            </div>

            <EditTrackTypeForm trackType={trackType} />
        </div>
    );
}
