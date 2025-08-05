// src/app.ts
import express from 'express';
import cors from 'cors';
import timeEntriesRoutes from './routes/timeEntries';


const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use('/api/time-entries', timeEntriesRoutes);

export default app;