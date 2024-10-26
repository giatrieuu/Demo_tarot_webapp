import React, { useState } from 'react';
import { Upload, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Text, Link } = Typography;

const CardDeckUpload: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);

  const handleUpload = (info: any) => {
    setFileList(info.fileList);
    // Handle CSV file upload logic here
    if (info.file.status === 'done') {
      console.log('File uploaded successfully:', info.file);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDF3E8] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Card deck 1</h2>
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Keyword"
          className="px-4 py-2 rounded-lg shadow-sm border border-gray-300 w-80"
        />
        <Button className="ml-2 px-4 py-2 bg-[#91A089] hover:bg-[#72876e] text-white">
          Search
        </Button>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">
          This deck has just been initialized, please upload your deck to the system first!
        </h3>
        <Upload
          onChange={handleUpload}
          fileList={fileList}
          beforeUpload={() => false} // Prevents auto upload
          accept=".csv"
        >
          <Button icon={<UploadOutlined />} className="bg-[#91A089] hover:bg-[#72876e] text-white">
            Upload file (csv)
          </Button>
        </Upload>

        <div className="mt-4 text-gray-500">
          <Text>Instructions for uploading deck lists to the system - </Text>
          <Link href="#" className="underline text-[#72876e]">View more</Link>
        </div>
      </div>
    </div>
  );
};

export default CardDeckUpload;
