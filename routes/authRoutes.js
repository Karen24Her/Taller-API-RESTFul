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
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(400).send({ error: 'Error al crear el usuario' });
    }
});


// Endpoint para crear un nuevo post
router.post('/posts', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).send(newPost);
});

module.exports = router;
