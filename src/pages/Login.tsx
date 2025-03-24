import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, message, Modal } from "antd";
import { forgotPassword, loginTarotReader, loginUser } from "../services/userServices";
import bgVideo from "/assets/home.mp4";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";



const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginType, setLoginType] = useState<"guest" | "reader">("guest");
  const [forgotModalVisible, setForgotModalVisible] = useState(false);

  // ✅ Schema Form Validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(1, "Password must be at least 1 character")
      .required("Password is required"),
  });

  // 🟢 API Login Tarot Reader
  const handleSubmit = (
    values: { email: string; password: string },
    actions: any
  ) => {
    loginTarotReader(values)
      .then((data) => {
        if (data?.token) {
          dispatch(loginSuccess(data.token));
          message.success("Login successful!");
          navigate("/tarot-reader/overview");
        } else {
          message.error("Login failed. Please check your credentials.");
        }
      })
      .catch(() => {
        message.error("Invalid email or password.");
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };
  const handleSubmitGuestLogin = (
    values: { email: string; password: string },
    actions: any
  ) => {
    loginUser(values)
      .then((data) => {
        if (data?.token) {
          dispatch(loginSuccess(data.token));
          message.success("Guest Login successful!");
          navigate("/homepage"); 
        } else {
          message.error("Login failed. Please check your credentials.");
        }
      })
      .catch(() => {
        message.error("Invalid email or password.");
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const handleGuestLogin = () => {
    window.location.href = "https://www.bookingtarot.somee.com/Auth/redirect";
  };


  const handleForgotPassword = () => {
    setForgotModalVisible(true);
  };

  const handleSendResetEmail = (email: string) => {
    forgotPassword(email)
      .then(() => {
        message.success(`Đã gửi mật khẩu mới tới email: ${email}`);
        setForgotModalVisible(false);
      })
      .catch(() => {
        message.error("Không thể gửi email. Vui lòng thử lại.");
      });
  };
  

  return (
    <div className="relative flex h-screen items-center justify-center">
      {/* 🌟 Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={bgVideo}
        autoPlay
        loop
        muted
      />

      {/* 📂 Form Container */}
      <div className="relative z-10 w-full max-w-sm bg-white bg-opacity-90 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>

        {/* 🟠 Login Option Switch (Guest trước) */}
        <div className="flex justify-center items-center mb-4 space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="guest"
              checked={loginType === "guest"}
              onChange={() => setLoginType("guest")}
            />
            <span>Guest</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="reader"
              checked={loginType === "reader"}
              onChange={() => setLoginType("reader")}
            />
            <span>Tarot Reader</span>
          </label>
        </div>

        {/* 🟢 Guest Login Form */}
        {loginType === "guest" && (
          <>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmitGuestLogin} // 🟢 Sử dụng hàm mới
            >
              {({ isSubmitting }) => (
                <Form className="w-full">
                  {/* 📧 Email Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Field
                      name="email"
                      as={Input}
                      type="email"
                      placeholder="Enter email"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* 🔑 Password Field */}
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Field
                      name="password"
                      as={Input.Password}
                      placeholder="Enter password"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* 🟠 Forgot Password */}
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className="text-sm text-blue-500 hover:underline cursor-pointer"
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </span>
                  </div>

                  {/* 🟢 Login Button */}
                  <CustomButton
                    text="Login"
                    htmlType="submit"
                    className="w-full mb-3"
                    disabled={isSubmitting}
                  />
                  <CustomButton
                    text="Login with Google"
                    onClick={handleGuestLogin}
                    className="w-full"
                  />
                </Form>
              )}
            </Formik>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">
                Bạn chưa có tài khoản?
              </span>{" "}
              <span
                className="text-sm text-blue-500 hover:underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Đăng ký ngay
              </span>
            </div>
          </>
        )}

        {/* 🟡 Tarot Reader Login Form */}
        {loginType === "reader" && (
          <>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="w-full">
                  {/* 📧 Email Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Field
                      name="email"
                      as={Input}
                      type="email"
                      placeholder="Enter email"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* 🔑 Password Field */}
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Field
                      name="password"
                      as={Input.Password}
                      placeholder="Enter password"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* 🟠 Forgot Password */}
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className="text-sm text-blue-500 hover:underline cursor-pointer"
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </span>
                  </div>

                  {/* 🟢 Submit Button */}
                  <CustomButton
                    text="Login"
                    htmlType="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>

      {/* 🌟 Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0"></div>

      {/* 🟠 Forgot Password Modal */}
      <Modal
        title="Forgot Password"
        visible={forgotModalVisible}
        onCancel={() => setForgotModalVisible(false)}
        footer={null}
      >
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
          })}
          onSubmit={(values) => handleSendResetEmail(values.email)}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Enter your email
              </label>
              <Field
                name="email"
                as={Input}
                type="email"
                placeholder="Enter email"
                className="w-full"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />

              <CustomButton
                text="Send Reset Link"
                htmlType="submit"
                className="w-full"
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default Login;
