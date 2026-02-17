import { getPersonnel } from "@/actions/personnel";
import { getPrograms } from "@/actions/program";
import { getFaculties } from "@/actions/faculty";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import CreateSlotForm from "../create-slot-form";

export default async function NewInterviewSlotPage() {
    const personnel = await getPersonnel();
    const programs = await getPrograms();
    const faculties = await getFaculties();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/admissions/interviews"
                    className="rounded-full p-2 hover:bg-gray-100"
                >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Create New Interview Slot
                    </h1>
                    <p className="text-sm text-gray-500">
                        Schedule a new interview slot for applicants.
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <CreateSlotForm interviewers={personnel} programs={programs} faculties={faculties} isPage={true} />
            </div>
        </div>
    );
}
