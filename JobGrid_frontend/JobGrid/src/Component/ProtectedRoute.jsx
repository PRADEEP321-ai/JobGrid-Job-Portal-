import React from "react";
import {  Navigate } from "react-router-dom";

// Use it like:
// <ProtectedRoute allowedRole="ADMIN"> <AdminDashboard /> </ProtectedRoute>
const ProtectedRoute = ({ allowedRole, children }) => {
  // get saved user from browser
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  // not logged in -> go to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // logged in but wrong role -> go to login page
  // (example: candidate tries to open /admin/dashboard)
  if (user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  // everything ok -> show the page
  return children;
};

export default ProtectedRoute;