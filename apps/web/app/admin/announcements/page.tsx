import { getAnnouncements, deleteAnnouncement, togglePublishAnnouncement } from "@/actions/announcement";
import Link from "next/link";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminAnnouncementsPage() {
    const announcements = await getAnnouncements();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
                <Link
                    href="/admin/announcements/create"
                    className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Announcement
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Target
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Date
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {announcements.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                    No announcements found.
                                </td>
                            </tr>
                        ) : (
                            announcements.map((announcement) => (
                                <tr key={announcement.id}>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {announcement.title}
                                        </div>
                                        <div className="text-sm text-gray-500 truncate max-w-xs">
                                            {announcement.content}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                                            {announcement.target}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${announcement.isPublished
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {announcement.isPublished ? "Published" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {formatDate(announcement.createdAt)}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <form
                                                action={async () => {
                                                    "use server";
                                                    await togglePublishAnnouncement(
                                                        announcement.id,
                                                        !announcement.isPublished
                                                    );
                                                }}
                                            >
                                                <button
                                                    type="submit"
                                                    className="text-gray-400 hover:text-gray-600"
                                                    title={announcement.isPublished ? "Unpublish" : "Publish"}
                                                >
                                                    {announcement.isPublished ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </form>
                                            <form
                                                action={async () => {
                                                    "use server";
                                                    await deleteAnnouncement(announcement.id);
                                                }}
                                            >
                                                <button
                                                    type="submit"
                                                    className="text-red-400 hover:text-red-600"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
