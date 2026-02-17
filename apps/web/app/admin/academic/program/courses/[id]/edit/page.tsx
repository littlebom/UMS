"use client";

import { getCourseById, updateCourse } from "@/actions/course";
import { Button, Input } from "@ums/ui";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FileUp } from "lucide-react";

export default function EditCoursePage() {
    const params = useParams();
    const id = params.id as string;
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCourse() {
            const data = await getCourseById(id);
            if (!data) {
                notFound();
            }
            setCourse(data);
            setLoading(false);
        }
        loadCourse();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto py-10 max-w-3xl">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    if (!course) {
        notFound();
    }

    const updateCourseWithId = updateCourse.bind(null, id);

    return (
        <div className="container mx-auto py-10 max-w-3xl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Edit Course</h1>
                <Link
                    href="/admin/academic/program/courses"
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </Link>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
                <form action={updateCourseWithId} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold border-b pb-2">Basic Information</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                Course Code <span className="text-red-500">*</span>
                            </label>
                            <Input
                                name="code"
                                defaultValue={course.code}
                                placeholder="e.g. CS101"
                                required
                            />
                            <p className="text-xs text-gray-500">Unique code for the course</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Thai Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    name="nameTh"
                                    defaultValue={course.nameTh}
                                    placeholder="ชื่อวิชาภาษาไทย"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    English Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    name="nameEn"
                                    defaultValue={course.nameEn}
                                    placeholder="Course Name in English"
                                    required
                                />
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
                                defaultValue={course.credits}
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
                                defaultValue={course.description || ""}
                                placeholder="Brief course description"
                                rows={3}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
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
                                defaultValue={course.learningOutcomes || ""}
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
                                    defaultValue={course.syllabusUrl || ""}
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
                            {course.syllabusUrl && (
                                <div className="mt-2">
                                    <a
                                        href={course.syllabusUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                        <FileUp className="h-3 w-3" />
                                        View current syllabus
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <Link href="/admin/program/courses">
                            <Button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-5 py-2.5" type="button">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
