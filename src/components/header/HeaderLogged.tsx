import { Layout, Input, Avatar, Dropdown, Menu, message, Badge, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import Logo from "../Logo";
import ApiService from "../../services/axios";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
        if (userId) {
          const response = await ApiService.getUserWithImages(userId); // Only fetch when userId is valid
          setUserData(response);

          // Assuming the role is part of the user data response
          setRole(response.user?.role);
        }
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
        if (userId && role !== null) {
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
        }
      } catch (error) {
        message.error("Failed to fetch notifications.");
        setLoadingNotifications(false);
      }
    };

    if (userId && role !== null) {
      fetchNotifications();
    }
  }, [userId, role]);

  const handleLogout = async () => {
    try {
      // Call the API to log out if the user is logged in via Google
      const token = localStorage.getItem('authToken');
      
      if (token) {
        // Assuming token is the indicator that the user is logged in via Google
        await ApiService.logoutUser(); // Call the logout API for Google
        localStorage.removeItem('authToken'); // Remove the token from localStorage
        sessionStorage.removeItem("authToken");
        toast.success("Logged out successfully from Google.");
      }
  
      // Dispatch logout action from Redux
      dispatch(logout());
      localStorage.removeItem("persist:root"); // Remove persisted Redux state
  
      // Navigate to home page
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out.");
      console.error("Logout failed", error);
    }
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

  const handleDashboardClick = () => {
    if (role === 2) {
      navigate("/admin-dashboard"); // Navigate to admin dashboard
    }
  };

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
    // Conditionally render "Dashboard" option for admins
    role === 2
      ? {
          key: "dashboard",
          label: <span onClick={handleDashboardClick}>Dashboard</span>,
        }
      : null,
    {
      key: "logout",
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ].filter(Boolean); // Filter out null items

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

        {/* Show different content based on whether the user is logged in or not */}
        {userId ? (
          <>
            {/* Notification Bell with Dropdown */}
            <Dropdown overlay={notificationDropdown} trigger={['click']} placement="bottomRight">
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
          </>
        ) : (
          <Link
            to="/login"
            className="text-white bg-[#91a089] px-4 py-2 rounded hover:bg-[#72876e]"
          >
            Sign In
          </Link>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
