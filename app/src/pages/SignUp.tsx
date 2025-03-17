import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, message } from "antd";
import bgVideo from "../../public/assets/home.mp4";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/userServices";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // ✅ Schema Validation
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "Fullname must be at least 3 characters")
      .required("Fullname is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // 🟢 Handle Sign Up
  const handleSubmit = async (values: { fullName: string; email: string; password: string }) => {
    setLoading(true);
    try {
      await registerUser(values);
      setEmailSent(true);
    } catch (error) {
      message.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center">
      {/* 🌟 Background Video */}
      <video className="absolute top-0 left-0 w-full h-full object-cover" src={bgVideo} autoPlay loop muted />

      {/* 📂 Form Container */}
      <div className="relative z-10 w-full max-w-sm bg-white bg-opacity-90 rounded-lg shadow-md p-6 text-center">
        {emailSent ? (
          <>
            <h2 className="text-xl font-bold text-gray-800">Verify Your Email</h2>
            <p className="text-gray-600 mt-2">A verification email has been sent. Please check your inbox.</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-center mb-4">Sign Up</h2>
            <Formik initialValues={{ fullName: "", email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="w-full">
                  {/* 📝 Full Name Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <Field name="fullName" as={Input} placeholder="Enter full name" className="w-full" />
                    <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* 📧 Email Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Field name="email" as={Input} type="email" placeholder="Enter email" className="w-full" />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* 🔑 Password Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <Field name="password" as={Input.Password} placeholder="Enter password" className="w-full" />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* 🟢 Submit Button */}
                  <CustomButton text="Sign Up" htmlType="submit" className="w-full" disabled={isSubmitting || loading} />
                </Form>
              )}
            </Formik>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">Already have an account?</span>{" "}
              <span className="text-sm text-blue-500 hover:underline cursor-pointer" onClick={() => navigate("/login")}>
                Log in
              </span>
            </div>
          </>
        )}
      </div>

      {/* 🌟 Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0"></div>
    </div>
  );
};

export default SignUp;
