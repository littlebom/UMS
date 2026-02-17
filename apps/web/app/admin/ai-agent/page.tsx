import { getAiSettings, getKnowledgeBaseItems, updateAiSettings } from "@/actions/ai";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AiAgentPage() {
    const settings = await getAiSettings();
    const knowledgeItems = await getKnowledgeBaseItems();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">AI Agent Configuration</h1>

            {/* Settings Section */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Bot Settings
                    </h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <form action={updateAiSettings} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Bot Name
                            </label>
                            <input
                                type="text"
                                name="botName"
                                defaultValue={settings.botName}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Welcome Message
                            </label>
                            <textarea
                                name="welcomeMessage"
                                rows={3}
                                defaultValue={settings.welcomeMessage}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Personality / System Prompt
                            </label>
                            <textarea
                                name="personality"
                                rows={3}
                                defaultValue={settings.personality}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                placeholder="e.g., You are a friendly and helpful university assistant..."
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isActive"
                                value="true"
                                defaultChecked={settings.isActive}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                                Enable AI Chatbot on Public Website
                            </label>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save Settings
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Knowledge Base Section */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="border-b border-gray-200 px-4 py-5 sm:px-6 flex items-center justify-between">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Knowledge Base ({knowledgeItems.length} items)
                    </h3>
                    <Link
                        href="/admin/ai-agent/knowledge/create"
                        className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Knowledge
                    </Link>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-4">
                        {knowledgeItems.length === 0 ? (
                            <p className="text-center text-gray-500">
                                No knowledge base items yet. Add some to help the AI answer questions.
                            </p>
                        ) : (
                            knowledgeItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-gray-900">
                                                Q: {item.question}
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-600">
                                                A: {item.answer}
                                            </p>
                                            {item.category && (
                                                <span className="mt-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                    {item.category}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
