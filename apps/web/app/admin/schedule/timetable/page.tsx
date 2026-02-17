import { CalendarDays, Plus, Download, Calendar, List, Grid3X3, Pencil, Trash2, Clock, MapPin, User } from "lucide-react";
import Link from "next/link";
import { getWeeklyTimetable, getScheduleStats, getClassSchedules } from "@/actions/schedule-timetable";
import TimetableFilters from "./timetable-filters";

export default async function ClassTimetablePage({
    searchParams,
}: {
    searchParams: Promise<{ view?: string; search?: string; day?: string }>;
}) {
    const params = await searchParams;
    const viewMode = params.view || "list"; // Default to list view
    const searchQuery = params.search || "";
    const dayFilter = params.day || "ALL";

    const [timetableResult, statsResult, schedulesResult] = await Promise.all([
        getWeeklyTimetable(),
        getScheduleStats(),
        getClassSchedules({ search: searchQuery, day: dayFilter !== "ALL" ? dayFilter : undefined }),
    ]);

    const timetable = timetableResult.success ? timetableResult.timetable : {};
    const stats = statsResult.success ? statsResult.stats : {
        totalSchedules: 0,
        activeCourses: 0,
        roomsUsed: 0,
        thisWeek: 0,
    };
    const schedules = schedulesResult.success ? schedulesResult.schedules : [];

    const days = ["MON", "TUE", "WED", "THU", "FRI"];
    const dayNames: { [key: string]: string } = {
        MON: "Monday",
        TUE: "Tuesday",
        WED: "Wednesday",
        THU: "Thursday",
        FRI: "Friday",
        SAT: "Saturday",
        SUN: "Sunday",
    };

    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00"
    ];

    // Helper to find schedule for a specific day and time
    const getScheduleForSlot = (day: string, time: string) => {
        const daySchedules = timetable?.[day] || [];
        return daySchedules.find((s: any) => {
            const startHour = parseInt(s.startTime.split(":")[0]);
            const slotHour = parseInt(time.split(":")[0]);
            return startHour === slotHour;
        });
    };

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Class Timetable</h1>
                        <p className="text-muted-foreground">
                            Manage class schedules and timetables
                        </p>
                    </div>
                    <Link href="/admin/schedule/timetable/create">
                        <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                            <Plus className="h-4 w-4" />
                            Add Schedule
                        </button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Schedules</p>
                                <p className="text-2xl font-bold">{stats.totalSchedules}</p>
                            </div>
                            <CalendarDays className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                                <p className="text-2xl font-bold">{stats.activeCourses}</p>
                            </div>
                            <Calendar className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Rooms Used</p>
                                <p className="text-2xl font-bold">{stats.roomsUsed}</p>
                            </div>
                            <MapPin className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                                <p className="text-2xl font-bold">{stats.thisWeek}</p>
                            </div>
                            <Calendar className="h-8 w-8 text-orange-600" />
                        </div>
                    </div>
                </div>

                {/* Filters and View Toggle */}
                <div className="flex items-center gap-4">
                    <TimetableFilters
                        initialSearch={searchQuery}
                        initialDay={dayFilter}
                        viewMode={viewMode}
                    />

                    {/* View Toggle */}
                    <div className="flex items-center rounded-md border bg-gray-50">
                        <Link
                            href={`/admin/schedule/timetable?view=list&search=${searchQuery}&day=${dayFilter}`}
                            className={`flex items-center gap-1 px-3 py-2 text-sm rounded-l-md transition-colors ${viewMode === "list" ? "bg-white shadow-sm text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <List className="h-4 w-4" />
                            List
                        </Link>
                        <Link
                            href={`/admin/schedule/timetable?view=grid&search=${searchQuery}&day=${dayFilter}`}
                            className={`flex items-center gap-1 px-3 py-2 text-sm rounded-r-md transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <Grid3X3 className="h-4 w-4" />
                            Grid
                        </Link>
                    </div>

                    <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                </div>

                {/* List View */}
                {viewMode === "list" && (
                    <div className="rounded-lg border bg-card">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold">Schedule List</h2>
                            <p className="text-sm text-muted-foreground">
                                {schedules?.length || 0} schedule(s) found
                            </p>
                        </div>

                        {schedules && schedules.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Course
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Section
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Day
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Time
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Room
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Instructor
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Term
                                            </th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {schedules.map((schedule: any) => (
                                            <tr key={schedule.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900">
                                                            {schedule.course?.code || schedule.section?.course?.code}
                                                        </span>
                                                        <span className="text-sm text-gray-500 truncate max-w-xs">
                                                            {schedule.course?.nameEn || schedule.section?.course?.nameEn}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        Sec {schedule.section?.sectionNumber}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="inline-flex items-center gap-1 text-sm">
                                                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                                        {dayNames[schedule.day] || schedule.day}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="inline-flex items-center gap-1 text-sm font-mono">
                                                        <Clock className="h-3.5 w-3.5 text-gray-400" />
                                                        {schedule.startTime} - {schedule.endTime}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    {schedule.room ? (
                                                        <span className="inline-flex items-center gap-1 text-sm">
                                                            <MapPin className="h-3.5 w-3.5 text-gray-400" />
                                                            <span className="font-medium">{schedule.room.code}</span>
                                                            <span className="text-gray-500">({schedule.room.building})</span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 text-sm">—</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4">
                                                    {schedule.instructor || schedule.section?.instructor ? (
                                                        <span className="inline-flex items-center gap-1 text-sm">
                                                            <User className="h-3.5 w-3.5 text-gray-400" />
                                                            {schedule.instructor?.firstName || schedule.section?.instructor?.firstName}{" "}
                                                            {schedule.instructor?.lastName || schedule.section?.instructor?.lastName}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 text-sm">—</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4">
                                                    {schedule.term ? (
                                                        <span className="text-sm text-gray-600">
                                                            {schedule.term.semester}/{schedule.term.year}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 text-sm">—</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/admin/schedule/timetable/${schedule.id}/edit`}
                                                            className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <CalendarDays className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p className="text-lg font-medium">No schedules found</p>
                                <p className="text-sm">Add class schedules to populate the list</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Grid/Weekly View */}
                {viewMode === "grid" && (
                    <div className="rounded-lg border bg-card">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Weekly Schedule</h2>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="p-3 text-left text-sm font-medium text-muted-foreground w-24">Time</th>
                                            {days.map((day) => (
                                                <th key={day} className="p-3 text-left text-sm font-medium text-muted-foreground">
                                                    {dayNames[day]}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timeSlots.map((time) => (
                                            <tr key={time} className="border-b last:border-0">
                                                <td className="p-3 text-sm font-medium text-muted-foreground border-r bg-gray-50/50">
                                                    {time}
                                                </td>
                                                {days.map((day) => {
                                                    const schedule = getScheduleForSlot(day, time);
                                                    return (
                                                        <td key={`${day}-${time}`} className="p-1 border-r last:border-0 h-20 align-top">
                                                            {schedule && (
                                                                <Link
                                                                    href={`/admin/schedule/timetable/${schedule.id}/edit`}
                                                                    className="block h-full w-full rounded bg-blue-50 p-2 text-xs border border-blue-100 hover:bg-blue-100 transition-colors"
                                                                >
                                                                    <div className="font-semibold text-blue-700 truncate">
                                                                        {schedule.course?.code}
                                                                    </div>
                                                                    <div className="text-blue-600 truncate">
                                                                        {schedule.course?.nameEn}
                                                                    </div>
                                                                    <div className="mt-1 flex items-center gap-1 text-blue-500">
                                                                        <span className="bg-white px-1 rounded text-[10px] border border-blue-200">
                                                                            {schedule.room?.code || "No Room"}
                                                                        </span>
                                                                    </div>
                                                                </Link>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {(!timetableResult.success || Object.values(timetable).every((arr: any) => arr.length === 0)) && (
                                <div className="text-center py-12 text-muted-foreground">
                                    <CalendarDays className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                    <p className="text-lg font-medium">No schedules found</p>
                                    <p className="text-sm">Add class schedules to populate the timetable</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
