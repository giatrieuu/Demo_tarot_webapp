import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import CustomButton from "../components/CustomButton";
import { verifyEmail } from "../services/userServices";

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading");
  const hasFetched = useRef(false); // 🟢 Thêm useRef để ngăn gọi API nhiều lần

  useEffect(() => {
    if (hasFetched.current) return; // 🛑 Ngăn gọi API lần 2
    hasFetched.current = true; // ✅ Đánh dấu đã gọi API

    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    if (!userId || !token) {
      message.error("Invalid verification link.");
      setVerificationStatus("error");
      return;
    }

    verifyEmail(userId, token)
      .then(() => {
        setVerificationStatus("success");
        message.success("Email Verified Successfully!");
      })
      .catch(() => {
        setVerificationStatus("error");
        message.error("Verification failed. Please try again.");
      });
  }, [searchParams]); // 🛑 Chỉ chạy khi searchParams thay đổi

  return (
    <div className="relative flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6"
      style={{ backgroundImage: "url('/public/assets/bgTarot.jpg')" }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-md p-6 text-center">
        {verificationStatus === "loading" && (
          <>
            <h2 className="text-xl font-bold">Verifying your email...</h2>
            <p className="text-gray-600">Please wait while we confirm your email.</p>
          </>
        )}

        {verificationStatus === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600">✅ Email Verified Successfully!</h2>
            <p className="text-gray-600">You can now log in with your account.</p>
            <CustomButton text="Go to Login" onClick={() => navigate("/login")} className="w-full mt-4" />
          </>
        )}

        {verificationStatus === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600">❌ Verification Failed!</h2>
            <p className="text-gray-600">The verification link may have expired or is invalid.</p>
            <CustomButton text="Resend Verification Email" onClick={() => navigate("/resend-verification")} className="w-full mt-4" />
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
