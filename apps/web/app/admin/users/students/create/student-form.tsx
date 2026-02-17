"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createStudent } from "@/actions/student";
import { Save, Loader2 } from "lucide-react";

interface StudentFormProps {
    programs: any[];
}

export default function StudentForm({ programs }: StudentFormProps) {
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
            studentId: formData.get("studentId") as string,
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            firstNameTh: formData.get("firstNameTh") as string,
            lastNameTh: formData.get("lastNameTh") as string,
            birthDate: new Date(formData.get("birthDate") as string),
            programId: formData.get("programId") as string,
            phone: formData.get("phone") as string,
            citizenId: formData.get("citizenId") as string,
            nationality: formData.get("nationality") as string,
            gender: formData.get("gender") as any,
            address: formData.get("address") as string,
            province: formData.get("province") as string,
            zipCode: formData.get("zipCode") as string,
        };

        try {
            await createStudent(data);
            router.push("/admin/users/students");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to create student");
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

            <div className="space-y-4">
                <h3 className="text-sm font-semibold">Student Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Student ID</label>
                        <input
                            name="studentId"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            required
                            placeholder="e.g. 640123456"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Program</label>
                        <select
                            name="programId"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            required
                        >
                            <option value="">Select Program</option>
                            {programs.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nameEn}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">First Name (EN)</label>
                        <input
                            name="firstName"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name (EN)</label>
                        <input
                            name="lastName"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">First Name (TH)</label>
                        <input
                            name="firstNameTh"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name (TH)</label>
                        <input
                            name="lastNameTh"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Birth Date</label>
                        <input
                            name="birthDate"
                            type="date"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Gender</label>
                        <select
                            name="gender"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            <hr />

            <div className="space-y-4">
                <h3 className="text-sm font-semibold">Account & Contact</h3>
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
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <input
                            name="phone"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Citizen ID</label>
                        <input
                            name="citizenId"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>
                </div>
            </div>

            <hr />

            <div className="space-y-4">
                <h3 className="text-sm font-semibold">Address</h3>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Full Address</label>
                    <textarea
                        name="address"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        rows={2}
                    />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Province</label>
                        <input
                            name="province"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Zip Code</label>
                        <input
                            name="zipCode"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>
                </div>
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
                    Register Student
                </button>
            </div>
        </form>
    );
}
