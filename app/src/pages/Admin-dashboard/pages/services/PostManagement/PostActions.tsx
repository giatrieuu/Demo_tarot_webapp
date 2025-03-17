// src/components/PostManagement/PostActions.tsx
import React from "react";
import { Button, Popconfirm, Space, Tooltip, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deletePostById } from "../../../../../services/blogServices";

interface PostActionsProps {
  postId: string;
  onEdit: () => void; // 🟡 Thêm hàm chỉnh sửa
  onDelete: (id: string) => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  onEdit,
  onDelete,
}) => {
  const handleDelete = async () => {
    try {
      await deletePostById(postId);
      message.success(`Đã xóa bài viết thành công`);
      onDelete(postId);
    } catch {
      message.error("Xóa bài viết thất bại");
    }
  };

  return (
    <Space>
      {/* 🟡 Nút Chỉnh Sửa */}
      <Tooltip title="Chỉnh sửa">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={onEdit} // 🟡 Gọi hàm chỉnh sửa
        />
      </Tooltip>

      {/* 🟡 Nút Xóa */}
      <Tooltip title="Xóa">
        <Popconfirm
          title="Bạn chắc chắn muốn xóa bài viết này?"
          onConfirm={handleDelete}
          okText="Có"
          cancelText="Không"
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};

export default PostActions;
