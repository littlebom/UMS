import { getFaculties } from "@/actions/faculty";
import { getDepartments } from "@/actions/department";
import CreatePersonnelForm from "./create-form";

export default async function CreatePersonnelPage() {
    const [faculties, departments] = await Promise.all([
        getFaculties(),
        getDepartments(),
    ]);

    return (
        <div className="container mx-auto py-10">
            <h1 className="mb-8 text-3xl font-bold">Add New Personnel</h1>
            <CreatePersonnelForm faculties={faculties} departments={departments} />
        </div>
    );
}
