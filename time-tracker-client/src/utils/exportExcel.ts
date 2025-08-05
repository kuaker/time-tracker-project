import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import type { TimeEntry } from '../services/timeServicesEntires';

export function exportToExcel(entries: TimeEntry[], filename = 'horas.xlsx') {
    if (!entries.length) return;

    const data = entries.map(entry => ({
        Fecha: entry.date,
        Horas: entry.hours,
        Descripción: entry.description,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Entradas');

    const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
    });

    const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, filename);
}
