import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { fetchAllBookings } from "../../../../services/bookingServices";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

const RatingChart: React.FC = () => {
  const readerId = useSelector((state: RootState) => state.auth.userId);
  const [ratingData, setRatingData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    if (!readerId) return;

    fetchAllBookings()
      .then((data) => {
        if (!data || data.length === 0) {
          return;
        }

        // 🔹 Lọc danh sách booking có rating dành cho reader này
        const readerBookings = data.filter((booking: any) => booking.readerId === readerId && booking.rating !== null);

        // 🔹 Đếm số lượng rating theo từng mức điểm (1 sao -> 5 sao)
        const ratingCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        readerBookings.forEach((booking: any) => {
          const rating = booking.rating;
          if (ratingCounts[rating] !== undefined) {
            ratingCounts[rating] += 1;
          }
        });

        // 🔹 Format lại dữ liệu cho biểu đồ
        const formattedData = Object.keys(ratingCounts).map((key) => ({
          name: `${key} Star${key === "1" ? "" : "s"}`,
          value: ratingCounts[parseInt(key)],
        }));

        setRatingData(formattedData);
      })
      .catch(() => {
        console.error("Lỗi khi tải dữ liệu Rating.");
      });
  }, [readerId]);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-3">⭐ Customer Ratings</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={ratingData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
            {ratingData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value} Ratings`, name]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;
