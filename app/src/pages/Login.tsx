import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "antd";
import { loginTarotReader } from "../services/userServices";
import bgVideo from "../assets/home.mp4";
import CustomButton from "../components/CustomButton"; // Import CustomButton

const Login: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<
    "guest" | "reader" | null
  >(null);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(1, "Password must be at least 1 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (
    values: { email: string; password: string },
    actions: any
  ) => {
    loginTarotReader(values)
      .then((data) => {
        console.log("Login successful:", data);
      })
      .catch(() => {
        actions.setErrors({ email: "Invalid email or password" });
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const handleGuestLogin = () => {
    window.location.href = "https://www.bookingtarot.somee.com/Auth/redirect";
  };

  return (
    <div className="relative flex h-screen items-center justify-center">
      {/* Video nền */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={bgVideo}
        autoPlay
        loop
        muted
      ></video>

      <div className="relative z-10 w-full max-w-sm bg-white bg-opacity-90 rounded-lg shadow-md p-6">
        {!selectedOption ? (
          <>
            <h2 className="text-xl font-bold text-center mb-6">
              Choose Login Option
            </h2>
            <div className="flex flex-col space-y-4">
              <CustomButton
                text="Login as Guest (Google)"
                onClick={() => setSelectedOption("guest")}
              />
              <CustomButton
                text="Login as Tarot Reader"
                onClick={() => setSelectedOption("reader")}
              />
            </div>
          </>
        ) : selectedOption === "guest" ? (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-center mb-6">
              Login as Guest
            </h2>
            <CustomButton text="Login with Google" onClick={handleGuestLogin} />
            <CustomButton
              text="Back"
              onClick={() => setSelectedOption(null)}
              className="mt-4"
            />
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-center mb-6">
              Login as Tarot Reader
            </h2>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="w-full">
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

                  <div className="mb-4">
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

                  <CustomButton
                    text="Login"
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </Form>
              )}
            </Formik>
            <CustomButton
              text="Back"
              onClick={() => setSelectedOption(null)}
              className="mt-4"
            />
          </div>
        )}
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0"></div>
    </div>
  );
};

export default Login;
