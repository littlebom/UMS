"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPersonnel } from "@/actions/personnel";
import { Save, Loader2 } from "lucide-react";

interface PersonnelFormProps {
    faculties: any[];
    departments: any[];
    defaultRole: "STAFF" | "INSTRUCTOR" | "ADMIN";
    redirectPath: string;
}

export default function PersonnelForm({
    faculties,
    departments,
    defaultRole,
    redirectPath
}: PersonnelFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            role: defaultRole,
            title: formData.get("title") as string,
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            position: formData.get("position") as string,
            phone: formData.get("phone") as string,
            facultyId: formData.get("facultyId") as string || undefined,
            departmentId: formData.get("departmentId") as string || undefined,
        };

        try {
            await createPersonnel(data);
            router.push(redirectPath);
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to create personnel");
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <select
                        name="title"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                    >
                        <option value="">Select Title</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Asst. Prof.">Asst. Prof.</option>
                        <option value="Assoc. Prof.">Assoc. Prof.</option>
                        <option value="Prof.">Prof.</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Position</label>
                    <input
                        name="position"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="e.g. Registrar, Accountant"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input
                        name="firstName"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input
                        name="lastName"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                    />
                </div>
            </div>

            <hr />

            <div className="space-y-4">
                <h3 className="text-sm font-semibold">Account Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            required
                        />
                    </div>
                </div>
            </div>

            <hr />

            <div className="space-y-4">
                <h3 className="text-sm font-semibold">Organization</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Faculty</label>
                        <select
                            name="facultyId"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="">Select Faculty</option>
                            {faculties.map((f) => (
                                <option key={f.id} value={f.id}>
                                    {f.nameEn}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Department</label>
                        <select
                            name="departmentId"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="">Select Department</option>
                            {departments.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.nameEn}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input
                    name="phone"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="e.g. 081-234-5678"
                />
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    Create Staff Account
                </button>
            </div>
        </form>
    );
}
