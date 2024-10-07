import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import bgImage from '../assets/bg.jpg'; // Đảm bảo đường dẫn đúng với ảnh của bạn

const Register: React.FC = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string; confirmPassword: string }) => {
    setIsButtonDisabled(true);
    // Giả lập quá trình đăng ký
    setTimeout(() => {
      console.log('Registered successfully:', values);
      setIsButtonDisabled(false);
      navigate('/homepage'); // Điều hướng về trang chủ sau khi đăng ký thành công
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
          <h2 className="text-xl md:text-2xl font-bold text-black mb-6 text-center">Sign Up</h2>
          <p className="text-center text-gray-600 mb-6">
            Create your account to start using our service.
          </p>

          {/* Register Form */}
          <Form name="register" onFinish={handleSubmit} layout="vertical">
            {/* Email Input */}
            <Form.Item
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
            >
              <Input
                placeholder="Email address"
                className="rounded-lg h-12 p-3 border-gray-300 bg-[#dde5db] text-[#7a7a7a] placeholder-[#7a7a7a] focus:border-blue-500 focus:bg-white"
              />
            </Form.Item>

            {/* Password Input */}
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

            {/* Confirm Password Input */}
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                className="rounded-lg h-12 p-3 border-gray-300 bg-[#dde5db] text-[#7a7a7a] placeholder-[#7a7a7a] focus:border-blue-500 focus:bg-white"
              />
            </Form.Item>

            {/* Agree to Terms and Conditions */}
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Please agree to the terms and conditions')),
                },
              ]}
            >
              <Checkbox className="text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-[#72876e] hover:text-[#91a089]">
                  terms and conditions
                </a>
              </Checkbox>
            </Form.Item>

            {/* Submit Button */}
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 rounded-md text-white bg-[#91a089] hover:bg-[#72876e] mb-4"
              loading={isButtonDisabled}
            >
              {isButtonDisabled ? 'Please wait...' : 'Sign Up'}
            </Button>

            <div className="text-center text-sm text-gray-500">
              Already have an account?{' '}
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

export default Register;
