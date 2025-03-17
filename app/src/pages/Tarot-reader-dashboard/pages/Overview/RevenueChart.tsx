import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 500000 },
  { month: "Feb", revenue: 700000 },
  { month: "Mar", revenue: 850000 },
  { month: "Apr", revenue: 620000 },
  { month: "May", revenue: 920000 },
];

const RevenueChart: React.FC = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-3">📈 Monthly Revenue</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenueData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
