// routes/registrar_routes.js

import express from 'express';
import * as RegistrarController from '../controllers/registrar_controller.js';
import { validateApiKey } from '../middleware/auth_middleware.js';

const router = express.Router();

// Registrar login
router.post('/login', RegistrarController.registrarLogin);

// Create new registrar
router.post('/newreg', validateApiKey, RegistrarController.createRegistrar);

// Get all registrars
router.get('/allreg', validateApiKey, RegistrarController.getAllRegistrars);

// View registrar personal info
router.get('/:id', validateApiKey, RegistrarController.viewRegistrarInfo);

// Update registrar information
router.put('/:id/info', validateApiKey, RegistrarController.updateRegistrar);

// Delete a registrar
router.delete('/delreg', validateApiKey, RegistrarController.deleteRegistrar);

// Update registrar username
router.put('/:id/username', validateApiKey, RegistrarController.updateRegistrarUsername);

// Update registrar password
router.put('/:id/password', validateApiKey, RegistrarController.updateRegistrarPassword);

export default router;