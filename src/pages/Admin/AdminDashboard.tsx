import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DollarOutlined,
    UserOutlined,
    AppstoreOutlined,
    ToolOutlined,
    LogoutOutlined,
    CalendarOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { NavLink } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <NavLink
                    end to="/"
                    className="block"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '16px 0',
                    }}>
                    <img
                        src="public/Tarot.png"
                        alt="Logo"
                        style={{
                            width: collapsed ? '40px' : '80px',
                            height: 'auto',
                            transition: 'width 0.3s ease',
                        }}
                    />
                </NavLink>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <AppstoreOutlined />,
                            label: 'Dashboard',
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: 'Users',
                        },
                        {
                            key: '3',
                            icon: <DollarOutlined />,
                            label: 'Transactions',
                        },
                        {
                            key: '4',
                            icon: <CalendarOutlined />,
                            label: 'Bookings',
                        },
                        {
                            key: '5',
                            icon: <FileTextOutlined />,
                            label: 'Blogs',
                        },
                        {
                            key: '6',
                            icon: <ToolOutlined />,
                            label: 'Settings',
                        },
                        {
                            key: '7',
                            icon: <LogoutOutlined />,
                            label: 'Sign Out',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: '100vh',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;