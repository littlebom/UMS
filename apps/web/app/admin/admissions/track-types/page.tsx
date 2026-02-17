import { getTrackTypes, deleteTrackType } from "@/actions/admission-track-type";
import { Plus, Pencil, Trash2, Lock, Target } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as Icons from "lucide-react";

export default async function TrackTypesPage() {
    const trackTypes = await getTrackTypes(true); // Include inactive

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admission Track Types</h1>
                    <p className="text-gray-500">Manage types of admission rounds (e.g., Quota, Direct, Portfolio)</p>
                </div>
                <Link href="/admin/admissions/track-types/create">
                    <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                        <Plus className="h-4 w-4" />
                        New Track Type
                    </button>
                </Link>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="px-6 py-3">Order</th>
                                <th className="px-6 py-3">Code</th>
                                <th className="px-6 py-3">Name (TH / EN)</th>
                                <th className="px-6 py-3">Color & Icon</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {trackTypes.map((type) => {
                                // Dynamic Icon
                                const IconComponent = (Icons as any)[type.icon] || Icons.Target;

                                return (
                                    <tr key={type.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {type.displayOrder}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-gray-600">
                                            {type.code}
                                            {type.isSystem && (
                                                <span className="ml-2 inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                                                    <Lock className="mr-1 h-3 w-3" /> System
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{type.nameTh}</div>
                                            <div className="text-gray-500">{type.nameEn}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="flex h-8 w-8 items-center justify-center rounded-full"
                                                    style={{ backgroundColor: `${type.color}20`, color: type.color }}
                                                >
                                                    <IconComponent className="h-4 w-4" />
                                                </div>
                                                <span className="text-xs text-gray-500">{type.color}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {type.isActive ? (
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/admissions/track-types/${type.id}/edit`}>
                                                    <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white p-0 hover:bg-gray-50">
                                                        <Pencil className="h-4 w-4 text-gray-500" />
                                                    </button>
                                                </Link>

                                                {!type.isSystem && type._count.tracks === 0 && (
                                                    <form action={async () => {
                                                        "use server";
                                                        await deleteTrackType(type.id);
                                                    }}>
                                                        <button
                                                            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white p-0 hover:bg-red-50 hover:text-red-600"
                                                            type="submit"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </form>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
