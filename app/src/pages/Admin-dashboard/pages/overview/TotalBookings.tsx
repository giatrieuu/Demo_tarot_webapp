import React, { useEffect, useState } from "react";
import { Card, Statistic, Spin } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { fetchAllBookings } from "../../../../services/bookingServices";

const TotalBookings: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchAllBookings();

        // ❗ Chỉ lấy những booking đã thanh toán: status 1 hoặc 4
        const paidBookings = data.filter(
          (booking: any) => booking.status === 1 || booking.status === 4
        );

        setTotal(paidBookings.length);
      } catch (error) {
        console.error("Lỗi khi tải số lượng booking:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  return (
    <Card bordered={false} className="shadow-md">
      {loading ? (
        <Spin />
      ) : (
        <>
          <Statistic
            title="Tổng Số Lịch Hẹn Đã Thanh Toán"
            value={total}
            valueStyle={{ color: "#fa8c16" }}
          />
          <CalendarOutlined className="text-4xl text-orange-500 mt-2" />
        </>
      )}
    </Card>
  );
};

export default TotalBookings;
