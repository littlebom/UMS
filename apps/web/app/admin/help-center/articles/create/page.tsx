"use client";

import { createHelpArticle } from "@/actions/help";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectOption } from "@/components/ui/select";

export default function CreateArticlePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedVisibility, setSelectedVisibility] = useState("PUBLIC");

    useEffect(() => {
        // Fetch categories
        fetch("/api/help/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error("Failed to load categories:", err));
    }, []);

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        setError(null);
        try {
            await createHelpArticle(formData);
            router.push("/admin/help-center");
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to create article");
            setIsSubmitting(false);
        }
    }

    const categoryOptions: SelectOption[] = categories.map((cat) => ({
        value: cat.id,
        label: cat.name,
        status: "info",
    }));

    const visibilityOptions: SelectOption[] = [
        { value: "PUBLIC", label: "Public (Everyone)", status: "success" },
        { value: "STUDENT", label: "Students Only", status: "neutral" },
        { value: "INSTRUCTOR", label: "Instructors Only", status: "neutral" },
        { value: "STAFF", label: "Staff Only", status: "neutral" },
        { value: "ADMIN", label: "Admin Only", status: "warning" },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Help Article</h1>

            <div className="bg-white shadow rounded-lg p-6">
                {error && (
                    <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form action={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="e.g., How to Register for Courses"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            name="content"
                            rows={12}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border font-mono text-xs"
                            placeholder="Write your article content here..."
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            You can use plain text or Markdown formatting.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <Select
                                label="Category"
                                value={selectedCategory}
                                onChange={(val) => setSelectedCategory(val)}
                                options={categoryOptions}
                                required
                            />
                            <input type="hidden" name="categoryId" value={selectedCategory} />
                        </div>

                        <div>
                            <Select
                                label="Visibility"
                                value={selectedVisibility}
                                onChange={(val) => setSelectedVisibility(val)}
                                options={visibilityOptions}
                            />
                            <input type="hidden" name="visibility" value={selectedVisibility} />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isPublished"
                            value="true"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                            Publish immediately
                        </label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {isSubmitting ? "Creating..." : "Create Article"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
