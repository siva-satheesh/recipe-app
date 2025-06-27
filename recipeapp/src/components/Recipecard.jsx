import React, { useContext, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, IconButton } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { RecipeContext } from '../App';

function Recipecard({ recipe, toggleFavorite }) {
  const { deleteRecipe, recipes, favorites } = useContext(RecipeContext);
  const safeRecipe = recipe || {};

  const isLocalRecipe = safeRecipe.id && safeRecipe.id.startsWith('local-');
  const isFavorite = favorites.some((fav) => fav.id === safeRecipe.id);

  useEffect(() => {
    console.log('Recipecard mounted with recipe:', safeRecipe); // Debug data received
  }, [safeRecipe]);

  const handleDelete = () => {
    if (safeRecipe.id) {
      deleteRecipe(safeRecipe.id);
    } else {
      console.log('Cannot delete: Recipe id is missing:', safeRecipe);
      alert('Cannot delete: Recipe id is missing.');
    }
  };

  return (
    <Card
      sx={{
        width: 350, // Fixed width
        height: 600, // Fixed height
        boxShadow: 3,
        backgroundColor: 'rgba(203, 203, 203, 0.4)',
        backdropFilter: 'blur(3px)',
        borderRadius: 2,
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.02)' },
        display: 'flex',
        flexDirection: 'column', // Vertical layout
        overflow: 'hidden', // Prevent content overflow
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden', height: '200px', width: '350px' }}> {/* Fixed image container */}
        {safeRecipe.image ? (
          <CardMedia
            component="img"
            height="250" // Fixed height
            width="350" // Fixed width
            image={safeRecipe.image}
            alt={safeRecipe.name || 'Recipe Image'}
            sx={{ objectFit: 'cover' }} // Crop to fit while maintaining aspect ratio
            onError={(e) => {
              console.error('Image failed to load:', safeRecipe.image);
              e.target.src = 'https://via.placeholder.com/350x200'; // Matching placeholder
            }}
          />
        ) : (
          <Box
            sx={{
              height: '500px',
              width: '350px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No Image
            </Typography>
          </Box>
        )}
        <IconButton
          sx={{ position: 'absolute', top: 5, right: 5, color: '#d84315', zIndex: 1 }}
          onClick={() => toggleFavorite(safeRecipe)}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', fontSize: '1.1rem', mb: 1 }}>
            {safeRecipe.name || 'Unnamed Recipe'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem', mb: 1 }}>
            Category: {safeRecipe.category || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem', mb: 1 }}>
            Area: {safeRecipe.area || 'N/A'}
          </Typography>
        </Box>

        {/* Scrollable content area with adjusted height */}
        <Box
          sx={{
            maxHeight: '250px', // Adjusted to fit within 600px total
            overflowY: 'auto',
            flexGrow: 1,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', mt: 1 }}>
            <strong>Ingredients:</strong> {safeRecipe.ingredients ? safeRecipe.ingredients.join(', ') : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', mt: 1 }}>
            <strong>Instructions:</strong> {safeRecipe.instructions || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      {isLocalRecipe && (
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{
              textTransform: 'none',
              fontSize: '0.9rem',
              '&:hover': { backgroundColor: '#d32f2f',width: '10%' ,height: '10%'},
            }}
          >
            Delete
          </Button>
        </Box>
      )}
    </Card>
  );
}

export default Recipecard;