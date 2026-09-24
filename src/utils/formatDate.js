// "2026-09-24T14:05:00.000Z" -> "24 Sept 2026, 14:05" (shown in the visitor's own time zone)
export const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};