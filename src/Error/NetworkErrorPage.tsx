import React from "react";
import { Typography, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const NetworkErrorPage: React.FC = () => {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            {/* Biểu tượng hoặc hình ảnh lỗi mạng */}
            <img
                src="https://via.placeholder.com/150" // Thay thế bằng đường dẫn hình ảnh lỗi mạng nếu có
                alt="Network Error"
                style={{ width: "150px", height: "150px", marginBottom: "20px" }}
            />

            {/* Tiêu đề và mô tả */}
            <Title level={2} className="text-red-600">
                Mạng không ổn định
            </Title>
            <Paragraph className="text-gray-700">
                Kết nối mạng của bạn không ổn định hoặc đã bị mất. Vui lòng kiểm tra lại kết nối và thử lại.
            </Paragraph>

            {/* Nút tải lại trang */}
            <Button type="primary" icon={<ReloadOutlined />} onClick={handleReload}>
                Thử lại
            </Button>
        </div>
    );
};

export default NetworkErrorPage;
