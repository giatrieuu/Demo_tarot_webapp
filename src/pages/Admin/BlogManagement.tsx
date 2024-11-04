import React, { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import ApiService from '../../services/axios';
import EditPost from '../../components/Blog/EditPost';
import CreatePost from '../../components/Blog/CreatePost';
import DeletePost from '../../components/Blog/DeletePost';

interface GetPostsResponse {
    totalItems: number;
    totalPages: number;
    posts: { post: Post; url: string | null }[];
}

interface Post {
    id: string;
    title: string;
    text: string;
    content: string;
    createdAt: string;
    status: string;
}

const BlogManagement: React.FC = () => {
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false);
    const [currentPost, setCurrentPost] = useState<Post | null>(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
    const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);

    // Gọi API lấy danh sách bài viết
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response: GetPostsResponse = await ApiService.getPosts();
            const formattedData: Post[] = response.posts.map((item) => item.post);
            setData(formattedData);
        } catch (error) {
            console.error("Error fetching posts", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Định nghĩa các cột cho bảng
    const columns: ColumnsType<Post> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Text',
            dataIndex: 'text',
            key: 'text',
            ellipsis: true,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button icon={<DeleteOutlined />} danger onClick={() => openDeleteModal(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    // Hàm xử lý khi nhấn Edit
    const handleEdit = (post: Post) => {
        setCurrentPost(post);
        setIsModalVisible(true);
    };

    // Xử lý khi đóng modal
    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentPost(null);
    };

    // Xử lý khi lưu thay đổi từ modal
    const handleOk = (updatedPost: Post) => {
        const updatedData = data.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
        );
        setData(updatedData); // Cập nhật dữ liệu mới vào state
        setIsModalVisible(false); // Đóng modal
        setCurrentPost(null); // Đặt lại currentPost
    };

    // Open delete confirmation modal
    const openDeleteModal = (id: string) => {
        setPostIdToDelete(id);
        setIsDeleteModalVisible(true);
    };

    // Close delete confirmation modal
    const closeDeleteModal = () => {
        setIsDeleteModalVisible(false);
        setPostIdToDelete(null);
    };

    // Confirm deletion and update data
    const handleDeleteConfirm = (id: string) => {
        setData(data.filter((post) => post.id !== id)); // Remove post from state
        setIsDeleteModalVisible(false); // Close modal
    };

    // Mở modal tạo blog mới
    const showCreateModal = () => {
        setIsCreateModalVisible(true);
    };

    // Xử lý khi đóng modal create
    const handleCreateCancel = () => {
        setIsCreateModalVisible(false);
    };

    // Xử lý khi nhận dữ liệu bài viết mới từ CreatePost
    const handleCreateBlog = (newPost: Post) => {
        setData([newPost, ...data]);
        setIsCreateModalVisible(false);
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-8">Blog Management</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={showCreateModal} style={{ marginBottom: 16 }}>
                New Post
            </Button>
            <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />

            <EditPost
                visible={isModalVisible}
                post={currentPost}
                onCancel={handleCancel}
                onOk={handleOk}
            />

            <CreatePost
                visible={isCreateModalVisible}
                onCancel={handleCreateCancel}
                onOk={handleCreateBlog}
            />

            <DeletePost
                visible={isDeleteModalVisible}
                id={postIdToDelete}
                onClose={closeDeleteModal}
                onDelete={handleDeleteConfirm}
            />
        </div>
    );
};

export default BlogManagement;
