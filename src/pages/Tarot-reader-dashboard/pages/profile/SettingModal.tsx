// src/pages/User-Booking/Profile/SettingModal.tsx
import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Avatar, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { updateReaderProfile } from "../../../../services/tarotReaderServices";
import { uploadReaderAvatar } from "../../../../services/imageServices";

interface SettingModalProps {
  visible: boolean;
  onClose: () => void;
  readerData: any;
  onUpdate: (updatedData: any) => void;
}

const SettingModal: React.FC<SettingModalProps> = ({
  visible,
  onClose,
  readerData,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    description: string;
    price: number | null; // Add price field
    avatar: string;
  }>({
    name: "",
    phone: "",
    description: "",
    price: null, // Initialize price as null
    avatar: "https://source.unsplash.com/100x100/?portrait", // Default avatar
  });

  const [loading, setLoading] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);

  // Update formData when readerData changes
  useEffect(() => {
    if (readerData) {
      setFormData({
        name: readerData.name || "",
        phone: readerData.phone || "",
        description: readerData.description || "",
        price: readerData.price || null, // Set initial price from readerData
        avatar: readerData.avatar || "https://source.unsplash.com/100x100/?portrait",
      });
    }
  }, [readerData]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "price") {
      // Convert price to a number, or null if empty
      const priceValue = value ? parseFloat(value) : null;
      setFormData({ ...formData, price: priceValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle avatar upload
  const handleUpload = async (file: File) => {
    if (!userId) {
      message.error("User ID is missing. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const newAvatarUrl = await uploadReaderAvatar(userId, file); // Call API to upload image
      setFormData({ ...formData, avatar: newAvatarUrl }); // Update avatar in state
      message.success("Avatar updated successfully!");
    } catch (error) {
      message.error("Failed to update avatar. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!userId) {
      message.error("User ID is missing. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const updatedData = await updateReaderProfile({
        id: userId,
        name: formData.name,
        phone: formData.phone,
        description: formData.description,
        price: formData.price ?? undefined, // Pass price to API, convert null to undefined
      });

      message.success("Profile updated successfully!");
      onUpdate(updatedData);
      onClose();
    } catch (error) {
      message.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Edit Profile" open={visible} onCancel={onClose} footer={null}>
      <div className="flex flex-col items-center space-y-6">
        {/* Avatar + Change Avatar Button */}
        <div className="relative group">
          <Avatar
            src={formData.avatar}
            size={100}
            className="border-4 border-gray-300 shadow-md rounded-full"
          />
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              handleUpload(file);
              return false; // Prevent automatic upload
            }}
          >
            <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <UploadOutlined className="mr-1" /> Change
            </button>
          </Upload>
        </div>

        {/* Form Fields */}
        <div className="w-full space-y-4">
          <label className="block text-gray-700 font-medium">Full Name</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-gray-700 font-medium">Phone</label>
          <Input
            name="phone"
            value={formData.phone}
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

          <label className="block text-gray-700 font-medium">Price (per hour)</label>
          <Input
            name="price"
            type="number"
            step="0.01" // Allow floating-point numbers
            value={formData.price ?? ""} // Display empty string if price is null
            onChange={handleInputChange}
            placeholder="Enter price per hour"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default SettingModal;