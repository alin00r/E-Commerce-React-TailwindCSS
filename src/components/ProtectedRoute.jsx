import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/authContext';
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/register" replace />;
}

export default ProtectedRoute;
