import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/Admin/AdminDashboard';
// Import các component hoặc page cần sử dụng

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
