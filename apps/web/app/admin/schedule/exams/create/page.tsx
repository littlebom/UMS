import { getAcademicTerms, getClassSections } from "@/actions/academic";
import CreateExamForm from "./create-exam-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CreateExamPage() {
    const [sections, terms] = await Promise.all([
        getClassSections(),
        getAcademicTerms(),
    ]);

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 p-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/schedule/exams"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Schedule Exam</h1>
                        <p className="text-muted-foreground">
                            Create a new exam schedule for a course
                        </p>
                    </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <CreateExamForm
                        sections={sections}
                        terms={terms}
                    />
                </div>
            </div>
        </div>
    );
}
