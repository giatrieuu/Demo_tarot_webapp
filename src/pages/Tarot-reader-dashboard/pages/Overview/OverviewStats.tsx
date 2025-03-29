import React, { useEffect, useState } from "react";
import { Card, Statistic, Spin, message } from "antd";
import { DollarOutlined, CalendarOutlined, UserOutlined, StarOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";

import dayjs from "dayjs";
import { RootState } from "../../../../redux/store";
import { fetchAllBookings } from "../../../../services/bookingServices";

const OverviewStats: React.FC = () => {
  const readerId = useSelector((state: RootState) => state.auth.userId);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [newBookings, setNewBookings] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    if (!readerId) return;

    setLoading(true);

    fetchAllBookings()
      .then((data) => {
        if (!data || data.length === 0) {
          message.warning("Không có dữ liệu đặt lịch.");
          setLoading(false);
          return;
        }

        // 🔹 Lọc danh sách Booking theo Reader ID
        const readerBookings = data.filter((booking: any) => booking.readerId === readerId && booking.status === 1);


        // 🔹 Tính tổng doanh thu
        const totalRevenueCalc = readerBookings.reduce((sum: number, booking: any) => sum + (booking.total || 0), 0);

        // 🔹 Tính tổng số booking
        const totalBookingsCalc = readerBookings.length;

        // 🔹 Lọc các booking trong ngày hôm nay
        const today = dayjs().format("YYYY-MM-DD");
        const newBookingsCalc = readerBookings.filter((booking: any) =>
          dayjs(booking.timeStart).format("YYYY-MM-DD") === today
        ).length;

        // 🔹 Tính điểm trung bình từ rating (bỏ qua rating null)
        const ratings = readerBookings.filter((b: any) => b.rating !== null).map((b: any) => b.rating);
        const totalRating = ratings.reduce((sum: number, rating: number) => sum + rating, 0);
        const averageRatingCalc = ratings.length > 0 ? totalRating / ratings.length : 0;

        // Cập nhật state
        setTotalRevenue(totalRevenueCalc);
        setTotalBookings(totalBookingsCalc);
        setNewBookings(newBookingsCalc);
        setAverageRating(averageRatingCalc);

        setLoading(false);
      })
      .catch(() => {
        message.error("Lỗi khi tải dữ liệu.");
        setLoading(false);
      });
  }, [readerId]);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="shadow-md">
        <Statistic title="Total Revenue" value={totalRevenue} prefix="VND" valueStyle={{ color: "#3f8600" }} />
        <DollarOutlined className="text-4xl text-green-500 mt-2" />
      </Card>

      <Card className="shadow-md">
        <Statistic title="Total Readings" value={totalBookings} />
        <CalendarOutlined className="text-4xl text-blue-500 mt-2" />
      </Card>

      <Card className="shadow-md">
        <Statistic title="New Bookings Today" value={newBookings} />
        <UserOutlined className="text-4xl text-purple-500 mt-2" />
      </Card>

      <Card className="shadow-md">
        <Statistic title="Average Rating" value={averageRating.toFixed(1)} suffix="/5" />
        <StarOutlined className="text-4xl text-yellow-500 mt-2" />
      </Card>
    </div>
  );
};

export default OverviewStats;
