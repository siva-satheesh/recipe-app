import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function PrivateRoute({ children }) {
  const authData = JSON.parse(localStorage.getItem('recipeAppAuth'));

  // Check if authData exists, has loggedIn, and has a valid token
  const isAuthenticated = authData && authData.loggedIn && authData.token;

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;