import React from "react";
import { Button, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ApiService from "../services/axios";
import { RootState } from "../redux/store";

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userId); // Fetch the logged-in user's ID

  // Handle password change submission
  const handlePasswordChange = async (values: any) => {
    const { oldPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      message.error("New password and confirm password do not match!");
      return;
    }

    try {
      // Call the API to change the password
      const response = await ApiService.changePassword(userId, oldPassword, newPassword, confirmPassword);

      // Log the response for debugging
      console.log("Change Password Response:", response);

      // Handle based on response, adjust according to actual structure
      if (response?.success || response?.status === 200) {
        message.success("Password changed successfully");
        navigate("/profile", { replace: true });
      } else {
        message.error(response?.message || "Failed to change password. Please try again.");
      }
    } catch (error) {
      console.error("Error changing password", error);
      message.error("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-[#edf3e8]">
        <div className="w-full max-w-sm bg-[#d9e6dc] rounded-lg shadow-lg p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-black mb-6 text-center">
            Change Password
          </h2>

          {/* Change Password Form */}
          <Form layout="vertical" onFinish={handlePasswordChange}>
            <Form.Item
              label="Old Password"
              name="oldPassword"
              rules={[{ required: true, message: "Please enter your old password!" }]}
            >
              <Input.Password placeholder="Enter old password" />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[{ required: true, message: "Please enter your new password!" }]}
            >
              <Input.Password placeholder="Enter new password" />
            </Form.Item>
            <Form.Item
              label="Confirm New Password"
              name="confirmPassword"
              rules={[{ required: true, message: "Please confirm your new password!" }]}
            >
              <Input.Password placeholder="Confirm new password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 rounded-md text-white bg-[#91a089] hover:bg-[#72876e]"
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
