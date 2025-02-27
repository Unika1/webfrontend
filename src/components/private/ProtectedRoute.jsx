import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const userToken = localStorage.getItem("userToken"); // Check if user is logged in

  return userToken ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;