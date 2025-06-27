import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { RecipeContext } from '../App';

function Searchrecipe() {
  const { recipes: contextRecipes } = useContext(RecipeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Context Recipes:', contextRecipes);
        console.log('Search Term:', searchTerm);

        const localRecipes = contextRecipes.filter(
          (recipe) =>
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.area.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const apiResponse = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        const apiRecipes = apiResponse.data.meals || [];

        const normalizedApiRecipes = apiRecipes.map((recipe) => ({
          id: recipe.idMeal,
          name: recipe.strMeal,
          category: recipe.strCategory || 'N/A',
          area: recipe.strArea || 'N/A',
          instructions: recipe.strInstructions || 'No instructions',
          image: recipe.strMealThumb || 'https://via.placeholder.com/300',
          ingredients: Array.from({ length: 20 }, (_, i) => {
            const ingredient = recipe[`strIngredient${i + 1}`];
            const measure = recipe[`strMeasure${i + 1}`];
            return ingredient && ingredient.trim() ? `${ingredient} - ${measure || 'N/A'}` : null;
          }).filter(Boolean),
        }));

        const normalizedLocalRecipes = localRecipes.map((recipe) => ({
          id: recipe.id,
          name: recipe.name,
          category: recipe.category || 'N/A',
          area: recipe.area || 'N/A',
          instructions: recipe.instructions || 'No instructions',
          image: recipe.image || 'https://via.placeholder.com/300',
          ingredients: recipe.ingredients || [],
        }));

        const combinedRecipes = [...normalizedLocalRecipes, ...normalizedApiRecipes];
        const uniqueRecipes = Array.from(
          new Map(combinedRecipes.map((recipe) => [recipe.name.toLowerCase(), recipe])).values()
        );

        console.log('Search Results:', uniqueRecipes);
        setSearchResults(uniqueRecipes);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm.trim()) {
      fetchRecipes();
    } else {
      setSearchResults([]); // Clear results when no search term
    }
  }, [searchTerm, contextRecipes]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term.');
      setSearchResults([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
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
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          background: 'rgba(255, 255, 255, 0)', // Ensure visibility over background
        }}
      >
        <Box sx={{ textAlign: 'center', paddingTop: 5, paddingBottom: 2 }}>
          <Typography
            variant="h3"
            mb={2}
            fontWeight="bold"
            color="#fff"
            sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
            Recipe Explorer
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 4,
            width: '100%',
            maxWidth: 800,
            padding: 2,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <TextField
            fullWidth
            label="Search recipes..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => {
              console.log('Search term changed:', e.target.value);
              setSearchTerm(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: '#8B4513' },
                "&:hover fieldset": { borderColor: '#8B4513' },
                "&.Mui-focused fieldset": { borderColor: '#8B4513' },
              },
              "& label.Mui-focused": { color: '#8B4513' },
              backgroundColor: 'rgba(255, 255, 255, 0.43)',
              borderRadius: 1,
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#4E342E',
              color: '#fff',
              fontWeight: 'bold',
              padding: '10px 20px',
              '&:hover': { backgroundColor: '#A0522D' },
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>

        {loading && (
          <Box display="flex" justifyContent="center" mb={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" mb={4}>
            {error}
          </Typography>
        )}

        {searchResults.length === 0 && !loading && !error && (
          <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
            No recipes found. Enter a search term to find recipes or add a new one!
          </Typography>
        )}

        <Grid container spacing={3} justifyContent="center">
          {searchResults.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card
                sx={{
                  height: 540,
                  width: 350,
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(255, 255, 255, 0.49)',
                  backdropFilter: 'blur(3px)',
                  boxShadow: 3,
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={recipe.image}
                  alt={recipe.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent
                  sx={{ flexGrow: 1, backgroundColor: 'transparent', p: 2 }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="#333">
                    {recipe.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Category: {recipe.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Area: {recipe.area}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="medium" mb={1} color="#444">
                    Ingredients:
                  </Typography>
                  <ul style={{ paddingLeft: 20, margin: 0 }}>
                    {recipe.ingredients.slice(0, 5).map((ingredient, i) => (
                      <li
                        key={i}
                        style={{ fontSize: '0.9rem', marginBottom: '4px', color: '#555' }}
                      >
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                  <Typography
                    variant="subtitle2"
                    fontWeight="medium"
                    mt={1}
                    mb={1}
                    color="#444"
                  >
                    Instructions:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      maxHeight: 80,
                      overflow: 'auto',
                      fontSize: '0.85rem',
                      color: '#555',
                    }}
                  >
                    {recipe.instructions}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ backgroundColor: '#4e342e', color: 'white', textAlign: 'center', py: 2 }}>
        <Typography variant="body2">
          © 2025 Recipe App. Made with 💗 for flavor.
        </Typography>
      </Box>
    </Box>
  );
}

export default Searchrecipe;