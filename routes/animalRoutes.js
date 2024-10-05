const express = require('express');
const { getAnimals, createAnimal, updateAnimal, deleteAnimal } = require('../controllers/animalController');
const auth = require('../middlewares/auth');  
const router = express.Router();

router.get('/', auth, getAnimals);  
router.post('/', auth, createAnimal);  
router.put('/:id', auth, updateAnimal);  
router.delete('/:id', auth, deleteAnimal);  

module.exports = router;
