// BookingChart.tsx
import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
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

const BookingChart: React.FC = () => {
  const [bookingData, setBookingData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(dayjs("2025-03-23")); // Ngày hiện tại
  const [chartData, setChartData] = useState<{ day: string; bookings: number }[]>([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const bookings = await fetchAllBookings();
        
        // Lọc bookings với status 1 và 4 với type rõ ràng
        const validBookings = bookings.filter((booking: Booking) => 
          [1, 4].includes(booking.status)
        );

        // Nhóm bookings theo ngày
        const bookingsByDate: Record<string, number> = {};
        validBookings.forEach((booking: Booking) => {
          const date = dayjs(booking.createAt).format("YYYY-MM-DD");
          bookingsByDate[date] = (bookingsByDate[date] || 0) + 1;
        });

        // Chuyển thành mảng và sắp xếp theo ngày
        const formattedData = Object.entries(bookingsByDate)
          .map(([date, bookings]) => ({ date, bookings }))
          .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

        setBookingData(formattedData);
        updateChartData(formattedData, startDate);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    loadBookings();
  }, []);

  // Cập nhật dữ liệu chart cho 7 ngày
  const updateChartData = (data: any[], start: dayjs.Dayjs) => {
    const filteredData = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = start.add(i, "day").format("YYYY-MM-DD");
      const found = data.find(item => item.date === currentDate);
      filteredData.push({
        day: dayjs(currentDate).format("DD/MM"),
        bookings: found ? found.bookings : 0
      });
    }

    setChartData(filteredData);
  };

  // Xử lý next/prev
  const handleDateChange = (days: number) => {
    const newStartDate = startDate.add(days, "day");
    setStartDate(newStartDate);
    updateChartData(bookingData, newStartDate);
  };

  return (
    <Card title="📊 Số Lượng Đặt Lịch" bordered={false} className="shadow-md">
      <div className="flex items-center justify-between mb-4">
        <Button icon={<LeftOutlined />} onClick={() => handleDateChange(-7)} />
        <span className="font-semibold text-lg">
          {startDate.format("DD/MM/YYYY")} - {startDate.add(6, "day").format("DD/MM/YYYY")}
        </span>
        <Button icon={<RightOutlined />} onClick={() => handleDateChange(7)} />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={chartData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="bookings" 
            fill="#007aff" 
            barSize={40} 
            radius={[5, 5, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BookingChart;