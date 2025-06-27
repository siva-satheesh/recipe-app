// File: recipeapp/src/components/About.jsx
import React from 'react';

const About = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("https://images.pexels.com/photos/5591666/pexels-photo-5591666.jpeg")', // Corrected line
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        padding: '2rem',
        color: 'white',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '2rem',
          borderRadius: '12px',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>About Our Recipe App</h1>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          Welcome to our <span style={{ color: '#FFEB3B' }}>Recipe App</span> – your ultimate destination for delicious and easy-to-make recipes! Whether you're a beginner or a seasoned kitchen expert, our app is designed to ignite your culinary creativity and bring global flavors to your table. Launched in 2025, TastyTreats was born from a passion for food and a desire to connect home cooks worldwide.
        </p>

        <h2 style={{ fontSize: '1.8rem', marginTop: '1.5rem' }}>Why Choose TastyTreats?</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '1.1rem' }}>
          <li>🌍 Discover thousands of recipes from arounf the world</li>
          <li>💖 Save your dishes for quick access anytime</li>
          <li>📋 Step-by-step instructions for beginners</li>
          <li>📸 Beautiful food photos to spark your cravings</li>
        </ul>

        <h2 style={{ fontSize: '1.8rem', marginTop: '1.5rem' }}>Our Mission</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          At TastyTreats, we aim to make cooking accessible, enjoyable, and sustainable. From quick weeknight dinners to elaborate holiday feasts, we provide tools like ingredient substitutions, nutritional info, and eco-friendly cooking tips to empower every chef.
        </p>

        <p style={{ marginTop: '1.5rem' }}>
          Ready to embark on a culinary adventure?{' '}
          <a href="/add" style={{ color: '#FFEB3B', fontWeight: 'bold', textDecoration: 'underline' }}>
            Add your own recipe
          </a>{' '}
          or start exploring today!
        </p>

        <p style={{ fontStyle: 'italic', marginTop: '2rem' }}>
          Made with ❤ by food lovers, for food lovers. Happy cooking!
        </p>
      </div>
    </div>
  );
};

export default About;
