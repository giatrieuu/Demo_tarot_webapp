import { Layout, Dropdown, Badge, Avatar, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { BellOutlined, UserOutlined, LogoutOutlined, CalendarOutlined } from "@ant-design/icons";
import Logo from "../Logo";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/authSlice";
import { persistor, RootState } from "../../redux/store";
import { logoutUser } from "../../services/userServices";

const { Header } = Layout;

const AppHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Lấy trạng thái từ Redux
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  // 🔹 Xử lý logout
  const handleLogout = () => {
    logoutUser().then(() => {
      dispatch(logoutSuccess()); // 🛑 Cập nhật Redux Store
      navigate("/login"); // 🔄 Điều hướng về trang login
      persistor.purge();
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
              src={ "https://joeschmoe.io/api/v1/random"}
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
