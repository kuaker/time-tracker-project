// src/routes/timeEntries.ts
import express from 'express';
import TimeEntry from '../models/TimeEntry';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newEntry = new TimeEntry(req.body);
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ error: 'Error al guardar la entrada' });
    }
});

router.get('/', async (_req, res) => {
    const entries = await TimeEntry.find().sort({ date: -1 });
    res.json(entries);
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await TimeEntry.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: 'Entrada no encontrada' });
        res.json({ message: 'Entrada eliminada', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la entrada' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEntry = await TimeEntry.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEntry) return res.status(404).json({ error: 'Entrada no encontrada' });
        res.json(updatedEntry);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la entrada' });
    }
});

export default router;
