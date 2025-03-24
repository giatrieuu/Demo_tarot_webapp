// components/TopicManagement/TopicHeader.tsx
import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
  onOpenCreate: () => void;
}

const TopicHeader: React.FC<Props> = ({ onOpenCreate }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">📋 Quản Lý Chủ Đề</h2>
      <Button type="primary" icon={<PlusOutlined />} onClick={onOpenCreate}>
        Thêm Chủ Đề
      </Button>
    </div>
  );
};

export default TopicHeader;