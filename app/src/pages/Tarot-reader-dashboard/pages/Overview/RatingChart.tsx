import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const ratingData = [
  { name: "5 Stars", value: 50 },
  { name: "4 Stars", value: 30 },
  { name: "3 Stars", value: 15 },
  { name: "2 Stars", value: 3 },
  { name: "1 Star", value: 2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

const RatingChart: React.FC = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-3">⭐ Customer Ratings</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={ratingData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
            {ratingData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;
