import React from "react";
import { Typography, Divider } from "antd";

const { Paragraph } = Typography;

interface BookingSummaryProps {
  readerName: string;
  formValues: any;
  totalPrice: number;
  getTopicNames: (topicIds: string[] | undefined) => string[];
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  readerName,
  formValues,
  totalPrice,
  getTopicNames,
}) => {
  console.log("Total Price in BookingSummary:", totalPrice); // ✅ Debug giá trị totalPrice

  return (
    <div className="text-center">
      <Divider />
      <Paragraph>
        <b>Tarot reader:</b> {readerName}
      </Paragraph>
      <Paragraph>
        <b>Date:</b> {formValues.date}
      </Paragraph>
      <Paragraph>
        <b>Start Time:</b> {formValues.startTime}
      </Paragraph>
      <Paragraph>
        <b>End Time:</b> {formValues.endTime}
      </Paragraph>
      <Paragraph>
        <b>Topics:</b> {getTopicNames(formValues.topics).join(", ")}
      </Paragraph>
      <Paragraph>
        <b>Total:</b> {totalPrice.toFixed(2)} VND {/* ✅ Đảm bảo totalPrice hiển thị */}
      </Paragraph>
      <Divider />
      <Paragraph className="text-center">
        You will be redirected to PayPal to complete your payment.
      </Paragraph>
    </div>
  );
};

export default BookingSummary;
