export * from "./components/data-table";

export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    // Base styles: Flexbox for alignment, focus rings for accessibility, transitions
    const baseStyles = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    // Default styles: Standard Blue Button (Primary)
    const defaultStyles = "bg-blue-600 text-white hover:bg-blue-700 px-5 py-2.5";

    // Check if user is overriding styles (looking for bg-, text-, p-, h-, w- classes)
    const hasOverride = props.className && (
        props.className.includes("bg-") ||
        props.className.includes("text-") ||
        props.className.includes("p-") ||
        props.className.includes("h-") && !props.className.includes("h-4") // Allow h-4 for icons without triggering override
    );

    const className = hasOverride
        ? `${baseStyles} ${props.className}`
        : `${baseStyles} ${defaultStyles} ${props.className || ""}`;

    return (
        <button
            {...props}
            className={className}
        />
    );
};

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            {...props}
            className={`w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${props.className}`}
        />
    );
};
