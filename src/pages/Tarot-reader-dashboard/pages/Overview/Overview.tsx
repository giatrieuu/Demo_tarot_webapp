import React from "react";
import OverviewStats from "./OverviewStats";
import RevenueChart from "./RevenueChart";
import RatingChart from "./RatingChart";
import UpcomingBookings from "./UpcomingBookings";

const Overview: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">📊 Tarot Reader Overview</h1>

      {/* Thống kê nhanh */}
      <OverviewStats />

      {/* Biểu đồ Doanh thu và Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RevenueChart />
        <RatingChart />
      </div>

      {/* Danh sách Booking sắp tới */}
      <div className="mt-6">
        <UpcomingBookings />
      </div>
    </div>
  );
};

export default Overview;
