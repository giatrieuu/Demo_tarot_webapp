// TopReaders.tsx
import React, { useState, useEffect } from "react";
import { Card, List, Avatar } from "antd";
import { fetchAllBookings } from "../../../../services/bookingServices";
import { fetchReaderById } from "../../../../services/tarotReaderServices";

// Định nghĩa interface cho booking
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

const TopReaders: React.FC = () => {
  const [topReaders, setTopReaders] = useState<{ name: string; revenue: string; avatar: string }[]>([]);

  useEffect(() => {
    const loadTopReaders = async () => {
      try {
        const bookings = await fetchAllBookings();

        // Lọc bookings với status 1 và 4
        const validBookings = bookings.filter((booking: Booking) => [1, 4].includes(booking.status));

        // Nhóm doanh thu theo readerId
        const revenueByReader: Record<string, number> = {};
        validBookings.forEach((booking: Booking) => {
          const readerId = booking.readerId;
          revenueByReader[readerId] = (revenueByReader[readerId] || 0) + (booking.total || 0);
        });

        // Lấy top 3 reader theo doanh thu
        const topReaderIds = Object.entries(revenueByReader)
          .sort(([, revenueA], [, revenueB]) => revenueB - revenueA) // Sắp xếp giảm dần
          .slice(0, 3) // Lấy top 3
          .map(([readerId]) => readerId);

        // Fetch thông tin chi tiết của top 3 readers
        const readersDataPromises = topReaderIds.map(async (readerId) => {
          const readerData = await fetchReaderById(readerId);
          const revenue = revenueByReader[readerId];
          return {
            name: readerData.reader.name || `Reader ${readerId.slice(-6)}`, // Tên thật hoặc fallback
            revenue: `₫${revenue.toLocaleString()}`, // Định dạng tiền
            avatar: readerData.url[0] || "https://i.pravatar.cc/40?img=1" // Ảnh từ API hoặc mặc định
          };
        });

        const readersData = await Promise.all(readersDataPromises);
        setTopReaders(readersData);
      } catch (error) {
        console.error("Error fetching top readers:", error);
      }
    };

    loadTopReaders();
  }, []);

  return (
    <Card title="🔥 Reader Nổi Bật" bordered={false} className="shadow-md">
      <List
        itemLayout="horizontal"
        dataSource={topReaders}
        renderItem={(reader) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={reader.avatar} />}
              title={reader.name}
              description={`Doanh thu: ${reader.revenue}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TopReaders;