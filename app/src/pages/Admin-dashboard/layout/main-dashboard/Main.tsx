import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Drawer } from "antd";
import { LeftCircleFilled } from "@ant-design/icons";
import SideNav from "../side-nav/SideNav";
import Header from "../header-dasboard/Header"; // ✅ Kiểm tra Header cần nhận những props gì

import "./Main.scss";

const { Sider } = Layout;

function AdminMain() {
  const [isExpand, setIsExpand] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <Layout className="layout-dashboard" style={{ overflowY: "hidden" }}>
      {/* Sidebar Mobile */}
      <Drawer
        title={false}
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        open={visible} // ✅ Sử dụng `open` thay vì `visible`
        width={300}
        className="drawer-sidebar"
        style={{ backgroundColor: "#1f1f1f" }}
      >
        <SideNav />
      </Drawer>

      {/* Sidebar Desktop */}
      <Sider
        collapsed={isExpand}
        collapsedWidth={90}
        trigger={null}
        width={300}
        style={{
          backgroundColor: "transparent",
          transition: "all 0.5s ease-out",
        }}
        className="sider-primary ant-layout-sider-primary sider-toggle"
      >
        <LeftCircleFilled
          className={`expand-icon ${isExpand ? "rotate" : ""}`}
          onClick={() => setIsExpand(!isExpand)}
        />
        <SideNav />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* ✅ Truyền đầy đủ props cho Header */}
        <Header 
          name="Dashboard" 
          subName="Admin Panel" 
          onPress={() => console.log("Header button clicked")} 
        />
        <div className="div-ant" style={{ height: "86vh", overflowY: "scroll" }}>
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
}

export default AdminMain;
