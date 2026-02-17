"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StudentLoginRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/login");
    }, [router]);

    return null;
}
