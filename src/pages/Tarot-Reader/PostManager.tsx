import React, { useState } from "react";
import { Button, Input, Table, Checkbox } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";

interface Post {
  id: string;
  title: string;
  date: string;
  topic: string;
  lastModified: string;
}

const posts: Post[] = [
  {
    id: "Post - 01",
    title: "Post about Tarot",
    date: "10 - 10 -2024",
    topic: "Card decks, Cards...",
    lastModified: "10 - 10 -2024",
  },
  {
    id: "Post - 01",
    title: "Post about Tarot",
    date: "10 - 10 -2024",
    topic: "Card decks, Cards...",
    lastModified: "10 - 10 -2024",
  },
];

const PostManager: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const columns = [
    {
      title: "St",
      dataIndex: "st",
      key: "st",
      width: "5%",
      render: (_: any, __: any, index: number) => <>{index + 1}</>,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "15%",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <strong>{text}</strong>,
      width: "20%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "10%",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      ellipsis: true,
      width: "25%",
    },
    {
      title: "Last modified",
      dataIndex: "lastModified",
      key: "lastModified",
      width: "10%",
    },
    {
      title: "",
      dataIndex: "checkbox",
      key: "checkbox",
      render: () => <Checkbox />,
      width: "5%",
    },
  ];

  return (
    <div className="p-8 bg-[#E8F5F4] min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Posts</h2>

      {/* Search and Actions Section */}
      <div className="flex items-center mb-4">
        <Input
          placeholder="Keyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="w-1/3 mr-4"
        />
        <Button type="default" className="mr-4">
          Search
        </Button>
        <Button
          type="primary"
          danger
          className="mr-2 flex items-center gap-2"
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusCircleOutlined />}
        />
      </div>

      {/* Posts Table */}
      <Table
        columns={columns}
        dataSource={posts.map((post, index) => ({
          key: index,
          ...post,
        }))}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default PostManager;
