"use client";

import { createCourse } from "@/actions/course";
import { Button, Input } from "@ums/ui";
import Link from "next/link";
import { FileUp, Info } from "lucide-react";
import { useState } from "react";

export default function CreateCoursePage() {
    const [selectedStudentTypes, setSelectedStudentTypes] = useState<string[]>([]);
    const [prerequisiteCourses, setPrerequisiteCourses] = useState<string[]>([""]);

    const studentTypes = [
        { value: "REGULAR", label: "Regular (นักศึกษาปกติ)" },
        { value: "EXCHANGE", label: "Exchange (นักศึกษาแลกเปลี่ยน)" },
        { value: "SCHOLARSHIP", label: "Scholarship (นักศึกษาทุน)" },
        { value: "SPECIAL", label: "Special (นักศึกษาพิเศษ)" },
        { value: "TRANSFER", label: "Transfer (นักศึกษาโอนย้าย)" },
        { value: "INTERNATIONAL", label: "International (นักศึกษานานาชาติ)" },
    ];

    const toggleStudentType = (type: string) => {
        setSelectedStudentTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const addPrerequisite = () => {
        setPrerequisiteCourses([...prerequisiteCourses, ""]);
    };

    const removePrerequisite = (index: number) => {
        setPrerequisiteCourses(prerequisiteCourses.filter((_, i) => i !== index));
    };

    const updatePrerequisite = (index: number, value: string) => {
        const updated = [...prerequisiteCourses];
        updated[index] = value;
        setPrerequisiteCourses(updated);
    };

    return (
        <div className="container mx-auto py-10 max-w-4xl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Add New Course</h1>
                <Link
                    href="/admin/academic/program/courses"
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </Link>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
                <form action={createCourse} className="space-y-8">
                    {/* Hidden fields for arrays */}
                    <input type="hidden" name="allowedStudentTypes" value={JSON.stringify(selectedStudentTypes)} />
                    <input type="hidden" name="prerequisiteCourses" value={JSON.stringify(prerequisiteCourses.filter(c => c.trim()))} />

                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold border-b pb-2">Basic Information</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                Course Code <span className="text-red-500">*</span>
                            </label>
                            <Input name="code" placeholder="e.g. CS101" required />
                            <p className="text-xs text-gray-500">Unique code for the course</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Thai Name <span className="text-red-500">*</span>
                                </label>
                                <Input name="nameTh" placeholder="ชื่อวิชาภาษาไทย" required />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    English Name <span className="text-red-500">*</span>
                                </label>
                                <Input name="nameEn" placeholder="Course Name in English" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                Credits <span className="text-red-500">*</span>
                            </label>
                            <Input
                                name="credits"
                                type="number"
                                min="1"
                                max="6"
                                placeholder="e.g. 3"
                                required
                            />
                            <p className="text-xs text-gray-500">Number of credits (1-6)</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Brief course description"
                                rows={3}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Enrollment Requirements */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b pb-2">
                            <h2 className="text-lg font-semibold">Enrollment Requirements</h2>
                            <div className="group relative">
                                <Info className="h-4 w-4 text-gray-400 cursor-help" />
                                <div className="invisible group-hover:visible absolute left-0 top-6 z-10 w-64 rounded-md bg-gray-900 p-2 text-xs text-white shadow-lg">
                                    กำหนดเงื่อนไขสำหรับนักศึกษาที่สามารถลงทะเบียนวิชานี้ได้
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Minimum Year Level
                                </label>
                                <Input
                                    name="minYearLevel"
                                    type="number"
                                    min="1"
                                    max="4"
                                    placeholder="e.g. 2 (ชั้นปีที่ 2 ขึ้นไป)"
                                />
                                <p className="text-xs text-gray-500">Leave empty for no restriction</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Minimum GPAX
                                </label>
                                <Input
                                    name="minGpax"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="4"
                                    placeholder="e.g. 2.50"
                                />
                                <p className="text-xs text-gray-500">Minimum GPA required</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                Allowed Student Types
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 border rounded-md bg-gray-50">
                                {studentTypes.map((type) => (
                                    <label key={type.value} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedStudentTypes.includes(type.value)}
                                            onChange={() => toggleStudentType(type.value)}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm">{type.label}</span>
                                    </label>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500">Leave empty to allow all student types</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                Prerequisite Courses
                            </label>
                            <div className="space-y-2">
                                {prerequisiteCourses.map((course, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={course}
                                            onChange={(e) => updatePrerequisite(index, e.target.value)}
                                            placeholder="e.g. CS101"
                                            className="flex-1"
                                        />
                                        {prerequisiteCourses.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => removePrerequisite(index)}
                                                className="px-3"
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addPrerequisite}
                                    className="w-full"
                                >
                                    + Add Prerequisite
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500">Courses that must be completed before enrolling</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Maximum Enrollment
                                </label>
                                <Input
                                    name="maxEnrollment"
                                    type="number"
                                    min="1"
                                    placeholder="e.g. 50"
                                />
                                <p className="text-xs text-gray-500">Leave empty for unlimited</p>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="requiresApproval"
                                        value="true"
                                        className="rounded border-gray-300"
                                    />
                                    <span className="text-sm font-medium">Requires Instructor Approval</span>
                                </label>
                                <p className="text-xs text-gray-500">Students must get approval before enrolling</p>
                            </div>
                        </div>
                    </div>

                    {/* Learning Outcomes */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold border-b pb-2">Learning Outcomes</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                Learning Outcomes / Objectives
                            </label>
                            <textarea
                                name="learningOutcomes"
                                placeholder="Enter learning outcomes (one per line)&#10;Example:&#10;- Understand fundamental concepts of...&#10;- Apply knowledge to solve...&#10;- Analyze and evaluate..."
                                rows={8}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                            />
                            <p className="text-xs text-gray-500">
                                Describe what students will learn and be able to do after completing this course
                            </p>
                        </div>
                    </div>

                    {/* Course Materials */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold border-b pb-2">Course Materials</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                Syllabus PDF URL
                            </label>
                            <div className="flex gap-2">
                                <Input
                                    name="syllabusUrl"
                                    type="url"
                                    placeholder="https://example.com/syllabus.pdf or /uploads/syllabus.pdf"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex items-center gap-2"
                                    onClick={() => alert("File upload feature coming soon!")}
                                >
                                    <FileUp className="h-4 w-4" />
                                    Upload
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500">
                                Enter URL to course syllabus PDF or upload a file
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <Link href="/admin/program/courses">
                            <Button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-5 py-2.5" type="button">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit">Create Course</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
