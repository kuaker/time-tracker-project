import type { TimeEntry } from "../services/timeServicesEntires";

export function exportToCSV(entries: TimeEntry[], filename = 'horas.csv') {
    if (!entries.length) return;

    const headers = ['Fecha', 'Horas', 'Descripción'];
    const rows = entries.map(e => [e.date, e.hours.toString(), `"${e.description}"`]);

    const csvContent =
        [headers, ...rows]
            .map(row => row.join(','))
            .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.click();
}
