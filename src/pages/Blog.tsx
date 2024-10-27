import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/axios'; // Replace with actual path

const { Title, Paragraph } = Typography;

interface Blog {
  post: {
    id: string;
    userId: string;
    text: string;
    createAt: string;
    status: string;
    title: string;
  };
  url: string; // URL for the image
}

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await ApiService.fetchBlogList(1, 10);
        setBlogs(response); // Set the fetched data to blogs
      } catch (err) {
        console.error("Error fetching blog list:", err);
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen p-6 md:p-12 bg-[#edf3e8]">
      <div className="container mx-auto">
        {/* Display blogs in a grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog.post.id}
              hoverable
              className="rounded-lg overflow-hidden bg-[#d9e6dc] shadow-md"
              onClick={() => navigate(`/blog/${blog.post.id}`)}
              cover={
                <img
                  alt={blog.post.title}
                  src={blog.url || 'https://via.placeholder.com/150'} // Fallback to a placeholder if URL is missing
                  className="object-cover h-48 w-full"
                />
              }
            >
              <div className="p-4">
                <Paragraph className="text-sm text-[#72876e] mb-1">
                  {new Date(blog.post.createAt).toLocaleDateString()} - User {blog.post.userId}
                </Paragraph>
                <Title level={5} className="text-[#4a4a4a] mb-2">
                  {blog.post.title}
                </Title>
                <Paragraph ellipsis={{ rows: 3 }} className="text-[#4a4a4a]">
                  {blog.post.text}
                </Paragraph>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
