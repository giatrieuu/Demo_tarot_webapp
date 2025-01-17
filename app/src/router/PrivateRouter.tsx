import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    element: React.ComponentType;
    allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component, allowedRoles }) => {
    const userRole = localStorage.getItem('userRole');

    return userRole && allowedRoles.includes(userRole) ? <Component /> : <Navigate to="/homepage" />;
};

export default PrivateRoute;
