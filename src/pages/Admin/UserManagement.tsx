import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Dropdown, Menu, Modal, Form, Input, message } from 'antd';
import { MoreOutlined, UserAddOutlined } from '@ant-design/icons';
import AppHeader from '../../components/header/Header';
import AdminSidebar from '../../components/sidebar/AdminSidebar';
import ApiService from '../../services/axios'; // Import the ApiService

const { Content } = Layout;

const UserManagement: React.FC = () => {
    const [showMenu] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [users, setUsers] = useState([]); // State to store users
    const [loading, setLoading] = useState(false); // State to manage loading

    // Fetch users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await ApiService.fetchUsersList();
                setUsers(response); // Update state with fetched users
            } catch (error) {
                message.error('Failed to load users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Handle menu actions for users
    const handleMenuClick = (key: string, record: any) => {
        if (key === 'assign') {
            setSelectedUser(record);
            setIsModalVisible(true);
        }
    };

    // Handle assigning email and password
    const handleModalOk = () => {
        console.log('Assigning email and password for:', selectedUser);
        setIsModalVisible(false);
    };

    // Handle canceling modal
    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    // Handle showing create account modal
    const handleCreateModal = () => {
        setIsCreateModalVisible(true);
    };

    // Handle creating a new Tarot Reader account
    const handleCreateAccount = (values: any) => {
        console.log('Creating account for:', values);
        setIsCreateModalVisible(false);
    };

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
            render: (roleId: string) => (roleId === 'user' ? 'User' : 'Tarot Reader'),
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
                            onClick={({ key }) => handleMenuClick(key, record)}
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
        <Layout style={{ minHeight: '100vh' }}>
            <AppHeader />

            <Layout>
                <AdminSidebar showMenu={showMenu} />

                <Layout className={`transition-all duration-300 ${showMenu ? 'ml-56' : 'ml-0'}`}>
                    <Content style={{ padding: '24px' }}>
                        <div>
                            <h1 className="text-xl font-bold">User Management</h1>
                            <p>Manage all your users from this panel.</p>

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
                                pagination={false}
                                loading={loading}
                                className="bg-white shadow-sm rounded-lg"
                            />
                        </div>

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
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default UserManagement;
