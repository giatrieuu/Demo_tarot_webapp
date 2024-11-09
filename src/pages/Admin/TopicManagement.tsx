import React, { useState, useEffect } from 'react';
import { Table, Button, Tooltip, Modal, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ApiService from '../../services/axios';

const TopicManagement: React.FC = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await ApiService.fetchTopicsList();
        setTopics(data);
      } catch (error) {
        message.error("Failed to load topics");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to handle topic deletion
  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this topic?',
      onOk: async () => {
        try {
          await ApiService.deleteTopic(id);
          setTopics(topics.filter((topic) => topic.id !== id));
          message.success('Topic deleted successfully');
        } catch (error) {
          message.error('Failed to delete topic');
        }
      },
    });
  };

  // Table column configuration without the "Edit" action
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

  return (
    <div style={{ padding: '24px' }}>
      <h1 className="text-2xl font-bold mb-6">Topic Management</h1>
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
    </div>
  );
};

export default TopicManagement;
