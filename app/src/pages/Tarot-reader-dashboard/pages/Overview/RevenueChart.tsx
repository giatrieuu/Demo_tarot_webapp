// RevenueChart.tsx
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { RootState } from "../../../../redux/store";
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
  const readerId = useSelector((state: RootState) => state.auth.userId);
  const [bookingData, setBookingData] = useState<{ date: string; revenue: number; bookings: number }[]>([]);
  const [startDate, setStartDate] = useState(dayjs()); // Ngày bắt đầu của tuần hiển thị
  const [chartData, setChartData] = useState<{ date: string; revenue: number; bookings: number }[]>([]);

  useEffect(() => {
    if (!readerId) return;

    fetchAllBookings()
      .then((data) => {
        if (!data || data.length === 0) {
          return;
        }

        // 🔹 Lọc danh sách Booking theo Reader ID
        const readerBookings = data.filter((booking: Booking) => booking.readerId === readerId);

        // 🔹 Nhóm Booking theo từng ngày và tính tổng doanh thu mỗi ngày
        const revenueByDate: Record<string, { revenue: number; bookings: number }> = {};

        readerBookings.forEach((booking: Booking) => {
          const date = dayjs(booking.createAt).format("YYYY-MM-DD");
          if (!revenueByDate[date]) {
            revenueByDate[date] = { revenue: 0, bookings: 0 };
          }
          revenueByDate[date].revenue += booking.total || 0;
          revenueByDate[date].bookings += 1;
        });

        // Chuyển thành mảng có thể sử dụng cho Recharts
        const formattedData = Object.entries(revenueByDate).map(([date, data]) => ({
          date,
          revenue: data.revenue,
          bookings: data.bookings,
        }));

        // Sắp xếp theo ngày tăng dần
        formattedData.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

        setBookingData(formattedData);
        updateChartData(formattedData, startDate);
      })
      .catch(() => {
        console.error("Lỗi khi tải dữ liệu Booking.");
      });
  }, [readerId]);

  // 🔹 Cập nhật dữ liệu biểu đồ theo 7 ngày
  const updateChartData = (data: { date: string; revenue: number; bookings: number }[], date: dayjs.Dayjs) => {
    const filteredData = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = date.add(i, "day").format("YYYY-MM-DD");
      const found = data.find((item) => item.date === currentDate);
      filteredData.push(found || { date: currentDate, revenue: 0, bookings: 0 });
    }

    setChartData(filteredData);
  };

  // 🔹 Xử lý khi bấm Next / Prev để xem tuần trước hoặc sau
  const handleDateChange = (days: number) => {
    const newStartDate = startDate.add(days, "day");
    setStartDate(newStartDate);
    updateChartData(bookingData, newStartDate);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-3">📈 Weekly Revenue</h2>

      <div className="flex items-center justify-between mb-4">
        <Button icon={<LeftOutlined />} onClick={() => handleDateChange(-7)} />
        <span className="font-semibold text-lg">
          {startDate.format("DD/MM/YYYY")} - {startDate.add(6, "day").format("DD/MM/YYYY")}
        </span>
        <Button icon={<RightOutlined />} onClick={() => handleDateChange(7)} />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="date" tickFormatter={(date) => dayjs(date).format("DD/MM")} />
          <YAxis />
          <Tooltip formatter={(value, _, props) => [`${value} VND`, `Bookings: ${props.payload.bookings}`]} />
          <Bar dataKey="revenue" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;