import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutRoute from "../layout/LayoutRoute";
import { ADMIN, PUBLIC } from "../constants";
import HomePage from "../pages/HomePage";


const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ListReaders = lazy(() => import("../pages/ListTarotReader"));
const ReaderDetail = lazy(() => import("../pages/ReaderDetail"));
const BlogPage = lazy(() => import("../pages/Blog"));
const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense>
        <Routes>
          <Route path={ADMIN.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          {/* Admin Routes with MainLayout */}
          <Route element={<LayoutRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path={PUBLIC.LIST_READERS} element={<ListReaders />} />
            <Route path={PUBLIC.BLOG} element={<BlogPage />} />
            <Route path={PUBLIC.READER_DETAIL} element={<ReaderDetail />} />
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
