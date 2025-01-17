import React from "react";
import { Button } from "antd";

interface CustomButtonProps {
  text: string; // Nội dung của nút
  onClick?: () => void; // Hàm xử lý sự kiện khi nhấn
  type?: "primary" | "default" | "link"; // Kiểu nút (Ant Design)
  loading?: boolean; // Trạng thái loading
  className?: string; // Thêm class tùy chỉnh
  disabled?: boolean; // Trạng thái disabled
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  type = "primary",
  loading = false,
  className = "",
  disabled = false,
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      loading={loading}
      className={`custom-button px-4 py-2 rounded-md text-white bg-[#6C4CB3] hover:bg-[#6C4CB3]/90 transition ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
