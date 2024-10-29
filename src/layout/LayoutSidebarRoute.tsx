import React from 'react';
import { Outlet } from 'react-router-dom';
import LayoutSidebar from './LayoutSidebar';


const LayoutSidebarRoute: React.FC = () => {
    return (
        <LayoutSidebar>
            <Outlet />
        </LayoutSidebar>
    );
};

export default LayoutSidebarRoute;
