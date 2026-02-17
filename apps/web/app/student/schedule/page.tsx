import { getStudentEnrollments } from "@/actions/enrollment";
import { getStudentSession } from "@/actions/student-auth";
import { redirect } from "next/navigation";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const TIME_SLOTS = Array.from({ length: 15 }, (_, i) =>
    `${(i + 8).toString().padStart(2, "0")}:00`
);

export default async function StudentSchedulePage() {
    const session = await getStudentSession();
    if (!session) {
        redirect("/student/login");
    }

    const enrollments = await getStudentEnrollments();

    // Helper to check if a class is in a specific day and time slot
    const getClassForSlot = (day: string, time: string) => {
        const [currentHour] = time.split(":").map(Number);

        for (const enrollment of enrollments) {
            for (const schedule of enrollment.section.schedules) {
                if (schedule.day === day) {
                    const [startHour, startMinute] = schedule.startTime.split(":").map(Number);
                    const [endHour, endMinute] = schedule.endTime.split(":").map(Number);

                    // Check if the class starts in this hour slot
                    if (currentHour === startHour) {
                        const startTimeInMinutes = startHour * 60 + startMinute;
                        const endTimeInMinutes = endHour * 60 + endMinute;
                        const durationInMinutes = endTimeInMinutes - startTimeInMinutes;

                        return {
                            courseCode: enrollment.section.course.code,
                            courseName: enrollment.section.course.nameEn,
                            room: schedule.room,
                            isStart: true,
                            durationInMinutes,
                            startMinute, // To calculate top offset
                            startTime: schedule.startTime,
                            endTime: schedule.endTime,
                        };
                    }
                }
            }
        }
        return null;
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Class Schedule</h1>
                <p className="text-gray-500">Your weekly timetable for the current term.</p>
            </header>

            {/* Debug Info */}
            <details className="mb-4 rounded bg-gray-100 p-2">
                <summary>Debug Data</summary>
                <pre className="text-xs">{JSON.stringify(enrollments, null, 2)}</pre>
            </details>

            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="min-w-[800px]">
                    {/* Header Row */}
                    <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
                        <div className="p-4 text-center text-sm font-medium text-gray-500">Time / Day</div>
                        {DAYS.map((day) => (
                            <div key={day} className="p-4 text-center text-sm font-medium text-gray-900">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Time Slots */}
                    {TIME_SLOTS.map((time) => (
                        <div key={time} className="grid grid-cols-8 border-b border-gray-100 last:border-0 h-20 relative">
                            <div className="border-r border-gray-100 p-2 text-center text-xs text-gray-500">
                                {time}
                            </div>
                            {DAYS.map((day) => {
                                const classInfo = getClassForSlot(day, time);

                                return (
                                    <div key={day} className="relative border-r border-gray-100 h-full">
                                        {classInfo && classInfo.isStart && (
                                            <div
                                                className="absolute left-1 right-1 z-10 rounded bg-blue-200 p-2 text-xs shadow-sm overflow-hidden hover:overflow-visible hover:z-20"
                                                style={{
                                                    top: `${(classInfo.startMinute / 60) * 100}%`,
                                                    height: `${(classInfo.durationInMinutes / 60) * 100}%`,
                                                    minHeight: '40px'
                                                }}
                                            >
                                                <div className="font-bold text-blue-900">{classInfo.courseCode}</div>
                                                <div className="truncate text-blue-800">{classInfo.courseName}</div>
                                                <div className="mt-1 text-blue-700">Room: {classInfo.room}</div>
                                                <div className="text-blue-700">{classInfo.startTime}-{classInfo.endTime}</div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
