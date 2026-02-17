import Link from "next/link";
import { ArrowRight, BookOpen, Users, Award, CheckCircle, FileText, Calendar, UserCheck } from "lucide-react";
import * as Icons from "lucide-react";
import { format } from "date-fns";
import { getPublicAdmissionTracks } from "@/actions/admission-track";
import { PublicNavbar } from "@/components/public-navbar";

export default async function AdmissionsLandingPage() {
    const tracks = await getPublicAdmissionTracks();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <PublicNavbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900 py-20 sm:py-32">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Start Your Journey with <span className="text-blue-300">UMS</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                        Join a community of innovators and leaders. Apply today to unlock your potential and shape your future.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="#open-admissions"
                            className="rounded-md bg-white px-8 py-3.5 text-sm font-semibold text-blue-900 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            View Open Admissions
                        </Link>
                        <Link
                            href="/login"
                            className="text-sm font-semibold leading-6 text-white flex items-center gap-1 hover:text-blue-200"
                        >
                            Already have an account? <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Open Admissions Section (NEW) */}
            <section id="open-admissions" className="bg-white py-16 sm:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Open for Admission</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Explore our programs currently accepting applications. Choose the track that suits you best.
                        </p>
                    </div>

                    {tracks.length > 0 ? (
                        <div className="mx-auto mt-12 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3">
                            {tracks.map((track) => {
                                const IconComponent = (Icons as any)[track.type.icon] || Icons.Target;
                                const daysLeft = Math.ceil((new Date(track.closeDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

                                return (
                                    <div key={track.id} className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-blue-200">
                                        <div className="p-6">
                                            <div className="flex items-center justify-between">
                                                <span
                                                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                                                    style={{ backgroundColor: `${track.type.color}20`, color: track.type.color }}
                                                >
                                                    <IconComponent className="mr-1 h-3 w-3" />
                                                    {track.type.nameEn}
                                                </span>
                                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                    Year {track.academicYear}
                                                </span>
                                            </div>
                                            <h3 className="mt-4 text-xl font-bold text-gray-900 line-clamp-2">
                                                {track.program.nameEn}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {track.program.faculty.nameEn}
                                            </p>

                                            <div className="mt-6 space-y-3 border-t border-gray-100 pt-4">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                                                    <span>Closes: <span className="font-medium">{format(new Date(track.closeDate), "MMM d, yyyy")}</span></span>
                                                    {daysLeft <= 7 && daysLeft > 0 && (
                                                        <span className="ml-2 text-xs font-bold text-red-600 animate-pulse">({daysLeft} days left!)</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Users className="mr-2 h-4 w-4 text-gray-400" />
                                                    <span><span className="font-medium">{track.totalSeats}</span> Seats Available</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-auto bg-gray-50 px-6 py-4">
                                            <Link href={`/admissions/apply/${track.id}`}>
                                                <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
                                                    Apply Now
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mt-12 rounded-lg border border-dashed border-gray-300 p-12 text-center bg-gray-50">
                            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">No active admissions</h3>
                            <p className="mt-1 text-sm text-gray-500">Please check back later for upcoming admission rounds.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* How to Apply Section */}
            <section id="how-to-apply" className="bg-gray-50 py-24 sm:py-32">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Simple Process</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            How to Apply
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Follow these simple steps to begin your academic journey with us.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-4xl">
                        <ol className="space-y-8">
                            {[
                                {
                                    step: 1,
                                    icon: UserCheck,
                                    title: "Create an Account",
                                    description: "Register for a new applicant account using your email address.",
                                    action: { text: "Register Now", href: "/admissions/register" }
                                },
                                {
                                    step: 2,
                                    icon: FileText,
                                    title: "Select a Program",
                                    description: "Browse open admission tracks and choose the program you wish to apply for.",
                                },
                                {
                                    step: 3,
                                    icon: BookOpen,
                                    title: "Complete Application Form",
                                    description: "Fill in your personal information, educational background, and upload required documents.",
                                },
                                {
                                    step: 4,
                                    icon: CheckCircle,
                                    title: "Submit & Pay Fee",
                                    description: "Review your application, pay the application fee (if applicable), and submit.",
                                },
                                {
                                    step: 5,
                                    icon: Award,
                                    title: "Admission Decision",
                                    description: "Track your application status and receive your admission decision.",
                                },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.step} className="relative flex gap-x-4">
                                        <div className="absolute left-0 top-0 flex w-10 justify-center -bottom-8">
                                            {item.step !== 5 && (
                                                <div className="w-px bg-gray-200"></div>
                                            )}
                                        </div>
                                        <div className="relative flex h-10 w-10 flex-none items-center justify-center rounded-full bg-blue-600 text-white">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-auto">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-blue-600">Step {item.step}</span>
                                                <h3 className="text-lg font-semibold leading-7 text-gray-900">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                                {item.description}
                                            </p>
                                            {item.action && (
                                                <Link
                                                    href={item.action.href}
                                                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-500"
                                                >
                                                    {item.action.text} <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Required Documents Section */}
            <section className="bg-white py-24 sm:py-32">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Preparation</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Required Documents
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Please prepare the following documents before starting your application.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-4xl">
                        <div className="grid gap-6 md:grid-cols-2">
                            {[
                                { name: "National ID Card", description: "Clear copy of your national identification card" },
                                { name: "Academic Transcripts", description: "Official transcripts from previous institutions" },
                                { name: "Passport Photo", description: "Recent passport-sized photograph" },
                                { name: "Birth Certificate", description: "Official copy of your birth certificate" },
                                { name: "Recommendation Letters", description: "Letters from teachers or employers (if applicable)" },
                                { name: "English Proficiency", description: "TOEFL/IELTS scores (for international programs)" },
                            ].map((doc) => (
                                <div key={doc.name} className="flex gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <FileText className="h-6 w-6 flex-none text-blue-600" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                                        <p className="mt-1 text-sm text-gray-600">{doc.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-900 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white">Ready to Start Your Application?</h2>
                    <p className="mt-4 text-lg text-blue-100">
                        Join thousands of students who have chosen UMS for their education.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <Link
                            href="/admissions/register"
                            className="rounded-md bg-white px-8 py-3 text-sm font-semibold text-blue-900 hover:bg-blue-50"
                        >
                            Create Account
                        </Link>
                        <Link
                            href="/login"
                            className="rounded-md border border-white px-8 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-8">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} University Management System. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
