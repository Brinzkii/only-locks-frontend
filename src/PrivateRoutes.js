import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
	return localStorage.token !== undefined ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
