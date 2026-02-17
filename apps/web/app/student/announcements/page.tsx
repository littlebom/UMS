import { getPublishedAnnouncements } from "@/actions/announcement";
import { getStudentSession } from "@/actions/student-auth";
import { formatDate } from "@/lib/utils";
import { Megaphone } from "lucide-react";

export default async function StudentAnnouncementsPage() {
    const session = await getStudentSession();
    if (!session) {
        return <div>Please log in to view announcements.</div>;
    }

    const announcements = await getPublishedAnnouncements("STUDENT");

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <Megaphone className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
            </div>

            <div className="grid gap-6">
                {announcements.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
                        No announcements available at this time.
                    </div>
                ) : (
                    announcements.map((announcement) => (
                        <div
                            key={announcement.id}
                            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {announcement.title}
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(announcement.publishedAt || announcement.createdAt)}
                                    </span>
                                </div>
                            </div>
                            <div className="px-6 py-4">
                                <p className="whitespace-pre-wrap text-gray-700">
                                    {announcement.content}
                                </p>
                            </div>
                            <div className="bg-gray-50 px-6 py-3 text-xs text-gray-500">
                                Posted by {announcement.author.email}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
