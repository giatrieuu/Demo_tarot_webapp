import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import ApiService from '../../services/axios';

interface Post {
    id: string;
    title: string;
    text: string;
    content: string;
    image: string;
    createdAt: string;
    status: string;
}

interface EditPostProps {
    visible: boolean;
    post: Post | null;
    onCancel: () => void;
    onOk: (updatedPost: Post) => void;
}

const EditPost: React.FC<EditPostProps> = ({ visible, post, onCancel, onOk }) => {
    const [form] = Form.useForm();
    const [uploadedImage, setUploadedImage] = React.useState<File | null>(null);

    useEffect(() => {
        if (post) {
            form.setFieldsValue(post);
        } else {
            form.resetFields();
        }
    }, [post, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (!uploadedImage && !post?.image) {
                message.error("Please upload an image.");
                return;
            }

            await ApiService.updatePost(
                values.id,
                values.title,
                values.text,
                values.content,
                uploadedImage || new File([], "image.jpg")
            );

            message.success("Post updated successfully");
            onOk({ ...post, ...values, image: uploadedImage ? URL.createObjectURL(uploadedImage) : post?.image } as Post);
        } catch (error) {
            message.error("Failed to update post");
            console.error("Failed to update post", error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setUploadedImage(file);
    };

    return (
        <Modal
            title="Edit Post"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            destroyOnClose
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Text"
                    name="text"
                    rules={[{ required: true, message: 'Please input the text!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please input the content!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Image">
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditPost;
