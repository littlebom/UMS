import { getAllFiles, getFileStats, getAllMedia, getRecentProfiles } from "@/actions/files";
import { FolderOpen, FileText, Receipt, Download, Trash2, ExternalLink, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { DeleteFileButton } from "./delete-file-button";

export default async function FilesPage() {
    const files = await getAllFiles();
    const stats = await getFileStats();
    const media = await getAllMedia();
    const profiles = await getRecentProfiles();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">File Management</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage all uploaded files and media in the system
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 sm:grid-cols-3">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <FolderOpen className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Total Files
                                    </dt>
                                    <dd className="text-lg font-semibold text-gray-900">
                                        {stats.totalFiles}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <FileText className="h-6 w-6 text-blue-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Application Documents
                                    </dt>
                                    <dd className="text-lg font-semibold text-gray-900">
                                        {stats.documentFiles}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Receipt className="h-6 w-6 text-green-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Payment Slips
                                    </dt>
                                    <dd className="text-lg font-semibold text-gray-900">
                                        {stats.paymentFiles}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Media & Logos */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Announcements */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center mb-4">
                            <ImageIcon className="h-5 w-5 text-purple-500 mr-2" />
                            <h3 className="text-lg font-medium text-gray-900">Recent Announcements</h3>
                        </div>
                        {media.announcements.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {media.announcements.map((item) => (
                                    <div key={item.id} className="relative aspect-video group">
                                        <img
                                            src={item.imageUrl!}
                                            alt={item.title}
                                            className="h-full w-full object-cover rounded-md border border-gray-200"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-md" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No announcement images found.</p>
                        )}
                    </div>
                </div>

                {/* Banners */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center mb-4">
                            <ImageIcon className="h-5 w-5 text-indigo-500 mr-2" />
                            <h3 className="text-lg font-medium text-gray-900">Website Banners</h3>
                        </div>
                        {media.banners.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {media.banners.map((item) => (
                                    <div key={item.id} className="relative aspect-video group">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="h-full w-full object-cover rounded-md border border-gray-200"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No banner images found.</p>
                        )}
                    </div>
                </div>

                {/* Faculty Logos */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center mb-4">
                            <ImageIcon className="h-5 w-5 text-orange-500 mr-2" />
                            <h3 className="text-lg font-medium text-gray-900">Faculty Logos</h3>
                        </div>
                        {media.facultyLogos && media.facultyLogos.length > 0 ? (
                            <div className="grid grid-cols-3 gap-3">
                                {media.facultyLogos.map((fac) => (
                                    <div key={fac.id} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors" title={fac.nameEn}>
                                        <img
                                            src={fac.logoUrl!}
                                            alt={fac.nameEn}
                                            className="h-12 w-12 object-contain"
                                        />
                                        <span className="mt-1 text-[10px] text-gray-500 text-center truncate w-full">
                                            {fac.nameEn.split(' ')[0]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No faculty logos found.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Profiles */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Profiles</h3>
                    {profiles.length > 0 ? (
                        <div className="flex flex-wrap gap-6">
                            {profiles.map((profile, idx) => (
                                <div key={`${profile.type}-${idx}`} className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                                    <img
                                        src={profile.url}
                                        alt={profile.name}
                                        className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{profile.name}</p>
                                        <p className="text-xs text-gray-500">{profile.type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No profile images found.</p>
                    )}
                </div>
            </div>

            {/* Files Table */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        All Files ({files.length})
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                >
                                    File Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                >
                                    Uploaded By
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                >
                                    Related To
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                >
                                    Upload Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {files.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                                        No files found in the system.
                                    </td>
                                </tr>
                            ) : (
                                files.map((file) => (
                                    <tr key={file.id} className="hover:bg-gray-50">
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center">
                                                {file.relatedTo === "Application" ? (
                                                    <FileText className="mr-2 h-5 w-5 text-blue-500" />
                                                ) : file.relatedTo === "Payment" ? (
                                                    <Receipt className="mr-2 h-5 w-5 text-green-500" />
                                                ) : (
                                                    <ImageIcon className="mr-2 h-5 w-5 text-purple-500" />
                                                )}
                                                <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]" title={file.fileName}>
                                                    {file.fileName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {file.uploaderName || "Unknown"}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                {file.relatedTo}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {new Date(file.uploadedAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <a
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-900"
                                                    title="View File"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                                <a
                                                    href={file.url}
                                                    download
                                                    className="inline-flex items-center gap-1 text-green-600 hover:text-green-900"
                                                    title="Download"
                                                >
                                                    <Download className="h-4 w-4" />
                                                </a>
                                                <DeleteFileButton
                                                    fileId={file.relatedId}
                                                    fileType={file.relatedTo}
                                                />
                                            </div>
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
