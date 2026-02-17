"use server";

import { prisma, ApplicationStatus } from "@ums/lib";
import { revalidatePath } from "next/cache";

export async function seedAdmissionsData() {
    console.log("🌱 Seeding Admissions Data...");

    try {
        // 1. Get existing programs and personnel (potential interviewers)
        let programs = await prisma.program.findMany();
        const interviewers = await prisma.personnel.findMany();

        if (programs.length === 0) {
            console.log("⚠️ No programs found. Creating mock program structure...");

            // Create Mock Faculty
            const faculty = await prisma.faculty.create({
                data: {
                    code: "MOCK-" + Math.floor(Math.random() * 1000),
                    nameTh: "คณะตัวอย่าง",
                    nameEn: "Mock Faculty",
                }
            });

            // Create Mock Department
            const department = await prisma.department.create({
                data: {
                    nameTh: "ภาควิชาตัวอย่าง",
                    nameEn: "Mock Department",
                    facultyId: faculty.id,
                }
            });

            // Create Mock Program
            const program = await prisma.program.create({
                data: {
                    nameTh: "หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์ (ตัวอย่าง)",
                    nameEn: "Bachelor of Science in Computer Science (Mock)",
                    degreeLevel: "BACHELOR",
                    facultyId: faculty.id,
                    departmentId: department.id,
                    isAcceptingApplications: true,
                }
            });

            programs = [program];
            console.log("✅ Created mock program:", program.nameEn);
        }

        if (interviewers.length === 0) {
            console.warn("No personnel found. Skipping interviewer assignment.");
        }

        // 2. Create Mock Applicants & Applications
        const statuses: ApplicationStatus[] = [
            "SUBMITTED",
            "DOCUMENT_VERIFIED",
            "INTERVIEW_READY",
            "ACCEPTED",
            "REJECTED",
        ];

        for (let i = 0; i < 20; i++) {
            const randomProgram = programs[Math.floor(Math.random() * programs.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const randomId = Math.floor(Math.random() * 100000);

            // Create User
            const user = await prisma.user.create({
                data: {
                    email: `applicant${randomId}@example.com`,
                    passwordHash: "mock_hash", // Not usable for login
                    role: "APPLICANT",
                },
            });

            // Create Applicant
            const applicant = await prisma.applicant.create({
                data: {
                    userId: user.id,
                    firstName: `Applicant`,
                    lastName: `${randomId}`,
                    firstNameTh: `ผู้สมัคร`,
                    lastNameTh: `${randomId}`,
                    citizenId: Math.floor(Math.random() * 10000000000000).toString().padStart(13, "0"),
                    phone: `08${Math.floor(Math.random() * 100000000)}`,
                    birthDate: new Date("2000-01-01"),
                },
            });

            // Create Application
            await prisma.application.create({
                data: {
                    applicantId: applicant.id,
                    programId: randomProgram.id,
                    status: status,
                    submittedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)), // Random past date
                },
            });

            console.log(`Created application for ${applicant.firstName} (${status})`);
        }

        // 3. Create Interview Slots & Bookings
        const today = new Date();
        const locations = ["Building A, Room 101", "Building B, Room 202", "Online (Zoom)", "Conference Room 3"];

        // Fetch created applications to link them
        const createdApplications = await prisma.application.findMany({
            where: { status: { in: ["INTERVIEW_READY", "ACCEPTED", "REJECTED"] } }
        });

        let appIndex = 0;

        for (let i = 0; i < 15; i++) {
            const randomProgram = Math.random() > 0.3 ? programs[Math.floor(Math.random() * programs.length)] : null;
            const randomInterviewer = interviewers.length > 0 ? interviewers[Math.floor(Math.random() * interviewers.length)] : null;

            // Random date: some in past (for completed interviews), some in future
            const isPast = Math.random() > 0.5;
            const slotDate = new Date(today);
            slotDate.setDate(today.getDate() + (isPast ? -Math.floor(Math.random() * 5) : Math.floor(Math.random() * 14)));
            slotDate.setHours(9 + Math.floor(Math.random() * 7), 0, 0, 0);

            const endTime = new Date(slotDate);
            endTime.setHours(slotDate.getHours() + 1);

            const slot = await prisma.interviewSlot.create({
                data: {
                    startTime: slotDate,
                    endTime: endTime,
                    location: locations[Math.floor(Math.random() * locations.length)],
                    programId: randomProgram?.id,
                    coordinatorName: "Jane Doe",
                    coordinatorPhone: "02-123-4567",
                    description: "Please bring your ID card and transcript.",
                    ...(randomInterviewer && {
                        interviewers: {
                            create: {
                                interviewerId: randomInterviewer.id
                            }
                        }
                    })
                } as any,
            });

            // Book this slot if we have available apps and it matches program (or generic slot)
            if (appIndex < createdApplications.length) {
                const app = createdApplications[appIndex];

                // Simple matching logic: if slot is generic OR slot program matches app program
                if (!slot.programId || slot.programId === app.programId) {

                    // Create Interview Result (Booking)
                    const result = await prisma.interviewResult.create({
                        data: {
                            applicationId: app.id,
                            slotId: slot.id,
                            // If past date, assume checked in
                            checkedInAt: isPast ? slotDate : null,
                            // If past date, maybe add score
                            ...(isPast && {
                                score: Math.floor(Math.random() * 50) + 50, // 50-100
                                notes: "Candidate showed strong potential.",
                                status: Math.random() > 0.3 ? "PASSED" : "FAILED",
                            })
                        } as any
                    });

                    // Update App Status if passed/failed
                    if (isPast) {
                        await prisma.application.update({
                            where: { id: app.id },
                            data: {
                                status: result.status === "PASSED" ? "ACCEPTED" : "REJECTED"
                            } as any
                        });
                    }

                    console.log(`Booked interview for App ${app.id} at ${slotDate.toLocaleString()}`);
                    appIndex++;
                }
            }

            console.log(`Created interview slot at ${slotDate.toLocaleString()}`);
        }

        console.log("✅ Admissions data seeding completed!");
        revalidatePath("/admin/admissions");
        return { success: true, message: "Mock data created successfully" };

    } catch (error) {
        console.error("Failed to seed data:", error);
        return { success: false, error: "Failed to seed data" };
    }
}
