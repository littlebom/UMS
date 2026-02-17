import { ClipboardList, Plus, Search, Filter, Download, Calendar, Users, AlertCircle, Clock } from "lucide-react";
import Link from "next/link";
import { getExamSchedules } from "@/actions/schedule-exams";
import { format } from "date-fns";

export default async function ExamSchedulePage() {
    const result = await getExamSchedules();
    const exams = result.success ? result.exams : [];

    // Calculate stats
    const totalExams = exams.length;
    const midtermExams = exams.filter((e: any) => e.examType === "MIDTERM").length;
    const finalExams = exams.filter((e: any) => e.examType === "FINAL").length;
    const quizExams = exams.filter((e: any) => e.examType === "QUIZ").length;
    const makeupExams = exams.filter((e: any) => e.examType === "MAKEUP").length;

    // Mock conflicts count (real logic would be more complex)
    const conflicts = 0;

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Exam Schedule</h1>
                        <p className="text-muted-foreground">
                            Manage exam schedules, rooms, and proctors
                        </p>
                    </div>
                    <Link href="/admin/schedule/exams/create">
                        <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                            <Plus className="h-4 w-4" />
                            Schedule Exam
                        </button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Exams</p>
                                <p className="text-2xl font-bold">{totalExams}</p>
                            </div>
                            <ClipboardList className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Midterm</p>
                                <p className="text-2xl font-bold">{midtermExams}</p>
                            </div>
                            <Calendar className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Final</p>
                                <p className="text-2xl font-bold">{finalExams}</p>
                            </div>
                            <Calendar className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Conflicts</p>
                                <p className={`text-2xl font-bold ${conflicts > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                                    {conflicts}
                                </p>
                            </div>
                            <AlertCircle className={`h-8 w-8 ${conflicts > 0 ? 'text-red-600' : 'text-gray-400'}`} />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by course or section..."
                            className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
                        <Filter className="h-4 w-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                </div>

                {/* Exam Types */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="text-center">
                            <Calendar className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                            <h3 className="font-semibold">Midterm</h3>
                            <p className="text-2xl font-bold mt-2">{midtermExams}</p>
                            <p className="text-xs text-muted-foreground">exams</p>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="text-center">
                            <Calendar className="mx-auto h-8 w-8 text-green-600 mb-2" />
                            <h3 className="font-semibold">Final</h3>
                            <p className="text-2xl font-bold mt-2">{finalExams}</p>
                            <p className="text-xs text-muted-foreground">exams</p>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="text-center">
                            <Calendar className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                            <h3 className="font-semibold">Quiz</h3>
                            <p className="text-2xl font-bold mt-2">{quizExams}</p>
                            <p className="text-xs text-muted-foreground">exams</p>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="text-center">
                            <Calendar className="mx-auto h-8 w-8 text-orange-600 mb-2" />
                            <h3 className="font-semibold">Makeup</h3>
                            <p className="text-2xl font-bold mt-2">{makeupExams}</p>
                            <p className="text-xs text-muted-foreground">exams</p>
                        </div>
                    </div>
                </div>

                {/* Exam List */}
                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Upcoming Exams</h2>

                        {exams.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr className="text-left text-sm text-muted-foreground">
                                            <th className="pb-3 font-medium">Date & Time</th>
                                            <th className="pb-3 font-medium">Course</th>
                                            <th className="pb-3 font-medium">Type</th>
                                            <th className="pb-3 font-medium">Room</th>
                                            <th className="pb-3 font-medium">Proctors</th>
                                            <th className="pb-3 font-medium">Status</th>
                                            <th className="pb-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {exams.map((exam: any) => (
                                            <tr key={exam.id} className="text-sm">
                                                <td className="py-3">
                                                    <div className="font-medium">{format(new Date(exam.examDate), "dd MMM yyyy")}</div>
                                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {exam.startTime} - {exam.endTime}
                                                    </div>
                                                </td>
                                                <td className="py-3">
                                                    <div className="font-medium">{exam.course.code}</div>
                                                    <div className="text-xs text-muted-foreground">{exam.course.nameEn}</div>
                                                    <div className="text-xs text-muted-foreground">Sec {exam.section}</div>
                                                </td>
                                                <td className="py-3">
                                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                                                        {exam.examType}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    {exam.examSlots.length > 0 ? (
                                                        <div className="flex flex-col gap-1">
                                                            {exam.examSlots.map((slot: any) => (
                                                                <span key={slot.id} className="text-xs bg-blue-50 text-blue-700 px-1 rounded border border-blue-100 w-fit">
                                                                    {slot.room.code}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <span className="text-muted-foreground italic">Unassigned</span>
                                                    )}
                                                </td>
                                                <td className="py-3">
                                                    {exam.proctors.length > 0 ? (
                                                        <div className="flex -space-x-2">
                                                            {exam.proctors.map((p: any) => (
                                                                <div key={p.id} className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-600" title={`${p.proctor.firstName} ${p.proctor.lastName}`}>
                                                                    {p.proctor.firstName[0]}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <span className="text-muted-foreground italic">None</span>
                                                    )}
                                                </td>
                                                <td className="py-3">
                                                    {exam.isPublished ? (
                                                        <span className="inline-flex items-center gap-1 text-green-600">
                                                            <AlertCircle className="h-4 w-4" />
                                                            Published
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-yellow-600">
                                                            <AlertCircle className="h-4 w-4" />
                                                            Draft
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3">
                                                    <Link href={`/admin/schedule/exams/${exam.id}`} className="text-blue-600 hover:underline">
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <ClipboardList className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p className="text-lg font-medium">No exams scheduled</p>
                                <p className="text-sm">Create exam schedules for the current term</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Exam Guidelines */}
                <div className="rounded-lg border bg-yellow-50 p-6">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                        Exam Scheduling Guidelines
                    </h3>
                    <div className="grid gap-2 md:grid-cols-2 text-sm">
                        <div>
                            <p className="text-muted-foreground">
                                <span className="font-medium">Midterm:</span> Must be within midterm period
                            </p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">
                                <span className="font-medium">Final:</span> Must be within final exam period
                            </p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">
                                <span className="font-medium">Room Capacity:</span> 50% of normal for social distancing
                            </p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">
                                <span className="font-medium">Proctors:</span> 1 proctor per 30 students minimum
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
