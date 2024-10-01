import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutRoute from '../layout/LayoutRoute';
import { ADMIN } from '../constants';
import HomePage from '../pages/HomePage';

const AdminDashboard = lazy(() => import('../pages/Admin/AdminDashboard'));

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Suspense>
                <Routes>
                    <Route path={ADMIN.ADMIN_DASHBOARD} element={<AdminDashboard />} />
                    {/* Admin Routes with MainLayout */}
                    <Route element={<LayoutRoute />}>
                        <Route path="/" element={<HomePage />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRouter;
