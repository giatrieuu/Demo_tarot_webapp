import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LayoutRoute from "../layout/LayoutRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADMIN, PUBLIC, TAROT_READER } from "../constants";
import LayoutSidebarRoute from "../layout/LayoutSidebarRoute";

// Lazy-loaded pages
const HomePage = lazy(() => import("../pages/HomePage"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
const ListReaders = lazy(() => import("../pages/ListTarotReader"));
const ReaderDetail = lazy(() => import("../pages/ReaderDetail"));
const BlogPage = lazy(() => import("../pages/Blog/Blog"));
const BlogDetail = lazy(() => import("../pages/Blog/BlogDetail"));
const TarotReaderDashboard = lazy(() => import("../pages/Tarot-Reader/TarotReaderDashboard"));
const ManagerBooking = lazy(() => import("../pages/Tarot-Reader/CalendarPage"));
const PostManager = lazy(() => import("../pages/Tarot-Reader/PostManager"));
const NewPost = lazy(() => import("../pages/Tarot-Reader/NewPost"));
const CardDeckManager = lazy(() => import("../pages/Tarot-Reader/CardDeckManager"));
const CardDeckUpload = lazy(() => import("../pages/Tarot-Reader/CardDeckUpload"));
const CardDeckList = lazy(() => import("../pages/Tarot-Reader/CardDeckList"));
const Profile = lazy(() => import("../pages/Profile"));
const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const UserManagement = lazy(() => import("../pages/Admin/UserManagement"));
const TopicManagement = lazy(() => import("../pages/Admin/TopicManagement"));
const ShuffleCard = lazy(() => import("../pages/CardDrawGuide/ShuffleCard"));
const CardMeaning = lazy(() => import("../pages/CardDrawGuide/CardMeaning"));

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
            <Route path={PUBLIC.LIST_READERS} element={<ListReaders />} />
            <Route path={PUBLIC.READER_DETAIL} element={<ReaderDetail />} />
            <Route path={PUBLIC.BLOG} element={<BlogPage />} />
            <Route path={PUBLIC.BLOG_DETAIL} element={<BlogDetail />} />
            <Route path={PUBLIC.PROFILE} element={<Profile />} />
            <Route path={PUBLIC.CARD_DRAW} element={<ShuffleCard />} />
            <Route path={PUBLIC.CARD_MEANING} element={<CardMeaning />} />
          </Route>

          {/* Tarot Reader Routes with MainLayout */}
          <Route element={<LayoutSidebarRoute />}>
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD} element={<TarotReaderDashboard />} />
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_CALENDAR} element={<ManagerBooking />} />
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_POST} element={<PostManager />} />
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_ADD_POST} element={<NewPost />} />
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_CARD_DECK} element={<CardDeckManager />} />
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_CARD_DECK_UPLOAD} element={<CardDeckUpload />} />
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_CARD_LIST} element={<CardDeckList />} />
          </Route>

          {/* Admin Routes with MainLayout */}
          <Route element={<LayoutSidebarRoute />}>
            <Route path={ADMIN.ADMIN_DASHBOARD} element={<AdminDashboard />} />
            <Route path={ADMIN.USER_MANAGEMENT} element={<UserManagement />} />
            <Route path={ADMIN.TOPIC_MANAGEMENT} element={<TopicManagement />} />
          </Route>

          {/* Auth Routes with No Sidebar Layout */}
        
            <Route path={PUBLIC.LOGIN} element={<Login />} />
            <Route path={PUBLIC.REGISTER} element={<Register />} />
            <Route path={PUBLIC.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={PUBLIC.CHANGE_PASSWORD} element={<ChangePassword />} />
   
        </Routes>
      </Suspense>
      <ToastContainer />
    </Router>
  );
};

export default AppRouter;
