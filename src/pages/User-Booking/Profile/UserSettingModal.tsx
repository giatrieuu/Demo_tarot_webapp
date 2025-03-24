// src/pages/User-Booking/Profile/UserSettingModal.tsx
import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Avatar, Upload, message, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { updateUserProfile, updateUserImage } from "../../../services/userServices";
import dayjs, { Dayjs } from "dayjs"; // Import dayjs

interface UserSettingModalProps {
  visible: boolean;
  onClose: () => void;
  userData: any;
  onUpdate: (updatedData: any) => void;
}

const UserSettingModal: React.FC<UserSettingModalProps> = ({
  visible,
  onClose,
  userData,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    description: string;
    dob: string | null;
    avatar: string | File; // Allow both string and File
  }>({
    name: "",
    email: "",
    description: "",
    dob: null,
    avatar: "https://source.unsplash.com/100x100/?portrait",
  });

  const [loading, setLoading] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);

  // Update formData when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        description: userData.description || "",
        dob: userData.dob || null,
        avatar: userData.avatar || "https://source.unsplash.com/100x100/?portrait",
      });
    }
  }, [userData]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle date change
  const handleDateChange = (_date: Dayjs | null, dateString: string | string[]) => {
    // Since we're using a single date picker, dateString will always be a string
    const formattedDate = typeof dateString === "string" ? dateString : null;
    setFormData({ ...formData, dob: formattedDate });
  };

  // Handle avatar upload
  const handleUpload = (file: File) => {
    setFormData({ ...formData, avatar: file });
    message.success("Avatar selected! It will be uploaded when you save.");
    return false; // Prevent automatic upload
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!userId) {
      message.error("User ID is missing. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Update the user profile (name, email, description, dob)
      const updatedProfileData = await updateUserProfile({
        id: userId,
        name: formData.name,
        email: formData.email,
        description: formData.description || null,
        dob: formData.dob || null,
      });

      // Step 2: Update the user image if a new avatar is selected
      let updatedImageData = null;
      if (formData.avatar instanceof File) {
        updatedImageData = await updateUserImage(userId, formData.avatar);
      }

      message.success("Profile updated successfully!");

      // Combine the updated profile data and image data (if any)
      const combinedData = {
        ...updatedProfileData,
        url: updatedImageData?.url || updatedProfileData?.url || [],
      };

      onUpdate(combinedData);
      onClose();
    } catch (error) {
      message.error("Failed to update profile. Please try again.");
      onUpdate(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Edit Profile" open={visible} onCancel={onClose} footer={null}>
      <div className="flex flex-col items-center space-y-6">
        {/* Avatar + Upload Button */}
        <div className="relative group">
          <Avatar
            src={
              formData.avatar instanceof File
                ? URL.createObjectURL(formData.avatar)
                : formData.avatar
            }
            size={100}
            className="border-4 border-gray-300 shadow-md rounded-full"
          />
          <Upload showUploadList={false} beforeUpload={handleUpload}>
            <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <UploadOutlined className="mr-1" /> Change
            </button>
          </Upload>
        </div>

        {/* Form Fields */}
        <div className="w-full space-y-4">
          <label className="block text-gray-700 font-medium">Name</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-gray-700 font-medium">Email</label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-gray-700 font-medium">Description</label>
          <Input.TextArea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />

          <label className="block text-gray-700 font-medium">Date of Birth</label>
          <DatePicker
            value={formData.dob ? dayjs(formData.dob) : null}
            onChange={handleDateChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            format="YYYY-MM-DD"
          />

          <Button
            type="primary"
            loading={loading}
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserSettingModal;