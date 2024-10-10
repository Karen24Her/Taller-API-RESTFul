const express = require('express');
const { User } = require('../models/userModel');
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error al crear el usuario
 */

// Endpoint para crear un nuevo usuario
router.post('/users', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Se requieren username y password' });
        }
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }
        
        const newUser = new User({ username, password });
        await newUser.save();
        
        res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(400).json({ error: 'Error al crear el usuario', details: error.message });
    }
});

module.exports = router;
