import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
