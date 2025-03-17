import React from "react";
import { Card, Statistic } from "antd";
import { StarOutlined, MessageOutlined } from "@ant-design/icons";

const FeedbackOverview: React.FC = () => {
  return (
    <Card bordered={false} className="shadow-md">
      <div className="flex justify-between">
        <Statistic title="Tổng Số Đánh Giá" value={350} prefix={<MessageOutlined />} />
        <Statistic title="Điểm Trung Bình" value={4.7} suffix="/ 5" prefix={<StarOutlined />} />
      </div>
    </Card>
  );
};

export default FeedbackOverview;
