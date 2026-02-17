"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { registerApplicant } from "@/actions/admissions";
import Link from "next/link";
import { GraduationCap, ArrowRight, ArrowLeft, Check, Loader2, Plus, Trash2, User, Camera } from "lucide-react";
import { Select, SelectOption } from "@/components/ui/select";

// Select options
const nationalityOptions: SelectOption[] = [
    { value: "Thai", label: "Thai", description: "Thai citizen" },
    { value: "Other", label: "Other", description: "International Student" },
];

const countryOptions: SelectOption[] = [
    { value: "Thailand", label: "Thailand" },
    { value: "Other", label: "Other" },
];

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

const educationLevelOptions: SelectOption[] = [
    { value: "High School", label: "High School" },
    { value: "Diploma", label: "Diploma" },
    { value: "Bachelor", label: "Bachelor's Degree" },
    { value: "Master", label: "Master's Degree" },
    { value: "Doctorate", label: "Doctorate" },
    { value: "Other", label: "Other" },
];

import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
    const searchParams = useSearchParams();
    const trackId = searchParams.get("trackId");

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        title: "Mr.",
        firstName: "", // English
        lastName: "",  // English
        firstNameTh: "",
        lastNameTh: "",
        nationality: "Thai",
        citizenId: "",
        birthDate: "",
        gender: "MALE",
        phone: "",
        address: "",
        subDistrict: "",
        district: "",
        province: "",
        country: "Thailand",
        otherCountry: "",
        zipCode: "",
        // Education History Array
        educationHistory: [
            { level: "High School", degreeName: "", institution: "", gpa: "", graduationYear: "" }
        ],
    });
    const [error, setError] = useState<string | null>(null);
    const [extraDocs, setExtraDocs] = useState<number[]>([]);
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

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

    const addDoc = () => {
        setExtraDocs([...extraDocs, extraDocs.length + 1]);
    };

    // Education History Handlers
    const addEducation = () => {
        setFormData({
            ...formData,
            educationHistory: [
                ...formData.educationHistory,
                { level: "Bachelor", degreeName: "", institution: "", gpa: "", graduationYear: "" }
            ]
        });
    };

    const removeEducation = (index: number) => {
        if (formData.educationHistory.length > 1) {
            const newHistory = [...formData.educationHistory];
            newHistory.splice(index, 1);
            setFormData({ ...formData, educationHistory: newHistory });
        }
    };

    const handleEducationChange = (index: number, field: string, value: string) => {
        const newHistory = [...formData.educationHistory];
        newHistory[index] = { ...newHistory[index], [field]: value };
        setFormData({ ...formData, educationHistory: newHistory });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        // Simple validation before next
        if (step === 1) {
            if (!formData.email || !formData.password || !formData.confirmPassword || !formData.firstName || !formData.lastName || !formData.citizenId || !formData.birthDate || !formData.phone) {
                setError("Please fill in all required fields");
                return;
            }
            if (formData.nationality === "Thai" && (!formData.firstNameTh || !formData.lastNameTh)) {
                setError("Please fill in Thai Name fields");
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match");
                return;
            }
        }
        setError(null);
        setStep(step + 1);
    };

    const prevStep = () => {
        setError(null);
        setStep(step - 1);
    };

    // Server Action Wrapper
    async function clientAction(formDataObj: FormData) {
        // Append educationHistory as JSON string
        formDataObj.append("educationHistory", JSON.stringify(formData.educationHistory));
        const result = await registerApplicant(null, formDataObj);
        if (result?.error) {
            setError(result.error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center items-center gap-2">
                    <GraduationCap className="h-10 w-10 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">UMS Admissions</span>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Create your applicant account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between relative">
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
                            <StepIndicator currentStep={step} stepNumber={1} label="Personal Info" />
                            <StepIndicator currentStep={step} stepNumber={2} label="Education & Docs" />
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <form action={clientAction}>
                        {trackId && <input type="hidden" name="trackId" value={trackId} />}
                        {/* Hidden inputs to submit all data at once (except educationHistory which is handled manually) */}
                        {Object.entries(formData).map(([key, value]) => {
                            if (key === 'educationHistory') return null;
                            return <input key={key} type="hidden" name={key} value={value as string} />
                        })}

                        {/* Step 1: Account & Personal Info */}
                        {step === 1 && (
                            <div className="space-y-8">
                                {/* ... (Account & Personal & Address Sections remain same) ... */}


                                {/* Personal Section */}
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4 border-b pb-2">Personal Information</h3>

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
                                        <p className="mt-2 text-sm text-gray-500">Upload Profile Picture</p>
                                    </div>

                                    <div className="mb-6 flex flex-col items-center">
                                        <div className="w-full max-w-xs">
                                            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">Nationality</label>
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
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                            <Select
                                                value={formData.title}
                                                onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                                                options={titleOptions}
                                                showDescriptionInValue={false}
                                            />
                                        </div>
                                        <div className="sm:col-span-5">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name (English)</label>
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
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name (English)</label>
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
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name (Thai)</label>
                                                    <input
                                                        type="text"
                                                        name="firstNameTh"
                                                        required
                                                        value={formData.firstNameTh}
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                    />
                                                </div>
                                                <div className="sm:col-span-5">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name (Thai)</label>
                                                    <input
                                                        type="text"
                                                        name="lastNameTh"
                                                        required
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
                                                required
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
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                            />
                                        </div>

                                        <div className="sm:col-span-2 hidden sm:block"></div>
                                        <div className="sm:col-span-5">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
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
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                            <Select
                                                value={formData.gender}
                                                onChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                                                options={genderOptions}
                                                showDescriptionInValue={false}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Address Section */}
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4 border-b pb-2">Address</h3>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Address (House No, Village, Road)</label>
                                            <textarea
                                                name="address"
                                                rows={2}
                                                required
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
                                                required
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
                                                required
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
                                                required
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
                                                required
                                                value={formData.zipCode}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                            />
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                            <Select
                                                value={formData.country}
                                                onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                                                options={countryOptions}
                                                showDescriptionInValue={false}
                                            />
                                        </div>
                                        {formData.country === "Other" && (
                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Country Name</label>
                                                <input
                                                    type="text"
                                                    name="otherCountry"
                                                    required
                                                    value={formData.otherCountry}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Account Section */}
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4 border-b pb-2">Account Information</h3>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                            />
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                required
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                            />
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                required
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Education & Documents */}
                        {step === 2 && (
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Education History</h3>
                                        <button
                                            type="button"
                                            onClick={addEducation}
                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            <Plus className="mr-1 h-3 w-3" />
                                            Add Education
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {formData.educationHistory.map((edu, index) => (
                                            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
                                                {formData.educationHistory.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeEducation(index)}
                                                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                )}
                                                <h4 className="text-sm font-medium text-gray-900 mb-3">Education #{index + 1}</h4>
                                                <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                                                    <div className="sm:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                                                        <Select
                                                            value={edu.level}
                                                            onChange={(value) => handleEducationChange(index, 'level', value)}
                                                            options={educationLevelOptions}
                                                            showDescriptionInValue={false}
                                                        />
                                                    </div>
                                                    <div className="sm:col-span-4">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={edu.institution}
                                                            onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                            placeholder="e.g. Chulalongkorn University"
                                                        />
                                                    </div>
                                                    <div className="sm:col-span-4">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree / Major / Certificate</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={edu.degreeName}
                                                            onChange={(e) => handleEducationChange(index, 'degreeName', e.target.value)}
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                            placeholder="e.g. B.Sc. Computer Science"
                                                        />
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                                                        <input
                                                            type="text"
                                                            value={edu.gpa}
                                                            onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                            placeholder="e.g. 3.50"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4 border-b pb-2">Required Documents</h3>
                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                                        <div className="flex">
                                            <div className="ml-3">
                                                <p className="text-sm text-yellow-700">
                                                    Please prepare your documents. You can upload them now or later in your dashboard.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                                            <div className="space-y-1">
                                                <div className="text-sm text-gray-600">
                                                    <label htmlFor="transcript-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                        <span>Upload Transcript</span>
                                                        <input id="transcript-upload" name="transcript" type="file" className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                                            </div>
                                        </div>

                                        {extraDocs.map((id) => (
                                            <div key={id} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                                                <div className="space-y-1">
                                                    <div className="text-sm text-gray-600">
                                                        <label htmlFor={`doc-upload-${id}`} className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                            <span>Upload Additional Document {id}</span>
                                                            <input id={`doc-upload-${id}`} name={`additionalDoc_${id}`} type="file" className="sr-only" />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={addDoc}
                                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Another Document
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="mt-8 flex justify-between">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </button>
                            ) : (
                                <div></div> // Spacer
                            )}

                            {step < 2 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Next
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            ) : (
                                <SubmitButton />
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function StepIndicator({ currentStep, stepNumber, label }: { currentStep: number; stepNumber: number; label: string }) {
    const isActive = currentStep >= stepNumber;
    const isCurrent = currentStep === stepNumber;

    return (
        <div className="flex flex-col items-center relative z-10">
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200 ${isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
            >
                {isActive && !isCurrent ? <Check className="h-5 w-5" /> : stepNumber}
            </div>
            <span className={`mt-2 text-xs font-medium ${isCurrent ? "text-blue-600" : "text-gray-500"}`}>
                {label}
            </span>
        </div>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex items-center px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                </>
            ) : (
                <>
                    Complete Registration
                    <Check className="ml-2 h-4 w-4" />
                </>
            )}
        </button>
    );
}
