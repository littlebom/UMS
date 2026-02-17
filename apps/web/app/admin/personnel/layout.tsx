import Link from "next/link";

export default function PersonnelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Personnel Management
                </h1>
                <div className="flex space-x-2 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
                    <Link
                        href="/admin/personnel"
                        className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-100 focus:outline-none"
                    >
                        Overview
                    </Link>
                    <Link
                        href="/admin/personnel/staff"
                        className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-100 focus:outline-none"
                    >
                        Staff
                    </Link>
                    <Link
                        href="/admin/personnel/instructors"
                        className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-100 focus:outline-none"
                    >
                        Instructors
                    </Link>
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
}
