import React, { useEffect, useState } from "react";
import { Modal, Typography, Button, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchLiveKitToken } from "../../../../services/livekitService";


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
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(booking?.booking?.status || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (booking) {
      setStatus(booking.booking.status);
    }
  }, [booking]);

  const handleCallVideo = async () => {
    if (!booking?.booking?.id || !booking?.userName) {
      message.error("Không đủ thông tin để bắt đầu video call!");
      return;
    }

    setLoading(true);
    try {
      // Gọi API để lấy token và serverUrl
      const data = await fetchLiveKitToken(booking.booking.id, booking.userName);

      if (!data) {
        message.error("Không thể lấy token LiveKit từ server!");
        setLoading(false);
        return;
      }

      message.info("📞 Redirecting to video call...");
      // Điều hướng đến trang VideoCall với token và serverUrl
      navigate(`/video-call/${booking.booking.id}`, {
        state: { livekitToken: data.token, serverUrl: data.serverUrl },
      });
    } catch (error) {
      message.error("Lỗi khi bắt đầu video call!");
      console.error("Error starting video call:", error);
    } finally {
      setLoading(false);
    }
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
              <Button type="primary" onClick={handleCallVideo} loading={loading}>
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