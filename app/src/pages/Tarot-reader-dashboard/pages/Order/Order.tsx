import React, { useEffect, useState } from "react";
import { Table, Badge, Rate, Typography, Avatar } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { fetchBookingsByReaderId } from "../../../../services/bookingServices";
import { fetchUserWithImages } from "../../../../services/userServices";


const { Text } = Typography;

const renderStatus = (status: number) => {
  switch (status) {
    case 0:
      return <Badge status="warning" text="Pending" />;
    case 1:
      return <Badge status="processing" text="In Progress" />;
    case 4:
      return <Badge status="success" text="Confirmed" />;
    default:
      return <Badge status="default" text="Unknown" />;
  }
};

const columns = [
  {
    title: "User",
    dataIndex: "userName",
    key: "user",
    render: (text: string, record: any) => (
      <div className="flex items-center space-x-3">
        <Avatar src={record.avatar || "https://via.placeholder.com/40"} size={40} />
        <Text strong>{text}</Text>
      </div>
    ),
  },
  {
    title: "Date",
    dataIndex: "booking",
    key: "date",
    render: (booking: any) =>
      booking?.timeStart
        ? new Date(booking.timeStart).toLocaleDateString()
        : "N/A",
  },
  {
    title: "Time (Start - End)",
    dataIndex: "booking",
    key: "time",
    render: (booking: any) =>
      booking?.timeStart && booking?.timeEnd ? (
        <Text>
          {new Date(booking.timeStart).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {new Date(booking.timeEnd).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      ) : (
        "N/A"
      ),
  },
  {
    title: "Rating",
    dataIndex: "booking",
    key: "rating",
    render: (booking: any) =>
      booking?.rating ? <Rate disabled defaultValue={booking.rating} /> : "N/A",
  },
  {
    title: "Note",
    dataIndex: "booking",
    key: "note",
    render: (booking: any) => <Text>{booking?.note || "No Note"}</Text>,
  },
  {
    title: "Feedback",
    dataIndex: "booking",
    key: "feedback",
    render: (booking: any) => <Text>{booking?.feedback || "No Feedback"}</Text>,
  },
  {
    title: "Price (VND)",
    dataIndex: "booking",
    key: "price",
    render: (booking: any) =>
      booking?.total ? (
        <Text className="text-green-600 font-semibold">
          {booking.total.toLocaleString()} VND
        </Text>
      ) : (
        "N/A"
      ),
  },
  {
    title: "Status",
    dataIndex: "booking",
    key: "status",
    render: (booking: any) => renderStatus(booking?.status),
  },
];

const Order: React.FC = () => {
  const [orderData, setOrderData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    if (!userId) return;

    fetchBookingsByReaderId(userId)
      .then(async (data) => {
        if (!data) return;

        // Gọi API lấy avatar của từng user
        const updatedData = await Promise.all(
          data.map(async (item: any) => {
            const userResponse = await fetchUserWithImages(item.booking.userId);
            const avatar = userResponse?.url?.[0] || ""; // Lấy avatar đầu tiên nếu có
            return { ...item, avatar };
          })
        );

        setOrderData(updatedData);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <Typography.Title level={3} className="text-center">
        📋 Tarot Booking Orders
      </Typography.Title>
      <Table
        columns={columns}
        dataSource={orderData}
        rowKey={(record) => record.booking?.id || Math.random().toString()}
        pagination={{ pageSize: 5 }}
        loading={loading}
      />
    </div>
  );
};

export default Order;
