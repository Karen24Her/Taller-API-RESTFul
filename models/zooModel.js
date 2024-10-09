const mongoose = require('mongoose');

const zooSchema = new mongoose.Schema({
  name: String,
  location: String,
  geoExtension: String,  // Extensión geográfica
  animalCapacity: Number // Capacidad de animales
});

module.exports = mongoose.model('Zoo', zooSchema);
