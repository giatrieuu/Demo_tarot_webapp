import React, { useEffect, useState } from "react";
import { List, Avatar, Badge, Button, message, Spin } from "antd";

import { useSelector } from "react-redux";

import dayjs from "dayjs";
import { RootState } from "../../../../redux/store";
import { fetchAllBookings } from "../../../../services/bookingServices";

const UpcomingBookings: React.FC = () => {
  const readerId = useSelector((state: RootState) => state.auth.userId);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!readerId) return;

    setLoading(true);
    fetchAllBookings()
      .then((data) => {
        if (!data || data.length === 0) {
          message.warning("Không có lượt booking nào.");
          setBookings([]);
          return;
        }

        // 🔹 Lọc danh sách booking của Reader hiện tại
        const readerBookings = data
          .filter((booking: any) => booking.readerId === readerId && dayjs(booking.timeStart).isAfter(dayjs()))
          .sort((a: any, b: any) => dayjs(b.timeStart).diff(dayjs(a.timeStart))); // Sắp xếp mới nhất lên đầu

        setBookings(readerBookings);
      })
      .catch(() => {
        message.error("Lỗi khi tải danh sách booking.");
      })
      .finally(() => setLoading(false));
  }, [readerId]);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-3">📅 Upcoming Bookings</h2>

      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          dataSource={bookings}
          renderItem={(item) => (
            <List.Item className="flex justify-between">
              <div className="flex items-center space-x-3">
                <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" size={48} />
                <div>
                  <p className="font-medium">{item.userId}</p>
                  <p className="text-gray-500">{dayjs(item.timeStart).format("DD/MM/YYYY HH:mm")}</p>
                </div>
              </div>

              <Badge
                status={item.status === 1 ? "success" : "warning"}
                text={item.status === 1 ? "CONFIRMED" : "PENDING"}
              />

              {item.status === 1 && (
                <Button type="primary" onClick={() => message.info("Bắt đầu Video Call")}>
                  🎥 Video Call
                </Button>
              )}
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default UpcomingBookings;
