import {
  Layout,
  Dropdown,
  Badge,
} from "antd";
import { Link } from "react-router-dom";
import { BellOutlined } from "@ant-design/icons";
import Logo from "../Logo";

const { Header } = Layout;

const AppHeader = () => {
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

        <>
          <Dropdown trigger={["click"]} placement="bottomRight">
            <Badge count={0} offset={[10, 0]}>
              <BellOutlined className="text-[#4a044e] text-2xl cursor-pointer" />
            </Badge>
          </Dropdown>

          <Link
            to="/login"
            className="text-[#4a044e] hover:text-[#a21caf] text-lg font-medium hover:scale-105"
            style={{ fontFamily: "Uncial Antiqua" }}
          >
            Login
          </Link>
        </>
      </div>
    </Header>
  );
};

export default AppHeader;
