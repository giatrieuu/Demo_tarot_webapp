import React, { useEffect, useState } from 'react';
import { Card, Typography, Input, Row, Col, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/axios';
import Loader from '../../loader/Loader';

const { Title, Paragraph } = Typography;
const { Search } = Input;

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
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const blogsPerPage = 12;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await ApiService.getPosts();
        const sortedBlogs = response.posts.sort((a: Blog, b: Blog) =>
          new Date(b.post.createAt).getTime() - new Date(a.post.createAt).getTime()
        );
        setBlogs(sortedBlogs);
        setFilteredBlogs(sortedBlogs); // Khởi tạo giá trị cho filteredBlogs
      } catch (err) {
        console.error("Error fetching blog list:", err);
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const results = blogs.filter(blog =>
      blog.post.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBlogs(results);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Xác định các blog sẽ hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <header
        className="relative flex items-center justify-between px-16 py-20 h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('src/assets/blog.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-white text-7xl font-bold" style={{ fontFamily: "'Uncial Antiqua'" }}>Blog</h1>
          <p className="text-white text-center max-w-2xl mt-4 text-xl mb-8">
            Dive into a world of insights and inspiration. Discover our latest articles, stay updated on trends, and uncover valuable knowledge that fuels your creativity.
          </p>
          <Search
            placeholder="Search blogs..."
            enterButton={<SearchOutlined />}
            onSearch={handleSearch}
            className="w-3/4 max-w-lg mt-4 px-4 py-2"
          />
        </div>
      </header>

      {/* Blog Cards */}
      <Row gutter={[16, 16]} className="p-6">
        {currentBlogs.length > 0 ? (
          currentBlogs.map((blog, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                className="bg-white text-black h-[450px] flex flex-col justify-between"
                onClick={() => navigate(`/post-detail/${blog.post.id}`)}
              >
                <div className="h-[200px] overflow-hidden">
                  <img
                    src={blog.url || 'https://via.placeholder.com/150'}
                    alt={blog.post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <Title level={5} className="mb-2 truncate">{blog.post.title}</Title>
                  <Paragraph className="text-sm mb-2 text-gray-600">
                    {new Date(blog.post.createAt).toLocaleDateString()}
                  </Paragraph>
                  <Paragraph className="truncate text-sm flex-grow">
                    {blog.post.text}
                  </Paragraph>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center text-2xl text-white mt-4">No blogs found</div>
        )}
      </Row>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <div className="pb-12">
          <Pagination
            current={currentPage}
            pageSize={blogsPerPage}
            total={filteredBlogs.length}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
