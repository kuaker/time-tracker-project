// src/services/timeEntriesService.ts
export type TimeEntry = {
    _id?: string;
    date: string;
    hours: number;
    description: string;
};

const API_URL = 'http://localhost:3000/api/time-entries';

export const createTimeEntry = async (entry: TimeEntry): Promise<TimeEntry> => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
    });

    if (!res.ok) {
        throw new Error('Error al guardar la entrada');
    }

    return await res.json();
};

export const getTimeEntries = async (): Promise<TimeEntry[]> => {
    const res = await fetch(API_URL);

    if (!res.ok) {
        throw new Error('Error al obtener las entradas');
    }

    return await res.json();
};

export const deleteTimeEntry = async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error('Error al eliminar la entrada');
    }
    return await res.json();
};

export const updateTimeEntry = async (id: string, updatedData: TimeEntry): Promise<TimeEntry> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
        throw new Error('Error al actualizar la entrada');
    }

    return await res.json();
};
