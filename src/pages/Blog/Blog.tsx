import React, { useEffect, useState, useRef } from 'react';
import { Card, Typography, Input, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/axios';
import Loader from '../../loader/Loader';

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await ApiService.getPosts();
        const sortedBlogs = response.posts.sort((a: Blog, b: Blog) =>
          new Date(b.post.createAt).getTime() - new Date(a.post.createAt).getTime()
        );
        setBlogs(sortedBlogs);
      } catch (err) {
        console.error("Error fetching blog list:", err);
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filteredSuggestions = blogs.filter(blog =>
        blog.post.title && blog.post.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-black p-6">
      {/* Search Input */}
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full border px-4 py-2"
          prefix={<SearchOutlined />}
        />

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.post.id}
                onClick={() => navigate(`/post-detail/${suggestion.post.id}`)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                <Title level={5} className="m-0 text-black">{suggestion.post.title}</Title>
              </div>
            ))}
          </div>
        )}
      </div>

      <Row gutter={16} justify="center">
        {/* Main Content: Latest Post */}
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          {blogs.length > 0 && (
            <Card
              hoverable
              className="bg-white text-black"
              onClick={() => navigate(`/post-detail/${blogs[0].post.id}`)}
              style={{ width: '60%', marginBottom: '20px' }}
            >
              <img
                src={blogs[0].url || 'https://via.placeholder.com/150'}
                className="object-cover h-48 w-full mb-4"
                alt={blogs[0].post.title}
              />
              <Title level={5}>{blogs[0].post.title}</Title>
              <Paragraph className="text-sm">
                {new Date(blogs[0].post.createAt).toLocaleDateString()}
              </Paragraph>
              <Paragraph>
                {blogs[0].post.text}
              </Paragraph>
            </Card>
          )}
        </Col>

        {/* Other Posts: Drag-to-Scroll */}
        <Col span={24}>
          <div
            ref={scrollRef}
            className="horizontal-scroll-container"
            onMouseDown={(e) => {
              isDragging.current = true;
              startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
              scrollLeft.current = scrollRef.current?.scrollLeft || 0;
            }}
            onMouseLeave={() => isDragging.current = false}
            onMouseUp={() => isDragging.current = false}
            onMouseMove={(e) => {
              if (!isDragging.current) return;
              e.preventDefault();
              const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
              const walk = (x - startX.current) * 1.5;
              if (scrollRef.current) {
                scrollRef.current.scrollLeft = scrollLeft.current - walk;
              }
            }}
          >
            {blogs.slice(1).map((blog, index) => (
              <Card
                key={index}
                hoverable
                className="bg-white text-black uniform-card"
                onDoubleClick={() => navigate(`/post-detail/${blog.post.id}`)}
              >
                <div className="card-image-container">
                  <img
                    src={blog.url || 'https://via.placeholder.com/100'}
                    alt={blog.post.title}
                    className="object-cover"
                  />
                </div>
                <div className="card-content">
                  <Title level={5} className="card-title">{blog.post.title}</Title>
                  <Paragraph className="card-text">{blog.post.text}</Paragraph>
                  <Paragraph className="card-date">
                    {new Date(blog.post.createAt).toLocaleDateString()}
                  </Paragraph>
                </div>
              </Card>
            ))}
          </div>
        </Col>
      </Row>

      {/* CSS Styles */}
      <style>{`
        .horizontal-scroll-container {
          display: flex;
          overflow-x: auto;
          padding-bottom: 10px;
          gap: 16px;
          cursor: grab;
          scrollbar-width: none;
        }
        .horizontal-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .uniform-card {
          min-width: 200px;
          width: 200px;
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
        }
        .card-image-container {
          width: 100%;
          height: 150px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .card-content {
          padding: 10px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 150px;
        }
        .card-title {
          font-size: 16px;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 20px;
        }
        .card-text {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          height: 40px;
        }
        .card-date {
          font-size: 12px;
          color: gray;
          height: 20px;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
