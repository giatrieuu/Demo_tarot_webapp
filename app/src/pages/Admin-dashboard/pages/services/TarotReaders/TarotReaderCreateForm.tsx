// components/TarotReaderManagement/TarotReaderCreateForm.tsx
import React from "react";
import { Form, Input, Button, message } from "antd";
import { createTarotReader } from "../../../../../services/tarotReaderServices";

interface Reader {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  dob: string | null;
  status: string;
  password?: string;
}

interface Props {
  onClose: () => void;
  onSuccess: (newReader: Reader) => void;
}

const TarotReaderCreateForm: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    const newReader = await createTarotReader(values);
    message.success("Tạo Tarot Reader thành công!");
    form.resetFields();
    onSuccess(newReader); 
    onClose(); 
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Tên"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên" }]}
      >
        <Input placeholder="Nhập tên" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email" },
          { type: "email", message: "Email không hợp lệ" },
        ]}
      >
        <Input placeholder="Nhập email" />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>

      <div className="flex justify-end gap-3">
        <Button onClick={onClose}>Hủy</Button>
        <Button type="primary" htmlType="submit">
          Tạo
        </Button>
      </div>
    </Form>
  );
};

export default TarotReaderCreateForm;
