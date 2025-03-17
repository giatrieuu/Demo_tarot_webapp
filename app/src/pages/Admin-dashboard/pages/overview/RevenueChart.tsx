import React from "react";
import { Card } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RevenueChart: React.FC = () => {
  const data = [
    { month: "Jan", revenue: 12000000 },
    { month: "Feb", revenue: 15000000 },
    { month: "Mar", revenue: 20000000 },
  ];

  return (
    <Card title="📈 Doanh Thu Theo Tháng" bordered={false} className="shadow-md">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
          <Tooltip formatter={(value) => `${value.toLocaleString()} VND`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#4CAF50"
            strokeWidth={3}
            dot={{ fill: "#4CAF50", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RevenueChart;
