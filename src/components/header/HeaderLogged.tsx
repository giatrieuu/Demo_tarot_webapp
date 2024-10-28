import { Layout, Input, Avatar, Dropdown, Menu, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector to get data from Redux store
import { logout } from "../../redux/authSlice"; // Import the logout action
import Logo from "../Logo";
import ApiService from "../../services/axios"; // Import ApiService to fetch user data
import { RootState } from "../../redux/store"; // Import RootState to define Redux store types
import { useEffect, useState } from "react";

const { Header } = Layout;
const { Search } = Input;

const AppHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userId); // Get userId from Redux state
  const [userData, setUserData] = useState<any>(null); // State to hold user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await ApiService.getUserWithImages(userId); // Assuming this API call fetches user data
        setUserData(response); // Store the user data in state
      } catch (error) {
        message.error("Failed to fetch user data.");
      }
    };

    if (userId) {
      fetchUserData(); // Fetch user data when userId is available
    }
  }, [userId]);

  // Function to handle the logout process
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("persist:root"); // Optionally clear persisted state
    navigate("/login");
  };

  const menuItems = [
    {
      key: "welcome",
      label: <span>Welcome, {userData?.user?.name || "Guest"}</span>, // Display user's name
      disabled: true,
    },
    {
      key: "profile",
      label: <Link to="/my-profile">My Profile</Link>,
    },
    {
      key: "logout",
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
        <Dropdown overlay={menu} placement="bottomRight" arrow trigger={["hover"]}>
          <Avatar
            size="large"
            src={userData?.url?.[0]} // Use the first image from the url array for the avatar
            icon={!userData?.url ? <UserOutlined /> : undefined} // Default icon if no image
            className="cursor-pointer bg-[#5F8D8D]"
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
