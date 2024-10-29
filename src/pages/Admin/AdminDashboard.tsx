import React, { useState } from 'react';
import { Layout } from 'antd';
import AppHeader from '../../components/header/Header';
import AdminSidebar from '../../components/sidebar/AdminSidebar';

const { Content } = Layout;

const AdminDashboard: React.FC = () => {
  const [showMenu] = useState(true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        {/* Sidebar Section */}
        <AdminSidebar showMenu={showMenu} />

        {/* Content Section */}
        <Layout className={`transition-all duration-300 ${showMenu ? 'ml-56' : 'ml-0'}`}>
          <Content style={{ padding: '24px' }}>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p>Welcome to the admin dashboard! This is the content area.</p>
              {/* Add more content here as needed */}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
