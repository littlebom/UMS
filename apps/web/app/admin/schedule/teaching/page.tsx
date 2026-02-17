import { CalendarCheck, Search, Filter, Users, BookOpen, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { getTeachingLoads, getTeachingStats } from "@/actions/schedule-teaching";

export default async function TeachingSchedulePage() {
    const [loadsResult, statsResult] = await Promise.all([
        getTeachingLoads(),
        getTeachingStats(),
    ]);

    const loads = loadsResult.success ? loadsResult.loads : [];
    const stats = statsResult.success ? statsResult.stats : {
        activeInstructors: 0,
        coursesAssigned: 0,
        avgTeachingHours: 0,
        overloaded: 0,
    };

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 p-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Teaching Schedule</h1>
                    <p className="text-muted-foreground">
                        Manage instructor teaching assignments and workload
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Instructors</p>
                                <p className="text-2xl font-bold">{stats.activeInstructors}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Courses Assigned</p>
                                <p className="text-2xl font-bold">{stats.coursesAssigned}</p>
                            </div>
                            <BookOpen className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Avg. Teaching Hours</p>
                                <p className="text-2xl font-bold">{stats.avgTeachingHours}</p>
                            </div>
                            <Clock className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Overloaded</p>
                                <p className={`text-2xl font-bold ${stats.overloaded > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                                    {stats.overloaded}
                                </p>
                            </div>
                            <CalendarCheck className={`h-8 w-8 ${stats.overloaded > 0 ? 'text-red-600' : 'text-gray-400'}`} />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by instructor name..."
                            className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
                        <Filter className="h-4 w-4" />
                        Filter
                    </button>
                </div>

                {/* Instructor List */}
                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Instructor Teaching Load</h2>

                        {loads.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr className="text-left text-sm text-muted-foreground">
                                            <th className="pb-3 font-medium">Instructor</th>
                                            <th className="pb-3 font-medium">Position</th>
                                            <th className="pb-3 font-medium">Courses</th>
                                            <th className="pb-3 font-medium">Lecture (Hrs)</th>
                                            <th className="pb-3 font-medium">Lab (Hrs)</th>
                                            <th className="pb-3 font-medium">Total Load</th>
                                            <th className="pb-3 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {loads.map((load: any) => {
                                            const isOverloaded = Number(load.totalHours) > 18;
                                            return (
                                                <tr key={load.id} className="text-sm">
                                                    <td className="py-3 font-medium">
                                                        {load.instructor.firstName} {load.instructor.lastName}
                                                    </td>
                                                    <td className="py-3 text-muted-foreground">
                                                        {load.instructor.position || "-"}
                                                    </td>
                                                    <td className="py-3">{load.courseCount}</td>
                                                    <td className="py-3">{Number(load.lectureHours).toFixed(1)}</td>
                                                    <td className="py-3">{Number(load.labHours).toFixed(1)}</td>
                                                    <td className="py-3 font-semibold">
                                                        {Number(load.totalHours).toFixed(1)}
                                                    </td>
                                                    <td className="py-3">
                                                        {isOverloaded ? (
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                                                                <AlertTriangle className="h-3 w-3" />
                                                                Overloaded
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                                                <CheckCircle className="h-3 w-3" />
                                                                Normal
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <CalendarCheck className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p className="text-lg font-medium">No teaching assignments found</p>
                                <p className="text-sm">Assign courses to instructors to track their workload</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Teaching Load Guidelines */}
                <div className="rounded-lg border bg-blue-50 p-6">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        Teaching Load Guidelines
                    </h3>
                    <div className="grid gap-2 md:grid-cols-2 text-sm">
                        <div>
                            <p className="text-muted-foreground">
                                <span className="font-medium">Full-time Faculty:</span> Maximum 18 hours/week
                            </p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">
                                <span className="font-medium">Part-time Faculty:</span> Maximum 9 hours/week
                            </p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">
                                <span className="font-medium">Lab Hours:</span> Counted as 0.5x lecture hours
                            </p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">
                                <span className="font-medium">Recommended:</span> 12-15 hours/week for full-time
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
