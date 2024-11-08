import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  AppstoreOutlined,
  BookOutlined,
  CalendarOutlined,
  ToolOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { TarotReaderSidebarData } from '../../constants';

interface SidebarProps {
    showMenu: boolean;
  }
  interface MenuItem {
    key: string;
    label: string;
    icon?: string;
  }
  const iconComponents: { [key: string]: JSX.Element } = {
    AppstoreOutlined: <AppstoreOutlined />,
    BookOutlined: <BookOutlined />,
    CalendarOutlined: <CalendarOutlined />,
    ToolOutlined: <ToolOutlined />,
    FileTextOutlined: <FileTextOutlined />,
  };

const renderMenuItems = (items: MenuItem[], navigate: (path: string) => void) =>
    items.map((item) => (
      <Menu.Item 
        key={item.key} 
        icon={iconComponents[item.icon || '']} 
        onClick={() => {
        
          navigate(item.key);
        }}
      >
        {item.label}
      </Menu.Item>
    ));const TarotReaderSidebar: React.FC<SidebarProps> = ({ showMenu }) => {
      const navigate = useNavigate();
      const { MenuTarotReaderItems } = TarotReaderSidebarData;
    
      return (
        <aside className={`fixed top-16 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'}`}>
          <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
            {renderMenuItems(MenuTarotReaderItems, navigate)}
          </Menu>
        </aside>
      );
    };
export default TarotReaderSidebar;
