import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Form, Input, Button, Divider, Checkbox } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import bgImage from '../assets/bg.jpg'; // Đảm bảo đường dẫn đúng với ảnh của bạn

const Login: React.FC = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      console.log('Logged in:', values);
      setIsButtonDisabled(false);
      navigate('/homepage');
    }, 1000);
  };

  const handleGoogleSuccess = (response: CredentialResponse) => {
    console.log('Google Login Successful:', response);
    // Xử lý đăng nhập thành công
    navigate('/homepage');
  };

  const handleGoogleFailure = () => {
    console.error('Google Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="flex h-screen">
        {/* Left Side with Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-[E2F1E7]">
          <img src={bgImage} alt="Illustration" className="w-full h-full object-cover" />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-[#edf3e8]">
          {/* Form Wrapper */}
          <div className="w-full max-w-sm bg-[#d9e6dc] rounded-lg shadow-lg p-8 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold text-black mb-6 text-center">Welcome back</h2>

            <div className="flex flex-col gap-4 mb-6">
              {/* Google Login Button */}
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                useOneTap
                text="continue_with"
                className="w-full flex justify-center rounded-lg h-12 bg-white border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-100 text-gray-700 font-medium"
              />
            </div>

            {/* Divider with Or */}
            <div className="relative flex items-center justify-center mb-6">
              <hr className="absolute w-full border-t border-gray-300" />
              <span className="bg-[#d9e6dc] px-2 text-sm text-gray-500 z-10">Or</span>
            </div>

            {/* Login Form */}
            <Form name="login" onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please enter your email!' }]}
              >
                <Input
                  placeholder="Email address"
                  className="rounded-lg h-12 p-3 border-gray-300 bg-[#dde5db] text-[#7a7a7a] placeholder-[#7a7a7a] focus:border-blue-500 focus:bg-white"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
              >
                <Input.Password
                  placeholder="Password"
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  className="rounded-lg h-12 p-3 border-gray-300 bg-[#dde5db] text-[#7a7a7a] placeholder-[#7a7a7a] focus:border-blue-500 focus:bg-white"
                />
              </Form.Item>

              <div className="flex items-center justify-between mb-4">
                <Checkbox className="text-gray-600">Remember me</Checkbox>
                <Button type="link" className="text-gray-500 text-sm" onClick={() => navigate('/forgot-password')}>
                  Forgot password?
                </Button>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 rounded-md text-white bg-[#91a089] hover:bg-[#72876e] mb-4"
                loading={isButtonDisabled}
              >
                {isButtonDisabled ? 'Please wait...' : 'Log In'}
              </Button>

              <div className="text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/register">
                  <span className="text-[#72876e] hover:text-[#91a089]">Sign up</span>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
