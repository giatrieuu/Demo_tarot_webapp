import React, { useState } from "react";
import { Input, Button, Row, Col, Card, Modal, message } from 'antd'; // Import Modal and message
import ReactQuill from 'react-quill'; // Import Quill
import 'react-quill/dist/quill.snow.css'; // Import CSS for Quill
import ApiService from '../../services/axios';
import Loader from '../../loader/Loader'; // Import component Loader

const { TextArea } = Input;

const CreateBlog: React.FC = () => {
    const [title, setTitle] = useState("");
    const [shortText, setShortText] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [isPreviewVisible, setIsPreviewVisible] = useState(false); // Trạng thái hiển thị preview modal

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async () => {
        setLoading(true); // Bắt đầu loading

        // Kiểm tra các trường bắt buộc
        if (!title || !shortText || !content || !image) {
            message.warning("Please fill in all fields and upload an image."); // Hiển thị thông báo nếu thiếu trường
            setLoading(false); // Dừng loading
            return; // Thoát hàm
        }

        try {
            const response = await ApiService.createPost(title, shortText, content, image); // Gọi API để tạo bài viết
            console.log("Post created successfully:", response);
            message.success("Post created successfully!");
            // Reset form fields after successful submission
            setTitle("");
            setShortText("");
            setContent("");
            setImage(null);
            setIsModalVisible(false); // Đóng modal sau khi tạo thành công
        } catch (error) {
            console.error("Error creating post:", error);
            message.error("Failed to create post. Please try again.");
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    const showConfirmModal = () => {
        setIsModalVisible(true); // Hiện modal xác nhận
    };

    const handleOk = () => {
        handleSubmit(); // Gọi hàm tạo bài viết
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Đóng modal
    };

    const handlePreview = () => {
        setIsPreviewVisible(true); // Hiện modal preview
    };

    const handlePreviewCancel = () => {
        setIsPreviewVisible(false); // Đóng modal preview
    };

    // Nếu đang loading, hiện loader
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader /> {/* Loader sẽ xuất hiện ở chính giữa */}
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-light shadow-lg rounded-md mt-10">
            <h2 className="text-2xl font-bold mb-6">New Post</h2>

            <Card>
                <Row gutter={16}>
                    <Col span={16}>
                        {/* Title Input */}
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mb-4"
                            placeholder="Enter post title"
                            size="large"
                        />
                        {/* Short Text Area for additional text */}
                        <TextArea
                            value={shortText}
                            onChange={(e) => setShortText(e.target.value)}
                            className="mb-4"
                            placeholder="Short description here...."
                            rows={2}
                        />
                        {/* Image Input */}
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
                                style={{ width: '300px', height: '200px', objectFit: 'contain' }} // Kích thước cố định
                                className="mb-4"
                            />
                        )}

                        {/* Content Editor */}
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
                            {/* Buttons for Save and Preview */}
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
                                <strong>Your post not have any comment</strong>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Modal xác nhận */}
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


        </div>
    );
};

export default CreateBlog;
