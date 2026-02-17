"use client";

import { useState } from "react";
import { Check, ChevronRight, User, GraduationCap, FileText, Send, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { submitApplication } from "@/actions/application";

interface ApplicationFormProps {
    track: any;
}

// Form Steps
const STEPS = [
    { id: 1, name: "Personal Info", icon: User },
    { id: 2, name: "Education", icon: GraduationCap },
    { id: 3, name: "Documents", icon: FileText },
    { id: 4, name: "Review", icon: Send },
];

export default function ApplicationForm({ track }: ApplicationFormProps) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form Data State
    const [formData, setFormData] = useState({
        // Personal
        firstName: "",
        lastName: "",
        nationalId: "",
        email: "",
        phone: "",
        address: "",
        // Education
        schoolName: "",
        gpax: "",
        studyPlan: "",
        // Documents (Mock for now)
        transcript: null,
        idCard: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Prepare data payload
            const payload = {
                trackId: track.id,
                programId: track.programId,
                ...formData,
                // Mock URLs for now (In real app, upload first then get URLs)
                transcriptUrl: "https://example.com/transcript.pdf",
                idCardUrl: "https://example.com/idcard.jpg"
            };

            await submitApplication(payload);

            alert("Application Submitted Successfully!");
            router.push("/applicant/dashboard");
        } catch (error: any) {
            console.error("Submission error:", error);
            alert(error.message || "Failed to submit application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 sm:p-10">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="relative flex justify-between">
                    {/* Line background */}
                    <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full -translate-y-1/2 bg-gray-200" />

                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isCompleted = currentStep > step.id;
                        const isCurrent = currentStep === step.id;

                        return (
                            <div key={step.id} className="flex flex-col items-center bg-white px-2">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${isCompleted || isCurrent
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-gray-300 bg-white text-gray-400"
                                        }`}
                                >
                                    {isCompleted ? <Check className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
                                </div>
                                <span className={`mt-2 text-xs font-medium ${isCurrent ? "text-blue-600" : "text-gray-500"}`}>
                                    {step.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Step Content */}
            <div className="mt-8">
                {currentStep === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name (Thai)</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name (Thai)</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">National ID</label>
                                <input
                                    type="text"
                                    name="nationalId"
                                    value={formData.nationalId}
                                    onChange={handleInputChange}
                                    maxLength={13}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Current Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-semibold text-gray-900">Education Background</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">School Name</label>
                                <input
                                    type="text"
                                    name="schoolName"
                                    value={formData.schoolName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="e.g. Triam Udom Suksa School"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">GPAX (5 Semesters)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="4.00"
                                    name="gpax"
                                    value={formData.gpax}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="0.00 - 4.00"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Study Plan / Major</label>
                                <select
                                    name="studyPlan"
                                    value={formData.studyPlan}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Study Plan</option>
                                    <option value="Science-Math">Science-Math</option>
                                    <option value="Math-English">Math-English</option>
                                    <option value="Arts-Language">Arts-Language</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-semibold text-gray-900">Required Documents</h2>
                        <div className="rounded-md bg-blue-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <AlertCircle className="h-5 w-5 text-blue-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">Upload Instructions</h3>
                                    <div className="mt-2 text-sm text-blue-700">
                                        <ul role="list" className="list-disc space-y-1 pl-5">
                                            <li>Supported formats: PDF, JPG, PNG</li>
                                            <li>Maximum file size: 5MB per file</li>
                                            <li>Please ensure all documents are clear and legible</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center hover:bg-gray-50">
                                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                    <label
                                        htmlFor="transcript-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                    >
                                        <span>Upload Transcript</span>
                                        <input id="transcript-upload" name="transcript" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">Official Transcript (5 Semesters)</p>
                            </div>

                            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center hover:bg-gray-50">
                                <User className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                    <label
                                        htmlFor="idcard-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                    >
                                        <span>Upload ID Card</span>
                                        <input id="idcard-upload" name="idCard" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">Copy of National ID Card</p>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-semibold text-gray-900">Review Application</h2>
                        <div className="rounded-lg border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h3>
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{formData.firstName} {formData.lastName}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">National ID</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{formData.nationalId}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{formData.email}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{formData.phone}</dd>
                                </div>
                            </dl>

                            <h3 className="mb-4 mt-8 text-lg font-medium text-gray-900 border-b pb-2">Education</h3>
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">School</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{formData.schoolName}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">GPAX</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{formData.gpax}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Study Plan</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{formData.studyPlan}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="flex items-start gap-3 rounded-md bg-yellow-50 p-4">
                            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" required />
                            <label className="text-sm text-yellow-800">
                                I certify that all the information provided in this application is true and correct. I understand that any false information may result in the rejection of my application.
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-between border-t border-gray-200 pt-6">
                <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1 || isSubmitting}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Back
                </button>

                {currentStep < STEPS.length ? (
                    <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Next Step
                        <ChevronRight className="h-4 w-4" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                        {!isSubmitting && <Send className="h-4 w-4" />}
                    </button>
                )}
            </div>
        </div>
    );
}
