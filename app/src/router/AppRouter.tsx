import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LayoutRoute from "../layout/LayoutRoute";
import { PUBLIC } from "../constants";
const BlogDetail = lazy(() => import("../pages/Blog/BlogDetail"));
const HomePage = lazy(() => import("../pages/HomePage"));
const Login = lazy(() => import("../pages/Login"));
const BlogPage = lazy(() => import("../pages/Blog/Blog"));
const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense>
        <Routes>
          {/* Redirect root to home page */}
          <Route path="/" element={<Navigate to="/homepage" />} />

          {/* Public Routes with MainLayout */}
          <Route element={<LayoutRoute />}>
            <Route path={PUBLIC.HOME} element={<HomePage />} />
            <Route path={PUBLIC.BLOG} element={<BlogPage />} />
            <Route path={PUBLIC.BLOG_DETAIL} element={<BlogDetail />} />
          </Route>
          <Route path={PUBLIC.LOGIN} element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
export default AppRouter;
