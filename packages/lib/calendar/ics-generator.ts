export function generateICS(
    title: string,
    description: string,
    location: string,
    startTime: Date,
    endTime: Date,
    url?: string
): string {
    const formatDate = (date: Date): string => {
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const now = formatDate(new Date());
    const start = formatDate(startTime);
    const end = formatDate(endTime);

    const content = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//University Management System//Admissions//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `DTSTAMP:${now}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
        `LOCATION:${location}`,
        url ? `URL:${url}` : "",
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR",
    ];

    return content.filter(Boolean).join("\r\n");
}
