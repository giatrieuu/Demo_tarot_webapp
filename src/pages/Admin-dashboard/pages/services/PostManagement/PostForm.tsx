import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Modal, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createPost, updatePost } from "../../../../../services/blogServices";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

interface PostFormProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (newPost: any) => void;
  initialValues?: any; // Nếu có giá trị này thì là edit
}

const PostForm: React.FC<PostFormProps> = ({
  visible,
  onClose,
  onSuccess,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false); // 🟡 Thêm state loading
  const isEdit = !!initialValues;
  const userId = useSelector((state: RootState) => state.auth.userId) || ""; // ✅ Đảm bảo luôn là string

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        title: initialValues.title,
        text: initialValues.text,
        content: initialValues.content,
      });
    }
  }, [initialValues, form]);

  const handleSubmit = async (values: any) => {
    if (!userId) {
      message.error("Không tìm thấy User ID, vui lòng đăng nhập lại!");
      return;
    }

    setLoading(true);
    try {
      const imageFile = values?.image?.originFileObj;

      if (isEdit) {
        await updatePost(
          initialValues.id,
          values.title,
          values.text,
          values.content,
          imageFile
        );
        message.success("Cập nhật bài viết thành công!");
      } else {
        // 🟢 Nếu là chế độ tạo: gọi API create
        await createPost(
          userId, // ✅ Bây giờ userId luôn là string
          values.title,
          values.text,
          values.content,
          imageFile
        );
        message.success("Tạo bài viết thành công!");
      }

      form.resetFields();
      onSuccess(values);
      onClose();
    } catch (error) {
      message.error(isEdit ? "Cập nhật thất bại!" : "Tạo thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={isEdit ? "📝 Chỉnh Sửa Bài Viết" : "📝 Tạo Bài Viết Mới"}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        {/* Tiêu đề */}
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input placeholder="Nhập tiêu đề bài viết" />
        </Form.Item>

        {/* Nội dung ngắn */}
        <Form.Item
          label="Nội dung ngắn"
          name="text"
          rules={[{ required: true, message: "Vui lòng nhập nội dung ngắn" }]}
        >
          <Input.TextArea placeholder="Nhập nội dung ngắn" rows={3} />
        </Form.Item>

        {/* Nội dung chính (ReactQuill) */}
        <Form.Item
          label="Nội dung chi tiết"
          name="content"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung chi tiết" },
          ]}
        >
          <ReactQuill theme="snow" />
        </Form.Item>

        {/* Hình ảnh */}
        <Form.Item
          label="Ảnh đại diện"
          name="image"
          valuePropName="file"
          getValueFromEvent={(e) => e?.fileList?.[0]} // Lấy file từ event
        >
          <Upload
            maxCount={1}
            listType="picture"
            beforeUpload={() => false} // Không upload tự động
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        {/* Nút */}
        <div className="flex justify-end gap-3">
          <Button onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? "Đang xử lý..." : isEdit ? "Cập nhật" : "Tạo"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default PostForm;
