import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

interface ReaderAboutProps {
  description: string;
}

const ReaderAbout: React.FC<ReaderAboutProps> = ({ description }) => {
  return (
    <div className="p-6">
      <Title level={4} className=" !text-white">
        About me
      </Title>
      <Paragraph className="text-white">{description}</Paragraph>
    </div>
  );
};

export default ReaderAbout;
