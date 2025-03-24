import React from "react";
import { Typography, Rate } from "antd";

const { Title, Paragraph } = Typography;

interface BookingHeaderProps {
  readerData: {
    name: string;
    price: number;
    rating: number;
    description: string;
  };
  avatarUrl: string;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ readerData, avatarUrl }) => {
  return (
    <div className="text-center mb-6">
      <img
        src={avatarUrl}
        alt="Reader Avatar"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <Title level={3} className="mb-2">
        {readerData.name}
      </Title>
      <Rate
        disabled
        defaultValue={readerData.rating}
        className="text-yellow-500 mb-2"
      />
      <Paragraph className="text-gray-700 text-lg mb-4">
        {readerData.price} VND/Hour
      </Paragraph>
      <Paragraph className="text-gray-500 mb-4">
        {readerData.description}
      </Paragraph>
    </div>
  );
};

export default BookingHeader;
