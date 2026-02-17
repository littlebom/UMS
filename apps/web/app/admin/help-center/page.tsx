import { getHelpCategories, getHelpArticles } from "@/actions/help";
import Link from "next/link";
import { Plus, FolderOpen, FileText } from "lucide-react";

export default async function AdminHelpCenterPage() {
    const categories = await getHelpCategories();
    const articles = await getHelpArticles();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Help Center Management</h1>
            </div>

            {/* Categories Section */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="border-b border-gray-200 px-4 py-5 sm:px-6 flex items-center justify-between">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Categories ({categories.length})
                    </h3>
                    <Link
                        href="/admin/help-center/categories/create"
                        className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Category
                    </Link>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.length === 0 ? (
                            <p className="col-span-full text-center text-gray-500">
                                No categories yet. Create one to organize your help articles.
                            </p>
                        ) : (
                            categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center">
                                            <FolderOpen className="h-5 w-5 text-blue-600 mr-2" />
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">
                                                    {category.name}
                                                </h4>
                                                <p className="text-xs text-gray-500">
                                                    {category._count.articles} articles
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {category.description && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            {category.description}
                                        </p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Articles Section */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="border-b border-gray-200 px-4 py-5 sm:px-6 flex items-center justify-between">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Articles ({articles.length})
                    </h3>
                    <Link
                        href="/admin/help-center/articles/create"
                        className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Article
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Visibility
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Views
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {articles.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                        No articles found.
                                    </td>
                                </tr>
                            ) : (
                                articles.map((article) => (
                                    <tr key={article.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <FileText className="h-4 w-4 text-gray-400 mr-2" />
                                                <div className="text-sm font-medium text-gray-900">
                                                    {article.title}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {article.category.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {article.visibility}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${article.isPublished
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {article.isPublished ? "Published" : "Draft"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {article.views}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
