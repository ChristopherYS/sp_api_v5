import initializeDatabase from "../db/database.js";
import bcrypt from "bcryptjs";

// Create a new registrar
export const createRegistrar = async (registrarData) => {
  const db = await initializeDatabase();
  try {
    const {
      school_id,
      name,
      address,
      email_address,
      position,
      username,
      password,
    } = registrarData;
    const hashedPassword = await bcrypt.hash(password, 12);
    const stmt = db.prepare(
      "INSERT INTO registrar (school_id, name, address, email_address, position, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    const result = stmt.run(
      school_id,
      name,
      address,
      email_address,
      position,
      username,
      hashedPassword
    );
    return result;
  } finally {
    db.close();
  }
};

// Get all registrars
export const getAllRegistrars = async () => {
  const db = await initializeDatabase();
  try {
    const stmt = db.prepare("SELECT * FROM registrar");
    const registrars = stmt.all();
    return registrars;
  } finally {
    db.close();
  }
};

// Find a registrar by username
export const findRegistrarByUsername = async (username) => {
  const db = await initializeDatabase();
  try {
    const stmt = db.prepare("SELECT * FROM registrar WHERE username = ?");
    const registrar = stmt.get(username);
    return registrar;
  } finally {
    db.close();
  }
};

// Update registrar
export const updateRegistrar = async (id, updatedFields) => {
  const db = await initializeDatabase();
  try {
    const { school_id, name, address, email_address, position } = updatedFields;
    const stmt = db.prepare(
      "UPDATE registrar SET school_id = ?, name = ?, address = ?, email_address = ?, position = ? WHERE id = ?"
    );
    const result = stmt.run(school_id, name, address, email_address, position, id);
    return result;
  } finally {
    db.close();
  }
};

// Update registrar username
export const updateRegistrarUsername = async (id, newUsername) => {
  const db = await initializeDatabase();
  try {
    const stmt = db.prepare("UPDATE registrar SET username = ? WHERE id = ?");
    const result = stmt.run(newUsername, id);
    return result;
  } finally {
    db.close();
  }
};

// Update registrar's password
export const updateRegistrarPassword = async (id, newPassword) => {
  const db = await initializeDatabase();
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const stmt = db.prepare("UPDATE registrar SET password = ? WHERE id = ?");
    const result = stmt.run(hashedPassword, id);
    return result;
  } finally {
    db.close();
  }
};

// View registrar info by ID
export const getRegistrarById = async (id) => {
  const db = await initializeDatabase();
  try {
    const stmt = db.prepare("SELECT * FROM registrar WHERE id = ?");
    const registrar = stmt.get(id);
    return registrar;
  } finally {
    db.close();
  }
};

// Delete a registrar
export const deleteRegistrar = async (id) => {
  const db = await initializeDatabase();
  try {
    const stmt = db.prepare("DELETE FROM registrar WHERE id = ?");
    const result = stmt.run(id);
    return result;
  } finally {
    db.close();
  }
};