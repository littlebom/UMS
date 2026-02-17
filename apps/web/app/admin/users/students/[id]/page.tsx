import { getStudentById } from "@/actions/user-students";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Calendar,
    GraduationCap,
    BookOpen,
    DollarSign,
    Edit,
    Trash2
} from "lucide-react";
import { format } from "date-fns";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function StudentDetailPage({ params }: PageProps) {
    const { id } = await params;

    if (id === "create") {
        notFound();
    }

    const result = await getStudentById(id);

    if (!result.success || !result.student) {
        notFound();
    }

    const student = result.student;

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b bg-white p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/users/students">
                            <button className="rounded-md border p-2 hover:bg-gray-50">
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {student.firstName} {student.lastName}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Student ID: {student.studentId}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/admin/users/students/${student.id}/edit`}>
                            <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                                <Edit className="h-4 w-4" />
                                Edit
                            </button>
                        </Link>
                        <button className="flex items-center gap-2 rounded-md border border-red-600 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">First Name</p>
                                    <p className="font-medium">{student.firstName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Last Name</p>
                                    <p className="font-medium">{student.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{student.user?.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{student.phone || "-"}</p>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-sm text-muted-foreground">Address</p>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                                        <p className="font-medium">{student.address || "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Information */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Academic Information</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">Program</p>
                                    <p className="font-medium">{student.program?.nameEn}</p>
                                    <p className="text-sm text-muted-foreground">{student.program?.nameTh}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Faculty</p>
                                    <p className="font-medium">{student.program?.faculty?.nameEn}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Department</p>
                                    <p className="font-medium">{student.program?.department?.nameEn || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Admission Year</p>
                                    <p className="font-medium">{student.admissionYear || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${student.status === "STUDYING" ? "bg-green-100 text-green-700" :
                                        student.status === "GRADUATED" ? "bg-blue-100 text-blue-700" :
                                            student.status === "ON_LEAVE" ? "bg-yellow-100 text-yellow-700" :
                                                "bg-red-100 text-red-700"
                                        }`}>
                                        {student.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Enrolled Since</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">
                                            {format(new Date(student.createdAt), "MMMM d, yyyy")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enrollments */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Course Enrollments
                            </h2>
                            {student.enrollments && student.enrollments.length > 0 ? (
                                <div className="space-y-3">
                                    {student.enrollments.map((enrollment: any) => (
                                        <div key={enrollment.id} className="flex items-center justify-between rounded-lg border p-3">
                                            <div>
                                                <p className="font-medium">{enrollment.section?.course?.nameEn}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {enrollment.section?.course?.code} - Section {enrollment.section?.sectionNumber}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">{enrollment.grade || "In Progress"}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {enrollment.section?.course?.credits} credits
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center py-8 text-muted-foreground">No enrollments yet</p>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Stats & Actions */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-blue-600" />
                                        <span className="text-sm">Enrolled Courses</span>
                                    </div>
                                    <span className="font-bold">{student.enrollments?.length || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <GraduationCap className="h-4 w-4 text-green-600" />
                                        <span className="text-sm">Completed Credits</span>
                                    </div>
                                    <span className="font-bold">
                                        {student.enrollments?.reduce((sum: number, e: any) =>
                                            sum + (e.grade && e.grade !== 'F' ? e.section?.course?.credits || 0 : 0), 0
                                        ) || 0}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="h-4 w-4 text-purple-600" />
                                        <span className="text-sm">Invoices</span>
                                    </div>
                                    <span className="font-bold">{student.invoices?.length || 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Invoices */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Recent Invoices</h2>
                            {student.invoices && student.invoices.length > 0 ? (
                                <div className="space-y-3">
                                    {student.invoices.slice(0, 5).map((invoice: any) => (
                                        <div key={invoice.id} className="flex items-center justify-between text-sm">
                                            <div>
                                                <p className="font-medium">${invoice.amount}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {format(new Date(invoice.createdAt), "MMM d, yyyy")}
                                                </p>
                                            </div>
                                            <span className={`rounded-full px-2 py-1 text-xs ${invoice.status === "PAID" ? "bg-green-100 text-green-700" :
                                                invoice.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                                                    "bg-red-100 text-red-700"
                                                }`}>
                                                {invoice.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center py-4 text-sm text-muted-foreground">No invoices</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Actions</h2>
                            <div className="space-y-2">
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    View Academic Records
                                </button>
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    View Financial Records
                                </button>
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    Enroll in Courses
                                </button>
                                <button className="w-full rounded-md border border-yellow-600 p-2 text-sm text-yellow-600 hover:bg-yellow-50 text-left">
                                    Change Status
                                </button>
                                <button className="w-full rounded-md border border-red-600 p-2 text-sm text-red-600 hover:bg-red-50 text-left">
                                    Suspend Student
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
