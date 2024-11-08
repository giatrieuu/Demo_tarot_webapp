// AdminDashboard.tsx
import React from 'react';
import { Card, Typography } from 'antd';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;

const bookingsData = [
  { day: 'Mo', bookings: 10 },
  { day: 'Tu', bookings: 2 },
  { day: 'We', bookings: 7 },
  { day: 'Th', bookings: 8 },
  { day: 'Fr', bookings: 9 },
  { day: 'Sa', bookings: 5 },
  { day: 'Su', bookings: 4 },
];

const revenueData = [
  { month: 1, revenue: 2000 },
  { month: 2, revenue: 1200 },
  { month: 3, revenue: 1500 },
  { month: 4, revenue: 1700 },
  { month: 5, revenue: 900 },
  { month: 6, revenue: 1100 },
  { month: 7, revenue: 500 },
  { month: 8, revenue: 1300 },
  { month: 9, revenue: 900 },
  { month: 10, revenue: 1900 },
  { month: 11, revenue: 1200 },
  { month: 12, revenue: 1600 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen p-10 space-y-10"> {/* Removed background color */}
      <Title level={2} className="text-center">Admin Dashboard</Title>

      {/* Bookings by Week Section */}
      <Card className="shadow-lg rounded-lg p-6 bg-[#f0f4f8]">
        <Title level={4}>Bookings by Week</Title>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={bookingsData}>
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="bookings" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Revenue Section */}
      <Card className="shadow-lg rounded-lg p-6 bg-[#cfe9e6]">
        <Title level={4}>Revenue</Title>
        <div className="flex items-center space-x-2 mb-4">
          <Text className="text-2xl font-bold">$1,260</Text>
          <Text>vs $450 last month</Text>
          <Text className="bg-green-100 text-green-800 font-semibold px-2 py-1 rounded-md">↑ 425%</Text>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default AdminDashboard;
