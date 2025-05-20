// app.js

import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import registrarRoutes from './routes/registrar_routes.js';
import studentRoutes from './routes/student_routes.js';
import subjectRoutes from './routes/subject_routes.js';

// Load environment variables from .env file
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the public directory
const __dirname = path.resolve();
app.use('/public', express.static(path.join(__dirname, 'public')));

// Use the registrar routes
app.use('/registrar', registrarRoutes);
// Use the student routes
app.use('/student', studentRoutes);
// Use the subject routes
app.use('/subject', subjectRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});