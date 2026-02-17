import { getCourses } from "@/actions/program";
import { getPersonnel } from "@/actions/personnel";
import { getAcademicTerms } from "@/actions/academic";
import { CreateSectionForm } from "./create-section-form";

export default async function CreateSectionPage() {
    const [courses, personnel, terms] = await Promise.all([
        getCourses(),
        getPersonnel(),
        getAcademicTerms(),
    ]);

    // Filter only instructors
    const instructors = personnel.filter((p) => p.user.role === "INSTRUCTOR");

    console.log("CreateSectionPage Data:", {
        coursesCount: courses.length,
        instructorsCount: instructors.length,
        termsCount: terms.length,
    });

    return <CreateSectionForm courses={courses} instructors={instructors} terms={terms} />;
}
