import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface PostHeaderProps {
  onOpenCreate: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({ onOpenCreate }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">📝 Quản Lý Bài Viết</h2>
      <Button type="primary" icon={<PlusOutlined />} onClick={onOpenCreate}>
        Thêm Bài Viết
      </Button>
    </div>
  );
};

export default PostHeader;
