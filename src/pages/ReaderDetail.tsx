import React, { useState } from "react";
import { Card, Button, Tag, Rate, Typography, List } from "antd";
import { HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";


const { Title, Paragraph, Text } = Typography;

// Dữ liệu giả lập
const readerDetails = {
  "1": {
    id: "1",
    name: "Lê Gia Triều - Victor",
    price: 10,
    rating: 4,
    reviews: 102,
    status: "Available",
    tags: ["Love", "Study", "Money"],
    services:
      "Get accurate predictions about your past, present, and future...",
    about:
      "Practicing astrologer for the past 28 years. Have been successfully transforming lives with thousands of success stories. Hold a masters in management and running an astrological research center where people come to fine-tune their astrological knowledge.",
    image: "https://via.placeholder.com/100",
  },
  "2": {
    id: "2",
    name: "Thảo - Shy",
    price: 10,
    rating: 5,
    reviews: 170,
    status: "Available",
    tags: ["Love", "Study"],
    services:
      "Get accurate predictions about your past, present, and future...",
    about:
      "Practicing astrologer for the past 20 years. Have been successfully transforming lives with thousands of success stories.",
    image: "https://via.placeholder.com/100",
  },
};

const ReaderDetail: React.FC = () => {
  const { readerId } = useParams(); // Lấy readerId từ URL
  const reader = readerDetails[readerId as keyof typeof readerDetails]; // Tìm reader theo Id và ép kiểu readerId

  if (!reader) {
    return <div>Reader not found</div>;
  }

  return (
    <div className="min-h-screen p-6 md:p-12 bg-[#edf3e8]">
      <div className="container mx-auto">
        {/* Reader Profile Card */}
        <Card className="mb-6 p-6 rounded-lg bg-[#d9e6dc] shadow-lg w-full">
          <div className="flex items-center justify-between">
            {/* Profile Image */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  src={reader.image}
                  alt={reader.name}
                  className="w-32 h-32 rounded-full object-cover mr-6"
                />
              </div>
              {/* Profile Details */}
              <div>
                <Title level={3} className="mb-2">
                  {reader.name}
                </Title>
                <Paragraph className="mb-1 text-gray-600">
                  {reader.reviews} reviews from 2023
                </Paragraph>
                <Paragraph className="mb-2 text-lg">
                  Status: <Tag color="green">{reader.status}</Tag>
                </Paragraph>
                <div className="flex space-x-2 mb-4">
                  {reader.tags.map((tag: string, index: number) => (
                    <Tag
                      key={index}
                      color="blue"
                      className="rounded-lg text-base px-3 py-1"
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-start space-x-4">
              <Button type="text" icon={<HeartOutlined />} />
              <Button type="text" icon={<ShareAltOutlined />} />
              <Rate
                disabled
                defaultValue={reader.rating}
                className="text-yellow-500"
              />
            </div>
          </div>
          {/* Price and Book Now Button */}
          <div className="flex justify-between items-center mt-4">
            <Text className="text-2xl font-bold text-[#72876e]">
              ${reader.price}/Hour
            </Text>
            <Button
              type="primary"
              size="large"
              className="bg-[#72876e] hover:bg-[#91a089]"
            >
              Book Now
            </Button>
          </div>
        </Card>

        {/* About Services */}
        <Card className="mb-6 bg-[#d9e6dc] rounded-lg shadow-sm p-4">
          <Title level={5}>About my services</Title>
          <Paragraph>{reader.services}</Paragraph>
          <Title level={5}>About me</Title>
          <Paragraph>{reader.about}</Paragraph>
        </Card>



      </div>
    </div>
  );
};

export default ReaderDetail;
