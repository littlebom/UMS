"use client";

import { useEffect, useState } from "react";
import { generateCsrfToken } from "@/lib/csrf";

/**
 * CSRF Token Input Component
 * Automatically generates and includes CSRF token in forms
 * 
 * Usage:
 * <form action={myAction}>
 *   <CsrfTokenInput />
 *   <input name="email" />
 *   <button>Submit</button>
 * </form>
 */
export function CsrfTokenInput() {
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        // Generate token on component mount
        generateCsrfToken().then(setToken);
    }, []);

    if (!token) {
        return null; // Don't render until token is ready
    }

    return (
        <input
            type="hidden"
            name="csrf_token"
            value={token}
            readOnly
        />
    );
}
