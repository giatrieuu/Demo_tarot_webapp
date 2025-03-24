// src/components/TarotReaderManagement/TarotReaderActions.tsx
import React from "react";
import { Button, Popconfirm, Space, Tooltip, message } from "antd";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { changeReaderStatus } from "../../../../../services/tarotReaderServices";

interface ActionsProps {
  readerId: string;
  status: string;
  onStatusChange: (id: string, newStatus: string) => void;
}

const TarotReaderActions: React.FC<ActionsProps> = ({
  readerId,
  status,
  onStatusChange,
}) => {
  const handleBlockUnblock = async () => {
    await changeReaderStatus(readerId);
    const newStatus = status === "Blocked" ? "Active" : "Blocked";
    onStatusChange(readerId, newStatus); // Cập nhật ngay không cần reload
    message.success(
      `Đã ${newStatus === "Blocked" ? "Block" : "Unblock"} Tarot Reader!`
    );
  };

  return (
    <Space>
      <Tooltip title={status === "Blocked" ? "Unblock" : "Block"}>
        <Popconfirm
          title={`Bạn chắc chắn muốn ${
            status === "Blocked" ? "Unblock" : "Block"
          } Reader này?`}
          onConfirm={handleBlockUnblock}
          okText="Có"
          cancelText="Không"
        >
          <Button
            danger={status !== "Blocked"}
            type={status === "Blocked" ? "default" : "primary"}
            icon={status === "Blocked" ? <UnlockOutlined /> : <LockOutlined />}
          >
            {status === "Blocked" ? "Unblock" : "Block"}
          </Button>
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};

export default TarotReaderActions;
