// routes/student_routes.js

import express from 'express';
import * as StudentController from '../controllers/student_controller.js';
import { validateApiKey } from '../middleware/auth_middleware.js';

const router = express.Router();

// Create a new student
router.post('/newstud', validateApiKey, StudentController.createStudent);

// Get all students
router.get('/allstud', validateApiKey, StudentController.getAllStudents);

// Get a student by ID
router.get('/:id', validateApiKey, StudentController.getStudentById);

// Update student information
router.put('/:id/info', validateApiKey, StudentController.updateStudent);

// Delete a student
router.delete('/delstud', validateApiKey, StudentController.deleteStudent);

// Student login
router.post('/login', StudentController.studentLogin);

// Update student username
router.put('/:id/username', validateApiKey, StudentController.updateStudentUsername);

// Update student password
router.put('/:id/password', validateApiKey, StudentController.updateStudentPassword);

export default router;