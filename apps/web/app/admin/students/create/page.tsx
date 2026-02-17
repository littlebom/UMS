import { getPrograms } from "@/actions/program";
import CreateStudentForm from "./create-form";

export default async function CreateStudentPage() {
    const programs = await getPrograms();

    return (
        <div className="container mx-auto py-10">
            <h1 className="mb-8 text-3xl font-bold">Add New Student</h1>
            <CreateStudentForm programs={programs} />
        </div>
    );
}
