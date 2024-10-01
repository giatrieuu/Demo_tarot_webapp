import { Layout, Menu, Input, Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const { Search } = Input;

const userMenu = (
  <Menu>
    <Menu.Item>
      <Link to="/dashboard">My Dashboard</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/logout">Sign Out</Link>
    </Menu.Item>
  </Menu>
);

const AppHeader: React.FC = () => {
  return (
    <Header className="flex justify-between items-center bg-white shadow-md p-4">
      <div className="flex space-x-4">
        <Link to="/about-us">About Us</Link>
        <Link to="/tarot-readers">Tarot Reader</Link>
        <Link to="/blogs">Blogs</Link>
      </div>
      
      <div className="flex-1 text-center">
        <Search placeholder="Search..." className="max-w-md" />
      </div>

      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold mr-4">Logo</Link>
        <Dropdown overlay={userMenu} trigger={['hover']}>
          <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer" />
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
