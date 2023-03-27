const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  rating: Number,
  released: Date,
  backgroundImage: String,
  screenshots: [String],
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
