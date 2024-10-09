const express = require('express');
const { getZoos, createZoo, updateZoo, deleteZoo } = require('../controllers/zooController');
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
 * /api/zoos:
 *   post:
 *     summary: Crea un nuevo zoológico
 *     responses:
 *       201:
 *         description: Zoológico creado
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
 *     responses:
 *       200:
 *         description: Zoológico actualizado
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
 */
router.delete('/:id', auth, deleteZoo);

module.exports = router;
