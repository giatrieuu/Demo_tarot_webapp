import React, { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { DeleteOutlined, } from '@ant-design/icons';
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

    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
    const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response: GetPostsResponse = await ApiService.getPosts();
            const formattedData: Post[] = response.posts.map((item) => item.post);
            setAllPosts(formattedData);

            setPagination((prev) => ({
                ...prev,
                total: response.totalItems,
            }));


        } catch (error) {
            console.error("Error fetching posts", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleTableChange = (paginationConfig: TablePaginationConfig) => {
        const { current, pageSize } = paginationConfig;
        if (current && pageSize) {
            setPagination({
                ...pagination,
                current,
            });
        }
    };

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

                    <Button icon={<DeleteOutlined />} danger onClick={() => openDeleteModal(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const openDeleteModal = (id: string) => {
        setPostIdToDelete(id);
        setIsDeleteModalVisible(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalVisible(false);
        setPostIdToDelete(null);
    };

    const handleDeleteConfirm = (id: string) => {
        setAllPosts(allPosts.filter((post) => post.id !== id));
        setPagination((prev) => ({
            ...prev,
            total: prev.total ? prev.total - 1 : 0,
        }));
        setIsDeleteModalVisible(false);
    };


    return (
        <div>
            <h1 className="text-xl font-bold mb-8">Blog Management</h1>

            <Table
                columns={columns}
                dataSource={allPosts.slice(
                    (pagination.current! - 1) * pagination.pageSize!,
                    pagination.current! * pagination.pageSize!
                )}
                rowKey="id"
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
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
