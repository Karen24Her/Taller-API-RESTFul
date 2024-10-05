const Zoo = require('../models/zooModel');
const Animal = require('../models/animalModel');

// Obtener todos los zoológicos
exports.getZoos = async (req, res) => {
  try {
    const zoos = await Zoo.find().populate('animals');
    res.json(zoos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un zoológico
exports.createZoo = async (req, res) => {
  const zoo = new Zoo({
    name: req.body.name,
    location: req.body.location,
  });

  try {
    const newZoo = await zoo.save();
    res.status(201).json(newZoo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un zoológico
exports.updateZoo = async (req, res) => {
  try {
    const updatedZoo = await Zoo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedZoo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un zoológico
exports.deleteZoo = async (req, res) => {
  try {
    await Zoo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Zoo eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
