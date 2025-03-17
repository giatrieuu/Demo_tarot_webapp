import React from "react";
import { Card } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BookingChart: React.FC = () => {
  const data = [
    { day: "Thứ 2", bookings: 30 },
    { day: "Thứ 3", bookings: 45 },
    { day: "Thứ 4", bookings: 50 },
  ];

  return (
    <Card title="📊 Số Lượng Đặt Lịch" bordered={false} className="shadow-md">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="bookings" fill="#007aff" barSize={40} radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BookingChart;
