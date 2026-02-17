import { getBanners, deleteBanner, toggleBannerStatus } from "@/actions/cms";
import Link from "next/link";
import { Plus, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminBannersPage() {
    const banners = await getBanners(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Website Banners</h1>
                <Link
                    href="/admin/cms/banners/create"
                    className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Banner
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Preview
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Title / Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Order
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {banners.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                    No banners found.
                                </td>
                            </tr>
                        ) : (
                            banners.map((banner) => (
                                <tr key={banner.id}>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="h-16 w-24 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                                            <img
                                                src={banner.imageUrl}
                                                alt={banner.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {banner.title}
                                        </div>
                                        <div className="text-sm text-gray-500 truncate max-w-xs">
                                            {banner.description}
                                        </div>
                                        {banner.linkUrl && (
                                            <a
                                                href={banner.linkUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-1 flex items-center text-xs text-blue-600 hover:underline"
                                            >
                                                <ExternalLink className="mr-1 h-3 w-3" />
                                                {banner.linkUrl}
                                            </a>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {banner.order}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${banner.isActive
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {banner.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <form
                                                action={async () => {
                                                    "use server";
                                                    await toggleBannerStatus(banner.id, !banner.isActive);
                                                }}
                                            >
                                                <button
                                                    type="submit"
                                                    className="text-gray-400 hover:text-gray-600"
                                                    title={banner.isActive ? "Deactivate" : "Activate"}
                                                >
                                                    {banner.isActive ? (
                                                        <Eye className="h-5 w-5" />
                                                    ) : (
                                                        <EyeOff className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </form>
                                            <form
                                                action={async () => {
                                                    "use server";
                                                    await deleteBanner(banner.id);
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
