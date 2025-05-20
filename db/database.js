// db/database.js

import Database from "better-sqlite3";

// Database connection initialization function (sync, not async)
const initializeDatabase = () => {
  try {
    const db = new Database("./student_profile.db", { verbose: console.log });
    console.log("Database connected successfully");
    return db;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

export default initializeDatabase;