// components/TopicManagement/TopicCreateForm.tsx
import React from "react";
import { Form, Input, Button, message } from "antd";
import { createTopic } from "../../../../../services/topicServices";


interface Topic {
  id: string;
  name: string;
}

interface Props {
  onClose: () => void;
  onSuccess: (newTopic: Topic) => void;
}

const TopicCreateForm: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: { name: string }) => {
    try {
      const newTopicData = await createTopic(values.name);
      const newTopic: Topic = {
        id: newTopicData.id || Date.now().toString(),
        name: newTopicData.NAME || values.name,
      };
      message.success("Tạo chủ đề thành công!");
      form.resetFields();
      onSuccess(newTopic);
      onClose();
    } catch (error) {
      message.error("Tạo chủ đề thất bại!");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Tên Chủ Đề"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên chủ đề" }]}
      >
        <Input placeholder="Nhập tên chủ đề" />
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

export default TopicCreateForm;