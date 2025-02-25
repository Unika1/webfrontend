import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// ProtectedRoute component accepts a `role` prop to restrict access based on user role.
const ProtectedRoute = ({ element, adminOnly, ...rest }) => {
  // Get the user from localStorage or use a state management system like Redux
  const user = JSON.parse(localStorage.getItem("user")); // Adjust based on your authentication flow

  // Check if the user is logged in and if the route requires admin privileges
  const isAuthenticated = user && user.token;
  const isAdmin = user && user.role === 'admin'; // Adjust if your user object has a `role` property

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    // If the route is admin-only and the user is not an admin, redirect to homepage or another page
    return <Navigate to="/homepage" />;
  }

  // Render the protected route if conditions are met
  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
