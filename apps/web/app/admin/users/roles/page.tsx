import { SubNavigation } from "@/components/sub-navigation";
import { UserCog, Shield, Key, List } from "lucide-react";

const subNavItems = [
    { label: "All Roles", href: "/admin/users/roles" },
    { label: "Permissions", href: "/admin/users/roles/permissions" },
    { label: "Access Control", href: "/admin/users/roles/access-control" },
];

export default function RolesPage() {
    return (
        <div className="flex h-full flex-col">
            <SubNavigation items={subNavItems} />

            <div className="flex-1 space-y-6 p-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
                    <p className="text-muted-foreground">
                        Manage user roles and access permissions across the system
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Roles</p>
                                <p className="text-2xl font-bold">5</p>
                            </div>
                            <List className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Permissions</p>
                                <p className="text-2xl font-bold">0</p>
                            </div>
                            <Key className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Custom Roles</p>
                                <p className="text-2xl font-bold">0</p>
                            </div>
                            <Shield className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Default Roles */}
                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">System Roles</h2>
                            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                                Create Custom Role
                            </button>
                        </div>

                        <div className="space-y-3">
                            {[
                                { name: "ADMIN", description: "Full system access", users: 0, color: "red" },
                                { name: "STAFF", description: "Administrative staff access", users: 0, color: "blue" },
                                { name: "INSTRUCTOR", description: "Faculty member access", users: 0, color: "green" },
                                { name: "STUDENT", description: "Student portal access", users: 0, color: "purple" },
                                { name: "APPLICANT", description: "Application system access", users: 0, color: "orange" },
                            ].map((role) => (
                                <div key={role.name} className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`rounded-full p-2 bg-${role.color}-100`}>
                                            <UserCog className={`h-5 w-5 text-${role.color}-600`} />
                                        </div>
                                        <div>
                                            <p className="font-medium">{role.name}</p>
                                            <p className="text-sm text-muted-foreground">{role.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-muted-foreground">{role.users} users</span>
                                        <button className="text-sm text-blue-600 hover:underline">
                                            Edit Permissions
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
