// routes/subject_routes.js

import express from 'express';
import * as SubjectController from '../controllers/subject_controller.js';
import { validateApiKey } from '../middleware/auth_middleware.js';

const router = express.Router();

// Create a new subject
router.post('/newsub', validateApiKey, SubjectController.createSubject);

// Get all subjects
router.get('/allsub', validateApiKey, SubjectController.getAllSubjects);

// Get a subject by ID
router.get('/:id', validateApiKey, SubjectController.getSubjectById);

// Update subject information
router.put('/:id', validateApiKey, SubjectController.updateSubject);

// Delete a subject
router.delete('/delsub', validateApiKey, SubjectController.deleteSubject);

// Add student grades
router.post('/addstudgrades', validateApiKey, SubjectController.addStudentGrade);

// Update student grades
router.patch('/updatestudgrades', validateApiKey, SubjectController.updateStudentGrade);

// Delete Student Grades
router.delete('/delstudgrades', validateApiKey, SubjectController.deleteStudentGrade);

// View student grades
router.get('/studgrades/:studentId', validateApiKey, SubjectController.getStudentGrades);

export default router;