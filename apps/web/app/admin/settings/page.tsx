"use client";

import { getSystemSettings, updateSystemSettings } from "@/actions/settings";
import { Settings as SettingsIcon, Palette, Globe, Layout, Server, Monitor, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Select, SelectOption } from "@/components/ui/select";
import Link from "next/link";

export default function SettingsPage() {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [activeTab, setActiveTab] = useState("general");
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string>("");
    const [uploading, setUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        async function loadSettings() {
            const data = await getSystemSettings();
            setSettings(data);
            setSelectedLanguage(data.defaultLanguage);
            setLoading(false);
        }
        loadSettings();
    }, []);

    if (loading) {
        return <div className="p-6 text-center">Loading settings...</div>;
    }

    const languageOptions: SelectOption[] = [
        { value: "en", label: "English", status: "info" },
        { value: "th", label: "ไทย (Thai)", status: "info" },
    ];

    const siteStructure = {
        frontend: [
            { name: "Home", url: "/", type: "public" },
            { name: "Help Center", url: "/help", type: "public" },
            {
                name: "Admissions",
                url: "/admissions",
                children: [
                    { name: "Landing Page", url: "/admissions" },
                    { name: "Programs List", url: "/admissions/programs" },
                    { name: "Register", url: "/admissions/register" },
                    { name: "Login", url: "/admissions/login" },
                    { name: "Apply Form", url: "/admissions/apply" },
                    { name: "Applicant Dashboard", url: "/admissions/dashboard" },
                ]
            },
            {
                name: "Student Portal",
                url: "/student",
                children: [
                    { name: "Login", url: "/student/login" },
                    { name: "Dashboard", url: "/student/dashboard" },
                    { name: "Class Schedule", url: "/student/schedule" },
                    { name: "Grades & Transcript", url: "/student/transcript" },
                    { name: "Profile", url: "/student/profile" },
                ]
            },
            {
                name: "Instructor Portal",
                url: "/instructor",
                children: [
                    { name: "Dashboard", url: "/instructor/dashboard" },
                    { name: "Teaching Schedule", url: "/instructor/schedule" },
                ]
            },
            {
                name: "Admin Portal",
                url: "/admin",
                children: [
                    { name: "Login", url: "/admin/login" },
                    { name: "Dashboard", url: "/admin" },
                    {
                        name: "Academic Management",
                        url: "/admin/academic",
                        children: [
                            { name: "Terms List", url: "/admin/academic/terms" },
                            { name: "Create Term", url: "/admin/academic/terms/create" },
                            { name: "Sections List", url: "/admin/academic/sections" },
                            { name: "Create Section", url: "/admin/academic/sections/create" },
                        ]
                    },
                    {
                        name: "Admissions Management",
                        url: "/admin/admissions",
                        children: [
                            { name: "Applications List", url: "/admin/admissions" },
                            { name: "Application Detail", url: "/admin/admissions/[id]" },
                            { name: "Interviews", url: "/admin/admissions/interviews" },
                        ]
                    },
                    {
                        name: "Program Management",
                        url: "/admin/academic/program",
                        children: [
                            { name: "Faculties List", url: "/admin/academic/program/faculties" },
                            { name: "Create Faculty", url: "/admin/academic/program/faculties/create" },
                            { name: "Edit Faculty", url: "/admin/academic/program/faculties/[id]/edit" },
                            { name: "Departments List", url: "/admin/academic/program/departments" },
                            { name: "Create Department", url: "/admin/academic/program/departments/create" },
                            { name: "Edit Department", url: "/admin/academic/program/departments/[id]/edit" },
                            { name: "Programs List", url: "/admin/academic/program/programs" },
                            { name: "Create Program", url: "/admin/academic/program/programs/create" },
                            { name: "Edit Program", url: "/admin/academic/program/programs/[id]/edit" },
                            { name: "Courses List", url: "/admin/academic/program/courses" },
                            { name: "Create Course", url: "/admin/academic/program/courses/create" },
                            { name: "Edit Course", url: "/admin/academic/program/courses/[id]/edit" },
                        ]
                    },
                    {
                        name: "Personnel Management",
                        url: "/admin/personnel",
                        children: [
                            { name: "All Personnel List", url: "/admin/personnel" },
                            { name: "Create Personnel", url: "/admin/personnel/create" },
                            { name: "Instructors List", url: "/admin/personnel/instructors" },
                            { name: "Staff List", url: "/admin/personnel/staff" },
                        ]
                    },
                    {
                        name: "Student Management",
                        url: "/admin/students",
                        children: [
                            { name: "Students List", url: "/admin/students" },
                            { name: "Create Student", url: "/admin/students/create" },
                            { name: "Student Detail", url: "/admin/students/[id]" },
                        ]
                    },
                    {
                        name: "Finance",
                        url: "/admin/finance",
                        children: [
                            { name: "Invoices List", url: "/admin/finance/invoices" },
                            { name: "Generate Invoice", url: "/admin/finance/invoices/generate" },
                            { name: "Payments List", url: "/admin/finance/payments" },
                        ]
                    },
                    {
                        name: "CMS & Banners",
                        url: "/admin/cms/banners",
                        children: [
                            { name: "Banners List", url: "/admin/cms/banners" },
                            { name: "Create Banner", url: "/admin/cms/banners/create" },
                        ]
                    },
                    {
                        name: "Announcements",
                        url: "/admin/announcements",
                        children: [
                            { name: "Announcements List", url: "/admin/announcements" },
                            { name: "Create Announcement", url: "/admin/announcements/create" },
                        ]
                    },
                    {
                        name: "Help Center",
                        url: "/admin/help-center",
                        children: [
                            { name: "Articles List", url: "/admin/help-center" },
                            { name: "Create Article", url: "/admin/help-center/articles/create" },
                            { name: "Create Category", url: "/admin/help-center/categories/create" },
                        ]
                    },
                    {
                        name: "AI Agent",
                        url: "/admin/ai-agent",
                        children: [
                            { name: "Dashboard", url: "/admin/ai-agent" },
                            { name: "Add Knowledge", url: "/admin/ai-agent/knowledge/create" },
                        ]
                    },
                    { name: "Analytics", url: "/admin/analytics" },
                    {
                        name: "Settings",
                        url: "/admin/settings",
                        children: [
                            { name: "General Settings", url: "/admin/settings" },
                            { name: "Security Settings", url: "/admin/settings/security" },
                        ]
                    },
                    {
                        name: "File Management",
                        url: "/admin/files",
                    },
                ]
            }
        ],
        backend: [
            { name: "Authentication", url: "/api/auth/[...nextauth]", method: "GET/POST" },
            { name: "File Upload", url: "/api/upload", method: "POST" },
            { name: "Help Categories", url: "/api/help/categories", method: "GET" },
            { name: "System Init", url: "/api/init", method: "GET" },
            { name: "Seed Admin", url: "/api/seed-admin", method: "GET" },
            { name: "Seed Instructor", url: "/api/seed-instructor", method: "GET" },
            { name: "Seed Student", url: "/api/seed-student", method: "GET" },
        ]
    };

    async function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSaving(true);
        setSaveStatus(null);

        try {
            const formData = new FormData(e.currentTarget);
            await updateSystemSettings(formData);
            setSaveStatus({ type: 'success', message: 'Settings saved successfully!' });

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSaveStatus(null);
            }, 3000);
        } catch (error) {
            console.error("Save error:", error);
            setSaveStatus({ type: 'error', message: 'Failed to save settings. Please try again.' });
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="space-y-6 relative">
            {/* Status Modal */}
            {saveStatus && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center gap-3">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${saveStatus.type === 'success' ? 'bg-green-100' : 'bg-red-100'
                                }`}>
                                {saveStatus.type === 'success' ? (
                                    <svg className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {saveStatus.type === 'success' ? 'Success' : 'Error'}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {saveStatus.type === 'success' ? 'Settings have been updated' : 'Something went wrong'}
                                </p>
                            </div>
                        </div>

                        <p className="mb-6 text-gray-700">
                            {saveStatus.message}
                        </p>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setSaveStatus(null)}
                                className={`px-5 py-2.5 rounded-md text-white font-medium ${saveStatus.type === 'success'
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-red-600 hover:bg-red-700'
                                    }`}
                                type="button"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab("general")}
                        className={`${activeTab === "general"
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            } group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium`}
                    >
                        <SettingsIcon
                            className={`${activeTab === "general" ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
                                } -ml-0.5 mr-2 h-5 w-5`}
                        />
                        General
                    </button>
                    <button
                        onClick={() => setActiveTab("structure")}
                        className={`${activeTab === "structure"
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            } group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium`}
                    >
                        <Layout
                            className={`${activeTab === "structure" ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
                                } -ml-0.5 mr-2 h-5 w-5`}
                        />
                        Site Structure
                    </button>
                    <button
                        onClick={() => setActiveTab("mail")}
                        className={`${activeTab === "mail"
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            } group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium`}
                    >
                        <Mail
                            className={`${activeTab === "mail" ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
                                } -ml-0.5 mr-2 h-5 w-5`}
                        />
                        Mail Server
                    </button>
                </nav>
            </div>

            {activeTab === "general" ? (
                <form onSubmit={handleSave} className="space-y-6">
                    {/* General Settings */}
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                            <div className="flex items-center">
                                <SettingsIcon className="mr-2 h-5 w-5 text-gray-400" />
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    General Settings
                                </h3>
                            </div>
                        </div>
                        <div className="px-4 py-5 sm:p-6 space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        University Name (English)
                                    </label>
                                    <input
                                        type="text"
                                        name="universityName"
                                        defaultValue={settings.universityName}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        University Name (Thai)
                                    </label>
                                    <input
                                        type="text"
                                        name="universityNameTh"
                                        defaultValue={settings.universityNameTh}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                    />
                                </div>
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    University Logo
                                </label>

                                {/* Current Logo Preview */}
                                {(logoPreview || settings.logoUrl) && (
                                    <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                        <p className="text-xs text-gray-500 mb-2">Current Logo:</p>
                                        <img
                                            src={logoPreview || settings.logoUrl}
                                            alt="University Logo"
                                            className="h-20 w-auto object-contain"
                                        />
                                    </div>
                                )}

                                {/* File Upload */}
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Upload New Logo
                                        </label>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setLogoFile(file);
                                                        // Create preview
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setLogoPreview(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);

                                                        // Auto-upload
                                                        setUploading(true);
                                                        try {
                                                            const formData = new FormData();
                                                            formData.append("file", file);

                                                            const response = await fetch("/api/upload/logo", {
                                                                method: "POST",
                                                                body: formData,
                                                            });

                                                            if (response.ok) {
                                                                const data = await response.json();
                                                                // Update the hidden input with the new URL
                                                                const logoInput = document.getElementById('hidden-logo-url') as HTMLInputElement;
                                                                if (logoInput) {
                                                                    logoInput.value = data.url;
                                                                }
                                                                // Also update the visible URL input if it exists
                                                                const visibleLogoInput = document.querySelector('input[name="logoUrl_visible"]') as HTMLInputElement;
                                                                if (visibleLogoInput) {
                                                                    visibleLogoInput.value = data.url;
                                                                }

                                                                setLogoPreview(data.url);
                                                                alert("Logo uploaded successfully! Click 'Save Settings' to apply changes.");
                                                            } else {
                                                                const error = await response.json();
                                                                alert(`Upload failed: ${error.error}`);
                                                            }
                                                        } catch (error) {
                                                            console.error("Upload error:", error);
                                                            alert("Failed to upload logo");
                                                        } finally {
                                                            setUploading(false);
                                                        }
                                                    }
                                                }}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                disabled={uploading}
                                            />
                                            {uploading && (
                                                <span className="text-sm text-gray-500">Uploading...</span>
                                            )}
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Accepted formats: JPEG, PNG, WebP, SVG (Max 5MB)
                                        </p>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300" />
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="bg-white px-2 text-gray-500">OR</span>
                                        </div>
                                    </div>

                                    {/* URL Input (hidden but still functional) */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Or Enter Logo URL
                                        </label>
                                        <input
                                            type="text"
                                            name="logoUrl_visible"
                                            defaultValue={settings.logoUrl || ""}
                                            placeholder="/uploads/logos/logo.png or https://example.com/logo.png"
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    setLogoPreview(e.target.value);
                                                    // Update hidden input
                                                    const hiddenInput = document.getElementById('hidden-logo-url') as HTMLInputElement;
                                                    if (hiddenInput) hiddenInput.value = e.target.value;
                                                }
                                            }}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                        />
                                        {/* Hidden input to ensure the uploaded URL is submitted if the user used the file uploader */}
                                        <input
                                            type="hidden"
                                            name="logoUrl"
                                            value={logoPreview || settings.logoUrl || ""}
                                            id="hidden-logo-url"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Student ID Format
                                </label>
                                <input
                                    type="text"
                                    name="studentIdFormat"
                                    defaultValue={settings.studentIdFormat}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border font-mono"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Use placeholders: {"{YEAR}"} {"{FACULTY}"} {"{NUMBER}"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Theme & Colors */}
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                            <div className="flex items-center">
                                <Palette className="mr-2 h-5 w-5 text-gray-400" />
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Theme & Colors
                                </h3>
                            </div>
                        </div>
                        <div className="px-4 py-5 sm:p-6 space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Primary Color
                                    </label>
                                    <div className="mt-1 flex items-center space-x-2">
                                        <input
                                            type="color"
                                            name="primaryColor"
                                            defaultValue={settings.primaryColor}
                                            className="h-10 w-20 rounded border border-gray-300"
                                        />
                                        <input
                                            type="text"
                                            defaultValue={settings.primaryColor}
                                            readOnly
                                            className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border font-mono"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Secondary Color
                                    </label>
                                    <div className="mt-1 flex items-center space-x-2">
                                        <input
                                            type="color"
                                            name="secondaryColor"
                                            defaultValue={settings.secondaryColor}
                                            className="h-10 w-20 rounded border border-gray-300"
                                        />
                                        <input
                                            type="text"
                                            defaultValue={settings.secondaryColor}
                                            readOnly
                                            className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border font-mono"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Background Color
                                    </label>
                                    <div className="mt-1 flex items-center space-x-2">
                                        <input
                                            type="color"
                                            name="backgroundColor"
                                            defaultValue={settings.backgroundColor}
                                            className="h-10 w-20 rounded border border-gray-300"
                                        />
                                        <input
                                            type="text"
                                            defaultValue={settings.backgroundColor}
                                            readOnly
                                            className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Localization */}
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                            <div className="flex items-center">
                                <Globe className="mr-2 h-5 w-5 text-gray-400" />
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Localization
                                </h3>
                            </div>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <div>
                                <Select
                                    label="Default Language"
                                    value={selectedLanguage}
                                    onChange={(val) => setSelectedLanguage(val)}
                                    options={languageOptions}
                                />
                                <input type="hidden" name="defaultLanguage" value={selectedLanguage} />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`inline-flex justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {isSaving ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </form>
            ) : activeTab === "mail" ? (
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                            <div className="flex items-center">
                                <Mail className="mr-2 h-5 w-5 text-gray-400" />
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Mail Server Settings (SMTP)
                                </h3>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                                Configure your SMTP server for sending emails (e.g., Gmail, Outlook, AWS SES).
                            </p>
                        </div>
                        <div className="px-4 py-5 sm:p-6 space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        SMTP Host
                                    </label>
                                    <input
                                        type="text"
                                        name="smtpHost"
                                        defaultValue={settings.smtpHost || ""}
                                        placeholder="smtp.gmail.com"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        SMTP Port
                                    </label>
                                    <input
                                        type="number"
                                        name="smtpPort"
                                        defaultValue={settings.smtpPort || 587}
                                        placeholder="587"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                    />
                                </div>

                                <div className="flex items-center h-full pt-6">
                                    <div className="flex items-center">
                                        <input
                                            id="smtpSecure"
                                            name="smtpSecure"
                                            type="checkbox"
                                            defaultChecked={settings.smtpSecure}
                                            value="true"
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="smtpSecure" className="ml-2 block text-sm text-gray-900">
                                            Use Secure Connection (SSL/TLS)
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        SMTP Username
                                    </label>
                                    <input
                                        type="text"
                                        name="smtpUser"
                                        defaultValue={settings.smtpUser || ""}
                                        placeholder="email@example.com"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        SMTP Password
                                    </label>
                                    <input
                                        type="password"
                                        name="smtpPassword"
                                        defaultValue={settings.smtpPassword || ""}
                                        placeholder="App Password or SMTP Password"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Sender Name
                                    </label>
                                    <input
                                        type="text"
                                        name="smtpFromName"
                                        defaultValue={settings.smtpFromName || "UMS Admissions"}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Sender Email
                                    </label>
                                    <input
                                        type="email"
                                        name="smtpFromEmail"
                                        defaultValue={settings.smtpFromEmail || "noreply@ums.ac.th"}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`inline-flex justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {isSaving ? 'Saving...' : 'Save Mail Settings'}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-6">
                    {/* Frontend Structure */}
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                            <div className="flex items-center">
                                <Monitor className="mr-2 h-5 w-5 text-gray-400" />
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Frontend Structure
                                </h3>
                            </div>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <ul className="space-y-4">
                                {siteStructure.frontend.map((item, index) => (
                                    <StructureItem key={index} item={item} />
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Backend Structure */}
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                            <div className="flex items-center">
                                <Server className="mr-2 h-5 w-5 text-gray-400" />
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Backend API Structure
                                </h3>
                            </div>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Endpoint Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                URL Path
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Method
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {siteStructure.backend.map((api, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {api.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                                    {api.url}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                        {api.method}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StructureItem({ item }: { item: any }) {
    const isDynamic = item.url.includes("[") || item.url.includes("]");

    return (
        <li className="text-sm">
            <div className="flex items-center gap-2 font-medium text-gray-900">
                <span className={`h-2 w-2 rounded-full ${item.children ? 'bg-blue-500' : 'bg-green-500'}`}></span>
                {item.name}
                {isDynamic ? (
                    <span className="text-gray-400 font-mono text-xs ml-2 cursor-default" title="Dynamic Route">
                        {item.url}
                    </span>
                ) : (
                    <Link href={item.url} target="_blank" className="text-blue-600 hover:underline font-mono text-xs ml-2">
                        {item.url}
                    </Link>
                )}
            </div>
            {item.children && (
                <ul className="ml-6 mt-2 space-y-2 border-l-2 border-gray-100 pl-4">
                    {item.children.map((child: any, index: number) => (
                        <StructureItem key={index} item={child} />
                    ))}
                </ul>
            )}
        </li>
    );
}

