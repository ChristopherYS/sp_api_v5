import * as StudentModel from "../models/student_model.js";
import bcrypt from "bcryptjs";

// Create a new student
export const createStudent = async (req, res) => {
  try {
    const newStudent = await StudentModel.createStudent(req.body);
    res.status(201).json({ message: "Student created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating new student", error: error.message });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

// Get a student by ID
export const getStudentById = async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await StudentModel.getStudentById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching student", error: error.message });
  }
};

// Update student information
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await StudentModel.updateStudent(id, req.body);
    res.status(200).json({ message: "Student updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
};

// Delete a student
export const deleteStudent = async (req, res) => {
  const { id } = req.body;
  try {
    await StudentModel.deleteStudent(id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting student", error: error.message });
  }
};

// Student login
export const studentLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const student = await StudentModel.findStudentByUsername(username);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const passwordMatch = await bcrypt.compare(password, student.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
};

// Update student username
export const updateStudentUsername = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  try {
    await StudentModel.updateStudentUsername(id, username);
    res.status(200).json({ message: "Student username updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating student username",
        error: error.message,
      });
  }
};

// Update student password
export const updateStudentPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    await StudentModel.updateStudentPassword(id, password);
    res.status(200).json({ message: "Student password updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating student password",
        error: error.message,
      });
  }
};