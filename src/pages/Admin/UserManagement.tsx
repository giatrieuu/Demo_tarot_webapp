import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Tabs, message } from "antd";
import { CheckCircleOutlined, StopOutlined, UserAddOutlined } from "@ant-design/icons";
import ApiService from "../../services/axios"; // Ensure this import is correct

const { TabPane } = Tabs;

const UserManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [users, setUsers] = useState<any[]>([]); // Regular users data
  const [tarotReaders, setTarotReaders] = useState<any[]>([]); // Tarot readers data
  const [loading, setLoading] = useState(false); // Loading state for the table
  const [activeTab, setActiveTab] = useState("users"); // Track active tab

  // Fetch users data
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await ApiService.fetchUsersList();
      setUsers(response); // Update users state with API response
    } catch (error) {
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tarot readers data
  const fetchTarotReaders = async () => {
    setLoading(true);
    try {
      const response = await ApiService.fetchReadersList();
      setTarotReaders(response); // Update tarot readers state with API response
    } catch (error) {
      message.error("Failed to load tarot readers");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else {
      fetchTarotReaders();
    }
  }, [activeTab]);

  // Handle the OK action for the assign modal
  const handleModalOk = () => {
    console.log("Assigning email and password");
    setIsModalVisible(false);
  };

  // Cancel the assign modal
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // Show the modal for creating a new tarot reader
  const handleCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  // Handle account creation form submission
  const handleCreateAccount = async (values: any) => {
    try {
      setLoading(true);
      const { name, email, password } = values;
      await ApiService.createReader(name, email, password);
      message.success("Tarot Reader account created successfully");
      setIsCreateModalVisible(false);
      if (activeTab === "tarotReaders") {
        fetchTarotReaders(); // Refresh tarot readers list after creation
      }
    } catch (error) {
      message.error("Failed to create Tarot Reader account");
    } finally {
      setLoading(false);
    }
  };

  // Handle block/unblock action
  const handleBlockUnblock = async (record: any) => {
    const { id, status } = record;
    const isBlocked = status === "Blocked";
    try {
      setLoading(true);
      if (activeTab === "users") {
        if (isBlocked) {
          await ApiService.unblockUser(id);
          message.success("User unblocked successfully");
        } else {
          await ApiService.blockUser(id);
          message.success("User blocked successfully");
        }
        fetchUsers(); // Refresh the users list
      } else {
        if (isBlocked) {
          await ApiService.unblockReader(id);
          message.success("Reader unblocked successfully");
        } else {
          await ApiService.blockReader(id);
          message.success("Reader blocked successfully");
        }
        fetchTarotReaders(); // Refresh the tarot readers list
      }
    } catch (error) {
      message.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "roleId",
      key: "roleId",
      render: (roleId: string) => (roleId === "user" ? "User" : "Tarot Reader"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Button
          type="primary"
          danger={record.status !== "Blocked"}
          icon={
            record.status === "Blocked" ? <CheckCircleOutlined /> : <StopOutlined />
          }
          onClick={() => handleBlockUnblock(record)}
        >
          {record.status === "Blocked" ? "Unblock" : "Block"}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold">User Management</h1>
      <p>Manage all your users from this panel.</p>

      {/* Tabs for Users and Tarot Readers */}
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Users" key="users">
          <Table
            dataSource={users}
            columns={columns}
            pagination={false}
            loading={loading}
            className="bg-white shadow-sm rounded-lg"
          />
        </TabPane>
        <TabPane tab="Tarot Readers" key="tarotReaders">
          <div className="mb-4">
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={handleCreateModal}
              className="bg-[#1890ff]"
            >
              Create Tarot Reader Account
            </Button>
          </div>
          <Table
            dataSource={tarotReaders}
            columns={columns}
            pagination={false}
            loading={loading}
            className="bg-white shadow-sm rounded-lg"
          />
        </TabPane>
      </Tabs>

      {/* Modal for Assigning Email/Password */}
      <Modal
        title="Assign Email and Password"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Email">
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password placeholder="Enter password" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Creating New Tarot Reader */}
      <Modal
        title="Create Tarot Reader Account"
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleCreateAccount}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
