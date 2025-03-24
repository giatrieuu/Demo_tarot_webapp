// src/pages/UserProfile.tsx
import React, { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Skeleton, Avatar, Dropdown, Menu, message } from "antd";
import { RootState } from "../../../redux/store";
import { fetchUserWithImages } from "../../../services/userServices";
import UserSettingModal from "./UserSettingModal";
import moment from "moment";

const UserProfile: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const fetchUserData = async () => {
    if (!userId) {
      console.error("User ID is missing. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      const data = await fetchUserWithImages(userId);
      setUserData({
        ...data.user,
        avatar:
          data.url?.length > 0
            ? data.url[0]
            : "https://source.unsplash.com/100x100/?portrait",
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      message.error("Failed to load profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const handleUpdate = async (updatedData: any) => {
    try {
      if (updatedData && updatedData.user) {
        setUserData({
          ...updatedData.user,
          avatar:
            updatedData.url?.length > 0
              ? updatedData.url[0]
              : "https://source.unsplash.com/100x100/?portrait",
        });
      } else if (updatedData) {
        setUserData({
          ...updatedData,
          avatar:
            updatedData.url?.length > 0
              ? updatedData.url[0]
              : userData?.avatar || "https://source.unsplash.com/100x100/?portrait",
        });
      } else {
        await fetchUserData();
      }
    } catch (error) {
      console.error("Failed to update user data:", error);
      await fetchUserData();
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return moment(dateString).format("DD/MM/YYYY");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setIsSettingModalOpen(true)}>
        Edit Profile
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="relative h-64 w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="max-w-5xl mx-auto -mt-20 p-6 bg-white rounded-lg shadow-lg relative">
        {loading ? (
          <Skeleton active />
        ) : (
          <div className="flex items-center gap-6">
            <Avatar
              src={userData?.avatar}
              alt="User"
              className="w-28 h-28 rounded-full border-4 border-white shadow-md"
            />
            <div>
              <h1 className="text-2xl font-semibold">
                {userData?.name || "Unknown User"}
              </h1>
              <p className="text-gray-500">{userData?.email || "N/A"}</p>
            </div>

            <div className="ml-auto">
              <Dropdown overlay={menu} trigger={["click"]}>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition">
                  <AiOutlineSetting className="text-xl" /> Settings
                </button>
              </Dropdown>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold">Profile Information</h2>
            <p className="text-gray-600 mt-2">
              {userData?.description || "No description available."}
            </p>
            <p className="mt-3 text-gray-700">
              <span className="font-semibold">Name:</span>{" "}
              {userData?.name || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              {userData?.email || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Date of Birth:</span>{" "}
              {formatDate(userData?.dob)}
            </p>
          </div>
        </div>
      </div>

      <UserSettingModal
        visible={isSettingModalOpen}
        onClose={() => setIsSettingModalOpen(false)}
        userData={userData}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default UserProfile;