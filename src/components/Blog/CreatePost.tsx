// CreatePost.tsx
import React from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";
import ApiService from "../../services/axios";

interface CreatePostProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (newPost: any) => void;
  readerId: string; // Add readerId as a prop
}

const CreatePost: React.FC<CreatePostProps> = ({
  visible,
  onCancel,
  onOk,
  readerId,
}) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = React.useState<File | null>(null);

  const handleUpload = (file: RcFile) => {
    setImageFile(file);
    return false;
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (!imageFile) {
        message.error("Please select an image for the post.");
        return;
      }

      const response = await ApiService.createPost(
        readerId, // Pass readerId here
        values.title,
        values.text,
        values.content,
        imageFile
      );

      onOk(response);
      form.resetFields();
      setImageFile(null);
      message.success("Post created successfully!");
    } catch (error) {
      message.error("Failed to create post. Please try again.");
      console.error("Error creating post", error);
    }
  };

  return (
    <Modal
      title="Create Post"
      visible={visible}
      onCancel={() => {
        form.resetFields();
        setImageFile(null);
        onCancel();
      }}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="text"
          label="Text"
          rules={[{ required: true, message: "Please enter the text" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: "Please enter the content" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Image">
          <Upload
            listType="picture"
            beforeUpload={handleUpload}
            showUploadList={true}
          >
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePost;
