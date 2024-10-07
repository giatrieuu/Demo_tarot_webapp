import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import bgImage from '../assets/bg.jpg'; // Đảm bảo đường dẫn đúng với ảnh của bạn

const ForgotPassword: React.FC = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string }) => {
    setIsButtonDisabled(true);
    // Giả lập quá trình gửi email khôi phục mật khẩu
    setTimeout(() => {
      console.log('Password reset email sent to:', values.email);
      setIsButtonDisabled(false);
      navigate('/login'); // Điều hướng về trang login sau khi gửi thành công
    }, 1000);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side with Image */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-[#e9f3ec]">
        <img src={bgImage} alt="Illustration" className="w-full h-full object-cover" />
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-[#edf3e8]">
        {/* Form Wrapper */}
        <div className="w-full max-w-sm bg-[#d9e6dc] rounded-lg shadow-lg p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-black mb-6 text-center">
            Forgot Password
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your email to receive a link to reset your password.
          </p>

          {/* Forgot Password Form */}
          <Form name="forgot_password" onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
            >
              <Input
                placeholder="Email address"
                className="rounded-lg h-12 p-3 border-gray-300 bg-[#dde5db] text-[#7a7a7a] placeholder-[#7a7a7a] focus:border-blue-500 focus:bg-white"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 rounded-md text-white bg-[#91a089] hover:bg-[#72876e] mb-4"
              loading={isButtonDisabled}
            >
              {isButtonDisabled ? 'Please wait...' : 'Send Reset Link'}
            </Button>

            <div className="text-center text-sm text-gray-500">
              Remember your password?{' '}
              <Link to="/login">
                <span className="text-[#72876e] hover:text-[#91a089]">Log in</span>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
