// src/models/TimeEntry.ts
import { Schema, model } from 'mongoose';

const TimeEntrySchema = new Schema({
    date: { type: String, required: true },
    hours: { type: Number, required: true },
    description: { type: String, required: true },
    taskName: { type: String, required: true }
});

export default model('TimeEntry', TimeEntrySchema);
