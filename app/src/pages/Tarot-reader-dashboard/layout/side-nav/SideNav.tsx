import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../../../redux/authSlice";
import navDashboardConfig, { navpath } from "../../../../components/nav-dashboard/config";

const SideNav: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = (e: { key: string }) => {
    const key = Number(e.key) as keyof typeof navpath; // ✅ Ép kiểu key
    if (key in navpath) {
      navigate(navpath[key].path);
    }
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-[94%]">
      {/* Sidebar Menu */}
      <Menu
        onClick={onClick}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={navDashboardConfig.filter((item) => item.key !== "7")}
        className="flex-grow bg-[#1f1f1f] text-white"
      />

      {/* Logout Button */}
      <div
        className="flex items-center gap-2 text-lg text-white p-4 cursor-pointer hover:bg-gray-800 transition"
        onClick={handleLogout}
      >
        <AiOutlineLogout className="text-2xl" />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default SideNav;
