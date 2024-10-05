const Animal = require('../models/animalModel');
const Zoo = require('../models/zooModel');

// Obtener todos los animales
exports.getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().populate('zoo');
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un animal
exports.createAnimal = async (req, res) => {
  const animal = new Animal({
    name: req.body.name,
    species: req.body.species,
    zoo: req.body.zoo, // Zoo al que pertenece el animal
  });

  try {
    const newAnimal = await animal.save();
    // Asociar el animal al zoológico
    const zoo = await Zoo.findById(req.body.zoo);
    zoo.animals.push(newAnimal._id);
    await zoo.save();
    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un animal
exports.updateAnimal = async (req, res) => {
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un animal
exports.deleteAnimal = async (req, res) => {
  try {
    await Animal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Animal eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
