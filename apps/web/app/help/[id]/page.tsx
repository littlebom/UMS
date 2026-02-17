import { getHelpArticleById } from "@/actions/help";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";

export default async function HelpArticlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const article = await getHelpArticleById(id);

    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <Link
                    href="/help"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 mb-6"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Help Center
                </Link>

                <div className="rounded-lg bg-white shadow-lg">
                    <div className="border-b border-gray-200 px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                    {article.category.name}
                                </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                <Eye className="mr-1 h-4 w-4" />
                                {article.views} views
                            </div>
                        </div>
                        <h1 className="mt-4 text-3xl font-bold text-gray-900">
                            {article.title}
                        </h1>
                    </div>

                    <div className="px-6 py-8">
                        <div className="prose prose-blue max-w-none">
                            <div className="whitespace-pre-wrap text-gray-700">
                                {article.content}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <p className="text-sm text-gray-500">
                            Last updated: {new Date(article.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        Was this article helpful?{" "}
                        <Link href="/help" className="text-blue-600 hover:text-blue-500">
                            Browse more articles
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
