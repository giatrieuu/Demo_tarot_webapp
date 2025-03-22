import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Button, message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBookingsByUserId, createPaymentQR } from "../../services/bookingServices";
import { RootState } from "../../redux/store";

const { Title } = Typography;

interface Booking {
  booking: {
    id: string;
    timeStart: string;
    status: number;
    total: number;
  };
  userName: string;
}

const MyBooking: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const livekitToken = useSelector((state: RootState) => state.auth.token); // Token LiveKit
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      message.error("Vui lòng đăng nhập để xem danh sách booking!");
      return;
    }

    const loadBookings = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await fetchBookingsByUserId(userId);
        setBookings(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách booking!", error);
        message.error("Không thể tải danh sách booking!");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [userId]);

  const handleRetryPayment = async (bookingId: string, amount: number): Promise<void> => {
    try {
      const response = await createPaymentQR({ orderId: bookingId, amount });
      if (response.qrCodeUrl) {
        window.open(response.qrCodeUrl, "_blank");
      } else {
        throw new Error("Không thể tạo QR thanh toán.");
      }
    } catch (error) {
      message.error("Lỗi khi tạo lại thanh toán!");
    }
  };

  const getStatusText = (status: number): string => {
    switch (status) {
      case 0:
        return "❌ Thanh toán thất bại - Cần thanh toán lại";
      case 1:
        return "✅ Đã thanh toán - Sẵn sàng Video Call";
      default:
        return "❓ Không xác định";
    }
  };

  const startVideoCall = (bookingId: string): void => {
    if (!livekitToken) {
      message.error("Không tìm thấy token để bắt đầu video call!");
      return;
    }
    navigate(`/video-call/${bookingId}`, { state: { livekitToken } }); // Truyền token qua state
  };

  const columns = [
    { title: "Booking ID", dataIndex: ["booking", "id"], key: "id" },
    { title: "Tarot Reader", dataIndex: "userName", key: "userName" },
    {
      title: "Thời gian",
      dataIndex: ["booking", "timeStart"],
      key: "timeStart",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "Trạng thái",
      dataIndex: ["booking", "status"],
      key: "status",
      render: (status: number) => getStatusText(status),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: Booking) => {
        const status = record.booking.status;

        if (status === 1) {
          return (
            <Button
              type="primary"
              onClick={() => startVideoCall(record.booking.id)}
            >
              📹 Video Call
            </Button>
          );
        }

        if (status === 0) {
          return (
            <Button
              type="default"
              onClick={() =>
                handleRetryPayment(record.booking.id, Math.abs(record.booking.total))
              }
            >
              💳 Thanh toán lại
            </Button>
          );
        }

        return <Button disabled>❓ Không xác định</Button>;
      },
    },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <Title level={3} className="text-center text-black">
        📋 Danh Sách Lịch Đặt
      </Title>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {loading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table columns={columns} dataSource={bookings} rowKey={(record) => record.booking.id} />
        )}
      </div>
    </div>
  );
};

export default MyBooking;