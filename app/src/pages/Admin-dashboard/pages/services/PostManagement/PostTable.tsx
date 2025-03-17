import React, { useState, useEffect } from "react";
import { Table, Image } from "antd";
import PostActions from "./PostActions";
import PostForm from "./PostForm"; // 🟡 Import PostForm

interface Post {
  id: string;
  title: string;
  createAt: string;
  url: string;
}

interface PostTableProps {
  posts: Post[];
  loading: boolean;

}

const PostTable: React.FC<PostTableProps> = ({ posts, loading }) => {
  const [localPosts, setLocalPosts] = useState<Post[]>(posts);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [editData, setEditData] = useState<Post | null>(null);

  // 🟡 Đồng bộ dữ liệu khi posts thay đổi
  useEffect(() => {
    setLocalPosts(posts);
  }, [posts]);

  // 🟡 Xử lý xóa
  const handleDelete = (id: string) => {
    setLocalPosts(localPosts.filter((post) => post.id !== id));
  };

  // 🟡 Xử lý chỉnh sửa
  const handleEdit = (post: Post) => {
    setEditData(post);
    setIsFormVisible(true);
  };

  // 🟡 Xử lý khi cập nhật thành công
  const handleSuccess = (updatedPost: Post) => {
    setLocalPosts(
      localPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
    setIsFormVisible(false);
  };

  const columns = [
    {
      title: "Ảnh Đại Diện",
      dataIndex: "url",
      key: "url",
      render: (url: string) => (
        <Image
          width={50}
          height={50}
          src={url}
          alt="Post"
          className="object-cover rounded"
        />
      ),
    },
    {
      title: "ID Bài Viết",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tiêu Đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createAt",
      key: "createAt",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Thao Tác",
      key: "actions",
      render: (_: any, record: Post) => (
        <PostActions
          postId={record.id}
          onEdit={() => handleEdit(record)} // 🟡 Truyền dữ liệu chỉnh sửa
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={localPosts}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* 🟡 Popup Form để chỉnh sửa bài viết */}
      {editData && (
        <PostForm
          visible={isFormVisible}
          onClose={() => setIsFormVisible(false)}
          onSuccess={handleSuccess}
          initialValues={editData} // 🟡 Đổ dữ liệu vào form
        />
      )}
    </>
  );
};

export default PostTable;
