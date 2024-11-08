import React from 'react';
import { Card, Typography, Rate } from 'antd';
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

const reviews = [
  { name: 'Nguyễn Quang Huy', date: '10/10/2024', text: 'Thằng này bói ngu quá...', rating: 4 },
  { name: 'Nguyễn Quang Huy', date: '10/10/2024', text: 'Thằng này bói ngu quá...', rating: 4 },
  { name: 'Nguyễn Quang Huy', date: '10/10/2024', text: 'Thằng này bói ngu quá...', rating: 4 },
];

const TarotReaderDashboard: React.FC = () => {
  return (
    <div className="p-10 space-y-8">
      <Title level={2} className="text-center">Tarot Reader Dashboard</Title>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bookings by Week Section */}
        <Card className="shadow-lg rounded-lg p-6">
          <Title level={4}>Bookings by Week</Title>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bookingsData}>
              <XAxis dataKey="day" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar dataKey="bookings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Rating Section */}
        <Card className="shadow-lg rounded-lg p-6 bg-[#cfe9e6]">
          <Title level={4}>Rating</Title>
          <div className="flex items-center space-x-4 mb-4">
            <Rate disabled defaultValue={5} />
            <Text className="text-4xl font-bold">75%</Text>
          </div>
          <Text>400 reviews</Text>
        </Card>
      </div>

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
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Newest Review Section */}
      <Card className="shadow-lg rounded-lg p-6">
        <Title level={4}>Newest Reviews</Title>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="flex items-center space-x-4 bg-[#edf3e8] p-4 rounded-lg">
              <Rate disabled defaultValue={review.rating} />
              <div className="flex-1">
                <Text strong>{review.name}</Text>
                <Text className="block text-gray-500">{review.text}</Text>
              </div>
              <Text className="text-gray-400">{review.date}</Text>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TarotReaderDashboard;
