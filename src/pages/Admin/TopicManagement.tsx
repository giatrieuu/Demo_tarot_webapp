import React, { useState, useEffect } from 'react';
import { Table, Button, Tooltip, Modal, Input, Form, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import ApiService from '../../services/axios'; // Import the ApiService with fetchTopicsList

const TopicManagement: React.FC = () => {
  const [topics, setTopics] = useState<any[]>([]); // State to store the list of topics
  const [loading, setLoading] = useState(false); // State to manage the loading status
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal state
  const [newTopicName, setNewTopicName] = useState(''); // State to store the new topic name
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await ApiService.fetchTopicsList(); // Call the API to fetch the list of topics
        setTopics(data);
      } catch (error) {
        message.error("Failed to load topics");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to create a new topic
  const handleCreateTopic = async () => {
    if (!newTopicName.trim()) {
      message.error('Topic name cannot be empty');
      return;
    }

    try {
      setLoading(true);
      const response = await ApiService.createTopic(newTopicName); // Call the API to create a topic
      setTopics([...topics, { id: response.id, name: newTopicName }]); // Update the topic list with the new topic
      message.success('Topic created successfully!');
      setIsModalVisible(false);
      setNewTopicName(''); // Reset the input field
    } catch (error) {
      message.error('Failed to create topic');
    } finally {
      setLoading(false);
    }
  };

  // Function to show the modal for creating a new topic
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setNewTopicName(''); // Reset the input
  };

  // Table column configuration
  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      align: 'center' as 'center',
      width: '10%',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Topic',
      dataIndex: 'name',
      key: 'name',
      align: 'left' as 'left',
      width: '70%',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center' as 'center',
      width: '20%',
      render: (_: any, record: any) => (
        <div className="flex justify-center space-x-2">
          <Tooltip title="Edit">
            <Button
              type="primary"
              shape="round"
              icon={<EditOutlined />}
              className="bg-blue-500 hover:bg-blue-400 text-white"
              onClick={() => handleEdit(record.id, record.name)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="primary"
              shape="round"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  // Function to handle topic editing
  const handleEdit = async (id: string, currentName: string) => {
    let updatedName = ""; // Placeholder for the updated name

    Modal.confirm({
      title: 'Edit Topic',
      content: (
        <Input
          defaultValue={currentName}
          onChange={(e) => (updatedName = e.target.value)}
          placeholder="Enter new topic name"
        />
      ),
      onOk: async () => {
        if (!updatedName.trim()) {
          message.error("Topic name cannot be empty");
          return;
        }

        try {
          await ApiService.updateTopic(id, updatedName); // Call the updateTopic API function
          setTopics(topics.map((topic) => (topic.id === id ? { ...topic, name: updatedName } : topic))); // Update the topic list
          message.success('Topic updated successfully');
        } catch (error) {
          message.error('Failed to update topic');
        }
      },
    });
  };

  // Function to handle topic deletion
  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this topic?',
      onOk: async () => {
        try {
          await ApiService.deleteTopic(id); // Call the deleteTopic API function
          setTopics(topics.filter((topic) => topic.id !== id)); // Remove the topic from the list
          message.success('Topic deleted successfully');
        } catch (error) {
          message.error('Failed to delete topic');
        }
      },
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Topic Management</h1>
        {/* Button to create a new topic */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          className="bg-green-500 hover:bg-green-400 text-white rounded-lg"
        >
          Create Topic
        </Button>
      </div>
      <p className="text-gray-500 mb-6">Manage all your topics from this panel.</p>

      {/* Topic List Table */}
      <Table
        dataSource={topics}
        columns={columns}
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        pagination={false}
        loading={loading}
        className="bg-white shadow-md rounded-lg"
      />

      {/* Modal to create a new topic */}
      <Modal
        title="Create New Topic"
        visible={isModalVisible}
        onOk={handleCreateTopic}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
        centered
      >
        <Form layout="vertical">
          <Form.Item label="Topic Name">
            <Input
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              placeholder="Enter topic name"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TopicManagement;
