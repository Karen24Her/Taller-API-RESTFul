const mongoose = require('mongoose');

const ZooSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
});

module.exports = mongoose.model('Zoo', ZooSchema);
