import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Typography, Breadcrumb } from 'antd';
import ApiService from '../../services/axios';

const { Title, Paragraph } = Typography;

const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            try {
                setLoading(true);
                const response = await ApiService.getBlogById(id!);
                setBlog(response);
            } catch (err) {
                console.error("Error fetching blog post details:", err);
                setError("Failed to load blog details");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogDetail();
    }, [id]);

    if (loading) return <Spin tip="Loading blog details..." />;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-4">
                <Breadcrumb.Item>
                    <a href="/">Home</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="/blog">Blog</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {blog?.post?.title || "Blog Detail"}
                </Breadcrumb.Item>
            </Breadcrumb>

            {/* Image */}
            <img
                src={blog.url || 'https://via.placeholder.com/150'}
                className="w-full h-80 object-cover shadow-lg my-4 mt-8"
                alt="Blog post"
            />

            {/* Title */}
            <Title level={2}>{blog.post.title}</Title>

            {/* Metadata */}
            <Paragraph className="text-sm text-gray-500">
                {new Date(blog.post.createAt).toLocaleDateString()} - by {blog.name}
            </Paragraph>

            {/* Content */}
            <Paragraph>{blog.post.text}</Paragraph>
        </div>
    );
};

export default BlogDetail;
