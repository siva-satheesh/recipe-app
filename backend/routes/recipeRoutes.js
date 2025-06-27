// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Recipe = require('../models/Recipe');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Route to add a new recipe
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    // Debug log
    console.log('Received POST request at /add:', req.body, req.file);

    const { name, category, area, ingredients, instructions } = req.body;
    // Store only the relative path for the image
    const image = req.file ? `uploads/${req.file.filename}` : '';

    const newRecipe = new Recipe({
      name,
      category,
      area,
      ingredients: typeof ingredients === 'string'
        ? ingredients.split(',').map(i => i.trim()).filter(Boolean)
        : Array.isArray(ingredients)
        ? ingredients
        : [],
      instructions,
      image,
    });

    const savedRecipe = await newRecipe.save();
    console.log('Saved recipe with image:', savedRecipe); // Debug log
    res.status(201).json(savedRecipe); // Return the saved recipe object
  } catch (error) {
    console.error('Error in /add route:', error);
    res.status(500).json({ message: 'Error adding recipe', error: error.message });
  }
});

// Route to fetch all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
});

module.exports = router;