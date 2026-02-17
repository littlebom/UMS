"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import Image from "next/image";
import "./card-print.css";

interface StudentCardProps {
    student: {
        studentId: string;
        firstName: string;
        lastName: string;
        firstNameTh?: string | null;
        lastNameTh?: string | null;
        birthDate: Date;
        profileImageUrl?: string | null;
        program: {
            nameEn: string;
            nameTh: string;
            faculty: {
                nameEn: string;
                nameTh: string;
            };
        };
    };
}

export default function StudentCard({ student }: StudentCardProps) {
    const qrRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (qrRef.current) {
            qrRef.current.innerHTML = "";
            const qrCode = new QRCodeStyling({
                width: 100,
                height: 100,
                data: `STUDENT:${student.studentId}`,
                dotsOptions: {
                    color: "#1e40af",
                    type: "square", // Changed to square for sharper edges
                },
                backgroundOptions: {
                    color: "#ffffff",
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: 0,
                },
            });
            qrCode.append(qrRef.current);
        }
    }, [student.studentId]);

    return (
        <div className="flex justify-center print:block print:p-0">
            {/* Card Container - Standard ID Card Size (85.6mm x 53.98mm) */}
            {/* Scaled up for better visibility on screen, reset for print */}
            <div className="print-container relative h-[53.98mm] w-[85.6mm] origin-top scale-[1.8] overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 shadow-2xl print:scale-100 print:rounded-none print:shadow-none mb-32 print:mb-0">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white"></div>
                    <div className="absolute -bottom-12 -left-4 h-40 w-40 rounded-full bg-white"></div>
                    <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform bg-[url('/logo-white.png')] bg-contain bg-center bg-no-repeat opacity-5"></div>
                </div>

                {/* Card Content */}
                <div className="relative flex h-full flex-col p-[4mm]">
                    {/* Header */}
                    <div className="mb-2 flex items-center justify-between border-b border-blue-400/30 pb-1">
                        <div>
                            <h2 className="text-[10px] font-bold uppercase tracking-wider text-white">
                                University Management System
                            </h2>
                            <p className="text-[8px] text-blue-200">Student Identification Card</p>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-white/10 p-1">
                            {/* Logo Placeholder */}
                            <div className="h-full w-full rounded-full bg-white/20"></div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-1 gap-3">
                        {/* Left: Photo */}
                        <div className="flex-shrink-0">
                            <div className="h-[28mm] w-[22mm] overflow-hidden rounded border-2 border-white/20 bg-white shadow-sm">
                                {student.profileImageUrl ? (
                                    <Image
                                        src={student.profileImageUrl}
                                        alt={`${student.firstName} ${student.lastName}`}
                                        width={80}
                                        height={100}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                                        <svg
                                            className="h-8 w-8"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Center: Student Info */}
                        <div className="flex min-w-0 flex-1 flex-col justify-center space-y-1.5">
                            <div>
                                <p className="text-[8px] font-semibold uppercase text-blue-200">
                                    Name
                                </p>
                                <p className="truncate text-xs font-bold text-white">
                                    {student.firstName} {student.lastName}
                                </p>
                            </div>
                            <div>
                                <p className="text-[8px] font-semibold uppercase text-blue-200">
                                    Student ID
                                </p>
                                <p className="font-mono text-sm font-bold tracking-wide text-white">
                                    {student.studentId}
                                </p>
                            </div>
                            <div>
                                <p className="text-[8px] font-semibold uppercase text-blue-200">
                                    Faculty
                                </p>
                                <p className="truncate text-[9px] font-medium text-white">
                                    {student.program.faculty.nameEn}
                                </p>
                            </div>
                        </div>

                        {/* Right: QR Code */}
                        <div className="flex flex-col justify-end mb-[0.3rem]">
                            <div className="flex h-[10mm] w-[10mm] items-center justify-center bg-white p-0.5 shadow-sm">
                                <div ref={qrRef} className="h-full w-full [&>canvas]:h-full [&>canvas]:w-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-1 text-right">
                        <p className="text-[7px] text-blue-300">
                            Valid: {new Date().getFullYear()}-{new Date().getFullYear() + 4}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
