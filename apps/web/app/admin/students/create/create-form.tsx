"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createStudent } from "@/actions/student";
import { Select, SelectOption } from "@/components/ui/select";
import { User, Camera, GraduationCap, MapPin, Mail, Lock } from "lucide-react";
import Link from "next/link";

interface CreateStudentFormProps {
    programs: Array<{
        id: string;
        nameEn: string;
        nameTh: string;
        faculty: { nameEn: string };
    }>;
}

const titleOptions: SelectOption[] = [
    { value: "Mr.", label: "Mr." },
    { value: "Mrs.", label: "Mrs." },
    { value: "Ms.", label: "Ms." },
    { value: "Other", label: "Other" },
];

const genderOptions: SelectOption[] = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" },
];

const nationalityOptions: SelectOption[] = [
    { value: "Thai", label: "Thai", description: "Thai citizen" },
    { value: "Other", label: "Other", description: "International Student" },
];

export default function CreateStudentForm({ programs }: CreateStudentFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedProgram, setSelectedProgram] = useState("");
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        // Account
        email: "",
        password: "",
        studentId: "",
        // Personal
        title: "Mr.",
        firstName: "",
        lastName: "",
        firstNameTh: "",
        lastNameTh: "",
        nationality: "Thai",
        citizenId: "",
        birthDate: "",
        gender: "MALE",
        phone: "",
        // Address
        address: "",
        subDistrict: "",
        district: "",
        province: "",
        zipCode: "",
        // Academic
        programId: "",
        studentType: "REGULAR",
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validation
        if (!formData.email || !formData.password || !formData.studentId || !formData.firstName || !formData.lastName || !formData.birthDate || !selectedProgram) {
            setError("Please fill in all required fields");
            setLoading(false);
            return;
        }

        if (formData.nationality === "Thai" && (!formData.firstNameTh || !formData.lastNameTh)) {
            setError("Please fill in Thai Name fields for Thai students");
            setLoading(false);
            return;
        }

        const data = {
            email: formData.email,
            password: formData.password,
            studentId: formData.studentId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            firstNameTh: formData.firstNameTh || undefined,
            lastNameTh: formData.lastNameTh || undefined,
            birthDate: new Date(formData.birthDate),
            programId: selectedProgram,
            studentType: formData.studentType as any,
            title: formData.title,
            nationality: formData.nationality,
            citizenId: formData.citizenId || undefined,
            gender: formData.gender as any,
            phone: formData.phone || undefined,
            address: formData.address || undefined,
            subDistrict: formData.subDistrict || undefined,
            district: formData.district || undefined,
            province: formData.province || undefined,
            zipCode: formData.zipCode || undefined,
        };

        try {
            await createStudent(data);
            router.push("/admin/students");
            router.refresh();
        } catch (error: any) {
            console.error("Failed to create student:", error);
            setError(error.message || "Failed to create student. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const programOptions: SelectOption[] = programs.map((program) => ({
        value: program.id,
        label: program.nameEn,
        description: program.faculty.nameEn,
        status: "info",
    }));

    return (
        <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="rounded-lg bg-red-50 p-4 text-red-800 border border-red-200">
                        {error}
                    </div>
                )}

                {/* Account Information */}
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <div className="flex items-center gap-2 mb-4 border-b pb-2">
                        <Lock className="h-5 w-5 text-gray-600" />
                        <h2 className="text-lg font-semibold">Account Information</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Student ID *
                            </label>
                            <input
                                type="text"
                                name="studentId"
                                required
                                value={formData.studentId}
                                onChange={handleChange}
                                placeholder="e.g. 66010001"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
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
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <div className="flex items-center gap-2 mb-4 border-b pb-2">
                        <User className="h-5 w-5 text-gray-600" />
                        <h2 className="text-lg font-semibold">Personal Information</h2>
                    </div>

                    {/* Profile Image Upload */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative group cursor-pointer">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100 flex items-center justify-center">
                                {profileImagePreview ? (
                                    <img src={profileImagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-16 h-16 text-gray-400" />
                                )}
                            </div>
                            <label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors shadow-lg cursor-pointer">
                                <Camera className="w-5 h-5" />
                                <input
                                    id="profile-image-upload"
                                    name="profileImage"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Upload Profile Picture (Optional)</p>
                    </div>

                    {/* Nationality */}
                    <div className="mb-6 flex flex-col items-center">
                        <div className="w-full max-w-xs">
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">Nationality *</label>
                            <Select
                                value={formData.nationality}
                                onChange={(value) => setFormData(prev => ({ ...prev, nationality: value }))}
                                options={nationalityOptions}
                                className="w-full"
                                showDescriptionInValue={false}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                            <Select
                                value={formData.title}
                                onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                                options={titleOptions}
                                showDescriptionInValue={false}
                            />
                        </div>
                        <div className="sm:col-span-5">
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name (English) *</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                        </div>
                        <div className="sm:col-span-5">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name (English) *</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                        </div>

                        {formData.nationality === "Thai" && (
                            <>
                                <div className="sm:col-span-2 hidden sm:block"></div>
                                <div className="sm:col-span-5">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name (Thai) *</label>
                                    <input
                                        type="text"
                                        name="firstNameTh"
                                        required={formData.nationality === "Thai"}
                                        value={formData.firstNameTh}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                    />
                                </div>
                                <div className="sm:col-span-5">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name (Thai) *</label>
                                    <input
                                        type="text"
                                        name="lastNameTh"
                                        required={formData.nationality === "Thai"}
                                        value={formData.lastNameTh}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                    />
                                </div>
                            </>
                        )}

                        <div className="sm:col-span-2 hidden sm:block"></div>
                        <div className="sm:col-span-5">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Citizen ID / Passport No.</label>
                            <input
                                type="text"
                                name="citizenId"
                                maxLength={20}
                                value={formData.citizenId}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                        </div>
                        <div className="sm:col-span-5">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                        </div>

                        <div className="sm:col-span-2 hidden sm:block"></div>
                        <div className="sm:col-span-5">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date *</label>
                            <input
                                type="date"
                                name="birthDate"
                                required
                                value={formData.birthDate}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                        </div>
                        <div className="sm:col-span-5">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                            <Select
                                value={formData.gender}
                                onChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                                options={genderOptions}
                                showDescriptionInValue={false}
                            />
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <div className="flex items-center gap-2 mb-4 border-b pb-2">
                        <MapPin className="h-5 w-5 text-gray-600" />
                        <h2 className="text-lg font-semibold">Address</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address (House No, Village, Road)</label>
                            <textarea
                                name="address"
                                rows={2}
                                value={formData.address}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sub-district (Tambon)</label>
                            <input
                                type="text"
                                name="subDistrict"
                                value={formData.subDistrict}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">District (Amphoe)</label>
                            <input
                                type="text"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                            <input
                                type="text"
                                name="province"
                                value={formData.province}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                            <input
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Academic Information */}
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <div className="flex items-center gap-2 mb-4 border-b pb-2">
                        <GraduationCap className="h-5 w-5 text-gray-600" />
                        <h2 className="text-lg font-semibold">Academic Information</h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <Select
                                label="Program *"
                                value={selectedProgram}
                                onChange={(val) => setSelectedProgram(val)}
                                options={programOptions}
                                required
                            />
                            <input type="hidden" name="programId" value={selectedProgram} />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Student Type *
                            </label>
                            <select
                                name="studentType"
                                value={formData.studentType}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="REGULAR">Regular (นักศึกษาปกติ)</option>
                                <option value="EXCHANGE">Exchange (นักศึกษาแลกเปลี่ยน)</option>
                                <option value="SCHOLARSHIP">Scholarship (นักศึกษาทุน)</option>
                                <option value="SPECIAL">Special (นักศึกษาพิเศษ)</option>
                                <option value="TRANSFER">Transfer (นักศึกษาโอนย้าย)</option>
                                <option value="INTERNATIONAL">International (นักศึกษานานาชาติ)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                    <Link
                        href="/admin/students"
                        className="rounded-lg border border-gray-300 px-6 py-2 hover:bg-gray-50 inline-block"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating..." : "Create Student"}
                    </button>
                </div>
            </form>
        </div>
    );
}
