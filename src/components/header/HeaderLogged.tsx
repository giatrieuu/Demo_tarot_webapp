import { Layout, Input, Avatar, Dropdown, Menu, message, Badge, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import Logo from "../Logo";
import ApiService from "../../services/axios";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";

const { Header } = Layout;
const { Search } = Input;

const AppHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [userData, setUserData] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState<boolean>(true);
  const [unreadCount, setUnreadCount] = useState<number>(0); // Track unread notifications
  const [role, setRole] = useState<number | null>(null); // Track user role

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await ApiService.getUserWithImages(userId);
        setUserData(response);

        // Assuming the role is part of the user data response
        setRole(response.user?.role);
      } catch (error) {
        message.error("Failed to fetch user data.");
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoadingNotifications(true);
        let response;

        // Fetch notifications based on the role
        if (role === 1) {
          // For regular users
          response = await ApiService.getUserNotifications(userId);
        } else if (role === 22) {
          // For tarot readers
          response = await ApiService.getReaderNotifications(userId);
        }

        if (response) {
          setNotifications(response); // Store notifications
          const unread = response.filter((notification: any) => !notification.isRead).length;
          setUnreadCount(unread); // Update count with unread notifications only
        }

        setLoadingNotifications(false);
      } catch (error) {
        message.error("Failed to fetch notifications.");
        setLoadingNotifications(false);
      }
    };

    if (userId && role !== null) {
      fetchNotifications();
    }
  }, [userId, role]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("persist:root");
    navigate("/login");
  };

  // Function to mark notifications as read
  const handleNotificationClick = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true, // Mark all notifications as read
    }));

    setNotifications(updatedNotifications);
    setUnreadCount(0); // Reset unread count to zero

    // Optionally, send an API request to update the read status on the server
    // ApiService.markNotificationsAsRead(userId);
  };

  // Notification dropdown without border and adjusted position
  const notificationDropdown = (
    <div
      style={{
        width: '300px',
        maxHeight: '400px',
        overflowY: 'auto',
        padding: '10px',
        backgroundColor: 'white',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '12px', // Adjust this value to move the dropdown downward
      }}
    >
      {loadingNotifications ? (
        <Spin />
      ) : notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification.id} style={{ padding: '10px 0' }}>
            <p>{notification.description}</p>
            <small>{new Date(notification.createAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );

  const menuItems = [
    {
      key: "welcome",
      label: <span>Welcome, {userData?.user?.name || "Guest"}</span>,
      disabled: true,
    },
    {
      key: "profile",
      label: <Link to="/my-profile">My Profile</Link>,
    },
    {
      key: "logout",
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];

  const menu = <Menu items={menuItems} />;

  return (
    <Header className="flex justify-between items-center bg-[#2C4551] shadow-md p-4">
      <Logo />

      <div className="flex-1 text-center mt-8">
        <Search placeholder="Search..." className="max-w-md" />
      </div>

      <div className="flex space-x-6 items-center">
        <Link to="/blog" className="text-white">
          Blog
        </Link>
        <Link to="/list-tarot-reader" className="text-white">
          Booking
        </Link>

        {/* Notification Bell with Dropdown */}
        <Dropdown overlay={notificationDropdown} trigger={['click']} placement="bottomRight" onClick={handleNotificationClick}>
          <Badge count={unreadCount} offset={[10, 0]}>
            <BellOutlined className="text-white text-2xl cursor-pointer" />
          </Badge>
        </Dropdown>

        {/* User Avatar */}
        <Dropdown overlay={menu} placement="bottomRight" arrow trigger={["hover"]}>
          <Avatar
            size="large"
            src={userData?.url?.[0]}
            icon={!userData?.url ? <UserOutlined /> : undefined}
            className="cursor-pointer bg-[#5F8D8D]"
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
