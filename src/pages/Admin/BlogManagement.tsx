import React, { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ApiService from '../../services/axios';
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
    const navigate = useNavigate(); // Khai báo navigate
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
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
        navigate(`/admin/manage-blogs/edit-blog/${post.id}`); // Điều hướng đến trang EditPost
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

    // Mở trang tạo blog mới
    const showCreatePost = () => {
        navigate('create-blog'); // Điều hướng đến trang CreatePost
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-8">Blog Management</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={showCreatePost} style={{ marginBottom: 16 }}>
                New Post
            </Button>
            <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />

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
