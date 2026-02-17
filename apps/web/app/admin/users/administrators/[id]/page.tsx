import { prisma } from "@ums/lib";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Mail,
    Phone,
    Building,
    Shield,
    Edit,
    Trash2,
    Calendar,
    Activity,
    Key
} from "lucide-react";
import { format } from "date-fns";

interface PageProps {
    params: {
        id: string;
    };
}

async function getAdministratorById(id: string) {
    const admin = await prisma.personnel.findUnique({
        where: { id },
        include: {
            user: true,
            faculty: true,
            department: true,
        },
    });
    return admin;
}

export default async function AdministratorDetailPage({ params }: PageProps) {
    const admin = await getAdministratorById(params.id);

    if (!admin || admin.user.role !== "ADMIN") {
        notFound();
    }

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b bg-white p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/users/administrators">
                            <button className="rounded-md border p-2 hover:bg-gray-50">
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <Shield className="h-8 w-8 text-red-600" />
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {admin.title} {admin.firstName} {admin.lastName}
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    System Administrator
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/admin/users/administrators/${admin.id}/edit`}>
                            <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                                <Edit className="h-4 w-4" />
                                Edit
                            </button>
                        </Link>
                        <button className="flex items-center gap-2 rounded-md border border-red-600 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                            Revoke Access
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
                                    <p className="text-sm text-muted-foreground">Full Name</p>
                                    <p className="font-medium">
                                        {admin.title} {admin.firstName} {admin.lastName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Position</p>
                                    <p className="font-medium">{admin.position || "Administrator"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{admin.user.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{admin.phone || "-"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Admin Since</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">
                                            {format(new Date(admin.user.createdAt), "MMMM d, yyyy")}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Last Updated</p>
                                    <div className="flex items-center gap-2">
                                        <Activity className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">
                                            {format(new Date(admin.updatedAt), "MMM d, yyyy")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Department Assignment */}
                        {(admin.faculty || admin.department) && (
                            <div className="rounded-lg border bg-card p-6">
                                <h2 className="text-lg font-semibold mb-4">Department Assignment</h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {admin.faculty && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Faculty</p>
                                            <div className="flex items-center gap-2">
                                                <Building className="h-4 w-4 text-muted-foreground" />
                                                <p className="font-medium">{admin.faculty.nameEn}</p>
                                            </div>
                                        </div>
                                    )}
                                    {admin.department && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Department</p>
                                            <div className="flex items-center gap-2">
                                                <Building className="h-4 w-4 text-muted-foreground" />
                                                <p className="font-medium">{admin.department.nameEn}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Permissions */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Key className="h-5 w-5" />
                                Permissions & Access
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between rounded-lg border p-3">
                                    <div>
                                        <p className="font-medium">Full System Access</p>
                                        <p className="text-sm text-muted-foreground">Can manage all modules</p>
                                    </div>
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        Granted
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-lg border p-3">
                                    <div>
                                        <p className="font-medium">User Management</p>
                                        <p className="text-sm text-muted-foreground">Create, edit, delete users</p>
                                    </div>
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        Granted
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-lg border p-3">
                                    <div>
                                        <p className="font-medium">System Settings</p>
                                        <p className="text-sm text-muted-foreground">Modify system configuration</p>
                                    </div>
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        Granted
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-lg border p-3">
                                    <div>
                                        <p className="font-medium">Financial Records</p>
                                        <p className="text-sm text-muted-foreground">View and manage finances</p>
                                    </div>
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        Granted
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Activity Log Preview */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Activity className="h-5 w-5" />
                                Recent Activity
                            </h2>
                            <div className="text-center py-8 text-muted-foreground">
                                <Activity className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p>Activity logging coming soon</p>
                                <p className="text-sm">Track admin actions and system changes</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Info & Actions */}
                    <div className="space-y-6">
                        {/* Account Status */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Account Status</h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Role</span>
                                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                                        ADMIN
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Status</span>
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                                        Active
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">2FA</span>
                                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                                        Not Enabled
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Security</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Last Login</p>
                                    <p className="text-sm font-medium">-</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">IP Address</p>
                                    <p className="text-sm font-medium">-</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Sessions</p>
                                    <p className="text-sm font-medium">0 active</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Actions</h2>
                            <div className="space-y-2">
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    View Activity Log
                                </button>
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    Edit Permissions
                                </button>
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    Reset Password
                                </button>
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    Enable 2FA
                                </button>
                                <button className="w-full rounded-md border border-yellow-600 p-2 text-sm text-yellow-600 hover:bg-yellow-50 text-left">
                                    Suspend Account
                                </button>
                                <button className="w-full rounded-md border border-red-600 p-2 text-sm text-red-600 hover:bg-red-50 text-left">
                                    Revoke Admin Access
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
