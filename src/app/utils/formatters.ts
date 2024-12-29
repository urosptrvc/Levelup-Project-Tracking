export function formatDate(date: Date | string | number): string {
    if (!date) return "Not Defined";

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return String(date).replace(/"/g, "");
    }

    if (
        parsedDate.getFullYear() === 1900 &&
        parsedDate.getMonth() === 0 &&
        parsedDate.getDate() === 1
    ) {
        return "Self-Delivery";
    }

    const day = String(parsedDate.getUTCDate()).padStart(2, "0");
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
    const year = parsedDate.getUTCFullYear();

    if (
        parsedDate.getUTCHours() === 0 &&
        parsedDate.getUTCMinutes() === 0 &&
        parsedDate.getUTCSeconds() === 0
    ) {
        return `${day}.${month}.${year}`;
    } else {
        const hours = String(parsedDate.getUTCHours()).padStart(2, "0");
        const minutes = String(parsedDate.getUTCMinutes()).padStart(2, "0");
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
}

export function formatValue(value: unknown): string {
    if (typeof value === "string" || value instanceof Date) {
        return formatDate(value);
    }
    if (value == null) {
        return "Not Defined";
    }
    return String(value);
}
