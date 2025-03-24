import React, { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getPagedPost } from "../../services/blogServices";

interface Blog {
  post: {
    id: string;
    userId: string;
    text: string;
    createAt: string;
    status: string;
    title: string;
    content: string;
  };
  url: string;
  name: string;
}

const BlogSection: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentBlogGroupIndex, setCurrentBlogGroupIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPagedPost({ searchTerm: "" }, 1, 10)
      .then((data) => {
        setBlogs(Array.isArray(data.posts) ? data.posts : []);
      })
      .catch(() => {
        console.error("Failed to load blogs.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleNextBlogGroup = () => {
    setCurrentBlogGroupIndex((prevIndex) =>
      (prevIndex + 1) * 3 < blogs.length ? prevIndex + 1 : 0
    );
  };

  const handlePrevBlogGroup = () => {
    setCurrentBlogGroupIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : Math.floor((blogs.length - 1) / 3)
    );
  };

  return (
    <section className="bg-white py-20 px-16 text-center">
      <h2 className="text-4xl font-serif text-center mb-8">Latest Blogs</h2>
      <div className="relative flex justify-center mb-12">
        <span className="block w-[8%] h-1 bg-gray-300"></span>
        <span className="block w-[8%] h-1 bg-purple-800"></span>
        <span className="block w-[8%] h-1 bg-gray-300"></span>
      </div>

      {/* 🟢 Hiển thị Loading nếu dữ liệu chưa tải xong */}
      {loading ? (
        <div className="flex justify-center py-10">
          <span className="text-lg text-gray-600">Loading blogs...</span>
        </div>
      ) : blogs.length > 0 ? (
        <div className="relative">
          <div className="flex justify-between items-center mb-8 gap-4">
            <button
              onClick={handlePrevBlogGroup}
              className="bg-[#CBB6DE] text-white p-3 rounded-full shadow-md hover:bg-[#B39BCF] transition duration-300"
            >
              <LeftOutlined style={{ fontSize: "24px" }} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mx-auto">
              {blogs
                .slice(currentBlogGroupIndex * 3, currentBlogGroupIndex * 3 + 3)
                .map((blog) => (
                  <div
                    key={blog.post.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-[400px] w-[350px] transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                    onClick={() => navigate(`/post-detail/${blog.post.id}`)}
                  >
                    <div className="w-full h-[200px] overflow-hidden flex items-center justify-center p-4">
                      <img
                        src={blog.url || "https://via.placeholder.com/300"}
                        alt={blog.post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-black mb-2">
                          {blog.post.title}
                        </h3>
                        <p className="text-gray-600 mb-2 text-sm">
                          {new Date(blog.post.createAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-gray-800">
                        {blog.post.text.length > 100
                          ? `${blog.post.text.substring(0, 100)}...`
                          : blog.post.text}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <button
              onClick={handleNextBlogGroup}
              className="bg-[#CBB6DE] text-white p-3 rounded-full shadow-md hover:bg-[#B39BCF] transition duration-300"
            >
              <RightOutlined style={{ fontSize: "24px" }} />
            </button>
          </div>
        </div>
      ) : (
        <p className="text-[#4a044e]">No blogs available</p>
      )}
    </section>
  );
};

export default BlogSection;
