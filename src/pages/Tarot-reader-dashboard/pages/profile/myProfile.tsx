import React, { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Skeleton, Avatar, Dropdown, Menu } from "antd";

import SettingModal from "./SettingModal";

import { fetchReaderById } from "../../../../services/tarotReaderServices";
import ChangePasswordModal from "./ChangePasswordModal";
import { RootState } from "../../../../redux/store";

const Profile: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [readerData, setReaderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // 🟢 Fetch Profile
  useEffect(() => {
    if (!userId) return;
    fetchReaderById(userId)
      .then((data) => {
        setReaderData({
          ...data.reader,
          avatar:
            data.url?.length > 0
              ? data.url[0]
              : "https://source.unsplash.com/100x100/?portrait",
        });
      })
      .finally(() => setLoading(false));
  }, [userId]);

  // 🟡 Handle Update
  const handleUpdate = (updatedData: any) => {
    setReaderData(updatedData);
  };

  // 🟠 Menu Dropdown
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setIsSettingModalOpen(true)}>
        Edit Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setIsPasswordModalOpen(true)}>
        Change Password
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🟡 Cover Image */}
      <div
        className="relative h-64 w-full bg-cover bg-center"
        style={{
          backgroundImage: readerData?.coverImage
            ? `url(${readerData.coverImage})`
            : "url('/assets/background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* 🟢 Profile Card */}
      <div className="max-w-5xl mx-auto -mt-20 p-6 bg-white rounded-lg shadow-lg relative">
        {loading ? (
          <Skeleton active />
        ) : (
          <div className="flex items-center gap-6">
            {/* ✅ Avatar */}
            <Avatar
              src={readerData?.avatar}
              alt="Tarot Reader"
              className="w-28 h-28 rounded-full border-4 border-white shadow-md"
            />
            <div>
              <h1 className="text-2xl font-semibold">
                {readerData?.name || "Unknown Reader"}
              </h1>
              <p className="text-gray-500">
                {readerData?.profession || "Professional Tarot Reader"}
              </p>
            </div>

            {/* 🟠 Dropdown Setting */}
            <div className="ml-auto">
              <Dropdown overlay={menu} trigger={["click"]}>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition">
                  <AiOutlineSetting className="text-xl" /> Settings
                </button>
              </Dropdown>
            </div>
          </div>
        )}

        {/* 🟡 Profile Information */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold">Profile Information</h2>
            <p className="text-gray-600 mt-2">
              {readerData?.description || "No description available."}
            </p>
            <p className="mt-3 text-gray-700">
              <span className="font-semibold">Full Name:</span>{" "}
              {readerData?.name || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span>{" "}
              {readerData?.phone || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Experience:</span>{" "}
              {readerData?.experience || "N/A"} years
            </p>
          </div>
        </div>
      </div>

      {/* 🟠 Modal Components */}
      <SettingModal
        visible={isSettingModalOpen}
        onClose={() => setIsSettingModalOpen(false)}
        readerData={readerData}
        onUpdate={handleUpdate}
      />

      <ChangePasswordModal
        visible={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
