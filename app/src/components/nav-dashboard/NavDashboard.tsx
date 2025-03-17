import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavDashboard.scss";
import navDashboardConfig from "./config";

function NavDashboard() {
  const [isActive, setIsActive] = useState(2);

  return (
    <div className="dashboard-navigator">
      {navDashboardConfig.map((nav, index) => {
        // ✅ Kiểm tra nếu có children thì không dùng path trực tiếp
        const path = "path" in nav ? nav.path : "#";

        return (
          <Link
            key={nav.key}
            className={`dashboard-navigator__nav ${
              isActive === index ? "active" : ""
            }`}
            onClick={() => setIsActive(index)}
            to={path as string} // Ép kiểu path thành string
          >
            {nav.label} {/* ✅ Sử dụng label thay vì title */}
          </Link>
        );
      })}
    </div>
  );
}

export default NavDashboard;
