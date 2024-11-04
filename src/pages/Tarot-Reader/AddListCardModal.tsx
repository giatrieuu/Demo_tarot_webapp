// AddListCardModal.tsx
import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

interface CardData {
  groupId: string;
  element: string;
  name: string;
  message: string;
  img?: File;
}

interface AddListCardModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (cards: CardData[]) => Promise<void>;
  groupId: string;
}

const AddListCardModal: React.FC<AddListCardModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  groupId,
}) => {
  const [form] = Form.useForm();
  const [cards, setCards] = useState<CardData[]>([{ groupId, element: "", name: "", message: "", img: undefined }]);

  const handleAddCard = () => {
    setCards([...cards, { groupId, element: "", name: "", message: "", img: undefined }]);
  };

  const handleRemoveCard = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  const handleFileChange = (file: File, index: number) => {
    const updatedCards = [...cards];
    updatedCards[index].img = file;
    setCards(updatedCards);
  };

  const handleOk = async () => {
    try {
      await onSubmit(cards);
      form.resetFields();
      setCards([{ groupId, element: "", name: "", message: "", img: undefined }]);
      message.success("List of cards added successfully");
    } catch (error) {
      message.error("Failed to add list of cards");
    }
  };

  return (
    <Modal
      title="Add List of Cards"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Add List"
      cancelText="Cancel"
      width={800}
    >
      <Form form={form} layout="vertical">
        {cards.map((card, index) => (
          <div key={index} style={{ marginBottom: "16px", borderBottom: "1px solid #f0f0f0", paddingBottom: "16px" }}>
            <Form.Item label={`Element ${index + 1}`} required>
              <Input
                value={card.element}
                onChange={(e) => {
                  const updatedCards = [...cards];
                  updatedCards[index].element = e.target.value;
                  setCards(updatedCards);
                }}
                placeholder="Enter element"
              />
            </Form.Item>
            <Form.Item label={`Name ${index + 1}`} required>
              <Input
                value={card.name}
                onChange={(e) => {
                  const updatedCards = [...cards];
                  updatedCards[index].name = e.target.value;
                  setCards(updatedCards);
                }}
                placeholder="Enter name"
              />
            </Form.Item>
            <Form.Item label={`Message ${index + 1}`} required>
              <Input
                value={card.message}
                onChange={(e) => {
                  const updatedCards = [...cards];
                  updatedCards[index].message = e.target.value;
                  setCards(updatedCards);
                }}
                placeholder="Enter message"
              />
            </Form.Item>
            <Form.Item label={`Image ${index + 1}`}>
              <Upload
                maxCount={1}
                beforeUpload={(file) => {
                  handleFileChange(file, index);
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
            <Button
              type="dashed"
              icon={<MinusCircleOutlined />}
              onClick={() => handleRemoveCard(index)}
              style={{ width: "100%", marginTop: "8px" }}
              disabled={cards.length === 1}
            >
              Remove Card
            </Button>
          </div>
        ))}
        <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddCard} style={{ width: "100%" }}>
          Add Another Card
        </Button>
      </Form>
    </Modal>
  );
};

export default AddListCardModal;
