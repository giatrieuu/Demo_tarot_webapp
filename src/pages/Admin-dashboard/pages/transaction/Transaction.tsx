// Transaction.tsx
import React, { useState, useEffect } from "react";
import { Table, Card, Tag, Avatar } from "antd";
import { fetchAllBookings } from "../../../../services/bookingServices";
import { fetchUserWithImages } from "../../../../services/userServices";
import dayjs from "dayjs";

// Định nghĩa interface cho Booking
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

const Transaction: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const bookings: Booking[] = await fetchAllBookings();

        // Lấy thông tin user cho từng booking
        const userIds: string[] = [...new Set(bookings.map((booking: Booking) => booking.userId))]; // Lấy danh sách userId duy nhất
        const userPromises = userIds.map(userId => fetchUserWithImages(userId));
        const userResponses = await Promise.all(userPromises);

        // Tạo map để tra cứu thông tin user
        const userMap = new Map();
        userResponses.forEach((response: any) => {
          userMap.set(response.user.id, {
            name: response.user.name,
            avatar: response.url[0] || "https://i.pravatar.cc/40", // Ảnh mặc định nếu không có
          });
        });

        // Kết hợp thông tin user vào bookings
        const enrichedBookings = bookings.map((booking: Booking) => ({
          ...booking,
          userName: userMap.get(booking.userId)?.name || "Không xác định",
          userAvatar: userMap.get(booking.userId)?.avatar || "https://i.pravatar.cc/40",
        }));

        // Sắp xếp theo createAt giảm dần (mới nhất lên đầu)
        const sortedBookings = enrichedBookings.sort((a: any, b: any) =>
          dayjs(b.createAt).diff(dayjs(a.createAt))
        );

        setOrders(sortedBookings);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    loadOrders();
  }, []);

  const columns = [
    {
      title: "Mã Giao Dịch",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ảnh",
      dataIndex: "userAvatar",
      key: "userAvatar",
      render: (avatar: string) => <Avatar src={avatar} size={40} />,
    },
    {
      title: "Tên Người Dùng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Thời Gian Tạo",
      dataIndex: "createAt",
      key: "createAt",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      render: (value: number) => `₫${value.toLocaleString()}`,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        if (status === 0) {
          return <Tag color="red">Thanh toán thất bại</Tag>;
        } else if (status === 1 || status === 4) {
          return <Tag color="green">Thanh toán thành công</Tag>;
        }
        return <Tag color="gray">Không xác định</Tag>;
      },
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card title="📋 Danh Sách Giao Dịch" bordered={false} className="shadow-md">
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={{ pageSize: 10 }} // Phân trang 10 giao dịch mỗi trang
        />
      </Card>
    </div>
  );
};

export default Transaction;