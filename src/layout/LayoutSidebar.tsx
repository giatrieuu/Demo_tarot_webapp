import React, { useState } from 'react';
import { Layout } from 'antd';
import HeaderLogged from '../components/header/HeaderLogged';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import SidebarAdmin from '../components/sidebar/AdminSidebar';
import TarotReaderSidebar from '../components/sidebar/TarotReaderSidebar';

const { Content } = Layout;

const LayoutSidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true);
  const location = useLocation();

  // Toggle sidebar menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Conditionally render the sidebar based on the page (tarot reader or admin)
  const renderSidebar = () => {
    if (location.pathname.startsWith('/admin')) {
      return <SidebarAdmin showMenu={showMenu} />;
    } else if (location.pathname.startsWith('/tarot-reader')) {
      return <TarotReaderSidebar showMenu={showMenu} />;
    }
    return null; // No sidebar for other pages
  };

  return (
    <Layout className="h-screen overflow-hidden flex flex-row">
      {/* Sidebar */}
      {renderSidebar()}

      {/* Main content area */}
      <Layout className="flex-1">
        {/* Single Header */}
        <HeaderLogged toggleMenu={toggleMenu} />

        <Content className={`transition-all duration-300 overflow-auto ${showMenu ? 'ml-56' : 'ml-0'}`}>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1 p-4 overflow-auto">
              {children}
            </div>
            <Footer />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutSidebar;
