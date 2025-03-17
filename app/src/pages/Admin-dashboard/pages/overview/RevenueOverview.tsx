import React from "react";
import { Card, Statistic } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";

const RevenueOverview: React.FC = () => {
  return (
    <Card bordered={false} className="shadow-md">
      <Statistic
        title="Tổng Doanh Thu"
        value={256000000}
        prefix="₫"
        valueStyle={{ color: "#3f8600" }}
        suffix="VND"
      />
      <DollarCircleOutlined className="text-4xl text-green-500 mt-2" />
    </Card>
  );
};

export default RevenueOverview;
