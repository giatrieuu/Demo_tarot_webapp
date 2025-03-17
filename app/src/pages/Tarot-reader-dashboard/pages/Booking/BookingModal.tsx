import React, { useEffect, useState } from "react";
import { Modal, Typography, Spin } from "antd";
import { fetchBookingsByReaderId } from "../../../../services/bookingServices";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import BookingDetailModal from "./BookingDetailModal";

const { Text } = Typography;

// ✅ Định nghĩa kiểu Booking
interface Booking {
  booking: {
    id: string;
    timeStart: string;
    status: number;
  };
  userName: string;
}

interface BookingModalProps {
  selectedDate: string | null;
  visible: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ selectedDate, visible, onClose }) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  useEffect(() => {
    if (!userId || !selectedDate) return;

    setLoading(true);
    fetchBookingsByReaderId(userId, 1, 100)
      .then((data) => {
        const filteredBookings = data.filter(
          (booking: Booking) => 
            booking.booking.timeStart.startsWith(selectedDate) &&
            booking.booking.status === 1
        );
        setBookings(filteredBookings);
      })
      .finally(() => setLoading(false));
  }, [userId, selectedDate]);

  const openDetailModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setDetailVisible(true);
  };

  return (
    <>
      <Modal
        title={`📅 Lịch hẹn ngày ${selectedDate}`}
        open={visible}
        onCancel={onClose}
        footer={null}
      >
        {loading ? (
          <div className="flex justify-center py-5">
            <Spin size="large" />
          </div>
        ) : bookings.length > 0 ? (
          <ul className="space-y-3">
            {bookings.map((booking: Booking) => (
              <li
                key={booking.booking.id}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200"
                onClick={() => openDetailModal(booking)}
              >
                <div>
                  <Text strong className="text-lg">{booking.userName}</Text> -{" "}
                  <span className="text-gray-600">
                    {new Date(booking.booking.timeStart).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">Không có lịch hẹn nào.</p>
        )}
      </Modal>

      {selectedBooking && (
        <BookingDetailModal
          visible={detailVisible}
          booking={selectedBooking}
          onClose={() => setDetailVisible(false)}
        />
      )}
    </>
  );
};

export default BookingModal;
