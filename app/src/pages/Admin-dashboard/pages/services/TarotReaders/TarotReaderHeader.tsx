// components/TarotReaderManagement/TarotReaderHeader.tsx
import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
  onOpenCreate: () => void;
}

const TarotReaderHeader: React.FC<Props> = ({ onOpenCreate }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">📋 Quản Lý Tarot Reader</h2>
      <Button type="primary" icon={<PlusOutlined />} onClick={onOpenCreate}>
        Thêm Tarot Reader
      </Button>
    </div>
  );
};

export default TarotReaderHeader;
