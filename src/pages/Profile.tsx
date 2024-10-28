import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, HeartFilled, LeftOutlined } from "@ant-design/icons";
import { Upload, message, Button, Input, Avatar } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ApiService from "../services/axios"; // Import ApiService for fetching and updating image
import ImgCrop from 'antd-img-crop'; // Import for image cropping feature

interface FollowUser {
  id: number;
  name: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userId); // Get userId from Redux store
  const [userData, setUserData] = useState<any>(null); // State to hold user data
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to hold profile image URL
  const [fullName, setFullName] = useState<string>("Nguyễn Quang Huy");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [biography, setBiography] = useState<string>("");

  const follows: FollowUser[] = [
    { id: 1, name: "Glucozo10" },
    { id: 2, name: "Glucozo10" },
    { id: 3, name: "Glucozo10" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await ApiService.getUserWithImages(userId);
        const user = response?.user;
        setFullName(user?.name || "");
        setEmail(user?.email || "");
        setPhone(user?.phone || "");
        setGender(user?.gender || "");
        setDob(user?.dob || "");
        setBiography(user?.description || "");
        setImageUrl(response?.url?.[0] || null); // Store profile image URL
        setUserData(response);
      } catch (error) {
        message.error("Failed to fetch user profile.");
      }
    };

    if (userId) {
      fetchUserData(); // Fetch data if userId is available
    }
  }, [userId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    try {
      await ApiService.updateUserProfile({
        id: userId,
        name: fullName,
        email,
        phone,
        gender,
        dob,
        description: biography,
      });
      message.success("Profile updated successfully");
    } catch (error) {
      message.error("Failed to save profile.");
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file); // Append file to the formData for uploading
      const response = await ApiService.updateProfileImage(userId, formData); // API to handle profile image update
      setImageUrl(response?.url); // Update the image URL on successful upload
      message.success("Image updated successfully");
    } catch (error) {
      message.error("Failed to upload image.");
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG files!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <div className="bg-[#D3E0DC] min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Button onClick={handleBack} icon={<LeftOutlined />}>
          Back
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Left Section */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <div className="relative">
            <img
              src="./src/assets/background.jpg"
              alt="Cover"
              className="w-full h-60 object-cover rounded-t-lg"
            />
            <div className="absolute -bottom-10 left-6">
              <div className="p-2 rounded-full border-4 border-white">
                <ImgCrop rotate>
                  <Upload
                    showUploadList={false} // Hide the default upload list UI
                    beforeUpload={beforeUpload} // Add validation for file type and size
                    customRequest={({ file }) => handleImageUpload(file as File)} // Handle custom upload
                  >
                    {imageUrl ? (
                      <Avatar
                        src={imageUrl}
                        size={128}
                        style={{
                          cursor: "pointer",
                          objectFit: "cover", // Ensure the image covers the entire circle
                          borderRadius: "50%", // Make sure the image remains circular
                        }}
                      />
                    ) : (
                      <Avatar
                        size={128}
                        icon={<UserOutlined />}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </Upload>
                </ImgCrop>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold">{fullName}</h2>
          </div>

          {/* User Information */}
          <div className="mt-8">
            <h3 className="font-semibold">User information</h3>
            <div className="flex flex-col gap-4 mt-4">
              <Input
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="flex gap-4">
                <select
                  className="border p-2 rounded-md w-1/2"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <Input
                  type="date"
                  className="w-1/2"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-start">
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-8">
            <h3 className="font-semibold">Biography</h3>
            <textarea
              className="w-full border p-2 rounded-md mt-4"
              rows={5}
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              placeholder="Write something about yourself..."
            ></textarea>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow</h3>
            {follows.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-2"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-purple-400 p-2 rounded-full">
                    <UserOutlined className="text-xl text-white" />
                  </div>
                  <span>{user.name}</span>
                </div>
                <HeartFilled className="text-red-500" />
              </div>
            ))}
            <Button type="link" className="mt-2">+More</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
