import React from "react";
import RevenueOverview from "./RevenueOverview";
import ReaderCount from "./ReaderCount";
import UserCount from "./UserCount";
import TotalBookings from "./TotalBookings";
import RevenueChart from "./RevenueChart";
import BookingChart from "./BookingChart";
import TopReaders from "./TopReaders";
import FeedbackOverview from "./FeedbackOverview";


const AdminOverview: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <RevenueOverview />
        <ReaderCount />
        <UserCount />
        <TotalBookings />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <BookingChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopReaders />
        <FeedbackOverview />
      </div>
    </div>
  );
};

export default AdminOverview;
