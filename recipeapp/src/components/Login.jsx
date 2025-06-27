import React, { useState, useContext } from 'react';
import { Box, Container, Typography, TextField, Button, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RecipeContext } from '../App';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setRecipes } = useContext(RecipeContext);

  if (typeof setRecipes !== 'function') {
    console.error('setRecipes is not a function in RecipeContext:', useContext(RecipeContext));
    setError('Internal application error. Please try again later.');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.setItem('recipeAppAuth', JSON.stringify({ loggedIn: true, token: response.data.token, user: response.data.user }));
      setRecipes([]);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed due to network or server issue');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://images.pexels.com/photos/1907228/pexels-photo-1907228.jpeg")', // Corrected line (as identified previously)
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        paddingTop: '64px',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.47)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: { xs: '20px', md: '30px' },
          borderRadius: '10px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: { xs: '32px', md: '40px' },
            fontWeight: 700,
            color: '#4E342E',
          }}
        >
          Login
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#4E342E',
              color: '#fff',
              borderRadius: '25px',
              padding: '10px 30px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#6D4C41',
              },
            }}
          >
            Login
          </Button>
        </form>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'Poppins, sans-serif', color: '#4E342E' }}
          >
            Don’t have an account? <Link to="/signup" style={{ color: '#ff6347' }}>Sign up</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;