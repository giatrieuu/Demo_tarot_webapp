// src/components/AppHeader.tsx
import { useEffect, useState } from "react";
import { Layout, Dropdown, Badge, Avatar, Menu, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Logo from "../Logo";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/authSlice";
import { persistor, RootState } from "../../redux/store";
import { logoutUser, fetchUserWithImages } from "../../services/userServices";

const { Header } = Layout;

const AppHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Lấy trạng thái từ Redux
  const { isLoggedIn, userId } = useSelector((state: RootState) => state.auth);

  // 🔹 State để lưu URL của avatar
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // 🔹 Fetch user image khi user đã login
  useEffect(() => {
    const fetchUserImage = async () => {
      if (isLoggedIn && userId) {
        try {
          const data = await fetchUserWithImages(userId);
          // Giả sử API trả về một mảng URL trong data.url, lấy URL đầu tiên
          const imageUrl =
            data.url && data.url.length > 0
              ? data.url[0]
              : "https://joeschmoe.io/api/v1/random"; // Fallback URL nếu không có ảnh
          setAvatarUrl(imageUrl);
        } catch (error) {
          console.error("Failed to fetch user image:", error);
          message.error("Failed to load user image.");
          setAvatarUrl("https://joeschmoe.io/api/v1/random"); // Fallback URL nếu có lỗi
        }
      }
    };

    fetchUserImage();
  }, [isLoggedIn, userId]); // Chạy lại khi isLoggedIn hoặc userId thay đổi

  // 🔹 Xử lý logout
  const handleLogout = () => {
    logoutUser().then(() => {
      dispatch(logoutSuccess()); // 🛑 Cập nhật Redux Store
      navigate("/login"); // 🔄 Điều hướng về trang login
      persistor.purge();
      setAvatarUrl(null); // Reset avatar URL khi logout
    });
  };

  // 🔹 Menu dropdown khi đã login
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">
          <UserOutlined className="mr-2" /> Profile
        </Link>
      </Menu.Item>

      <Menu.Item key="my-booking">
        <Link to="/mybooking">
          <CalendarOutlined className="mr-2" /> My Booking
        </Link>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined className="mr-2" /> Logout
      </Menu.Item>
    </Menu>
  );

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

        <Dropdown trigger={["click"]} placement="bottomRight">
          <Badge count={0} offset={[10, 0]}>
            <BellOutlined className="text-[#4a044e] text-2xl cursor-pointer" />
          </Badge>
        </Dropdown>

        {isLoggedIn ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Avatar
              src={avatarUrl} // Sử dụng URL avatar từ state
              className="cursor-pointer"
              size={40}
            />
          </Dropdown>
        ) : (
          <Link
            to="/login"
            className="text-[#4a044e] hover:text-[#a21caf] text-lg font-medium hover:scale-105"
            style={{ fontFamily: "Uncial Antiqua" }}
          >
            Login
          </Link>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;