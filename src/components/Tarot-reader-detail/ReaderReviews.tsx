import React from "react";
import { Typography, Rate, Divider } from "antd";

const { Title, Paragraph, Text } = Typography;

interface Review {
  userName: string;
  booking: {
    feedback: string;
    rating: number;
  };
}

interface ReaderReviewsProps {
  reviews: Review[];
}

const ReaderReviews: React.FC<ReaderReviewsProps> = ({ reviews }) => {
  return (
    <div className="p-6 text-white">
      <Title level={5} className="mb-4  !text-white">Reviews</Title>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="mb-4">
            <Divider className="border-gray-600" />
            <Paragraph className="text-gray-300">
              <Text strong className="text-white">{review.userName}</Text> - {review.booking.feedback}
            </Paragraph>
            <Rate disabled defaultValue={review.booking.rating} />
          </div>
        ))
      ) : (
        <Paragraph className="text-gray-300">No reviews yet</Paragraph>
      )}
    </div>
  );
};

export default ReaderReviews;
