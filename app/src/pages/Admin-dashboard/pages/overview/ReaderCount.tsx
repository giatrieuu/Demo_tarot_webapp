import React, { useEffect, useState } from "react";
import { Card, Statistic, Spin } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { fetchAllReaders } from "../../../../services/tarotReaderServices";


const ReaderCount: React.FC = () => {
  const [readerCount, setReaderCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllReaders();
        // 👉 Chỉ đếm những Reader có status là "Active"
        const activeReaders = data.filter((reader: any) => reader.status === "Active");
        setReaderCount(activeReaders.length);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu Reader:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Card bordered={false} className="shadow-md">
      {loading ? (
        <Spin />
      ) : (
        <>
          <Statistic title="Số Lượng Tarot Reader" value={readerCount} />
          <UsergroupAddOutlined className="text-4xl text-blue-500 mt-2" />
        </>
      )}
    </Card>
  );
};

export default ReaderCount;
