import React from "react";
import { Card, Statistic } from "antd";
import { DollarOutlined, CalendarOutlined, UserOutlined, StarOutlined } from "@ant-design/icons";

const OverviewStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="shadow-md">
        <Statistic title="Total Revenue" value={5000000} prefix="VND" suffix="" valueStyle={{ color: "#3f8600" }} />
        <DollarOutlined className="text-4xl text-green-500 mt-2" />
      </Card>

      <Card className="shadow-md">
        <Statistic title="Total Readings" value={120} />
        <CalendarOutlined className="text-4xl text-blue-500 mt-2" />
      </Card>

      <Card className="shadow-md">
        <Statistic title="New Bookings" value={15} />
        <UserOutlined className="text-4xl text-purple-500 mt-2" />
      </Card>

      <Card className="shadow-md">
        <Statistic title="Average Rating" value={4.5} suffix="/5" />
        <StarOutlined className="text-4xl text-yellow-500 mt-2" />
      </Card>
    </div>
  );
};

export default OverviewStats;
