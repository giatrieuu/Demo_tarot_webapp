import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message, Tag } from "antd";
import ApiService from "../../services/axios"; // Ensure this import is correct

const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Fetch bookings data
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await ApiService.fetchBookingsList();
      setBookings(response); // Update bookings state with API response
    } catch (error) {
      message.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // Show modal for editing/viewing booking details
  const handleViewBooking = (record: any) => {
    setSelectedBooking(record);
    setIsModalVisible(true);
  };

  // Close modal
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  // Columns for the bookings table
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Reader ID",
      dataIndex: "readerId",
      key: "readerId",
    },
    {
      title: "Time Start",
      dataIndex: "timeStart",
      key: "timeStart",
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      title: "Time End",
      dataIndex: "timeEnd",
      key: "timeEnd",
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `${total} VND`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <Tag color={status === 1 ? "green" : "red"}>
          {status === 1 ? "Confirmed" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <Button onClick={() => handleViewBooking(record)}>View Details</Button>
      ),
    },
  ];

  // Load bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Booking Management</h1>
      <p>Manage all tarot bookings from this dashboard.</p>

      {/* Bookings Table */}
      <Table
        dataSource={bookings}
        columns={columns}
        pagination={false}
        loading={loading}
        rowKey="id"
        className="bg-white shadow-sm rounded-lg"
      />

      {/* Modal for Viewing Booking Details */}
      <Modal
        title="Booking Details"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        {selectedBooking && (
          <div>
            <p><strong>Booking ID:</strong> {selectedBooking.id}</p>
            <p><strong>User ID:</strong> {selectedBooking.userId}</p>
            <p><strong>Reader ID:</strong> {selectedBooking.readerId}</p>
            <p>
              <strong>Time Start:</strong>{" "}
              {new Date(selectedBooking.timeStart).toLocaleString()}
            </p>
            <p>
              <strong>Time End:</strong>{" "}
              {new Date(selectedBooking.timeEnd).toLocaleString()}
            </p>
            <p><strong>Total:</strong> {selectedBooking.total} VND</p>
            <p><strong>Status:</strong> {selectedBooking.status === 1 ? "Confirmed" : "Pending"}</p>
            <p><strong>Note:</strong> {selectedBooking.note}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;