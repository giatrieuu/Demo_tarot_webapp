import React, { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/axios';

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
  url: string;
}

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await ApiService.getPosts();
        setBlogs(response.posts);
      } catch (err) {
        console.error("Error fetching blog list:", err);
        setError("Failed to fetch blogs");
      }
    };
    fetchBlogs();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredBlogs = blogs.filter(blog =>
      blog.post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.post.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBlogs(filteredBlogs);
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Blended Bottom Gradient */}
      <div className="relative h-[650px] bg-cover bg-center" style={{ backgroundImage: "url('src/assets/blog.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white max-w-xl mx-auto">
          <h1 className="text-7xl font-bold" style={{ fontFamily: 'Uncial Antiqua, sans-serif' }}>Blog</h1>
          <p className="text-xl mt-4 mb-6">
            Dive into a world of insights and inspiration. Discover our latest articles, stay updated on trends, and uncover valuable knowledge that fuels your creativity.
          </p>
          {/* Custom Search Input */}
          <form onSubmit={handleSearch} className="w-full max-w-md mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-white bg-transparent border border-white rounded-full placeholder-white focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                <SearchOutlined className="text-white" style={{ fontSize: '1.25rem' }} />
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 md:p-12">
        {/* Display blogs in a grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog.post.id}
              hoverable
              className="rounded-lg overflow-hidden bg-white shadow-md text-black"
              onClick={() => {navigate(`/post-detail/${blog.post.id}`) }}
              cover={
                <img
                  src={blog.url || 'https://via.placeholder.com/150'}
                  className="object-cover h-48 w-full"
                />
              }
            >
              <div className="p-4">
                <Title level={5} className="text-black mb-2">
                  {blog.post.title}
                </Title>
                <Paragraph className="text-sm text-black mb-1">
                  {new Date(blog.post.createAt).toLocaleDateString()}
                </Paragraph>
                <Paragraph ellipsis={{ rows: 3 }} className="text-black">
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