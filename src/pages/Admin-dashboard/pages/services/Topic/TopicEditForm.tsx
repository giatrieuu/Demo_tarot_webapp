// components/TopicManagement/TopicEditForm.tsx
import React from "react";
import { Form, Input, Button, message } from "antd";
import { updateTopic } from "../../../../../services/topicServices";


interface Topic {
  id: string;
  name: string;
}

interface Props {
  topic: Topic;
  onClose: () => void;
  onSuccess: (id: string, name: string) => void;
}

const TopicEditForm: React.FC<Props> = ({ topic, onClose, onSuccess }) => {
  const [form] = Form.useForm();

  // Set initial form values
  React.useEffect(() => {
    form.setFieldsValue({ name: topic.name });
  }, [topic, form]);

  const handleSubmit = async (values: { name: string }) => {
    try {
      await updateTopic(topic.id, values.name);
      message.success("Cập nhật chủ đề thành công!");
      onSuccess(topic.id, values.name);
    } catch (error) {
      message.error("Cập nhật chủ đề thất bại!");
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
          Cập Nhật
        </Button>
      </div>
    </Form>
  );
};

export default TopicEditForm;