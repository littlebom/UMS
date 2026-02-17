import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@ums/lib";
import { getMyInterviews } from "@/actions/interview";
import InterviewList from "./interview-list";
import { Users, Clock, CheckCircle } from "lucide-react";

export default async function MyInterviewsPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/login");
    }

    // Get personnel profile
    const personnel = await prisma.personnel.findUnique({
        where: { userId: (session.user as any).id },
    });

    if (!personnel) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="rounded-lg bg-white p-8 shadow text-center">
                    <h1 className="mb-2 text-xl font-bold text-red-600">Access Denied</h1>
                    <p className="text-gray-600">You are not registered as an interviewer.</p>
                </div>
            </div>
        );
    }

    const interviews = await getMyInterviews(personnel.id);

    // Calculate statistics
    const pendingCount = interviews.filter((i) => i.score === null).length;
    const completedCount = interviews.filter((i) => i.score !== null).length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Interview Assignments</h1>
                <p className="text-sm text-gray-600">View and score your assigned interview candidates</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 p-3">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Assigned</p>
                            <p className="text-2xl font-bold text-gray-900">{interviews.length}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-yellow-100 p-3">
                            <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-green-100 p-3">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Completed</p>
                            <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            <InterviewList interviews={interviews} interviewerId={personnel.id} />
        </div>
    );
}
