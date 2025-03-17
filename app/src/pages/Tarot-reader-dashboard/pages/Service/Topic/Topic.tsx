import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Space, message, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchReaderTopics } from "../../../../../services/tarotReaderServices";


const Topic: React.FC<{ readerId: string }> = ({ readerId }) => {
  const [topics, setTopics] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTopic, setEditTopic] = useState<{ id: string | null; name: string }>({ id: null, name: "" });

  // Fetch topics on load
  useEffect(() => {
    loadTopics();
  }, [readerId]);

  const loadTopics = async () => {
    setLoading(true);
    const data = await fetchReaderTopics(readerId);
    setTopics(data);
    setLoading(false);
  };

  const handleEdit = (topic: { id: string; name: string }) => {
    setEditTopic(topic);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    message.success("Deleted successfully!"); // Xử lý gọi API xóa tại đây
    setTopics((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSave = async () => {
    if (!editTopic.name.trim()) {
      message.error("Topic name cannot be empty!");
      return;
    }

    if (editTopic.id) {
      message.success("Topic updated successfully!"); // Gọi API update
    } else {
      message.success("New topic added!"); // Gọi API tạo mới
      setTopics((prev) => [...prev, { id: `topic_${Date.now()}`, name: editTopic.name }]);
    }

    setIsModalVisible(false);
    setEditTopic({ id: null, name: "" });
  };

  const columns = [
    { title: "Topic Name", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: { id: string; name: string }) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
            <Button danger icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">📌 Tarot Topics</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
          Create Topic
        </Button>
      </div>

      <Table columns={columns} dataSource={topics} loading={loading} rowKey="id" />

      {/* Modal Create / Edit Topic */}
      <Modal
        title={editTopic.id ? "Edit Topic" : "Create Topic"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
      >
        <Input value={editTopic.name} onChange={(e) => setEditTopic({ ...editTopic, name: e.target.value })} placeholder="Enter topic name" />
      </Modal>
    </div>
  );
};

export default Topic;
