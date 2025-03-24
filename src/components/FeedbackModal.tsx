// components/FeedbackModal.tsx
import React, { useState } from "react";
import { Modal, Rate, Input, message } from "antd";
import { createFeedback } from "../services/bookingServices";


interface FeedbackModalProps {
  visible: boolean;
  onClose: () => void;
  bookingId: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ visible, onClose, bookingId }) => {
  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleSubmit = async () => {
    try {
      await createFeedback({ bookingId, text, rating });
      message.success("Gửi đánh giá thành công!");
      onClose(); // Sau khi gửi mới đóng
    } catch (error) {
      message.error("Lỗi khi gửi đánh giá!");
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      title="📝 Đánh giá cuộc gọi"
      okText="Gửi"
      cancelText="Bỏ qua"
    >
      <Rate value={rating} onChange={setRating} />
      <Input.TextArea
        rows={4}
        placeholder="Nội dung đánh giá"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mt-3"
      />
    </Modal>
  );
};

export default FeedbackModal;
