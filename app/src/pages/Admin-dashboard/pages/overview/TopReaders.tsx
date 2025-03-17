import React from "react";
import { Card, List, Avatar } from "antd";

const readers = [
  { name: "Lê Gia Triệu", revenue: "₫120,000,000", avatar: "https://i.pravatar.cc/40?img=1" },
  { name: "Phan Hồng Yến Thảo", revenue: "₫115,000,000", avatar: "https://i.pravatar.cc/40?img=2" },
];

const TopReaders: React.FC = () => {
  return (
    <Card title="🔥 Reader Nổi Bật" bordered={false} className="shadow-md">
      <List
        itemLayout="horizontal"
        dataSource={readers}
        renderItem={(reader) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={reader.avatar} />}
              title={reader.name}
              description={`Doanh thu: ${reader.revenue}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TopReaders;
