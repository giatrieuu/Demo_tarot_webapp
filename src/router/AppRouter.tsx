import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutRoute from "../layout/LayoutRoute";
import { ADMIN, PUBLIC, TAROT_READER } from "../constants";
import HomePage from "../pages/HomePage";
import TarotReaderDashboard from "../pages/Tarot-Reader/TarotReaderDashboard";



const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const UserManagement = lazy(() => import("../pages/Admin/UserManagement"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ListReaders = lazy(() => import("../pages/ListTarotReader"));
const ReaderDetail = lazy(() => import("../pages/ReaderDetail"));
const BlogPage = lazy(() => import("../pages/Blog"));
const CalendarPage = lazy(() => import("../pages/Tarot-Reader/CalendarPage"));
const PostManager = lazy(() => import("../pages/Tarot-Reader/PostManager"));
const Profile = lazy(() => import("../pages/Profile"));
const NewPost = lazy(() => import("../pages/Tarot-Reader/NewPost"));
const CardDrawGuide = lazy(() => import("../pages/CardDrawGuide/CardDrawGuide"));

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense>
        <Routes>
          <Route path={ADMIN.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          <Route path={ADMIN.USER_MANAGEMENT} element={<UserManagement />} />

          <Route element={<LayoutRoute />}>
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD} element={<TarotReaderDashboard />} />
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_CALENDAR} element={<CalendarPage />} />
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_POST} element={<PostManager />} />
            <Route path={TAROT_READER.TAROT_READER_DASHBOARD_ADD_POST} element={<NewPost />} />


          </Route>
          {/* Admin Routes with MainLayout */}
          <Route element={<LayoutRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path={PUBLIC.LIST_READERS} element={<ListReaders />} />
            <Route path={PUBLIC.BLOG} element={<BlogPage />} />
            <Route path={PUBLIC.READER_DETAIL} element={<ReaderDetail />} />
            <Route path={PUBLIC.PROFILE} element={<Profile />} />
            <Route path={PUBLIC.CARD_DRAW_GUIDE} element={<CardDrawGuide />} />
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
