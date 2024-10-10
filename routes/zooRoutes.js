const express = require('express');
const { getZoos, getZoo, createZoo, updateZoo, deleteZoo } = require('../controllers/zooController');
const auth = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * /api/zoos:
 *   get:
 *     summary: Obtiene todos los zoológicos
 *     responses:
 *       200:
 *         description: Lista de zoológicos
 */
router.get('/', auth, getZoos);

/**
 * @swagger
 * /api/zoos/{id}:
 *   get:
 *     summary: Obtiene un zoológico específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del zoológico
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del zoológico
 *       404:
 *         description: Zoológico no encontrado
 */
router.get('/:id', auth, getZoo);

/**
 * @swagger
 * /api/zoos:
 *   post:
 *     summary: Crea un nuevo zoológico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               geoExtension:
 *                 type: string
 *               animalCapacity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Zoológico creado
 *       400:
 *         description: Error en la creación del zoológico
 */
router.post('/', auth, createZoo);

/**
 * @swagger
 * /api/zoos/{id}:
 *   put:
 *     summary: Actualiza un zoológico existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del zoológico
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               geoExtension:
 *                 type: string
 *               animalCapacity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Zoológico actualizado
 *       404:
 *         description: Zoológico no encontrado
 */
router.put('/:id', auth, updateZoo);

/**
 * @swagger
 * /api/zoos/{id}:
 *   delete:
 *     summary: Elimina un zoológico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del zoológico
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zoológico eliminado
 *       404:
 *         description: Zoológico no encontrado
 */
router.delete('/:id', auth, deleteZoo);

module.exports = router;