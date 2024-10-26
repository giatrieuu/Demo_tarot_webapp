import React, { useState } from 'react';
import { Table, Button, Input, Space, Modal, Form, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom';

const CardDeckManager: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // Sample Data
  const dataSource = [
    {
      key: '1',
      st: '1',
      id: 'Card deck 1',
      name: 'Name card deck 1',
      createDate: '10 - 10 -2024',
      topics: 'Love, Study, Money',
      lastModified: '10 - 10 -2024',
    },
    {
      key: '2',
      st: '2',
      id: 'Card deck 2',
      name: 'Name card deck 2',
      createDate: '10 - 10 -2024',
      topics: 'Love',
      lastModified: '10 - 10 -2024',
    },
    {
      key: '3',
      st: '3',
      id: 'Card deck 3',
      name: 'Name card deck 2',
      createDate: '10 - 10 -2024',
      topics: 'Love',
      lastModified: '10 - 10 -2024',
    },
  ];

  // Table Columns
  const columns = [
    {
      title: 'St',
      dataIndex: 'st',
      key: 'st',
      align: 'center' as const,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <b>{text}</b>,
    },
    {
      title: 'Create date',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: 'Topics',
      dataIndex: 'topics',
      key: 'topics',
    },
    {
      title: 'Last modified',
      dataIndex: 'lastModified',
      key: 'lastModified',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="primary" className="bg-[#91A089]">
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} danger>
            Delete
          </Button>
        </Space>
      ),
      align: 'center' as const,
    },
  ];

  // Modal Handlers
  const showModal = () => {
    setIsModalOpen(true);
  };

const handleOk = () => {
  form.validateFields().then((values) => {
      console.log('Form values:', values); // Here, you would handle the form submission
      setIsModalOpen(false);
      form.resetFields();
      navigate(`/card-deck-upload/${createdDeckId}`);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div className="min-h-screen bg-[#EDF3E8] p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Card deck</h2>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
          className="bg-[#91A089]"
          onClick={showModal}
        />
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex">
        <Input.Search
          placeholder="Keyword"
          allowClear
          className="mr-2 max-w-xs"
          enterButton="Search"
        />
      </div>

      {/* Table */}
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        className="bg-white"
      />

      {/* Modal for Adding New Card Deck */}
      <Modal
        title="New card deck"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="cardDeckName"
            label="Card deck name"
            rules={[{ required: true, message: 'Please input the card deck name!' }]}
          >
            <Input placeholder="Enter card deck name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
            <Upload maxCount={1}>
              <Button icon={<UploadOutlined />}>Choose files</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CardDeckManager;
