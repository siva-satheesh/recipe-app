import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';
import { RecipeContext } from '../App';

const Favorite = () => {
  const { favorites, toggleFavorite } = useContext(RecipeContext);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("https://images.pexels.com/photos/5591666/pexels-photo-5591666.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        padding: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}
      >
        Your Favorite Recipes
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="body1" sx={{ color: 'white' }}>
          No favorite recipes added yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card
                sx={{
                  height: '75',
                  width: '30%',
                  display: 'flex',
                  flexDirection: 'column',
                  backdropFilter: 'blur(5px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.34)',
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                <CardMedia
                  component="img"
                  height="230"
                  image={recipe.image || 'https://via.placeholder.com/200'}
                  alt={recipe.name}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: 150,
                    color: 'black',
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#888',
                      borderRadius: '4px',
                    },
                  }}
                >
                  <Typography variant="h6">{recipe.name}</Typography>
                  <Typography variant="body2">Category : {recipe.category}</Typography>
                  <Typography variant="body2">Area : {recipe.area}</Typography>
                  <Typography variant="body2">Instructions : {recipe.instructions || 'No instructions available'}</Typography>
                  <Typography variant="body2">Ingredients : {recipe.ingredients || 'No ingredients available'}</Typography>
                </CardContent>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => toggleFavorite(recipe)}
                  sx={{ m: 2 }}
                >
                  Remove from Favorites
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorite;