"use server";

import { prisma } from "@ums/lib";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Gender } from "@prisma/client";

export async function registerApplicant(prevState: any, formData: FormData) {
    try {
        // 1. Extract Data
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        const firstName = formData.get("firstName") as string; // English First Name
        const lastName = formData.get("lastName") as string;   // English Last Name
        const title = formData.get("title") as string;
        const firstNameTh = formData.get("firstNameTh") as string;
        const lastNameTh = formData.get("lastNameTh") as string;
        const nationality = formData.get("nationality") as string;
        const citizenId = formData.get("citizenId") as string;
        const birthDateStr = formData.get("birthDate") as string; // YYYY-MM-DD
        const gender = formData.get("gender") as Gender;
        const phone = formData.get("phone") as string;

        const address = formData.get("address") as string;
        const subDistrict = formData.get("subDistrict") as string;
        const district = formData.get("district") as string;
        const province = formData.get("province") as string;
        const zipCode = formData.get("zipCode") as string;

        // Education History (JSON String)
        const educationHistoryJson = formData.get("educationHistory") as string;
        let educationHistoryData = [];
        try {
            educationHistoryData = JSON.parse(educationHistoryJson);
        } catch (e) {
            console.error("Failed to parse education history", e);
        }

        // 2. Validation
        if (password !== confirmPassword) {
            return { error: "Passwords do not match" };
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { error: "Email is already registered" };
        }

        const existingCitizen = await prisma.applicant.findUnique({ where: { citizenId } });
        if (existingCitizen) {
            return { error: "Citizen ID is already registered" };
        }

        // 3. Hash Password
        const passwordHash = await bcrypt.hash(password, 10);

        const trackId = formData.get("trackId") as string;

        // 4. Create User & Applicant Profile
        const newUser = await prisma.user.create({
            data: {
                email,
                passwordHash,
                role: "APPLICANT",
                applicantProfile: {
                    create: {
                        title,
                        firstName,
                        lastName,
                        firstNameTh,
                        lastNameTh,
                        nationality,
                        citizenId,
                        birthDate: new Date(birthDateStr),
                        gender,
                        phone,
                        address,
                        subDistrict,
                        district,
                        province,
                        zipCode,
                        // Create related EducationHistory records
                        educationHistory: {
                            create: educationHistoryData.map((edu: any) => ({
                                level: edu.level,
                                degreeName: edu.degreeName,
                                institution: edu.institution,
                                gpa: edu.gpa,
                                graduationYear: edu.graduationYear ? parseInt(edu.graduationYear) : undefined,
                            })),
                        },
                    },
                },
            },
            include: {
                applicantProfile: true,
            },
        });

        // 4.1 Create Application if trackId is provided
        if (trackId && newUser.applicantProfile) {
            // Fetch track to get programId
            const track = await prisma.admissionTrack.findUnique({
                where: { id: trackId },
                select: { programId: true }
            });

            if (track) {
                await prisma.application.create({
                    data: {
                        applicantId: newUser.applicantProfile.id,
                        programId: track.programId,
                        trackId: trackId,
                        status: "DRAFT"
                    }
                });
            }
        }

        // 5. Create Session (Auto Login)
        const sessionData = {
            userId: newUser.id,
            role: newUser.role,
            applicantId: newUser.applicantProfile?.id,
            name: `${firstName} ${lastName}`,
        };

        (await cookies()).set("applicant_session", JSON.stringify(sessionData), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

    } catch (error) {
        console.error("Registration error:", error);
        return { error: "Something went wrong. Please try again." };
    }

    // 6. Redirect (Must be outside try-catch)
    redirect("/admissions/dashboard");
}
