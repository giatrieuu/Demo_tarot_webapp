import React, { useEffect } from "react";
import { Button, Input, Form } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {jwtDecode} from "jwt-decode";
import ApiService from "../services/axios";
import { login } from "../redux/authSlice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle Google login
  const handleGoogleLogin = () => {
    try {
      window.location.href = "https://www.bookingtarot.somee.com/Auth/redirect";
    } catch (error) {
      console.error("Google login failed", error);
      toast.error("Failed to initiate Google login. Please try again.");
    }
  };

  // Call the API to fetch the token after Google login
  const fetchGoogleToken = async () => {
    try {
      const response = await ApiService.getToken();
      const token = response.token?.result;

      if (token) {
        // Decode token to extract user details and role
        const { userId, role } = decodeToken(token);

        // Store token and role in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", role);

        // Dispatch login action with token, userId, and role
        dispatch(login({ token, userId, role }));

        toast.success("Logged in successfully!");
      } else {
        toast.error("Failed to retrieve Google token.");
      }
    } catch (error) {
      console.error("Error fetching token", error);
      toast.error("Failed to retrieve token. Please try again.");
    }
  };

  // Helper function to decode JWT token and extract userId and role
  const decodeToken = (token: string) => {
    try {
      const decodedToken: any = jwtDecode(token);
      return {
        userId: decodedToken.Id, // Extract user ID from the token
        role: decodedToken.Role, // Extract role from the token
      };
    } catch (error) {
      console.error("Failed to decode token", error);
      return { userId: null, role: null };
    }
  };

  // Effect to trigger token fetching after redirect
  useEffect(() => {
    fetchGoogleToken();
  }, []); // Run once after component mounts

  const handleReaderLogin = async (values: any) => {
    const { email, password } = values;
    try {
      const response = await ApiService.loginTarotReader(email, password);
      if (response.success) {
        toast.success(`Logged in successfully as Tarot Reader: ${email}`);
        const token = response.token;
        
        const { userId, role } = decodeToken(token);

        // Store token and role in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", role);

        if (userId) {
          // Dispatch login action with token, userId, and role
          dispatch(login({ token, userId, role }));
          navigate("/", { replace: true });
        }
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

          <div className="flex flex-col gap-4 mb-6">
            <Button
              type="primary"
              onClick={handleGoogleLogin}
              className="w-full h-12 rounded-md text-white bg-[#91a089] hover:bg-[#72876e]"
            >
              Continue with Google
            </Button>
          </div>

          {/* Reader Login Form */}
          <Form layout="vertical" onFinish={handleReaderLogin}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
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
      </div>
    </div>
  );
};

export default Login;
