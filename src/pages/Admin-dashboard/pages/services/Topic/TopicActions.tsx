// components/TopicManagement/TopicActions.tsx
import React from "react";
import { Button, Popconfirm, Space, Tooltip, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteTopic } from "../../../../../services/topicServices";


interface ActionsProps {
  topicId: string;
  name: string;
  onEdit: (id: string, name: string) => void; // This should open the modal
  onDelete: (id: string) => void;
}

const TopicActions: React.FC<ActionsProps> = ({
  topicId,
  name,
  onEdit,
  onDelete,
}) => {
  const handleDelete = async () => {
    try {
      await deleteTopic(topicId);
      message.success("Xóa chủ đề thành công!");
      onDelete(topicId);
    } catch (error) {
      message.error("Xóa chủ đề thất bại!");
    }
  };

  return (
    <Space>
      <Tooltip title="Chỉnh sửa">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => onEdit(topicId, name)} // Trigger modal opening
        >
          Sửa
        </Button>
      </Tooltip>
      <Tooltip title="Xóa">
        <Popconfirm
          title="Bạn chắc chắn muốn xóa chủ đề này?"
          onConfirm={handleDelete}
          okText="Có"
          cancelText="Không"
        >
          <Button danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};

export default TopicActions;