import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import forkLogo from '../image/forkimage-removebg-preview.png'; // Import your local image

const navButtonStyle = {
  color: '#fff',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 500,
  fontSize: '13px', // Reduced font size
  textTransform: 'capitalize',
  mx: 0.5, // Reduced margin
  '&:hover': {
    color: '#ff6347',
  },
  position: 'relative', // For underline positioning
};

const activeNavButtonStyle = {
  ...navButtonStyle,
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '2px',
    bottom: '-8px',
    left: 0,
    backgroundColor: '#fff',
    transition: 'all 0.8s ease',
  },
};

const addRecipeButtonStyle = {
  color: '#fff',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 500,
  fontSize: '13px', // Reduced font size
  textTransform: 'capitalize',
  border: '2px solid #fff',
  borderRadius: '20px',
  px: 2,
  py: 0.5,
  mx: 0.5, // Reduced margin
  '&:hover': {
    backgroundColor: '#fff',
    color: '#4E342E',
  },
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // To detect the current route
  const auth = JSON.parse(localStorage.getItem('recipeAppAuth'));

  const handleLogout = () => {
    localStorage.removeItem('recipeAppAuth');
    localStorage.removeItem('previousToken'); // Clear previous token to reset recipe state
    navigate('/login');
  };

  // Define paths for active underline
  const getIsActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="fixed"
      elevation={3}
      sx={{
        backgroundColor: '#4E342E',
        color: '#333',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '64px' }}>
        {/* Left Side: Logo, User Details, and Navigation Links */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Cross Fork Logo Placeholder - Replace with your logo URL or SVG */}
          
          {auth?.loggedIn && (
            <Typography
              sx={{
                color: '#fff',
                mx: 2,
                fontFamily: '"Great Vibes", cursive', // Stylish font
                fontSize: '14px', // Adjusted size for readability
                letterSpacing: '0.5px',
              }}
            >
              Welcome, {auth.user?.username || 'User'}
            </Typography>
          )}
          <Button
            component={Link}
            to="/"
            sx={getIsActive('/') ? activeNavButtonStyle : navButtonStyle}
          >
            Home
          </Button>
          {auth?.loggedIn ? (
            <>
              
              <Button
                component={Link}
                to="/search"
                sx={getIsActive('/search') ? activeNavButtonStyle : navButtonStyle}
              >
                Search Recipe
              </Button>
                <Button
                component={Link}
                to="/fav"
                sx={getIsActive('/fav') ? activeNavButtonStyle : navButtonStyle}
              >
                Favourites
              </Button>
              <Button
                component={Link}
                to="/about"
                sx={getIsActive('/about') ? activeNavButtonStyle : navButtonStyle}
              >
                About
              </Button>
              <Button
                onClick={handleLogout}
                sx={getIsActive('/login') ? activeNavButtonStyle : navButtonStyle}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={getIsActive('/login') ? activeNavButtonStyle : navButtonStyle}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                sx={getIsActive('/signup') ? activeNavButtonStyle : navButtonStyle}
              >
                Signup
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontFamily: 'Playfair Display, serif',
              letterSpacing: 2,
              color: '#fff',
              textTransform: 'uppercase',
              fontSize: '22px',
              mr: 1, // Margin to separate text from logo
            }}
          >
            RECIPE
          </Typography>
          <Box
            component="img"
            src={forkLogo} // Use the imported local image
            alt="Fork Logo"
            sx={{ width: 35, height: 35 }}
          />
        </Box>

        {/* Right Side: Add Recipe Button (only for logged-in users) */}
        <Box>
          {auth?.loggedIn && (
            <Button
              component={Link}
              to="/add"
              sx={getIsActive('/add') ? activeNavButtonStyle : addRecipeButtonStyle}
            >
              Add Recipe
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;