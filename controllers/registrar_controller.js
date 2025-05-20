// controllers/registrar_controller.js
import * as RegistrarModel from "../models/registrar_model.js";
import bcrypt from "bcryptjs";

// Registrar login
export const registrarLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const registrar = await RegistrarModel.findRegistrarByUsername(username);
    if (!registrar) {
      return res.status(404).json({ message: "Registrar not found" });
    }
    const passwordMatch = await bcrypt.compare(password, registrar.password);
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

// Create a new registrar
export const createRegistrar = async (req, res) => {
  try {
    const newRegistrar = await RegistrarModel.createRegistrar(req.body);
    res.status(201).json({ message: "Registrar created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating new registrar", error: error.message });
  }
};

// Get all registrars
export const getAllRegistrars = async (req, res) => {
  try {
    const registrars = await RegistrarModel.getAllRegistrars();
    res.status(200).json(registrars);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching registrars", error: error.message });
  }
};

// View registrar personal info
export const viewRegistrarInfo = async (req, res) => {
  const registrarId = req.params.id;
  try {
    const registrar = await RegistrarModel.getRegistrarById(registrarId);
    if (!registrar) {
      return res.status(404).json({ message: "Registrar not found" });
    }
    res.status(200).json(registrar);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching registrar info", error: error.message });
  }
};

// Update registrar
export const updateRegistrar = async (req, res) => {
  const { id } = req.params;
  const { school_id, name, address, email_address, position } = req.body;
  try {
    await RegistrarModel.updateRegistrar(id, {
      school_id,
      name,
      address,
      email_address,
      position,
    });
    res
      .status(200)
      .json({ message: "Registrar information updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating registrar information",
      error: error.message,
    });
  }
};

// Update registrar username
export const updateRegistrarUsername = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  try {
    await RegistrarModel.updateRegistrarUsername(id, username);
    res
      .status(200)
      .json({ message: "Registrar username updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating registrar username",
      error: error.message,
    });
  }
};

// Update registrar password
export const updateRegistrarPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    await RegistrarModel.updateRegistrarPassword(id, password);
    res
      .status(200)
      .json({ message: "Registrar password updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating registrar password",
      error: error.message,
    });
  }
};

// Delete registrar
export const deleteRegistrar = async (req, res) => {
  const { id } = req.body;
  try {
    await RegistrarModel.deleteRegistrar(id);
    res.status(200).json({ message: "Registar deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting student", error: error.message });
  }
};
