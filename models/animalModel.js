const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  zoo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zoo',
    required: true // Cada animal debe estar asociado a un zoológico
  }
});

module.exports = mongoose.model('Animal', animalSchema);
