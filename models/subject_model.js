// models/subject_model.js

import initializeDatabase from "../db/database.js";

// Create a new subject
export const createSubject = (subjectData) => {
  const db = initializeDatabase();
  try {
    const {
      subject_code,
      subject_name,
      subject_units,
      subject_course,
      subject_studentyear,
      subject_studentsemester,
    } = subjectData;
    const stmt = db.prepare(
      "INSERT INTO subject (subject_code, subject_name, subject_units, subject_course, subject_studentyear, subject_studentsemester) VALUES (?, ?, ?, ?, ?, ?)"
    );
    const result = stmt.run(
      subject_code,
      subject_name,
      subject_units,
      subject_course,
      subject_studentyear,
      subject_studentsemester
    );

    // Get the created subject
    const createdSubject = db.prepare("SELECT * FROM subject WHERE id = ?").get(result.lastInsertRowid);
    return createdSubject;
  } finally {
    db.close();
  }
};

// Get all subjects
export const getAllSubjects = async () => {
  const db = initializeDatabase();
  try {
    const stmt = db.prepare("SELECT * FROM subject");
    const subjects = stmt.all();
    return subjects;
  } finally {
    db.close();
  }
};

// Get a subject by ID
export const getSubjectById = async (id) => {
  const db = initializeDatabase();
  try {
    const stmt = db.prepare("SELECT * FROM subject WHERE id = ?");
    const subject = stmt.get(id);
    return subject;
  } finally {
    db.close();
  }
};

// Update subject information
export const updateSubject = async (id, subjectData) => {
  const db = initializeDatabase();
  try {
    const {
      subject_code,
      subject_name,
      subject_units,
      subject_course,
      subject_studentyear,
      subject_studentsemester,
    } = subjectData;
    const stmt = db.prepare(
      "UPDATE subject SET subject_code = ?, subject_name = ?, subject_units = ?, subject_course = ?, subject_studentyear = ?, subject_studentsemester = ? WHERE id = ?"
    );
    const result = stmt.run(
      subject_code,
      subject_name,
      subject_units,
      subject_course,
      subject_studentyear,
      subject_studentsemester,
      id
    );
    return result;
  } finally {
    db.close();
  }
};

// Delete a subject
export const deleteSubject = async (id) => {
  const db = initializeDatabase();
  try {
    const stmt = db.prepare("DELETE FROM subject WHERE id = ?");
    const result = stmt.run(id);
    return result;
  } finally {
    db.close();
  }
};

// Add student grades
export const addStudentGrade = (student_id, subject_id, subject_grades) => {
  const db = initializeDatabase();
  try {
    const stmt = db.prepare(
      "INSERT INTO student_subject_grades (student_id, subject_id, subject_grades) VALUES (?, ?, ?)"
    );
    const result = stmt.run(student_id, subject_id, subject_grades);
    return result;
  } finally {
    db.close();
  }
};

// Update student grades
export const updateStudentGrade = async (
  subject_grades,
  student_id,
  subject_id
) => {
  const db = initializeDatabase();
  try {
    const stmt = db.prepare(
      "UPDATE student_subject_grades SET subject_grades = ? WHERE student_id = ? AND subject_id = ?"
    );
    const result = stmt.run(subject_grades, student_id, subject_id);
    if (result.changes === 0) {
      throw new Error(
        "No rows updated. Ensure the student_id and subject_id exist."
      );
    }
    return result;
  } finally {
    db.close();
  }
};

// Delete student grades
export const deleteStudentGrade = async (student_id, subject_id) => {
  const db = initializeDatabase();
  try {
    const stmt = db.prepare("DELETE FROM student_subject_grades WHERE student_id = ? AND subject_id = ?");
    const result = stmt.run(student_id, subject_id);
    return result;
  } finally {
    db.close();
  }
};

// View student grades
export const getStudentGrades = async (studentId) => {
  const db = initializeDatabase();
  try {
    const stmt = db.prepare(
      'SELECT s.id, s.subject_studentyear AS "Year Level", s.subject_studentsemester AS "Semester", s.subject_code AS "Subject Code", s.subject_name AS "Subject Name", s.subject_units AS "Subject Units", g.subject_grades AS "Subject Grades" FROM student_subject_grades g INNER JOIN subject s ON g.subject_id = s.id WHERE g.student_id = ?'
    );
    const grades = stmt.all(studentId);
    return grades;
  } finally {
    db.close();
  }
};
