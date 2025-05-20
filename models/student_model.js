// models/student_model.js

import initializeDatabase from "../db/database.js";
import bcrypt from "bcryptjs";

// Create a new student
export const createStudent = async (studentData) => {
  const db = await initializeDatabase();
  try {
    const {
      school_id,
      name,
      address,
      email_address,
      username,
      password,
      course,
    } = studentData;
    const hashedPassword = await bcrypt.hash(password, 12);
    const stmt = db.prepare(
      "INSERT INTO student (school_id, name, address, email_address, username, password, course) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    const result = stmt.run(
      school_id,
      name,
      address,
      email_address,
      username,
      hashedPassword,
      course
    );
    return result;
  } finally {
    db.close();
  }
};

// Get all students
export const getAllStudents = async () => {
  const db = await initializeDatabase();
  try {
    const stmt = db.prepare("SELECT * FROM student");
    const students = stmt.all();
    return students;
  } finally {
    db.close();
  }
};

// Get a student by ID
export const getStudentById = async (id) => {
  const db = await initializeDatabase();
  try {
    const stmt = db.prepare("SELECT * FROM student WHERE id = ?");
    const student = stmt.get(id);
    return student;
  } finally {
    db.close();
  }
};

// Update student information
export const updateStudent = async (id, studentData) => {
  const db = await initializeDatabase();
  try {
    const { school_id, name, address, email_address, course } = studentData;
    const stmt = db.prepare(
      "UPDATE student SET school_id = ?, name = ?, address = ?, email_address = ?, course = ? WHERE id = ?"
    );
    const result = stmt.run(school_id, name, address, email_address, course, id);
    return result;
  } finally {
    db.close();
  }
};

// Delete a student
export const deleteStudent = async (id) => {
  const db = await initializeDatabase();
  try {
    const stmt = db.prepare("DELETE FROM student WHERE id = ?");
    const result = stmt.run(id);
    return result;
  } finally {
    db.close();
  }
};

// Find a student by username
export const findStudentByUsername = async (username) => {
  const db = await initializeDatabase();
  try {
    const stmt = db.prepare("SELECT * FROM student WHERE username = ?");
    const student = stmt.get(username);
    return student;
  } finally {
    db.close();
  }
};

// Update student username
export const updateStudentUsername = async (id, newUsername) => {
  const db = await initializeDatabase();
  try {
    const stmt = db.prepare("UPDATE student SET username = ? WHERE id = ?");
    const result = stmt.run(newUsername, id);
    return result;
  } finally {
    db.close();
  }
};

// Update student password
export const updateStudentPassword = async (id, newPassword) => {
  const db = await initializeDatabase();
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const stmt = db.prepare("UPDATE student SET password = ? WHERE id = ?");
    const result = stmt.run(hashedPassword, id);
    return result;
  } finally {
    db.close();
  }
};
