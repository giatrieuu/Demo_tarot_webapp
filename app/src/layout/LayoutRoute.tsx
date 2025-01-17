import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

const LayoutRoute: React.FC = () => {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
};

export default LayoutRoute;
