import { getAcademicTerms, getClassSections } from "@/actions/academic";
import { getRooms } from "@/actions/schedule-rooms";
import { getInstructors } from "@/actions/user-instructors";
import { getStudentGroups } from "@/actions/student-group";
import CreateScheduleForm from "./create-schedule-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CreateSchedulePage() {
    const [sections, roomsResult, instructorsResult, terms, studentGroupsResult] = await Promise.all([
        getClassSections(),
        getRooms({ isAvailable: true }),
        getInstructors(),
        getAcademicTerms(),
        getStudentGroups(),
    ]);

    const rooms = roomsResult.success ? (roomsResult.rooms ?? []) : [];
    const instructors = instructorsResult.success ? (instructorsResult.instructors ?? []) : [];
    const studentGroups = studentGroupsResult.success ? (studentGroupsResult.groups ?? []) : [];

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 p-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/schedule/timetable"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create Schedule</h1>
                        <p className="text-muted-foreground">
                            Add a new class schedule to the timetable
                        </p>
                    </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <CreateScheduleForm
                        sections={sections}
                        rooms={rooms}
                        instructors={instructors}
                        terms={terms}
                        studentGroups={studentGroups}
                    />
                </div>
            </div>
        </div>
    );
}

