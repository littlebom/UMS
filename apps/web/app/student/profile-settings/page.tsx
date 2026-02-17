import { getMyStudentProfile } from "@/actions/student-profile";
import { redirect } from "next/navigation";
import { getStudentSession } from "@/actions/student-auth";
import { ProfileSettingsForm } from "./profile-settings-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProfileSettingsPage() {
    const session = await getStudentSession();
    if (!session) {
        redirect("/student/login");
    }

    const student = await getMyStudentProfile();

    if (!student) {
        redirect("/student/dashboard");
    }

    return (
        <div className="space-y-6">
            <div>
                <Link
                    href="/student/dashboard"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                    Profile Settings
                </h1>
                <p className="mt-1 text-gray-600">
                    Manage your e-Profile and privacy settings
                </p>
            </div>

            <ProfileSettingsForm student={student} />
        </div>
    );
}
