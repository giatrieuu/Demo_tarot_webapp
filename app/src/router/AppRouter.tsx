import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from "react-router-dom";

import LayoutRoute from "../layout/LayoutRoute";
import { ADMIN, PUBLIC, TAROT_READER, USER } from "../constants";

import Main from "../pages/Tarot-reader-dashboard/layout/main-dashboard/Main";
import Profile from "../pages/Tarot-reader-dashboard/pages/profile/myProfile";
import Booking from "../pages/Tarot-reader-dashboard/pages/Booking/Booking";
import Order from "../pages/Tarot-reader-dashboard/pages/Order/Order";
import Overview from "../pages/Tarot-reader-dashboard/pages/Overview/Overview";
import AdminMain from "../pages/Admin-dashboard/layout/main-dashboard/Main";
import AdminOverview from "../pages/Admin-dashboard/pages/overview/AdminOverview";
import TarotReadersList from "../pages/Admin-dashboard/pages/services/TarotReaders/TarotReadersList";
import PostList from "../pages/Admin-dashboard/pages/services/PostManagement/PostList";
import SignUp from "../pages/SignUp";
import VerifySuccess from "../pages/VerifySuccess";
import CreateTimeToBook from "../pages/Tarot-reader-dashboard/pages/CreateTimeToBook/CreateTimeToBook";
import MyBooking from "../pages/User-Booking/MyBooking";

import VideoCall from "../pages/VideoCall";
import Videocall from "../pages/VideoCall";


const BlogDetail = lazy(() => import("../pages/Blog/BlogDetail"));
const HomePage = lazy(() => import("../pages/HomePage"));
const Login = lazy(() => import("../pages/Login"));
const BlogPage = lazy(() => import("../pages/Blog/Blog"));
const ListTarotReader = lazy(() => import("../pages/Tarot-reader-page/ListTarotReader"));
const ReaderDetail = lazy(() => import("../pages/Tarot-reader-page/TarotReaderDetail"));


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
            <Route path={PUBLIC.LIST_READERS} element={<ListTarotReader />} />
            <Route path={PUBLIC.READER_DETAIL} element={<ReaderDetail />} />
            <Route path={USER.MYBOOKING} element={<MyBooking />} />

          </Route>

          {/* Tarot Reader Dashboard */}
          <Route element={<Main />}>
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_PROFILE} element={<Profile />} />
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_CALENDAR} element={<Booking />} />
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_CREATE_TIME} element={<CreateTimeToBook />} />
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_ORDERS} element={<Order />} />
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_OVERVIEW} element={<Overview />} />
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_BLOG} element={<PostList />} />
       
          </Route>

          {/* Admin Dashboard */}
          <Route element={<AdminMain />}>
            <Route path={ADMIN.ADMIN_DASHBOARD} element={<AdminOverview />} />
            <Route path={ADMIN.TAROTREADER_MANAGEMENT} element={<TarotReadersList />} />
          </Route>

          {/* Authentication */}
          <Route path={PUBLIC.LOGIN} element={<Login />} />
          <Route path={PUBLIC.REGISTER} element={<SignUp />} />
          <Route path={PUBLIC.VERIFY} element={<VerifySuccess />} />
          <Route path={PUBLIC.VIDEO_CALL} element={<Videocall />} />
          {/* ✅ Route cho Video Call */}
        
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
