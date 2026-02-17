"use client";

import { createAdmissionTrack } from "@/actions/admission-track";
import { Save, Calendar, Users, FileText, DollarSign } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CreateTrackFormProps {
    trackTypes: any[];
    programs: any[];
}

export default function CreateTrackForm({ trackTypes, programs }: CreateTrackFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [selectedProgram, setSelectedProgram] = useState("");
    const [academicYear, setAcademicYear] = useState(new Date().getFullYear().toString());

    // Auto-generate code
    const generateCode = () => {
        if (!selectedType || !selectedProgram || !academicYear) return;

        const type = trackTypes.find(t => t.id === selectedType);
        const program = programs.find(p => p.id === selectedProgram);

        if (type && program) {
            // Basic logic: PROGRAM-TYPE-YEAR-ROUND
            // Need a way to get program code, but for now use ID prefix or similar
            const typeCode = type.code;
            const year = academicYear;
            // Random suffix for uniqueness in this demo
            const suffix = Math.floor(Math.random() * 100);
            return `${typeCode}-${year}-${suffix}`;
        }
    };

    return (
        <form
            action={async (formData) => {
                setIsLoading(true);
                try {
                    await createAdmissionTrack(formData);
                } catch (error) {
                    alert("Error creating track: " + error);
                } finally {
                    setIsLoading(false);
                }
            }}
            className="space-y-8"
        >
            {/* 1. Basic Information */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <FileText className="h-5 w-5 text-blue-500" />
                    Basic Information
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label htmlFor="programId" className="block text-sm font-medium text-gray-700">Program</label>
                        <select
                            id="programId"
                            name="programId"
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                            value={selectedProgram}
                            onChange={(e) => setSelectedProgram(e.target.value)}
                        >
                            <option value="">Select a program...</option>
                            {programs.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nameTh} ({p.degreeLevel})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="typeId" className="block text-sm font-medium text-gray-700">Track Type</label>
                        <select
                            id="typeId"
                            name="typeId"
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="">Select a track type...</option>
                            {trackTypes.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.nameTh} ({t.nameEn})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700">Academic Year</label>
                        <input
                            id="academicYear"
                            name="academicYear"
                            value={academicYear}
                            onChange={(e) => setAcademicYear(e.target.value)}
                            required
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">Track Code</label>
                        <div className="flex gap-2">
                            <input
                                id="code"
                                name="code"
                                placeholder="e.g., QUOTA-2024-1"
                                required
                                className="w-full rounded-md border border-gray-300 p-2 text-sm uppercase focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                onClick={() => {
                                    const code = generateCode();
                                    if (code) {
                                        const input = document.getElementById('code') as HTMLInputElement;
                                        input.value = code;
                                    }
                                }}
                            >
                                Generate
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="nameTh" className="block text-sm font-medium text-gray-700">Thai Name</label>
                        <input
                            id="nameTh"
                            name="nameTh"
                            placeholder="e.g., รอบที่ 1 โควต้า"
                            required
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="nameEn" className="block text-sm font-medium text-gray-700">English Name</label>
                        <input
                            id="nameEn"
                            name="nameEn"
                            placeholder="e.g., Round 1: Quota Admission"
                            required
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* 2. Timeline */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Calendar className="h-5 w-5 text-green-500" />
                    Timeline
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <label htmlFor="openDate" className="block text-sm font-medium text-gray-700">Opening Date</label>
                        <input
                            id="openDate"
                            name="openDate"
                            type="datetime-local"
                            required
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="closeDate" className="block text-sm font-medium text-gray-700">Closing Date</label>
                        <input
                            id="closeDate"
                            name="closeDate"
                            type="datetime-local"
                            required
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="announceDate" className="block text-sm font-medium text-gray-700">Announcement Date</label>
                        <input
                            id="announceDate"
                            name="announceDate"
                            type="datetime-local"
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* 3. Capacity & Fees */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Users className="h-5 w-5 text-purple-500" />
                    Capacity & Fees
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label htmlFor="totalSeats" className="block text-sm font-medium text-gray-700">Total Seats</label>
                        <input
                            id="totalSeats"
                            name="totalSeats"
                            type="number"
                            min="1"
                            required
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="reservedSeats" className="block text-sm font-medium text-gray-700">Reserved Seats (Optional)</label>
                        <input
                            id="reservedSeats"
                            name="reservedSeats"
                            type="number"
                            min="0"
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="applicationFee" className="block text-sm font-medium text-gray-700">Application Fee (THB)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                id="applicationFee"
                                name="applicationFee"
                                type="number"
                                min="0"
                                className="w-full rounded-md border border-gray-300 p-2 pl-9 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 pt-8">
                        <input
                            type="checkbox"
                            id="enableWaitlist"
                            name="enableWaitlist"
                            value="true"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="enableWaitlist" className="font-normal text-sm text-gray-700">Enable Waitlist</label>
                    </div>
                </div>
            </div>

            {/* 4. Requirements */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <FileText className="h-5 w-5 text-orange-500" />
                    Requirements (JSON)
                </h2>
                <div className="space-y-2">
                    <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements Configuration</label>
                    <textarea
                        id="requirements"
                        name="requirements"
                        rows={5}
                        className="w-full rounded-md border border-gray-300 p-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder='{ "minGPA": 2.5, "documents": ["Transcript", "Portfolio"] }'
                    />
                    <p className="text-xs text-gray-500">Enter requirements in JSON format (Advanced)</p>
                </div>
            </div>

            {/* 5. Status */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            value="true"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="isActive" className="font-normal text-sm text-gray-700">Active (Internal)</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isPublished"
                            name="isPublished"
                            value="true"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="isPublished" className="font-normal text-sm text-gray-700">Published (Public)</label>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Link href="/admin/admissions/tracks">
                    <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                </Link>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
                >
                    {isLoading ? "Creating..." : "Create Admission Track"}
                    {!isLoading && <Save className="ml-2 h-4 w-4" />}
                </button>
            </div>
        </form>
    );
}
