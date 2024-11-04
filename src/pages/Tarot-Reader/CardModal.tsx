// CardModal.tsx
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface CardModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any, imageFile: File | null) => Promise<void>;
  initialValues?: any;
  title: string;
  okText: string;
}

const CardModal: React.FC<CardModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  title,
  okText,
}) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
      setImageFile(null);
    }
  }, [initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values, imageFile);
      form.resetFields();
      setImageFile(null);
    } catch (error) {
      message.error("Failed to submit form");
    }
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText={okText}
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Element" name="element" rules={[{ required: true, message: "Please input the element!" }]}>
          <Input placeholder="Enter element" />
        </Form.Item>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input the name!" }]}>
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item label="Message" name="message" rules={[{ required: true, message: "Please input the message!" }]}>
          <Input placeholder="Enter message" />
        </Form.Item>
        <Form.Item label="Image">
          <Upload
            maxCount={1}
            beforeUpload={(file) => {
              setImageFile(file);
              return false;
            }}
            onRemove={() => setImageFile(null)}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CardModal;
