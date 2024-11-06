import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  CalendarOutlined,
  TagsOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { AdminSidebarData } from "../../constants";


interface SidebarProps {
  showMenu: boolean;
}
interface MenuItem {
  key: string;
  label: string;
  icon?: string;
}
const iconComponents: { [key: string]: JSX.Element } = {
  DashboardOutlined: <CalendarOutlined />,
  UserOutlined: <UserOutlined />,
  TagsOutlined: <TagsOutlined />,
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
  ));const SidebarAdmin: React.FC<SidebarProps> = ({ showMenu }) => {
    const navigate = useNavigate();
    const { MenuAdminItems } = AdminSidebarData;
  
    return (
      <aside className={`fixed top-16 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'}`}>
        <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
          {renderMenuItems(MenuAdminItems, navigate)}
        </Menu>
      </aside>
    );
  };
export default SidebarAdmin;
