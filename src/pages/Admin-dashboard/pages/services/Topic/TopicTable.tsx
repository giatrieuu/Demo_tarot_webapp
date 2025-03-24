// components/TopicManagement/TopicTable.tsx
import React from "react";
import { Table } from "antd";
import TopicActions from "./TopicActions";


interface Topic {
  id: string;
  name: string;
}

interface TopicTableProps {
  topics: Topic[];
  onEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

const TopicTable: React.FC<TopicTableProps> = ({ topics, onEdit, onDelete }) => {
  const columns = [
    { title: "Tên Chủ Đề", dataIndex: "name", key: "name" },
    {
      title: "Thao Tác",
      key: "action",
      render: (_: any, record: Topic) => (
        <TopicActions
          topicId={record.id}
          name={record.name}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={topics}
      bordered
      pagination={{ pageSize: 5 }}
      rowKey="id"
    />
  );
};

export default TopicTable;