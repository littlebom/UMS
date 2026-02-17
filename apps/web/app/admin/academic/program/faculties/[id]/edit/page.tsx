"use client";

import { getFacultyById, updateFaculty } from "@/actions/faculty";
import { Button, Input } from "@ums/ui";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ImageUpload } from "@/components/image-upload";
import { useState, useEffect } from "react";

export default function EditFacultyPage() {
    const params = useParams();
    const id = params.id as string;
    const [faculty, setFaculty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [logoUrl, setLogoUrl] = useState<string | null>(null);

    useEffect(() => {
        async function loadFaculty() {
            const data = await getFacultyById(id);
            if (!data) {
                notFound();
            }
            setFaculty(data);
            setLogoUrl(data.logoUrl);
            setLoading(false);
        }
        loadFaculty();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto py-10 max-w-2xl">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    if (!faculty) {
        notFound();
    }

    const updateFacultyWithId = updateFaculty.bind(null, id);

    return (
        <div className="container mx-auto py-10 max-w-2xl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Edit Faculty</h1>
                <Link
                    href="/admin/academic/program/faculties"
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </Link>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
                <form action={updateFacultyWithId} className="space-y-6">
                    <ImageUpload
                        label="Faculty Logo"
                        currentImageUrl={faculty.logoUrl}
                        onImageChange={setLogoUrl}
                        folder="faculties"
                    />
                    {logoUrl && <input type="hidden" name="logoUrl" value={logoUrl} />}

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Faculty Code <span className="text-red-500">*</span>
                            </label>
                            <Input
                                name="code"
                                defaultValue={faculty.code}
                                placeholder="e.g. 01"
                                required
                            />
                            <p className="text-xs text-gray-500">Unique code for the faculty</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Thai Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            name="nameTh"
                            defaultValue={faculty.nameTh}
                            placeholder="ชื่อคณะภาษาไทย"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            English Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            name="nameEn"
                            defaultValue={faculty.nameEn}
                            placeholder="Faculty Name in English"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Description
                        </label>
                        <Input
                            name="description"
                            defaultValue={faculty.description || ""}
                            placeholder="Optional description"
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Link href="/admin/program/faculties">
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
