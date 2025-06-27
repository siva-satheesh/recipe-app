import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import Recipecard from './Recipecard';
import { RecipeContext } from '../App';

function Recipelist() {
  const { recipes: contextRecipes, resetRecipes, deleteRecipe, toggleFavorite } = useContext(RecipeContext);
  const [apiRecipes, setApiRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizeRecipe = (recipe, source) => {
    if (source === 'api') {
      return {
        id: `api-${recipe.idMeal}`,
        name: recipe.strMeal || 'Unnamed Recipe',
        category: recipe.strCategory || 'Unknown',
        area: recipe.strArea || 'Unknown',
        instructions: recipe.strInstructions || '',
        image: recipe.strMealThumb || '',
        ingredients: [
          recipe.strIngredient1,
          recipe.strIngredient2,
          recipe.strIngredient3,
          recipe.strIngredient4,
          recipe.strIngredient5,
        ].filter(Boolean),
      };
    } else {
      return {
        id: recipe.id || `local-${recipe.name || 'unnamed'}-${Date.now()}`,
        name: recipe.name || 'Unnamed Recipe',
        category: recipe.category || 'Unknown',
        area: recipe.area || 'Unknown',
        instructions: recipe.instructions || '',
        image: recipe.image || '',
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
      };
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        const letters = ['a', 'b', 'c', 'p'];
        const apiCalls = letters.map(letter =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        );

        const responses = await Promise.all(apiCalls);
        let allApiMeals = [];
        responses.forEach(response => {
          const meals = response.data.meals || [];
          allApiMeals = [...allApiMeals, ...meals];
        });

        const normalizedApiMeals = allApiMeals
          .filter(meal => meal && meal.idMeal)
          .map(meal => normalizeRecipe(meal, 'api'));

        setApiRecipes(normalizedApiMeals);

        if (normalizedApiMeals.length === 0 && contextRecipes.length === 0) {
          setError('No recipes found for the specified letters.');
        }
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
        setError('Failed to load recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [contextRecipes]);

  const combinedRecipes = [
    ...contextRecipes.map(recipe => normalizeRecipe(recipe, 'local')),
    ...apiRecipes,
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('https://images.pexels.com/photos/5591666/pexels-photo-5591666.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        padding: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
            <Typography ml={2} color="#fff">
              Loading recipes...
            </Typography>
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : combinedRecipes.length === 0 ? (
          <Typography color="#fff">No recipes found.</Typography>
        ) : (
          <Grid container spacing={2}>
            {combinedRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <Recipecard recipe={recipe} toggleFavorite={toggleFavorite} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default Recipelist;