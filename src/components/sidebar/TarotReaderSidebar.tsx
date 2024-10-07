import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    AppstoreOutlined,
    UserOutlined,
    DollarOutlined,
    CalendarOutlined,
    FileTextOutlined,
    ToolOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { TarotReaderSidebarData } from '../../constants';


interface SidebarProps {
    showMenu: boolean;
}

const iconComponents: { [key: string]: JSX.Element } = {
    AppstoreOutlined: <AppstoreOutlined />,
    UserOutlined: <UserOutlined />,
    DollarOutlined: <DollarOutlined />,
    CalendarOutlined: <CalendarOutlined />,
    FileTextOutlined: <FileTextOutlined />,
    ToolOutlined: <ToolOutlined />,
    LogoutOutlined: <LogoutOutlined />
};

const TarotReaderSidebar: React.FC<SidebarProps> = ({ showMenu }) => {
    const navigate = useNavigate();
    const { MenuTarotReaderItems } = TarotReaderSidebarData;

    const renderMenuTarotReaderItems = (items: typeof MenuTarotReaderItems) =>
        items.map((item) => (
            <Menu.Item key={item.url} icon={iconComponents[item.icon || '']} onClick={() => navigate(item.url)}>
                {item.text}
            </Menu.Item>
        ));

    return (
        <aside className={`fixed top-16 mt-1 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'}`}>
            <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
                {renderMenuTarotReaderItems(MenuTarotReaderItems)}
            </Menu>
        </aside>
    );
};

export default TarotReaderSidebar;
