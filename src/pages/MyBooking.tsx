import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  message,
  Descriptions,
  Modal,
  Badge,
  Button,
} from "antd";
import ApiService from "../services/axios";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const { Content } = Layout;

interface Booking {
  id: string;
  day: string;
  start: string;
  end: string;
  tarotReader: string;
  topic: string;
  status: "success" | "error";
  note: string;
}

const MyBooking: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);

  // Fetch user bookings
  useEffect(() => {
   const fetchUserBookings = async () => {
  setLoading(true);
  try {
    const response = await ApiService.fetchBookingsByUserId(userId);
    const userBookings = response.map((item: any) => ({
      id: item.booking.id,
      day: dayjs(item.booking.timeStart).format("YYYY-MM-DD"),
      start: dayjs(item.booking.timeStart).format("HH:mm"),
      end: dayjs(item.booking.timeEnd).format("HH:mm"),
      tarotReader: item.userName,
      topic: item.booking.note,
      note: item.booking.note,
      status: item.booking.status === 1 ? "success" : "error", // Correctly map status
    }));
    setBookings(userBookings);
  } catch (error) {
    message.error("Failed to load user bookings");
  } finally {
    setLoading(false);
  }
};

    fetchUserBookings();
  }, [userId]);

  const columns = [
    {
      title: "Date",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Start Time",
      dataIndex: "start",
      key: "start",
    },
    {
      title: "End Time",
      dataIndex: "end",
      key: "end",
    },
    {
      title: "Tarot Reader",
      dataIndex: "tarotReader",
      key: "tarotReader",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span style={{ color: status === "success" ? "green" : "red" }}>
          {status === "success" ? "Confirmed" : "Canceled"}
        </span>
      ),
    },
  ];

  // Handle row click to view detailed information
  const handleRowClick = (record: Booking) => {
    setSelectedBooking(record);
  };

  // Close the modal
  const handleModalClose = () => {
    setSelectedBooking(null);
  };

  // Retry Payment Action
  const handleRetryPayment = async () => {
    if (!selectedBooking) return;

    try {
      const response = await ApiService.createPayment(selectedBooking.id);
      if (response.approvalUrl) {
        // Redirect user to PayPal for payment approval
        window.location.href = response.approvalUrl;
      } else {
        message.error("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      message.error(
        "An error occurred while processing payment. Please try again."
      );
      console.error("Payment error:", error);
    }
  };

  return (
    <Layout>
      <Content style={{ padding: "24px" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
            My Bookings
          </h2>
          <Table
            dataSource={bookings}
            columns={columns}
            loading={loading}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </div>

        {/* Modal for Detailed Booking View */}
        {selectedBooking && (
          <Modal
            title="Booking Details"
            visible={!!selectedBooking}
            onCancel={handleModalClose}
            footer={
              selectedBooking.status === "error" ? (
                <Button type="primary" onClick={handleRetryPayment}>
                  Retry Payment
                </Button>
              ) : null
            }
          >
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Date">
                {selectedBooking.day}
              </Descriptions.Item>
              <Descriptions.Item label="Start Time">
                {selectedBooking.start}
              </Descriptions.Item>
              <Descriptions.Item label="End Time">
                {selectedBooking.end}
              </Descriptions.Item>
              <Descriptions.Item label="Tarot Reader">
                {selectedBooking.tarotReader}
              </Descriptions.Item>
              <Descriptions.Item label="Topic">
                {selectedBooking.topic}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Badge
                  status={
                    selectedBooking.status === "success"
                      ? "processing"
                      : "error"
                  }
                  text={
                    selectedBooking.status === "success"
                      ? "Confirmed"
                      : "Canceled"
                  }
                />
              </Descriptions.Item>
              <Descriptions.Item label="Note">
                {selectedBooking.note}
              </Descriptions.Item>
            </Descriptions>
          </Modal>
        )}
      </Content>
    </Layout>
  );
};

export default MyBooking;
