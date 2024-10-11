const express = require('express');
const Animal = require('../models/animalModel');
const Zoo = require('../models/zooModel'); // Importar el modelo de Zoo
const authMiddleware = require('../middlewares/auth'); // Middleware de autenticación JWT

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Animal:
 *       type: object
 *       required:
 *         - name
 *         - species
 *         - zoo
 *       properties:
 *         name:
 *           type: string
 *           description: El nombre del animal
 *         species:
 *           type: string
 *           description: La especie del animal
 *         zoo:
 *           type: string
 *           description: El ID del zoológico al que pertenece
 */

/**
 * @swagger
 * /api/animals:
 *   post:
 *     summary: Crear un nuevo animal asociado a un zoológico
 *     tags: [Animales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       201:
 *         description: Animal creado exitosamente
 *       400:
 *         description: Error al crear el animal
 */
router.post('/', authMiddleware, async (req, res) => {
    const { name, species, zoo } = req.body;

    try {
        // Verificar si el zoológico existe
        const foundZoo = await Zoo.findById(zoo);
        if (!foundZoo) {
            return res.status(404).json({ message: 'Zoológico no encontrado' });
        }

        // Crear el nuevo animal asociado al zoológico
        const newAnimal = new Animal({
            name,
            species,
            zoo: foundZoo._id
        });

        await newAnimal.save();

        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el animal', error: error.message });
    }
});

/**
 * @swagger
 * /animals:
 *   get:
 *     summary: Obtener todos los animales
 *     tags: [Animales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los animales
 *       500:
 *         description: Error al obtener los animales
 */
router.get('/', authMiddleware, async (req, res) => {
    try {
        // Obtener todos los animales y popular el zoológico asociado
        const animals = await Animal.find().populate('zoo', 'name location');
        res.json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los animales', error: error.message });
    }
});

/**
 * @swagger
 * /animals/{id}:
 *   get:
 *     summary: Obtener un animal por ID
 *     tags: [Animales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del animal
 *     responses:
 *       200:
 *         description: Animal encontrado
 *       404:
 *         description: Animal no encontrado
 *       500:
 *         description: Error al obtener el animal
 */
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        // Obtener un animal por su ID y popular el zoológico asociado
        const animal = await Animal.findById(req.params.id).populate('zoo', 'name location');
        if (!animal) {
            return res.status(404).json({ message: 'Animal no encontrado' });
        }
        res.json(animal);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el animal', error: error.message });
    }
});

/**
 * @swagger
 * /animals/{id}:
 *   put:
 *     summary: Actualizar un animal por ID
 *     tags: [Animales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del animal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       200:
 *         description: Animal actualizado
 *       404:
 *         description: Animal no encontrado
 *       400:
 *         description: Error al actualizar el animal
 */
router.put('/:id', authMiddleware, async (req, res) => {
    const { name, species, zooId } = req.body;

    try {
        // Verificar si el zoológico existe
        const zoo = await Zoo.findById(zooId);
        if (!zoo) {
            return res.status(404).json({ message: 'Zoológico no encontrado' });
        }

        // Actualizar el animal
        const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, {
            name,
            species,
            zoo: zooId
        }, { new: true });

        if (!updatedAnimal) {
            return res.status(404).json({ message: 'Animal no encontrado' });
        }

        res.json(updatedAnimal);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el animal', error: error.message });
    }
});

/**
 * @swagger
 * /animals/{id}:
 *   delete:
 *     summary: Eliminar un animal por ID
 *     tags: [Animales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del animal
 *     responses:
 *       200:
 *         description: Animal eliminado exitosamente
 *       404:
 *         description: Animal no encontrado
 *       500:
 *         description: Error al eliminar el animal
 */
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
        if (!deletedAnimal) {
            return res.status(404).json({ message: 'Animal no encontrado' });
        }
        res.json({ message: 'Animal eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el animal', error: error.message });
    }
});

module.exports = router;
