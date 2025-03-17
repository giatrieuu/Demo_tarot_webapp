import React from "react";
import { Card, Statistic } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";

const ReaderCount: React.FC = () => {
  return (
    <Card bordered={false} className="shadow-md">
      <Statistic title="Số Lượng Tarot Reader" value={120} />
      <UsergroupAddOutlined className="text-4xl text-blue-500 mt-2" />
    </Card>
  );
};

export default ReaderCount;
