import React from "react";
import { Card, Statistic } from "antd";
import { TeamOutlined } from "@ant-design/icons";

const UserCount: React.FC = () => {
  return (
    <Card bordered={false} className="shadow-md">
      <Statistic title="Số Lượng Người Dùng" value={850} />
      <TeamOutlined className="text-4xl text-purple-500 mt-2" />
    </Card>
  );
};

export default UserCount;
