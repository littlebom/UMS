import { SubNavigation } from "@/components/sub-navigation";
import { getAdministrators, getAdministratorStats } from "@/actions/user-staff-admins";
import { Shield, Users, Activity, Search } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

const subNavItems = [
    { label: "All Administrators", href: "/admin/users/administrators" },
    { label: "System Admins", href: "/admin/users/administrators/system" },
    { label: "Department Admins", href: "/admin/users/administrators/department" },
    { label: "Activity Log", href: "/admin/users/administrators/activity" },
];

export default async function AdministratorsPage() {
    const [adminsResult, statsResult] = await Promise.all([
        getAdministrators(),
        getAdministratorStats(),
    ]);

    const administrators = adminsResult.success ? adminsResult.administrators : [];
    const stats = statsResult.success ? statsResult.stats : {
        total: 0,
        systemAdmins: 0,
        activeSessions: 0,
    };

    return (
        <div className="flex h-full flex-col">
            <SubNavigation items={subNavItems} />

            <div className="flex-1 space-y-6 p-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Administrators</h1>
                    <p className="text-muted-foreground">
                        Manage system administrators and their permissions
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Admins</p>
                                <p className="text-2xl font-bold">{stats.total}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">System Admins</p>
                                <p className="text-2xl font-bold">{stats.systemAdmins}</p>
                            </div>
                            <Shield className="h-8 w-8 text-red-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                                <p className="text-2xl font-bold">{stats.activeSessions}</p>
                            </div>
                            <Activity className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Search and Actions */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm"
                        />
                    </div>
                    <Link href="/admin/users/administrators/create">
                        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                            Add Administrator
                        </button>
                    </Link>
                </div>

                {/* Administrators Table */}
                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Administrator List ({administrators?.length || 0})</h2>

                        {administrators && administrators.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr className="text-left text-sm text-muted-foreground">
                                            <th className="pb-3 font-medium">Name</th>
                                            <th className="pb-3 font-medium">Position</th>
                                            <th className="pb-3 font-medium">Department</th>
                                            <th className="pb-3 font-medium">Email</th>
                                            <th className="pb-3 font-medium">Since</th>
                                            <th className="pb-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {administrators.map((admin: any) => (
                                            <tr key={admin.id} className="text-sm">
                                                <td className="py-3">
                                                    <div className="flex items-center gap-2">
                                                        <Shield className="h-4 w-4 text-red-600" />
                                                        <span className="font-medium">
                                                            {admin.title} {admin.firstName} {admin.lastName}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3">{admin.position || "Administrator"}</td>
                                                <td className="py-3">{admin.department?.nameEn || "-"}</td>
                                                <td className="py-3 text-muted-foreground">{admin.user?.email}</td>
                                                <td className="py-3">
                                                    {admin.user?.createdAt
                                                        ? format(new Date(admin.user.createdAt), "MMM d, yyyy")
                                                        : "-"
                                                    }
                                                </td>
                                                <td className="py-3">
                                                    <Link
                                                        href={`/admin/users/administrators/${admin.id}`}
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
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
                                <Shield className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p>No administrators found</p>
                                <p className="text-sm">Add administrators to manage the system</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
