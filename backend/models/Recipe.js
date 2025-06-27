const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  area: { type: String, required: true },
  ingredients: { type: [String], required: true }, // Array of strings
  instructions: { type: String, required: true },
  image: { type: String } // Path to the uploaded image
});

module.exports = mongoose.model('Recipe', recipeSchema);