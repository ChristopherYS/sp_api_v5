// db/db_init.js

import initializeDatabase from "./database.js";

// Create database tables function
const createTables = async () => {
  const db = await initializeDatabase();
  try {
    // Registrar table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS registrar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        school_id TEXT UNIQUE,
        name TEXT,
        address TEXT,
        email_address TEXT UNIQUE,
        position TEXT,
        username VARCHAR(100) UNIQUE,
        password VARCHAR(255)
      )
    `);

    // Student table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS student (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        school_id TEXT UNIQUE,
        name TEXT,
        address TEXT,
        email_address TEXT UNIQUE,
        username VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        course TEXT
      )
    `);

    // Subject table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS subject (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_code TEXT UNIQUE,
        subject_name TEXT,
        subject_units INTEGER,
        subject_course TEXT,
        subject_studentyear INTEGER,
        subject_studentsemester INTEGER
      )
    `);

    // Student_Subject_Grades table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS student_subject_grades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        subject_id INTEGER,
        subject_grades REAL,
        FOREIGN KEY (student_id) REFERENCES student(id),
        FOREIGN KEY (subject_id) REFERENCES subject(id)
      )
    `);

    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    await db.close();
    console.log("Database connection closed");
  }
};

createTables();