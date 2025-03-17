import React, { useEffect, useState } from "react";
import { Calendar, Badge, Typography, Spin } from "antd";
import type { Dayjs } from "dayjs";
import type { BadgeProps } from "antd";
import BookingModal from "./BookingModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { fetchBookingsByReaderId } from "../../../../services/bookingServices";

const { Title } = Typography;

const Booking: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId); 
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Gọi API để lấy danh sách booking
  useEffect(() => {
    if (!userId) return;

    fetchBookingsByReaderId(userId, 1, 100)
      .then((data) => {
        console.log("Fetched Bookings:", data);
        setBookings(data || []);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  // Xử lý hiển thị booking trên lịch
  const getListData = (value: Dayjs) => {
    const dateString = value.format("YYYY-MM-DD");
    return bookings
      .filter((booking) => booking.booking.timeStart.startsWith(dateString))
      .map((booking) => ({
        type:
          booking.booking.status === 4
            ? "success"
            : booking.booking.status === 0
            ? "warning"
            : "error",
        content: `${booking.userName} - ${new Date(booking.booking.timeStart).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
      }));
  };

  // Hiển thị danh sách booking trong từng ô lịch
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type as BadgeProps["status"]} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };


  const onSelectDate = (value: Dayjs) => {
    setSelectedDate(value.format("YYYY-MM-DD"));
    setModalVisible(true);
  };

  return (
    <div className="p-6 bg-white-900 min-h-screen">
      <Title level={3} className="text-center text-white">📅 Lịch Booking</Title>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {loading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Calendar cellRender={dateCellRender} onSelect={onSelectDate} />
        )}
      </div>


      <BookingModal selectedDate={selectedDate} visible={modalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default Booking;
