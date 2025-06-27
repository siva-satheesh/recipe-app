import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Recipelist from './components/Recipelist';
import Searchrecipe from './components/Searchrecipe';
import Addrecipe from './components/Addrecipe';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import About from './components/About';
import Favorite from './components/Favourites'; // New import

export const RecipeContext = createContext();

const App = () => {
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('addedRecipes') || '[]');
    console.log('Initial recipes from localStorage:', savedRecipes);
    return savedRecipes;
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    console.log('Initial favorites from localStorage:', savedFavorites);
    return savedFavorites;
  });

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('recipeAppAuth'));
    if (auth?.loggedIn) {
      const currentToken = auth.token;
      const previousToken = localStorage.getItem('previousToken');
      if (currentToken !== previousToken) {
        setRecipes([]);
        setFavorites([]);
        localStorage.removeItem('addedRecipes');
        localStorage.removeItem('favorites');
        localStorage.setItem('previousToken', currentToken);
      }
    }
    console.log('Recipes updated in state:', recipes);
    localStorage.setItem('addedRecipes', JSON.stringify(recipes));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [recipes, favorites]);

  const deleteRecipe = (recipeId) => {
    console.log('Attempting to delete recipe with id:', recipeId);
    setRecipes((prev) => {
      const newRecipes = prev.filter((recipe) => recipe.id !== recipeId);
      console.log('Recipes after filter:', newRecipes);
      return newRecipes;
    });
  };

  const addRecipe = (newRecipe) => {
    const updatedRecipe = {
      id: `local-${newRecipe.name || 'unnamed'}-${Date.now()}`,
      name: newRecipe.name || 'Unnamed Recipe',
      category: newRecipe.category || 'Unknown',
      area: newRecipe.area || 'Unknown',
      instructions: newRecipe.instructions || '',
      image: newRecipe.image || '',
      ingredients: Array.isArray(newRecipe.ingredients)
        ? newRecipe.ingredients
        : typeof newRecipe.ingredients === 'string'
        ? newRecipe.ingredients.split(',').map((i) => i.trim()).filter(Boolean)
        : [],
    };
    setRecipes((prev) => [...prev, updatedRecipe]);
    console.log('Added new recipe:', updatedRecipe);
  };

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.id === recipe.id);
      if (isFavorite) {
        return prev.filter((fav) => fav.id !== recipe.id);
      } else {
        return [...prev, recipe];
      }
    });
    console.log('Favorites updated:', favorites);
  };

  const resetRecipes = () => {
    console.log('Resetting recipes...');
    setRecipes([]);
    setFavorites([]);
    localStorage.removeItem('addedRecipes');
    localStorage.removeItem('favorites');
    localStorage.removeItem('deletedRecipes');
  };

  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <RecipeContext.Provider
          value={{ recipes, setRecipes, addRecipe, deleteRecipe, resetRecipes, favorites, toggleFavorite }}
        >
          <Box sx={{ mt: '64px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/list"
                element={
                  <PrivateRoute>
                    <Recipelist />
                  </PrivateRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <PrivateRoute>
                    <Searchrecipe />
                  </PrivateRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <PrivateRoute>
                    <About />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add"
                element={
                  <PrivateRoute>
                    <Addrecipe />
                  </PrivateRoute>
                }
              />
              <Route
                path="/fav"
                element={
                  <PrivateRoute>
                    <Favorite />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Box>
        </RecipeContext.Provider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;