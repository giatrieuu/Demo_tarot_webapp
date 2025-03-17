import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom"; // Thêm navigate
import { getAuthToken } from "../services/userServices";
import { loginSuccess } from "../redux/authSlice";

import BannerSection from "../components/Homepage/BannerSection";
import BlogSection from "../components/Homepage/BlogSection";
import TarotReaderSection from "../components/Homepage/TarotReaderSection";
import TeamSection from "../components/Homepage/TeamSection";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const role = useSelector((state: RootState) => state.auth.role); 

  useEffect(() => {
    getAuthToken().then((data) => {
      if (data?.token?.result) {
        dispatch(loginSuccess(data.token.result));
        console.log("✅ Google Auth Token:", data.token.result);
      }
    });
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && role === "2" ) {
      navigate("/admin/overview"); 
    }
  }, [isLoggedIn, role, navigate]); 

  return (
    <div className="bg-white min-h-screen">
      <BannerSection />
      <TarotReaderSection />
      <BlogSection />
      <TeamSection />
    </div>
  );
};

export default HomePage;
