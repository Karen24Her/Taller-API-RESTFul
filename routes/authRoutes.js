const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {User} = require('../models/userModel');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 */

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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente y se ha generado el token JWT
 *       400:
 *         description: Error al registrar el usuario
 */
router.post('/users', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Crear el token JWT
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: 'Error al registrar el usuario', error: error.message });
    }
});

module.exports = router;
