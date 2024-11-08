import React, { useEffect, useState } from "react";
import { Button, Input, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {jwtDecode} from "jwt-decode";
import ApiService from "../services/axios";
import { login } from "../redux/authSlice";
import { FcGoogle } from "react-icons/fc";

const Login: React.FC = () => {
  const [isGoogleLogin, setIsGoogleLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Toggle between Google login and Tarot Reader login
  const toggleLoginMethod = () => {
    setIsGoogleLogin(!isGoogleLogin);
  };

  // Function to handle Google login
  const handleGoogleLogin = () => {
    try {
      window.location.href = "https://www.bookingtarot.somee.com/Auth/redirect";
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  // Call the API to fetch the token after Google login
  const fetchGoogleToken = async () => {
    try {
      const response = await ApiService.getToken();
      const token = response.token?.result;

      if (token) {
        const { userId, role } = decodeToken(token);

        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", role);

        dispatch(login({ token, userId, role }));
      } else {
        console.error("Failed to retrieve Google token.");
      }
    } catch (error) {
      console.error("Error fetching token", error);
    }
  };

  // Helper function to decode JWT token and extract userId and role
  const decodeToken = (token: string) => {
    try {
      const decodedToken: any = jwtDecode(token);
      return {
        userId: decodedToken.Id,
        role: decodedToken.Role,
      };
    } catch (error) {
      console.error("Failed to decode token", error);
      return { userId: null, role: null };
    }
  };

  useEffect(() => {
    fetchGoogleToken();
  }, []);

  const handleReaderLogin = async (values: any) => {
    const { email, password } = values;
    try {
      const response = await ApiService.loginTarotReader(email, password);
      if (response.success) {
        const token = response.token;
        const { userId, role } = decodeToken(token);

        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", role);

        if (userId) {
          dispatch(login({ token, userId, role }));
          navigate("/", { replace: true });
        }
      } else {
        console.error("Failed to log in as Tarot Reader. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in Tarot Reader", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 hidden md:flex items-center justify-center bg-[#E2F1E7]">
        <img
          src="/public/bgImage.jpg"
          alt="Illustration"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-[#edf3e8]">
        <div className="w-full max-w-sm bg-[#d9e6dc] rounded-lg shadow-lg p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-black mb-6 text-center">
            {isGoogleLogin ? "Login with Google" : "Login as Tarot Reader"}
          </h2>

          {isGoogleLogin ? (
            <>
              <Button
                type="primary"
                onClick={handleGoogleLogin}
                className="w-full h-12 rounded-md flex items-center justify-center text-white bg-[#91a089] hover:bg-[#72876e]"
              >
                <FcGoogle className="mr-2 text-lg" />
                Continue with Google
              </Button>
              <Button
                type="link"
                onClick={toggleLoginMethod}
                className="w-full text-center mt-4 text-blue-500 hover:text-blue-700 font-semibold"
              >
                Login as Tarot Reader instead
              </Button>
            </>
          ) : (
            <>
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
              <Button
                type="link"
                onClick={toggleLoginMethod}
                className="w-full text-center mt-4 text-blue-500 hover:text-blue-700 font-semibold"
              >
                Login with Google instead
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
