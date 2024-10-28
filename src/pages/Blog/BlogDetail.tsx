import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Breadcrumb, Alert } from 'antd';
import ApiService from '../../services/axios';

const { Title, Paragraph } = Typography;

const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            if (!id) {
                setError("Invalid blog ID");
                return;
            }

            try {
                const response = await ApiService.getBlogById(id);
                setBlog(response);
            } catch (err) {
                console.error("Error fetching blog post details:", err);
                setError("Failed to load blog details");
            }
        };

        fetchBlogDetail();
    }, [id]);

    if (error) return <Alert message={error} type="error" showIcon />;

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-4">
                <Breadcrumb.Item>
                    <Link to="/">Home</Link> {/* Sử dụng Link thay cho <a> */}
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/blog">Blog</Link> {/* Sử dụng Link thay cho <a> */}
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {blog?.post?.title || "Blog Detail"}
                </Breadcrumb.Item>
            </Breadcrumb>

            {/* Image */}
            <img
                src={blog?.url || 'https://via.placeholder.com/150'}
                className="w-full h-80 object-cover shadow-lg my-4 mt-8"
                alt="Blog post"
            />

            {/* Title */}
            <Title level={2}>{blog?.post?.title}</Title>

            {/* Metadata */}
            <Paragraph className="text-sm text-gray-500">
                {blog?.post?.createAt ? new Date(blog.post.createAt).toLocaleDateString() : ''} - by {blog?.name}
            </Paragraph>

            {/* Content */}
            <Paragraph>{blog?.post?.text}</Paragraph>
        </div>
    );
};

export default BlogDetail;
