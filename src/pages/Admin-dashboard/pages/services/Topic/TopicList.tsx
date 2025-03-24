// components/TopicManagement/TopicList.tsx
import React, { useState, useEffect } from "react";
import { message, Modal, Spin } from "antd";
import TopicHeader from "./TopicHeader";
import TopicTable from "./TopicTable";
import TopicCreateForm from "./TopicCreateForm";
import TopicEditForm from "./TopicEditForm";
import { fetchTopicsList } from "../../../../../services/topicServices";


interface Topic {
  id: string;
  name: string;
}

const TopicList: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  // Fetch all topics
  const loadTopics = () => {
    setLoading(true);
    fetchTopicsList()
      .then((data) => setTopics(data))
      .catch(() => message.error("Không thể tải danh sách chủ đề."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTopics();
  }, []);

  // Add new topic
  const handleAddNewTopic = (newTopic: Topic) => {
    setTopics((prev) => [newTopic, ...prev]);
  };

  // Handle edit button click (open modal)
  const handleOpenEditModal = (id: string, name: string) => {
    setEditingTopic({ id, name });
    setIsEditModalVisible(true);
  };

  // Handle successful edit
  const handleEditTopic = (id: string, name: string) => {
    setTopics((prev) =>
      prev.map((topic) => (topic.id === id ? { ...topic, name } : topic))
    );
    setIsEditModalVisible(false);
    setEditingTopic(null);
  };

  // Delete topic
  const handleDeleteTopic = (id: string) => {
    setTopics((prev) => prev.filter((topic) => topic.id !== id));
  };

  return (
    <div className="p-5 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <TopicHeader onOpenCreate={() => setIsCreateModalVisible(true)} />

      {/* Display loading if fetching topics */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <TopicTable
          topics={topics}
          onEdit={handleOpenEditModal} // Open modal instead of editing directly
          onDelete={handleDeleteTopic}
        />
      )}

      {/* Modal Create */}
      <Modal
        title="Thêm Chủ Đề"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        <TopicCreateForm
          onClose={() => setIsCreateModalVisible(false)}
          onSuccess={handleAddNewTopic}
        />
      </Modal>

      {/* Modal Edit */}
      <Modal
        title="Chỉnh Sửa Chủ Đề"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setEditingTopic(null);
        }}
        footer={null}
      >
        {editingTopic && (
          <TopicEditForm
            topic={editingTopic}
            onClose={() => {
              setIsEditModalVisible(false);
              setEditingTopic(null);
            }}
            onSuccess={handleEditTopic}
          />
        )}
      </Modal>
    </div>
  );
};

export default TopicList;