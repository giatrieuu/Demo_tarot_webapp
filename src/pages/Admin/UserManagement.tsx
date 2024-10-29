import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Menu, Modal, Form, Input, message } from 'antd';
import { MoreOutlined, UserAddOutlined } from '@ant-design/icons';
import ApiService from '../../services/axios'; // Assuming you already have axios setup

const UserManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [users, setUsers] = useState([]); // Users data
  const [loading, setLoading] = useState(false); // Loading state for the table

  // Fetch the users when the component is mounted
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading
      try {
        const response = await ApiService.fetchUsersList(); // Assuming your ApiService has this method
        setUsers(response); // Update the users state with API response
      } catch (error) {
        message.error('Failed to load users'); // Error handling
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchUsers();
  }, []);

  // Handle actions for user rows
  const handleMenuClick = (key: string, record: any) => {
    if (key === 'assign') {
      setSelectedUser(record);
      setIsModalVisible(true); // Show the modal for assigning email/password
    }
  };

  // Handle the OK action for the assign modal
  const handleModalOk = () => {
    console.log('Assigning email and password for:', selectedUser);
    setIsModalVisible(false); // Close modal
  };

  // Cancel the assign modal
  const handleModalCancel = () => {
    setIsModalVisible(false); // Close modal
  };

  // Show the modal for creating a new tarot reader
  const handleCreateModal = () => {
    setIsCreateModalVisible(true); // Show create modal
  };

  // Handle account creation form submission
  const handleCreateAccount = (values: any) => {
    console.log('Creating account for:', values); // Log values (replace with API call if needed)
    setIsCreateModalVisible(false); // Close the modal
  };

  // Define table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (roleId: string) => (roleId === 'user' ? 'User' : 'Tarot Reader'), // Role rendering
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '',
      key: 'action',
      render: (text: any, record: any) => (
        <Dropdown
          overlay={
            <Menu
              onClick={({ key }) => handleMenuClick(key, record)} // Handle row menu actions
              items={[{ label: 'Assign Email/Password', key: 'assign' }]}
            />
          }
          trigger={['click']}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold">User Management</h1>
      <p>Manage all your users from this panel.</p>

      {/* Button to create a new Tarot Reader */}
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

      {/* User Table */}
      <Table
        dataSource={users}
        columns={columns}
        pagination={false} // Remove pagination
        loading={loading} // Display loading state when fetching users
        className="bg-white shadow-sm rounded-lg"
      />

      {/* Modal for Assigning Email/Password */}
      <Modal
        title={`Assign Email and Password to ${selectedUser?.name}`}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Email">
            <Input placeholder="Enter email" defaultValue={selectedUser?.email} />
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
        onOk={() => setIsCreateModalVisible(false)}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleCreateAccount}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input the password!' }]}
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
