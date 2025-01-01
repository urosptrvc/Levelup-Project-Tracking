export function formatDate(date: Date | string | number | unknown): string {
    // Provera za null, undefined, prazan string i druge falsy vrednosti
    if (date === null || date === undefined || date === "") return "Not Defined";

    // Provera da li je date tipa Date, string ili number
    if (typeof date !== 'string' && typeof date !== 'number' && !(date instanceof Date)) {
        return "Not Defined";
    }

    // Konverzija u Date objekat
    const parsedDate = new Date(date as Date | string | number);

    // Provera da li je parsirani datum validan
    if (isNaN(parsedDate.getTime())) {
        return "Not Defined";
    }

    // Provera za specijalni slučaj "Self-Delivery"
    if (
        parsedDate.getFullYear() === 1900 &&
        parsedDate.getMonth() === 0 &&
        parsedDate.getDate() === 1
    ) {
        return "Self-Delivery";
    }

    // Formatiranje datuma
    const day = String(parsedDate.getUTCDate()).padStart(2, "0");
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
    const year = parsedDate.getUTCFullYear();

    // Provera da li je vreme 00:00:00
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

export function formatCell(columnId: string): string {
    return columnId
        .replace(/_/g, ' ')
        .replace(/"/g, '')
        .replace(/\b\w/g, (char) => char.toUpperCase());
}