import React, { useEffect, useState } from "react";
import { Card, Statistic, Spin } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { fetchAllUsers } from "../../../../services/tarotReaderServices";


const UserCount: React.FC = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        const filtered = data.filter(
          (user: any) => user.role === 1 && user.status === "Active"
        );
        setUserCount(filtered.length);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <Card bordered={false} className="shadow-md">
      {loading ? (
        <Spin />
      ) : (
        <>
          <Statistic title="Số Lượng Người Dùng" value={userCount} />
          <TeamOutlined className="text-4xl text-purple-500 mt-2" />
        </>
      )}
    </Card>
  );
};

export default UserCount;
