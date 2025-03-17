// components/TarotReaderManagement/TarotReaderTable.tsx
import React from "react";
import { Table } from "antd";
import TarotReaderActions from "./TarotReaderActions";

interface Reader {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  dob: string | null;
  status: string;
  password?: string;
}

interface TarotReaderTableProps {
    readers: Reader[];
    onStatusChange: (id: string, newStatus: string) => void;
  }
  const TarotReaderTable: React.FC<TarotReaderTableProps> = ({
    readers,
    onStatusChange,
  }) => {
  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số Điện Thoại", dataIndex: "phone", key: "phone" },
    {
      title: "Ngày Sinh",
      dataIndex: "dob",
      key: "dob",
      render: (dob: string | null) =>
        dob ? new Date(dob).toLocaleDateString("vi-VN") : "Không có",
    },
    { title: "Mật khẩu", dataIndex: "password", key: "password" },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded-full text-white text-xs ${
            status === "Active" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
        title: "Thao Tác",
        key: "action",
        render: (_: any, record: Reader) => (
          <TarotReaderActions
            readerId={record.id}
            status={record.status}
            onStatusChange={onStatusChange} // Truyền xuống cho Actions
          />
        ),
      },
    
    ];
    

  return (
    <Table
      columns={columns}
      dataSource={readers}
      bordered
      pagination={{ pageSize: 5 }}
      rowKey="id"
    />
  );
};

export default TarotReaderTable;
