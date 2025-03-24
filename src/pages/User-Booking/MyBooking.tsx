// MyBooking.tsx
import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Button, message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchBookingsByUserId,
  createPaymentQR,
} from "../../services/bookingServices";
import { RootState } from "../../redux/store";
import dayjs from "dayjs";

const { Title } = Typography;

interface Booking {
  booking: {
    id: string;
    timeStart: string;
    timeEnd: string;
    createAt: string;
    status: number;
    total: number;
  };
  userName: string;
}

const MyBooking: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
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

        const filtered = data.filter((item: Booking) => {
          const { status, timeEnd } = item.booking;
          // ❌ Nếu status là 0 và đã qua thời gian end thì bỏ qua
          if (status === 0 && dayjs().isAfter(dayjs(timeEnd))) {
            return false;
          }
          return true;
        });

        // 🔽 Sắp xếp theo thời gian đặt lịch giảm dần (mới nhất lên đầu)
        const sorted = filtered.sort(
          (a: Booking, b: Booking) =>
            dayjs(b.booking.createAt).valueOf() -
            dayjs(a.booking.createAt).valueOf()
        );

        setBookings(sorted);
      } catch (error) {
        console.error("Lỗi khi tải danh sách booking!", error);
        message.error("Không thể tải danh sách booking!");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [userId]);

  const handleRetryPayment = async (
    bookingId: string,
    amount: number
  ): Promise<void> => {
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

  const columns = [
    { title: "Booking ID", dataIndex: ["booking", "id"], key: "id" },
    { title: "Tarot Reader", dataIndex: "userName", key: "userName" },
    {
      title: "Thời gian bắt đầu - kết thúc",
      key: "time",
      render: (_: any, record: Booking) =>
        `${dayjs(record.booking.timeStart).format("HH:mm")} - ${dayjs(
          record.booking.timeEnd
        ).format("HH:mm")} | ${dayjs(record.booking.timeStart).format(
          "DD/MM/YYYY"
        )}`,
    },
    {
      title: "Thời gian đặt lịch",
      dataIndex: ["booking", "createAt"],
      key: "createAt",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Tổng tiền",
      dataIndex: ["booking", "total"],
      key: "total",
      render: (val: number) => `${val.toLocaleString()} VND`,
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
        const { id, total, timeStart, timeEnd } = record.booking;
        const now = dayjs();
        const start = dayjs(timeStart);
        const end = dayjs(timeEnd);
        const minutesToStart = start.diff(now, "minute");

        if (status === 1) {
          if (minutesToStart <= 3 && now.isBefore(start)) {
            return (
              <Button
                type="primary"
                onClick={() => navigate(`/video-call/${id}`)}
              >
                📹 Bắt đầu sớm
              </Button>
            );
          }

          if (minutesToStart <= 15 && minutesToStart > 3) {
            return (
              <Button
                disabled
                className="!bg-teal-100 !text-teal-700 !border-teal-400 animate-pulse cursor-not-allowed"
                icon={<span>⏳</span>}
              >
                Cuộc gọi sắp bắt đầu
              </Button>
            );
          }

          if (now.isAfter(start) && now.isBefore(end)) {
            return (
              <Button
                type="primary"
                onClick={() => navigate(`/video-call/${id}`)}
              >
                📹 Video Call
              </Button>
            );
          }

          if (now.isAfter(end)) {
            return <Button disabled>⏱ Cuộc gọi đã kết thúc</Button>;
          }

          return <Button disabled>⏳ Chưa tới thời gian gọi</Button>;
        }

        if (status === 0) {
          return (
            <Button onClick={() => handleRetryPayment(id, total)}>
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
          <Table
            columns={columns}
            dataSource={bookings}
            rowKey={(record) => record.booking.id}
            pagination={{ pageSize: 6 }}
          />
        )}
      </div>
    </div>
  );
};

export default MyBooking;