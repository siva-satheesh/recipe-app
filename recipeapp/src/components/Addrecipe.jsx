import React, { useState, useContext } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';
import { RecipeContext } from '../App';

function Addrecipe() {
  const { addRecipe } = useContext(RecipeContext);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    area: '',
    instructions: '',
    ingredients: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.name ||
        !formData.category ||
        !formData.area ||
        !formData.instructions ||
        !formData.ingredients
      ) {
        throw new Error('All fields are required.');
      }

      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('area', formData.area);
      data.append('instructions', formData.instructions);
      data.append('ingredients', formData.ingredients);
      let imageUploaded = false;
      if (image) {
        data.append('image', image);
        imageUploaded = true;
      }

      const response = await axios.post('http://localhost:5000/api/recipes/add', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 5000,
      });

      const baseUrl = 'http://localhost:5000';
      const newRecipe = {
        name: response.data.name,
        category: response.data.category,
        area: response.data.area,
        instructions: response.data.instructions,
        image: imageUploaded && response.data.image
          ? `${baseUrl}/${response.data.image}`
          : 'https://via.placeholder.com/140',
        ingredients: typeof response.data.ingredients === 'string'
          ? response.data.ingredients.split(',').map(i => i.trim()).filter(Boolean)
          : Array.isArray(response.data.ingredients)
          ? response.data.ingredients
          : [],
      };
      addRecipe(newRecipe);
      alert('Recipe added successfully!');
      setFormData({
        name: '',
        category: '',
        area: '',
        instructions: '',
        ingredients: '',
      });
      setImage(null);
      setImagePreview(null);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(
        `Failed to add recipe: ${error.response?.data?.message || error.message} (Status: ${error.response?.status || 'N/A'})`
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('https://images.pexels.com/photos/5591666/pexels-photo-5591666.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.27)',
          backdropFilter: 'blur(3px)',
          borderRadius: 2,
          boxShadow: 5,
          borderRadius: 3,
          p: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ color: '#fff', mb: 4, textShadow: '1px 1px 3px rgba(0, 0, 0, 0)' }}
          >
            Add New Recipe
          </Typography>
          {errorMessage && (
            <Typography
              color="error"
              sx={{ mb: 3, textAlign: 'center', fontWeight: 'medium' }}
            >
              {errorMessage}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Recipe Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#8B4513' },
                      '&:hover fieldset': { borderColor: '#8B4513' },
                      '&.Mui-focused fieldset': { borderColor: '#8B4513' },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#8B4513' },
                    backgroundColor: 'rgba(255, 255, 255, 0.37)',
                    borderRadius: 1,
                  }}
                />
                <TextField
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#8B4513' },
                      '&:hover fieldset': { borderColor: '#8B4513' },
                      '&.Mui-focused fieldset': { borderColor: '#8B4513' },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#8B4513' },
                    backgroundColor: 'rgba(255, 255, 255, 0.41)',
                    borderRadius: 1,
                  }}
                />
                <TextField
                  label="Area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#8B4513' },
                      '&:hover fieldset': { borderColor: '#8B4513' },
                      '&.Mui-focused fieldset': { borderColor: '#8B4513' },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#8B4513' },
                    backgroundColor: 'rgba(255, 255, 255, 0.32)',
                    borderRadius: 1,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  multiline
                  rows={4}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#8B4513' },
                      '&:hover fieldset': { borderColor: '#8B4513' },
                      '&.Mui-focused fieldset': { borderColor: '#8B4513' },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#8B4513' },
                    backgroundColor: 'rgba(255, 255, 255, 0.43)',
                    borderRadius: 1,
                  }}
                />
                <TextField
                  label="Ingredients (comma-separated)"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#8B4513' },
                      '&:hover fieldset': { borderColor: '#8B4513' },
                      '&.Mui-focused fieldset': { borderColor: '#8B4513' },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#8B4513' },
                    backgroundColor: 'rgba(255, 255, 255, 0.42)',
                    borderRadius: 1,
                  }}
                />
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<PhotoCamera />}
                    sx={{
                      background: 'linear-gradient(45deg,rgb(71, 46, 29),rgb(84, 47, 30))',
                      color: '#fff',
                      '&:hover': {
                        background: 'linear-gradient(45deg,rgb(61, 33, 20),rgb(65, 39, 21))',
                      },
                      textTransform: 'none',
                      padding: '8px 16px',
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                  {imagePreview && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Image Preview:
                      </Typography>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          boxShadow: 2,
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                background: 'linear-gradient(45deg,rgb(73, 51, 33),rgb(65, 40, 28))',
                color: '#fff',
                fontWeight: 'bold',
                padding: '12px',
                '&:hover': {
                  background: 'linear-gradient(45deg,rgb(87, 58, 48),rgb(79, 66, 57))',
                },
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: 3,
              }}
            >
              Add Recipe
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Addrecipe;