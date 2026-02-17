"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPersonnel } from "@/actions/personnel";
import { Button } from "@ums/ui";
import { Select, SelectOption } from "@/components/ui/select";

interface CreatePersonnelFormProps {
    faculties: Array<{ id: string; nameEn: string; nameTh: string }>;
    departments: Array<{
        id: string;
        nameEn: string;
        nameTh: string;
        facultyId: string;
    }>;
}

export default function CreatePersonnelForm({
    faculties,
    departments,
}: CreatePersonnelFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

    const filteredDepartments = selectedFaculty
        ? departments.filter((d) => d.facultyId === selectedFaculty)
        : departments;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            role: formData.get("role") as "STAFF" | "INSTRUCTOR" | "ADMIN",
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            title: formData.get("title") as string,
            position: formData.get("position") as string,
            phone: formData.get("phone") as string,
            facultyId: formData.get("facultyId") as string,
            departmentId: formData.get("departmentId") as string,
        };

        try {
            await createPersonnel(data);
            router.push("/admin/personnel");
            router.refresh();
        } catch (error) {
            console.error("Failed to create personnel:", error);
            alert("Failed to create personnel. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const roleOptions: SelectOption[] = [
        { value: "STAFF", label: "Staff", status: "info" },
        { value: "INSTRUCTOR", label: "Instructor", status: "success" },
        { value: "ADMIN", label: "Administrator", status: "error" },
    ];

    const facultyOptions: SelectOption[] = faculties.map((f) => ({
        value: f.id,
        label: f.nameEn,
        description: f.nameTh,
        status: "info",
    }));

    const departmentOptions: SelectOption[] = filteredDepartments.map((d) => ({
        value: d.id,
        label: d.nameEn,
        description: d.nameTh,
        status: "neutral",
    }));

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">Account Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Password *
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            minLength={8}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Select
                            label="Role"
                            value={selectedRole}
                            onChange={(val) => setSelectedRole(val)}
                            options={roleOptions}
                            required
                        />
                        <input type="hidden" name="role" value={selectedRole} />
                    </div>
                </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">Personal Information</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Dr., Mr., Ms."
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            First Name *
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Last Name *
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Position
                        </label>
                        <input
                            type="text"
                            name="position"
                            placeholder="Lecturer, Registrar, etc."
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">Organization</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <Select
                            label="Faculty"
                            value={selectedFaculty}
                            onChange={(val) => {
                                setSelectedFaculty(val);
                                setSelectedDepartment(""); // Reset department when faculty changes
                            }}
                            options={facultyOptions}
                        />
                        <input type="hidden" name="facultyId" value={selectedFaculty} />
                    </div>
                    <div>
                        <Select
                            label="Department"
                            value={selectedDepartment}
                            onChange={(val) => setSelectedDepartment(val)}
                            options={departmentOptions}
                            disabled={!selectedFaculty}
                            placeholder={!selectedFaculty ? "Select Faculty first" : "Select Department"}
                        />
                        <input type="hidden" name="departmentId" value={selectedDepartment} />
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <Button
                    type="button"
                    onClick={() => router.back()}
                    className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-5 py-2.5"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5"
                >
                    {loading ? "Creating..." : "Create Personnel"}
                </Button>
            </div>
        </form>
    );
}
