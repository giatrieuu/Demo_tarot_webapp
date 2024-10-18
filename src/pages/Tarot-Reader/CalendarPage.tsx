import React, { useState } from "react";
import { Button, Card } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface Booking {
  day: string;
  start: string;
  end: string;
  customer: string;
  topic: string;
  status: "success" | "warning" | "error";
}

const bookings: Booking[] = [
  {
    day: "2024-10-09",
    start: "09:00",
    end: "11:00",
    customer: "Lê Gia Triều",
    topic: "Love",
    status: "success",
  },
  {
    day: "2024-10-10",
    start: "09:00",
    end: "10:00",
    customer: "Lê Gia Triều",
    topic: "Love",
    status: "success",
  },
  {
    day: "2024-10-11",
    start: "10:00",
    end: "11:00",
    customer: "Lê Gia Triều",
    topic: "Love",
    status: "error",
  },
];

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const hours = Array.from({ length: 9 }, (_, i) => i + 8); // 8AM - 5PM

const CalendarPage: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<Dayjs>(dayjs().startOf("week"));

  const nextWeek = () => {
    setCurrentWeek(currentWeek.add(1, "week"));
  };

  const prevWeek = () => {
    setCurrentWeek(currentWeek.subtract(1, "week"));
  };

  const getDayWithDate = (index: number) => {
    return currentWeek.add(index, "day");
  };

  // Rendering each booking based on start and end times
  const renderBooking = (day: string) => {
    const bookingsForDay = bookings.filter((b) => b.day === day);
    return bookingsForDay.map((booking, idx) => {
      const startHour = parseInt(booking.start.split(":")[0]);
      const endHour = parseInt(booking.end.split(":")[0]);
      const bookingDuration = endHour - startHour;
      const bookingHeight = bookingDuration * 100; // Adjust height based on duration
      const bookingTop = (startHour - 8) * 100; // Calculate top offset

      return (
        <div
          key={idx}
          className={`absolute w-full left-0 rounded-md text-white flex items-start justify-start px-2 py-1 ${
            booking.status === "success"
              ? "bg-green-400"
              : booking.status === "error"
              ? "bg-red-400"
              : "bg-yellow-400"
          }`}
          style={{
            height: `${bookingHeight}px`,
            top: `${bookingTop}px`,
          }}
        >
          <div className="text-sm">
            <p>{booking.customer}</p>
            <p>{booking.topic}</p>
            <p>
              {booking.start} - {booking.end}
            </p>
          </div>
        </div>
      );
    });
  };

  const renderMeetingDetails = (meeting: Booking) => (
    <Card title="Next Meeting" bordered={false} style={{ marginBottom: 20 }}>
      <p>Customer: {meeting.customer}</p>
      <p>Phone: {meeting.phone}</p>
      <p>
        Time: {meeting.start} - {meeting.end}
      </p>
      <p>Card deck: Card deck 1</p>
      <p>Topic: {meeting.topic}</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button danger>Deny</Button>
        <Button type="primary">Accept</Button>
      </div>
    </Card>
  );

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#E8F5F4",
        minHeight: "100vh",
      }}
    >
      {/* Weekly Calendar Section */}
      <div style={{ flex: 2 }}>
        <div className="p-6 bg-white shadow-lg rounded-lg relative">
          {/* Calendar Header */}
          <div className="flex justify-center items-center bg-[#34656D] text-white px-6 py-4">
            <LeftOutlined className="cursor-pointer text-xl" onClick={prevWeek} />
            <h2 className="text-lg font-bold mx-4">
              {currentWeek.format("MMMM D")} - {currentWeek.add(6, "day").format("MMMM D, YYYY")}
            </h2>
            <RightOutlined className="cursor-pointer text-xl" onClick={nextWeek} />
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-8 border-t border-gray-200 relative">
            {/* Time Slots Column */}
            <div className="border-r border-gray-200">
              {hours.map((hour) => (
                <div key={hour} className="relative h-20 flex items-center justify-center">
                  <span className="relative top-8">{hour}:00</span>
                </div>
              ))}
            </div>

            {/* Days of the Week Columns */}
            {daysOfWeek.map((day, index) => {
              const date = getDayWithDate(index);
              return (
                <div key={day} className="border-r border-gray-200 relative h-[900px]">
                  <div className="h-12 flex flex-col items-center justify-center bg-[#D3E0DC] font-bold">
                    <span>{day}</span>
                    <span className="text-sm">{date.format("MMM D")}</span>
                  </div>
                  {renderBooking(date.format("YYYY-MM-DD"))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Meeting and Stats Section */}
      <div style={{ flex: 1 }}>
        {renderMeetingDetails(bookings[0])}

        <Card title="Now Meeting" bordered={false} style={{ marginBottom: 20 }}>
          <p>Customer: {bookings[1].customer}</p>
          <p>Phone: {bookings[1].phone}</p>
          <p>
            Time: {bookings[1].start} - {bookings[1].end}
          </p>
          <p>Card deck: Card deck 1</p>
          <p>Topic: {bookings[1].topic}</p>
          <Button type="primary" style={{ backgroundColor: "#FFC107" }}>
            Report
          </Button>
        </Card>

        <Card title="Statistics" bordered={false}>
          <p>Total cases: 700</p>
          <p>This month: 9</p>
          <p>This week: 3</p>
          <p>Denied: 0</p>
          <h3>
            Salary: <span style={{ color: "green" }}>$10</span>
          </h3>
          <Button type="primary">Detail</Button>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
