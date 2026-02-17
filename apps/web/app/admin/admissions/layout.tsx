export default function AdmissionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
}
