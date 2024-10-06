import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutRoute from '../layout/LayoutRoute';
import { ADMIN, PUBLIC } from '../constants';
import HomePage from '../pages/HomePage';
import Register from '../pages/Register';

const AdminDashboard = lazy(() => import('../pages/Admin/AdminDashboard'));
const Login = lazy(() => import('../pages/Login'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));

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
                    <Route path={PUBLIC.LOGIN} element={<Login />} />
                    <Route path={PUBLIC.REGISTER} element={<Register />} />
                    <Route path={PUBLIC.FORGOT_PASSWORD} element={<ForgotPassword />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRouter;
