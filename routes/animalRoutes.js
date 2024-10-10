const express = require('express');
const { getAnimals, getAnimalById, createAnimal, updateAnimal, deleteAnimal } = require('../controllers/animalController');
const auth = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * /api/animals:
 *   get:
 *     summary: Obtiene todos los animales
 *     responses:
 *       200:
 *         description: Lista de todos los animales
 */
router.get('/', auth, getAnimals);

/**
 * @swagger
 * /api/animals/{id}:
 *   get:
 *     summary: Obtiene un animal por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del animal
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del animal
 *       404:
 *         description: Animal no encontrado
 */
router.get('/:id', auth, getAnimalById);

/**
 * @swagger
 * /api/animals:
 *   post:
 *     summary: Crea un nuevo animal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               zoo:
 *                 type: string
 *             required:
 *               - name
 *               - species
 *               - zoo
 *     responses:
 *       201:
 *         description: Animal creado
 */
router.post('/', auth, createAnimal);

/**
 * @swagger
 * /api/animals/{id}:
 *   put:
 *     summary: Actualiza un animal existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del animal
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
 *               species:
 *                 type: string
 *               zoo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Animal actualizado
 *       404:
 *         description: Animal no encontrado
 */
router.put('/:id', auth, updateAnimal);

/**
 * @swagger
 * /api/animals/{id}:
 *   delete:
 *     summary: Elimina un animal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del animal
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Animal eliminado
 *       404:
 *         description: Animal no encontrado
 */
router.delete('/:id', auth, deleteAnimal);

module.exports = router;