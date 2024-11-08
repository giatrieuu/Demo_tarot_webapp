import React, { useState } from "react";
import { Input, Button, Row, Col, Card, Modal, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ApiService from '../../services/axios';
import Loader from '../../loader/Loader';

const { TextArea } = Input;

const CreatePostByReader: React.FC = () => {
    const [title, setTitle] = useState("");
    const [shortText, setShortText] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);

    // Get userId from Redux store as ReaderId
    const userId = useSelector((state: RootState) => state.auth.userId);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        if (!title || !shortText || !content || !image) {
            message.warning("Please fill in all fields and upload an image.");
            setLoading(false);
            return;
        }

        try {
            // Pass userId as ReaderId in createPost
            const response = await ApiService.createPost(userId, title, shortText, content, image);
            console.log("Post created successfully:", response);
            message.success("Post created successfully!");
            setTitle("");
            setShortText("");
            setContent("");
            setImage(null);
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error creating post:", error);
            message.error("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const showConfirmModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        handleSubmit();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handlePreview = () => {
        setIsPreviewVisible(true);
    };

    const handlePreviewCancel = () => {
        setIsPreviewVisible(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <h2 className="text-2xl font-bold mb-6">New Post</h2>

            <Card>
                <Row gutter={16}>
                    <Col span={16}>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mb-4"
                            placeholder="Enter post title"
                            size="large"
                        />
                        <TextArea
                            value={shortText}
                            onChange={(e) => setShortText(e.target.value)}
                            className="mb-4"
                            placeholder="Short description here...."
                            rows={2}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mb-4"
                        />
                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Current Post"
                                style={{ width: '300px', height: '200px', objectFit: 'contain' }}
                                className="mb-4"
                            />
                        )}
                        <ReactQuill
                            value={content}
                            onChange={setContent}
                            className="mb-4"
                            placeholder="Enter post content"
                            style={{ height: '400px' }}
                        />
                    </Col>
                    <Col span={8}>
                        <div className="border-l pl-4">
                            <div className="flex justify-end mt-4">
                                <Button type="primary" onClick={showConfirmModal} className="mr-2">
                                    Save
                                </Button>
                                <Button type="default" onClick={handlePreview} className="mr-2">
                                    Preview
                                </Button>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Newest comment</h3>
                            <div className="comment mb-2">
                                <strong>Your post does not have any comments</strong>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>

            <Modal
                title="Confirm Save"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Cancel"
            >
                <p>Are you sure you want to save this post?</p>
            </Modal>

            <Modal
                title="Preview Post"
                visible={isPreviewVisible}
                onCancel={handlePreviewCancel}
                footer={[
                    <Button key="back" onClick={handlePreviewCancel}>
                        Close
                    </Button>,
                ]}
            >
                <h3>{title}</h3>
                <p>{shortText}</p>
                <div dangerouslySetInnerHTML={{ __html: content }} />
                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        style={{ width: '300px', height: '200px', objectFit: 'contain' }}
                    />
                )}
            </Modal>
        </>
    );
};

export default CreatePostByReader;
