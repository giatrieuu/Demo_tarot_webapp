import React, { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ApiService from '../../services/axios';
import EditPost from '../../components/Blog/EditPost';

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
    image: string;
    createdAt: string;
    status: string;
}

const BlogManagement: React.FC = () => {
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [currentPost, setCurrentPost] = useState<Post | null>(null);

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
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
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

    // Hàm xử lý khi nhấn Delete
    const handleDelete = (id: string) => {
        console.log(`Delete blog with id: ${id}`);
        // Logic xóa blog
    };

    return (
        <div>
            <h1>Blog Management</h1>
            <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />

            <EditPost
                visible={isModalVisible}
                post={currentPost}
                onCancel={handleCancel}
                onOk={handleOk}
            />
        </div>
    );
};

export default BlogManagement;
