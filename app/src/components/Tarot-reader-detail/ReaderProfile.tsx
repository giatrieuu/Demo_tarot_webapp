import React from "react";
import { Button, Tag, Typography, Rate } from "antd";
import { HeartOutlined, HeartFilled, ShareAltOutlined } from "@ant-design/icons";
import CustomButton from "../CustomButton";

const { Title, Paragraph, Text } = Typography;

interface ReaderProfileProps {
  readerData: {
    name: string;
    phone: string;
    dob: string;
    status: string;
    price: number;
    rating: number;
  };
  imageUrl: string;
  topics: { id: string; name: string }[];
  isFollowed: boolean;
  onFollow: () => void;
  onBookNow: () => void;
}

const ReaderProfile: React.FC<ReaderProfileProps> = ({
  readerData,
  imageUrl,
  topics,
  isFollowed,
  onFollow,
  onBookNow,
}) => {
  const formattedDob = new Date(readerData.dob).toLocaleDateString();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 text-white">
      {/* Avatar + Thông tin */}
      <div className="flex items-center">
        <img
          src={imageUrl}
          alt={readerData.name}
          className="w-32 h-32 rounded-full object-cover mr-6 shadow-md"
        />
        <div>
        <Title level={3} className="mb-2 !text-white">{readerData.name}</Title>

          <Paragraph className="mb-1 text-gray-300">
            {formattedDob} (Phone: {readerData.phone})
          </Paragraph>
          <Paragraph className="mb-2 text-lg  !text-white">
            Status:{" "}
            <Tag color={readerData.status === "Active" ? "green" : "red"}>
              {readerData.status}
            </Tag>
          </Paragraph>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Tag key={topic.id} color="blue">{topic.name}</Tag>
            ))}
          </div>
        </div>
      </div>

      {/* Hành động */}
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            type="text"
            icon={isFollowed ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
            onClick={onFollow}
            className="text-white"
          />
          <Button type="text" icon={<ShareAltOutlined />} className="text-white" />
          <Rate disabled defaultValue={readerData.rating}  />
        </div>
        <Text className="text-2xl font-bold text-white">
          {readerData.price.toLocaleString()} VND/Hour
        </Text>
        <CustomButton text="Book Now" onClick={onBookNow} className="text-lg mt-2" />
      </div>
    </div>
  );
};

export default ReaderProfile;
