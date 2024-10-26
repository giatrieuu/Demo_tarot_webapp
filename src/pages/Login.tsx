import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import { login } from "../redux/authSlice"; // Import the login action from your auth slice
import ApiService from "../services/axios"; // Import the ApiService
import { jwtDecode } from 'jwt-decode';


const Login: React.FC = () => {
  const [isReaderLogin, setIsReaderLogin] = useState(false); // State to toggle Tarot Reader login form
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const dispatch = useDispatch(); // Initialize the useDispatch hook

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
  // Function to decode the token and get the user ID
  const decodeToken = (token: string) => {
    try {
      const decodedToken: any = jwtDecode(token); // decode the token
      const userId = decodedToken.Id; // Access the 'Id' claim
      return userId; // or you can extract other fields like email, role, etc.
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  };

  // Example of using the function after logging in
  const handleReaderLogin = async (values: any) => {
    const { email, password } = values;
    try {
      const response = await ApiService.loginTarotReader(email, password);
      if (response.success) {
        toast.success(`Logged in successfully as Tarot Reader: ${email}`);
        const token = response.token;
        localStorage.setItem("authToken", token);

        // Decode the token to get the user ID
        const userId = decodeToken(token);
        console.log("Decoded User ID:", userId);

        // Use navigate to go to the dashboard and replace the current entry in the history
        navigate("/", { replace: true });
      } else {
        toast.error("Failed to log in as Tarot Reader. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in Tarot Reader", error);
      toast.error("Failed to log in as Tarot Reader. Please try again.");
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
            Welcome, please login with Google or as a Tarot Reader
          </h2>

          {/* Google login button */}
          <div className="flex flex-col gap-4 mb-6">
            <Button
              type="primary"
              onClick={handleGoogleLogin}
              className="w-full h-12 rounded-md text-white bg-[#91a089] hover:bg-[#72876e]"
            >
              Continue with Google
            </Button>
          </div>

          {/* Button to toggle Tarot Reader login form */}
          <div className="text-center">
            <Button
              type="default"
              className="w-full h-12 rounded-md bg-[#f1f1f1] hover:bg-[#d9d9d9]"
              onClick={() => setIsReaderLogin(!isReaderLogin)}
            >
              {isReaderLogin
                ? "Hide Tarot Reader Login"
                : "Login as Tarot Reader"}
            </Button>
          </div>

          {/* Tarot Reader login form */}
          {isReaderLogin && (
            <div className="mt-6">
              <Form layout="vertical" onFinish={handleReaderLogin}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                  ]}
                >
                  <Input placeholder="Enter email" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password!" },
                  ]}
                >
                  <Input.Password placeholder="Enter password" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full h-12 rounded-md text-white bg-[#91a089] hover:bg-[#72876e]"
                  >
                    Login as Tarot Reader
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
