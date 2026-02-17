import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getFaculties } from "@/actions/faculty";
import { getDepartments } from "@/actions/department";
import PersonnelForm from "@/components/personnel/personnel-form";

export default async function CreateInstructorPage() {
    const [faculties, departments] = await Promise.all([
        getFaculties(),
        getDepartments(),
    ]);

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b bg-white p-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/users/instructors"
                        className="rounded-full p-2 hover:bg-gray-100"
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Add New Instructor
                        </h1>
                        <p className="text-sm text-gray-500">
                            Create a new instructor account.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-8">
                <div className="mx-auto max-w-2xl">
                    <div className="rounded-lg border bg-white p-6 shadow-sm">
                        <PersonnelForm
                            faculties={faculties}
                            departments={departments}
                            defaultRole="INSTRUCTOR"
                            redirectPath="/admin/users/instructors"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
