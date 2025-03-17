import React, { useEffect, useState } from "react";
import { Modal, Typography, Button, Spin, message } from "antd";

const { Title, Text } = Typography;

interface BookingDetailModalProps {
  visible: boolean;
  booking: any;
  onClose: () => void;
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  visible,
  booking,
  onClose,
}) => {
  const [loading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(booking?.booking?.status || null);

  useEffect(() => {
    if (booking) {
      setStatus(booking.booking.status);
    }
  }, [booking]);

  const handleCallVideo = () => {
    message.info("📞 Redirecting to video call...");
    window.open("https://meet.google.com/", "_blank"); // Mở Google Meet (hoặc nền tảng khác)
  };

  return (
    <Modal
      title="📄 Chi tiết lịch hẹn"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      {loading ? (
        <div className="flex justify-center py-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className="p-4 space-y-3">
          <Title level={4}>{booking.userName}</Title>
          <Text className="block text-gray-600">
            🕒 {new Date(booking.booking.timeStart).toLocaleString()} -{" "}
            {new Date(booking.booking.timeEnd).toLocaleString()}
          </Text>
          <Text className="block">📝 {booking.booking.note || "Không có ghi chú"}</Text>

          <div className="mt-4 flex justify-end space-x-2">
            {status === 1 && (
              <Button type="primary" onClick={handleCallVideo}>
                📹 Video Call
              </Button>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BookingDetailModal;
