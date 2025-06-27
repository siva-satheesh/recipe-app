import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const backgroundImages = [
  'https://images.pexels.com/photos/5591666/pexels-photo-5591666.jpeg',
  'https://images.pexels.com/photos/1907228/pexels-photo-1907228.jpeg',
  'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const cycleDuration = 3000; // 3 seconds per image
    const fadeDuration = 3000; // 1 second fade
    let isFadingOut = false;

    const timer = setInterval(() => {
      if (!isFadingOut) {
        setFade(false);
        isFadingOut = true;
      } else {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true);
        isFadingOut = false;
      }
    }, fadeDuration + (cycleDuration - fadeDuration) / 2);

    return () => clearInterval(timer);
  }, []);

  const nextImageIndex =
    currentImageIndex === backgroundImages.length - 1 ? 0 : currentImageIndex + 1;

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      overflow: 'hidden'
    }}>
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* Current Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: fade ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        />
        {/* Next Image (for smooth transition) */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${backgroundImages[nextImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: fade ? 0 : 1,
            transition: 'opacity 1s ease-in-out',
          }}
        />
        {/* Dark Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />
        {/* Content */}
        <Container
          maxWidth="md"
          sx={{
            position: 'relative',
            zIndex: 2,
            padding: { xs: '20px', md: '40px' },
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: { xs: '40px', sm: '60px', md: '90px' },
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              color: '#fff',
              lineHeight: 1.2,
            }}
          >
            crack, cook, enjoy
          </Typography>
          <Typography
            variant="h6"
            paragraph
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: { xs: '16px', sm: '20px', md: '28px' },
              mb: 4,
              textShadow: '1px 1px 3px #000',
              opacity: 0.9,
              color: '#fff',
            }}
          >
            Eggstraordinary flavors for any appetite
          </Typography>
          <Button
            component={Link}
            to="/list"
            variant="outlined"
            sx={{
              color: '#fff',
              borderColor: '#fff',
              borderRadius: '25px',
              padding: '8px 24px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: { xs: '14px', sm: '16px', md: '18px' },
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#fff',
                color: '#333',
                borderColor: '#fff',
              },
            }}
          >
            Explore More
          </Button>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: '#4e342e', color: 'white', textAlign: 'center', py: 2 }}>
        <Typography variant="body2">
          © 2025 Recipe App. Made with 💗 for flavor.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;