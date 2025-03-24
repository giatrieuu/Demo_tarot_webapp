// FeedbackOverview.tsx
import React, { useState, useEffect } from "react";
import { Card, Statistic } from "antd";
import { StarOutlined, MessageOutlined } from "@ant-design/icons";
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

const FeedbackOverview: React.FC = () => {
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const loadFeedbackData = async () => {
      try {
        const bookings = await fetchAllBookings();

        // Lọc bookings với status 4
        const status4Bookings = bookings.filter((booking: Booking) => booking.status === 4);

        // Tính tổng số đánh giá (tất cả status 4)
        const total = status4Bookings.length;
        setTotalReviews(total);

        // Lọc các booking status 4 có rating để tính trung bình
        const ratedBookings = status4Bookings.filter((booking: Booking) => booking.rating !== null);

        // Tính điểm trung bình
        if (ratedBookings.length > 0) {
          const sumRating = ratedBookings.reduce((sum: number, booking: Booking) => sum + (booking.rating || 0), 0);
          const avg = sumRating / ratedBookings.length;
          setAverageRating(parseFloat(avg.toFixed(1))); // Làm tròn đến 1 chữ số thập phân
        } else {
          setAverageRating(0);
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    loadFeedbackData();
  }, []);

  return (
    <Card bordered={false} className="shadow-md">
      <div className="flex justify-between">
        <Statistic
          title="Tổng Số Đánh Giá"
          value={totalReviews}
          prefix={<MessageOutlined />}
        />
        <Statistic
          title="Điểm Trung Bình"
          value={averageRating}
          suffix="/ 5"
          prefix={<StarOutlined />}
        />
      </div>
    </Card>
  );
};

export default FeedbackOverview;