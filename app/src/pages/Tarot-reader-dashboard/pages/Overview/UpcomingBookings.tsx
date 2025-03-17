import React from "react";
import { List, Avatar, Badge, Button } from "antd";

const upcomingBookings = [
  {
    userName: "Nguyễn Văn A",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    time: "2024-11-09T10:00:00",
    status: "confirmed",
  },
  {
    userName: "Trần Thị B",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    time: "2024-11-10T14:00:00",
    status: "pending",
  },
];

const UpcomingBookings: React.FC = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-3">📅 Upcoming Bookings</h2>
      <List
        dataSource={upcomingBookings}
        renderItem={(item) => (
          <List.Item className="flex justify-between">
            <div className="flex items-center space-x-3">
              <Avatar src={item.avatar} size={48} />
              <div>
                <p className="font-medium">{item.userName}</p>
                <p className="text-gray-500">{new Date(item.time).toLocaleString()}</p>
              </div>
            </div>
            <Badge
              status={item.status === "confirmed" ? "success" : "warning"}
              text={item.status.toUpperCase()}
            />
            {item.status === "confirmed" && <Button type="primary">Start Call</Button>}
          </List.Item>
        )}
      />
    </div>
  );
};

export default UpcomingBookings;
