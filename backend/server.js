const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/auth'); // New auth routes file

// Load environment variables from .env file
dotenv.config();

const app = express();

// Configure CORS
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:3000'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Middleware to parse JSON data
app.use(express.json());

// Serve the uploads folder for images
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));
console.log('Serving images from:', uploadsDir);

// Error handling for static file serving
app.use('/uploads', (err, req, res, next) => {
  console.error('Error serving static file:', err.message);
  res.status(500).json({ message: 'Error serving image', error: err.message });
});

// Use the recipe and auth routes for API endpoints
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes); // Add auth routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));