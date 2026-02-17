import { getPublicHelpArticles, getHelpCategories, searchHelpArticles } from "@/actions/help";
import Link from "next/link";
import { Search, BookOpen, FolderOpen } from "lucide-react";

export default async function PublicHelpCenterPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const query = searchParams.q;
    const categories = await getHelpCategories();
    const articles = query
        ? await searchHelpArticles(query)
        : await getPublicHelpArticles();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-blue-600 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <BookOpen className="mx-auto h-12 w-12 text-white" />
                        <h1 className="mt-4 text-4xl font-bold text-white">Help Center</h1>
                        <p className="mt-2 text-xl text-blue-100">
                            Find answers and learn how to use the system
                        </p>

                        {/* Search Bar */}
                        <div className="mx-auto mt-8 max-w-2xl">
                            <form action="/help" method="GET">
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="q"
                                        defaultValue={query}
                                        placeholder="Search for help articles..."
                                        className="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {query && (
                    <div className="mb-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Search results for "{query}"
                        </h2>
                        <p className="text-sm text-gray-500">{articles.length} articles found</p>
                    </div>
                )}

                {!query && categories.length > 0 && (
                    <div className="mb-8">
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">Browse by Category</h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center">
                                        <FolderOpen className="h-6 w-6 text-blue-600 mr-3" />
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {category._count.articles} articles
                                            </p>
                                        </div>
                                    </div>
                                    {category.description && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            {category.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                        {query ? "Results" : "All Articles"}
                    </h2>
                    <div className="space-y-4">
                        {articles.length === 0 ? (
                            <div className="rounded-lg bg-white p-8 text-center shadow">
                                <p className="text-gray-500">
                                    {query
                                        ? "No articles found matching your search."
                                        : "No help articles available yet."}
                                </p>
                            </div>
                        ) : (
                            articles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/help/${article.id}`}
                                    className="block rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {article.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {article.category.name} • {article.views} views
                                            </p>
                                            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                                {article.content.substring(0, 200)}...
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 bg-white py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Can't find what you're looking for?{" "}
                            <Link href="/" className="text-blue-600 hover:text-blue-500">
                                Contact Support
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
