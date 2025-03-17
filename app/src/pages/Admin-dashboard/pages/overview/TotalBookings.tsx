import React from "react";
import { Card, Statistic } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const TotalBookings: React.FC = () => {
  return (
    <Card bordered={false} className="shadow-md">
      <Statistic title="Tổng Số Lịch Hẹn" value={2450} />
      <CalendarOutlined className="text-4xl text-orange-500 mt-2" />
    </Card>
  );
};

export default TotalBookings;
