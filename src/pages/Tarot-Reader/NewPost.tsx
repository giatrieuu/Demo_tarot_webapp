import React, { useState } from "react";
import { Form, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // React Quill styling

const NewPost: React.FC = () => {
  const [content, setContent] = useState(""); // Quản lý nội dung bài post

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    console.log("Content:", content);
    // Xử lý logic lưu bài post
  };

  return (
    <div className="p-8 bg-[#edf3e8] min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">
        <span className="font-normal">New Post</span>
      </h2>

      <div className="flex space-x-8">
        {/* Left side: Text Editor */}
        <div className="flex-1">
          <Form layout="vertical" onFinish={handleSubmit}>
            {/* Text Editor */}
            <Form.Item>
              <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow"
                style={{ height: "400px", border: "none", outline: "none" }} // Loại bỏ viền
              />
            </Form.Item>

            {/* Save Button */}
            <div className="flex justify-end mt-12"> {/* Điều chỉnh khoảng cách bằng mt-12 */}
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                className="bg-[#91a089] hover:bg-[#72876e]"
              >
                Save
              </Button>
            </div>
          </Form>
        </div>

        {/* Right side: Newest Comments */}
        <div className="w-1/3">
          <h3 className="text-lg font-semibold mb-4">Newest comment</h3>
          {/* Comment section with scroll */}
          <div
            className="space-y-4 overflow-y-auto"
            style={{ maxHeight: "350px", width: "100%" }} // Tăng chiều cao và chiều rộng của phần cuộn
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((comment, index) => (
              <div
                key={index}
                className="bg-[#d9e6dc] p-2 rounded-md"
              >
                <div>
                  <span className="font-bold">Lê Gia Triều</span>{" "}
                  <span className="text-gray-500">19/10/2024</span>
                  <p>This is very helpful !!!!</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
