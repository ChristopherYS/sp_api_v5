// controllers/subject_controller.js

import * as SubjectModel from "../models/subject_model.js";

// Create a new subject
export const createSubject = async (req, res) => {
  try {
    const newSubject = await SubjectModel.createSubject(req.body);
    res.status(201).json({ message: "Subject created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating subject", error: error.message });
  }
};

// Get all subjects
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await SubjectModel.getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching subjects", error: error.message });
  }
};

// Get a subject by ID
export const getSubjectById = async (req, res) => {
  const subjectId = req.params.id;
  try {
    const subject = await SubjectModel.getSubjectById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json(subject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching subject", error: error.message });
  }
};

// Update subject information
export const updateSubject = async (req, res) => {
  const { id } = req.params;
  try {
    await SubjectModel.updateSubject(id, req.body);
    res.status(200).json({ message: "Subject updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating subject", error: error.message });
  }
};

// Delete a subject
export const deleteSubject = async (req, res) => {
  const { id } = req.body;
  try {
    await SubjectModel.deleteSubject(id);
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting subject", error: error.message });
  }
};

// Add student grades
export const addStudentGrade = async (req, res) => {
  const { student_id, subject_id, subject_grades } = req.body;
  try {
    await SubjectModel.addStudentGrade(student_id, subject_id, subject_grades);
    res.status(201).json({ message: "Student grade added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding student grade", error: error.message });
  }
};

// Update Student Grades
export const updateStudentGrade = async (req, res) => {
  const { subject_grades, student_id, subject_id } = req.body;
  try {
    await SubjectModel.updateStudentGrade(
      subject_grades,
      student_id,
      subject_id
    );
    res.status(200).json({ message: "Student grade updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating student grade", error: error.message });
  }
};

// Delete student grades
export const deleteStudentGrade = async (req, res) => {
  const { student_id, grade_ids } = req.body;
  try {
    if (!Array.isArray(grade_ids) || grade_ids.length === 0) {
      return res.status(400).json({ message: "No grade IDs provided" });
    }
    for (const subject_id of grade_ids) {
      await SubjectModel.deleteStudentGrade(student_id, subject_id);
    }
    res.status(200).json({ message: "Student grade(s) deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error deleting student grade(s)",
        error: error.message,
      });
  }
};

// View student grades
export const getStudentGrades = async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const grades = await SubjectModel.getStudentGrades(studentId);
    res.status(200).json(grades);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching student grades", error: error.message });
  }
};