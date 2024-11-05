import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, Card, Modal, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ApiService from '../../services/axios';
import Loader from '../../loader/Loader';
import { useParams } from "react-router-dom";

const { TextArea } = Input;
interface Comment {
    id: string;
    content: string;
    createdAt: string;
    userName: string;
    userImage: string;
}

const EditBlog: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Lấy ID bài viết từ URL
    const [title, setTitle] = useState<string>("");
    const [shortText, setShortText] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null); // URL ảnh hiện tại
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Trạng thái hiển thị modal
    const [loading, setLoading] = useState<boolean>(false); // Trạng thái loading
    const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false); // Trạng thái hiển thị preview modal
    const [comments, setComments] = useState<Comment[]>([]); // Dữ liệu comment
    const [totalComments, setTotalComments] = useState<number>(0); // Tổng số comment
    const [visibleComments, setVisibleComments] = useState<Comment[]>([]); // Bình luận hiển thị

    const [commentsToShow, setCommentsToShow] = useState<number>(10); // Số bình luận tối đa hiển thị

    // Fetch post data from API
    useEffect(() => {
        const fetchPostData = async () => {
            setLoading(true)
            if (!id) {
                message.error("Post ID is required.");
                return;
            }
            try {
                const response = await ApiService.getPostById(id);
                const post = response.post;
                setTitle(post.title);
                setShortText(post.text);
                setContent(post.content);
                setImageUrl(response.url);
                fetchComments(); // Gọi hàm lấy comment khi lấy post thành công
            } catch (error) {
                console.error("Error fetching post data:", error);
                message.error("Failed to fetch post data.");
            } finally {
                setLoading(false)
            }
        };

        fetchPostData();
    }, [id]);

    // Fetch comments by post ID
    const fetchComments = async () => {
        setLoading(true)
        if (!id) return; // Kiểm tra ID

        try {
            const response = await ApiService.getCommentsByPostId(id); // Gọi API để lấy comment
            const sortedComments = response.comments.sort((a: Comment, b: Comment) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setComments(sortedComments); // Cập nhật danh sách comment
            setTotalComments(response.totalCount); // Cập nhật tổng số comment
            setVisibleComments(sortedComments.slice(0, commentsToShow)); // Chỉ hiển thị 10 bình luận đầu tiên
            console.log(comments)


        } catch (error) {
            console.error("Error fetching comments:", error);
            message.error("Failed to fetch comments.");
        } finally {
            setLoading(false)
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        if (!title || !shortText || !content || !image) {
            message.warning("Please fill in all fields.");
            setLoading(false);
            return;
        }

        if (!id) {
            message.error("Post ID is required.");
            setLoading(false);
            return;
        }

        try {
            await ApiService.updatePost(id, title, shortText, content, image);
            message.success("Post updated successfully!");
            setTitle("");
            setShortText("");
            setContent("");
            setImage(null);
            setImageUrl(null);
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error updating post:", error);
            message.error("Failed to update post. Please try again.");
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
    const handleViewMoreComments = () => {
        setCommentsToShow((prev) => prev + 10); // Hiện thêm 10 bình luận
        setVisibleComments(comments.slice(0, commentsToShow + 10)); // Cập nhật bình luận hiển thị
        console.log(comments)
    };

    // Nếu đang loading, hiện loader
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-light shadow-lg rounded-md mt-10">
            <h2 className="text-2xl font-bold mb-6">Edit Post</h2>

            <Card>
                <Row gutter={16}>
                    <Col span={16}>
                        <h1>Title</h1>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mb-4"
                            placeholder="Enter post title"
                            size="large"
                        />
                        <h2>Description</h2>
                        <TextArea
                            value={shortText}
                            onChange={(e) => setShortText(e.target.value)}
                            className="mb-4"
                            placeholder="Short description here...."
                            rows
                            ={2}
                        />
                        <h2>Image</h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mb-4"
                        />
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Current Post"
                                style={{ width: '300px', height: '200px', objectFit: 'cover' }}
                                className="mb-4"
                            />
                        )}
                        <h2>Content</h2>
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
                                {visibleComments.length > 0 ? (
                                    visibleComments.map((comment) => (
                                        <div key={comment.id} className="flex items-center mb-2">
                                            <img
                                                src={comment.userImage}
                                                alt={comment.userName}
                                                className="rounded-full w-8 h-8 mr-2"
                                            />
                                            <div>
                                                <strong>{comment.userName}</strong> - {new Date(comment.createdAt).toLocaleDateString('vi-VN')} {new Date(comment.createdAt).toLocaleTimeString('vi-VN')}
                                                <p>{comment.content}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <strong>No Comments</strong>
                                )}
                            </div>
                            {totalComments > commentsToShow && (
                                <Button type="link" onClick={handleViewMoreComments}>
                                    View More
                                </Button>
                            )}
                            <p>Total Comments: {totalComments}</p>
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
                footer={[<Button key="back" onClick={handlePreviewCancel}>Close</Button>]}
            >
                <h3>{title}</h3>
                <p>{shortText}</p>
                <div dangerouslySetInnerHTML={{ __html: content }} />
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Preview"
                        style={{ width: '300px', height: '200px', objectFit: 'contain' }}
                    />
                )}
            </Modal>
        </div>
    );
};

export default EditBlog;
