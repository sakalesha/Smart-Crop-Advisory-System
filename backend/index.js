import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import cropRoutes from './routes/crops.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => console.log("Connected to database successfully") )
.catch((error) => console.error("MongoDB connection error") );

app.get("/", (req, res) => {
    res.send("API ruunning successfully");
});

app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
