import React from "react";
import { Button } from "antd";
import { authRedirect } from "../services/Api"; // Import the API for redirecting to Google
import bgImage from "../assets/bg.jpg"; // Ensure the correct path to your image
import { toast } from 'react-toastify';

const Login: React.FC = () => {
 

  // Function to handle Google Redirect
  const handleGoogleRedirect = async () => {
    try {
      const response = await authRedirect(); // Calling the /Auth/redirect API to redirect
      if (response) {
        // Assuming your API will handle the actual redirect to Google's login page
        toast.success("Redirecting to Google login...");
      }
    } catch (error) {
      toast.error("Failed to redirect to Google login");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side with Image */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-[E2F1E7]">
        <img
          src={bgImage}
          alt="Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Only Google Login */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-[#edf3e8]">
        <div className="w-full max-w-sm bg-[#d9e6dc] rounded-lg shadow-lg p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-black mb-6 text-center">
            Welcome, please login with Google
          </h2>

          <div className="flex flex-col gap-4 mb-6">
            {/* Custom Google Redirect Button */}
            <Button
              type="primary"
              onClick={handleGoogleRedirect}
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
