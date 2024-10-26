import React from "react";
import { Button } from "antd";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  // Function to handle Google login redirect
  const handleGoogleLogin = () => {
    try {
      // Redirect to Google login page
      window.location.href = "https://www.bookingtarot.somee.com/Auth/redirect";
    } catch (error) {
      console.error("Google login failed", error);
      toast.error("Failed to initiate Google login. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 hidden md:flex items-center justify-center bg-[E2F1E7]">
        <img
          src="/assets/bgImage.jpg"
          alt="Illustration"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-[#edf3e8]">
        <div className="w-full max-w-sm bg-[#d9e6dc] rounded-lg shadow-lg p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-black mb-6 text-center">
            Welcome, please login with Google
          </h2>
          <div className="flex flex-col gap-4 mb-6">
            {/* Google login button */}
            <Button
              type="primary"
              onClick={handleGoogleLogin}
              className="w-full h-12 rounded-md text-white bg-[#91a089] hover:bg-[#72876e]"
            >
              Continue with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
