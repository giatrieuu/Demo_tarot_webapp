import React, { useEffect, useState } from "react";
import { Modal, Typography, Button, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchLiveKitToken } from "../../../../services/livekitService";
import dayjs from "dayjs";

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

  const timeStart = dayjs(booking.booking.timeStart);
  const timeEnd = dayjs(booking.booking.timeEnd);
  const now = dayjs();
  const minutesToStart = timeStart.diff(now, "minute");

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
      const data = await fetchLiveKitToken(booking.booking.id, booking.userName);

      if (!data) {
        message.error("Không thể lấy token LiveKit từ server!");
        return;
      }

      message.info("📞 Đang chuyển đến phòng gọi...");
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

  const renderCallButton = () => {
    if (status !== 1) return null;

    if (now.isAfter(timeEnd)) {
      return <Button disabled>⏱ Cuộc gọi đã kết thúc</Button>;
    }

    if (now.isBefore(timeStart)) {
      if (minutesToStart <= 15 && minutesToStart > 3) {
        return (
          <Button disabled className="animate-pulse text-blue-600 font-semibold border border-blue-500 bg-blue-50">
            ⏳ Cuộc gọi sắp bắt đầu
          </Button>
        );
      }

      if (minutesToStart <= 3) {
        return (
          <Button type="primary" onClick={handleCallVideo} loading={loading}>
            📹 Video Call
          </Button>
        );
      }

      return <Button disabled>⏳ Chưa tới giờ gọi</Button>;
    }

    if (now.isAfter(timeStart) && now.isBefore(timeEnd)) {
      return (
        <Button type="primary" onClick={handleCallVideo} loading={loading}>
          📹 Video Call
        </Button>
      );
    }

    return null;
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
            🕒 {timeStart.format("HH:mm DD/MM/YYYY")} - {timeEnd.format("HH:mm")}
          </Text>
          <Text className="block">📝 {booking.booking.note || "Không có ghi chú"}</Text>

          <div className="mt-4 flex justify-end space-x-2">
            {renderCallButton()}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BookingDetailModal;
