import React, { useEffect, useState } from "react";
import { Card, Statistic, Spin } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import { fetchAllBookings } from "../../../../services/bookingServices";


const RevenueOverview: React.FC = () => {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllBookings();
        // 👉 Lọc chỉ lấy status === 1 hoặc 4
        const validBookings = data.filter(
          (booking: any) => booking.status === 1 || booking.status === 4
        );
        const total = validBookings.reduce(
          (sum: number, booking: any) => sum + (booking.total || 0),
          0
        );
        setTotalRevenue(total);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu booking:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Card bordered={false} className="shadow-md">
      {loading ? (
        <Spin />
      ) : (
        <>
          <Statistic
            title="Tổng Doanh Thu"
            value={totalRevenue}
            prefix="₫"
            valueStyle={{ color: "#3f8600" }}
            suffix="VND"
          />
          <DollarCircleOutlined className="text-4xl text-green-500 mt-2" />
        </>
      )}
    </Card>
  );
};

export default RevenueOverview;
