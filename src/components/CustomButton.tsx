import React from "react";
import { Button } from "antd";

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  type?: "primary" | "default" | "link";
  loading?: boolean;
  className?: string;
  disabled?: boolean; 
  style?: React.CSSProperties; 
  htmlType?: "button" | "submit" | "reset"; 
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  type = "primary",
  htmlType = "button",
  loading = false,
  className = "",
  disabled = false,
  style = {}, 
}) => {
  return (
    <Button
      type={type}
      htmlType={htmlType} 
      onClick={onClick}
      loading={loading}
      className={`custom-button px-4 py-2 rounded-lg text-white bg-[#6C4CB3] hover:bg-[#6C4CB3]/90 transition ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={{
        fontFamily: "'Uncial Antiqua', sans-serif",
        ...style,
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
