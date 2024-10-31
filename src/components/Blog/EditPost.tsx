import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import ApiService from '../../services/axios';

interface Post {
    id: string;
    title: string;
    text: string;
    content: string;
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
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    React.useEffect(() => {
        if (post) {
            form.setFieldsValue({
                title: post.title,
                text: post.text,
                content: post.content,
            });
        }
    }, [post, form]);

    // Handle form submission
    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            // Ensure imageFile exists before including it in the updatePost call
            if (imageFile && post?.id) {
                setUploading(true);

                // Call updatePost with imageFile included
                await ApiService.updatePost(post.id, values.title, values.text, values.content, imageFile);

                setUploading(false);
            } else if (post?.id) {
                // If there's no image file, pass a default or empty image (as per your API's requirements)
                await ApiService.updatePost(post.id, values.title, values.text, values.content, new File([], ""));
            }

            // Update the component state and close the modal
            const updatedPost = { ...post, ...values };
            onOk(updatedPost);
            form.resetFields();
            setImageFile(null);
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    // Handle image file change
    const handleImageChange = (info: UploadChangeParam<UploadFile<any>>) => {
        const file = info.file.originFileObj; // Extracts the File object directly
        if (file) {
            setImageFile(file); // Set the file in state if it exists
        }
    };

    return (
        <Modal
            title="Edit Post"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Save"
            cancelText="Cancel"
            confirmLoading={uploading}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="text"
                    label="Text"
                    rules={[{ required: true, message: 'Please input the text!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="Content"
                    rules={[{ required: true, message: 'Please input the content!' }]}
                >
                    <Input.TextArea rows={6} />
                </Form.Item>
                <Form.Item label="Upload Image">
                    <Upload beforeUpload={() => false} onChange={handleImageChange}>
                        <Button icon={<UploadOutlined />}>Select Image</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditPost;
