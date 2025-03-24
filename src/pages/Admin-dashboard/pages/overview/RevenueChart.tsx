// RevenueChart.tsx
import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
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
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { fetchAllBookings } from "../../../../services/bookingServices";

// Định nghĩa interface cho booking
interface Booking {
  id: string;
  userId: string;
  readerId: string;
  timeStart: string;
  timeEnd: string;
  createAt: string;
  total: number;
  rating: number | null;
  feedback: string | null;
  status: number;
  note: string | null;
}

const RevenueChart: React.FC = () => {
  const [chartData, setChartData] = useState<{ month: string; revenue: number }[]>([]);
  const [selectedYear, setSelectedYear] = useState(dayjs().year()); // Năm hiện tại (2025)
  const [allBookings, setAllBookings] = useState<Booking[]>([]); // Lưu toàn bộ bookings với type

  // Fetch dữ liệu bookings một lần duy nhất
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const bookings = await fetchAllBookings();
        const validBookings = bookings.filter((booking: Booking) => [1, 4].includes(booking.status));
        setAllBookings(validBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    loadBookings();
  }, []);

  // Cập nhật chart khi năm thay đổi
  useEffect(() => {
    if (allBookings.length === 0) return;

    // Tạo mảng 12 tháng cho năm được chọn
    const startDate = dayjs(`${selectedYear}-01-01`);
    const months = Array.from({ length: 12 }, (_, i) =>
      startDate.add(i, "month").format("YYYY-MM")
    );

    // Nhóm doanh thu theo tháng
    const revenueByMonth: Record<string, number> = {};
    allBookings.forEach(booking => {
      const month = dayjs(booking.createAt).format("YYYY-MM");
      revenueByMonth[month] = (revenueByMonth[month] || 0) + (booking.total || 0);
    });

    // Format data cho chart
    const formattedData = months.map(month => ({
      month: dayjs(month).format("MMM"), // Hiển thị tên tháng ngắn (Jan, Feb, ...)
      revenue: revenueByMonth[month] || 0
    }));

    setChartData(formattedData);
  }, [selectedYear, allBookings]);

  // Xử lý next/prev năm
  const handleYearChange = (delta: number) => {
    setSelectedYear(prevYear => prevYear + delta);
  };

  return (
    <Card title="📈 Doanh Thu Theo Tháng" bordered={false} className="shadow-md">
      <div className="flex items-center justify-between mb-4">
        <Button icon={<LeftOutlined />} onClick={() => handleYearChange(-1)} />
        <span className="font-semibold text-lg">{selectedYear}</span>
        <Button icon={<RightOutlined />} onClick={() => handleYearChange(1)} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
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