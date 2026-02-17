"use client";

import { useState, useEffect } from "react";
import { updateStudentProfile, updatePrivacySettings } from "@/actions/student-profile";
import { User, Lock, Save, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileSettingsFormProps {
    student: any;
}

export function ProfileSettingsForm({ student }: ProfileSettingsFormProps) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Profile data
    const [bio, setBio] = useState(student.bio || "");
    const [interests, setInterests] = useState(student.interests || "");
    const [skills, setSkills] = useState(student.skills || "");
    const [socialLinks, setSocialLinks] = useState(() => {
        try {
            return student.socialLinks ? JSON.parse(student.socialLinks) : {};
        } catch {
            return {};
        }
    });

    // Privacy settings
    const [isProfilePublic, setIsProfilePublic] = useState(student.isProfilePublic);
    const [showGPA, setShowGPA] = useState(student.showGPA);

    const handleSaveProfile = async () => {
        setIsSaving(true);
        setMessage(null);

        try {
            await updateStudentProfile({
                bio,
                interests,
                skills,
                socialLinks: JSON.stringify(socialLinks),
            });

            setMessage({ type: "success", text: "Profile updated successfully!" });
            router.refresh();
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update profile" });
        } finally {
            setIsSaving(false);
        }
    };

    const handleSavePrivacy = async () => {
        setIsSaving(true);
        setMessage(null);

        try {
            await updatePrivacySettings({
                isProfilePublic,
                showGPA,
            });

            setMessage({ type: "success", text: "Privacy settings updated!" });
            router.refresh();
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update privacy settings" });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Message */}
            {message && (
                <div
                    className={`rounded-lg p-4 ${message.type === "success"
                            ? "bg-green-50 text-green-800"
                            : "bg-red-50 text-red-800"
                        }`}
                >
                    {message.text}
                </div>
            )}

            {/* Profile Information */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Profile Information</h3>
                </div>

                <div className="space-y-4">
                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            About Me
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={4}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    {/* Interests */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Interests
                        </label>
                        <textarea
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                            rows={2}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Machine Learning, Web Development, Photography"
                        />
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Skills (comma-separated)
                        </label>
                        <input
                            type="text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Python, React, Node.js"
                        />
                    </div>

                    {/* Social Links */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Social Links
                        </label>
                        <div className="space-y-2">
                            <input
                                type="url"
                                value={socialLinks.linkedin || ""}
                                onChange={(e) =>
                                    setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                                }
                                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="LinkedIn URL"
                            />
                            <input
                                type="url"
                                value={socialLinks.github || ""}
                                onChange={(e) =>
                                    setSocialLinks({ ...socialLinks, github: e.target.value })
                                }
                                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="GitHub URL"
                            />
                            <input
                                type="url"
                                value={socialLinks.portfolio || ""}
                                onChange={(e) =>
                                    setSocialLinks({ ...socialLinks, portfolio: e.target.value })
                                }
                                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Portfolio URL"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        <Save className="h-4 w-4" />
                        {isSaving ? "Saving..." : "Save Profile"}
                    </button>
                </div>
            </div>

            {/* Privacy Settings */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Privacy Settings</h3>
                </div>

                <div className="space-y-4">
                    {/* Public Profile Toggle */}
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                        <div>
                            <p className="font-medium text-gray-900">Public Profile</p>
                            <p className="text-sm text-gray-600">
                                Allow others to view your e-Profile
                            </p>
                        </div>
                        <button
                            onClick={() => setIsProfilePublic(!isProfilePublic)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${isProfilePublic ? "bg-blue-600" : "bg-gray-300"
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${isProfilePublic ? "translate-x-6" : "translate-x-1"
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Show GPA Toggle */}
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                        <div>
                            <p className="font-medium text-gray-900">Show GPA</p>
                            <p className="text-sm text-gray-600">
                                Display your GPAX on your public profile
                            </p>
                        </div>
                        <button
                            onClick={() => setShowGPA(!showGPA)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${showGPA ? "bg-blue-600" : "bg-gray-300"
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${showGPA ? "translate-x-6" : "translate-x-1"
                                    }`}
                            />
                        </button>
                    </div>

                    <button
                        onClick={handleSavePrivacy}
                        disabled={isSaving}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        <Save className="h-4 w-4" />
                        {isSaving ? "Saving..." : "Save Privacy Settings"}
                    </button>
                </div>
            </div>

            {/* Preview Link */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-900">
                    <Eye className="inline h-4 w-4 mr-1" />
                    View your public profile:{" "}
                    <a
                        href={`/profile/student/${student.studentId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline hover:text-blue-700"
                    >
                        /profile/student/{student.studentId}
                    </a>
                </p>
            </div>
        </div>
    );
}
