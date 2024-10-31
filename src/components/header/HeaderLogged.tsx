import {
  Layout,
  Input,
  Avatar,
  Dropdown,
  Menu,
  message,
  Badge,
  Spin,
} from "antd";
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
  const [loadingUserData, setLoadingUserData] = useState<boolean>(true); // Loader for user data
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [role, setRole] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingUserData(true); // Start loading user data
      try {
        if (userId) {
          const response = await ApiService.getUserWithImages(userId);
          setUserData(response);
          setRole(response.user?.role);
        }
      } catch (error) {
        message.error("Failed to fetch user data.");
      } finally {
        setLoadingUserData(false); // Stop loading user data
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoadingNotifications(true); // Start loading notifications
      try {
        if (userId && role !== null) {
          let response;
          if (role === 1) {
            response = await ApiService.getUserNotifications(userId);
          } else if (role === 22) {
            response = await ApiService.getReaderNotifications(userId);
          }

          if (response) {
            setNotifications(response);
            const unread = response.filter(
              (notification: any) => !notification.isRead
            ).length;
            setUnreadCount(unread);
          }
        }
      } catch (error) {
        message.error("Failed to fetch notifications.");
      } finally {
        setLoadingNotifications(false); // Stop loading notifications
      }
    };

    if (userId && role !== null) {
      fetchNotifications();
    }
  }, [userId, role]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await ApiService.logoutUser();
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
        toast.success("Logged out successfully from Google.");
      }
      dispatch(logout());
      localStorage.removeItem("persist:root");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out.");
    }
  };

  const handleNotificationClick = async (notificationId: string) => {
    try {
      await ApiService.markNotificationAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
      setUnreadCount((prevCount) => prevCount - 1);
    } catch (error) {
      toast.error("Failed to mark notification as read.");
    }
  };

  const unreadNotifications = notifications.filter((notification) => !notification.isRead);
  const readNotifications = notifications.filter((notification) => notification.isRead);

  const notificationDropdown = (
    <div
      style={{
        width: "300px",
        maxHeight: "400px",
        overflowY: "auto",
        padding: "10px",
        backgroundColor: "white",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "12px",
      }}
    >
      {loadingNotifications ? (
        <div className="flex justify-center items-center">
          <Spin /> {/* Loader for notifications */}
        </div>
      ) : notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <>
          {unreadNotifications.length > 0 && (
            <div>
              <h4 style={{ fontWeight: "bold", marginBottom: "8px" }}>Unread Notifications</h4>
              {unreadNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  style={{
                    padding: "10px 0",
                    fontWeight: "bold",
                    cursor: "pointer",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <p>{notification.description}</p>
                  <small>{new Date(notification.createAt).toLocaleString()}</small>
                </div>
              ))}
            </div>
          )}
          {readNotifications.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <h4 style={{ fontWeight: "normal", marginBottom: "8px" }}>Read Notifications</h4>
              {readNotifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    padding: "10px 0",
                    fontWeight: "normal",
                    cursor: "pointer",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <p>{notification.description}</p>
                  <small>{new Date(notification.createAt).toLocaleString()}</small>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );

  const handleDashboardClick = () => {
    if (role === 2) {
      navigate("/admin-dashboard");
    }
  };

  const menuItems = [
    {
      key: "welcome",
      label: <span>Welcome, {loadingUserData ? <Spin /> : userData?.user?.name || "Guest"}</span>,
      disabled: true,
    },
    {
      key: "profile",
      label: <Link to="/my-profile">My Profile</Link>,
    },
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
  ].filter(Boolean);

  const menu = <Menu items={menuItems} />;

  return (
    <Header className="flex justify-between items-center bg-white shadow-md p-4">
      <Logo />

      <div className="flex space-x-6 items-center">
        <Link
          to="/list-tarot-reader"
          className="text-[#4a044e] hover:text-[#a21caf] hover:scale-105"
          style={{ fontFamily: "Uncial Antiqua" }}
        >
          Booking
        </Link>
        <Link
          to="/blog"
          className="text-[#4a044e] hover:text-[#a21caf] hover:scale-105"
          style={{ fontFamily: "Uncial Antiqua" }}
        >
          Blog
        </Link>

        {userId ? (
          <>
            <Dropdown overlay={notificationDropdown} trigger={["click"]} placement="bottomRight">
              <Badge count={unreadCount} offset={[10, 0]}>
                <BellOutlined className="text-[#4a044e] text-2xl cursor-pointer" />
              </Badge>
            </Dropdown>

            <Dropdown overlay={menu} placement="bottomRight" arrow trigger={["hover"]}>
              {loadingUserData ? (
                <Spin /> // Show loader if user data is loading
              ) : (
                <Avatar
                  size="large"
                  src={userData?.url?.[0]}
                  icon={!userData?.url ? <UserOutlined /> : undefined}
                  className="cursor-pointer bg-[#5F8D8D]"
                />
              )}
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
