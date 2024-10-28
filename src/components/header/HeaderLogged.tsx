import { Layout, Avatar, Dropdown, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import Logo from '../Logo';

const { Header } = Layout;

const AppHeader: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const menuItems = [
        {
            key: 'welcome',
            label: <span>Welcome, John Doe</span>,
            disabled: true,
        },
        {
            key: 'profile',
            label: <Link to="/my-profile">My Profile</Link>,
        },
        {
            key: 'logout',
            label: <span onClick={handleLogout}>Logout</span>,
        },
    ];

    const menu = <Menu items={menuItems} />;

    return (
        <Header className="flex justify-between items-center bg-white p-4">
            <Logo />

            <div className="flex items-center space-x-6">
                <Link
                    to="/list-tarot-reader"
                    className="text-lg font-bold text-[#4a044e] hover:text-[#a21caf] hover:scale-105 transition-all duration-200"
                    style={{ fontFamily: 'Uncial Antiqua' }}
                >
                    Booking
                </Link>
                <Link
                    to="/blog"
                    className="text-lg font-bold text-[#4a044e] hover:text-[#a21caf] hover:scale-105 transition-all duration-200"
                    style={{ fontFamily: 'Uncial Antiqua' }}
                >
                    Blog
                </Link>

                <Dropdown overlay={menu} placement="bottomRight" arrow trigger={['hover']}>
                    <Avatar
                        size="large"
                        icon={<UserOutlined />}
                        className="cursor-pointer bg-[#4a044e]"
                    />
                </Dropdown>
            </div>
        </Header>
    );
};

export default AppHeader;
