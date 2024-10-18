import React, { useState } from 'react';
import { Layout } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppHeader from '../../components/header/Header';
import TarotReaderSidebar from '../../components/sidebar/TarotReaderSidebar';
import CalendarPage from '../Tarot-Reader/CalendarPage'; // Import Calendar Page


const { Content } = Layout;

const TarotReaderDashboard: React.FC = () => {
  const [showMenu] = useState(true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header Section */}
      <AppHeader />

      <Layout>
        {/* Sidebar Section */}
        <TarotReaderSidebar showMenu={showMenu} />

        {/* Content Section */}
        <Layout className={`transition-all duration-300 ${showMenu ? 'ml-56' : 'ml-0'}`}>
          <Content style={{ padding: '24px' }}>
            <Routes>
              {/* Điều hướng mặc định về trang dashboard */}
              <Route path="/" element={<Navigate to="/tarot-reader-dashboard" replace />} />
              <Route path="/calendar" element={<CalendarPage />} />
              {/* Các route khác nếu cần */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default TarotReaderDashboard;
