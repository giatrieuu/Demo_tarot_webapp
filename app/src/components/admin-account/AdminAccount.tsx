import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const AdminAccount: React.FC = () => {
  return (
    <div className="flex items-center bg-white shadow-lg border border-gray-200 rounded-full px-5 py-2 ml-4 hover:shadow-xl transition-all duration-300 ease-in-out">
      <Avatar 
        icon={<UserOutlined />} 
        className="h-16 w-16 flex justify-center items-center bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
      />
      <div className="px-4">
        <h3 className="text-lg font-semibold text-gray-800">Dashboard</h3>
        <p className="text-gray-500 text-sm">Admin</p>
      </div>
    </div>
  );
};

export default AdminAccount;
