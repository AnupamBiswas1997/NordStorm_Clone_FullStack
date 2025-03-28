import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Private Route component
export function PrivateRoute({ children }) {
    const isAuthenticated = localStorage.getItem("UserName"); // Check if user is logged in
    return isAuthenticated ? children : <Navigate to="/login" />;
}
