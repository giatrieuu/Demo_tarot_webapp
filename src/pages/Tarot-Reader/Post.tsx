import React, { useState } from 'react';
import { Table, Input, Button, Modal, Tooltip } from 'antd';
import { SearchOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const PostList: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);


  const dataSource = [
    {
      key: '1',
      st: '1',
      id: 'Post - 01',
      title: 'Post about Tarot',
      date: '10 - 10 - 2024',
      topic: 'Card decks, C...',
      lastModified: '10 - 10 - 2024',
    },
    // Các post khác...
  ];

  const columns = [
    {
      title: 'St',
      dataIndex: 'st',
      key: 'st',
      align: 'center' as 'center', // align set to 'center'
      width: '5%',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '25%',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '15%',
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      key: 'topic',
      width: '20%',
    },
    {
      title: 'Last modified',
      dataIndex: 'lastModified',
      key: 'lastModified',
      width: '15%',
    },
    {
      title: '',
      key: 'action',
      width: '10%',
      render: () => (
        <Tooltip title="Edit Post">
          <Button shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete these posts?',
      onOk: () => {
        // Xử lý xóa post
      },
    });
  };

  return (
    <div className="min-h-screen p-6 bg-[#edf3e8]">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Posts</h2>
        <Input
          placeholder="Keyword"
          prefix={<SearchOutlined />}
          className="w-1/3 p-2 rounded-md bg-[#dde5db] text-gray-700"
        />
        <Button type="primary" className="bg-[#72876e] hover:bg-[#91a089]">
          Search
        </Button>
      </div>

      <div className="flex justify-between mb-4">
        <Button
          onClick={handleDelete}
          icon={<DeleteOutlined />}
          className="bg-red-300 text-red-800 hover:bg-red-400"
          danger
        >
          Delete
        </Button>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="bg-[#91a089] hover:bg-[#72876e]"
        >
          Add Post
        </Button>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        pagination={false}
        className="bg-[#d9e6dc] shadow-md rounded-lg"
      />
    </div>
  );
};

export default PostList;
