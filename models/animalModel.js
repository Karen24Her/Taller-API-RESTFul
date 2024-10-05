const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  zoo: { type: mongoose.Schema.Types.ObjectId, ref: 'Zoo', required: true }, // Relación con Zoo
});

module.exports = mongoose.model('Animal', AnimalSchema);
