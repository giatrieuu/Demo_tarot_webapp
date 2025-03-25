// src/pages/User-Booking/Profile/Profile.tsx
import React, { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  Skeleton,
  Avatar,
  Dropdown,
  Menu,
  Modal,
  List,
  Checkbox,
  message,
  Spin,
  Tag,
  Button,
} from "antd";

import SettingModal from "./SettingModal";
import ChangePasswordModal from "./ChangePasswordModal";
import {
  fetchReaderById,
  fetchReaderTopics,
} from "../../../../services/tarotReaderServices";
import { RootState } from "../../../../redux/store";
import {
  createReaderTopic,
  fetchTopicsList,
} from "../../../../services/topicServices";

interface Topic {
  id: string;
  name: string;
}

const Profile: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [readerData, setReaderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);

  // Topic selection states
  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [readerTopics, setReaderTopics] = useState<Topic[]>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const [topicsSubmitting, setTopicsSubmitting] = useState(false);

  // Fetch Profile
  useEffect(() => {
    if (!userId) return; // Guard against null userId

    // TypeScript now knows userId is a string due to the guard above
    fetchReaderById(userId as string).then((data) => {
      setReaderData({
        ...data.reader,
        avatar:
          data.url?.length > 0
            ? data.url[0]
            : "https://source.unsplash.com/100x100/?portrait",
      });
    }).finally(() => setLoading(false));
  }, [userId]);

  // Fetch all topics and reader's topics
  const loadTopicsData = async () => {
    if (!userId) {
      message.error("Không tìm thấy ID của reader. Vui lòng đăng nhập lại.");
      setTopicsLoading(false);
      return;
    }

    try {
      setTopicsLoading(true);
      const [allTopicsData, readerTopicsData] = await Promise.all([
        fetchTopicsList(),
        fetchReaderTopics(userId), // userId is guaranteed to be a string here
      ]);
      setAllTopics(allTopicsData);
      setReaderTopics(readerTopicsData);
      setSelectedTopicIds(readerTopicsData.map((topic: Topic) => topic.id));
    } catch (error) {
      message.error("Không thể tải danh sách chủ đề. Vui lòng thử lại sau.");
    } finally {
      setTopicsLoading(false);
    }
  };

  useEffect(() => {
    loadTopicsData();
  }, [userId]);

  // Handle topic selection
  const handleTopicSelect = (topicId: string, checked: boolean) => {
    if (checked) {
      setSelectedTopicIds((prev) => [...prev, topicId]);
    } else {
      setSelectedTopicIds((prev) => prev.filter((id) => id !== topicId));
    }
  };

  // Handle saving selected topics
  const handleSaveTopics = async () => {
    if (!userId) {
      message.error("Không tìm thấy ID của reader. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      setTopicsSubmitting(true);
      const newTopics = selectedTopicIds.filter(
        (id) => !readerTopics.some((topic) => topic.id === id)
      );
      for (const topicId of newTopics) {
        await createReaderTopic(userId, topicId); // userId is guaranteed to be a string
      }
      message.success("Cập nhật chủ đề thành công!");
      setIsTopicModalOpen(false);
      // Refresh reader's topics
      const updatedReaderTopics = await fetchReaderTopics(userId); // userId is guaranteed to be a string
      setReaderTopics(updatedReaderTopics);
      setSelectedTopicIds(updatedReaderTopics.map((topic: Topic) => topic.id));
    } catch (error) {
      message.error("Cập nhật chủ đề thất bại! Vui lòng thử lại.");
    } finally {
      setTopicsSubmitting(false);
    }
  };

  // Handle Update
  const handleUpdate = (updatedData: any) => {
    if (updatedData) {
      setReaderData({
        ...readerData,
        ...updatedData,
        avatar: updatedData.avatar || readerData.avatar, // Preserve avatar if not updated
      });
    } else {
      // If update fails, refetch the data
      if (userId) {
        fetchReaderById(userId).then((data) => {
          setReaderData({
            ...data.reader,
            avatar:
              data.url?.length > 0
                ? data.url[0]
                : "https://source.unsplash.com/100x100/?portrait",
          });
        });
      }
    }
  };

  // Menu Dropdown
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setIsSettingModalOpen(true)}>
        Edit Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setIsPasswordModalOpen(true)}>
        Change Password
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setIsTopicModalOpen(true)}>
        Select Topics
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Image */}
      <div
        className="relative h-64 w-full bg-cover bg-center"
        style={{
          backgroundImage: readerData?.coverImage
            ? `url(${readerData.coverImage})`
            : "url('/assets/background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto -mt-20 p-6 bg-white rounded-lg shadow-lg relative">
        {loading ? (
          <Skeleton active />
        ) : (
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <Avatar
              src={readerData?.avatar}
              alt="Tarot Reader"
              className="w-28 h-28 rounded-full border-4 border-white shadow-md"
            />
            <div>
              <h1 className="text-2xl font-semibold text-black">
                {readerData?.name || "Unknown Reader"}
              </h1>
              <p className="text-gray-800">
                {readerData?.profession || "Professional Tarot Reader"}
              </p>
            </div>

            {/* Dropdown Setting */}
            <div className="ml-auto">
              <Dropdown overlay={menu} trigger={["click"]}>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition">
                  <AiOutlineSetting className="text-xl" /> Settings
                </button>
              </Dropdown>
            </div>
          </div>
        )}

        {/* Profile Information and Topics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-black">Profile Information</h2>
            <p className="text-gray-600 mt-2">
              {readerData?.description || "No description available."}
            </p>
            <p className="mt-3 text-gray-700">
              <span className="font-semibold text-black">Full Name:</span>{" "}
              <span className="text-black">{readerData?.name || "N/A"}</span>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-black">Phone:</span>{" "}
              <span className="text-black">{readerData?.phone || "N/A"}</span>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-black">Experience:</span>{" "}
              <span className="text-black">{readerData?.experience || "N/A"} years</span>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-black">Price (per hour):</span>{" "}
              <span className="text-black">
                {readerData?.price ? `$${readerData.price.toFixed(2)}` : "N/A"}
              </span>
            </p>
          </div>

          {/* Topics Section */}
          <div>
            <h2 className="text-lg font-semibold text-black">Your Topics</h2>
            {topicsLoading ? (
              <div className="flex justify-center mt-4">
                <Spin />
              </div>
            ) : readerTopics.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {readerTopics.map((topic: Topic) => (
                  <Tag
                    key={topic.id}
                    color="blue"
                    className="text-sm px-3 py-1 rounded-full"
                  >
                    {topic.name}
                  </Tag>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mt-2">No topics selected.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal Components */}
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

      {/* Topic Selection Modal */}
      <Modal
        title="Select Topics"
        open={isTopicModalOpen}
        onCancel={() => setIsTopicModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsTopicModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSaveTopics}
            loading={topicsSubmitting}
          >
            Save
          </Button>,
        ]}
      >
        {allTopics.length > 0 ? (
          <List
            dataSource={allTopics}
            renderItem={(topic) => (
              <List.Item>
                <Checkbox
                  checked={selectedTopicIds.includes(topic.id)}
                  onChange={(e) => handleTopicSelect(topic.id, e.target.checked)}
                >
                  <span className="ml-2">{topic.name}</span>
                </Checkbox>
              </List.Item>
            )}
          />
        ) : (
          <p>No topics available to select.</p>
        )}
      </Modal>
    </div>
  );
};

export default Profile;