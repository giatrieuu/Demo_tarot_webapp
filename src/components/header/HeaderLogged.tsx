import { Layout, Input, Avatar, Dropdown, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';  // Import the dispatch hook
import { logout } from '../../redux/authSlice';  // Import the logout action
import Logo from '../Logo';

const { Header } = Layout;
const { Search } = Input;

const AppHeader: React.FC = () => {
    const dispatch = useDispatch(); // Get the dispatch function from Redux
    const navigate = useNavigate(); // Use navigate for redirection after logout

    // Function to handle the logout process
    const handleLogout = () => {
        // Dispatch the logout action
        dispatch(logout());

        // Clear token from localStorage if needed
        localStorage.removeItem('authToken');

        // Navigate to the login page after logging out
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
            label: <span onClick={handleLogout}>Logout</span>, // Call handleLogout on click
        },
    ];

    const menu = <Menu items={menuItems} />;

    return (
        <Header className="flex justify-between items-center bg-[#2C4551] shadow-md p-4">
            <Logo />

            <div className="flex-1 text-center mt-8">
                <Search placeholder="Search..." className="max-w-md" />
            </div>

            <div className="flex space-x-4 mr-8">
                <Link to="/blog" className="text-white">
                    Blog
                </Link>
                <Link to="/list-tarot-reader" className="text-white">
                    Booking
                </Link>
            </div>

            <div>
                <Dropdown overlay={menu} placement="bottomRight" arrow trigger={['hover']}>
                    <Avatar
                        size="large"
                        icon={<UserOutlined />}
                        className="cursor-pointer bg-[#5F8D8D]"
                    />
                </Dropdown>
            </div>
        </Header>
    );
};

export default AppHeader;
